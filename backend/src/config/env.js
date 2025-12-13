function getEnv(name, { required = true, defaultValue } = {}) {
  const value = process.env[name] ?? defaultValue;
  if (required && (value === undefined || value === "")) {
    const err = new Error(`Missing required environment variable: ${name}`);
    err.statusCode = 500;
    throw err;
  }
  return value;
}

function getEnvBool(name, { required = false, defaultValue = "false" } = {}) {
  const raw = getEnv(name, { required, defaultValue });
  return String(raw).toLowerCase() === "true";
}

function getEnvInt(name, { required = false, defaultValue } = {}) {
  const raw = getEnv(name, { required, defaultValue });
  const num = Number(raw);
  if (Number.isNaN(num)) {
    const err = new Error(`Invalid integer env var: ${name}`);
    err.statusCode = 500;
    throw err;
  }
  return num;
}

module.exports = {
  getEnv,
  getEnvBool,
  getEnvInt
};
