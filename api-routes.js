import express from 'express';
import { getSystemMessage, getUserMessage } from './utilities.js';
import OpenAI from "openai";

export function getRouter() {
    const configuration = {
        organization: process.env.OPENAI_ORG_ID,
        apiKey: process.env.OPENAI_API_KEY,
    };
    const openai = new OpenAI(configuration);

    const router = express.Router();

    router.post('/prompt', async (req, res, next) => {
        const { prompt, calendar } = req.body;
        const messages = [
            { role: 'system', content: getSystemMessage() },
            { role: 'user', content: getUserMessage(calendar, prompt) }
        ];

        const completion = await openai.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: messages
        });

        const openaiResponse = completion.choices[0].text;
        
        res.status(200);
        res.send({
            response: openaiResponse,
        });
    });

    return router;
}