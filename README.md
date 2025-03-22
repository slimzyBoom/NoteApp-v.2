### 📚 Note-Taking API with TypeScript, Express, and MongoDB  

#### **Overview**  
This is a simple Note-Taking API built with **Node.js, Express, TypeScript, and MongoDB**. The API allows users to **create, update, delete, and fetch notes**, each categorized under a specific category. Notes without a specified category are automatically assigned to a default "General" category.

---

## ✨ Features  
✅ **CRUD Operations for Notes** 📝  
✅ **Category Support** for organizing notes 📂  
✅ **Automatic Category Assignment** when a category is not specified ✅  
✅ **Validation Middleware** using TypeScript Generics ✅  
✅ **Logging Middleware** to track API requests 📊  
✅ **MongoDB Integration** for data persistence 📋  

---

## ⚙️ Installation & Setup  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/your-repo/note-taking-api.git
cd note-taking-api
```

### **2️⃣ Install Dependencies**  
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**  
Create a `.env` file in the project root and add:  
```
MONGO_URI=mongodb://localhost:27017/noteDB
PORT=5000
JWT_SECRET=your_jwt_secret
```

### **4️⃣ Start the Server**  
```sh
npm run dev
```
The API will be available at:  
**`http://localhost:5000`**

---

## 📌 API Endpoints  

### **📌 Notes API**  
| Method | Endpoint                  | Description                 |
|--------|---------------------------|-----------------------------|
| `POST` | `/api/notes`               | Create a new note (default category: "General" if none provided) |
| `GET`  | `/api/notes`               | Get all notes               |
| `GET`  | `/api/notes/:id`           | Get a single note by ID     |
| `PUT`  | `/api/notes/:id`           | Update a note               |
| `DELETE` | `/api/notes/:id`         | Delete a note               |
| `GET`  | `/api/notes/category/:categoryId` | Get notes by category |

### **📌 Categories API**  
| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| `POST` | `/api/categories`         | Create a new category           |
| `GET`  | `/api/categories`         | Get all categories              |
| `GET`  | `/api/categories/:id`     | Get a single category by ID     |
| `DELETE` | `/api/categories/:id`   | Delete a category               |

---

## 👆 Example Requests  

### **1️⃣ Create a Category**  
```http
POST http://localhost:5000/api/categories
Content-Type: application/json
```
#### **Request Body**  
```json
{
  "name": "Work"
}
```
#### **Response**  
```json
{
  "id": "60f8c9b0e9f3f90c3c4a5e3d",
  "name": "Work"
}
```

---

### **2️⃣ Create a Note**  
```http
POST http://localhost:5000/api/notes
Content-Type: application/json
```
#### **Request Body**  
```json
{
  "title": "Meeting Notes",
  "content": "Discuss project updates"
}
```
#### **Response**  
```json
{
  "id": "60f8c9b0e9f3f90c3c4a5e3e",
  "title": "Meeting Notes",
  "content": "Discuss project updates",
  "category": {
    "id": "default-category-id",
    "name": "General"
  },
  "createdAt": "2025-03-10T12:34:56.789Z"
}
```

---

### **3️⃣ Get Notes by Category**  
```http
GET http://localhost:5000/api/notes/category/60f8c9b0e9f3f90c3c4a5e3d
```
#### **Response**  
```json
[
  {
    "id": "60f8c9b0e9f3f90c3c4a5e3e",
    "title": "Meeting Notes",
    "content": "Discuss project updates",
    "category": {
      "id": "60f8c9b0e9f3f90c3c4a5e3d",
      "name": "Work"
    }
  }
]
```

---

## 📂 Project Structure  

```
note-taking-api/
│-- src/
│   ├── models/            # Mongoose Models
│   ├── routes/            # API Routes
│   ├── controllers/       # Request Handlers
│   ├── middleware/        # Logging & Validation Middleware
│   ├── config/            # Database Connection
│   ├── app.ts             # Express App Setup
│   ├── server.ts          # Server Entry Point
│-- .env                   # Environment Variables
│-- package.json           # Dependencies
│-- tsconfig.json          # TypeScript Config
│-- README.md              # Documentation
```

---

## 🛠️ Tech Stack  

| Technology  | Description |
|-------------|------------|
| **Node.js** | Server runtime |
| **Express.js** | Web framework |
| **TypeScript** | Type safety |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT & bcrypt** | Authentication & security |
| **Cors & dotenv** | Security & config management |
