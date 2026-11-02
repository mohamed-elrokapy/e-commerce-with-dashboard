const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[0-9 ()-]{7,20}$/;

export const emailRule = {
  required: "Email is required",
  pattern: { value: EMAIL, message: "Enter a valid email address" },
};

export const phoneRule = {
  required: "Phone number is required",
  pattern: { value: PHONE, message: "Enter a valid phone number" },
};

export const nameRule = {
  required: "Full name is required",
  validate: (v) => v.trim().length >= 3 || "Use at least 3 characters",
};

export const passwordRule = {
  required: "Password is required",
  minLength: { value: 8, message: "Use at least 8 characters" },
  validate: (v) =>
    (/[A-Za-z]/.test(v) && /[0-9]/.test(v)) || "Use at least one letter and one number",
};

export function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** Returns an object of field -> message. Empty object means valid. */
export function validateProduct(values) {
  const errors = {};
  const title = String(values.title ?? "").trim();
  const description = String(values.description ?? "").trim();
  const price = Number(values.price);
  const image = String(values.image ?? "").trim();

  if (!title) errors.title = "Title is required";
  else if (title.length > 80) errors.title = "Keep the title under 80 characters";

  if (String(values.price ?? "").trim() === "") errors.price = "Price is required";
  else if (!Number.isFinite(price) || price <= 0)
    errors.price = "Enter a price greater than 0";
  else if (price > 100000) errors.price = "Price is too large";

  if (!description) errors.description = "Description is required";
  else if (description.length > 500)
    errors.description = "Keep the description under 500 characters";

  if (image && !isHttpUrl(image)) errors.image = "Enter a valid http(s) image URL";

  return errors;
}
