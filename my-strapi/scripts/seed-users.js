const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

module.exports = async ({ strapi }) => {
  const seedFilePath = path.join(__dirname, "..", "data", "users.json");

  if (!fs.existsSync(seedFilePath)) {
    console.log("Seed file not found: users.json");
    return;
  }

  const rawData = fs.readFileSync(seedFilePath, "utf-8"); // utf-8 عشان TypeScript
  let data;
  try {
    data = JSON.parse(rawData);
  } catch (error) {
    console.error("Error parsing users.json:", error);
    return;
  }

  const uid = "plugin::users-permissions.user"; // UID الجديد للـ User في v5

  console.log("Starting users seeding...");

  for (const user of data.users) {
    // شوف لو اليوزر موجود بالفعل (بالإيميل)
    const existingUsers = await strapi.db.query(uid).findMany({
      where: { email: user.email },
    });

    if (existingUsers.length > 0) {
      console.log(`User with email ${user.email} already exists, skipping...`);
      continue;
    }

    // Hash الباسوورد
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // جيب الـ role ID
    const role = await strapi.db
      .query("plugin::users-permissions.role")
      .findOne({
        where: { type: user.role },
      });

    if (!role) {
      console.error(
        `Role "${user.role}" not found! Skipping user ${user.email}`
      );
      continue;
    }

    // أنشئ اليوزر
    await strapi.db.query(uid).create({
      data: {
        username: user.fullname,
        email: user.email,
        password: hashedPassword,
        confirmed: true,
        blocked: false,
        role: role.id,
        phone: user.phone,
      },
    });

    console.log(`Seeded user: ${user.email}`);
  }

  console.log("Users seeding completed!");
};
