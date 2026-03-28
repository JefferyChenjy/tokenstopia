import crypto from "crypto";

const COOKIE_NAME = "tokenstopia_ops_session";
const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30;

function sign(value, secret) {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

function toBase64Url(value) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function parseCookies(header = "") {
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        if (index === -1) return [part, ""];
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      }),
  );
}

function getCookieHeader(value, maxAge) {
  return `${COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export function isOpsConfigured() {
  return Boolean(process.env.OPS_PASSWORD && process.env.OPS_SESSION_SECRET);
}

export function getOpsCookieName() {
  return COOKIE_NAME;
}

export function createSessionCookie() {
  const payload = {
    exp: Date.now() + THIRTY_DAYS_IN_SECONDS * 1000,
    nonce: crypto.randomBytes(12).toString("hex"),
  };
  const encoded = toBase64Url(JSON.stringify(payload));
  const signature = sign(encoded, process.env.OPS_SESSION_SECRET);
  return getCookieHeader(`${encoded}.${signature}`, THIRTY_DAYS_IN_SECONDS);
}

export function clearSessionCookie() {
  return getCookieHeader("", 0);
}

export function isAuthenticated(req) {
  if (!isOpsConfigured()) return false;

  const cookies = parseCookies(req.headers.cookie || "");
  const raw = cookies[COOKIE_NAME];
  if (!raw) return false;

  const [encoded, providedSignature] = raw.split(".");
  if (!encoded || !providedSignature) return false;

  const expectedSignature = sign(encoded, process.env.OPS_SESSION_SECRET);
  const providedBuffer = Buffer.from(providedSignature, "utf8");
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  if (providedBuffer.length !== expectedBuffer.length) return false;
  if (!crypto.timingSafeEqual(providedBuffer, expectedBuffer)) return false;

  try {
    const payload = JSON.parse(fromBase64Url(encoded));
    return Number(payload.exp) > Date.now();
  } catch {
    return false;
  }
}

export function passwordMatches(input = "") {
  if (!process.env.OPS_PASSWORD) return false;
  const inputHash = crypto.createHash("sha256").update(String(input)).digest();
  const configuredHash = crypto.createHash("sha256").update(String(process.env.OPS_PASSWORD)).digest();
  return crypto.timingSafeEqual(inputHash, configuredHash);
}
