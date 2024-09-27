// src/QAComponent.jsx
import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Box,
    Fade,
} from '@mui/material';
import axios from 'axios';

const QAComponent = () => {
    const [question, setQuestion] = useState('');
    const [context, setContext] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://hugging-face-onem.onrender.com/ask', {
                question,
                context,
            });
            setAnswer(response.data.answer || 'No answer found.');
        } catch (error) {
            console.error(error);
            setAnswer('An error occurred while fetching the answer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Q&A System
                </Typography>
                <TextField
                    label="Question"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <TextField
                    label="Context"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    multiline
                    rows={4}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAsk}
                        disabled={loading}
                        sx={{
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                            },
                        }}
                    >
                        {loading ? 'Loading...' : 'Ask'}
                    </Button>
                </Box>
                <Fade in={!!answer} timeout={500}>
                    <Box sx={{ mt: 3 }}>
                        {answer && (
                            <>
                                <Typography variant="h6">Answer:</Typography>
                                <Typography>{answer}</Typography>
                            </>
                        )}
                    </Box>
                </Fade>
            </Paper>
        </Container>
    );
};

export default QAComponent;
