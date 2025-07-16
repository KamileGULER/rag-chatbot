import pandas as pd
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

def load_rag_model():
    df = pd.read_csv('rag_sorular_ve_cevaplar.csv')
    documents = df['Soru'].tolist()
    answers = df['Cevap'].tolist()

    embedder = SentenceTransformer('all-MiniLM-L6-v2')
    doc_embeddings = embedder.encode(documents, convert_to_tensor=False)

    faiss_index = faiss.IndexFlatL2(len(doc_embeddings[0]))
    faiss_index.add(np.array(doc_embeddings))


    tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
    model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")

    return embedder, faiss_index, documents, answers, tokenizer, model



def rag_chatbot(query, embedder, faiss_index, documents, answers, tokenizer, model):
    if not query.strip():
        return "Lütfen geçerli bir soru girin."

    query_embedding = embedder.encode([query], convert_to_tensor=False)
    _, nearest_idx = faiss_index.search(np.array(query_embedding), 1)
    closest_answer = answers[nearest_idx[0][0]]

    input_text = f"Cevap: {closest_answer}"
    inputs = tokenizer.encode(input_text, return_tensors="pt", truncation=True, max_length=1024)
    outputs = model.generate(inputs, max_length=150, num_beams=5, early_stopping=True)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return response
