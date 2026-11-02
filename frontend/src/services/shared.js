// Types and helpers shared by every backend implementation.
//
// Product: { id, title, description, price (number), image, createdAt }
// User:    { id, fullName, email, phone, role: "admin" | "user", createdAt }

export class ApiError extends Error {
  constructor(message, { status, cause } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.cause = cause;
  }
}

export function normalizeProduct(raw) {
  return {
    id: String(raw.id),
    title: String(raw.title ?? "").trim() || "Untitled product",
    description: String(raw.description ?? raw.productDescription ?? "").trim(),
    price: Number(raw.price) || 0,
    image: String(raw.image ?? raw.img ?? "").trim(),
    createdAt: raw.createdAt ?? null,
  };
}

export function normalizeUser(raw) {
  return {
    id: String(raw.id),
    fullName: String(raw.fullName ?? raw.fullname ?? raw.username ?? "").trim(),
    email: String(raw.email ?? "").trim(),
    phone: String(raw.phone ?? "").trim(),
    role: raw.role === "admin" ? "admin" : "user",
    createdAt: raw.createdAt ?? null,
  };
}
