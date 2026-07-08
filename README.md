# 🤖 AI Interview Coach

An AI-powered mock interview platform that helps students and job seekers prepare for technical interviews through role-based interview sessions, AI-generated questions, speech-based answers, instant feedback, and detailed performance reports.

---

## 🚀 Features

* 🔐 Secure User Authentication (JWT)
* 👤 User Registration & Login
* 💼 Role-Based Interview Creation
* 🤖 AI-Generated Interview Questions
* 🎤 Voice Recording & Answer Submission
* 📝 AI Feedback on Every Answer
* 📊 Detailed Interview Performance Report
* 📈 Dashboard with Interview History & Statistics
* 📱 Fully Responsive User Interface
* 🔒 Protected Routes
* 🌐 RESTful API Architecture

---

## 🛠 Tech Stack

### Frontend

* React.js (Vite)
* React Router DOM
* Axios
* CSS3
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JSON Web Token (JWT)
* bcrypt.js
* Multer

### AI

* AI-powered interview question generation
* AI-based answer evaluation and feedback

---

## 📂 Project Structure

```
AI-Interview-Coach/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/AI-Interview-Coach.git
cd AI-Interview-Coach
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_api_key
```

Start the backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

Backend:

```
http://localhost:5000
```


## 🔑 API Endpoints

### Authentication

```
POST   /api/auth/register
POST   /api/auth/login
```

### Interviews

```
POST   /api/interviews/create
GET    /api/interviews/my
POST   /api/interviews/:id/generate-questions
POST   /api/interviews/:id/start
POST   /api/interviews/submit-answer
GET    /api/interviews/:id/report
```

---

## 💡 Future Improvements

* Resume-Based Interview Generation
* Company-Specific Interview Rounds
* Video Interview Support
* Coding Assessment Module
* AI Career Recommendations
* Performance Analytics Dashboard
* Leaderboard & Streak System
* Multi-Language Support

---

## 👨‍💻 Author

**Samal Kumar**

* Full Stack Developer
* MERN Stack Developer
* Java & Spring Boot Enthusiast

GitHub: https://github.com/Samal-kr-101

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub. It helps others discover the project and motivates future improvements.
