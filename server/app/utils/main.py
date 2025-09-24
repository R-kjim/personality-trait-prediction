from typing import Dict, List, Text
import tensorflow as tf
from transformers import BertTokenizer, TFBertModel
import os
import numpy as np

from app.schemas.main import ClassificationResponse

class PersonalityPrediction:
    model_dir=os.path.join(os.getcwd(),'app/bert_model')
    tokenizer = None
    model = None
    bert_model = None
    
    # def __init__(self):
    #     print(self.model_dir)
    #     self.tokenizer = BertTokenizer.from_pretrained(self.model_dir)
    #     self.model = tf.keras.models.load_model(self.model_dir)
    #     self.bert_model= TFBertModel.from_pretrained('google-bert/bert-base-uncased')

    def load_model(self):
        try:
            model_dir=os.path.join(os.getcwd(),'app/bert_model/')
            # Load tokenizer
            self.tokenizer = BertTokenizer.from_pretrained(model_dir)
            
            # Load base BERT
            self.model = tf.keras.models.load_model(model_dir)

            self.bert_model= TFBertModel.from_pretrained('google-bert/bert-base-uncased')            
            return
        except Exception as e:
            print(e)
            raise Exception("Failed to initialize model and tokenizer")
    
    async def get_bert_embeddings(self, texts:List[Text], batch_size: int=8):
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i+batch_size]
            # Tokenize using tokenizer
            inputs = self.tokenizer(batch, return_tensors='tf', padding=True, truncation=True, max_length=128)
            # Get BERT outputs
            outputs = self.bert_model(inputs)
            # Average pooling across the sequence length (axis=1)
            pooled_output = tf.reduce_mean(outputs.last_hidden_state, axis=1)
        
            return pooled_output


    async def predict_trait(self, text:Text) -> ClassificationResponse:
        # if not all(item for item in [self.tokenizer, self.bert_model, self.model]):
        if not self.tokenizer or not self.model or not self.bert_model:
            self.load_model()
        

        embeddings = await self.get_bert_embeddings([text])

        # Predict
        predictions = self.model.predict(embeddings)

        # Convert prediction to labels
        predicted_class = np.argmax(predictions)
        traits=['agreeableness' ,'conscientiousness','extraversion' ,'neuroticism','openness']
        print(f"The text exhibits {traits[predicted_class].capitalize()} personality trait at {predictions[0][predicted_class]:.2%} confidence level")
        return {
            "likelihood": predictions[0][predicted_class],
            "personality":traits[predicted_class].lower()
        }

personality_prediction = PersonalityPrediction()