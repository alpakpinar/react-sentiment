# react-sentiment
Sentiment predictor web application, developed with React+Flask. Neural network model trained with Keras. 
This app is deployed with Heroku on this [link](https://react-sentiment.herokuapp.com/).

The sentiment predictions are done via a neural network model, which is trained on review datasets from Amazon, Yelp and IMDB.
The model is stored under `api/sentiment_model.h5` file in this repository, and is read from the back-end API to predict
sentiment scores (in a range of 0-100) using the model.

## Setup and Running

This project can be run locally, using a virtual Python environment. Once you create the virtual environment, 
install the repository to your local and install the requirements via:

`pip install -r requirements.txt`

from the root directory of this project. Once all the packages are installed, from the root directory, run:

`flask run`

This should run the web application on `localhost` port `5000`.
