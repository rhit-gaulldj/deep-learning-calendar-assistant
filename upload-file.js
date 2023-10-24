import OpenAI from "openai";
import { setup } from "./setup.cjs";
import fs from 'fs/promises';
import * as commonFs from 'fs';
import { getSystemMessage } from "./utilities.js";

createJsonl(20).then(path => {
    console.log('JSONL Path ' + path);
});
//console.log("Currently doing nothing. Please uncomment code if you'd like to upload training files");

// NOTE: Training File ID: file-G6JrPOJen8ILDgRvFiDCdUgU

// Returns path to JSONL file
async function createJsonl(max) {
    setup();

    async function generateTrainingJsonl(number) {
        const input = await fs.open(`./training_data/inputs/calendar${number}.ics`, 'r');
        const prompt = await fs.open(`./training_data/prompts/prompt${number}.txt`, 'r');
        const output = await fs.open(`./training_data/responses/response${number}.ics`, 'r');

        const inputText = await fs.readFile(input, 'utf8');
        const promptText = await fs.readFile(prompt, 'utf8');
        const outputText = await fs.readFile(output, 'utf8');

        input.close();
        prompt.close();
        output.close();

        const systemMsg = getSystemMessage();

        const jsonl = `{"messages":[{ "role": "system", "content": "${systemMsg}" },` + 
            `{ "role": "user", "content": "${getUserMessage(inputText, promptText)}" },` + 
            `{ "role":"assistant", "content": ` + 
                `"Here is the requested event in ICAL format:<ICAL>${sanitize(outputText)}</ICAL>" }]}`;
        return jsonl;
    }

    let fullJsonl = '';
    for (let i = 0; i < max; i++) {
        const index = i + 1;
        const jsonl = await generateTrainingJsonl(index);
        fullJsonl += jsonl;
        if (i + 1 < max) {
            fullJsonl += '\n';
        }
    }

    // Create the file in the workspace folder
    const jsonlPath = `./workspace/training_data.jsonl`;
    await fs.writeFile(jsonlPath, fullJsonl);

    return jsonlPath;
}

async function uploadTraining(jsonlPath) {
    setup();

    // Now we can upload to the OpenAI server
    const stream = commonFs.createReadStream(jsonlPath, 'utf8');

    const configuration = {
        organization: process.env.OPENAI_ORG_ID,
        apiKey: process.env.OPENAI_API_KEY,
    };
    const openai = new OpenAI(configuration);

    const fileParams = {
        file: stream,
        purpose: 'fine-tune'
    };
    
    console.log('Uploading...');

    const response = await openai.files.create(fileParams);
    console.log(response);
}

export { createJsonl, uploadTraining };