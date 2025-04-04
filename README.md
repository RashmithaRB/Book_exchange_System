# 📚 Book Management System with User Authentication

This is a **MERN (MongoDB, Express.js, React.js, Node.js)** project that allows users to **register**, **log in**, **add books**, and **review the added books**. The project includes secure user authentication and a dynamic interface for managing a collection of books.

---

## 🚀 **Features**
✅ User Registration and Login  
✅ Secure Authentication  
✅ Add Books with Details (Title, Author, Year)  
✅ Review Added Books  
✅ Error Handling and Data Validation  
✅ RESTful API Architecture  

---

## 🛠️ **Tech Stack**
| Component | Technology |
|-----------|------------|
| **Frontend** | React.js, Axios, Bootstrap |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | Mongoose |

---

## 📂 **Project Structure**
```
📦 login_register
├── 📁 client
│   ├── 📁 src
│   │   ├── 📄 App.js
│   │   ├── 📄 Home.jsx
│   │   ├── 📄 Login.jsx
│   │   ├── 📄 Register.jsx
├── 📁 server
│   ├── 📁 models
│   │   ├── 📄 Employee.js
│   │   ├── 📄 Book.js
│   ├── 📄 index.js
└── 📄 README.md
```

---

## 🌟 **Setup Instructions**

### 1. **Clone the Repository**
```bash
git clone https://github.com/RashmithaRB/Book-Management-System.git
```

### 2. Install Dependencies
```bash
npm init vite
```

Navigate to the client and server folders and install dependencies:

#### Install Frontend Dependencies:
```bash
cd client
npm install
```

#### Install Backend Dependencies:
```bash
cd ../server
npm install
```

### 3. Set Up MongoDB
- Create a MongoDB Atlas Cluster or install MongoDB locally.
- Update the MongoDB Connection String in `index.js`:
```javascript
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.hyr7o.mongodb.net/employee");
```

### 4. Start the Application
#### Start Backend:
```bash
cd server
npm start
```

#### Start Frontend:
```bash
cd client
npm run dev
```

---

## 💻 API Endpoints

### User Authentication
| Method | Endpoint  | Description |
|--------|----------|-------------|
| POST   | `/register` | Register a new user |
| POST   | `/login` | Log in an existing user |

### Book Management
| Method | Endpoint  | Description |
|--------|----------|-------------|
| GET   | `/home` | Get list of all books |
| POST  | `/addBook` | Add a new book |

---

## 🖥️ Usage
- **Register a User** – Open the app, go to the Register page, and create a new account.
- **Login** – Enter your credentials to log in.
- **Add Books** – Navigate to the Home page and fill out the form to add a book.
- **View Books** – All added books will appear in the list on the Home page.

---

## 🧪 Sample Test Data

### ➡️ Register:
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

### ➡️ Login:
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

### ➡️ Add Book:
```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "year": 1988
}
```

---

## 🛡️ Error Handling
- Validates empty fields during registration and book addition.
- Displays error messages for incorrect login credentials.
- Handles server errors gracefully using catch blocks.

---

## 🤝 Contributing
Contributions are welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/branch`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/branch`)
5. Open a Pull Request

---


---

## 🎯 Contact
**Author**: Rashmitha R Bangera  
📧 **Email**: bangerarashmitha2004@gmail.com  
🌐 **GitHub**: [RashmithaRB](https://github.com/RashmithaRB)  
🌐 **Linkedin**: [Rashmitha_R_Bangera](https://www.linkedin.com/in/rashmitha-r-bangera-335750246)
⭐️ **Star the repo if you find it helpful!** 😎

