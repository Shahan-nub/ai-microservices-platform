import google.generativeai as genai

from ..config import GOOGLE_API_KEY

genai.configure(
    api_key=GOOGLE_API_KEY
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def analyze_resume(
    resume_text
):

    prompt = f"""
You are an ATS Resume Analyzer.

Analyze this resume.

Return:

1. ATS Score out of 100
2. Strengths
3. Missing Skills
4. Improvement Suggestions

Resume:

{resume_text}
"""

    response = model.generate_content(
        prompt
    )

    return response.text