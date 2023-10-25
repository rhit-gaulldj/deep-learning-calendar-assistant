import express from 'express';
import { getRouter } from './api-routes.js';
import bodyParser from 'body-parser';
import { setup } from "./setup.cjs";

setup();

// Need to create static site
// Need to write basic API for the site

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.\nURL: http://localhost:${PORT} \nPress Ctrl+C to terminate`);
});

const apiRouter = getRouter();
app.use('/api', apiRouter);