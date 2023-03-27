
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-ALuwSWTGB8it1YcQVVmTjcDv",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
100



app.use(bodyParser.json());
app.use(cors())


//create a simple express api that calls the function above

const port = 4000

app.post('/', async (req,res) => {
    const {message} = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
      res.json({
          message: response.data.choices[0].text
      })
})

app.listen(port, () => {
    console.log(`Server running in port : ${port}`)
})