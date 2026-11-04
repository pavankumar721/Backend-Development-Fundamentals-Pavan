# BDF Lab 03 REST API Query Parameters Validation Debugging

**Deployment URL:** https://<your-deployment-url>.vercel.app  
*(Replace the above placeholder with the actual public URL after deployment.)*

---

## 📋 Student Details
- **Name:** <Your Name>
- **Registration Number:** <Your Registration Number>
- **Section:** <Your Section>

---

## 🚀 Installation
```bash
# Clone the repository
git clone https://github.com/<your-github-username>/<repo-name>.git
cd <repo-name>

# Install dependencies
npm install
```

## ▶️ Execution
```bash
# Run the application locally
npm start
```

The server will start on `http://localhost:3000` (or the port defined in your environment).

---

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Retrieve list of users |
| GET | `/api/users/:id` | Get a user by ID |
| POST | `/api/users` | Create a new user |
| PUT | `/api/users/:id` | Update an existing user |
| DELETE | `/api/users/:id` | Delete a user |

*Add any additional endpoints required by the lab.*

---

## 📸 Screenshots
Below are screenshots of the working endpoints. Place the images inside the `screenshots/` directory and they will be displayed here.

![GET /api/users](screenshots/get-users.png)
![POST /api/users](screenshots/post-users.png)

*Add more screenshots as needed.*

---

## 📝 Notes
- Ensure that query parameters are validated according to the lab specifications.
- Use proper error handling for invalid requests.
- Follow the coding standards provided in the lab document.

---

## 📂 Folder Structure
```
.
├─ api/                # Vercel serverless functions
│   └─ index.js
├─ lab-01/            # Main application source
│   ├─ server.js
│   └─ ...
├─ screenshots/       # Screenshots of API responses
│   ├─ get-users.png
│   └─ post-users.png
├─ package.json
├─ package-lock.json
└─ README.md
```