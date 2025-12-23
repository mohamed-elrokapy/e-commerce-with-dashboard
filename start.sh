#!/bin/bash

# -----------------------------
# 1️⃣ Build & Start Strapi
# -----------------------------
echo "🚀 Starting Strapi backend..."

cd my-strapi

# تثبيت الـ dependencies لو مش موجودة
npm install

# Build Strapi
npm run build

# -----------------------------
# 2️⃣ Build Frontend
# -----------------------------
echo "🎨 Building Frontend..."

cd ../frontend

npm install
npm run build

# انسخ build للـ Strapi public folder
cp -r dist ../my-strapi/public

# -----------------------------
# 3️⃣ Start Strapi
# -----------------------------
echo "✅ Launching Strapi..."
cd ../my-strapi
npm run start
