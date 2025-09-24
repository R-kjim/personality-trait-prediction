# Personality Test App

An AI-powered personality prediction application that analyzes text responses to determine personality traits based on the Big Five personality model. [Repository]()

The underlying model was trained in a separate repository: [Big Five Personality Prediction Model Training Repo](https://github.com/R-kjim/big-five-personality-prediction.git)


## Overview

This project consists of two main components:
- **Client**: A Next.js React frontend application with a modern UI
- **Server**: A FastAPI Python backend with machine learning personality prediction

## Features

- **Interactive Personality Analysis**: Answer random questions and get AI-powered personality insights
- **Big Five Model**: Analysis based on the established Big Five personality traits (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)
- **Real-time Results**: Instant personality prediction with likelihood scores
- **Modern UI**: Responsive design with Tailwind CSS and shadcn/ui components
- **Machine Learning**: BERT-based model for text analysis and personality prediction

## Architecture

```
personality_test/
-- client/          # Next.js frontend application
-- server/          # FastAPI backend with ML models
-- README.md       
```

## Quick Start

### Prerequisites

- Node.js 20+ and npm
- Python 3.8+
- pip or pipenv

### Running the Application

1. **Start the Backend Server**:
   ```bash
   cd server
   make run
   ```

2. **Start the Frontend Client**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Access the Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## How It Works

1. Users are presented with random personality-related questions
2. They provide text responses describing their thoughts, experiences, or feelings
3. The AI model analyzes the text using BERT-based natural language processing
4. The system returns personality trait predictions with confidence scores
5. Results are displayed with detailed explanations of each Big Five trait

## Technology Stack

### Frontend (Client)
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and development experience
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **Lucide React** - Icon library

### Backend (Server)
- **FastAPI** - High-performance API framework
- **TensorFlow/Keras** - Machine learning framework
- **Transformers** - BERT model implementation
- **NLTK** - Natural language processing
- **NumPy/Pandas** - Data manipulation
- **scikit-learn** - Additional ML utilities

## Development

See individual README files in the `client/` and `server/` directories for detailed development instructions.

## API Endpoints

- `POST /predict_personality` - Analyze text and return personality predictions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and demonstration purposes.# personality-trait-prediction
