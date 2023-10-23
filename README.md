Clone the repo into the desired directory.

First, make sure you have NodeJS installed, and make sure it is a recent stable version. I believe we are on Node 20 right now, but Node 16 and 18 should also work. Odd version numbers are not stable (i.e. Node 17 and 19). You can check by running `node --version`. I wrote this in 16.17.0.

Open a terminal in the root directory of the repo, and run `npm install` to install the necessary packages.

You can run individual files with node using `node {file}.js`. For example, `node upload-file.js`.

You can also run the `index.js` file with `npm start` (if you open package.json and look the npm scripts, that is where this is defined, it just runs `node index.js`).

In order to use the OpenAI API you'll need a secret key. For that, go to https://platform.openai.com/account/api-keys

Then, create a new secret key. Copy the value of the key. It will only be displayed a single time. If you lose it, you'll have to generate a new key.

In the root folder of the repository, create a file named `.env`. In there, assign a value to `OPENAI_API_KEY`. Example:

`OPENAI_API_KEY=sk-lkj44alkf345djoianwWJKoie342ewonivdanoiwa`

Save this file, and this should allow you to access the OpenAI API with the code.

The upload-file.js code is intended to generate the training file, and upload it to the OpenAI website. The start-job.js file is for creating a job to fine-tune based on our training data. You'll have to manually set the file ID based on what is returned from the upload-file.js code.

NOTE: You may need to run `npm install` again when pulling the code if additional packages have been added.