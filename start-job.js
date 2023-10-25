import OpenAI from "openai";
import { setup } from "./setup.cjs";

setup();

const configuration = {
    organization: process.env.OPENAI_ORG_ID,
    apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(configuration);

// To create a fine-tuning job, after you've uploaded a file to OpenAI:
// This will log the response to the console
// createJob(process.env.OPENAI_FILE_ID);

// To get a file result, after you've created a fine-tuning job:
// This will log the response to the console
// const resp = await getJobResult(process.env.OPENAI_JOB_FILE_ID);
// console.log(resp);

console.log('Currently does nothing to avoid API costs. Please uncomment code to do something');

async function getJobResult(fileId) {
    const file = await openai.files.retrieveContent(fileId);
    return file;
}

async function createJob(fileId) {

    const trainingFileId = fileId;
    const jobCreateParams = {
        model: 'gpt-3.5-turbo',
        training_file: trainingFileId,
        hyperparameters: {
            n_epochs: 2
        },
    };

    const response = await openai.fineTuning.jobs.create(jobCreateParams);
    console.log(response);
}