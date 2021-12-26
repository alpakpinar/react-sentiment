import os
import json
import pickle

from flask import request
from flask_restful import Resource
from tensorflow import keras

class SentimentComputer():
    def __init__(self) -> None:
        """Class to get sentiment predictions from a given sentence."""
        self.modelfile = os.path.abspath('api/sentiment_model.h5')
        assert os.path.exists(self.modelfile), f"Model file named {self.modelfile} does not exist!"

        self.vectorizefile = os.path.abspath('api/sentiment_vec.pkl')
        assert os.path.exists(self.vectorizefile), f"Vectorizer pickle file named {self.vectorizefile} does not exist!"
        self._load_model()
        self._load_vectorizer()

    def _load_model(self):
        self.model = keras.models.load_model(self.modelfile)

    def _load_vectorizer(self):
        with open(self.vectorizefile, 'rb') as f:
            self.vectorizer = pickle.load(f)

    def compute_prediction(self, sentence: str):
        """Compute the sentiment score prediction from a sentence.

        Args:
            sentence (str): The sentence being considered.
        """
        vectorized = self.vectorizer.transform([sentence])
        return self.model.predict(vectorized)


class ApiHandler(Resource):
    def __init__(self, sentence) -> None:
        # self.sentence = sentence
        self.sentence = request.args['sentence']
        self.computer = SentimentComputer()
    
    def get(self):
        try:
            scorelist = self.computer.compute_prediction(self.sentence)
            # There should be a single number returned
            assert len(scorelist) == 1
            score = scorelist[0][0]
            return {
                'status' : 'success',
                'sentiment_score' : json.dumps(str(score)),
            }
        except Exception as e:
            return {
                'status' : 'failed',
                'error' : e.message,
            }