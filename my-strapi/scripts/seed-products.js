// const path = require("path");
// const fs = require("fs");

// module.exports = async ({ strapi }) => {
//   const seedFilePath = path.join(__dirname, "..", "data", "products.json");

//   if (!fs.existsSync(seedFilePath)) {
//     console.log("Seed file not found: products.json");
//     return;
//   }

//   // قراءة الفايل كـ string
//   const rawData = fs.readFileSync(seedFilePath, "utf-8");

//   let data;
//   try {
//     data = JSON.parse(rawData);
//   } catch (error) {
//     console.error("Error parsing products.json:", error);
//     return;
//   }

//   // UID الجديد للـ Product في v5
//   const uid = "api::product.product";

//   // عد الإدخالات الموجودة (حتى لو draft)
//   const existingCount = await strapi.db.query(uid).count();

//   if (existingCount > 0) {
//     console.log(
//       `Products already exist (${existingCount} entries), skipping seeding...`
//     );
//     return;
//   }

//   console.log("Starting products seeding...");

//   const products = data.products.map((product) => {
//     const { id, ...rest } = product;
//     return rest;
//   });

//   // إنشاء واحد واحد عشان ننشرها published مباشرة
//   for (const product of products) {
//     await strapi.db.query(uid).create({
//       data: {
//         ...product,
//         publishedAt: new Date(), // مهم جداً عشان تبقى published
//       },
//     });
//   }

//   console.log(`Seeded ${products.length} products as published successfully!`);
// };

// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
const path = require("path");
const fs = require("fs");

module.exports = async ({ strapi }) => {
  const seedFilePath = path.join(__dirname, "..", "data", "products.json");

  if (!fs.existsSync(seedFilePath)) {
    console.log("Seed file not found: products.json");
    return;
  }

  const rawData = fs.readFileSync(seedFilePath, "utf-8");
  let data;
  try {
    data = JSON.parse(rawData);
  } catch (error) {
    console.error("Error parsing products.json:", error);
    return;
  }

  const uid = "api::product.product"; // صح 100% زي ما عندك

  // نشيك لو في منتجات منشورة بالفعل
  const publishedCount = await strapi.db
    .query(uid)
    .count({ where: { publishedAt: { $notNull: true } } });

  if (FileSystemWritableFileStream) {
    console.log(
      `Found ${publishedCount} published products, skipping seeding...`
    );
    return;
  }

  console.log("Starting products seeding (with publishing)...");

  const products = data.products.map((product) => {
    const { id, ...rest } = product; // نشيل الـ id اليدوي
    return rest;
  });

  // نعمل create وننشر كل منتج واحد واحد (أضمن طريقة في v5)
  for (const product of products) {
    await strapi.entityService.create(uid, {
      data: {
        ...product,
        publishedAt: new Date(), // ده اللي بيخليها published فوراً
      },
    });
  }

  console.log(
    `Successfully seeded and published ${products.length} products! 🎉`
  );
};
