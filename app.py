from flask import Flask, request, render_template, jsonify
from chatbot import load_rag_model, rag_chatbot

# Uygulamayı başlat
app = Flask(__name__)

# RAG bileşenlerini bir kez yükle (başta)
print("Modeller yükleniyor, lütfen bekleyin...")
embedder, faiss_index, documents, answers, tokenizer, model = load_rag_model()
print("Modeller yüklendi.")

# Ana sayfa (HTML arayüzü)
@app.route('/')
def index():
    return render_template('index.html')

# Soru-cevap API endpoint'i
@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    question = data.get('question', '')
    answer = rag_chatbot(question, embedder, faiss_index, documents, answers, tokenizer, model)
    return jsonify({'answer': answer})

# Çalıştır
if __name__ == '__main__':
    app.run(debug=True)
