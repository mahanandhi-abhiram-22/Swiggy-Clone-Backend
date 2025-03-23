Create a `README.md` file with the following content:  

### **📜 README.md**
```md
# Swiggy-Clone-Backend

This is the backend for the **Swiggy Clone** project, built using **Node.js, Express.js, MongoDB, and JWT authentication**.

## 🚀 Features
- Vendor Authentication (Register & Login)
- Firm Management (Add, Delete Firms)
- Product Management (Add, Delete Products)
- Secure API using JWT Authentication
- Image Uploading with Multer
- MongoDB Database with Mongoose

## 📂 Project Structure
```
backend/
│── controllers/
│── middlewares/
│── models/
│── routes/
│── uploads/
│── index.js
│── .gitignore
│── package.json
│── README.md
```

## 🔧 Installation & Setup
### **1️⃣ Clone the repository**
```sh
git clone https://github.com/mahanandhi-abhiram-22/Swiggy-Clone-Backend.git
cd Swiggy-Clone-Backend
```

### **2️⃣ Install dependencies**
```sh
npm install
```

### **3️⃣ Create a `.env` file**
```sh
MONGO_URI=your_mongodb_uri
WhatIsYourName=your_jwt_secret
```

### **4️⃣ Run the server**
```sh
node index.js
```

The server will run on **http://localhost:4000**.

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/vendor/register` | Register a new vendor |
| **POST** | `/vendor/login` | Vendor login |
| **GET** | `/vendor/all-vendors` | Get all vendors |
| **GET** | `/vendor/single-vendor/:id` | Get vendor by ID |
| **POST** | `/firm/add/:vendorId` | Add a firm |
| **DELETE** | `/firm/delete/:firmId` | Delete a firm |
| **POST** | `/product/add/:firmId` | Add a product |
| **GET** | `/product/:firmId` | Get all products of a firm |

## 🛠 Built With
- **Node.js** & **Express.js** - Backend API
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Multer** - Image Upload
- **Bcrypt** - Password Hashing

## 📌 Author
[**mahanandhi-abhiram-22**](https://github.com/mahanandhi-abhiram-22)
```
