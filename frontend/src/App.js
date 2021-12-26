import React, { useState } from 'react';

import {
  Box,
  TextField,
  Button,
  Typography
} from '@material-ui/core';

import LinearProgressWithLabel from './components/LinearProgressWithLabel';
import AppHeader from './components/AppHeader';

import './App.css';

const BASE_URL = 'https://react-sentiment.herokuapp.com/';
// const BASE_URL = 'http://localhost:5000/';

function CustomTextField() {
  const [text, setText] = useState("");
  const [score, setScore] = useState(0);

  const HORIZONTAL_WIDTH = 0.5;

  const updateText = event => {
    const text = event.target.value;
    if (text === "") {
      return setScore(0);
    }
    setText(text);
  };

  const handleSubmit = (event, fromKeyPress=true) => {
    if (fromKeyPress && (event.keyCode !== 13)) {
      return;
    }
    // API to fetch sentiment scores based on the text input
    const API_URL = `${BASE_URL}/api/sentiment?sentence=${text}`;

    fetch(API_URL)
    .then(async response => {
      if (response.ok) {
        let json = await response.json();
        // Retrieve the sentiment score out of the JSON object
        // Also some minor cleaning is done here to remove additional quotation marks
        const score = Number(json.sentiment_score.replaceAll('"', '')) * 100;
        setScore(score);
      }
    });
  };

  return (
    <Box my={10} alignItems='center' justifyContent='center'>
      <Box mx="auto" my={5} width={HORIZONTAL_WIDTH}>
        <Typography variant="h4">
          Sentiment Predictor
        </Typography>
      </Box>
      <Box mx="auto" my={2} width={HORIZONTAL_WIDTH}>
        <Typography variant="body1">
          Enter an English phrase down below and get a score based on the sentiment of the phrase!
          Score range is 0-100, 0 being the lowest sentiment and 100 being the highest.
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mx="auto" my={5} width={HORIZONTAL_WIDTH}>
        <Box width={1} mr={2}>
          <TextField 
            variant="outlined"
            placeholder='Type your sentence here...'
            onChange={updateText}
            onKeyDown={handleSubmit}
            fullWidth
          />
        </Box>
        <Box>
          <Button 
            variant="contained" 
            color="primary"
            onClick={e => handleSubmit(e, false)}
            >
            Go!
          </Button>
        </Box>
        
      </Box>
      <LinearProgressWithLabel 
        width={HORIZONTAL_WIDTH}
        score={score}
      />
    </Box>
  )
}

function App() {
  return (
    <div style={{
      textAlign: "center"
    }}>
      <AppHeader />
      <CustomTextField />
    </div>
  );
}

export default App;
