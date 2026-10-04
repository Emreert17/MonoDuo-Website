// Shared by the contact form (client) and POST /api/contact (server).

export const PROJECT_TYPES = [
  "A digital product",
  "A launch system",
  "Audience research",
  "Better monetization",
  "Not sure yet",
];

export const LIMITS = {
  name: 100,
  email: 200,
  company: 150,
  website: 300,
  message: 4000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function cleanLine(value, limit) {
  return String(value ?? "")
    .replace(CONTROL_CHARS, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function cleanText(value, limit) {
  return String(value ?? "")
    .replace(CONTROL_CHARS, "")
    .replace(/\r\n?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, limit);
}

export function normalizeInquiry(input) {
  const data = input && typeof input === "object" ? input : {};
  const projectType = cleanLine(data.projectType, 60);

  return {
    name: cleanLine(data.name, LIMITS.name),
    email: cleanLine(data.email, LIMITS.email).toLowerCase(),
    company: cleanLine(data.company, LIMITS.company),
    website: cleanLine(data.website, LIMITS.website),
    projectType: PROJECT_TYPES.includes(projectType) ? projectType : "",
    message: cleanText(data.message, LIMITS.message),
  };
}

// Expects normalized values. Returns a map of field name → error message.
export function validateInquiry(values) {
  const errors = {};

  if (!values.name) errors.name = "Please tell us your name.";

  if (!values.email) errors.email = "Please add your email address.";
  else if (!EMAIL_PATTERN.test(values.email))
    errors.email = "That email address doesn't look right.";

  if (!values.message) errors.message = "Please add a short message.";
  else if (values.message.length < 10)
    errors.message = "A little more detail would help us reply well.";

  return errors;
}
