// 'use strict';
// const seedProducts = require('./../scripts/seed-products');

// module.exports = {
//   /**
//    * An asynchronous register function that runs before
//    * your application is initialized.
//    *
//    * This gives you an opportunity to extend code.
//    */
//   register(/*{ strapi }*/) {},

//   /**
//    * An asynchronous bootstrap function that runs before
//    * your application gets started.
//    *
//    * This gives you an opportunity to set up your data model,
//    * run jobs, or perform some special logic.
//    */
//   bootstrap(/*{ strapi }*/) {},
// };

"use strict";

// استدعاء السكريبت اللي عملناه قبل كده
const seedProducts = require("../scripts/seed-products");
const seedUsers = require("../scripts/seed-users");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    try {
      // نشغل السكريبت بتاع الـ seeding
      await seedProducts({ strapi });
      await seedUsers({ strapi });
    } catch (error) {
      // لو حصل أي خطأ في الـ seeding، نطبع الإيرور عشان نعرف المشكلة
      console.error("Error during products seeding:", error);
    }
  },
};
