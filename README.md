# Backend Development Fundamentals — Labs

**Student Name:** Pavan Kumar Reddy Kuncha  
**Registration Number:** 252U1R1187  
**Section:** CSE-D  
**Institution:** Aurora Higher Education and Research Academy  
**Course:** Backend Development Fundamentals (Year II · Term II)  
**GitHub Repository:** [https://github.com/pavankumar721/Backend-Development-Fundamentals-Pavan](https://github.com/pavankumar721/Backend-Development-Fundamentals-Pavan)

---

**🌐 Deployment Live Link:** [https://backend-development-fundamentals-pa-ochre.vercel.app](https://backend-development-fundamentals-pa-ochre.vercel.app/?_vercel_share=PWfqJH0QfuEs3XpU4t1QqfvYlL1KI1My)

---

## 📂 Labs

| Lab | Topic | Folder |
|-----|-------|--------|
| Lab 1 | Node.js HTTP module & Express server, routing, JSON responses, 404 handling | [`lab-01/`](./lab-01) |
| Lab 3 | REST API, query parameters, validation, debugging | [`lab-03/`](./lab-03) |

---

## 📂 Folder Structure

```
.
├─ api/           # Vercel serverless entry point
│   └─ index.js
├─ lab-01/        # Lab 1: Express server with routing
│   ├─ server.js
│   ├─ http-server.js
│   ├─ screenshots/
│   └─ README.md
├─ lab-03/        # Lab 3: REST API with query params, validation, debugging
│   ├─ server.js
│   ├─ http-server.js
│   ├─ screenshots/
│   └─ README.md
├─ package.json
├─ package-lock.json
└─ README.md
```

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/pavankumar721/Backend-Development-Fundamentals-Pavan.git
cd Backend-Development-Fundamentals-Pavan

# Lab 1
cd lab-01
npm install
npm start          # Express server → http://localhost:3000

# Lab 3
cd ../lab-03
npm install
npm start          # REST API → http://localhost:3000
```

---

## 📝 Rules for All Labs
- Never commit or share the `.env` file; `node_modules/` is excluded via `.gitignore`.
- Passwords are never stored or logged in plain text.
- Every route returns the correct HTTP status code.
- Use parameterised queries; never build SQL by joining user input into the string.
