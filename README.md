# 🧠 RAG ChatBot – Bilgiye Dayalı Akıllı Cevaplama Sistemi

**RAG ChatBot**, kullanıcının sorduğu doğal dildeki soruları, önceden tanımlanmış veri kümesinden anlamlı şekilde eşleştirerek cevaplayan bir **Retriever-Augmented Generation (RAG)** uygulamasıdır.  
Proje, Python, Flask, FAISS ve Transformers teknolojilerini bir araya getirerek etkili ve hızlı bir soru-cevap deneyimi sunar.

---

## 🚀 Özellikler

- 🔍 **FAISS ile benzer soru eşleştirme:** En alakalı veriyi bulmak için hızlı vektör araması
- 🤖 **BART modeliyle doğal dil üretimi:** Cevapları daha anlaşılır ve insan benzeri hale getirir
- 💡 **Öğrenme dostu yapı:** Basit mantıkla ileri düzey doğal dil işleme uygulaması
- 🌐 **Modern web arayüzü:** HTML, CSS ve JavaScript ile hazırlanmış şık ve etkileşimli arayüz

---

## 🧰 Kullanılan Teknolojiler

- `Flask` – Web sunucusu
- `FAISS` – Vektör tabanlı benzerlik araması
- `Sentence-Transformers` – Soru gömme (embedding)
- `Transformers (HuggingFace)` – Cevap oluşturma (BART)
- `HTML + JavaScript` – Ön yüz

---

## 📁 Proje Yapısı

```
rag-chatbot/
├── app.py                 # Flask sunucusu
├── chatbot.py             # Model ve embedding işlemleri
├── requirements.txt       # Gerekli kütüphaneler
├── static/
│   └── script.js          # Mesaj gönderme ve alma
├── templates/
│   └── index.html         # Web arayüzü
├── rag_sorular_ve_cevaplar.csv  # Örnek veri seti (isteğe bağlı)
└── README.md              # Proje açıklaması
```

---

## ⚙️ Kurulum

### 1. Bağımlılıkları kur

```bash
pip install -r requirements.txt
```

### 2. Uygulamayı çalıştır

```bash
python app.py
```

### 3. Tarayıcıdan aç

```
http://127.0.0.1:5000
```

---

## 📝 Veri Seti Formatı

Proje aşağıdaki gibi bir `CSV` dosyası bekler:

```csv
Soru,Cevap
Python nedir?,Python çok yönlü bir programlama dilidir.
HTML ne işe yarar?,Web sayfalarının iskeletini oluşturur.
...
```

> Bu dosya, `chatbot.py` içindeki `load_rag_model()` fonksiyonu tarafından yüklenir.

---

## 🧠 Geliştirme Fikirleri

- ✅ Kullanıcıdan gelen soruları loglama
- ✅ Chat geçmişini kaydetme
- ✅ Yeni modellerle (T5, Falcon, LLaMA) deneme
- ✅ Türkçe için özel dil modeli kullanımı

---

## 🧑‍💻 Katkı Sağla

İstersen projeyi fork'layarak geliştirebilir, hata bildirebilir veya yeni özellikler önerebilirsin. Her katkı memnuniyetle karşılanır.

---

## 📄 Lisans

Bu proje MIT Lisansı ile lisanslanmıştır.