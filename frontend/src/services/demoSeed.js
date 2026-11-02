// Seed data for the browser-only demo backend.
//
// DEMO ONLY. These accounts are fake and exist so reviewers can sign in
// without creating anything. They are shown on the sign-in page on purpose.
// Never use a real password anywhere in this app.
//
// Products come from db.json (the original json-server seed). Only the
// products array is imported, so the legacy user records in db.json are not
// part of the bundle.

import { products } from "../../db.json";

export const DEMO_ACCOUNTS = [
  {
    fullName: "Demo Admin",
    email: "admin@demo.test",
    phone: "555 0100",
    role: "admin",
    password: "Admin#Demo1",
  },
  {
    fullName: "Demo Shopper",
    email: "shopper@demo.test",
    phone: "555 0101",
    role: "user",
    password: "Shopper#Demo1",
  },
];

const SEEDED_AT = Date.now();

export const DEMO_PRODUCTS = products.map((p, index) => ({
  id: `p${index + 1}`,
  title: p.title,
  productDescription: p.productDescription,
  price: p.price,
  img: p.img,
  createdAt: new Date(SEEDED_AT + index).toISOString(),
}));
