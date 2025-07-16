# 🧠 RAG ChatBot – Knowledge-Based Intelligent Answering System

**RAG ChatBot** is a Retrieval-Augmented Generation (RAG) application that intelligently answers user questions by matching them with pre-defined content.  
It combines Python, Flask, FAISS, and Transformers technologies to provide a fast and effective question-answering experience.

---

## 🚀 Features

- 🔍 **Semantic similarity with FAISS:** Quickly finds the most relevant match for a given question
- 🤖 **Natural language generation with BART:** Makes responses sound more human and readable
- 💡 **Beginner-friendly structure:** Simple logic with powerful language processing
- 🌐 **Modern web interface:** Clean, interactive design using HTML, CSS, and JavaScript

---

## 🧰 Technologies Used

- `Flask` – Web server
- `FAISS` – Vector similarity search
- `Sentence-Transformers` – Sentence embeddings
- `Transformers (HuggingFace)` – Language model (BART)
- `HTML + JavaScript` – Frontend

---

## 📁 Project Structure

```
rag-chatbot/
├── app.py                 # Flask app
├── chatbot.py             # Model & embeddings
├── requirements.txt       # Dependencies
├── static/
│   └── script.js          # Frontend JS logic
├── templates/
│   └── index.html         # Web interface
├── rag_sorular_ve_cevaplar.csv  # Sample dataset (optional)
└── README.md              # Project documentation
```

---

## ⚙️ Installation

### 1. Install dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the app

```bash
python app.py
```

### 3. Open in your browser

```
http://127.0.0.1:5000
```

## 📝 Dataset Format

The chatbot expects a CSV file structured like this:

```csv
Soru,Cevap
What is Python?,Python is a versatile programming language.
What is HTML?,HTML is used to structure web pages.
...
```

> This file is loaded inside the `load_rag_model()` function in `chatbot.py`.

---

## 👨‍💻 Contributing

You can fork the repo, submit pull requests, or open issues to suggest new features or report bugs. Contributions are welcome!
