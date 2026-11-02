#!/bin/bash

# -----------------------------
# 0️⃣ تأكد من Node.js موجودة
# -----------------------------
if ! command -v npm &> /dev/null
then
    echo "❌ npm مش موجودة، تأكد إن Railway Container Node.js environment"
    exit 1
fi

# -----------------------------
# 1️⃣ Build & Start Strapi
# -----------------------------
echo "🚀 Starting Strapi backend..."

cd my-strapi || { echo "❌ my-strapi folder not found"; exit 1; }

# تثبيت الـ dependencies
npm install

# Build Strapi
npm run build

# -----------------------------
# 2️⃣ Build Frontend
# -----------------------------
echo "🎨 Building Frontend..."

cd ../frontend || { echo "❌ frontend folder not found"; exit 1; }

# تثبيت dependencies وبناء المشروع
npm install
npm run build

# انسخ build للـ Strapi public folder
cp -r dist/. ../my-strapi/public/ || { echo "❌ dist folder not found"; exit 1; }

# -----------------------------
# 3️⃣ Start Strapi
# -----------------------------
echo "✅ Launching Strapi..."
cd ../my-strapi || exit 1
npm run start
