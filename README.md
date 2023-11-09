Clone the repo into the desired directory.

First, make sure you have NodeJS installed, and make sure it is a recent stable version. I believe we are on Node 20 right now, but Node 16 and 18 should also work. Odd version numbers are not stable (i.e. Node 17 and 19). You can check by running `node --version`. I wrote this in 16.17.0.

You'll also need to install browserify. This bundles code for the browser, but allows it to be written as Node modules. To install, run `npm install -g browserify`. This allows the code for the frontend to build.

Open a terminal in the root directory of the repo, and run `npm install` to install the necessary packages.

In order to use the OpenAI API you'll need a secret key. For that, go to https://platform.openai.com/account/api-keys

Then, create a new secret key. Copy the value of the key. It will only be displayed a single time. If you lose it, you'll have to generate a new key.

In the root folder of the repository, create a file named `.env` (or rename `example.env` to `.env` and edit it). In there, assign a value to `OPENAI_API_KEY`. Example:

`OPENAI_API_KEY=sk-lkj44alkf345djoianwWJKoie342ewonivdanoiwa`

Save this file, and this should allow you to access the OpenAI API with the code.

Here are all of the values that must be provided in the `.env` file, along with their descriptions:

OPENAI_API_KEY (Open AI API Key, required to auth user)

OPENAI_ORG_ID (ID of the OpenAI organization)

OPENAI_MODEL (ID of the model to use for generation. This would be the fine-tuned model, the ID of which is provided in the fine-tuning job file. In the event of no fine-tuning, this will be the GPT model to use \[gpt-3.5-turbo or gpt-4])

The upload-file.js and start-job.js files were used for fine-tuning models. As fine-tuning is no longer our route, we don't need to use these files anymore.

You can run individual files with node using `node {file}.js`. For example, `node upload-file.js`.

You can also run the `server.js` file with `npm start` (if you open package.json and look the npm scripts, that is where this is defined, it just runs `node server.js`) (after bundling the frontend). This runs the Express server. It will give you a link (localhost:3000) to navigate to the locally-hosted website.

NOTE: You may need to run `npm install` again when pulling the code if additional packages have been added.

Once you've navigated to the website, paste the ICalendar-formatted text into the first textbox, and the natural-language prompt into the second, and submit. It can take quite some time for a result to be returned (think of how long it takes ChatGPT to write a paragraph). We don't stream the results, so it doesn't return until it has completely generated a response.