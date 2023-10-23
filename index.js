import express from 'express';

// Need to create static site
// Need to write basic API for the site

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.\nURL: https://localhost:${PORT} \nPress Ctrl+C to terminate`);
});