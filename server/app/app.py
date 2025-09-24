from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from app.schemas.main import ClassificationResponse, InputText
from app.utils.main import personality_prediction


app = FastAPI(
    title= " Text Based Personality Predictor "
)

app.add_middleware(
    CORSMiddleware,
    allow_origins= ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post(
    "/predict_personality",
    response_model= ClassificationResponse
)
async def predict_personality(
    data: InputText
):
    try:
        res = await personality_prediction.predict_trait( text= data.text)
        return res
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code= status.HTTP_504_GATEWAY_TIMEOUT,
            detail= str(e) or "Error predicting your personality"
        )
    
