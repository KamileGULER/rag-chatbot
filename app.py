from flask import Flask, request, render_template, jsonify
from chatbot import load_rag_model, rag_chatbot
import numpy as np

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

# Admin 
@app.route('/admin')
def admin_panel():
    password = request.args.get('pw')
    if password != '12345':
        return "Unauthorized – Please provide correct password in the URL.", 403
    return render_template('admin.html')

@app.route('/add_qa', methods=['POST'])
def add_qa():
    data = request.get_json()
    new_q = data.get('question', '').strip()
    new_a = data.get('answer', '').strip()

    if not new_q or not new_a:
        return jsonify({'succes': False, 'message': 'Please fill in all fields.'})
    
    #Add to the CSV file.
    import csv
    with open('rag_sorular_ve_cevaplar.csv', 'a', encoding='utf-8',newline='') as f:
        writer = csv.writer(f)
        writer.writerow([new_q, new_a])

    #Update memory
    documents.append(new_q)
    answers.append(new_a)

    new_vec = embedder.encode([new_q], convert_to_tensor=False)
    faiss_index.add(np.array(new_vec))

    return jsonify({'success': True, 'message': 'Added'})

# Çalıştır
if __name__ == '__main__':
    app.run(debug=True)

