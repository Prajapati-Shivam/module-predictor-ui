# 📚 Unit Predictor App

This is a web application that predicts the **Unit/Module number** of a question based on the uploaded syllabus.

Built with:
- **Backend:** Python Flask (deployed on Render)
- **Frontend:** Next.js (React) (to be deployed on Vercel)
- **Machine Learning Model:** Naive Bayes Classifier + CountVectorizer

---

## ✨ Features

- Upload **raw syllabus text** (module number + topics)
- Backend processes syllabus and creates a **clean CSV** (Unit, Topics).
- Ask **any questions** — the model predicts **which Unit** the question belongs to.
- Questions grouped **unit-wise** for better readability.

---

## 🛠 Project Structure

```bash
unit-predictor/
│
├── backend/ (Flask API)
│   ├── app.py
│   ├── requirements.txt
│   ├── module_data.csv (generated dynamically)
│   └── .gitignore
│
├── frontend/ (Next.js app)
│   ├── pages/
│   ├── components/
│   ├── public/
│   ├── .env.local
│   └── package.json
```

---

## 🚀 How to Run Locally

### Backend (Flask API)

1. Go inside the backend folder:

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. Start the server:

```bash
python app.py
```
- Flask app will run at `http://localhost:5000/`

---

### Frontend (Next.js)

1. Go inside the frontend folder:

```bash
cd frontend
npm install
```

2. Create `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

3. Start the frontend:

```bash
npm run dev
```
- Frontend will run at `http://localhost:3000/`

---

## 📋 How It Works (User Guide)

1. **Step 1:** Paste your **raw syllabus text** (module-wise topics) into the input box and click "Process Syllabus".
2. **Step 2:** System processes the syllabus, creates an internal **CSV**.
3. **Step 3:** Enter your **questions** (one per line) in the question box.
4. **Step 4:** Click "Predict Questions" — it will display all questions **grouped by their predicted Unit numbers**.

---

## 🧹 Notes

- **Syllabus Input Format:**  
  Must contain **module number** followed by detailed topics.
- **Error Handling:**  
  If syllabus format is incorrect, user will be alerted.
- **No uploading of Introduction, CO No., Ref No.**, etc. Only Module Number and Topics are processed.
- **Subtopics and Self-Learning Topics** are merged automatically.

---

## 📦 Deployment Steps (Summary)

- **Backend** deployed to **Render** using `gunicorn app:app`.
- **Frontend** deployed to **Vercel**.
- API URL updated from `localhost` to live Render URL.

---

## 👨‍💻 Technologies Used

- Flask
- Scikit-learn
- Pandas
- Gunicorn
- React (Next.js)
- Axios
- Tailwind CSS (if styling used)
