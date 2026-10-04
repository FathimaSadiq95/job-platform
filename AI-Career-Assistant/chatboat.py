import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression


# --------------------------------
# 1. Load training data
# --------------------------------

with open("data/intents.json", "r", encoding="utf-8") as file:
    intents_data = json.load(file)

with open("data/knowledge.json", "r", encoding="utf-8") as file:
    knowledge_data = json.load(file)


# --------------------------------
# 2. Prepare training data
# --------------------------------

patterns = []
tags = []

last_intent = None

for intent in intents_data["intents"]:
    for pattern in intent["patterns"]:
        patterns.append(pattern)
        tags.append(intent["tag"])


# --------------------------------
# 3. Convert text into TF-IDF
# --------------------------------

vectorizer = TfidfVectorizer(
    lowercase=True,
    ngram_range=(1, 2)
)

X = vectorizer.fit_transform(patterns)

# --------------------------------
# 4. Train ML model
# --------------------------------

model = LogisticRegression()

model.fit(X, tags)


# --------------------------------
# 5. Find response
# --------------------------------
def predict_intent(user_text):
    user_text = user_text.lower().strip()

    user_vector = vectorizer.transform([user_text])
    probabilities = model.predict_proba(user_vector)[0]

    max_probability = max(probabilities)
    predicted_intent = model.classes_[probabilities.argmax()]

    if max_probability < 0.30:
        return "unknown"

    return predicted_intent

def get_response(user_input):
    
    global last_intent

    user_text = user_input.lower().strip()

    # Handle common greetings directly
    greetings = [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good afternoon",
        "good evening"
    ]

    if user_text in greetings:
        return knowledge_data["general"]["hello"]

    user_vector = vectorizer.transform([user_input])

    probabilities = model.predict_proba(user_vector)[0]

    max_probability = max(probabilities)

    predicted_intent = model.classes_[probabilities.argmax()]
    print("Predicted intent:", predicted_intent)
    print("Confidence:", max_probability)
    if predicted_intent == "out_of_scope":
        return "I'm outside my current scope. You can ask me about Career, Interview, Jobs, or general career-related topics."

    last_intent = predicted_intent

    # Confidence check
    if max_probability < 0.30:
        return "I'm not sure I understood that. You can ask me about Career, Interview, or Jobs."

    # --------------------------------
    # General questions
    # --------------------------------

    if predicted_intent == "general":

        user_text = user_input.lower()

        if "python" in user_text:
            return knowledge_data["general"]["python"]

        elif "mern" in user_text:
            return knowledge_data["general"]["mern"]

        elif "resume" in user_text:
            return knowledge_data["general"]["resume"]

        elif any(word in user_text for word in ["hello", "hi", "hey"]):
            return knowledge_data["general"]["hello"]

        else:
             return "I can answer general questions about software development, careers, interviews, and jobs."

    # --------------------------------
    # Career questions
    # --------------------------------

    if predicted_intent == "career":

        user_text = user_input.lower()

        if "frontend" in user_text:
            return knowledge_data["career"]["frontend"]

        elif "backend" in user_text:
            return knowledge_data["career"]["backend"]

        elif "full stack" in user_text or "fullstack" in user_text:
            return knowledge_data["career"]["fullstack"]

        else:
            return knowledge_data["career"]["developer"]

    # --------------------------------
    # Interview questions
    # --------------------------------

    if predicted_intent == "interview":

        user_text = user_input.lower()

        if "hr" in user_text:
            return knowledge_data["interview"]["hr"]

        elif "project" in user_text:
            return knowledge_data["interview"]["project"]

        else:
            return knowledge_data["interview"]["technical"]

    # --------------------------------
    # Job questions
    # --------------------------------

    if predicted_intent == "job":

        user_text = user_input.lower()

        if "internship" in user_text or "intern" in user_text:
            return knowledge_data["job"]["internship"]

        elif "fresher" in user_text or "entry level" in user_text:
            return knowledge_data["job"]["fresher"]

        else:
            return knowledge_data["job"]["search"]

    elif predicted_intent == "candidate":
         return "Yes, I can help you find suitable candidates. Please use the Search option to view complete candidate profiles."


# --------------------------------
# 6. Start chatbot
# --------------------------------

if __name__ == "__main__":

    print("AI Career Assistant: Hello! Ask me about Career, Interview, or Jobs.")
    print("Type 'bye' to exit.")

    while True:

        user_input = input("You: ")

        if user_input.lower() == "bye":
            print("AI Career Assistant: Goodbye! Good luck with your career.")
            break

        response = get_response(user_input)

        print("AI Career Assistant:", response)