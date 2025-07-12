export function validateSkillName(name) {
  if (!name) return "Skill name is required.";
  if (name.length < 2) return "Skill name must be at least 2 characters.";
  if (name.length > 32) return "Skill name must be less than 32 characters.";
  return "";
}

export function validateEmail(email) {
  if (!email) return "Email is required.";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "Invalid email address.";
  return "";
}

export function validateRequired(value, label = "Field") {
  if (!value) return `${label} is required.`;
  return "";
}

export function validateLength(value, min, max, label = "Field") {
  if (min && value.length < min) return `${label} must be at least ${min} characters.`;
  if (max && value.length > max) return `${label} must be less than ${max} characters.`;
  return "";
}
