# 🛒 E-Commerce Website with Admin Dashboard

This project is a full-featured E-Commerce web application built using **React**, **Tailwind CSS**, and **Material Tailwind**, with both **User** and **Admin Dashboards**. It includes product listing, shopping cart functionality, order summary, product management, and more.

## 🚀 Live Demo

🔗 [View the Live App](https://e-commerce-with-dashboard.vercel.app)

## 📌 Features

### 🧑 User Layout
- Product Cards with image, name, price, and buttons
- Shopping Cart (Add/Remove)
- Total to Pay Summary
- Checkout Page
- Responsive Design for Mobile & Desktop

### 🛠️ Admin Layout
- Product Management (Edit, Add, Delete Products)
- Dashboard with stats (optional)
- Admin Navigation Sidebar
- Route Protection for Admin Pages (in progress/optional)

## 🛠️ Tech Stack

- ⚛️ React
- 🎨 Tailwind CSS
- 🧱 Material Tailwind
- ⚙️ React Router DOM
- 🧠 React Context API (for global state)
- 📦 Local Storage for cart persistence (optional)
- 🔐 Role-based layout system

## 📁 Folder Structure

e-commerceWithDashboard/
├── public/
├── src/
│ ├── components/ # Reusable UI components
│ ├── layouts/ # UserLayout & AdminLayout
│ ├── pages/ # Product Pages, Cart, Dashboard, etc.
│ ├── context/ # Cart Context, Language Context
│ ├── data/ # Product data (mocked or static)
│ ├── styles/ # Tailwind config and global styles
│ └── main.jsx
├── tailwind.config.js
├── package.json
└── README.md


## 🧠 Skills & Concepts Applied

- Reusable & Responsive Components
- Dynamic Routing with React Router
- React Context API for global state
- Conditional rendering based on user role
- Component-based layout system
- Form handling (for admin product management)

## ▶️ How to Run Locally

```bash
git clone https://github.com/mohamed-elrokapy/e-commerceWithDashboard.git
cd e-commerceWithDashboard
npm install
npm run dev

