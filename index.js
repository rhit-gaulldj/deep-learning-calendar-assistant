import OpenAI from "openai";
import { setup } from "./setup.cjs";

setup();

const configuration = {
    organization: "org-2Vn3OOWh9bWkGmzwKYp70xDg",
    apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(configuration);
const fineTunes = openai.fineTunes;
console.log(fineTunes);