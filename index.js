// server.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express(); 
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the QA API!');
});

app.post('/ask', async (req, res) => {
    const { question, context } = req.body;

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/liam168/qa-roberta-base-chinese-extractive',
            {
                inputs: {
                    question: question,
                    context: context,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                },
            }
        );

        const answer = response.data;
        res.json(answer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
