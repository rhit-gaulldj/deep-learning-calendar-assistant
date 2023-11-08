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

    router.post('/prompt', async (req, res) => {
        const { prompt, calendar, preferences } = req.body;

        if (!prompt || !calendar) {
            res.status(400);
            res.send('Please provide prompt and calendar in request body');
            return;
        }
        if (!preferences) {
            res.status(400);
            res.send('Error retrieving preferences');
            return;
        }

        const messages = [
            { role: 'system', content: getSystemMessage(preferences) },
            { role: 'user', content: getUserMessage(calendar, prompt) }
        ];

        // const completion = await openai.chat.completions.create({
        //     model: process.env.OPENAI_MODEL,
        //     messages: messages,
        //     // temperature: 0.5,
        // });

        const openaiResponse = completion.choices[0].message.content;

        // Extract the ICalendar from the response, by finding the <ICAL> tags
        const regex = /.*?<ical>([\s\S]*?)<\/ical>.*?/i;
        const matches = openaiResponse.match(regex);
        const calendarResp = matches[1];
        
        res.status(200);
        res.json({
            response: calendarResp,
        });
    });

    return router;
}