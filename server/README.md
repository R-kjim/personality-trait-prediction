# Personality Test - Backend Server

A FastAPI-based backend service that provides AI-powered personality prediction using BERT models and the Big Five personality framework.

## Features

- **REST API**: FastAPI-based RESTful API for personality prediction
- **Machine Learning**: BERT-based natural language processing for text analysis
- **Big Five Model**: Predicts personality traits based on established psychological framework
- **CORS Support**: Configured for cross-origin requests from the frontend
- **Async Processing**: Asynchronous request handling for better performance
- **Pydantic Validation**: Input validation and serialization with Pydantic models

## Technology Stack

- **FastAPI** - High-performance API framework with automatic documentation
- **TensorFlow/Keras** - Deep learning framework for BERT model implementation
- **Transformers** - Hugging Face library for pre-trained language models
- **NLTK** - Natural language processing utilities
- **NumPy/Pandas** - Data manipulation and numerical computing
- **scikit-learn** - Machine learning utilities and metrics
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI web server implementation

## Project Structure

```
server/
--app/
    |--bert_model/          # BERT model files and configurations
    |--schemas/             # Pydantic models for request/response
        --main.py          # InputText and ClassificationResponse models
    |   utils/               # Utility functions and ML logic
        --main.py          # Personality prediction logic
    |   app.py              # FastAPI application setup
.venv/                  # Virtual environment (created by makefile)
makefile               # Development and deployment commands
 requirements.txt       # Python dependencies
 README.md             # This file
```

## Getting Started

### Prerequisites

- Python 3.8 or later
- pip package manager
- Virtual environment support

### Installation and Setup

1. **Using Make (Recommended)**:
   ```bash
   make run    # Create virtual environment, install dependencies and start the server
   ```

2. **Manual Setup**:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.app:app --reload
   ```

3. **Access the API**:
   - API Server: http://localhost:8000
   - Interactive Docs: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

### Available Make Commands

- `make env` - Create virtual environment and install dependencies
- `make run` - Start the FastAPI server with auto-reload
- `make clean` - Remove virtual environment and cache files

## API Endpoints

### POST `/predict_personality`

Analyzes input text and returns personality trait prediction.

**Request Body**:
```json
{
  "text": "Your response text here..."
}
```

**Response**:
```json
{
  "likelihood": 0.75,
  "personality": "openness"
}
```

**Personality Types**:
- `agreeableness` - Cooperation, trust, and helpfulness
- `conscientiousness` - Organization, discipline, and responsibility
- `extraversion` - Social energy, assertiveness, and outgoingness
- `neuroticism` - Emotional stability and stress management
- `openness` - Creativity, curiosity, and openness to experience

## Machine Learning Model

### BERT Implementation

The server uses a fine-tuned BERT (Bidirectional Encoder Representations from Transformers) model for personality prediction:

- **Text Preprocessing**: Tokenization and encoding for BERT input
- **Feature Extraction**: Contextual embeddings from pre-trained BERT
- **Classification**: Multi-class classification for Big Five traits
- **Prediction**: Likelihood scores for personality trait prediction

### Model Architecture

Located in `app/bert_model/`, the model includes:
- Pre-trained BERT base model
- Custom classification layers for personality traits
- Tokenizer configuration
- Model weights and checkpoints

