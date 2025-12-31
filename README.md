# 📦 Zap Shift – Parcel Management System

Zap Shift is a **full-stack parcel delivery and logistics management system** designed to manage parcel booking, pricing, rider assignment, warehouse routing, and real-time delivery tracking.  
The system follows a **role-based workflow** for Users, Admins, and Riders to ensure secure, efficient, and transparent courier operations.

---

## 📸 Screenshot

![Zap Shift Screenshot](/public/zap.png)

---

## ✨ Project Overview

Zap Shift streamlines courier services by automating pricing, tracking delivery status, and managing riders and warehouses across **nationwide coverage (64 districts)**.  
This project is suitable for **academic submission, system design practice, and real-world logistics applications**.

---

## 🧑‍💼 Roles & Responsibilities

### 👤 User
- Book parcels
- Pay delivery charges
- Track parcel status
- Submit reviews and feedback

### 🧑‍💻 Admin
- Assign pickup & delivery riders
- Manage routes and warehouses
- Monitor parcel status
- Control system operations

### 🚴 Rider
- Pick up and deliver parcels
- Update delivery status
- OTP-based delivery confirmation
- Earn commission per delivery

---

## 🛒 Pricing Structure

| Parcel Type | Weight | Within City | Outside City |
|------------|--------|-------------|--------------|
| Document | Any | ৳60 | ৳80 |
| Non-Document | Up to 3kg | ৳110 | ৳150 |
| Non-Document | Above 3kg | +৳40/kg | +৳40/kg + ৳40 extra |

---
### 🗂️ Core Features

🔄 Automated pricing & parcel tracking

🔐 Role-based authentication & authorization

📲 OTP-based secure delivery confirmation

🌍 Nationwide delivery coverage

💰 Transparent rider commission system

🏢 Warehouse-based inter-district routing

### 🧑‍💻 Technologies Used
## Frontend

React.js

React Router

Context API

Tailwind CSS

DaisyUI

## Backend

Node.js

Express.js

MongoDB

Firebase Admin SDK

Other Tools

Firebase Authentication

JWT Authorization

REST API Architecture

### 🚀 How to Run the Project Locally

1️⃣ Clone the Client Repository
git clone https://github.com/rh-rakib04/ZapShift
cd zap-shift-client

2️⃣ Install Frontend Dependencies
npm install

3️⃣ Setup Frontend Environment Variables

Create a .env file:

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id

4️⃣ Start Frontend
npm run dev

Backend Setup
5️⃣ Clone the Server Repository
git clone https://github.com/your-username/zap-shift-server.git
cd zap-shift-server

6️⃣ Install Backend Dependencies
npm install

7️⃣ Setup Backend Environment Variables

Create a .env file:

PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

8️⃣ Start Backend Server
npm start

### 🔮 Future Improvements

Real-time GPS tracking

Route optimization

Admin analytics dashboard

Payment gateway integration

Customer support & dispute handling

### ✅ Conclusion

Zap Shift demonstrates real-world parcel delivery workflows, secure role-based access, pricing logic, and scalable system design.
It is ideal for academic submissions, portfolio projects, and full-stack development evaluations.

### 👨‍💻 Author

Rakibul Hossain Bhuiya
Full-Stack Developer
📧 rakibulhossainbhuiya04@gmail.com
