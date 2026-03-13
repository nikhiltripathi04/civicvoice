from models.text_analyzer import analyze_complaint
from models.image_classifier import classify_image


def compute_priority(urgency, confidence):

    urgency_score = {
        "Low": 10,
        "Medium": 25,
        "High": 40
    }

    score = urgency_score.get(urgency, 10) + (confidence * 40)

    return min(100, int(score))


def department_map(category):

    mapping = {
        "Pothole": "Roads Department",
        "Road Damage": "Roads Department",
        "Garbage": "Sanitation Department",
        "Streetlight": "Electricity Department",
        "Water Leak": "Water Department"
    }

    return mapping.get(category, "General Maintenance")


def fuse_results(text, image_path=None):

    text_result = analyze_complaint(text)

    image_result = None

    if image_path:
        image_result = classify_image(image_path)

    final_category = text_result["category"]
    source = "text"
    confidence = 0.6

    if image_result and image_result["confidence"] > 0.65:

        image_label = image_result["category"]

        if "pothole" in image_label:
            final_category = "Pothole"
        elif "garbage" in image_label:
            final_category = "Garbage"
        elif "streetlight" in image_label:
            final_category = "Streetlight"
        elif "water" in image_label:
            final_category = "Water Leak"
        elif "road" in image_label:
            final_category = "Road Damage"

        source = "image"
        confidence = image_result["confidence"]

    urgency = text_result["urgency"]

    priority = compute_priority(urgency, confidence)

    department = department_map(final_category)

    return {
        "category": final_category,
        "source": source,
        "confidence": confidence,
        "urgency": urgency,
        "priority_score": priority,
        "department": department,
        "keywords": text_result["keywords"]
    }