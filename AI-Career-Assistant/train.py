import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression


# 1. Load training data
with open("data/intents.json", "r", encoding="utf-8") as file:
    data = json.load(file)


# 2. Prepare sentences and labels
patterns = []
tags = []

for intent in data["intents"]:
    for pattern in intent["patterns"]:
        patterns.append(pattern)
        tags.append(intent["tag"])


# 3. Convert text into numerical features
vectorizer = TfidfVectorizer()

X = vectorizer.fit_transform(patterns)
y = tags


# 4. Create the ML classifier
model = LogisticRegression()

# 5. Train the model
model.fit(X, y)


# 6. Test the model
test_questions = [
    "How can I become a software developer?",
    "How should I prepare for an interview?",
    "Where can I find developer jobs?",
    "Hello, what can you do?"
]

test_vectors = vectorizer.transform(test_questions)
predictions = model.predict(test_vectors)


for question, prediction in zip(test_questions, predictions):
    print(f"Question: {question}")
    print(f"Predicted intent: {prediction}")
    print()