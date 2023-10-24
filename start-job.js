import OpenAI from "openai";
import { setup } from "./setup.cjs";

setup();

// JOB ID: ftjob-XDkcH2faK9m89PhthtqvpJv0
const jobId = process.env.OPENAI_JOB_ID;//'ftjob-XDkcH2faK9m89PhthtqvpJv0';
const jobFileResult = process.env.OPENAI_JOB_FILE_ID;//'file-I3u9D9k70Qt3SyL4YA6GkYlO';
//createJob();

const configuration = {
    organization: process.env.OPENAI_ORG_ID,
    apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(configuration);

// const resp = await openai.fineTuning.jobs.retrieve(jobId);
// console.log(resp);

//const resp = await getJobResult(jobFileResult);
//console.log(resp);

console.log('Currently does nothing to avoid API costs. Please uncomment code to do something');

async function getJobResult(fileId) {
    const file = await openai.files.retrieveContent(fileId);
    return file;
}

async function createJob(fileId) {

    // TRAINING FILE ID: file-G6JrPOJen8ILDgRvFiDCdUgU
    const trainingFileId = process.env.OPENAI_FILE_ID;//'file-G6JrPOJen8ILDgRvFiDCdUgU';
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