from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from PIL import Image
import io
import time

from models.text_analyzer import analyze_complaint as analyze_text
from models.image_classifier import classify_image
from models.fusion_engine import fuse_results

app = FastAPI(
    title="CivicVoice AI Engine",
    version="1.1",
    description="AI-powered civic complaint analysis system"
)


# -----------------------------
# Health Check
# -----------------------------
@app.get("/")
def root():
    return {
        "message": "CivicVoice AI Running",
        "status": "healthy"
    }


# -----------------------------
# Analyze Complaint
# -----------------------------
@app.post("/analyze")
async def analyze_complaint(
    text: str = Form(...),
    image: UploadFile = File(None)
):

    start_time = time.time()

    try:
        # -----------------
        # TEXT ANALYSIS
        # -----------------
        text_result = analyze_text(text)

        image_result = None

        # -----------------
        # IMAGE ANALYSIS
        # -----------------
        if image:

            contents = await image.read()

            try:
                img = Image.open(io.BytesIO(contents)).convert("RGB")
            except Exception:
                raise HTTPException(
                    status_code=400,
                    detail="Invalid image file uploaded"
                )

            image_result = classify_image(img)

        # -----------------
        # FUSION ENGINE
        # -----------------
        result = fuse_results(text_result, image_result)

        processing_time = round(time.time() - start_time, 3)

        return {
            "analysis": result,
            "meta": {
                "processing_time_seconds": processing_time,
                "image_provided": image is not None
            }
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI processing failed: {str(e)}"
        )