from typing import Literal, Text
from pydantic import BaseModel, field_validator

class InputText(BaseModel):
    text: Text

    @field_validator("text")
    def validate_text(cls, field):
        return field.strip()
    
class ClassificationResponse(BaseModel):
    likelihood:float
    personality: Literal['agreeableness' ,'conscientiousness','extraversion' ,'neuroticism','openness']
    