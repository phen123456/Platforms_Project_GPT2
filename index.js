// 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
const {Configuration, OpenAIApi} = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-YPkCwjzgHeqMXVB3iOBjko4a",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();


const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3080;

app.post('/', async (req,res) => {
    const { message, currentModel } = req.body;
    console.log(message, "message")
    console.log(currentModel, "currentModel")
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 200,
        temperature: 0.3,
      });
      res.json({
        // data: response.data
        message: response.data.choices[0].text,
      })
});

app.get('/models', async (req,res) => {
    const response = await openai.listEngines();
    console.log(response.data.data)
    res.json({
      models: response.data.data
    })
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${'+ port + '}')
});