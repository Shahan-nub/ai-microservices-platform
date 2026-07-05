import os
import json

import google.generativeai as genai

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_resume(text):

    prompt = f"""
Analyze the following resume.

Return ONLY valid JSON.

{{
    "ats_score": number,
    "analysis": "Detailed analysis including strengths, weaknesses and improvements."
}}

Resume:

{text}
"""

    response = model.generate_content(prompt)

    cleaned = (
        response.text
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(cleaned)