import OpenAI from "openai";
import { setup } from "./setup.cjs";
import fs from 'fs/promises';
import * as commonFs from 'fs';

//uploadTraining(20);
console.log("Currently doing nothing. Please uncomment code if you'd like to upload training files");

// NOTE: Training File ID: file-G6JrPOJen8ILDgRvFiDCdUgU

async function uploadTraining(max) {
    setup();

    const configuration = {
        organization: "org-2Vn3OOWh9bWkGmzwKYp70xDg",
        apiKey: process.env.OPENAI_API_KEY,
    };
    const openai = new OpenAI(configuration);

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

        function sanitize(str) {
            return str.replaceAll('\n', '\\n')
                .replaceAll('\r', '\\r')
                .replaceAll('"', '\"');
        }

        const systemMsg = 'You are a specialized calendar assistant, designed to help users efficiently manage their schedules by providing ICAL formatted text as well as natural language in response to their requests. You should be able to interpret natural language inputs as well as ICAL formatted text to create, modify, or cancel events, meetings, reminders, and other calendar entries. Ensure your responses are concise, accurate, and follow the ICAL format standard.';

        const jsonl = `{"messages":[{ "role": "system", "content": "${systemMsg}" },{ "role": "user", "content": "<ICAL>${sanitize(inputText)}</ICAL> ${sanitize(promptText)}" },{ "role":"assistant", "content": "Here is the requested event in ICAL format:<ICAL>${sanitize(outputText)}</ICAL>" }]}`;
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

    // Now we can upload to the OpenAI server
    const stream = commonFs.createReadStream(jsonlPath, 'utf8');

    const fileParams = {
        file: stream,
        purpose: 'fine-tune'
    };
    
    console.log('Uploading...');

    const response = await openai.files.create(fileParams);
    console.log(response);
}

export { uploadTraining };