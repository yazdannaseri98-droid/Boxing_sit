var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var _a, _b;
const { useState, useRef, useEffect } = React;
const LOGO_SRC = "assets/logo.png";
const BADGE1_SRC = "assets/badge1.jpg";
const BADGE2_SRC = "assets/badge2.jpg";
const BADGE3_SRC = "assets/badge3.jpg";
const BADGE4_SRC = "assets/badge4.jpg";
const BADGE5_SRC = "assets/badge5.jpg";
const BADGE6_SRC = "assets/badge6.jpg";
const ARENA_BG_1 = "assets/arena-bg-1.jpg";
const ARENA_BG_2 = "assets/arena-bg-2.jpg";
const ARENA_BG_3 = "assets/arena-bg-3.jpg";
const ARENA_BG_4 = "assets/arena-bg-4.jpg";
const ARENA_BG_5 = "assets/arena-bg-5.jpg";
function getScreenBackground(step) {
  if (step === "splash" || step === "signup" || step === "otp") return ARENA_BG_1;
  if (step === "home") return ARENA_BG_2;
  if ((step == null ? void 0 : step.startsWith("curriculum-")) || step === "lesson") return ARENA_BG_3;
  if (step === "subscription") return ARENA_BG_4;
  return ARENA_BG_5;
}
const SPLASH_LOGO_SRC = "assets/logo.png";
const GLOVES_SRC = "assets/gloves.jpg";
const WRAPS_SRC = "assets/wraps.jpg";
const HELMET_SRC = "assets/helmet.jpg";
const MOUTHGUARD_SRC = "assets/mouthguard.jpg";
const BAG_SRC = "assets/bag.jpg";
const ROPE_SRC = "assets/rope.jpg";
const BOOTS_SRC = "assets/boots.jpg";
const HEADBALL_SRC = "assets/headball.jpg";
const DUMBBELL_SRC = "assets/dumbbell.jpg";
const CHAPTER1_IMAGE_SRC = "assets/chapter1-image.jpg";
const CHAPTER2_IMAGE_SRC = "assets/chapter2-image.jpg";
const CHAPTER3_IMAGE_SRC = "assets/chapter3-image.jpg";
const CHAPTER4_IMAGE_SRC = "assets/chapter4-image.jpg";
const CHAPTER5_IMAGE_SRC = "assets/chapter5-image.jpg";
const CHAPTER6_IMAGE_SRC = "assets/chapter6-image.jpg";
const MEDAL_BRONZE_SRC = "assets/medal-bronze.png";
const MEDAL_SILVER_SRC = "assets/medal-silver.png";
const MEDAL_GOLD_SRC = "assets/medal-gold.png";
const FONT_LINK_ID = "boxing-app-fonts";
const API_BASE_URL = "https://api.naseri-group-iran.ir";
const DEMO_MODE = API_BASE_URL.includes("YOUR_SERVER_URL");
const DEMO_ADMIN_IDENTIFIERS = ["yazdannaseri98@gmail.com", "yazdannaseri76@gmail.com"];
const NETWORK_OFFLINE_MESSAGE = "\u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u062F\u0633\u062A\u06AF\u0627\u0647 \u0631\u0627 \u0686\u06A9 \u06A9\u0646\u06CC\u062F";
const NETWORK_WEAK_MESSAGE = "\u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0636\u0639\u06CC\u0641 \u0627\u0633\u062A\u061B \u062F\u0648\u0628\u0627\u0631\u0647 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646\u06CC\u062F";
const NETWORK_VPN_HINT = "\u0627\u06AF\u0647 \u0641\u06CC\u0644\u062A\u0631\u0634\u06A9\u0646 \u0631\u0648\u0634\u0646\u0647\u060C \u062E\u0627\u0645\u0648\u0634\u0634 \u06A9\u0646";
const NETWORK_BLOCKED_MESSAGE = "\u0641\u06CC\u0644\u062A\u0631\u0634\u06A9\u0646 \u0631\u0627 \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646\u06CC\u062F";
const NETWORK_BLOCKED_DETAIL = "\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062F\u061B \u0641\u06CC\u0644\u062A\u0631\u0634\u06A9\u0646 \u0631\u0627 \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646\u06CC\u062F \u0648 \u062F\u0648\u0628\u0627\u0631\u0647 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646\u06CC\u062F";
const NETWORK_OFFLINE_ERROR = `${NETWORK_OFFLINE_MESSAGE}\u061B ${NETWORK_VPN_HINT}`;
const NETWORK_WEAK_ERROR = `${NETWORK_WEAK_MESSAGE} (${NETWORK_VPN_HINT})`;
const API_TIMEOUT_MS = 2e4;
const API_VOICE_TIMEOUT_MS = 6e4;
const CONNECTIVITY_PROBE_INTERVAL_MS = 4e3;
const connectivity = {
  offlineFlag: typeof navigator !== "undefined" && navigator.onLine === false,
  timeoutFlag: false,
  blockedFlag: false,
  // سرور جواب داده ولی «صفحه‌ی بلاک/فیلتر» بوده (مثلاً با فیلترشکن)
  state: "ok",
  // "ok" | "weak" | "offline" | "blocked"
  listeners: /* @__PURE__ */ new Set(),
  probeTimer: null
};
class NetworkError extends Error {
  constructor(message, timedOut) {
    super(message);
    this.name = "NetworkError";
    this.isNetworkError = true;
    this.timedOut = Boolean(timedOut);
  }
}
function isSlowEffectiveType() {
  var _a2;
  const type = typeof navigator !== "undefined" ? (_a2 = navigator.connection) == null ? void 0 : _a2.effectiveType : null;
  return type === "slow-2g" || type === "2g";
}
function computeConnectivityState() {
  if (connectivity.offlineFlag) return "offline";
  if (connectivity.blockedFlag) return "blocked";
  if (connectivity.timeoutFlag || isSlowEffectiveType()) return "weak";
  return "ok";
}
function refreshConnectivityState() {
  const next = computeConnectivityState();
  if (next === connectivity.state) return;
  connectivity.state = next;
  connectivity.listeners.forEach((fn) => fn(next));
}
function markNetworkFailure(kind) {
  if (kind === "timeout") connectivity.timeoutFlag = true;
  else connectivity.offlineFlag = true;
  refreshConnectivityState();
  startConnectivityProbe();
}
function markNetworkBlocked() {
  connectivity.offlineFlag = false;
  connectivity.timeoutFlag = false;
  connectivity.blockedFlag = true;
  refreshConnectivityState();
  startConnectivityProbe();
}
function isBlockedResponse(res) {
  var _a2, _b2;
  const type = ((_b2 = (_a2 = res.headers) == null ? void 0 : _a2.get) == null ? void 0 : _b2.call(_a2, "content-type")) || "";
  if (/json/i.test(type)) return false;
  const s = res.status;
  return s >= 200 && s < 400 && s !== 204 || s === 403 || s === 407 || s === 451;
}
function markNetworkSuccess() {
  connectivity.offlineFlag = false;
  connectivity.timeoutFlag = false;
  connectivity.blockedFlag = false;
  refreshConnectivityState();
}
async function pingServer(timeoutMs = 6e3) {
  if (DEMO_MODE) return true;
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    markNetworkFailure("offline");
    return false;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_BASE_URL}/settings/member-count`, { cache: "no-store", signal: controller.signal });
    if (isBlockedResponse(res)) {
      markNetworkBlocked();
      return false;
    }
    markNetworkSuccess();
    return true;
  } catch (err) {
    markNetworkFailure((err == null ? void 0 : err.name) === "AbortError" ? "timeout" : "offline");
    return false;
  } finally {
    clearTimeout(timer);
  }
}
function startConnectivityProbe() {
  if (connectivity.probeTimer || DEMO_MODE) return;
  const run = async () => {
    connectivity.probeTimer = null;
    if (!connectivity.offlineFlag && !connectivity.timeoutFlag && !connectivity.blockedFlag) return;
    await pingServer();
    if ((connectivity.offlineFlag || connectivity.timeoutFlag || connectivity.blockedFlag) && !connectivity.probeTimer) {
      connectivity.probeTimer = setTimeout(run, CONNECTIVITY_PROBE_INTERVAL_MS);
    }
  };
  connectivity.probeTimer = setTimeout(run, CONNECTIVITY_PROBE_INTERVAL_MS);
}
if (typeof window !== "undefined") {
  window.addEventListener("offline", () => {
    connectivity.offlineFlag = true;
    refreshConnectivityState();
    startConnectivityProbe();
  });
  window.addEventListener("online", () => {
    pingServer();
  });
  (_b = (_a = navigator.connection) == null ? void 0 : _a.addEventListener) == null ? void 0 : _b.call(_a, "change", refreshConnectivityState);
  if (connectivity.offlineFlag) {
    refreshConnectivityState();
    startConnectivityProbe();
  }
}
async function apiFetch(url, options = {}) {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    markNetworkFailure("offline");
    throw new NetworkError(NETWORK_OFFLINE_ERROR, false);
  }
  const timeoutMs = String(url).includes("/voice") ? API_VOICE_TIMEOUT_MS : API_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, __spreadProps(__spreadValues({}, options), { signal: controller.signal }));
    if (isBlockedResponse(res)) {
      markNetworkBlocked();
      const err = new NetworkError(NETWORK_BLOCKED_DETAIL, false);
      err.blocked = true;
      throw err;
    }
    markNetworkSuccess();
    return res;
  } catch (err) {
    if (err == null ? void 0 : err.isNetworkError) throw err;
    const timedOut = (err == null ? void 0 : err.name) === "AbortError";
    markNetworkFailure(timedOut ? "timeout" : "offline");
    throw new NetworkError(timedOut ? NETWORK_WEAK_ERROR : NETWORK_OFFLINE_ERROR, timedOut);
  } finally {
    clearTimeout(timer);
  }
}
function useConnectivity() {
  const [state, setState] = useState(connectivity.state);
  useEffect(() => {
    const listener = (next) => setState(next);
    connectivity.listeners.add(listener);
    setState(connectivity.state);
    return () => {
      connectivity.listeners.delete(listener);
    };
  }, []);
  return state;
}
let onAuthFailure = null;
function triggerAuthFailure() {
  onAuthFailure == null ? void 0 : onAuthFailure();
}
function normalizeEmail(rawInput) {
  return rawInput.trim().toLowerCase();
}
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function normalizeIranPhone(rawInput) {
  const digits = rawInput.replace(/\D/g, "");
  return digits.startsWith("0") ? digits : "0" + digits;
}
function isValidIranPhone(value) {
  return /^09\d{9}$/.test(value);
}
function normalizeIdentifier(raw, method) {
  return method === "phone" ? normalizeIranPhone(raw) : normalizeEmail(raw);
}
function isValidIdentifier(raw, method) {
  return method === "phone" ? isValidIranPhone(raw) : isValidEmail(raw);
}
function sanitizeUserText(raw, maxLength) {
  return raw.replace(/[<>]/g, "").trim().slice(0, maxLength);
}
async function apiSendOtp(rawIdentifier, method) {
  const identifier = normalizeIdentifier(rawIdentifier, method);
  const res = await apiFetch(`${API_BASE_URL}/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "\u0627\u0631\u0633\u0627\u0644 \u06A9\u062F \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
  }
  return data;
}
async function apiVerifyOtp(rawIdentifier, method, code, deviceId, force) {
  const identifier = normalizeIdentifier(rawIdentifier, method);
  const res = await apiFetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, code, deviceId, force: Boolean(force) })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    const err = new Error(data.error || "\u06A9\u062F \u0648\u0627\u0631\u062F \u0634\u062F\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A");
    err.code = data.code;
    throw err;
  }
  return data;
}
const AVATAR_SIZE = 240;
const MAX_PHOTO_BYTES = 80 * 1024 * 1024;
async function makeAvatarDataUrl(file) {
  var _a2;
  if (!file || file.size > MAX_PHOTO_BYTES) throw new Error("PHOTO_TOO_LARGE");
  let source = null;
  let objectUrl = null;
  try {
    if (typeof createImageBitmap === "function") {
      try {
        source = await createImageBitmap(file, { resizeWidth: AVATAR_SIZE * 2, resizeQuality: "medium" });
      } catch (e) {
        source = null;
      }
    }
    if (!source) {
      objectUrl = URL.createObjectURL(file);
      const img = new Image();
      img.decoding = "async";
      img.src = objectUrl;
      await img.decode();
      source = img;
    }
    const sw = source.width || source.naturalWidth;
    const sh = source.height || source.naturalHeight;
    if (!sw || !sh) throw new Error("PHOTO_UNREADABLE");
    const canvas = document.createElement("canvas");
    canvas.width = AVATAR_SIZE;
    canvas.height = AVATAR_SIZE;
    const ctx = canvas.getContext("2d");
    const scale = Math.max(AVATAR_SIZE / sw, AVATAR_SIZE / sh);
    const w = sw * scale;
    const h = sh * scale;
    ctx.drawImage(source, (AVATAR_SIZE - w) / 2, (AVATAR_SIZE - h) / 2, w, h);
    return canvas.toDataURL("image/jpeg", 0.85);
  } catch (err) {
    throw err.message === "PHOTO_TOO_LARGE" ? err : new Error("PHOTO_UNREADABLE");
  } finally {
    (_a2 = source == null ? void 0 : source.close) == null ? void 0 : _a2.call(source);
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }
}
const ACCOUNT_DATA_KEYS = ["last-lesson", "reminder", "completed-lessons", "practice-seconds", "profile-info", "sync-pending"];
function accountKey(identifier, base) {
  return `acct:${identifier}:${base}`;
}
async function purgeLegacyAccountData() {
  for (const key of ACCOUNT_DATA_KEYS) await AppStorage.remove(key);
}
function toLatinDigits(input) {
  return String(input != null ? input : "").replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 1776)).replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 1632));
}
const OTP_CODE_LENGTH = 6;
function getPasswordChecks(rawPassword, phone) {
  const password = toLatinDigits(rawPassword);
  const phoneDigits = toLatinDigits(phone || "").replace(/^0/, "");
  return {
    length: Array.from(password).length >= 8 && Array.from(password).length <= 64,
    mix: new RegExp("\\p{L}", "u").test(password) && /[0-9]/.test(password),
    notPhone: !phoneDigits || !password.replace(/\D/g, "").includes(phoneDigits)
  };
}
function isPasswordAcceptable(rawPassword, phone) {
  const c = getPasswordChecks(rawPassword, phone);
  return c.length && c.mix && c.notPhone;
}
async function apiAuthPost(path, body) {
  const res = await apiFetch(`${API_BASE_URL}/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    const err = new Error(data.error || "\u062E\u0637\u0627\u06CC\u06CC \u0631\u062E \u062F\u0627\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646");
    err.code = data.code;
    err.attemptsLeft = data.attemptsLeft;
    throw err;
  }
  return data;
}
async function apiOtpSend(phone, purpose) {
  if (DEMO_MODE) return { ok: true };
  return apiAuthPost("otp/send", { phone, purpose });
}
async function apiOtpVerify(phone, code, purpose) {
  if (DEMO_MODE) return { ok: true, proofToken: "demo-proof" };
  return apiAuthPost("otp/verify", { phone, code, purpose });
}
function demoAuthResult(phone) {
  const user = { identifier: phone, isAdmin: DEMO_ADMIN_IDENTIFIERS.includes(phone), plan: "none" };
  return { ok: true, token: "demo-token", user };
}
async function apiRegisterAccount(proofToken, password, deviceId, force, phone) {
  if (DEMO_MODE) return demoAuthResult(phone);
  return apiAuthPost("register", { proofToken, password, deviceId, force: Boolean(force) });
}
async function apiPasswordLogin(phone, password, deviceId, force) {
  if (DEMO_MODE) return demoAuthResult(phone);
  return apiAuthPost("login", { phone, password, deviceId, force: Boolean(force) });
}
async function apiResetPassword(proofToken, password, deviceId, phone) {
  if (DEMO_MODE) return demoAuthResult(phone);
  return apiAuthPost("reset-password", { proofToken, password, deviceId });
}
async function apiFetchProgress(token) {
  if (DEMO_MODE) return null;
  try {
    const res = await apiFetch(`${API_BASE_URL}/progress`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 401) {
      triggerAuthFailure();
      return null;
    }
    const data = await res.json().catch(() => ({}));
    return res.ok && data.ok ? data.progress : null;
  } catch (e) {
    return null;
  }
}
async function apiPutProgress(token, payload) {
  if (DEMO_MODE) return null;
  try {
    const res = await apiFetch(`${API_BASE_URL}/progress`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
    if (res.status === 401) {
      triggerAuthFailure();
      return null;
    }
    const data = await res.json().catch(() => ({}));
    return res.ok && data.ok ? data.progress : null;
  } catch (e) {
    return null;
  }
}
function mergePendingSync(base, partial) {
  const next = __spreadValues({}, base);
  if (partial.completed) next.completed = __spreadValues(__spreadValues({}, base.completed || {}), partial.completed);
  if (partial.practiceSeconds !== void 0) next.practiceSeconds = Math.max(base.practiceSeconds || 0, partial.practiceSeconds);
  if (partial.lastLesson !== void 0) next.lastLesson = partial.lastLesson;
  if (partial.profile !== void 0) next.profile = __spreadValues(__spreadValues({}, base.profile || {}), partial.profile);
  return next;
}
async function apiCheckSession(token, deviceId) {
  if (DEMO_MODE) return true;
  try {
    const res = await apiFetch(`${API_BASE_URL}/auth/session-check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ deviceId })
    });
    if (res.status === 401) {
      triggerAuthFailure();
      return false;
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return true;
    return Boolean(data.active);
  } catch (e) {
    return true;
  }
}
const AppStorage = {
  async get(key) {
    var _a2, _b2, _c;
    try {
      const Prefs = (_b2 = (_a2 = window.Capacitor) == null ? void 0 : _a2.Plugins) == null ? void 0 : _b2.Preferences;
      if (Prefs) {
        const { value } = await Prefs.get({ key });
        return value != null ? value : null;
      }
      if (window.storage) {
        const result = await window.storage.get(key, false);
        return (_c = result == null ? void 0 : result.value) != null ? _c : null;
      }
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  async set(key, value) {
    var _a2, _b2;
    try {
      const Prefs = (_b2 = (_a2 = window.Capacitor) == null ? void 0 : _a2.Plugins) == null ? void 0 : _b2.Preferences;
      if (Prefs) return void await Prefs.set({ key, value });
      if (window.storage) return void await window.storage.set(key, value, false);
      localStorage.setItem(key, value);
    } catch (e) {
    }
  },
  async remove(key) {
    var _a2, _b2;
    try {
      const Prefs = (_b2 = (_a2 = window.Capacitor) == null ? void 0 : _a2.Plugins) == null ? void 0 : _b2.Preferences;
      if (Prefs) return void await Prefs.remove({ key });
      if (window.storage) return void await window.storage.delete(key, false);
      localStorage.removeItem(key);
    } catch (e) {
    }
  }
};
async function getOrCreateDeviceId() {
  const key = "device-id";
  const existing = await AppStorage.get(key);
  if (existing) return existing;
  const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `dev-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  await AppStorage.set(key, id);
  return id;
}
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1e3;
async function saveSession(token, user) {
  await AppStorage.set("auth-session", JSON.stringify({ token, user, savedAt: Date.now() }));
}
async function loadSession() {
  const value = await AppStorage.get("auth-session");
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    if (!(parsed == null ? void 0 : parsed.token) || !(parsed == null ? void 0 : parsed.savedAt)) return null;
    if (Date.now() - parsed.savedAt > SESSION_TTL_MS) return null;
    return parsed;
  } catch (e) {
    return null;
  }
}
async function clearSession() {
  await AppStorage.remove("auth-session");
}
function toAbsoluteVideoUrl(url) {
  if (!url) return url;
  return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
}
async function apiFetchVideos() {
  if (DEMO_MODE) return {};
  try {
    const res = await apiFetch(`${API_BASE_URL}/videos`);
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || !data.ok) return null;
    const videos = {};
    for (const [key, url] of Object.entries(data.videos || {})) {
      videos[key] = toAbsoluteVideoUrl(url);
    }
    return videos;
  } catch (e) {
    return null;
  }
}
async function apiUploadVideo(curriculumKey, n, file, token) {
  const form = new FormData();
  form.append("video", file);
  const res = await apiFetch(`${API_BASE_URL}/videos/${curriculumKey}/${n}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "\u0622\u067E\u0644\u0648\u062F \u0648\u06CC\u062F\u06CC\u0648 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
  }
  return toAbsoluteVideoUrl(data.url);
}
async function apiCreatePayment(token, plan) {
  if (DEMO_MODE) {
    throw new Error("\u0633\u0631\u0648\u0631 \u0647\u0646\u0648\u0632 \u0648\u0635\u0644 \u0646\u0634\u062F\u0647 \u2014 \u0627\u06CC\u0646 \u062F\u06A9\u0645\u0647 \u0628\u0639\u062F \u0627\u0632 \u062F\u06CC\u067E\u0644\u0648\u06CC \u0628\u06A9\u200C\u0627\u0646\u062F \u0641\u0639\u0627\u0644 \u0645\u06CC\u200C\u0634\u0647");
  }
  const res = await apiFetch(`${API_BASE_URL}/payment/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ plan })
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "\u0627\u062A\u0635\u0627\u0644 \u0628\u0647 \u062F\u0631\u06AF\u0627\u0647 \u067E\u0631\u062F\u0627\u062E\u062A \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
  }
  return data.paymentUrl;
}
async function apiFetchLessonTitles() {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-lesson-titles");
    if (!stored) return {};
    try {
      return JSON.parse(stored);
    } catch (e) {
      return {};
    }
  }
  try {
    const res = await apiFetch(`${API_BASE_URL}/lessons/titles`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return {};
    return data.titles || {};
  } catch (e) {
    return {};
  }
}
async function apiSetLessonTitle(curriculumKey, n, title, token) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-lesson-titles");
    const titles = stored ? JSON.parse(stored) : {};
    titles[`${curriculumKey}-${n}`] = title;
    await AppStorage.set("demo-lesson-titles", JSON.stringify(titles));
    return title;
  }
  const res = await apiFetch(`${API_BASE_URL}/lessons/titles/${curriculumKey}/${n}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ title })
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "\u062A\u063A\u06CC\u06CC\u0631 \u0639\u0646\u0648\u0627\u0646 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
  }
  return data.title;
}
async function apiFetchUsers(token) {
  if (DEMO_MODE) {
    return {
      total: 1,
      users: [{ identifier: "demo@example.com", isAdmin: true, plan: "none", planExpiresAt: null, createdAt: Date.now() }]
    };
  }
  const res = await apiFetch(`${API_BASE_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "\u062F\u0631\u06CC\u0627\u0641\u062A \u0644\u06CC\u0633\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
  }
  return { users: data.users || [], total: data.total || 0 };
}
async function apiFetchAdminStats(token) {
  if (DEMO_MODE) return { totalUsers: 1 };
  try {
    const res = await apiFetch(`${API_BASE_URL}/admin/stats`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 401) triggerAuthFailure();
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return null;
    return { totalUsers: Number(data.totalUsers) || 0 };
  } catch (e) {
    return null;
  }
}
async function apiFetchMemberCount() {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-member-count");
    return stored ? Number(stored) || 0 : 0;
  }
  try {
    const res = await apiFetch(`${API_BASE_URL}/settings/member-count`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return 0;
    return data.count || 0;
  } catch (e) {
    return 0;
  }
}
async function apiSetMemberCount(count, token) {
  if (DEMO_MODE) {
    await AppStorage.set("demo-member-count", String(count));
    return count;
  }
  const res = await apiFetch(`${API_BASE_URL}/settings/member-count`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ count })
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "\u062A\u063A\u06CC\u06CC\u0631 \u0639\u062F\u062F \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
  }
  return data.count;
}
const NEW_CHAPTER_KEYS = ["fight", "partner", "focus"];
async function apiFetchChapterVisibility() {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-chapter-visibility");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
      }
    }
    return { fight: false, partner: false, focus: false };
  }
  try {
    const res = await apiFetch(`${API_BASE_URL}/settings/chapters`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return { fight: false, partner: false, focus: false };
    return data.visibility || { fight: false, partner: false, focus: false };
  } catch (e) {
    return { fight: false, partner: false, focus: false };
  }
}
async function apiSetChapterVisibility(key, visible, token) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-chapter-visibility");
    const visibility = stored ? JSON.parse(stored) : { fight: false, partner: false, focus: false };
    visibility[key] = visible;
    await AppStorage.set("demo-chapter-visibility", JSON.stringify(visibility));
    return visible;
  }
  const res = await apiFetch(`${API_BASE_URL}/settings/chapters/${key}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ visible })
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "\u062A\u063A\u06CC\u06CC\u0631 \u0648\u0636\u0639\u06CC\u062A \u0641\u0635\u0644 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
  }
  return data.visible;
}
async function apiFetchChapterTitles() {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-chapter-titles");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
      }
    }
    return {};
  }
  try {
    const res = await apiFetch(`${API_BASE_URL}/settings/chapter-titles`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return {};
    return data.titles || {};
  } catch (e) {
    return {};
  }
}
async function apiSetChapterTitle(key, title, token) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-chapter-titles");
    const titles = stored ? JSON.parse(stored) : {};
    titles[key] = title;
    await AppStorage.set("demo-chapter-titles", JSON.stringify(titles));
    return title;
  }
  const res = await apiFetch(`${API_BASE_URL}/settings/chapter-titles/${key}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ title })
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "\u062A\u063A\u06CC\u06CC\u0631 \u0639\u0646\u0648\u0627\u0646 \u0641\u0635\u0644 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
  }
  return data.title;
}
const DEMO_BOT_RULES = [
  { keywords: ["\u0642\u06CC\u0645\u062A", "\u0647\u0632\u06CC\u0646\u0647", "\u0686\u0642\u062F\u0631", "\u062A\u0648\u0645\u0627\u0646"], answer: "\u0646\u0642\u0631\u0647\u200C\u0627\u06CC \u0648 \u0637\u0644\u0627\u06CC\u06CC \u0647\u0631\u06A9\u062F\u0648\u0645 \u06F1,\u06F4\u06F9\u06F0,\u06F0\u06F0\u06F0 \u062A\u0648\u0645\u0627\u0646 \u0648 \u06F1\u06F2 \u0645\u0627\u0647 \u0627\u0639\u062A\u0628\u0627\u0631 \u062F\u0627\u0631\u0646. \u0646\u0642\u0631\u0647\u200C\u0627\u06CC \u0641\u0635\u0644\u200C\u0647\u0627\u06CC \u067E\u0627\u06CC\u0647 \u0631\u0648 \u0628\u0627\u0632 \u0645\u06CC\u200C\u06A9\u0646\u0647\u060C \u0637\u0644\u0627\u06CC\u06CC \u0641\u0635\u0644\u200C\u0647\u0627\u06CC \u062A\u062E\u0635\u0635\u06CC \u0631\u0648." },
  { keywords: ["\u062F\u0633\u062A\u06AF\u0627\u0647", "\u06AF\u0648\u0634\u06CC \u062C\u062F\u06CC\u062F", "\u0647\u0645\u0632\u0645\u0627\u0646"], answer: "\u0647\u0631 \u062D\u0633\u0627\u0628 \u0641\u0642\u0637 \u0631\u0648\u06CC \u06CC\u06A9 \u06AF\u0648\u0634\u06CC \u0647\u0645\u0632\u0645\u0627\u0646 \u0641\u0639\u0627\u0644\u0647." },
  { keywords: ["\u062F\u0627\u0646\u0644\u0648\u062F \u0648\u06CC\u062F\u06CC\u0648", "\u0628\u0627\u0632\u0646\u0634\u0631"], answer: "\u062F\u0627\u0646\u0644\u0648\u062F \u06CC\u0627 \u0628\u0627\u0632\u0646\u0634\u0631 \u0648\u06CC\u062F\u06CC\u0648\u0647\u0627 \u0645\u062C\u0627\u0632 \u0646\u06CC\u0633\u062A\u060C \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u06CC \u0634\u062E\u0635\u06CC \u062F\u0627\u062E\u0644 \u0627\u067E\u0647." },
  { keywords: ["\u0633\u0644\u0627\u0645", "\u062F\u0631\u0648\u062F"], answer: "\u0633\u0644\u0627\u0645! \u062E\u0648\u0634 \u0627\u0648\u0645\u062F\u06CC \u{1F44B} \u0686\u0647 \u06A9\u0645\u06A9\u06CC \u0627\u0632 \u062F\u0633\u062A\u0645 \u0628\u0631\u0645\u06CC\u0627\u062F\u061F" },
  { keywords: ["\u0645\u0645\u0646\u0648\u0646", "\u0645\u0631\u0633\u06CC", "\u062A\u0634\u06A9\u0631"], answer: "\u062E\u0648\u0627\u0647\u0634 \u0645\u06CC\u200C\u06A9\u0646\u0645 \u{1F64F} \u0647\u0631 \u0633\u0648\u0627\u0644 \u062F\u06CC\u06AF\u0647\u200C\u0627\u06CC \u0647\u0645 \u062F\u0627\u0634\u062A\u06CC \u0628\u067E\u0631\u0633." }
];
function demoMatchBotReply(message) {
  const normalized = String(message || "").trim();
  if (!normalized) return null;
  for (const rule of DEMO_BOT_RULES) {
    if (rule.keywords.some((kw) => normalized.includes(kw))) return rule.answer;
  }
  return null;
}
async function apiSendSupportMessage(token, message) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-support-messages");
    const messages = stored ? JSON.parse(stored) : [];
    messages.push({ sender: "user", message, createdAt: Date.now() });
    let botReply = null;
    const botAnswer = demoMatchBotReply(message);
    if (botAnswer) {
      botReply = { sender: "bot", message: botAnswer, createdAt: Date.now() };
      messages.push(botReply);
    }
    await AppStorage.set("demo-support-messages", JSON.stringify(messages));
    return { botReply };
  }
  const res = await apiFetch(`${API_BASE_URL}/support/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ message })
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || "\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
  return { botReply: data.botReply || null };
}
async function apiFetchMySupportMessages(token) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-support-messages");
    return stored ? JSON.parse(stored) : [];
  }
  const res = await apiFetch(`${API_BASE_URL}/support/messages`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || "\u062F\u0631\u06CC\u0627\u0641\u062A \u067E\u06CC\u0627\u0645\u200C\u0647\u0627 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
  return data.messages || [];
}
async function apiFetchSupportThreads(token) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-support-messages");
    const messages = stored ? JSON.parse(stored) : [];
    if (!messages.length) return [];
    const last = messages[messages.length - 1];
    return [{ identifier: "demo@example.com", lastMessage: last.message, lastSender: last.sender, lastAt: last.createdAt }];
  }
  const res = await apiFetch(`${API_BASE_URL}/support/threads`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || "\u062F\u0631\u06CC\u0627\u0641\u062A \u0644\u06CC\u0633\u062A \u06AF\u0641\u062A\u06AF\u0648\u0647\u0627 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
  return data.threads || [];
}
async function apiFetchSupportThread(token, identifier) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-support-messages");
    return stored ? JSON.parse(stored) : [];
  }
  const res = await apiFetch(`${API_BASE_URL}/support/threads/${encodeURIComponent(identifier)}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || "\u062F\u0631\u06CC\u0627\u0641\u062A \u06AF\u0641\u062A\u06AF\u0648 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
  return data.messages || [];
}
async function apiSendSupportReply(token, identifier, message) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-support-messages");
    const messages = stored ? JSON.parse(stored) : [];
    messages.push({ sender: "admin", message, createdAt: Date.now() });
    await AppStorage.set("demo-support-messages", JSON.stringify(messages));
    return;
  }
  const res = await apiFetch(`${API_BASE_URL}/support/threads/${encodeURIComponent(identifier)}/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ message })
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || "\u0627\u0631\u0633\u0627\u0644 \u067E\u0627\u0633\u062E \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
}
async function apiSendSupportVoice(token, audioData) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-support-messages");
    const messages = stored ? JSON.parse(stored) : [];
    messages.push({ sender: "user", message: "\u067E\u06CC\u0627\u0645 \u0635\u0648\u062A\u06CC", type: "voice", audioData, createdAt: Date.now() });
    await AppStorage.set("demo-support-messages", JSON.stringify(messages));
    return { botReply: null };
  }
  const res = await apiFetch(`${API_BASE_URL}/support/messages/voice`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ audioData })
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || "\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0635\u0648\u062A\u06CC \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
  return { botReply: data.botReply || null };
}
async function apiSendSupportVoiceReply(token, identifier, audioData) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-support-messages");
    const messages = stored ? JSON.parse(stored) : [];
    messages.push({ sender: "admin", message: "\u067E\u06CC\u0627\u0645 \u0635\u0648\u062A\u06CC", type: "voice", audioData, createdAt: Date.now() });
    await AppStorage.set("demo-support-messages", JSON.stringify(messages));
    return;
  }
  const res = await apiFetch(`${API_BASE_URL}/support/threads/${encodeURIComponent(identifier)}/reply/voice`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ audioData })
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || "\u0627\u0631\u0633\u0627\u0644 \u067E\u0627\u0633\u062E \u0635\u0648\u062A\u06CC \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
}
function formatExpiryDate(timestamp) {
  try {
    return new Date(timestamp).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
  } catch (e) {
    return "";
  }
}
function formatMessageTime(timestamp) {
  try {
    const d = new Date(timestamp);
    const parts = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(d);
    const get = (type) => {
      var _a2;
      return ((_a2 = parts.find((p) => p.type === type)) == null ? void 0 : _a2.value) || "";
    };
    const datePart = `${get("day")}/${get("month")}/${get("year")}`;
    const timePart = d.toLocaleTimeString("fa-IR-u-nu-latn", { hour: "2-digit", minute: "2-digit" });
    return `${datePart},,${timePart}`;
  } catch (e) {
    return "";
  }
}
async function apiFetchPlanStatus(token) {
  if (DEMO_MODE) return null;
  try {
    const res = await apiFetch(`${API_BASE_URL}/payment/status`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 401) {
      triggerAuthFailure();
      return null;
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return null;
    return { plan: data.plan || "none", planExpiresAt: data.planExpiresAt || null };
  } catch (e) {
    return null;
  }
}
async function apiFetchPromoText() {
  if (DEMO_MODE) return "";
  try {
    const res = await apiFetch(`${API_BASE_URL}/settings/promo-text`);
    const data = await res.json().catch(() => ({}));
    return data.ok ? String(data.text || "") : "";
  } catch (e) {
    return "";
  }
}
async function apiSetPromoText(token, text) {
  if (DEMO_MODE) return text;
  const res = await apiFetch(`${API_BASE_URL}/settings/promo-text`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ text })
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || "\u0630\u062E\u06CC\u0631\u0647\u200C\u06CC \u0645\u062A\u0646 \u0627\u0646\u062C\u0627\u0645 \u0646\u0634\u062F");
  return String(data.text || "");
}
async function apiCheckPlanStatus(token) {
  if (DEMO_MODE) return { plan: "none", planExpiresAt: null };
  try {
    const res = await apiFetch(`${API_BASE_URL}/payment/status`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.status === 401) {
      triggerAuthFailure();
      return { plan: "none", planExpiresAt: null };
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return { plan: "none", planExpiresAt: null };
    return { plan: data.plan || "none", planExpiresAt: data.planExpiresAt || null };
  } catch (e) {
    return { plan: "none", planExpiresAt: null };
  }
}
function useFonts() {
  useEffect(() => {
    if (window.__LOCAL_FONTS__) return;
    if (document.getElementById(FONT_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;900&family=Oswald:wght@500;600;700&family=Bebas+Neue&display=swap";
    document.head.appendChild(link);
  }, []);
}
function useDisableZoom() {
  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    const hadMeta = Boolean(meta);
    const prevContent = meta == null ? void 0 : meta.getAttribute("content");
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "viewport");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
    );
    const preventGesture = (e) => e.preventDefault();
    const preventMultiTouch = (e) => {
      if (e.touches && e.touches.length > 1) e.preventDefault();
    };
    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e) => {
      var _a2, _b2;
      const now = Date.now();
      if ((_b2 = (_a2 = e.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b2.call(_a2, "[data-fast-tap]")) {
        lastTouchEnd = now;
        return;
      }
      if (now - lastTouchEnd < 300) e.preventDefault();
      lastTouchEnd = now;
    };
    document.addEventListener("gesturestart", preventGesture, { passive: false });
    document.addEventListener("gesturechange", preventGesture, { passive: false });
    document.addEventListener("touchmove", preventMultiTouch, { passive: false });
    document.addEventListener("touchend", preventDoubleTapZoom, { passive: false });
    return () => {
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("touchmove", preventMultiTouch);
      document.removeEventListener("touchend", preventDoubleTapZoom);
      if (hadMeta && prevContent !== null) {
        meta.setAttribute("content", prevContent);
      }
    };
  }, []);
}
function GloveIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M18.5 3c-1.4 0-2.6.7-3.3 1.8-.5-.2-1.1-.3-1.7-.3-1.9 0-3.5 1.2-4 2.9-.4-.1-.8-.2-1.2-.2C6 7.2 4.2 9 4.2 11.3v3.4C4.2 18.6 7.6 22 11.7 22h1.6c3.7 0 6.7-3 6.7-6.7V8.5C20 5.5 22.5 3 18.5 3z", opacity: "0.15" }), /* @__PURE__ */ React.createElement("path", { d: "M15.8 2.2c-1.6 0-3 .9-3.7 2.2-.6-.3-1.3-.4-2-.4-2.1 0-3.9 1.4-4.5 3.3-.3-.1-.7-.1-1-.1C2.5 7.2.8 9 .8 11.1v3.6C.8 18.9 4.4 22.5 8.6 22.5h1.8c4.2 0 7.6-3.4 7.6-7.6V7.7c0-.5.4-.9.9-.9.6 0 1.1-.5 1.1-1.1v-.6c0-1.6-1.3-2.9-2.9-2.9h-1.3z" }));
}
function BeltIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("rect", { x: "8", y: "9", width: "8", height: "6", rx: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "1.4", fill: "currentColor", stroke: "none" }), /* @__PURE__ */ React.createElement("path", { d: "M2 11c2 0 4 .5 6 2M22 11c-2 0-4 .5-6 2M2 15c2 0 4-.5 6-2M22 15c-2 0-4-.5-6-2" }));
}
function RingIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("rect", { x: "5", y: "5", width: "14", height: "14", rx: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "5", cy: "5", r: "1.4", fill: "currentColor", stroke: "none" }), /* @__PURE__ */ React.createElement("circle", { cx: "19", cy: "5", r: "1.4", fill: "currentColor", stroke: "none" }), /* @__PURE__ */ React.createElement("circle", { cx: "5", cy: "19", r: "1.4", fill: "currentColor", stroke: "none" }), /* @__PURE__ */ React.createElement("circle", { cx: "19", cy: "19", r: "1.4", fill: "currentColor", stroke: "none" }));
}
function RopeDivider() {
  return /* @__PURE__ */ React.createElement("div", { className: "relative h-3 my-1 overflow-hidden" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "absolute inset-0",
      style: {
        backgroundImage: "repeating-linear-gradient(135deg, transparent 0 8px, rgba(217,30,43,0.35) 8px 9px, transparent 9px 18px)"
      }
    }
  ));
}
function WifiOffIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 20h.01" }), /* @__PURE__ */ React.createElement("path", { d: "M8.5 16.43a5 5 0 0 1 7 0" }), /* @__PURE__ */ React.createElement("path", { d: "M5 12.86a10 10 0 0 1 5.17-2.69" }), /* @__PURE__ */ React.createElement("path", { d: "M19 12.86a10 10 0 0 0-2.01-1.48" }), /* @__PURE__ */ React.createElement("path", { d: "M2 8.82a15 15 0 0 1 4.18-2.65" }), /* @__PURE__ */ React.createElement("path", { d: "M10.7 5.1A15 15 0 0 1 22 8.82" }), /* @__PURE__ */ React.createElement("path", { d: "M2 2l20 20" }));
}
function NetworkBanner() {
  const state = useConnectivity();
  const prevRef = useRef(state);
  const [recovered, setRecovered] = useState(false);
  useEffect(() => {
    const wasProblem = prevRef.current !== "ok";
    prevRef.current = state;
    if (state !== "ok") {
      setRecovered(false);
      return;
    }
    if (wasProblem) {
      setRecovered(true);
      const id = setTimeout(() => setRecovered(false), 2500);
      return () => clearTimeout(id);
    }
  }, [state]);
  if (state === "ok" && !recovered) return null;
  const view = state === "blocked" ? { bg: "#4a1015", border: "#D91E2B", text: NETWORK_BLOCKED_MESSAGE, sub: "\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062F", icon: true } : state === "offline" ? { bg: "#4a1015", border: "#D91E2B", text: NETWORK_OFFLINE_MESSAGE, sub: NETWORK_VPN_HINT, icon: true } : state === "weak" ? { bg: "#4a3a0e", border: "#E8B33D", text: "\u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0636\u0639\u06CC\u0641 \u0627\u0633\u062A", sub: NETWORK_VPN_HINT, icon: true } : { bg: "#10361f", border: "#2e9d57", text: "\u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0648\u0635\u0644 \u0634\u062F", icon: false };
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      role: "status",
      dir: "rtl",
      className: "shrink-0 flex items-center justify-center gap-2 px-3 py-1.5",
      style: { background: view.bg, borderBottom: `1px solid ${view.border}`, fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", fontSize: 12 }
    },
    view.icon && /* @__PURE__ */ React.createElement(WifiOffIcon, { className: "w-4 h-4 shrink-0" }),
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center text-center" }, /* @__PURE__ */ React.createElement("span", null, view.text), view.sub && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, opacity: 0.8 } }, view.sub))
  );
}
function PhoneMock({ children, bgImage }) {
  return /* @__PURE__ */ React.createElement("div", { className: "relative w-full h-full overflow-hidden flex flex-col", style: { background: "#0B0B0D" } }, bgImage && /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "absolute inset-0",
      style: {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.2,
        zIndex: 0,
        pointerEvents: "none"
      }
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "relative flex-1 flex flex-col min-h-0", style: { zIndex: 1 } }, children));
}
function TopNotch() {
  return /* @__PURE__ */ React.createElement("div", { className: "flex justify-center pt-2 pb-1 shrink-0" }, /* @__PURE__ */ React.createElement("div", { className: "w-24 h-1.5 rounded-full", style: { background: "#2a292e" } }));
}
function SplashScreen({ onStart, loading }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "flex-1 flex flex-col relative overflow-hidden",
      style: {
        background: "radial-gradient(circle at 50% 20%, #2a1013 0%, #0B0B0D 60%)"
      },
      dir: "rtl"
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "absolute inset-0 opacity-60",
        style: {
          backgroundImage: "repeating-linear-gradient(135deg, transparent 0 22px, rgba(217,30,43,0.08) 22px 24px, transparent 24px 46px)"
        }
      }
    ),
    /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 left-0 right-0 h-40 opacity-40" }, /* @__PURE__ */ React.createElement("div", { className: "absolute left-0 right-0", style: { background: "#D91E2B", height: "2px", bottom: "1.5rem" } }), /* @__PURE__ */ React.createElement("div", { className: "absolute left-0 right-0", style: { background: "#E8B33D", height: "2px", bottom: "3.5rem" } }), /* @__PURE__ */ React.createElement("div", { className: "absolute left-0 right-0", style: { background: "#D91E2B", height: "2px", bottom: "5.5rem" } })),
    /* @__PURE__ */ React.createElement("div", { className: "relative flex-1 flex flex-col items-center justify-center px-8 text-center" }, /* @__PURE__ */ React.createElement("div", { className: "relative mb-6 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "absolute rounded-full",
        style: {
          width: "416px",
          height: "416px",
          background: "radial-gradient(circle, rgba(232,179,61,0.35) 0%, rgba(217,30,43,0.25) 45%, transparent 72%)",
          filter: "blur(2px)"
        }
      }
    ), /* @__PURE__ */ React.createElement(
      "img",
      {
        src: SPLASH_LOGO_SRC,
        alt: "Boxing Club Academy Amertka",
        className: "relative object-contain",
        style: {
          width: "320px",
          height: "320px",
          filter: "drop-shadow(0 0 18px rgba(217,30,43,0.55)) drop-shadow(0 0 6px rgba(232,179,61,0.4))"
        }
      }
    )), /* @__PURE__ */ React.createElement(
      "h1",
      {
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", lineHeight: 1.5 },
        className: "text-3xl font-black mb-3"
      },
      "\u0622\u0645\u0648\u0632\u0634 \u0628\u0648\u06A9\u0633 \u062D\u0631\u0641\u0647\u200C\u0627\u06CC NASERI"
    ), /* @__PURE__ */ React.createElement(
      "p",
      {
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790", maxWidth: "260px" },
        className: "text-sm leading-7"
      },
      "\u062A\u0645\u0631\u06CC\u0646 \u0628\u0627 \u0645\u062A\u062F \u0628\u0627\u0634\u06AF\u0627\u0647\u200C\u0647\u0627\u06CC \u062D\u0631\u0641\u0647\u200C\u0627\u06CC NASERI\u060C \u0632\u06CC\u0631 \u0646\u0638\u0631 \u0645\u0631\u0628\u06CC\u200C\u0647\u0627\u06CC \u0631\u0633\u0645\u06CC"
    )),
    /* @__PURE__ */ React.createElement("div", { className: "relative px-6 pb-8" }, loading ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "w-full rounded-full overflow-hidden",
        style: { background: "#1c1b1f", height: "6px" }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          style: {
            height: "100%",
            background: "linear-gradient(90deg, #2E9FE8, #5FD3E8)",
            animation: "splashLoadFill 5000ms ease-out forwards"
          }
        }
      )
    ), /* @__PURE__ */ React.createElement("style", null, `
              @keyframes splashLoadFill {
                0% { width: 0%; }
                100% { width: 100%; }
              }
            `)) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onStart,
        style: { fontFamily: "Vazirmatn, sans-serif", background: "#D91E2B", color: "#F3EEE6" },
        className: "w-full rounded-xl py-4 font-bold text-base mb-3 shadow-lg"
      },
      "\u0634\u0631\u0648\u0639 \u06A9\u0646"
    ), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }, className: "text-xs text-center" }, "\u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0628\u0627 \u0627\u06CC\u0645\u06CC\u0644")))
  );
}
function EyeIcon({ className, off }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" }), off && /* @__PURE__ */ React.createElement("path", { d: "M3 3l18 18" }));
}
function AuthPhoneField({ value, onChange, onEnter, hasError, autoFocus }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "flex items-center rounded-xl px-4 py-3.5 border",
      style: { background: "#17161A", borderColor: hasError ? "#D91E2B" : "#2a292e" }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Oswald, sans-serif", color: "#E8B33D" }, className: "text-sm font-semibold ml-3" }, "+98"),
    /* @__PURE__ */ React.createElement("div", { className: "w-px h-5 ml-3", style: { background: "#2a292e" } }),
    /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "tel",
        inputMode: "numeric",
        autoComplete: "tel",
        autoFocus,
        placeholder: "912 345 6789",
        value,
        onChange: (e) => onChange(toLatinDigits(e.target.value).replace(/[^\d\s]/g, "")),
        onKeyDown: (e) => e.key === "Enter" && (onEnter == null ? void 0 : onEnter()),
        style: { fontFamily: "Oswald, sans-serif", color: "#F3EEE6" },
        className: "bg-transparent outline-none flex-1 text-base tracking-wider",
        dir: "ltr"
      }
    )
  );
}
function AuthPasswordField({ value, onChange, onEnter, placeholder, autoComplete, hasError }) {
  const [visible, setVisible] = useState(false);
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "flex items-center rounded-xl px-4 py-3.5 border",
      style: { background: "#17161A", borderColor: hasError ? "#D91E2B" : "#2a292e" }
    },
    /* @__PURE__ */ React.createElement(
      "input",
      {
        type: visible ? "text" : "password",
        autoComplete,
        placeholder,
        value,
        onChange: (e) => onChange(e.target.value),
        onKeyDown: (e) => e.key === "Enter" && (onEnter == null ? void 0 : onEnter()),
        style: { fontFamily: "Oswald, sans-serif", color: "#F3EEE6" },
        className: "bg-transparent outline-none flex-1 text-base tracking-wider min-w-0",
        dir: "ltr",
        maxLength: 64
      }
    ),
    /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setVisible((v) => !v), "aria-label": visible ? "\u067E\u0646\u0647\u0627\u0646 \u06A9\u0631\u062F\u0646 \u0631\u0645\u0632" : "\u0646\u0645\u0627\u06CC\u0634 \u0631\u0645\u0632", style: { color: "#8A8790" }, className: "mr-2" }, /* @__PURE__ */ React.createElement(EyeIcon, { className: "w-5 h-5", off: visible }))
  );
}
function AuthCodeInput({ digits, setDigits, hasError, onComplete }) {
  const refs = useRef([]);
  const setAt = (i, val) => {
    var _a2;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < digits.length - 1) (_a2 = refs.current[i + 1]) == null ? void 0 : _a2.focus();
    if (next.every((d) => d !== "")) onComplete == null ? void 0 : onComplete(next.join(""));
  };
  const handleChange = (i, raw) => {
    var _a2;
    const clean = toLatinDigits(raw).replace(/\D/g, "");
    if (clean.length > 1) {
      const next = [...digits];
      clean.slice(0, digits.length - i).split("").forEach((d, k) => next[i + k] = d);
      setDigits(next);
      (_a2 = refs.current[Math.min(i + clean.length, digits.length - 1)]) == null ? void 0 : _a2.focus();
      if (next.every((d) => d !== "")) onComplete == null ? void 0 : onComplete(next.join(""));
      return;
    }
    setAt(i, clean);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 justify-center", dir: "ltr" }, digits.map((c, i) => /* @__PURE__ */ React.createElement(
    "input",
    {
      key: i,
      ref: (el) => refs.current[i] = el,
      value: c,
      autoFocus: i === 0,
      autoComplete: i === 0 ? "one-time-code" : "off",
      onChange: (e) => handleChange(i, e.target.value),
      onKeyDown: (e) => {
        var _a2;
        if (e.key === "Backspace" && !digits[i] && i > 0) (_a2 = refs.current[i - 1]) == null ? void 0 : _a2.focus();
      },
      inputMode: "numeric",
      style: {
        fontFamily: "Oswald, sans-serif",
        background: "#17161A",
        borderColor: hasError ? "#D91E2B" : c ? "#D91E2B" : "#2a292e",
        color: "#F3EEE6"
      },
      className: "w-11 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none"
    }
  )));
}
function PasswordRules({ password, phone }) {
  const c = getPasswordChecks(password, phone);
  const rows = [
    [c.length, "\u062D\u062F\u0627\u0642\u0644 \u06F8 \u06A9\u0627\u0631\u0627\u06A9\u062A\u0631"],
    [c.mix, "\u0647\u0645 \u062D\u0631\u0641 \u0648 \u0647\u0645 \u0639\u062F\u062F \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u0647"],
    [c.notPhone, "\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644\u062A \u0646\u0628\u0627\u0634\u0647"]
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "mt-3 flex flex-col gap-1.5" }, rows.map(([passed, text]) => /* @__PURE__ */ React.createElement("div", { key: text, className: "flex items-center gap-2", style: { fontFamily: "Vazirmatn, sans-serif", fontSize: 12, color: passed ? "#4ADE80" : "#8A8790" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 14, textAlign: "center" } }, passed ? "\u2713" : "\u25CB"), /* @__PURE__ */ React.createElement("span", null, text))));
}
function PasswordAuthFlow({ deviceId, onSuccess, onUseLegacy, initialPhone }) {
  const [mode, setMode] = useState("login");
  const [stage, setStage] = useState("phone");
  const [phone, setPhone] = useState(initialPhone || "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [digits, setDigits] = useState(Array(OTP_CODE_LENGTH).fill(""));
  const [proofToken, setProofToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const [conflict, setConflict] = useState(false);
  const [resendLeft, setResendLeft] = useState(0);
  const normalizedPhone = normalizeIranPhone(toLatinDigits(phone));
  const phoneValid = isValidIranPhone(normalizedPhone);
  const purpose = mode === "forgot" ? "reset" : "register";
  useEffect(() => {
    if (resendLeft <= 0) return;
    const id = setTimeout(() => setResendLeft((s) => s - 1), 1e3);
    return () => clearTimeout(id);
  }, [resendLeft]);
  const clearError = () => {
    setError("");
    setErrorCode(null);
  };
  const fail = (err) => {
    setError(err.message || "\u062E\u0637\u0627\u06CC\u06CC \u0631\u062E \u062F\u0627\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646");
    setErrorCode(err.code || null);
  };
  const goMode = (nextMode) => {
    setMode(nextMode);
    setStage("phone");
    setPassword("");
    setConfirm("");
    setDigits(Array(OTP_CODE_LENGTH).fill(""));
    setProofToken(null);
    setConflict(false);
    clearError();
  };
  const run = async (fn) => {
    clearError();
    setLoading(true);
    try {
      await fn();
    } catch (err) {
      fail(err);
    } finally {
      setLoading(false);
    }
  };
  const handleLogin = (force) => run(async () => {
    try {
      const data = await apiPasswordLogin(normalizedPhone, password, deviceId, force, normalizedPhone);
      onSuccess(data);
    } catch (err) {
      if (err.code === "DEVICE_CONFLICT") {
        setConflict(true);
        setError(err.message);
        return;
      }
      throw err;
    }
  });
  const handleSendCode = () => run(async () => {
    await apiOtpSend(normalizedPhone, purpose);
    setDigits(Array(OTP_CODE_LENGTH).fill(""));
    setStage("code");
    setResendLeft(60);
  });
  const handleResend = () => run(async () => {
    await apiOtpSend(normalizedPhone, purpose);
    setDigits(Array(OTP_CODE_LENGTH).fill(""));
    setResendLeft(60);
  });
  const handleVerifyCode = (codeOverride) => run(async () => {
    const code = codeOverride || digits.join("");
    const data = await apiOtpVerify(normalizedPhone, code, purpose);
    setProofToken(data.proofToken);
    setStage("password");
  });
  const handleSetPassword = (force) => run(async () => {
    if (!isPasswordAcceptable(password, normalizedPhone)) throw new Error("\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0634\u0631\u0627\u06CC\u0637 \u0644\u0627\u0632\u0645 \u0631\u0648 \u0646\u062F\u0627\u0631\u0647");
    if (password !== confirm) throw new Error("\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0628\u0627 \u0631\u0645\u0632 \u0627\u0635\u0644\u06CC \u06CC\u06A9\u06CC \u0646\u06CC\u0633\u062A");
    try {
      const data = mode === "forgot" ? await apiResetPassword(proofToken, password, deviceId, normalizedPhone) : await apiRegisterAccount(proofToken, password, deviceId, force, normalizedPhone);
      onSuccess(data);
    } catch (err) {
      if (err.code === "DEVICE_CONFLICT") {
        setConflict(true);
        setError(err.message);
        return;
      }
      if (err.code === "PROOF_INVALID") {
        setStage("phone");
        setProofToken(null);
        setDigits(Array(OTP_CODE_LENGTH).fill(""));
      }
      throw err;
    }
  });
  const label = { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" };
  const primaryBtn = (enabled) => ({
    fontFamily: "Vazirmatn, sans-serif",
    background: enabled ? "#D91E2B" : "#3a2226",
    color: enabled ? "#F3EEE6" : "#7a5a5d"
  });
  const linkBtn = { fontFamily: "Vazirmatn, sans-serif", color: "#E8B33D" };
  const errorBox = error ? /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }, className: "text-xs leading-6" }, error), errorCode === "ACCOUNT_EXISTS" && /* @__PURE__ */ React.createElement("button", { onClick: () => goMode("login"), style: linkBtn, className: "text-xs font-bold mt-1" }, "\u0631\u0641\u062A\u0646 \u0628\u0647 \u0635\u0641\u062D\u0647\u200C\u06CC \u0648\u0631\u0648\u062F"), errorCode === "NO_ACCOUNT" && /* @__PURE__ */ React.createElement("button", { onClick: () => goMode("register"), style: linkBtn, className: "text-xs font-bold mt-1" }, "\u062B\u0628\u062A\u200C\u0646\u0627\u0645"), errorCode === "NO_PASSWORD" && /* @__PURE__ */ React.createElement("div", { className: "flex gap-4 mt-1" }, /* @__PURE__ */ React.createElement("button", { onClick: () => goMode("register"), style: linkBtn, className: "text-xs font-bold" }, "\u062A\u0639\u06CC\u06CC\u0646 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631"), /* @__PURE__ */ React.createElement("button", { onClick: () => onUseLegacy == null ? void 0 : onUseLegacy(normalizedPhone), style: linkBtn, className: "text-xs font-bold" }, "\u0648\u0631\u0648\u062F \u0628\u0627 \u06A9\u062F \u067E\u06CC\u0627\u0645\u06A9\u06CC"))) : null;
  const conflictBox = (onForce) => /* @__PURE__ */ React.createElement("div", { className: "rounded-xl p-4 mb-4", style: { background: "rgba(217,30,43,0.1)", border: "1px solid rgba(217,30,43,0.35)" } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#DAD6CE" }, className: "text-xs leading-6 mb-3 text-center" }, "\u0627\u06CC\u0646 \u062D\u0633\u0627\u0628 \u0647\u0645\u06CC\u0646 \u0627\u0644\u0627\u0646 \u0631\u0648\u06CC \u06CC\u0647 \u06AF\u0648\u0634\u06CC \u062F\u06CC\u06AF\u0647 \u0628\u0627\u0632\u0647. \u0647\u0631 \u062D\u0633\u0627\u0628 \u0641\u0642\u0637 \u0645\u06CC\u200C\u062A\u0648\u0646\u0647 \u0631\u0648\u06CC \u06CC\u0647 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0641\u0639\u0627\u0644 \u0628\u0627\u0634\u0647."), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onForce,
      disabled: loading,
      style: { fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE", color: "#0B0B0D" },
      className: "w-full rounded-lg py-2.5 text-xs font-bold"
    },
    loading ? "\u062F\u0631 \u062D\u0627\u0644 \u0648\u0631\u0648\u062F\u2026" : "\u062E\u0631\u0648\u062C \u0627\u0632 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0642\u0628\u0644\u06CC \u0648 \u0648\u0631\u0648\u062F \u0627\u06CC\u0646\u062C\u0627"
  ));
  const header = /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-6" }, mode === "login" ? /* @__PURE__ */ React.createElement("img", { src: SPLASH_LOGO_SRC, alt: "NASERI", className: "w-8 h-8 object-contain" }) : /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => stage === "phone" ? goMode("login") : setStage(stage === "password" ? "code" : "phone"),
      style: { color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" },
      className: "text-sm rounded-lg px-3 py-1.5 font-bold"
    },
    "\u2039 \u0628\u0627\u0632\u06AF\u0634\u062A"
  ), DEMO_MODE && /* @__PURE__ */ React.createElement(
    "span",
    {
      style: { fontFamily: "Vazirmatn, sans-serif", color: "#E8B33D", background: "rgba(232,179,61,0.12)", border: "1px solid rgba(232,179,61,0.4)", fontSize: "9px" },
      className: "rounded-full px-2 py-1 mr-auto"
    },
    "\u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC"
  ));
  if (mode === "login") {
    const canLogin = phoneValid && password.length > 0 && !loading && Boolean(deviceId);
    return /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col px-6 pt-4 overflow-y-auto", dir: "rtl" }, header, /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", lineHeight: 1.3 }, className: "text-3xl font-black mb-2" }, "\u0648\u0627\u0631\u062F \u0631\u06CC\u0646\u06AF \u0634\u0648."), /* @__PURE__ */ React.createElement("p", { style: label, className: "text-sm mb-6 leading-7" }, "\u0628\u0627 \u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644 \u0648 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631\u062A \u0648\u0627\u0631\u062F \u0634\u0648."), /* @__PURE__ */ React.createElement("label", { style: label, className: "text-xs mb-2 block" }, "\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644"), /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement(AuthPhoneField, { value: phone, onChange: (v) => {
      setPhone(v);
      clearError();
      setConflict(false);
    }, hasError: Boolean(error) })), /* @__PURE__ */ React.createElement("label", { style: label, className: "text-xs mb-2 block" }, "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631"), /* @__PURE__ */ React.createElement("div", { className: "mb-2" }, /* @__PURE__ */ React.createElement(
      AuthPasswordField,
      {
        value: password,
        onChange: (v) => {
          setPassword(v);
          clearError();
          setConflict(false);
        },
        onEnter: () => canLogin && handleLogin(false),
        placeholder: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
        autoComplete: "current-password",
        hasError: Boolean(error)
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "flex justify-start mb-5" }, /* @__PURE__ */ React.createElement("button", { onClick: () => goMode("forgot"), style: linkBtn, className: "text-xs font-bold" }, "\u0631\u0645\u0632\u062A \u0631\u0648 \u0641\u0631\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u06CC\u061F")), errorBox, conflict ? conflictBox(() => handleLogin(true)) : /* @__PURE__ */ React.createElement("button", { onClick: () => handleLogin(false), disabled: !canLogin, style: primaryBtn(canLogin), className: "w-full rounded-xl py-4 font-bold text-base transition-colors mb-4" }, loading ? "\u062F\u0631 \u062D\u0627\u0644 \u0648\u0631\u0648\u062F\u2026" : "\u0648\u0631\u0648\u062F"), /* @__PURE__ */ React.createElement("p", { style: label, className: "text-sm text-center mb-3" }, "\u062D\u0633\u0627\u0628 \u0646\u062F\u0627\u0631\u06CC\u061F", " ", /* @__PURE__ */ React.createElement("button", { onClick: () => goMode("register"), style: linkBtn, className: "font-bold" }, "\u062B\u0628\u062A\u200C\u0646\u0627\u0645")), /* @__PURE__ */ React.createElement("div", { className: "mt-auto mb-6 text-center" }, /* @__PURE__ */ React.createElement("button", { onClick: () => onUseLegacy == null ? void 0 : onUseLegacy(phoneValid ? normalizedPhone : ""), style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-xs underline" }, "\u0648\u0631\u0648\u062F \u0628\u0627 \u0627\u06CC\u0645\u06CC\u0644 \u06CC\u0627 \u06A9\u062F \u067E\u06CC\u0627\u0645\u06A9\u06CC")));
  }
  const isForgot = mode === "forgot";
  if (stage === "phone") {
    const canSend = phoneValid && !loading;
    return /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col px-6 pt-4 overflow-y-auto", dir: "rtl" }, header, /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", lineHeight: 1.3 }, className: "text-2xl font-black mb-2" }, isForgot ? "\u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631" : "\u0633\u0627\u062E\u062A \u062D\u0633\u0627\u0628"), /* @__PURE__ */ React.createElement("p", { style: label, className: "text-sm mb-6 leading-7" }, isForgot ? "\u0634\u0645\u0627\u0631\u0647\u200C\u0627\u06CC \u06A9\u0647 \u0628\u0627 \u0627\u0648\u0646 \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u06A9\u0631\u062F\u06CC \u0631\u0648 \u0648\u0627\u0631\u062F \u06A9\u0646 \u062A\u0627 \u06CC\u0647 \u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F \u0628\u0631\u0627\u062A \u067E\u06CC\u0627\u0645\u06A9 \u06A9\u0646\u06CC\u0645." : "\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644\u062A \u0631\u0648 \u0648\u0627\u0631\u062F \u06A9\u0646 \u062A\u0627 \u06CC\u0647 \u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F \u0628\u0631\u0627\u062A \u067E\u06CC\u0627\u0645\u06A9 \u06A9\u0646\u06CC\u0645. \u0628\u0639\u062F\u0634 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631\u062A \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u0645\u06CC\u200C\u06A9\u0646\u06CC."), /* @__PURE__ */ React.createElement("label", { style: label, className: "text-xs mb-2 block" }, "\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644"), /* @__PURE__ */ React.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React.createElement(AuthPhoneField, { value: phone, onChange: (v) => {
      setPhone(v);
      clearError();
    }, onEnter: () => canSend && handleSendCode(), hasError: Boolean(error), autoFocus: true })), errorBox, /* @__PURE__ */ React.createElement("button", { onClick: handleSendCode, disabled: !canSend, style: primaryBtn(canSend), className: "w-full rounded-xl py-4 font-bold text-base transition-colors mb-4 mt-2" }, loading ? "\u062F\u0631 \u062D\u0627\u0644 \u0627\u0631\u0633\u0627\u0644\u2026" : "\u062F\u0631\u06CC\u0627\u0641\u062A \u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F"), /* @__PURE__ */ React.createElement("p", { style: label, className: "text-sm text-center" }, isForgot ? "\u06CC\u0627\u062F\u062A \u0627\u0648\u0645\u062F\u061F" : "\u0642\u0628\u0644\u0627\u064B \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u06A9\u0631\u062F\u06CC\u061F", " ", /* @__PURE__ */ React.createElement("button", { onClick: () => goMode("login"), style: linkBtn, className: "font-bold" }, "\u0648\u0631\u0648\u062F")), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }, className: "text-xs text-center leading-6 mt-auto mb-6" }, "\u0628\u0627 \u0627\u062F\u0627\u0645\u0647\u060C \u0634\u0631\u0627\u06CC\u0637 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u06CC."));
  }
  if (stage === "code") {
    const filled = digits.every((d) => d !== "");
    return /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col px-6 pt-4 overflow-y-auto", dir: "rtl" }, header, /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-2xl font-black mb-2" }, "\u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F \u0631\u0648 \u0648\u0627\u0631\u062F \u06A9\u0646"), /* @__PURE__ */ React.createElement("p", { style: label, className: "text-sm mb-6 leading-7" }, "\u06A9\u062F ", OTP_CODE_LENGTH.toLocaleString("fa-IR"), " \u0631\u0642\u0645\u06CC \u0628\u0647 \u0634\u0645\u0627\u0631\u0647", " ", /* @__PURE__ */ React.createElement("span", { style: { color: "#E8B33D", direction: "ltr", display: "inline-block" } }, normalizedPhone), " \u067E\u06CC\u0627\u0645\u06A9 \u0634\u062F."), /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement(AuthCodeInput, { digits, setDigits: (d) => {
      setDigits(d);
      clearError();
    }, hasError: Boolean(error), onComplete: (code) => !loading && handleVerifyCode(code) })), /* @__PURE__ */ React.createElement("div", { className: "text-center" }, errorBox), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }, className: "text-xs text-center mb-6" }, resendLeft > 0 ? /* @__PURE__ */ React.createElement("span", { dir: "ltr", style: { display: "inline-block" } }, "\u0627\u0631\u0633\u0627\u0644 \u0645\u062C\u062F\u062F \u062A\u0627 ", String(Math.floor(resendLeft / 60)).padStart(2, "0"), ":", String(resendLeft % 60).padStart(2, "0")) : /* @__PURE__ */ React.createElement(React.Fragment, null, "\u06A9\u062F \u0631\u0648 \u062F\u0631\u06CC\u0627\u0641\u062A \u0646\u06A9\u0631\u062F\u06CC\u061F", " ", /* @__PURE__ */ React.createElement("button", { onClick: handleResend, disabled: loading, style: linkBtn }, "\u0627\u0631\u0633\u0627\u0644 \u0645\u062C\u062F\u062F"))), /* @__PURE__ */ React.createElement("button", { onClick: () => handleVerifyCode(), disabled: !filled || loading, style: primaryBtn(filled && !loading), className: "w-full rounded-xl py-4 font-bold text-base transition-colors" }, loading ? "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC\u2026" : "\u062A\u0627\u06CC\u06CC\u062F"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setStage("phone");
      clearError();
    }, style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-xs underline mt-4" }, "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0634\u0645\u0627\u0631\u0647"));
  }
  const passwordOk = isPasswordAcceptable(password, normalizedPhone);
  const matches = password.length > 0 && password === confirm;
  const canSubmit = passwordOk && matches && !loading && Boolean(deviceId);
  return /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col px-6 pt-4 overflow-y-auto", dir: "rtl" }, header, /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", lineHeight: 1.3 }, className: "text-2xl font-black mb-2" }, isForgot ? "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F" : "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631\u062A \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646"), /* @__PURE__ */ React.createElement("p", { style: label, className: "text-sm mb-6 leading-7" }, isForgot ? "\u0628\u0627 \u062B\u0628\u062A \u0631\u0645\u0632 \u062C\u062F\u06CC\u062F\u060C \u0627\u06AF\u0647 \u0631\u0648\u06CC \u06AF\u0648\u0634\u06CC \u062F\u06CC\u06AF\u0647\u200C\u0627\u06CC \u0648\u0627\u0631\u062F \u0634\u062F\u0647 \u0628\u0627\u0634\u06CC \u0627\u0632 \u0627\u0648\u0646 \u062E\u0627\u0631\u062C \u0645\u06CC\u200C\u0634\u06CC." : "\u0634\u0645\u0627\u0631\u0647\u200C\u0627\u062A \u062A\u0627\u06CC\u06CC\u062F \u0634\u062F. \u0627\u06CC\u0646 \u0631\u0645\u0632 \u0631\u0648 \u0628\u0631\u0627\u06CC \u0648\u0631\u0648\u062F\u0647\u0627\u06CC \u0628\u0639\u062F\u06CC \u0644\u0627\u0632\u0645 \u062F\u0627\u0631\u06CC."), /* @__PURE__ */ React.createElement("label", { style: label, className: "text-xs mb-2 block" }, isForgot ? "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F" : "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631"), /* @__PURE__ */ React.createElement(AuthPasswordField, { value: password, onChange: (v) => {
    setPassword(v);
    clearError();
    setConflict(false);
  }, placeholder: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631", autoComplete: "new-password", hasError: false }), /* @__PURE__ */ React.createElement(PasswordRules, { password, phone: normalizedPhone }), /* @__PURE__ */ React.createElement("label", { style: label, className: "text-xs mb-2 mt-5 block" }, "\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631"), /* @__PURE__ */ React.createElement(
    AuthPasswordField,
    {
      value: confirm,
      onChange: (v) => {
        setConfirm(v);
        clearError();
      },
      onEnter: () => canSubmit && handleSetPassword(false),
      placeholder: "\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
      autoComplete: "new-password",
      hasError: confirm.length > 0 && !matches
    }
  ), confirm.length > 0 && !matches && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }, className: "text-xs mt-2" }, "\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0628\u0627 \u0631\u0645\u0632 \u0627\u0635\u0644\u06CC \u06CC\u06A9\u06CC \u0646\u06CC\u0633\u062A"), /* @__PURE__ */ React.createElement("div", { className: "mt-5" }, errorBox), conflict ? conflictBox(() => handleSetPassword(true)) : /* @__PURE__ */ React.createElement("button", { onClick: () => handleSetPassword(false), disabled: !canSubmit, style: primaryBtn(canSubmit), className: "w-full rounded-xl py-4 font-bold text-base transition-colors mb-6" }, loading ? "\u062F\u0631 \u062D\u0627\u0644 \u0630\u062E\u06CC\u0631\u0647\u2026" : isForgot ? "\u062B\u0628\u062A \u0631\u0645\u0632 \u062C\u062F\u06CC\u062F \u0648 \u0648\u0631\u0648\u062F" : "\u0633\u0627\u062E\u062A \u062D\u0633\u0627\u0628 \u0648 \u0648\u0631\u0648\u062F"));
}
function SignupScreen({ contact, setContact, method, setMethod, onSubmit, onUsePassword }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const contactValid = isValidIdentifier(contact.trim(), method);
  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await onSubmit();
    } catch (err) {
      setError(err.message || "\u0627\u0631\u0633\u0627\u0644 \u06A9\u062F \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
    } finally {
      setLoading(false);
    }
  };
  const switchMethod = (next) => {
    if (next === method) return;
    setMethod(next);
    setContact("");
    setError("");
  };
  return /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col px-6 pt-4", dir: "rtl" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-8" }, /* @__PURE__ */ React.createElement("img", { src: SPLASH_LOGO_SRC, alt: "NASERI", className: "w-8 h-8 object-contain" }), DEMO_MODE && /* @__PURE__ */ React.createElement(
    "span",
    {
      style: {
        fontFamily: "Vazirmatn, sans-serif",
        color: "#E8B33D",
        background: "rgba(232,179,61,0.12)",
        border: "1px solid rgba(232,179,61,0.4)",
        fontSize: "9px"
      },
      className: "rounded-full px-2 py-1 mr-auto"
    },
    "\u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC"
  )), /* @__PURE__ */ React.createElement(
    "h1",
    {
      style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", lineHeight: 1.3 },
      className: "text-3xl font-black mb-2"
    },
    "\u0648\u0627\u0631\u062F \u0631\u06CC\u0646\u06AF \u0634\u0648."
  ), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-sm mb-6 leading-7" }, "\u0628\u0627 \u0627\u06CC\u0645\u06CC\u0644 \u06CC\u0627 \u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644\u062A \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u06A9\u0646 \u0648 \u0628\u0631\u0646\u0627\u0645\u0647 \u062A\u0645\u0631\u06CC\u0646\u06CC \u062D\u0631\u0641\u0647\u200C\u0627\u06CC \u0628\u0648\u06A9\u0633 \u0631\u0648 \u0634\u0631\u0648\u0639 \u06A9\u0646."), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "flex rounded-xl p-1 mb-6",
      style: { background: "#17161A", border: "1px solid #2a292e" }
    },
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => switchMethod("email"),
        style: {
          fontFamily: "Vazirmatn, sans-serif",
          background: method === "email" ? "#D91E2B" : "transparent",
          color: method === "email" ? "#F3EEE6" : "#8A8790"
        },
        className: "flex-1 rounded-lg py-2.5 text-sm font-bold transition-colors"
      },
      "\u0627\u06CC\u0645\u06CC\u0644"
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => switchMethod("phone"),
        style: {
          fontFamily: "Vazirmatn, sans-serif",
          background: method === "phone" ? "#D91E2B" : "transparent",
          color: method === "phone" ? "#F3EEE6" : "#8A8790"
        },
        className: "flex-1 rounded-lg py-2.5 text-sm font-bold transition-colors"
      },
      "\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644"
    )
  ), /* @__PURE__ */ React.createElement(
    "label",
    {
      style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" },
      className: "text-xs mb-2 block"
    },
    method === "email" ? "\u0627\u06CC\u0645\u06CC\u0644" : "\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644"
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "flex items-center rounded-xl px-4 py-3.5 mb-2 border",
      style: { background: "#17161A", borderColor: error ? "#D91E2B" : "#2a292e" }
    },
    method === "phone" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Oswald, sans-serif", color: "#E8B33D" }, className: "text-sm font-semibold ml-3" }, "+98"), /* @__PURE__ */ React.createElement("div", { className: "w-px h-5 ml-3", style: { background: "#2a292e" } })),
    /* @__PURE__ */ React.createElement(
      "input",
      {
        type: method === "email" ? "email" : "tel",
        inputMode: method === "email" ? "email" : "numeric",
        autoComplete: method === "email" ? "email" : "tel",
        placeholder: method === "email" ? "example@email.com" : "912 345 6789",
        value: contact,
        onChange: (e) => setContact(
          method === "email" ? e.target.value.replace(/\s/g, "") : e.target.value.replace(/[^\d\s]/g, "")
        ),
        style: { fontFamily: "Oswald, sans-serif", color: "#F3EEE6" },
        className: "bg-transparent outline-none flex-1 text-base tracking-wider",
        dir: "ltr"
      }
    )
  ), /* @__PURE__ */ React.createElement(
    "p",
    {
      style: { fontFamily: "Vazirmatn, sans-serif", color: error ? "#D91E2B" : "#55535a" },
      className: "text-xs mb-8"
    },
    error || (DEMO_MODE ? "\u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC: \u0647\u0631 \u06A9\u062F \u06F4 \u0631\u0642\u0645\u06CC \u062F\u0644\u062E\u0648\u0627\u0647 \u0631\u0648 \u0642\u0628\u0648\u0644 \u0645\u06CC\u200C\u06A9\u0646\u0647." : method === "email" ? "\u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F \u0628\u0631\u0627\u06CC \u0647\u0645\u06CC\u0646 \u0627\u06CC\u0645\u06CC\u0644 \u0627\u0631\u0633\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F." : "\u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F \u0628\u0631\u0627\u06CC \u0647\u0645\u06CC\u0646 \u0634\u0645\u0627\u0631\u0647 \u067E\u06CC\u0627\u0645\u06A9 \u0645\u06CC\u200C\u0634\u0648\u062F.")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleSubmit,
      disabled: !contactValid || loading,
      style: {
        fontFamily: "Vazirmatn, sans-serif",
        background: contactValid && !loading ? "#D91E2B" : "#3a2226",
        color: contactValid && !loading ? "#F3EEE6" : "#7a5a5d"
      },
      className: "w-full rounded-xl py-4 font-bold text-base transition-colors mb-4"
    },
    loading ? "\u062F\u0631 \u062D\u0627\u0644 \u0627\u0631\u0633\u0627\u0644\u2026" : "\u062F\u0631\u06CC\u0627\u0641\u062A \u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F"
  ), onUsePassword && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-sm text-center mb-3" }, "\u0628\u0627 \u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644 \u0648 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0648\u0627\u0631\u062F \u0645\u06CC\u200C\u0634\u06CC\u061F", " ", /* @__PURE__ */ React.createElement("button", { onClick: onUsePassword, style: { color: "#E8B33D" }, className: "font-bold" }, "\u0648\u0631\u0648\u062F \u0628\u0627 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631")), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }, className: "text-xs text-center leading-6 mt-auto mb-6" }, "\u0628\u0627 \u0627\u062F\u0627\u0645\u0647\u060C \u0634\u0631\u0627\u06CC\u0637 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u06CC."));
}
function OtpScreen({ contact, method, onVerify, code, setCode }) {
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const [deviceConflict, setDeviceConflict] = useState(false);
  const [resendSecondsLeft, setResendSecondsLeft] = useState(120);
  useEffect(() => {
    if (resendSecondsLeft <= 0) return;
    const timer = setTimeout(() => setResendSecondsLeft((s) => s - 1), 1e3);
    return () => clearTimeout(timer);
  }, [resendSecondsLeft]);
  const handleChange = (i, val) => {
    var _a2;
    if (!/^\d?$/.test(val)) return;
    setError("");
    setDeviceConflict(false);
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 3) (_a2 = inputsRef.current[i + 1]) == null ? void 0 : _a2.focus();
  };
  const handleKeyDown = (i, e) => {
    var _a2;
    if (e.key === "Backspace" && !code[i] && i > 0) {
      (_a2 = inputsRef.current[i - 1]) == null ? void 0 : _a2.focus();
    }
  };
  const filled = code.every((c) => c !== "");
  const handleVerify = async (force) => {
    setError("");
    setLoading(true);
    try {
      await onVerify.next(code.join(""), force);
      setDeviceConflict(false);
    } catch (err) {
      if (err.code === "DEVICE_CONFLICT") {
        setDeviceConflict(true);
        setError(err.message);
      } else {
        setError(err.message || "\u06A9\u062F \u0648\u0627\u0631\u062F \u0634\u062F\u0647 \u0627\u0634\u062A\u0628\u0627\u0647 \u0627\u0633\u062A");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async () => {
    setError("");
    setDeviceConflict(false);
    setResending(true);
    try {
      await onVerify.resend();
      setResendSecondsLeft(120);
    } catch (err) {
      setError(err.message || "\u0627\u0631\u0633\u0627\u0644 \u062F\u0648\u0628\u0627\u0631\u0647 \u06A9\u062F \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
    } finally {
      setResending(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col px-6 pt-4", dir: "rtl" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onVerify.back,
      style: {
        color: "#0B0B0D",
        fontFamily: "Vazirmatn, sans-serif",
        background: "#DAD6CE"
      },
      className: "self-start text-sm mb-8 rounded-lg px-3 py-1.5 font-bold"
    },
    "\u2039 \u0628\u0627\u0632\u06AF\u0634\u062A"
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "w-24 h-24 rounded-full flex items-center justify-center mb-6 overflow-hidden mx-auto",
      style: { background: "rgba(217,30,43,0.12)", border: "1px solid rgba(217,30,43,0.4)" }
    },
    /* @__PURE__ */ React.createElement("img", { src: SPLASH_LOGO_SRC, alt: "NASERI", className: "w-20 h-20 object-contain" })
  ), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-2xl font-black mb-2" }, "\u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F \u0631\u0648 \u0648\u0627\u0631\u062F \u06A9\u0646"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-sm mb-8 leading-7" }, "\u06A9\u062F \u06F4 \u0631\u0642\u0645\u06CC \u0628\u0647 ", method === "email" ? "\u0627\u06CC\u0645\u06CC\u0644" : "\u0634\u0645\u0627\u0631\u0647", " ", /* @__PURE__ */ React.createElement("span", { style: { color: "#E8B33D", direction: "ltr", display: "inline-block" } }, contact || "example@email.com"), " ", method === "email" ? "\u0627\u0631\u0633\u0627\u0644 \u0634\u062F." : "\u067E\u06CC\u0627\u0645\u06A9 \u0634\u062F."), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mb-3 justify-center", dir: "ltr" }, code.map((c, i) => /* @__PURE__ */ React.createElement(
    "input",
    {
      key: i,
      ref: (el) => inputsRef.current[i] = el,
      value: c,
      onChange: (e) => handleChange(i, e.target.value),
      onKeyDown: (e) => handleKeyDown(i, e),
      inputMode: "numeric",
      maxLength: 1,
      style: {
        fontFamily: "Oswald, sans-serif",
        background: "#17161A",
        borderColor: error ? "#D91E2B" : c ? "#D91E2B" : "#2a292e",
        color: "#F3EEE6"
      },
      className: "w-14 h-16 text-center text-2xl font-bold rounded-xl border-2 outline-none"
    }
  ))), error && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }, className: "text-xs text-center mb-3" }, error), deviceConflict ? /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "rounded-xl p-4 mb-6",
      style: { background: "rgba(217,30,43,0.1)", border: "1px solid rgba(217,30,43,0.35)" }
    },
    /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#DAD6CE" }, className: "text-xs leading-6 mb-3 text-center" }, "\u0627\u06CC\u0646 \u062D\u0633\u0627\u0628 \u0647\u0645\u06CC\u0646 \u0627\u0644\u0627\u0646 \u0631\u0648\u06CC \u06CC\u0647 \u06AF\u0648\u0634\u06CC \u062F\u06CC\u06AF\u0647 \u0628\u0627\u0632\u0647. \u0647\u0631 \u062D\u0633\u0627\u0628 \u0641\u0642\u0637 \u0645\u06CC\u200C\u062A\u0648\u0646\u0647 \u0631\u0648\u06CC \u06CC\u0647 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0641\u0639\u0627\u0644 \u0628\u0627\u0634\u0647."),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handleVerify(true),
        disabled: loading,
        style: { fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE", color: "#0B0B0D" },
        className: "w-full rounded-lg py-2.5 text-xs font-bold"
      },
      loading ? "\u062F\u0631 \u062D\u0627\u0644 \u0648\u0631\u0648\u062F\u2026" : "\u062E\u0631\u0648\u062C \u0627\u0632 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0642\u0628\u0644\u06CC \u0648 \u0648\u0631\u0648\u062F \u0627\u06CC\u0646\u062C\u0627"
    )
  ) : /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }, className: "text-xs text-center mb-10" }, resendSecondsLeft > 0 ? /* @__PURE__ */ React.createElement("span", { dir: "ltr", style: { display: "inline-block" } }, "\u0627\u0631\u0633\u0627\u0644 \u0645\u062C\u062F\u062F \u062A\u0627 ", String(Math.floor(resendSecondsLeft / 60)).padStart(2, "0"), ":", String(resendSecondsLeft % 60).padStart(2, "0")) : /* @__PURE__ */ React.createElement(React.Fragment, null, "\u06A9\u062F \u0631\u0648 \u062F\u0631\u06CC\u0627\u0641\u062A \u0646\u06A9\u0631\u062F\u06CC\u061F", " ", /* @__PURE__ */ React.createElement("button", { onClick: handleResend, disabled: resending, style: { color: "#E8B33D" } }, resending ? "\u062F\u0631 \u062D\u0627\u0644 \u0627\u0631\u0633\u0627\u0644\u2026" : "\u0627\u0631\u0633\u0627\u0644 \u0645\u062C\u062F\u062F"))), !deviceConflict && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleVerify(false),
      disabled: !filled || loading,
      style: {
        fontFamily: "Vazirmatn, sans-serif",
        background: filled && !loading ? "#D91E2B" : "#3a2226",
        color: filled && !loading ? "#F3EEE6" : "#7a5a5d"
      },
      className: "w-full rounded-xl py-4 font-bold text-base transition-colors"
    },
    loading ? "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC\u2026" : "\u062A\u0627\u06CC\u06CC\u062F \u0648 \u0648\u0631\u0648\u062F"
  ));
}
function CameraIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "13.5", r: "3.2" }));
}
function PencilIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 20h9" }), /* @__PURE__ */ React.createElement("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" }));
}
function BellIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" }), /* @__PURE__ */ React.createElement("path", { d: "M10 20a2 2 0 0 0 4 0" }));
}
const PLAN_DISPLAY = {
  none: { label: "\u0628\u0631\u0646\u0632\u06CC", color: "#CD7F32" },
  silver: { label: "\u0646\u0642\u0631\u0647\u200C\u0627\u06CC", color: "#C0C0C0" },
  gold: { label: "\u0637\u0644\u0627\u06CC\u06CC", color: "#E8B33D" }
};
function ProfileScreen({ sessionsCount, badgeUnlocked, progressPercent, practiceMinutes, profileName, profileImage, onNameChange, onImageChange, nextLesson, reminder, onSetReminder, plan, planExpiresAt, accountContact }) {
  const planInfo = PLAN_DISPLAY[plan] || PLAN_DISPLAY.none;
  const hasPaidPlan = plan === "silver" || plan === "gold";
  const daysLeft = hasPaidPlan && planExpiresAt ? Math.max(0, Math.ceil((planExpiresAt - Date.now()) / 864e5)) : null;
  const BOXER_LEVELS = ["\u0645\u0628\u062A\u062F\u06CC", "\u0645\u062A\u0648\u0633\u0637", "\u062D\u0631\u0641\u0647\u200C\u0627\u06CC"];
  const chaptersCompleted = [badgeUnlocked == null ? void 0 : badgeUnlocked.basic, badgeUnlocked == null ? void 0 : badgeUnlocked.advanced, badgeUnlocked == null ? void 0 : badgeUnlocked.extra].filter(Boolean).length;
  const boxerLevel = BOXER_LEVELS[Math.min(chaptersCompleted, BOXER_LEVELS.length - 1)];
  const stats = [
    { label: "\u062C\u0644\u0633\u0647 \u062A\u0645\u0631\u06CC\u0646", value: String(sessionsCount != null ? sessionsCount : 0) },
    { label: "\u062A\u0627\u06CC\u0645\u060C \u062A\u0645\u0631\u06CC\u0646 \u06A9\u0631\u062F\u0646", value: `${practiceMinutes != null ? practiceMinutes : 0} \u062F\u0642\u06CC\u0642\u0647` },
    { label: "\u0633\u0637\u062D \u0628\u0648\u06A9\u0633\u0648\u0631", value: boxerLevel }
  ];
  const badges = [
    { name: "\u06AF\u0627\u0631\u062F \u0637\u0644\u0627\u06CC\u06CC", image: BADGE1_SRC, unlocked: Boolean(badgeUnlocked == null ? void 0 : badgeUnlocked.basic) },
    { name: "\u062F\u0633\u062A\u06A9\u0634 \u0637\u0644\u0627\u06CC\u06CC", image: BADGE2_SRC, unlocked: Boolean(badgeUnlocked == null ? void 0 : badgeUnlocked.advanced) },
    { name: "\u0631\u06CC\u0646\u06AF \u0637\u0644\u0627\u06CC\u06CC", image: BADGE3_SRC, unlocked: Boolean(badgeUnlocked == null ? void 0 : badgeUnlocked.extra) },
    { name: "\u0645\u0628\u0627\u0631\u0632 \u062A\u06A9\u0646\u06CC\u06A9\u06CC", image: BADGE4_SRC, unlocked: Boolean(badgeUnlocked == null ? void 0 : badgeUnlocked.fight) },
    { name: "\u0622\u0645\u0627\u062F\u0647 \u0642\u0647\u0631\u0645\u0627\u0646\u06CC", image: BADGE5_SRC, unlocked: Boolean(badgeUnlocked == null ? void 0 : badgeUnlocked.partner) },
    { name: "\u0628\u0648\u06A9\u0633\u0648\u0631 \u062C\u0647\u0627\u0646\u06CC", image: BADGE6_SRC, unlocked: Boolean(badgeUnlocked == null ? void 0 : badgeUnlocked.focus) }
  ];
  const fileRef = useRef(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(profileName || "");
  const nextSessionTitle = nextLesson ? nextLesson.title : "\u0645\u0631\u0648\u0631 \u062A\u0645\u0631\u06CC\u0646\u200C\u0647\u0627\u06CC \u0642\u0628\u0644\u06CC";
  const reminderTime = (reminder == null ? void 0 : reminder.time) || "18:00";
  const reminderEnabled = Boolean(reminder == null ? void 0 : reminder.enabled);
  const reminderDayWord = nextReminderDate(reminderTime).getDate() === (/* @__PURE__ */ new Date()).getDate() ? "\u0627\u0645\u0631\u0648\u0632" : "\u0641\u0631\u062F\u0627";
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timeDraft, setTimeDraft] = useState(reminderTime);
  const handleSetReminder = async () => {
    const status = await (onSetReminder == null ? void 0 : onSetReminder(timeDraft));
    if (status === "denied") {
      alert("\u0628\u0631\u0627\u06CC \u0641\u0639\u0627\u0644 \u06A9\u0631\u062F\u0646 \u06CC\u0627\u062F\u0622\u0648\u0631\u060C \u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u0646\u0648\u062A\u06CC\u0641\u06CC\u06A9\u06CC\u0634\u0646 \u0631\u0648 \u0627\u0632 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u06AF\u0648\u0634\u06CC \u0628\u062F\u06CC\u062F.");
      return;
    }
    setShowTimePicker(false);
  };
  const displayName = profileName || "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC";
  const initial = displayName.trim().charAt(0) || "\u061F";
  const [photoBusy, setPhotoBusy] = useState(false);
  const handlePickPhoto = () => {
    var _a2;
    if (!photoBusy) (_a2 = fileRef.current) == null ? void 0 : _a2.click();
  };
  const handlePhotoFile = async (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    e.target.value = "";
    if (!file || photoBusy) return;
    setPhotoBusy(true);
    try {
      onImageChange(await makeAvatarDataUrl(file));
    } catch (err) {
      alert(
        err.message === "PHOTO_TOO_LARGE" ? "\u062D\u062C\u0645 \u0627\u06CC\u0646 \u0639\u06A9\u0633 \u062E\u06CC\u0644\u06CC \u0632\u06CC\u0627\u062F\u0647. \u06CC\u0647 \u0639\u06A9\u0633 \u06A9\u0645\u200C\u062D\u062C\u0645\u200C\u062A\u0631 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646." : "\u0627\u06CC\u0646 \u0639\u06A9\u0633 \u0642\u0627\u0628\u0644 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0646\u06CC\u0633\u062A. \u06CC\u0647 \u0639\u06A9\u0633 \u062F\u06CC\u06AF\u0647 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646."
      );
    } finally {
      setPhotoBusy(false);
    }
  };
  const startEditName = () => {
    setNameDraft(displayName === "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC" ? "" : displayName);
    setIsEditingName(true);
  };
  const saveName = () => {
    const cleaned = sanitizeUserText(nameDraft, 40);
    if (cleaned) onNameChange(cleaned);
    setIsEditingName(false);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto px-5 pt-2 pb-6", dir: "rtl" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-6" }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-sm" }, "\u067E\u0631\u0648\u0641\u0627\u06CC\u0644 \u062D\u0631\u0641\u0647\u200C\u0627\u06CC"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Oswald, sans-serif", color: "#E8B33D" }, className: "text-xs font-semibold tracking-wider" }, "PRO"), /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 rounded-full", style: { background: "#E8B33D" } }))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center mb-6" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "relative w-28 h-28 rounded-full flex items-center justify-center mb-4",
      style: {
        background: "conic-gradient(from 90deg, #E8B33D, #D91E2B, #E8B33D)",
        padding: "3px"
      }
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "w-full h-full rounded-full flex items-center justify-center text-3xl font-black overflow-hidden",
        style: { background: "#17161A", color: "#F3EEE6", fontFamily: "Oswald, sans-serif" }
      },
      profileImage ? /* @__PURE__ */ React.createElement("img", { src: profileImage, alt: displayName, className: "w-full h-full object-cover" }) : initial
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: handlePickPhoto,
        className: "absolute rounded-full flex items-center justify-center",
        style: {
          width: "30px",
          height: "30px",
          background: "#D91E2B",
          border: "2px solid #0B0B0D",
          bottom: "2px",
          left: "2px"
        }
      },
      /* @__PURE__ */ React.createElement(CameraIcon, { className: "w-4 h-4", style: { color: "#F3EEE6" } })
    ),
    /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", onChange: handlePhotoFile, className: "hidden" })
  ), isEditingName ? /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      autoFocus: true,
      value: nameDraft,
      onChange: (e) => setNameDraft(e.target.value),
      onKeyDown: (e) => e.key === "Enter" && saveName(),
      placeholder: "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC",
      maxLength: 40,
      style: {
        fontFamily: "Vazirmatn, sans-serif",
        color: "#F3EEE6",
        background: "#17161A",
        border: "1px solid #D91E2B"
      },
      className: "text-lg font-bold text-center rounded-lg px-3 py-1.5 outline-none"
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: saveName,
      style: { fontFamily: "Vazirmatn, sans-serif", color: "#E8B33D" },
      className: "text-xs font-bold"
    },
    "\u062B\u0628\u062A"
  )) : /* @__PURE__ */ React.createElement("button", { onClick: startEditName, className: "flex items-center gap-1.5 mb-1" }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-xl font-black" }, displayName), /* @__PURE__ */ React.createElement(PencilIcon, { className: "w-3.5 h-3.5", style: { color: "#55535a" } })), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-xs" }, "\u0645\u0631\u0628\u06CC: \u06CC\u0632\u062F\u0627\u0646 \u0646\u0627\u0635\u0631\u06CC \u06AF\u0647\u0631 \xB7 \u0628\u0627\u0634\u06AF\u0627\u0647 \u0622\u0646\u0644\u0627\u06CC\u0646")), /* @__PURE__ */ React.createElement("div", { "data-testid": "account-info", className: "rounded-2xl mb-6 overflow-hidden", style: { background: "#17161A", border: "1px solid #232227" } }, [
    {
      key: "plan",
      label: "\u0627\u0634\u062A\u0631\u0627\u06A9 \u0641\u0639\u0644\u06CC",
      value: /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-2 font-bold", style: { color: planInfo.color } }, /* @__PURE__ */ React.createElement("span", { className: "inline-block rounded-full", style: { width: "9px", height: "9px", background: planInfo.color, boxShadow: `0 0 8px ${planInfo.color}` } }), planInfo.label)
    },
    {
      key: "account",
      label: "\u0634\u0645\u0627\u0631\u0647 \u062D\u0633\u0627\u0628",
      value: /* @__PURE__ */ React.createElement("span", { dir: "ltr", style: { fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em", color: "#F3EEE6" } }, accountContact || "\u2014")
    },
    {
      key: "expiry",
      label: "\u0627\u0639\u062A\u0628\u0627\u0631 \u0627\u0634\u062A\u0631\u0627\u06A9",
      value: hasPaidPlan && planExpiresAt ? /* @__PURE__ */ React.createElement("span", { className: "flex flex-col items-end", style: { color: "#F3EEE6" } }, /* @__PURE__ */ React.createElement("span", null, formatExpiryDate(planExpiresAt)), /* @__PURE__ */ React.createElement("span", { style: { color: daysLeft <= 14 ? "#D91E2B" : "#8A8790", fontSize: "11px" } }, daysLeft.toLocaleString("fa-IR"), " \u0631\u0648\u0632 \u0645\u0627\u0646\u062F\u0647")) : /* @__PURE__ */ React.createElement("span", { style: { color: "#8A8790" } }, "\u0627\u0634\u062A\u0631\u0627\u06A9 \u0641\u0639\u0627\u0644 \u0646\u062F\u0627\u0631\u06CC")
    }
  ].map((row, i) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: row.key,
      "data-testid": `account-row-${row.key}`,
      className: "flex items-center justify-between px-4 py-3",
      style: { borderTop: i === 0 ? "none" : "1px solid #232227", fontFamily: "Vazirmatn, sans-serif", fontSize: "13px" }
    },
    /* @__PURE__ */ React.createElement("span", { style: { color: "#8A8790" } }, row.label),
    row.value
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-2 mb-6" }, stats.map((s) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: s.label,
      className: "rounded-xl py-3 px-2 text-center border",
      style: { background: "#17161A", borderColor: "#232227" }
    },
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Oswald, sans-serif", color: "#E8B33D" }, className: "text-xl font-bold mb-0.5" }, s.value),
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790", fontSize: "10px" }, className: "leading-4" }, s.label)
  ))), /* @__PURE__ */ React.createElement(RopeDivider, null), /* @__PURE__ */ React.createElement("div", { className: "mb-6 mt-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-2" }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-sm font-bold" }, "\u0633\u0637\u062D: ", boxerLevel), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Oswald, sans-serif", color: "#8A8790" }, className: "text-xs" }, progressPercent, "%")), /* @__PURE__ */ React.createElement("div", { className: "h-2.5 rounded-full overflow-hidden", style: { background: "#232227" } }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "h-full rounded-full",
      style: { width: `${progressPercent}%`, background: "linear-gradient(90deg,#D91E2B,#E8B33D)" }
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-sm font-bold mb-3" }, "\u0646\u0634\u0627\u0646\u200C\u0647\u0627\u06CC \u0627\u0641\u062A\u062E\u0627\u0631"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-3" }, badges.map((b) => {
    const Icon = b.icon;
    return /* @__PURE__ */ React.createElement("div", { key: b.name, className: "flex flex-col items-center gap-2" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "w-14 h-14 rounded-full flex items-center justify-center overflow-hidden",
        style: {
          background: b.unlocked ? "conic-gradient(from 90deg, #E8B33D, #D91E2B, #E8B33D)" : "#17161A",
          padding: b.unlocked ? "2.5px" : "0",
          boxShadow: b.unlocked ? "0 0 14px rgba(232,179,61,0.5)" : "none",
          border: b.unlocked ? "none" : "1px solid #2a292e"
        }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "w-full h-full rounded-full flex items-center justify-center overflow-hidden",
          style: { background: b.image ? "#000" : b.unlocked ? "#17161A" : "transparent" }
        },
        b.image ? /* @__PURE__ */ React.createElement(
          "img",
          {
            src: b.image,
            alt: b.name,
            className: "w-full h-full object-cover",
            style: { filter: b.unlocked ? "none" : "grayscale(1) brightness(0.5)" }
          }
        ) : /* @__PURE__ */ React.createElement(Icon, { className: "w-6 h-6", style: { color: b.unlocked ? "#E8B33D" : "#3a393e" } })
      )
    ), /* @__PURE__ */ React.createElement(
      "span",
      {
        style: {
          fontFamily: "Vazirmatn, sans-serif",
          color: b.unlocked ? "#DAD6CE" : "#55535a",
          fontSize: "10px"
        },
        className: "text-center leading-3"
      },
      b.name
    ));
  }))), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "rounded-2xl p-4",
      style: { background: "linear-gradient(135deg,#2a1013,#17161A)", border: "1px solid rgba(217,30,43,0.35)" }
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#E8B33D" }, className: "text-xs font-bold mb-1" }, "\u062C\u0644\u0633\u0647 \u0628\u0639\u062F\u06CC"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-sm font-bold" }, nextSessionTitle), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-xs mt-1" }, reminderDayWord, " \xB7 ", reminderTime)), /* @__PURE__ */ React.createElement("img", { src: SPLASH_LOGO_SRC, alt: "NASERI", className: "w-11 h-11 object-contain shrink-0" })),
    /* @__PURE__ */ React.createElement("div", { className: "mt-3 pt-3", style: { borderTop: "1px solid rgba(217,30,43,0.2)" } }, showTimePicker ? /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "time",
        value: timeDraft,
        onChange: (e) => setTimeDraft(e.target.value),
        style: {
          fontFamily: "Oswald, sans-serif",
          background: "#17161A",
          color: "#F3EEE6",
          border: "1px solid #2a292e"
        },
        className: "rounded-lg px-2 py-1.5 text-sm outline-none flex-1",
        dir: "ltr"
      }
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: handleSetReminder,
        style: { fontFamily: "Vazirmatn, sans-serif", background: "#D91E2B", color: "#F3EEE6" },
        className: "rounded-lg px-3 py-1.5 text-xs font-bold"
      },
      "\u062A\u0646\u0638\u06CC\u0645"
    )) : /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setTimeDraft(reminderTime);
          setShowTimePicker(true);
        },
        className: "flex items-center gap-1.5"
      },
      /* @__PURE__ */ React.createElement(BellIcon, { className: "w-4 h-4", style: { color: reminderEnabled ? "#E8B33D" : "#8A8790" } }),
      /* @__PURE__ */ React.createElement(
        "span",
        {
          style: {
            fontFamily: "Vazirmatn, sans-serif",
            color: reminderEnabled ? "#E8B33D" : "#8A8790"
          },
          className: "text-xs"
        },
        reminderEnabled ? `\u06CC\u0627\u062F\u0622\u0648\u0631 \u0628\u0631\u0627\u06CC \u0633\u0627\u0639\u062A ${reminderTime} \u0641\u0639\u0627\u0644\u0647` : "\u062A\u0646\u0638\u06CC\u0645 \u06CC\u0627\u062F\u0622\u0648\u0631"
      )
    ))
  ));
}
function ChapterVisibilityToggle({ visible, onToggle }) {
  const [saving, setSaving] = useState(false);
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: async (e) => {
        e.stopPropagation();
        setSaving(true);
        try {
          await onToggle(!visible);
        } finally {
          setSaving(false);
        }
      },
      disabled: saving,
      className: "absolute top-2 left-2 z-10 flex items-center gap-1.5 rounded-full px-2.5 py-1",
      style: {
        fontFamily: "Vazirmatn, sans-serif",
        background: visible ? "rgba(34,197,94,0.15)" : "rgba(217,30,43,0.15)",
        border: `1px solid ${visible ? "rgba(34,197,94,0.5)" : "rgba(217,30,43,0.5)"}`,
        color: visible ? "#22c55e" : "#D91E2B"
      }
    },
    /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold" }, saving ? "..." : visible ? "\u0639\u0645\u0648\u0645\u06CC \u2713" : "\u0641\u0642\u0637 \u0627\u062F\u0645\u06CC\u0646")
  );
}
function TrainingWindow({ title, onClick, image, locked, comingSoon }) {
  const isBlocked = locked || comingSoon;
  return /* @__PURE__ */ React.createElement("div", { className: "w-full" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2 px-0.5" }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-base font-black" }, title)), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: comingSoon ? void 0 : onClick,
      className: "relative w-full rounded-2xl overflow-hidden border block active:scale-95 transition-transform",
      style: {
        borderColor: "rgba(95,211,232,0.45)",
        background: "#141317",
        aspectRatio: "16 / 9",
        cursor: comingSoon ? "default" : "pointer",
        boxShadow: "0 0 24px rgba(95,211,232,0.3), inset 0 0 18px rgba(95,211,232,0.06)"
      }
    },
    image ? /* @__PURE__ */ React.createElement("img", { src: image, alt: title, className: "absolute inset-0 w-full h-full object-contain" }) : /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "absolute inset-0",
        style: {
          backgroundImage: "repeating-linear-gradient(135deg, transparent 0 16px, rgba(217,30,43,0.06) 16px 17px, transparent 17px 33px)"
        }
      }
    ),
    image && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "absolute inset-0",
        style: { background: "linear-gradient(to top, rgba(11,11,13,0.75) 0%, rgba(11,11,13,0.1) 55%, transparent 100%)" }
      }
    ),
    isBlocked && /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0", style: { background: "rgba(0,0,0,0.55)" } }),
    /* @__PURE__ */ React.createElement("div", { className: "absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg", style: { borderColor: "#D91E2B" } }),
    /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg", style: { borderColor: "#E8B33D" } }),
    isBlocked && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "absolute top-3 left-3 rounded-full flex items-center justify-center",
        style: { width: "26px", height: "26px", background: "rgba(0,0,0,0.6)", border: "1px solid #2a292e" }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: "13px", lineHeight: 1 } }, "\u{1F512}")
    ),
    comingSoon ? /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-1" }, /* @__PURE__ */ React.createElement(
      "span",
      {
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", textShadow: "0 1px 4px rgba(0,0,0,0.8)" },
        className: "text-xs font-bold"
      },
      "\u0628\u0647\u200C\u0632\u0648\u062F\u06CC"
    ), /* @__PURE__ */ React.createElement(
      "span",
      {
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790", textShadow: "0 1px 4px rgba(0,0,0,0.8)" },
        className: "text-xs"
      },
      "\u062F\u0631 \u062D\u0627\u0644 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC \u0645\u062D\u062A\u0648\u0627"
    )) : locked ? /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-1" }, /* @__PURE__ */ React.createElement(
      "span",
      {
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", textShadow: "0 1px 4px rgba(0,0,0,0.8)" },
        className: "text-xs font-bold"
      },
      "\u0646\u06CC\u0627\u0632\u0645\u0646\u062F \u0627\u0634\u062A\u0631\u0627\u06A9"
    ), /* @__PURE__ */ React.createElement(
      "span",
      {
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#E8B33D", textShadow: "0 1px 4px rgba(0,0,0,0.8)" },
        className: "text-xs"
      },
      "\u062E\u0631\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9 \u2039"
    )) : image ? null : /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-2" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "w-11 h-11 rounded-full flex items-center justify-center",
        style: { background: "rgba(217,30,43,0.12)", border: "1px solid rgba(217,30,43,0.4)" }
      },
      /* @__PURE__ */ React.createElement(GloveIcon, { className: "w-5 h-5", style: { color: "#D91E2B" } })
    ))
  ));
}
function ComingSoonBox({ title, subtitle }) {
  return /* @__PURE__ */ React.createElement("div", { className: "w-full" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2 px-0.5" }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-base font-black" }, title), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#55535a", fontSize: "11px" } }, subtitle)), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "relative w-full rounded-2xl overflow-hidden border flex items-center justify-center",
      style: { borderColor: "#232227", background: "#141317", aspectRatio: "16 / 9" }
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "absolute inset-0",
        style: {
          backgroundImage: "repeating-linear-gradient(135deg, transparent 0 16px, rgba(255,255,255,0.03) 16px 17px, transparent 17px 33px)"
        }
      }
    ),
    /* @__PURE__ */ React.createElement(
      "span",
      {
        style: { fontFamily: "Oswald, sans-serif", color: "#3a393e", letterSpacing: "0.1em" },
        className: "relative text-sm font-bold"
      },
      "\u0628\u0647\u200C\u0632\u0648\u062F\u06CC"
    ),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "absolute top-3 right-3 rounded-full flex items-center justify-center",
        style: { width: "26px", height: "26px", background: "rgba(0,0,0,0.55)", border: "1px solid #2a292e" }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: "13px", lineHeight: 1 } }, "\u{1F512}")
    )
  ));
}
function MenuIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 6h16M4 12h16M4 18h16" }));
}
function CloseIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M6 6l12 12M18 6L6 18" }));
}
function LogoutIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M15 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" }), /* @__PURE__ */ React.createElement("path", { d: "M10 17l5-5-5-5" }), /* @__PURE__ */ React.createElement("path", { d: "M15 12H3" }));
}
function TipIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 18h6M10 21h4" }), /* @__PURE__ */ React.createElement("path", { d: "M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6h5.4c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3z" }));
}
function InfoIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M12 11v6M12 8v.01" }));
}
function QuestionIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M9.5 9a2.5 2.5 0 0 1 4.8 1c0 1.5-2.3 1.8-2.3 3.3" }), /* @__PURE__ */ React.createElement("path", { d: "M12 17v.01" }));
}
function SupportIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 12a8 8 0 1 1-3.2-6.4" }), /* @__PURE__ */ React.createElement("path", { d: "M21 4v5h-5" }), /* @__PURE__ */ React.createElement("path", { d: "M8 12h8M8 15h5" }));
}
function CoachIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "7", r: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" }), /* @__PURE__ */ React.createElement("path", { d: "M16 4.5c1.2.4 2 1.5 2 2.8s-.8 2.4-2 2.8M19 20c0-2.8-1.8-5-4-5.8" }));
}
function InviteIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "18", cy: "5", r: "2.5" }), /* @__PURE__ */ React.createElement("circle", { cx: "6", cy: "12", r: "2.5" }), /* @__PURE__ */ React.createElement("circle", { cx: "18", cy: "19", r: "2.5" }), /* @__PURE__ */ React.createElement("path", { d: "M8.2 10.8 15.8 6.2M8.2 13.2l7.6 4.6" }));
}
function LockIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "5", y: "11", width: "14", height: "9", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M8 11V7a4 4 0 0 1 8 0v4" }));
}
const CUP_SRC = "assets/cup.jpg";
const WALLBAG_SRC = "assets/wallbag.jpg";
const SPRINGBAG_SRC = "assets/springbag.jpg";
const GEAR_ITEMS = [
  { text: "\u062F\u0633\u062A\u06A9\u0634 \u0628\u0648\u06A9\u0633 (\u062A\u0645\u0631\u06CC\u0646\u06CC \u0648 \u0645\u0633\u0627\u0628\u0642\u0647\u200C\u0627\u06CC)", image: GLOVES_SRC },
  { text: "\u0628\u0627\u0646\u062F\u0627\u0698 / \u062F\u0633\u062A\u0628\u0646\u062F \u0628\u0648\u06A9\u0633", image: WRAPS_SRC },
  { text: "\u06A9\u0644\u0627\u0647 \u0622\u062A\u0644\u200C\u062F\u0627\u0631", image: HELMET_SRC },
  { text: "\u0644\u062B\u0647\u200C\u0628\u0646\u062F", image: MOUTHGUARD_SRC },
  { text: "\u06A9\u06CC\u0633\u0647 \u0628\u0648\u06A9\u0633 \u0633\u0646\u06AF\u06CC\u0646 \u0648 \u0633\u0628\u06A9", image: BAG_SRC },
  { text: "\u0637\u0646\u0627\u0628 \u0648\u0631\u0632\u0634\u06CC", image: ROPE_SRC },
  { text: "\u06A9\u0641\u0634 \u0645\u062E\u0635\u0648\u0635 \u0628\u0648\u06A9\u0633", image: BOOTS_SRC },
  { text: "\u0647\u062F\u0628\u0627\u0644", image: HEADBALL_SRC },
  { text: "\u062F\u0645\u0628\u0644 \u0633\u0628\u06A9", image: DUMBBELL_SRC },
  { text: "\u06A9\u0627\u067E \u0628\u06CC\u0636\u0647\u200C\u0628\u0646\u062F \u0628\u0648\u06A9\u0633", image: CUP_SRC },
  { text: "\u06AF\u0644\u0627\u0628\u06CC \u062F\u06CC\u0648\u0627\u0631\u06CC", image: WALLBAG_SRC },
  { text: "\u06A9\u06CC\u0633\u0647 \u06AF\u0644\u0627\u0628\u06CC \u0641\u0646\u0631\u06CC", image: SPRINGBAG_SRC }
];
const TIPS_ITEMS = [
  "\u0647\u0631 \u062A\u0645\u0631\u06CC\u0646 \u0631\u0648 \u062A\u0648\u06CC \u06CC\u06A9 \u062C\u0644\u0633\u0647 \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u0647",
  "\u0647\u0631 \u062A\u0645\u0631\u06CC\u0646 \u0631\u0648 \u0686\u0646\u062F \u0628\u0627\u0631 \u0628\u0628\u06CC\u0646 \u062A\u0627 \u06A9\u0627\u0645\u0644 \u0645\u062A\u0648\u062C\u0647 \u0646\u06A9\u0627\u062A \u0631\u06CC\u0632 \u0628\u0634\u06CC",
  "\u0645\u0631\u062D\u0644\u0647 \u0628\u0647 \u0645\u0631\u062D\u0644\u0647 \u067E\u06CC\u0634 \u0628\u0631\u0648\u060C \u062A\u0631\u062A\u06CC\u0628 \u0622\u0645\u0648\u0632\u0634\u200C\u0647\u0627 \u0627\u0635\u0644\u06CC\u200C\u062A\u0631\u06CC\u0646 \u0646\u06A9\u062A\u0647\u200C\u06CC \u0622\u0645\u0648\u0632\u0634\u0647",
  "\u0645\u06CC\u200C\u062A\u0648\u0646\u06CC \u0628\u0627 \u06CC\u0647 \u062D\u0631\u06CC\u0641 \u0647\u0645\u200C\u0642\u062F \u0648 \u0647\u0645\u200C\u0633\u0646 \u062E\u0648\u062F\u062A \u062A\u0645\u0631\u06CC\u0646\u200C\u0647\u0627 \u0631\u0648 \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u06CC",
  "\u062D\u062A\u0645\u0627\u064B \u062A\u0648\u06CC \u06CC\u0647 \u0628\u0627\u0634\u06AF\u0627\u0647 \u0628\u0648\u06A9\u0633 \u062A\u0648\u06CC \u0634\u0647\u0631 \u062E\u0648\u062F\u062A \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u06A9\u0646\u060C \u0686\u0648\u0646 \u0627\u06CC\u0646 \u062A\u0645\u0631\u06CC\u0646\u0627\u062A \u0646\u06CC\u0627\u0632 \u0628\u0647 \u0646\u0638\u0631 \u0645\u0631\u0628\u06CC \u062D\u0631\u0641\u0647\u200C\u0627\u06CC \u0647\u0645 \u062F\u0627\u0631\u0646",
  "\u062D\u062A\u0645\u0627\u064B \u0647\u0645\u06CC\u0634\u0647 \u0648 \u0647\u0631 \u0647\u0641\u062A\u0647\u060C \u062A\u0645\u0631\u06CC\u0646\u0627\u062A \u0647\u0641\u062A\u0647\u200C\u06CC \u06AF\u0630\u0634\u062A\u0647\u200C\u06CC \u062E\u0648\u062F\u062A \u0631\u0648 \u0645\u0631\u0648\u0631 \u06A9\u0646",
  "\u0647\u0645\u06CC\u0634\u0647 \u0642\u0628\u0644 \u0627\u0632 \u062A\u0645\u0631\u06CC\u0646 \u0628\u062F\u0646\u062A \u0631\u0648 \u06AF\u0631\u0645 \u06A9\u0646",
  "\u06AF\u0627\u0631\u062F \u0631\u0648 \u0647\u06CC\u0686\u200C\u0648\u0642\u062A \u067E\u0627\u06CC\u06CC\u0646 \u0646\u06CC\u0627\u0631",
  "\u0631\u0648\u06CC \u062A\u0646\u0641\u0633 \u062F\u0631\u0633\u062A \u062D\u06CC\u0646 \u0636\u0631\u0628\u0647 \u062A\u0645\u0631\u06A9\u0632 \u06A9\u0646",
  "\u0641\u0648\u062A\u200C\u0648\u0631\u06A9 \u0631\u0648 \u062C\u062F\u06CC \u0628\u06AF\u06CC\u0631\u060C \u0646\u0647 \u0641\u0642\u0637 \u062F\u0633\u062A\u200C\u0647\u0627",
  "\u0628\u0639\u062F \u0627\u0632 \u0647\u0631 \u062C\u0644\u0633\u0647\u060C \u0627\u0633\u062A\u0631\u0627\u062D\u062A \u0648 \u0631\u06CC\u06A9\u0627\u0648\u0631\u06CC \u06A9\u0627\u0641\u06CC \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634",
  "\u062D\u062A\u0645\u0627\u064B \u0648\u06CC\u062F\u06CC\u0648\u0647\u0627\u06CC \u0645\u0633\u0627\u0628\u0642\u0627\u062A \u0628\u0648\u06A9\u0633 \u0622\u0645\u0627\u062A\u0648\u0631 \u0648 \u062D\u0631\u0641\u0647\u200C\u0627\u06CC \u0631\u0648 \u0628\u0628\u06CC\u0646 \u062A\u0627 \u0630\u0647\u0646 \u067E\u0648\u06CC\u0627\u06CC\u06CC\u062A \u0641\u0639\u0627\u0644 \u0628\u0634\u0647 \u0648 \u0628\u062F\u0648\u0646\u06CC \u062F\u0627\u0631\u06CC \u0686\u06CC\u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u06CC",
  "\u062D\u062A\u0645\u0627\u064B \u062A\u0645\u0631\u06CC\u0646\u0627\u062A \u0647\u0648\u0627\u0632\u06CC \u0648 \u06A9\u0631\u0627\u0633\u0641\u06CC\u062A \u0631\u0648 \u0647\u0645\u0631\u0627\u0647 \u0628\u0627 \u0622\u0645\u0648\u0632\u0634\u200C\u0647\u0627 \u0647\u0641\u062A\u0647\u200C\u0627\u06CC \u062F\u0648 \u0628\u0627\u0631 \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u0647 \u062A\u0627 \u0628\u0647 \u06CC\u0647 \u0628\u0648\u06A9\u0633\u0648\u0631 \u062D\u0631\u0641\u0647\u200C\u0627\u06CC \u062A\u0628\u062F\u06CC\u0644 \u0628\u0634\u06CC"
];
const ABOUT_TEXT = "\u0645\u0646 \u06CC\u0632\u062F\u0627\u0646 \u0646\u0627\u0635\u0631\u06CC\u200C\u0627\u0645\u061B \u0645\u0631\u0628\u06CC \u0631\u0633\u0645\u06CC \u0641\u062F\u0631\u0627\u0633\u06CC\u0648\u0646 \u0628\u0648\u06A9\u0633 \u0622\u0645\u0627\u062A\u0648\u0631\u060C \u06A9\u0633\u06CC \u06A9\u0647 \u0633\u0627\u0644\u200C\u0647\u0627 \u0631\u0627\u0647 \u0628\u0648\u06A9\u0633 \u062D\u0631\u0641\u0647\u200C\u0627\u06CC \u0631\u0648 \u062A\u0648\u06CC \u0686\u06CC\u0646 \u0648 \u0627\u0631\u0645\u0646\u0633\u062A\u0627\u0646 \u062F\u0646\u0628\u0627\u0644 \u06A9\u0631\u062F \u062A\u0627 \u0628\u0641\u0647\u0645\u0647 \u0627\u0648\u0646\u200C\u0637\u0631\u0641 \u062F\u0646\u06CC\u0627 \u0627\u06CC\u0646 \u0648\u0631\u0632\u0634 \u0631\u0648 \u0686\u0637\u0648\u0631 \u062C\u062F\u06CC \u0645\u06CC\u200C\u06AF\u06CC\u0631\u0646.\n\n\u0647\u0645\u0647\u200C\u06CC \u062A\u0644\u0627\u0634\u0645 \u0627\u06CC\u0646 \u0628\u0648\u062F \u06A9\u0647 \u06CC\u0647 \u062F\u0648\u0631\u0647\u200C\u06CC \u0622\u0645\u0648\u0632\u0634\u06CC \u0628\u0633\u0627\u0632\u0645 \u06A9\u0647 \u062F\u06CC\u06AF\u0647 \u0628\u0647\u0648\u0646\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u0634 \u0646\u0645\u0648\u0646\u0647\u061B \u0646\u0647 \u0627\u0646\u062F\u0627\u0645 \u062E\u0627\u0635 \u0645\u06CC\u200C\u062E\u0648\u0627\u062F\u060C \u0646\u0647 \u0633\u0646 \u0645\u0634\u062E\u0635\u060C \u0646\u0647 \u0642\u062F\u0631\u062A \u0628\u062F\u0646\u06CC \u0641\u0648\u0642\u200C\u0627\u0644\u0639\u0627\u062F\u0647. \u0641\u0642\u0637 \u0628\u0627\u06CC\u062F \u0645\u062B\u0644 \u06CC\u0647 \u06A9\u0644\u0627\u0633 \u062F\u0631\u0633\u060C \u0642\u062F\u0645\u200C\u0628\u0647\u200C\u0642\u062F\u0645 \u067E\u06CC\u0634 \u0628\u0631\u06CC.\n\n\u0628\u0631\u0627\u06CC \u0631\u0633\u06CC\u062F\u0646 \u0628\u0647 \u0627\u06CC\u0646 \u0646\u0642\u0637\u0647\u060C \u062F\u0647\u200C\u0647\u0627 \u0633\u0627\u0639\u062A \u0648\u06CC\u062F\u06CC\u0648\u06CC \u0645\u0628\u0627\u0631\u0632\u0627\u062A \u0645\u0627\u06CC\u06A9 \u062A\u0627\u06CC\u0633\u0648\u0646\u060C \u0645\u062D\u0645\u062F \u0639\u0644\u06CC \u06A9\u0644\u06CC \u0648 \u062E\u06CC\u0644\u06CC \u0627\u0632 \u0628\u0648\u06A9\u0633\u0648\u0631\u0647\u0627\u06CC \u0628\u0632\u0631\u06AF \u062A\u0627\u0631\u06CC\u062E \u0631\u0648 \u062A\u062D\u0644\u06CC\u0644 \u06A9\u0631\u062F\u0645\u061B \u0647\u0631 \u0645\u0628\u0627\u0631\u0632\u0647 \u06CC\u0647 \u0646\u06A9\u062A\u0647\u200C\u06CC \u0637\u0644\u0627\u06CC\u06CC \u062F\u0627\u0634\u062A. \u0627\u06CC\u0646 \u0646\u06A9\u062A\u0647\u200C\u0647\u0627 \u0631\u0648 \u0628\u0631\u062F\u0645 \u062A\u0648\u06CC \u0628\u0627\u0634\u06AF\u0627\u0647 \u062E\u0648\u062F\u0645\u060C \u0631\u0648\u06CC \u0634\u0627\u06AF\u0631\u062F\u0627\u06CC\u06CC \u0628\u0627 \u0647\u0631 \u0633\u0646 \u0648 \u0634\u0631\u0627\u06CC\u0637\u06CC \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0631\u062F\u0645\u060C \u062A\u0627 \u0648\u0642\u062A\u06CC \u0628\u0647 \u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u0631\u0633\u06CC\u062F\u0645 \u06A9\u0647 \u0648\u0627\u0642\u0639\u0627\u064B \u062C\u0648\u0627\u0628 \u0645\u06CC\u200C\u062F\u0647.\n\n\u062D\u0627\u0644\u0627 \u0627\u06CC\u0646 \u0627\u067E \u0628\u0627 \u06F6 \u0641\u0635\u0644 \u06A9\u0627\u0645\u0644 (\u0622\u0645\u0648\u0632\u0634 \u067E\u0627\u06CC\u0647 \u06AF\u0627\u0631\u062F\u060C \u0636\u0631\u0628\u0627\u062A\u060C \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u060C \u0647\u0646\u0631 \u0645\u0628\u0627\u0631\u0632\u0647\u060C \u0627\u0633\u067E\u0627\u0631\u06CC\u0646\u06AF / \u062A\u0645\u0631\u06CC\u0646 \u0645\u0628\u0627\u0631\u0632\u0647\u060C \u0648 \u062A\u0645\u0631\u06CC\u0646\u0627\u062A \u062A\u062E\u0635\u0635\u06CC \u062A\u0645\u0631\u06A9\u0632 \u0648 \u0633\u0631\u0639\u062A) \u062F\u0631\u0648\u0627\u0632\u0647\u200C\u06CC \u0648\u0631\u0648\u062F\u062A \u0628\u0647 \u062F\u0646\u06CC\u0627\u06CC \u0628\u0648\u06A9\u0633\u0647 \u2014 \u0627\u0632 \u0627\u0648\u0644\u06CC\u0646 \u0642\u062F\u0645 \u062A\u0627 \u0622\u0645\u0627\u062F\u0647 \u0634\u062F\u0646 \u0628\u0631\u0627\u06CC \u0631\u06CC\u0646\u06AF.\n\n\u0622\u0631\u0632\u0648\u06CC \u0645\u0648\u0641\u0642\u06CC\u062A \u062F\u0627\u0631\u0645 \u0628\u0631\u0627\u06CC \u0647\u0645\u0647\u200C\u06CC \u0647\u0645\u200C\u0648\u0637\u0646\u0627\u0645. \u0628\u06CC\u0627 \u0628\u0627 \u0647\u0645 \u0634\u0631\u0648\u0639 \u06A9\u0646\u06CC\u0645.";
const FAQ_ITEMS = [
  {
    q: "\u0622\u0645\u0648\u0632\u0634\u200C\u0647\u0627 \u0686\u0631\u0627 \u062A\u0648\u06CC \u0633\u0647 \u0641\u0635\u0644 \u0647\u0633\u062A\u0646\u061F",
    a: "\u0686\u0648\u0646 \u06CC\u0627\u062F\u06AF\u06CC\u0631\u06CC \u0628\u0648\u06A9\u0633 \u0645\u0631\u062D\u0644\u0647\u200C\u0628\u0647\u200C\u0645\u0631\u062D\u0644\u0647\u200C\u0633\u062A: \u0641\u0635\u0644 \u0627\u0648\u0644 \u067E\u0627\u06CC\u0647\u200C\u0647\u0627 \u0631\u0648 \u0645\u06CC\u200C\u0633\u0627\u0632\u0647\u060C \u0641\u0635\u0644 \u062F\u0648\u0645 \u062A\u06A9\u0646\u06CC\u06A9\u200C\u0647\u0627 \u0631\u0648 \u062D\u0631\u0641\u0647\u200C\u0627\u06CC\u200C\u062A\u0631 \u0645\u06CC\u200C\u06A9\u0646\u0647\u060C \u0648 \u0641\u0635\u0644 \u0633\u0648\u0645 \u0631\u0648\u06CC \u0646\u06A9\u0627\u062A \u0648\u06CC\u0698\u0647 \u0648 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC \u0628\u0631\u0627\u06CC \u0645\u0628\u0627\u0631\u0632\u0647 \u062A\u0645\u0631\u06A9\u0632 \u062F\u0627\u0631\u0647. \u0631\u0639\u0627\u06CC\u062A \u0627\u06CC\u0646 \u062A\u0631\u062A\u06CC\u0628 \u0645\u0647\u0645\u200C\u062A\u0631\u06CC\u0646 \u0646\u06A9\u062A\u0647\u200C\u06CC \u0622\u0645\u0648\u0632\u0634\u06CC\u0647."
  },
  {
    q: "\u0686\u0631\u0627 \u0628\u0627\u06CC\u062F \u0631\u0648\u0632\u0627\u0646\u0647 \u06CC\u06A9 \u062A\u0645\u0631\u06CC\u0646 \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u0645\u061F",
    a: "\u0686\u0648\u0646 \u0628\u062F\u0646 \u0648 \u0630\u0647\u0646 \u0628\u0627 \u062A\u06A9\u0631\u0627\u0631 \u0645\u0646\u0638\u0645 \u06CC\u0627\u062F \u0645\u06CC\u200C\u06AF\u06CC\u0631\u0647\u060C \u0646\u0647 \u0628\u0627 \u062D\u062C\u0645 \u0632\u06CC\u0627\u062F \u0648 \u0646\u0627\u0645\u0646\u0638\u0645. \u06CC\u06A9 \u062C\u0644\u0633\u0647\u200C\u06CC \u0631\u0648\u0632\u0627\u0646\u0647 \u0628\u0627\u0639\u062B \u0645\u06CC\u200C\u0634\u0647 \u062D\u0631\u06A9\u0627\u062A \u062A\u0648\u06CC \u062D\u0627\u0641\u0638\u0647\u200C\u06CC \u0639\u0636\u0644\u0627\u0646\u06CC\u200C\u062A \u062C\u0627 \u0628\u06CC\u0641\u062A\u0647 \u0648 \u067E\u06CC\u0634\u0631\u0641\u062A\u062A \u067E\u06CC\u0648\u0633\u062A\u0647 \u0628\u0627\u0634\u0647."
  },
  {
    q: "\u062A\u0648\u06CC \u0686\u0646\u062F \u0645\u0627\u0647 \u0646\u062A\u06CC\u062C\u0647 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u0645\u061F",
    a: "\u0627\u06AF\u0647 \u0645\u0646\u0638\u0645 \u0648 \u0637\u0628\u0642 \u062A\u0631\u062A\u06CC\u0628 \u062C\u0644\u0633\u0627\u062A \u067E\u06CC\u0634 \u0628\u0631\u06CC\u060C \u0645\u0639\u0645\u0648\u0644\u0627\u064B \u0628\u06CC\u0646 \u06F3 \u062A\u0627 \u06F4 \u0645\u0627\u0647 \u062A\u063A\u06CC\u06CC\u0631 \u0645\u062D\u0633\u0648\u0633\u06CC \u062A\u0648\u06CC \u062A\u06A9\u0646\u06CC\u06A9\u060C \u0641\u0631\u0645 \u0628\u062F\u0646\u06CC \u0648 \u0627\u0639\u062A\u0645\u0627\u062F\u0628\u0647\u200C\u0646\u0641\u0633\u062A \u0645\u06CC\u200C\u0628\u06CC\u0646\u06CC. \u0633\u0631\u0639\u062A \u067E\u06CC\u0634\u0631\u0641\u062A \u0628\u0647 \u062A\u062F\u0627\u0648\u0645 \u062A\u0645\u0631\u06CC\u0646\u062A \u0628\u0633\u062A\u06AF\u06CC \u062F\u0627\u0631\u0647."
  },
  {
    q: "\u0628\u0639\u062F \u0627\u0632 \u06CC\u0627\u062F\u06AF\u06CC\u0631\u06CC \u0686\u06CC\u06A9\u0627\u0631 \u06A9\u0646\u0645\u061F",
    a: "\u0628\u0639\u062F \u0627\u0632 \u062A\u06A9\u0645\u06CC\u0644 \u0647\u0631 \u0633\u0647 \u0641\u0635\u0644\u060C \u062D\u062A\u0645\u0627\u064B \u062A\u0648\u06CC \u06CC\u0647 \u0628\u0627\u0634\u06AF\u0627\u0647 \u0628\u0648\u06A9\u0633 \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u06A9\u0646\u060C \u0632\u06CC\u0631 \u0646\u0638\u0631 \u06CC\u0647 \u0645\u0631\u0628\u06CC \u062D\u0631\u0641\u0647\u200C\u0627\u06CC \u062A\u0645\u0631\u06CC\u0646 \u0627\u0633\u067E\u0627\u0631\u06CC\u0646\u06AF (\u0645\u0628\u0627\u0631\u0632\u0647\u200C\u06CC \u06A9\u0646\u062A\u0631\u0644\u200C\u0634\u062F\u0647) \u0631\u0648 \u0634\u0631\u0648\u0639 \u06A9\u0646 \u0648 \u062F\u0631 \u0635\u0648\u0631\u062A \u0639\u0644\u0627\u0642\u0647\u060C \u0628\u0631\u0627\u06CC \u0645\u0633\u0627\u0628\u0642\u0627\u062A \u0622\u0645\u0627\u062A\u0648\u0631 \u0627\u0642\u062F\u0627\u0645 \u06A9\u0646."
  },
  {
    q: "\u0647\u0645\u0631\u0627\u0647 \u0622\u0645\u0648\u0632\u0634\u200C\u0647\u0627 \u0686\u0647 \u0648\u0631\u0632\u0634\u200C\u0647\u0627\u06CC\u06CC \u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u0645\u061F",
    a: "\u062A\u0645\u0631\u06CC\u0646\u0627\u062A \u0647\u0648\u0627\u0632\u06CC \u0648 \u06A9\u0631\u0627\u0633\u0641\u06CC\u062A \u0631\u0648 \u0647\u0641\u062A\u0647\u200C\u0627\u06CC \u062F\u0648 \u0628\u0627\u0631 \u0647\u0645\u0631\u0627\u0647 \u0622\u0645\u0648\u0632\u0634\u200C\u0647\u0627 \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u0647. \u0627\u06CC\u0646 \u062A\u0631\u06A9\u06CC\u0628 \u0627\u0633\u062A\u0642\u0627\u0645\u062A\u060C \u0633\u0631\u0639\u062A \u0648 \u0642\u062F\u0631\u062A \u0644\u0627\u0632\u0645 \u0628\u0631\u0627\u06CC \u062A\u0628\u062F\u06CC\u0644 \u0634\u062F\u0646 \u0628\u0647 \u06CC\u0647 \u0628\u0648\u06A9\u0633\u0648\u0631 \u062D\u0631\u0641\u0647\u200C\u0627\u06CC \u0631\u0648 \u0628\u0647\u062A \u0645\u06CC\u200C\u062F\u0647."
  },
  {
    q: "\u0622\u06CC\u0627 \u0641\u0635\u0644\u200C\u0647\u0627\u06CC \u062F\u06CC\u06AF\u0647\u200C\u0627\u06CC \u0627\u0636\u0627\u0641\u0647 \u0645\u06CC\u200C\u0634\u0647\u061F",
    a: "\u0628\u0644\u0647\u060C \u0641\u0635\u0644\u200C\u0647\u0627\u06CC \u062A\u06A9\u0646\u06CC\u06A9\u200C\u0647\u0627\u06CC \u062A\u062E\u0635\u0635\u06CC \u0628\u0648\u06A9\u0633\u060C \u0627\u0633\u067E\u0627\u0631\u06CC\u0646\u06AF / \u062A\u0645\u0631\u06CC\u0646 \u0645\u0628\u0627\u0631\u0632\u0647 \u0648 \u0642\u0627\u0644\u0628 \u0627\u0633\u062A\u0627\u06CC\u0644 / \u0645\u0628\u0627\u0631\u0632\u0647 \u0628\u0647\u200C\u062A\u062F\u0631\u06CC\u062C \u0628\u0647 \u0627\u067E \u0627\u0636\u0627\u0641\u0647 \u0645\u06CC\u200C\u0634\u0646 \u062A\u0627 \u0645\u0633\u06CC\u0631 \u06CC\u0627\u062F\u06AF\u06CC\u0631\u06CC\u062A \u0627\u0632 \u067E\u0627\u06CC\u0647 \u062A\u0627 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC \u06A9\u0627\u0645\u0644 \u0628\u0631\u0627\u06CC \u0631\u06CC\u0646\u06AF\u060C \u0628\u062F\u0648\u0646 \u0648\u0642\u0641\u0647 \u0627\u062F\u0627\u0645\u0647 \u067E\u06CC\u062F\u0627 \u06A9\u0646\u0647."
  },
  {
    q: "\u0628\u0627 \u0627\u06CC\u0646 \u062A\u0645\u0631\u06CC\u0646\u0627 \u062A\u0627 \u0686\u0647 \u062D\u062F \u067E\u06CC\u0634 \u0645\u06CC\u200C\u0631\u0645\u061F",
    a: "\u0627\u06AF\u0647 \u0641\u0635\u0644\u200C\u0647\u0627 \u0631\u0648 \u0628\u0647\u200C\u062A\u0631\u062A\u06CC\u0628 \u0648 \u0645\u0646\u0638\u0645 \u062F\u0646\u0628\u0627\u0644 \u06A9\u0646\u06CC\u060C \u0627\u0632 \u06CC\u0647 \u0645\u0628\u062A\u062F\u06CC \u06A9\u0627\u0645\u0644 \u0628\u0647 \u06CC\u0647 \u0628\u0648\u06A9\u0633\u0648\u0631 \u0628\u0627 \u062A\u06A9\u0646\u06CC\u06A9\u060C \u0641\u0631\u0645 \u0628\u062F\u0646\u06CC \u0648 \u0622\u0645\u0627\u062F\u06AF\u06CC \u0630\u0647\u0646\u06CC \u062F\u0631 \u062D\u062F \u0648\u0631\u0648\u062F \u0628\u0647 \u062A\u0645\u0631\u06CC\u0646 \u0627\u0633\u067E\u0627\u0631\u06CC\u0646\u06AF \u0648 \u0645\u0633\u0627\u0628\u0642\u0627\u062A \u0622\u0645\u0627\u062A\u0648\u0631 \u0645\u06CC\u200C\u0631\u0633\u06CC."
  },
  {
    q: "\u0627\u06AF\u0647 \u0645\u0634\u06A9\u0644 \u062A\u0648 \u062A\u0645\u0631\u06CC\u0646 \u062F\u0627\u0634\u062A\u0645 \u0686\u06CC\u06A9\u0627\u0631 \u06A9\u0646\u0645\u061F",
    a: "\u062C\u0648\u0627\u0628\u062A\u0648 \u062A\u0648\u06CC \u06A9\u0645\u06A9\u200C\u0647\u0627\u06CC \u0622\u0645\u0627\u062F\u0647\u200C\u06CC \u06AF\u0632\u06CC\u0646\u0647\u200C\u06CC \xAB\u0645\u0631\u0628\u06CC \u06A9\u0645\u06A9\u06CC\xBB \u067E\u06CC\u062F\u0627 \u0645\u06CC\u200C\u06A9\u0646\u06CC."
  },
  {
    q: "\u0686\u0637\u0648\u0631 \u06A9\u0627\u0631\u06CC \u06A9\u0646\u0645 \u062A\u0645\u0631\u06CC\u0646\u0627\u06CC \u0642\u0628\u0644\u06CC \u06CC\u0627\u062F\u0645 \u0646\u0631\u0647\u061F",
    a: "\u0637\u0628\u0642 \u0646\u06A9\u0627\u062A \u06A9\u0644\u06CC\u062F\u06CC\u060C \u0647\u0631 \u0647\u0641\u062A\u0647 \u062D\u062A\u0645\u0627\u064B \u062A\u0645\u0631\u06CC\u0646\u0627\u062A \u0647\u0641\u062A\u0647\u200C\u06CC \u0642\u0628\u0644 \u0631\u0648 \u0645\u0631\u0648\u0631 \u06A9\u0646. \u0645\u0631\u0648\u0631 \u0645\u0646\u0638\u0645 \u0628\u0627\u0639\u062B \u0645\u06CC\u200C\u0634\u0647 \u062D\u0631\u06A9\u0627\u062A \u062A\u0648\u06CC \u062D\u0627\u0641\u0638\u0647\u200C\u06CC \u0639\u0636\u0644\u0627\u0646\u06CC\u200C\u062A \u062B\u0627\u0628\u062A \u0628\u0645\u0648\u0646\u0647 \u0648 \u0641\u0631\u0627\u0645\u0648\u0634 \u0646\u0634\u0647."
  },
  {
    q: "\u0622\u06CC\u0627 \u0627\u06CC\u0646 \u062A\u0645\u0631\u06CC\u0646\u0627 \u0631\u0648 \u0641\u0631\u0627\u0645\u0648\u0634 \u0646\u0645\u06CC\u200C\u06A9\u0646\u0645\u061F",
    a: "\u062E\u06CC\u0631\u060C \u0686\u0648\u0646 \u0622\u0645\u0648\u0632\u0634 \u067E\u0644\u06A9\u0627\u0646\u06CC \u0648 \u0645\u0631\u062A\u0628\u0637\u0647\u061B \u06CC\u0639\u0646\u06CC \u0647\u0631 \u062A\u0645\u0631\u06CC\u0646 \u0628\u0639\u062F\u06CC \u0628\u0647 \u062A\u0645\u0631\u06CC\u0646 \u0642\u0628\u0644\u06CC \u0648\u0635\u0644\u0647 \u0648 \u0628\u0627\u0631\u0647\u0627 \u062A\u0648\u06CC \u062C\u0644\u0633\u0627\u062A \u0628\u0639\u062F\u06CC \u062A\u06A9\u0631\u0627\u0631 \u0645\u06CC\u200C\u0634\u0647\u060C \u067E\u0633 \u0641\u0631\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0646\u0634 \u0633\u062E\u062A\u200C\u062A\u0631 \u0645\u06CC\u200C\u0634\u0647."
  }
];
const RULES_ITEMS = [
  {
    q: "\u0647\u0631 \u0627\u06CC\u0645\u06CC\u0644 \u0641\u0642\u0637 \u0631\u0648\u06CC \u06CC\u06A9 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0641\u0639\u0627\u0644\u0647",
    a: "\u0647\u0631 \u062D\u0633\u0627\u0628 (\u0627\u06CC\u0645\u06CC\u0644) \u0641\u0642\u0637 \u0645\u06CC\u200C\u062A\u0648\u0646\u0647 \u0647\u0645\u0632\u0645\u0627\u0646 \u0631\u0648\u06CC \u06CC\u06A9 \u06AF\u0648\u0634\u06CC \u0641\u0639\u0627\u0644 \u0628\u0627\u0634\u0647. \u0627\u06AF\u0647 \u0628\u0627 \u0647\u0645\u0648\u0646 \u0627\u06CC\u0645\u06CC\u0644 \u0631\u0648\u06CC \u06AF\u0648\u0634\u06CC \u062F\u06CC\u06AF\u0647\u200C\u0627\u06CC \u0648\u0627\u0631\u062F \u0628\u0634\u06CC\u060C \u0627\u0648\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647 \u062C\u062F\u06CC\u062F \u062C\u0627\u06CC\u06AF\u0632\u06CC\u0646 \u0642\u0628\u0644\u06CC \u0645\u06CC\u200C\u0634\u0647 \u0648 \u06AF\u0648\u0634\u06CC \u0642\u0628\u0644\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u0632 \u062D\u0633\u0627\u0628 \u062E\u0627\u0631\u062C \u0645\u06CC\u200C\u0634\u0647."
  },
  {
    q: "\u06A9\u062F \u0648\u0631\u0648\u062F \u0686\u0642\u062F\u0631 \u0627\u0639\u062A\u0628\u0627\u0631 \u062F\u0627\u0631\u0647\u061F",
    a: "\u06A9\u062F \u06F4 \u0631\u0642\u0645\u06CC \u06A9\u0647 \u0628\u0647 \u0627\u06CC\u0645\u06CC\u0644\u062A \u0627\u0631\u0633\u0627\u0644 \u0645\u06CC\u200C\u0634\u0647 \u0641\u0642\u0637 \u062A\u0627 \u06F5 \u062F\u0642\u06CC\u0642\u0647 \u0645\u0639\u062A\u0628\u0631\u0647 \u0648 \u062D\u062F\u0627\u06A9\u062B\u0631 \u06F5 \u0628\u0627\u0631 \u0645\u06CC\u200C\u062A\u0648\u0646\u06CC \u0648\u0627\u0631\u062F\u0634 \u06A9\u0646\u06CC. \u0628\u0639\u062F \u0627\u0632 \u0627\u0648\u0646 \u0628\u0627\u06CC\u062F \u06CC\u0647 \u06A9\u062F \u062C\u062F\u06CC\u062F \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0628\u062F\u06CC."
  },
  {
    q: "\u0627\u0634\u062A\u0631\u0627\u06A9 VIP \u0686\u0637\u0648\u0631 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u0647\u061F",
    a: "\u0628\u0627 \u062E\u0631\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9 \u0646\u0642\u0631\u0647\u200C\u0627\u06CC \u06CC\u0627 \u0637\u0644\u0627\u06CC\u06CC (\u0647\u0631\u06A9\u062F\u0648\u0645 \u06F1,\u06F4\u06F9\u06F0,\u06F0\u06F0\u06F0 \u062A\u0648\u0645\u0627\u0646)\u060C \u0628\u0647 \u0641\u0635\u0644\u200C\u0647\u0627\u06CC \u0645\u0631\u0628\u0648\u0637 \u0628\u0647 \u0647\u0645\u0648\u0646 \u0627\u0634\u062A\u0631\u0627\u06A9 \u0628\u0647 \u0645\u062F\u062A \u06F1\u06F2 \u0645\u0627\u0647 \u0627\u0632 \u062A\u0627\u0631\u06CC\u062E \u062E\u0631\u06CC\u062F \u062F\u0633\u062A\u0631\u0633\u06CC \u067E\u06CC\u062F\u0627 \u0645\u06CC\u200C\u06A9\u0646\u06CC. \u0646\u0642\u0631\u0647\u200C\u0627\u06CC \u0641\u0635\u0644\u200C\u0647\u0627\u06CC \u067E\u0627\u06CC\u0647 (\u06AF\u0627\u0631\u062F\u060C \u0636\u0631\u0628\u0627\u062A\u060C \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC) \u0631\u0648 \u0628\u0627\u0632 \u0645\u06CC\u200C\u06A9\u0646\u0647 \u0648 \u0637\u0644\u0627\u06CC\u06CC \u0641\u0635\u0644\u200C\u0647\u0627\u06CC \u062A\u062E\u0635\u0635\u06CC (\u0627\u0633\u067E\u0627\u0631\u06CC\u0646\u06AF\u060C \u0642\u0627\u0644\u0628 \u0627\u0633\u062A\u0627\u06CC\u0644/\u0645\u0628\u0627\u0631\u0632\u0647) \u0631\u0648\u061B \u0627\u06CC\u0646 \u062F\u0648 \u062A\u0627 \u0645\u0633\u062A\u0642\u0644 \u0627\u0632 \u0647\u0645\u0646\u060C \u067E\u0633 \u0628\u0631\u0627\u06CC \u062F\u0633\u062A\u0631\u0633\u06CC \u06A9\u0627\u0645\u0644 \u0628\u0627\u06CC\u062F \u0647\u0631 \u062F\u0648 \u0631\u0648 \u062C\u062F\u0627 \u062A\u0647\u06CC\u0647 \u06A9\u0646\u06CC. \u0628\u0639\u062F \u0627\u0632 \u067E\u0627\u06CC\u0627\u0646 \u06F1\u06F2 \u0645\u0627\u0647\u060C \u0628\u0631\u0627\u06CC \u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0627\u06CC\u062F \u062A\u0645\u062F\u06CC\u062F \u06A9\u0646\u06CC."
  },
  {
    q: "\u0622\u06CC\u0627 \u0648\u062C\u0647 \u067E\u0631\u062F\u0627\u062E\u062A\u06CC \u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A\u0647\u061F",
    a: "\u0686\u0648\u0646 \u0627\u0634\u062A\u0631\u0627\u06A9 \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u062D\u062A\u0648\u0627\u06CC \u062F\u06CC\u062C\u06CC\u062A\u0627\u0644\u0647\u060C \u0648\u062C\u0647 \u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0634\u062F\u0647 \u0628\u0631\u0627\u06CC \u0628\u0627\u0632\u0647\u200C\u0627\u06CC \u06A9\u0647 \u0641\u0639\u0627\u0644 \u0628\u0648\u062F\u0647 \u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A \u0646\u06CC\u0633\u062A. \u0627\u06AF\u0647 \u062F\u0631 \u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0634\u06A9\u0644\u06CC (\u0645\u062B\u0644 \u06A9\u0633\u0631 \u0645\u0628\u0644\u063A \u0628\u062F\u0648\u0646 \u0641\u0639\u0627\u0644 \u0634\u062F\u0646 \u0627\u0634\u062A\u0631\u0627\u06A9) \u067E\u06CC\u0634 \u0627\u0648\u0645\u062F\u060C \u0627\u0632 \u0637\u0631\u06CC\u0642 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0627\u0637\u0644\u0627\u0639 \u0628\u062F\u0647 \u062A\u0627 \u0628\u0631\u0631\u0633\u06CC \u0628\u0634\u0647."
  },
  {
    q: "\u0627\u0637\u0644\u0627\u0639\u0627\u062A\u0645 \u06A9\u062C\u0627 \u0646\u06AF\u0647\u062F\u0627\u0631\u06CC \u0645\u06CC\u200C\u0634\u0647\u061F",
    a: "\u0641\u0642\u0637 \u0627\u06CC\u0645\u06CC\u0644\u060C \u0648\u0636\u0639\u06CC\u062A \u0627\u0634\u062A\u0631\u0627\u06A9\u060C \u0648 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0641\u0639\u0627\u0644\u062A \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0647. \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u067E\u0631\u062F\u0627\u062E\u062A \u0648 \u06A9\u0627\u0631\u062A \u0628\u0627\u0646\u06A9\u06CC \u0647\u06CC\u0686\u200C\u0648\u0642\u062A \u0631\u0648\u06CC \u0633\u0631\u0648\u0631 \u0645\u0627 \u0630\u062E\u06CC\u0631\u0647 \u0646\u0645\u06CC\u200C\u0634\u0647\u061B \u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0647\u0627 \u0645\u0633\u062A\u0642\u06CC\u0645 \u0648 \u0627\u0645\u0646 \u062A\u0648\u0633\u0637 \u062F\u0631\u06AF\u0627\u0647 \u0628\u0627\u0646\u06A9\u06CC (\u0632\u0631\u06CC\u0646\u200C\u067E\u0627\u0644) \u067E\u0631\u062F\u0627\u0632\u0634 \u0645\u06CC\u200C\u0634\u0646."
  },
  {
    q: "\u0622\u06CC\u0627 \u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u0648\u06CC\u062F\u06CC\u0648\u0647\u0627 \u0631\u0648 \u062F\u0627\u0646\u0644\u0648\u062F \u06CC\u0627 \u0628\u0627\u0632\u0646\u0634\u0631 \u06A9\u0646\u0645\u061F",
    a: "\u0646\u0647. \u0645\u062D\u062A\u0648\u0627\u06CC \u0622\u0645\u0648\u0632\u0634\u06CC \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u06CC \u0634\u062E\u0635\u06CC \u062F\u0627\u062E\u0644 \u0647\u0645\u06CC\u0646 \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646\u0647. \u062F\u0627\u0646\u0644\u0648\u062F\u060C \u0636\u0628\u0637\u060C \u06CC\u0627 \u0628\u0627\u0632\u0646\u0634\u0631 \u0648\u06CC\u062F\u06CC\u0648\u0647\u0627 \u062F\u0631 \u062C\u0627\u06CC \u062F\u06CC\u06AF\u0647 (\u0645\u062B\u0644 \u06A9\u0627\u0646\u0627\u0644\u200C\u0647\u0627 \u0648 \u0634\u0628\u06A9\u0647\u200C\u0647\u0627\u06CC \u0627\u062C\u062A\u0645\u0627\u0639\u06CC) \u0645\u062C\u0627\u0632 \u0646\u06CC\u0633\u062A."
  },
  {
    q: "\u0622\u06CC\u0627 \u0627\u06CC\u0646 \u0642\u0648\u0627\u0646\u06CC\u0646 \u0645\u0645\u06A9\u0646\u0647 \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0646\u0647\u061F",
    a: "\u0628\u0644\u0647\u060C \u0645\u0645\u06A9\u0646\u0647 \u0628\u0627 \u0627\u0636\u0627\u0641\u0647 \u0634\u062F\u0646 \u0627\u0645\u06A9\u0627\u0646\u0627\u062A \u062C\u062F\u06CC\u062F \u0628\u0647 \u0627\u067E\u060C \u0627\u06CC\u0646 \u0642\u0648\u0627\u0646\u06CC\u0646 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0628\u0634\u0646. \u0647\u0631 \u062A\u063A\u06CC\u06CC\u0631 \u0645\u0647\u0645 \u0627\u0632 \u0647\u0645\u06CC\u0646 \u0628\u062E\u0634 \u0642\u0627\u0628\u0644 \u0645\u0634\u0627\u0647\u062F\u0647 \u062E\u0648\u0627\u0647\u062F \u0628\u0648\u062F."
  }
];
const COACH_ITEMS = [
  {
    q: "\u0645\u0646 \u0646\u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u062A\u0648\u06CC \u06AF\u0627\u0631\u062F \u062F\u0631\u0633\u062A \u0648\u0627\u06CC\u0633\u0645!",
    a: "\u062C\u0644\u0648\u06CC \u0622\u06CC\u0646\u0647 \u062A\u0645\u0631\u06CC\u0646 \u06A9\u0646: \u067E\u0627\u0647\u0627 \u0628\u0647 \u0627\u0646\u062F\u0627\u0632\u0647\u200C\u06CC \u0639\u0631\u0636 \u0634\u0648\u0646\u0647 \u0628\u0627\u0632\u060C \u0648\u0632\u0646 \u0628\u062F\u0646 \u0631\u0648\u06CC \u0647\u0631 \u062F\u0648 \u067E\u0627 \u0645\u0633\u0627\u0648\u06CC\u060C \u0648 \u062F\u0633\u062A\u200C\u0647\u0627 \u0628\u0627\u0644\u0627 \u06A9\u0646\u0627\u0631 \u0686\u0648\u0646\u0647. \u062F\u0648\u0628\u0627\u0631\u0647 \u062C\u0644\u0633\u0647\u200C\u06CC \xAB\u0627\u06CC\u0633\u062A\u0627\u062F\u0646 \u062F\u0631 \u06AF\u0627\u0631\u062F \u067E\u0627\u06CC\u0647\xBB \u0631\u0648 \u0628\u0628\u06CC\u0646 \u0648 \u062D\u0631\u06A9\u062A \u0631\u0648 \u0622\u0647\u0633\u062A\u0647 \u062A\u06A9\u0631\u0627\u0631 \u06A9\u0646."
  },
  {
    q: "\u0645\u0646 \u0646\u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u062A\u0648\u06CC \u06AF\u0627\u0631\u062F \u062F\u0631\u0633\u062A \u0628\u0647 \u062C\u0647\u062A\u200C\u0647\u0627 \u062C\u0627\u0628\u062C\u0627 \u0628\u0634\u0645!",
    a: "\u0642\u062F\u0645\u200C\u0647\u0627 \u0631\u0648 \u06A9\u0648\u0686\u06CC\u06A9 \u0628\u0631\u062F\u0627\u0631 \u0648 \u0647\u06CC\u0686\u200C\u0648\u0642\u062A \u067E\u0627\u0647\u0627\u062A \u0631\u0648 \u0627\u0632 \u0647\u0645 \u0631\u062F \u0646\u06A9\u0646. \u0627\u0648\u0644 \u0628\u062F\u0648\u0646 \u062F\u0633\u062A\u200C\u06A9\u0634 \u0641\u0642\u0637 \u0631\u0648\u06CC \u0641\u0648\u062A\u200C\u0648\u0631\u06A9 \u062A\u0645\u0631\u06A9\u0632 \u06A9\u0646\u060C \u0628\u0639\u062F \u06AF\u0627\u0631\u062F \u0631\u0648 \u0647\u0645 \u0627\u0636\u0627\u0641\u0647 \u06A9\u0646."
  },
  {
    q: "\u0645\u0646 \u0646\u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u0642\u0634\u0646\u06AF \u0634\u0648\u0646\u0647\u200C\u0647\u0627\u0645\u0648 \u0628\u0686\u0631\u062E\u0648\u0646\u0645!",
    a: "\u0686\u0631\u062E\u0634 \u0634\u0648\u0646\u0647 \u0631\u0648 \u0627\u0648\u0644 \u062E\u06CC\u0644\u06CC \u0622\u0631\u0648\u0645 \u0648 \u0628\u062F\u0648\u0646 \u0645\u0634\u062A \u0632\u062F\u0646 \u062A\u0645\u0631\u06CC\u0646 \u06A9\u0646. \u062D\u0648\u0627\u0633\u062A \u0628\u0627\u0634\u0647 \u0686\u0631\u062E\u0634 \u0627\u0632 \u06A9\u0645\u0631 \u0634\u0631\u0648\u0639 \u0628\u0634\u0647\u060C \u0646\u0647 \u0641\u0642\u0637 \u0627\u0632 \u062F\u0633\u062A."
  },
  {
    q: "\u0645\u0646 \u062A\u0648\u06CC \u062D\u0631\u06A9\u062A \u0628\u0627 \u0686\u0631\u062E\u0634 \u0634\u0627\u0646\u0647 \u0645\u0634\u06A9\u0644 \u062F\u0627\u0631\u0645!",
    a: "\u0641\u0648\u062A\u200C\u0648\u0631\u06A9 \u0648 \u0686\u0631\u062E\u0634 \u0634\u0648\u0646\u0647 \u0631\u0648 \u062C\u062F\u0627 \u062C\u062F\u0627 \u062A\u0645\u0631\u06CC\u0646 \u06A9\u0646 \u062A\u0627 \u0647\u0631\u06A9\u062F\u0648\u0645 \u0631\u0648\u0648\u0646 \u0628\u0634\u0647\u060C \u0628\u0639\u062F \u062F\u0648\u062A\u0627\u0634\u0648\u0646 \u0631\u0648 \u0628\u0627 \u0633\u0631\u0639\u062A \u06A9\u0645 \u062A\u0631\u06A9\u06CC\u0628 \u06A9\u0646."
  },
  {
    q: "\u0645\u0646 \u062D\u0631\u06A9\u0627\u062A \u0642\u0628\u0644\u06CC \u0631\u0648 \u0641\u0631\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0645!",
    a: "\u0637\u0628\u0642 \u0646\u06A9\u0627\u062A \u06A9\u0644\u06CC\u062F\u06CC\u060C \u0647\u0631 \u0647\u0641\u062A\u0647 \u062A\u0645\u0631\u06CC\u0646\u0627\u06CC \u0647\u0641\u062A\u0647\u200C\u06CC \u0642\u0628\u0644 \u0631\u0648 \u0645\u0631\u0648\u0631 \u06A9\u0646. \u0628\u0631\u06AF\u0631\u062F \u0628\u0647 \u0647\u0645\u0648\u0646 \u062C\u0644\u0633\u0647 \u062A\u0648\u06CC \u0628\u0631\u0646\u0627\u0645\u0647 \u0648 \u0686\u0646\u062F\u0628\u0627\u0631 \u062F\u06CC\u06AF\u0647 \u0628\u0628\u06CC\u0646\u0634."
  },
  {
    q: "\u0645\u0646 \u0646\u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u0633\u0631\u0645 \u0631\u0648 \u0628\u0627 \u0686\u0631\u062E\u0634 \u062B\u0627\u0628\u062A \u0646\u06AF\u0647 \u062F\u0627\u0631\u0645!",
    a: "\u062C\u0644\u0648\u06CC \u0622\u06CC\u0646\u0647 \u06CC\u0647 \u0646\u0642\u0637\u0647 \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646 \u0648 \u062D\u06CC\u0646 \u0686\u0631\u062E\u0634 \u0634\u0648\u0646\u0647\u060C \u0646\u06AF\u0627\u0647\u062A \u0631\u0648 \u062B\u0627\u0628\u062A \u0631\u0648\u06CC \u0647\u0645\u0648\u0646 \u0646\u0642\u0637\u0647 \u0646\u06AF\u0647 \u062F\u0627\u0631 \u062A\u0627 \u0633\u0631\u062A \u06A9\u0645\u062A\u0631 \u062A\u06A9\u0648\u0646 \u0628\u062E\u0648\u0631\u0647."
  },
  {
    q: "\u0645\u0646 \u06AF\u0627\u0631\u062F\u0645 \u0631\u0648 \u062A\u0648\u06CC \u062D\u0631\u06A9\u0627\u062A \u062E\u0631\u0627\u0628 \u0645\u06CC\u200C\u06A9\u0646\u0645!",
    a: "\u0633\u0631\u0639\u062A \u062D\u0631\u06A9\u062A \u0631\u0648 \u06A9\u0645 \u06A9\u0646. \u0628\u0639\u062F \u0627\u0632 \u0647\u0631 \u0636\u0631\u0628\u0647 \u06CC\u0627 \u0686\u0631\u062E\u0634\u060C \u0622\u06AF\u0627\u0647\u0627\u0646\u0647 \u0628\u0647 \u06AF\u0627\u0631\u062F \u0627\u0648\u0644\u06CC\u0647 \u0628\u0631\u06AF\u0631\u062F\u061B \u0627\u06CC\u0646 \u0628\u0631\u06AF\u0634\u062A \u0628\u0627\u06CC\u062F \u0645\u062B\u0644 \u062E\u0648\u062F \u0636\u0631\u0628\u0647 \u062A\u0645\u0631\u06CC\u0646 \u0628\u0634\u0647."
  },
  {
    q: "\u0645\u0646 \u0646\u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u067E\u0627\u0647\u0627\u0645\u0648 \u0628\u0627 \u0634\u0627\u0646\u0647 \u0628\u0686\u0631\u062E\u0648\u0646\u0645!",
    a: "\u0647\u0645\u0627\u0647\u0646\u06AF\u06CC \u067E\u0627 \u0648 \u0634\u0648\u0646\u0647 \u0646\u06CC\u0627\u0632 \u0628\u0647 \u062A\u0645\u0631\u06CC\u0646 \u062C\u062F\u0627 \u062F\u0627\u0631\u0647. \u0627\u0648\u0644 \u0641\u0642\u0637 \u0686\u0631\u062E\u0634 \u067E\u0627\u060C \u0628\u0639\u062F \u0641\u0642\u0637 \u0686\u0631\u062E\u0634 \u0634\u0648\u0646\u0647\u060C \u062F\u0631 \u0622\u062E\u0631 \u0647\u0631 \u062F\u0648 \u0631\u0648 \u0628\u0627 \u0633\u0631\u0639\u062A \u062E\u06CC\u0644\u06CC \u06A9\u0645 \u0628\u0627 \u0647\u0645 \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u0647."
  },
  {
    q: "\u0648\u0642\u062A\u06CC \u062C\u0627\u0628\u062C\u0627 \u0645\u06CC\u200C\u0634\u0645 \u0628\u0627\u06CC\u062F \u0686\u0642\u062F \u067E\u0627\u0645 \u0628\u0686\u0631\u062E\u0647!",
    a: "\u0686\u0631\u062E\u0634 \u067E\u0627 \u0645\u0639\u0645\u0648\u0644\u0627\u064B \u06A9\u0648\u0686\u06CC\u06A9 \u0648 \u06A9\u0646\u062A\u0631\u0644\u200C\u0634\u062F\u0647\u200C\u0633\u062A\u060C \u0646\u0647 \u0632\u06CC\u0627\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u0648\u06CC\u062F\u06CC\u0648\u06CC \u0647\u0645\u0648\u0646 \u062C\u0644\u0633\u0647 \u0631\u0648 \u0628\u0628\u06CC\u0646 \u0648 \u0632\u0627\u0648\u06CC\u0647\u200C\u06CC \u0686\u0631\u062E\u0634 \u067E\u0627\u06CC \u0645\u0631\u0628\u06CC \u0631\u0648 \u062F\u0642\u06CC\u0642 \u0646\u06AF\u0627\u0647 \u06A9\u0646."
  },
  {
    q: "\u0645\u0646 \u0646\u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u062F\u0633\u062A\u0627\u0645\u0648 \u062A\u0648\u06CC \u06AF\u0627\u0631\u062F \u0645\u0633\u062A\u0642\u0631 \u06A9\u0646\u0645!",
    a: "\u062F\u0633\u062A\u200C\u0647\u0627 \u0628\u0627\u06CC\u062F \u0646\u0632\u062F\u06CC\u06A9 \u0635\u0648\u0631\u062A \u0648 \u0686\u0648\u0646\u0647 \u0628\u0627\u0634\u0646 \u0648 \u0622\u0631\u0646\u062C\u200C\u0647\u0627 \u0686\u0633\u0628\u06CC\u062F\u0647 \u0628\u0647 \u0628\u062F\u0646. \u0686\u0646\u062F \u062F\u0642\u06CC\u0642\u0647 \u0641\u0642\u0637 \u0646\u06AF\u0647\u200C\u062F\u0627\u0634\u062A\u0646 \u06AF\u0627\u0631\u062F \u062C\u0644\u0648\u06CC \u0622\u06CC\u0646\u0647 \u0631\u0648 \u062A\u0645\u0631\u06CC\u0646 \u06A9\u0646 \u062A\u0627 \u0627\u06CC\u0646 \u062D\u0627\u0644\u062A \u0639\u0627\u062F\u06CC \u0628\u0634\u0647."
  },
  {
    q: "\u0645\u0646 \u0636\u0631\u0628\u0647\u200C\u0647\u0627\u0631\u0648 \u062F\u0631\u0633\u062A \u0627\u062C\u0631\u0627 \u0646\u0645\u06CC\u200C\u06A9\u0646\u0645!",
    a: "\u0633\u0631\u0639\u062A \u0631\u0648 \u0641\u0631\u0627\u0645\u0648\u0634 \u06A9\u0646\u060C \u0627\u0648\u0644 \u0641\u0631\u0645 \u062F\u0631\u0633\u062A \u0628\u0633\u0627\u0632. \u062C\u0644\u0648\u06CC \u0622\u06CC\u0646\u0647 \u0647\u0631 \u0636\u0631\u0628\u0647 \u0631\u0648 \u062E\u06CC\u0644\u06CC \u0622\u0631\u0648\u0645 \u0648 \u06A9\u0627\u0645\u0644 \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u0647 \u062A\u0627 \u0645\u0633\u06CC\u0631 \u062F\u0631\u0633\u062A \u062F\u0633\u062A \u0648 \u0686\u0631\u062E\u0634 \u0628\u062F\u0646 \u062C\u0627 \u0628\u06CC\u0641\u062A\u0647\u060C \u0628\u0639\u062F \u06A9\u0645\u200C\u06A9\u0645 \u0633\u0631\u0639\u062A \u0628\u06AF\u06CC\u0631."
  },
  {
    q: "\u0645\u0646 \u0646\u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u0636\u0631\u0628\u0647\u200C\u0647\u0627\u0631\u0648 \u062F\u0631\u0633\u062A \u0628\u0647 \u0647\u0645 \u0628\u0686\u0633\u0628\u0648\u0646\u0645!",
    a: "\u0627\u0648\u0644 \u0647\u0631 \u0636\u0631\u0628\u0647 \u0631\u0648 \u062A\u0646\u0647\u0627 \u0648 \u062A\u06A9\u200C\u062A\u06A9 \u062A\u0645\u0631\u06CC\u0646 \u06A9\u0646 \u062A\u0627 \u0631\u0648\u0648\u0646 \u0628\u0634\u0647. \u0628\u0639\u062F \u0641\u0642\u0637 \u062F\u0648 \u0636\u0631\u0628\u0647 \u0631\u0648 \u0628\u0627 \u0641\u0627\u0635\u0644\u0647\u200C\u06CC \u0632\u0645\u0627\u0646\u06CC \u06A9\u0645 \u0628\u0647\u200C\u0647\u0645 \u0648\u0635\u0644 \u06A9\u0646\u060C \u0648\u0642\u062A\u06CC \u0627\u06CC\u0646 \u062C\u0627 \u0627\u0641\u062A\u0627\u062F \u062A\u0631\u06A9\u06CC\u0628\u200C\u0647\u0627\u06CC \u0628\u0632\u0631\u06AF\u200C\u062A\u0631 \u0631\u0648 \u0627\u0636\u0627\u0641\u0647 \u06A9\u0646."
  },
  {
    q: "\u0645\u0646 \u0646\u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u062F\u0631\u0633\u062A \u0628\u0627 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u0636\u0631\u0628\u0647 \u0628\u0632\u0646\u0645!",
    a: "\u0641\u0648\u062A\u200C\u0648\u0631\u06A9 \u0648 \u0636\u0631\u0628\u0647 \u0631\u0648 \u062C\u062F\u0627 \u062C\u062F\u0627 \u062A\u0645\u0631\u06CC\u0646 \u06A9\u0646. \u0627\u0648\u0644 \u0641\u0642\u0637 \u062C\u0627\u0628\u062C\u0627 \u0634\u0648 \u0628\u062F\u0648\u0646 \u0645\u0634\u062A \u0632\u062F\u0646\u060C \u0628\u0639\u062F \u0641\u0642\u0637 \u0636\u0631\u0628\u0647 \u0628\u0632\u0646 \u0628\u062F\u0648\u0646 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u060C \u062F\u0631 \u0622\u062E\u0631 \u0628\u0627 \u0633\u0631\u0639\u062A \u062E\u06CC\u0644\u06CC \u06A9\u0645 \u0647\u0631 \u062F\u0648 \u0631\u0648 \u0628\u0627 \u0647\u0645 \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u0647."
  },
  {
    q: "\u0645\u0646 \u062A\u0648\u06CC \u0647\u0648\u06A9 \u0645\u0634\u06A9\u0644 \u062F\u0627\u0631\u0645!",
    a: "\u0642\u062F\u0631\u062A \u0647\u0648\u06A9 \u0627\u0632 \u0686\u0631\u062E\u0634 \u06A9\u0645\u0631 \u0648 \u0644\u06AF\u0646 \u0645\u06CC\u0627\u062F\u060C \u0646\u0647 \u0641\u0642\u0637 \u062F\u0633\u062A. \u0622\u0631\u0646\u062C\u062A \u0631\u0648 \u0632\u0627\u0648\u06CC\u0647\u200C\u06CC \u062B\u0627\u0628\u062A (\u062A\u0642\u0631\u06CC\u0628\u0627\u064B \u06F9\u06F0 \u062F\u0631\u062C\u0647) \u0646\u06AF\u0647 \u062F\u0627\u0631 \u0648 \u0628\u0630\u0627\u0631 \u0686\u0631\u062E\u0634 \u0628\u062F\u0646 \u062F\u0633\u062A\u062A \u0631\u0648 \u0628\u0627 \u062E\u0648\u062F\u0634 \u0628\u06CC\u0627\u0631\u0647."
  },
  {
    q: "\u0645\u0646 \u062A\u0648\u06CC \u0622\u067E\u0631\u06A9\u0627\u062A \u0645\u0634\u06A9\u0644 \u062F\u0627\u0631\u0645!",
    a: "\u06A9\u0645\u06CC \u0632\u0627\u0646\u0648 \u062E\u0645 \u06A9\u0646 \u0648 \u0636\u0631\u0628\u0647 \u0631\u0648 \u0627\u0632 \u067E\u0627 \u0648 \u0644\u06AF\u0646 \u0628\u0647 \u0633\u0645\u062A \u0628\u0627\u0644\u0627 \u0647\u0644 \u0628\u062F\u0647\u060C \u0646\u0647 \u0627\u06CC\u0646\u200C\u06A9\u0647 \u0641\u0642\u0637 \u062F\u0633\u062A\u062A \u0631\u0648 \u0628\u0627\u0644\u0627 \u0628\u06CC\u0627\u0631\u06CC. \u0641\u0627\u0635\u0644\u0647\u200C\u06CC \u06A9\u0648\u062A\u0627\u0647 \u0648\u0644\u06CC \u0641\u0634\u0627\u0631 \u0632\u06CC\u0627\u062F\u060C \u0631\u0645\u0632 \u0622\u067E\u0631\u06A9\u0627\u062A \u062E\u0648\u0628\u0647."
  },
  {
    q: "\u0645\u0646 \u0646\u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u062F\u0631\u0633\u062A \u0634\u0648\u06A9 \u0628\u062F\u0645!",
    a: "\u0634\u0648\u06A9 \u06CC\u0639\u0646\u06CC \u0627\u0646\u0641\u062C\u0627\u0631 \u06A9\u0648\u062A\u0627\u0647\u060C \u0646\u0647 \u0636\u0631\u0628\u0647\u200C\u06CC \u0637\u0648\u0644\u0627\u0646\u06CC. \u0628\u0627 \u0637\u0646\u0627\u0628 \u0642\u062F\u0631\u062A \u062A\u0645\u0631\u06CC\u0646 \u06A9\u0646 \u0648 \u0631\u0648\u06CC \u0627\u06CC\u0646 \u062A\u0645\u0631\u06A9\u0632 \u06A9\u0646 \u06A9\u0647 \u06A9\u0644 \u0628\u062F\u0646\u062A (\u0646\u0647 \u0641\u0642\u0637 \u062F\u0633\u062A) \u06CC\u0647\u0648 \u0645\u0646\u0642\u0628\u0636 \u0628\u0634\u0647 \u0648 \u0633\u0631\u06CC\u0639 \u0628\u0631\u06AF\u0631\u062F\u0647."
  },
  {
    q: "\u0645\u0646 \u0646\u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u062A\u0631\u06A9\u06CC\u0628\u200C\u0632\u0646\u06CC \u0630\u0647\u0646\u06CC \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u0645!",
    a: "\u0627\u0648\u0644 \u0628\u0627 \u0633\u0627\u06CC\u0647\u200C\u0632\u0646\u06CC \u0634\u0631\u0648\u0639 \u06A9\u0646: \u06CC\u0647 \u062D\u0631\u06CC\u0641 \u0641\u0631\u0636\u06CC \u0631\u0648 \u062A\u0635\u0648\u0631 \u06A9\u0646 \u0648 \u0641\u0642\u0637 \u0628\u0627 \u062F\u0648 \u0636\u0631\u0628\u0647\u200C\u06CC \u0633\u0627\u062F\u0647 \u0628\u0627\u0647\u0627\u0634 \u062A\u0645\u0631\u06CC\u0646 \u06A9\u0646. \u06A9\u0645\u200C\u06A9\u0645 \u062A\u0639\u062F\u0627\u062F \u0636\u0631\u0628\u0627\u062A \u062A\u0631\u06A9\u06CC\u0628 \u0631\u0648 \u0632\u06CC\u0627\u062F \u06A9\u0646\u060C \u0639\u062C\u0644\u0647 \u0646\u06A9\u0646."
  },
  {
    q: "\u0645\u0646 \u0646\u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u0645\u0634\u062A\u0627\u0645\u0648 \u0642\u062F\u0631\u062A\u06CC \u0628\u0632\u0646\u0645!",
    a: "\u0642\u062F\u0631\u062A \u0645\u0634\u062A \u0627\u0632 \u0686\u0631\u062E\u0634 \u067E\u0627 \u0648 \u0644\u06AF\u0646 \u0645\u06CC\u0627\u062F\u060C \u0646\u0647 \u0641\u0642\u0637 \u0639\u0636\u0644\u0647\u200C\u06CC \u0628\u0627\u0632\u0648. \u0622\u0631\u0648\u0645 \u0648 \u0628\u0627 \u062A\u0645\u0631\u06A9\u0632 \u0631\u0648\u06CC \u0686\u0631\u062E\u0634 \u06A9\u0627\u0645\u0644 \u0628\u062F\u0646 \u062A\u0645\u0631\u06CC\u0646 \u06A9\u0646\u061B \u0642\u062F\u0631\u062A \u0648\u0627\u0642\u0639\u06CC \u0628\u0639\u062F \u0627\u0632 \u062A\u06A9\u0631\u0627\u0631 \u0632\u06CC\u0627\u062F \u062E\u0648\u062F\u0634 \u0645\u06CC\u0627\u062F."
  },
  {
    q: "\u0645\u0646 \u062A\u0648\u06CC \u0636\u0631\u0628\u0627\u062A \u0632\u06CC\u06AF\u0632\u0627\u06AF\u06CC \u0645\u0634\u06A9\u0644 \u062F\u0627\u0631\u0645!",
    a: "\u0627\u0648\u0644 \u0641\u0642\u0637 \u062D\u0631\u06A9\u062A \u0628\u0627\u0644\u0627-\u067E\u0627\u06CC\u06CC\u0646 \u0628\u062F\u0646 \u0631\u0648 \u0628\u062F\u0648\u0646 \u0645\u0634\u062A \u0632\u062F\u0646 \u062A\u0645\u0631\u06CC\u0646 \u06A9\u0646 \u062A\u0627 \u0647\u0645\u0627\u0647\u0646\u06AF \u0628\u0634\u0647\u060C \u0628\u0639\u062F \u0636\u0631\u0628\u0647 \u0631\u0648 \u062F\u0642\u06CC\u0642\u0627\u064B \u062A\u0648\u06CC \u0644\u062D\u0638\u0647\u200C\u06CC \u062F\u0631\u0633\u062A \u0627\u06CC\u0646 \u062D\u0631\u06A9\u062A \u0627\u0636\u0627\u0641\u0647 \u06A9\u0646."
  },
  {
    q: "\u0645\u0646 \u0646\u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u062A\u0631\u06A9\u06CC\u0628 \u0632\u06CC\u06AF\u0632\u0627\u06AF\u06CC \u0628\u0632\u0646\u0645!",
    a: "\u0647\u0631 \u0636\u0631\u0628\u0647\u200C\u06CC \u0632\u06CC\u06AF\u0632\u0627\u06AF\u06CC \u0631\u0648 \u062C\u062F\u0627 \u0648 \u0622\u0631\u0648\u0645 \u062A\u0645\u0631\u06CC\u0646 \u06A9\u0646 \u062A\u0627 \u062F\u0642\u06CC\u0642 \u0628\u0634\u0647\u060C \u0628\u0639\u062F \u0641\u0642\u0637 \u062F\u0648 \u0636\u0631\u0628\u0647 \u0631\u0648 \u0628\u0647\u200C\u0647\u0645 \u0648\u0635\u0644 \u06A9\u0646. \u0633\u0631\u0639\u062A \u0631\u0648 \u0641\u0642\u0637 \u0648\u0642\u062A\u06CC \u0632\u06CC\u0627\u062F \u06A9\u0646 \u06A9\u0647 \u062F\u0642\u062A\u062A \u0627\u0632 \u062F\u0633\u062A \u0646\u0631\u0647."
  }
];
function AccordionScreen({ title, items, onBack }) {
  const [openIndex, setOpenIndex] = useState(null);
  return /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto px-5 pt-3 pb-6", dir: "rtl" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onBack,
      style: {
        color: "#0B0B0D",
        fontFamily: "Vazirmatn, sans-serif",
        background: "#DAD6CE"
      },
      className: "text-sm mb-4 rounded-lg px-3 py-1.5 font-bold inline-block"
    },
    "\u203A \u0628\u0627\u0632\u06AF\u0634\u062A"
  ), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-lg font-black mb-4" }, title), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-3" }, items.map((item, i) => {
    const isOpen = openIndex === i;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: i,
        onClick: () => setOpenIndex(isOpen ? null : i),
        className: "text-right rounded-xl p-3 transition-all",
        style: {
          background: "#17161A",
          border: "1px solid #5FD3E8",
          boxShadow: "0 0 12px rgba(95,211,232,0.45)"
        }
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "rounded-full flex items-center justify-center shrink-0",
          style: { width: "26px", height: "26px", background: "rgba(217,30,43,0.15)" }
        },
        /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Oswald, sans-serif", color: "#D91E2B" }, className: "text-xs font-bold" }, i + 1)
      ), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-sm font-bold flex-1" }, item.q), /* @__PURE__ */ React.createElement("span", { style: { color: "#8A8790" }, className: "text-xs shrink-0" }, isOpen ? "\u25B2" : "\u25BC")),
      isOpen && /* @__PURE__ */ React.createElement(
        "p",
        {
          style: { fontFamily: "Vazirmatn, sans-serif", color: "#DAD6CE" },
          className: "text-xs leading-7 mt-3 pt-3"
        },
        /* @__PURE__ */ React.createElement("span", { style: { display: "block", borderTop: "1px solid rgba(95,211,232,0.25)", marginBottom: "10px" } }),
        item.a
      )
    );
  })));
}
function openAppSettings() {
  var _a2, _b2;
  const NS = (_b2 = (_a2 = window.Capacitor) == null ? void 0 : _a2.Plugins) == null ? void 0 : _b2.NativeSettings;
  if (NS == null ? void 0 : NS.open) {
    NS.open({ optionAndroid: "application_details", optionIOS: "App" }).catch(() => {
    });
  }
}
class PermissionDeniedError extends Error {
}
async function startVoiceRecording() {
  var _a2, _b2, _c;
  const VR = (_b2 = (_a2 = window.Capacitor) == null ? void 0 : _a2.Plugins) == null ? void 0 : _b2.VoiceRecorder;
  if (VR == null ? void 0 : VR.startRecording) {
    const has = await VR.hasAudioRecordingPermission().catch(() => ({ value: false }));
    if (!(has == null ? void 0 : has.value)) {
      const granted = await VR.requestAudioRecordingPermission().catch(() => ({ value: false }));
      if (!(granted == null ? void 0 : granted.value)) {
        throw new PermissionDeniedError("\u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u06CC\u06A9\u0631\u0648\u0641\u0648\u0646 \u062F\u0627\u062F\u0647 \u0646\u0634\u062F.");
      }
    }
    await VR.startRecording();
    return { mode: "native" };
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.start();
    return { mode: "web", recorder, chunks, stream };
  } catch (e) {
    const available = Object.keys(((_c = window.Capacitor) == null ? void 0 : _c.Plugins) || {}).join("\u060C ") || "\u0647\u06CC\u0686\u200C\u06A9\u062F\u0627\u0645";
    throw new Error(`\u0642\u0627\u0628\u0644\u06CC\u062A \u0636\u0628\u0637 \u0635\u062F\u0627 \u0631\u0648\u06CC \u0627\u06CC\u0646 \u0646\u0633\u062E\u0647 \u0627\u0632 \u0627\u067E \u0641\u0639\u0627\u0644 \u0646\u06CC\u0633\u062A. (\u067E\u0644\u0627\u06AF\u06CC\u0646\u200C\u0647\u0627\u06CC \u0634\u0646\u0627\u0633\u0627\u06CC\u06CC\u200C\u0634\u062F\u0647: ${available})`);
  }
}
async function stopVoiceRecording(session) {
  var _a2, _b2, _c, _d;
  if (session.mode === "native") {
    const VR = (_b2 = (_a2 = window.Capacitor) == null ? void 0 : _a2.Plugins) == null ? void 0 : _b2.VoiceRecorder;
    const result = await VR.stopRecording();
    const mimeType = ((_c = result == null ? void 0 : result.value) == null ? void 0 : _c.mimeType) || "audio/aac";
    const base64 = ((_d = result == null ? void 0 : result.value) == null ? void 0 : _d.recordDataBase64) || "";
    if (!base64) throw new Error("\u0636\u0628\u0637 \u0635\u062F\u0627 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
    return `data:${mimeType};base64,${base64}`;
  }
  return new Promise((resolve, reject) => {
    session.recorder.onstop = () => {
      const blob = new Blob(session.chunks, { type: session.recorder.mimeType || "audio/webm" });
      session.stream.getTracks().forEach((t) => t.stop());
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("\u0636\u0628\u0637 \u0635\u062F\u0627 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F"));
      reader.readAsDataURL(blob);
    };
    session.recorder.stop();
  });
}
function cancelVoiceRecording(session) {
  var _a2, _b2, _c, _d;
  if (!session) return;
  if (session.mode === "native") {
    (_d = (_c = (_b2 = (_a2 = window.Capacitor) == null ? void 0 : _a2.Plugins) == null ? void 0 : _b2.VoiceRecorder) == null ? void 0 : _c.stopRecording) == null ? void 0 : _d.call(_c).catch(() => {
    });
  } else {
    try {
      session.recorder.stop();
    } catch (e) {
    }
    session.stream.getTracks().forEach((t) => t.stop());
  }
}
function MicIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "9", y: "2", width: "6", height: "12", rx: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8" }));
}
function StopSquareIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "currentColor" }, /* @__PURE__ */ React.createElement("rect", { x: "6", y: "6", width: "12", height: "12", rx: "2" }));
}
const MAX_VOICE_SECONDS = 120;
function SupportChatScreen({ title, subtitle, messages, myRole, onSend, onSendVoice, onBack }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [voiceError, setVoiceError] = useState("");
  const [voicePermissionDenied, setVoicePermissionDenied] = useState(false);
  const recordingSessionRef = useRef(null);
  const recordingTimerRef = useRef(null);
  const scrollRef = useRef(null);
  useEffect(() => {
    var _a2;
    (_a2 = scrollRef.current) == null ? void 0 : _a2.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);
  useEffect(() => {
    return () => {
      if (recordingSessionRef.current) cancelVoiceRecording(recordingSessionRef.current);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, []);
  const handleSend = async () => {
    const value = text.trim();
    if (!value || sending) return;
    setSending(true);
    try {
      await onSend(value);
      setText("");
    } catch (e) {
    } finally {
      setSending(false);
    }
  };
  const handleStartRecording = async () => {
    setVoiceError("");
    setVoicePermissionDenied(false);
    try {
      const session = await startVoiceRecording();
      recordingSessionRef.current = session;
      setIsRecording(true);
      setRecordSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordSeconds((s) => {
          if (s + 1 >= MAX_VOICE_SECONDS) {
            handleStopRecording();
            return s;
          }
          return s + 1;
        });
      }, 1e3);
    } catch (err) {
      setVoiceError(err.message || "\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u06CC\u06A9\u0631\u0648\u0641\u0648\u0646 \u0627\u0645\u06A9\u0627\u0646\u200C\u067E\u0630\u06CC\u0631 \u0646\u0634\u062F");
      setVoicePermissionDenied(err instanceof PermissionDeniedError);
    }
  };
  const handleStopRecording = async () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    const session = recordingSessionRef.current;
    recordingSessionRef.current = null;
    setIsRecording(false);
    if (!session) return;
    try {
      const audioData = await stopVoiceRecording(session);
      await onSendVoice(audioData);
    } catch (err) {
      setVoiceError(err.message || "\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0635\u0648\u062A\u06CC \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
    }
  };
  const handleCancelRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    cancelVoiceRecording(recordingSessionRef.current);
    recordingSessionRef.current = null;
    setIsRecording(false);
    setRecordSeconds(0);
  };
  const lastMessage = messages.length ? messages[messages.length - 1] : null;
  const showStatusBanner = myRole === "user" && Boolean(lastMessage);
  const isAnswered = (lastMessage == null ? void 0 : lastMessage.sender) === "admin" || (lastMessage == null ? void 0 : lastMessage.sender) === "bot";
  return /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col min-h-0", dir: "rtl" }, /* @__PURE__ */ React.createElement("div", { className: "px-5 pt-3 pb-2 shrink-0" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onBack,
      style: { color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" },
      className: "text-sm mb-3 rounded-lg px-3 py-1.5 font-bold inline-block"
    },
    "\u203A \u0628\u0627\u0632\u06AF\u0634\u062A"
  ), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-lg font-black" }, title), subtitle && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Oswald, sans-serif", color: "#8A8790", direction: "ltr" }, className: "text-xs mt-1" }, subtitle), showStatusBanner && /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "mt-3 rounded-xl px-3.5 py-2.5 text-center",
      style: {
        background: isAnswered ? "rgba(31,168,85,0.15)" : "rgba(232,179,61,0.15)",
        border: `1px solid ${isAnswered ? "#1FA855" : "#E8B33D"}`
      }
    },
    /* @__PURE__ */ React.createElement(
      "span",
      {
        style: { fontFamily: "Vazirmatn, sans-serif", color: isAnswered ? "#1FA855" : "#E8B33D" },
        className: "text-xs font-bold"
      },
      isAnswered ? "\u2713 \u067E\u0627\u0633\u062E \u067E\u0634\u062A\u06CC\u0628\u0627\u0646" : "\u23F3 \u067E\u06CC\u0627\u0645 \u0634\u0645\u0627 \u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC\u0647"
    )
  )), /* @__PURE__ */ React.createElement("div", { ref: scrollRef, className: "flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-2" }, messages.length === 0 && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }, className: "text-xs text-center mt-10" }, "\u0647\u0646\u0648\u0632 \u067E\u06CC\u0627\u0645\u06CC \u0631\u062F \u0648 \u0628\u062F\u0644 \u0646\u0634\u062F\u0647. \u0627\u0648\u0644\u06CC\u0646 \u067E\u06CC\u0627\u0645 \u0631\u0648 \u0628\u0641\u0631\u0633\u062A."), messages.map((m, i) => {
    const isMine = m.sender === myRole;
    const showSenderLabel = myRole === "user" && !isMine && m.sender === "bot";
    return /* @__PURE__ */ React.createElement("div", { key: i, className: `flex flex-col ${isMine ? "items-start" : "items-end"}` }, showSenderLabel && /* @__PURE__ */ React.createElement(
      "span",
      {
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#5FD3E8" },
        className: "text-[10px] font-bold mb-1 px-1"
      },
      "\u{1F916} \u067E\u0627\u0633\u062E \u062E\u0648\u062F\u06A9\u0627\u0631"
    ), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "rounded-2xl px-3.5 py-2.5",
        style: {
          maxWidth: "78%",
          background: isMine ? "#D91E2B" : "#17161A",
          border: isMine ? "none" : "1px solid #2a292e"
        }
      },
      m.type === "voice" ? /* @__PURE__ */ React.createElement("audio", { controls: true, src: m.audioData, style: { maxWidth: "220px", height: "34px" } }) : /* @__PURE__ */ React.createElement(
        "p",
        {
          style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" },
          className: "text-sm leading-6 whitespace-pre-wrap"
        },
        m.message
      )
    ), m.createdAt && /* @__PURE__ */ React.createElement(
      "span",
      {
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#55535a", direction: "ltr" },
        className: "text-[10px] mt-1 px-1"
      },
      formatMessageTime(m.createdAt)
    ));
  })), voiceError && /* @__PURE__ */ React.createElement("div", { className: "px-4 pb-2 shrink-0 text-center" }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }, className: "text-xs mb-1.5" }, voiceError), voicePermissionDenied && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: openAppSettings,
      style: { fontFamily: "Vazirmatn, sans-serif", background: "#17161A", color: "#5FD3E8", border: "1px solid #5FD3E8" },
      className: "rounded-lg px-3 py-1.5 text-xs font-bold"
    },
    "\u0628\u0631\u0648 \u0628\u0647 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0648 \u0645\u062C\u0648\u0632 \u0645\u06CC\u06A9\u0631\u0648\u0641\u0648\u0646 \u0631\u0648 \u0641\u0639\u0627\u0644 \u06A9\u0646"
  )), isRecording ? /* @__PURE__ */ React.createElement("div", { className: "px-4 py-3 flex items-center gap-2 shrink-0", style: { borderTop: "1px solid #2a292e" } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleCancelRecording,
      style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790", background: "#17161A", border: "1px solid #2a292e" },
      className: "rounded-xl px-3 py-2.5 text-sm shrink-0"
    },
    "\u0644\u063A\u0648"
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "flex-1 flex items-center gap-2 rounded-xl px-3.5 py-2.5",
      style: { background: "#17161A", border: "1px solid #D91E2B" }
    },
    /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full shrink-0", style: { background: "#D91E2B" } }),
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", direction: "ltr" }, className: "text-sm" }, String(Math.floor(recordSeconds / 60)).padStart(2, "0"), ":", String(recordSeconds % 60).padStart(2, "0"))
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleStopRecording,
      style: { fontFamily: "Vazirmatn, sans-serif", background: "#D91E2B", color: "#F3EEE6" },
      className: "rounded-xl p-2.5 shrink-0"
    },
    /* @__PURE__ */ React.createElement(StopSquareIcon, { className: "w-5 h-5" })
  )) : /* @__PURE__ */ React.createElement("div", { className: "px-4 py-3 flex items-center gap-2 shrink-0", style: { borderTop: "1px solid #2a292e" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: text,
      onChange: (e) => setText(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") handleSend();
      },
      placeholder: myRole === "admin" ? "\u067E\u06CC\u0627\u0645\u062A \u0631\u0648 \u0628\u0646\u0648\u06CC\u0633 \u06CC\u0627 \u{1F3A4} \u0631\u0648 \u0628\u0632\u0646..." : "\u067E\u06CC\u0627\u0645\u062A \u0631\u0648 \u0628\u0646\u0648\u06CC\u0633...",
      style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", background: "#17161A", border: "1px solid #2a292e" },
      className: "flex-1 rounded-xl px-3.5 py-2.5 text-sm outline-none"
    }
  ), text.trim() || myRole !== "admin" ? /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleSend,
      disabled: sending,
      style: {
        fontFamily: "Vazirmatn, sans-serif",
        background: !sending ? "#D91E2B" : "#3a2226",
        color: !sending ? "#F3EEE6" : "#7a5a5d"
      },
      className: "rounded-xl px-4 py-2.5 text-sm font-bold shrink-0"
    },
    "\u0627\u0631\u0633\u0627\u0644"
  ) : /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleStartRecording,
      style: { fontFamily: "Vazirmatn, sans-serif", background: "#D91E2B", color: "#F3EEE6" },
      className: "rounded-xl p-2.5 shrink-0"
    },
    /* @__PURE__ */ React.createElement(MicIcon, { className: "w-5 h-5" })
  )), myRole === "user" && /* @__PURE__ */ React.createElement(
    "p",
    {
      style: { fontFamily: "Vazirmatn, sans-serif", color: "#55535a" },
      className: "text-[11px] text-center leading-5 px-6 pb-3 shrink-0"
    },
    "\u067E\u0627\u0633\u062E\u200C\u06AF\u0648\u06CC\u06CC \u062A\u06CC\u0645 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0627\u0635\u0631\u06CC \u0645\u0639\u0645\u0648\u0644\u0627\u064B \u062F\u0631 \u06A9\u0648\u062A\u0627\u0647\u200C\u062A\u0631\u06CC\u0646 \u0632\u0645\u0627\u0646 \u0645\u0645\u06A9\u0646 \u0627\u0646\u062C\u0627\u0645 \u0645\u06CC\u200C\u0634\u0647 \u0648 \u062D\u062F\u0627\u06A9\u062B\u0631 \u0638\u0631\u0641 \u06F7\u06F2 \u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC \u067E\u0627\u0633\u062E \u067E\u06CC\u0627\u0645 \u0634\u0645\u0627 \u062F\u0627\u062F\u0647 \u062E\u0648\u0627\u0647\u062F \u0634\u062F."
  ));
}
function SupportInboxScreen({ threads, loading, error, onOpenThread, onBack }) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto px-5 pt-3 pb-6", dir: "rtl" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onBack,
      style: { color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" },
      className: "text-sm mb-4 rounded-lg px-3 py-1.5 font-bold inline-block"
    },
    "\u203A \u0628\u0627\u0632\u06AF\u0634\u062A"
  ), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-lg font-black mb-4" }, "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC"), loading && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-sm text-center mt-10" }, "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u2026"), error && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }, className: "text-sm text-center mt-10" }, error), !loading && !error && threads.length === 0 && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }, className: "text-sm text-center mt-10" }, "\u0647\u0646\u0648\u0632 \u0647\u06CC\u0686 \u062A\u06CC\u06A9\u062A\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647."), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-2" }, threads.map((t) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: t.identifier,
      onClick: () => onOpenThread(t.identifier),
      className: "text-right rounded-xl p-3",
      style: { background: "#17161A", border: "1px solid #2a292e" }
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1" }, /* @__PURE__ */ React.createElement(
      "span",
      {
        style: { fontFamily: "Oswald, sans-serif", color: "#F3EEE6", direction: "ltr" },
        className: "text-sm font-bold"
      },
      t.identifier
    ), t.lastSender === "user" && /* @__PURE__ */ React.createElement(
      "span",
      {
        style: { background: "#D91E2B" },
        className: "w-2 h-2 rounded-full shrink-0"
      }
    )),
    /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-xs truncate" }, t.lastSender === "admin" ? "\u0634\u0645\u0627: " : "", t.lastMessage)
  ))));
}
function AdminUsersScreen({ authToken, onBack }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let cancelled = false;
    apiFetchUsers(authToken).then(({ users: users2, total: total2 }) => {
      if (cancelled) return;
      setUsers(users2);
      setTotal(total2);
    }).catch((err) => {
      if (!cancelled) setError(err.message || "\u062F\u0631\u06CC\u0627\u0641\u062A \u0644\u06CC\u0633\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [authToken]);
  const planLabel = { none: "\u0628\u062F\u0648\u0646 \u0627\u0634\u062A\u0631\u0627\u06A9", silver: "\u0646\u0642\u0631\u0647\u200C\u0627\u06CC", gold: "\u0637\u0644\u0627\u06CC\u06CC" };
  return /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto px-5 pt-3 pb-6", dir: "rtl" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onBack,
      style: { color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" },
      className: "text-sm mb-4 rounded-lg px-3 py-1.5 font-bold inline-block"
    },
    "\u203A \u0628\u0627\u0632\u06AF\u0634\u062A"
  ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-lg font-black" }, "\u0644\u06CC\u0633\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646"), /* @__PURE__ */ React.createElement(
    "span",
    {
      style: { fontFamily: "Oswald, sans-serif", color: "#E8B33D", background: "rgba(232,179,61,0.12)" },
      className: "text-xs font-bold rounded-full px-3 py-1"
    },
    total.toLocaleString("en-US"),
    " \u0646\u0641\u0631"
  )), loading && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-sm text-center mt-10" }, "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u2026"), error && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }, className: "text-sm text-center mt-10" }, error), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-2" }, users.map((u) => {
    const isActivePaid = (u.plan === "silver" || u.plan === "gold") && u.planExpiresAt && u.planExpiresAt > Date.now();
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: u.identifier,
        className: "rounded-xl p-3",
        style: { background: "#17161A", border: "1px solid #2a292e" }
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1" }, /* @__PURE__ */ React.createElement(
        "span",
        {
          style: { fontFamily: "Oswald, sans-serif", color: "#F3EEE6", direction: "ltr" },
          className: "text-sm font-bold"
        },
        u.identifier
      ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 shrink-0" }, u.isAdmin && /* @__PURE__ */ React.createElement(
        "span",
        {
          style: { fontFamily: "Vazirmatn, sans-serif", color: "#E8B33D", background: "rgba(232,179,61,0.12)" },
          className: "text-[10px] font-bold rounded-full px-2 py-0.5"
        },
        "\u0627\u062F\u0645\u06CC\u0646"
      ), isActivePaid && /* @__PURE__ */ React.createElement(
        "span",
        {
          style: { fontFamily: "Vazirmatn, sans-serif", color: "#1FA855", background: "rgba(31,168,85,0.12)" },
          className: "text-[10px] font-bold rounded-full px-2 py-0.5 flex items-center gap-1"
        },
        /* @__PURE__ */ React.createElement("span", { style: { background: "#1FA855" }, className: "w-1.5 h-1.5 rounded-full" }),
        "\u0641\u0639\u0627\u0644"
      ))),
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-xs" }, planLabel[u.plan] || u.plan, u.planExpiresAt ? ` \xB7 \u062A\u0627 ${formatExpiryDate(u.planExpiresAt)}` : ""), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }, className: "text-xs" }, formatExpiryDate(u.createdAt)))
    );
  })));
}
function InfoScreen({ title, items, paragraph, onBack }) {
  const [expandedItem, setExpandedItem] = useState(null);
  if (expandedItem) {
    return /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col px-5 pt-3 pb-6", dir: "rtl" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setExpandedItem(null),
        style: {
          color: "#0B0B0D",
          fontFamily: "Vazirmatn, sans-serif",
          background: "#DAD6CE"
        },
        className: "text-sm mb-4 self-start rounded-lg px-3 py-1.5 font-bold inline-block"
      },
      "\u203A \u0628\u0627\u0632\u06AF\u0634\u062A"
    ), /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col items-center justify-center" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "relative w-full rounded-2xl overflow-hidden mb-5",
        style: { aspectRatio: "1 / 1", background: "#0B0B0D", border: "1px solid #5FD3E8", boxShadow: "0 0 20px rgba(95,211,232,0.4)" }
      },
      /* @__PURE__ */ React.createElement("img", { src: expandedItem.image, alt: expandedItem.text, className: "w-full h-full object-contain" })
    ), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-lg font-black text-center" }, expandedItem.text)));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto px-5 pt-3 pb-6", dir: "rtl" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onBack,
      style: {
        color: "#0B0B0D",
        fontFamily: "Vazirmatn, sans-serif",
        background: "#DAD6CE"
      },
      className: "text-sm mb-4 rounded-lg px-3 py-1.5 font-bold inline-block"
    },
    "\u203A \u0628\u0627\u0632\u06AF\u0634\u062A"
  ), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-lg font-black mb-4" }, title), paragraph && /* @__PURE__ */ React.createElement(
    "p",
    {
      style: { fontFamily: "Vazirmatn, sans-serif", color: "#DAD6CE", whiteSpace: "pre-line" },
      className: "text-sm leading-8"
    },
    paragraph
  ), items && /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-3" }, items.map((raw, i) => {
    const item = typeof raw === "string" ? { text: raw } : raw;
    const Wrapper = item.image ? "button" : "div";
    return /* @__PURE__ */ React.createElement(
      Wrapper,
      {
        key: i,
        onClick: item.image ? () => setExpandedItem(item) : void 0,
        className: "flex items-center gap-3 rounded-xl p-3",
        style: {
          background: "#17161A",
          border: "1px solid #5FD3E8",
          boxShadow: "0 0 12px rgba(95,211,232,0.45)"
        }
      },
      item.image ? /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "rounded-lg overflow-hidden shrink-0",
          style: { width: "44px", height: "44px", background: "#0B0B0D" }
        },
        /* @__PURE__ */ React.createElement("img", { src: item.image, alt: item.text, className: "w-full h-full object-cover" })
      ) : /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "rounded-full flex items-center justify-center shrink-0",
          style: { width: "26px", height: "26px", background: "rgba(217,30,43,0.15)" }
        },
        /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Oswald, sans-serif", color: "#D91E2B" }, className: "text-xs font-bold" }, i + 1)
      ),
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#DAD6CE" }, className: "text-sm" }, item.text)
    );
  })));
}
function HomeScreen({ onNavigate, menuOpen, setMenuOpen, onLogout, isAdmin, accountName, accountContact, onOpenAccount, memberCount, realMemberCount, onSetMemberCount, chapterVisibility, onToggleChapterVisibility, onOpenSupport, chapterTitles, supportStatus, onInviteFriends }) {
  const [editingCount, setEditingCount] = useState(false);
  const [countDraft, setCountDraft] = useState(String(memberCount));
  const [savingCount, setSavingCount] = useState(false);
  useEffect(() => {
    if (!editingCount) setCountDraft(String(memberCount));
  }, [memberCount]);
  const menuItems = [
    { key: "info-tips", label: "\u0646\u06A9\u0627\u062A \u06A9\u0644\u06CC\u062F\u06CC", icon: TipIcon },
    { key: "info-coach", label: "\u06A9\u0645\u06A9 \u0645\u0631\u0628\u06CC", icon: CoachIcon },
    { key: "info-faq", label: "\u0633\u0648\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644", icon: QuestionIcon },
    { key: "info-gear", label: "\u0648\u0633\u0627\u06CC\u0644 \u0628\u0648\u06A9\u0633", icon: GloveIcon },
    // فعلاً پشتیبانی فقط برای ادمین نشون داده می‌شه (برای مدیریت گفتگوهای قبلی)، از دسترس کاربر عادی خارجه - شاید بعداً برگردوندیمش
    ...isAdmin ? [{ key: "support", label: "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC", icon: SupportIcon }] : [],
    { key: "info-rules", label: "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A", icon: LockIcon },
    { key: "info-about", label: "\u062F\u0631\u0628\u0627\u0631\u0647 \u0622\u06A9\u0627\u062F\u0645\u06CC Naseri", icon: InfoIcon },
    ...isAdmin ? [{ key: "admin-users", label: "\u0644\u06CC\u0633\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646", icon: UserIcon }] : [],
    { key: "invite", label: "\u062F\u0639\u0648\u062A \u0627\u0632 \u062F\u0648\u0633\u062A\u0627\u0646", icon: InviteIcon }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "relative flex-1 flex flex-col overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto px-5 pt-3 pb-6", dir: "rtl" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1 gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 flex items-center shrink-0" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setMenuOpen(true),
      className: "rounded-lg flex items-center justify-center",
      style: { width: "32px", height: "32px", background: "#F3EEE6", border: "1px solid #F3EEE6" }
    },
    /* @__PURE__ */ React.createElement(MenuIcon, { className: "w-4 h-4", style: { color: "#0B0B0D" } })
  )), /* @__PURE__ */ React.createElement(
    "h1",
    {
      dir: "ltr",
      className: "flex-1 min-w-0 text-center",
      style: {
        fontFamily: '"Bebas Neue", Oswald, Impact, "sans-serif-condensed", "Arial Narrow", sans-serif',
        fontSize: "clamp(15px, 5vw, 21px)",
        letterSpacing: "0.1em",
        lineHeight: 1.15,
        fontWeight: 400,
        textShadow: "0 0 14px rgba(217,30,43,0.35)"
      }
    },
    /* @__PURE__ */ React.createElement("span", { style: { color: "#F3EEE6" } }, "BOXING ACADEMY"),
    " ",
    /* @__PURE__ */ React.createElement(
      "span",
      {
        style: {
          color: "#E8B33D",
          background: "linear-gradient(90deg, #E8B33D, #D91E2B)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }
      },
      "NASERI"
    )
  ), /* @__PURE__ */ React.createElement("div", { className: "w-12 flex items-center justify-end shrink-0" }, /* @__PURE__ */ React.createElement("img", { src: SPLASH_LOGO_SRC, alt: "NASERI", className: "w-12 h-12 object-contain" }))), /* @__PURE__ */ React.createElement(RopeDivider, null), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6 mt-4" }, /* @__PURE__ */ React.createElement(
    TrainingWindow,
    {
      title: (chapterTitles == null ? void 0 : chapterTitles.basic) || DEFAULT_CHAPTER_TITLES.basic,
      image: CHAPTER1_IMAGE_SRC,
      onClick: () => onNavigate("curriculum-basic")
    }
  ), /* @__PURE__ */ React.createElement(
    TrainingWindow,
    {
      title: (chapterTitles == null ? void 0 : chapterTitles.advanced) || DEFAULT_CHAPTER_TITLES.advanced,
      image: CHAPTER2_IMAGE_SRC,
      onClick: () => onNavigate("curriculum-advanced")
    }
  ), /* @__PURE__ */ React.createElement(
    TrainingWindow,
    {
      title: (chapterTitles == null ? void 0 : chapterTitles.extra) || DEFAULT_CHAPTER_TITLES.extra,
      image: CHAPTER3_IMAGE_SRC,
      onClick: () => onNavigate("curriculum-extra")
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(
    TrainingWindow,
    {
      title: (chapterTitles == null ? void 0 : chapterTitles.fight) || DEFAULT_CHAPTER_TITLES.fight,
      onClick: () => onNavigate("curriculum-fight"),
      comingSoon: !isAdmin && !(chapterVisibility == null ? void 0 : chapterVisibility.fight),
      image: CHAPTER4_IMAGE_SRC
    }
  ), isAdmin && /* @__PURE__ */ React.createElement(
    ChapterVisibilityToggle,
    {
      visible: Boolean(chapterVisibility == null ? void 0 : chapterVisibility.fight),
      onToggle: (v) => onToggleChapterVisibility == null ? void 0 : onToggleChapterVisibility("fight", v)
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(
    TrainingWindow,
    {
      title: (chapterTitles == null ? void 0 : chapterTitles.partner) || DEFAULT_CHAPTER_TITLES.partner,
      onClick: () => onNavigate("curriculum-partner"),
      comingSoon: !isAdmin && !(chapterVisibility == null ? void 0 : chapterVisibility.partner),
      image: CHAPTER5_IMAGE_SRC
    }
  ), isAdmin && /* @__PURE__ */ React.createElement(
    ChapterVisibilityToggle,
    {
      visible: Boolean(chapterVisibility == null ? void 0 : chapterVisibility.partner),
      onToggle: (v) => onToggleChapterVisibility == null ? void 0 : onToggleChapterVisibility("partner", v)
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(
    TrainingWindow,
    {
      title: (chapterTitles == null ? void 0 : chapterTitles.focus) || DEFAULT_CHAPTER_TITLES.focus,
      onClick: () => onNavigate("curriculum-focus"),
      comingSoon: !isAdmin && !(chapterVisibility == null ? void 0 : chapterVisibility.focus),
      image: CHAPTER6_IMAGE_SRC
    }
  ), isAdmin && /* @__PURE__ */ React.createElement(
    ChapterVisibilityToggle,
    {
      visible: Boolean(chapterVisibility == null ? void 0 : chapterVisibility.focus),
      onToggle: (v) => onToggleChapterVisibility == null ? void 0 : onToggleChapterVisibility("focus", v)
    }
  )))), menuOpen && /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "fixed inset-0",
      style: { background: "rgba(0,0,0,0.55)", zIndex: 30 },
      onClick: () => setMenuOpen(false)
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        onClick: (e) => e.stopPropagation(),
        className: "absolute top-0 right-0 h-full flex flex-col px-5 pt-5 pb-24 overflow-y-auto [&>*]:shrink-0",
        style: { width: "62%", background: "#111013", borderLeft: "1px solid #2a292e", overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" },
        dir: "rtl"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-6" }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Oswald, sans-serif", color: "#E8B33D", letterSpacing: "0.1em" }, className: "text-xs font-semibold" }, "\u0645\u0646\u0648"), /* @__PURE__ */ React.createElement("button", { onClick: () => setMenuOpen(false) }, /* @__PURE__ */ React.createElement(CloseIcon, { className: "w-5 h-5", style: { color: "#8A8790" } }))),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          "data-testid": "menu-account-box",
          onClick: onOpenAccount,
          className: "w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 mb-4 text-right",
          style: {
            background: "linear-gradient(135deg, #D91E2B 0%, #F97316 100%)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 0 22px rgba(249,115,22,0.55), 0 0 46px rgba(217,30,43,0.38), inset 0 0 14px rgba(255,255,255,0.12)"
          }
        },
        /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "rounded-full flex items-center justify-center shrink-0",
            style: { width: "40px", height: "40px", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)" }
          },
          /* @__PURE__ */ React.createElement(UserIcon, { className: "w-5 h-5", style: { color: "#fff" } })
        ),
        /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Vazirmatn, sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "10px" } }, "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC"), /* @__PURE__ */ React.createElement("div", { "data-testid": "menu-account-name", style: { fontFamily: "Vazirmatn, sans-serif", color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,0.35)" }, className: "text-sm font-black truncate" }, accountName || "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631"), /* @__PURE__ */ React.createElement("div", { "data-testid": "menu-account-contact", dir: "ltr", style: { fontFamily: "Oswald, sans-serif", color: "rgba(255,255,255,0.92)", letterSpacing: "0.05em", textAlign: "right" }, className: "text-xs truncate" }, accountContact || "")),
        /* @__PURE__ */ React.createElement("span", { style: { color: "#fff", fontSize: "20px", lineHeight: 1 } }, "\u2039")
      ),
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "flex items-center justify-between rounded-xl px-3 py-3 mb-4",
          style: {
            background: "rgba(95,211,232,0.08)",
            border: "1px solid rgba(95,211,232,0.4)",
            boxShadow: "0 0 22px rgba(95,211,232,0.35), inset 0 0 14px rgba(95,211,232,0.08)"
          }
        },
        editingCount ? /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 w-full" }, /* @__PURE__ */ React.createElement(
          "input",
          {
            value: countDraft,
            onChange: (e) => setCountDraft(e.target.value.replace(/[^\d]/g, "")),
            inputMode: "numeric",
            autoFocus: true,
            style: { fontFamily: "Oswald, sans-serif", color: "#F3EEE6" },
            className: "bg-transparent outline-none flex-1 text-sm"
          }
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            disabled: savingCount,
            onClick: async () => {
              setSavingCount(true);
              try {
                await (onSetMemberCount == null ? void 0 : onSetMemberCount(Number(countDraft) || 0));
                setEditingCount(false);
              } catch (e) {
              } finally {
                setSavingCount(false);
              }
            },
            style: { fontFamily: "Vazirmatn, sans-serif", color: "#0B0B0D", background: "#5FD3E8" },
            className: "rounded-lg px-2.5 py-1 text-xs font-bold shrink-0"
          },
          savingCount ? "..." : "\u0630\u062E\u06CC\u0631\u0647"
        )) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
          "span",
          {
            className: "active-dot rounded-full shrink-0",
            style: { width: "8px", height: "8px", background: "#22c55e" }
          }
        ), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#5FD3E8" }, className: "text-xs font-bold" }, "\u0627\u0639\u0636\u0627\u06CC \u0641\u0639\u0627\u0644 \u0627\u067E")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-end gap-0.5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Oswald, sans-serif", color: "#F3EEE6" }, className: "text-sm font-bold" }, Number(memberCount).toLocaleString("en-US")), isAdmin && /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => {
              setCountDraft(String(memberCount));
              setEditingCount(true);
            }
          },
          /* @__PURE__ */ React.createElement(PencilIcon, { className: "w-3.5 h-3.5", style: { color: "#5FD3E8" } })
        )), isAdmin && /* @__PURE__ */ React.createElement("span", { "data-testid": "real-member-count", style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-[10px] whitespace-nowrap" }, "\u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0648\u0627\u0642\u0639\u06CC:", " ", /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Oswald, sans-serif", color: "#5FD3E8" }, className: "font-bold" }, realMemberCount == null ? "\u2014" : Number(realMemberCount).toLocaleString("en-US")))))
      ),
      /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-2" }, menuItems.map((item) => {
        const Icon = item.icon;
        const dotColor = item.key === "support" && supportStatus === "pending" ? "#E8B33D" : item.key === "support" && supportStatus === "answered" ? "#1FA855" : null;
        return /* @__PURE__ */ React.createElement(
          "button",
          {
            key: item.key,
            onClick: () => {
              setMenuOpen(false);
              if (item.key === "support") {
                onOpenSupport == null ? void 0 : onOpenSupport();
              } else if (item.key === "invite") {
                onInviteFriends == null ? void 0 : onInviteFriends();
              } else {
                onNavigate(item.key);
              }
            },
            className: "flex items-center gap-3 rounded-xl px-3 py-3 relative",
            style: {
              background: "#17161A",
              border: "1px solid #5FD3E8",
              boxShadow: "0 0 12px rgba(95,211,232,0.45)"
            }
          },
          /* @__PURE__ */ React.createElement(Icon, { className: "w-5 h-5", style: { color: "#D91E2B" } }),
          /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-sm font-bold" }, item.label),
          dotColor && /* @__PURE__ */ React.createElement(
            "span",
            {
              style: { background: dotColor, boxShadow: `0 0 6px ${dotColor}` },
              className: "absolute top-2 left-2 w-2.5 h-2.5 rounded-full"
            }
          )
        );
      })),
      /* @__PURE__ */ React.createElement("div", { className: "h-4" }),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            setMenuOpen(false);
            onLogout();
          },
          className: "flex items-center gap-3 rounded-xl px-3 py-3 mt-auto mb-2",
          style: { background: "rgba(217,30,43,0.1)", border: "1px solid rgba(217,30,43,0.4)" }
        },
        /* @__PURE__ */ React.createElement(LogoutIcon, { className: "w-5 h-5", style: { color: "#D91E2B" } }),
        /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }, className: "text-sm font-bold" }, "\u062E\u0631\u0648\u062C \u0627\u0632 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC")
      )
    )
  ));
}
const CURRICULUM_BASIC = [
  { n: 1, t: "\u062A\u0626\u0648\u0631\u06CC \u0648 \u0645\u0641\u0647\u0648\u0645 \u06AF\u0627\u0631\u062F" },
  { n: 2, t: "\u0627\u06CC\u0633\u062A\u0627\u062F\u0646 \u062F\u0631 \u06AF\u0627\u0631\u062F" },
  { n: 3, t: "\u0627\u0633\u062A\u0642\u0631\u0627\u0631 \u067E\u0627\u0647\u0627" },
  { n: 4, t: "\u0627\u0633\u062A\u0642\u0631\u0627\u0631 \u062F\u0633\u062A\u200C\u0647\u0627 \u0648 \u06AF\u0627\u0631\u062F \u067E\u0627\u06CC\u0647" },
  { n: 5, t: "\u06AF\u0627\u0631\u062F \u067E\u06CC\u06A9\u0627\u0628\u0648" },
  { n: 6, t: "\u06AF\u0627\u0631\u062F \u0641\u06CC\u0644\u06CC \u0634\u0644" },
  { n: 7, t: "\u0646\u06A9\u062A\u0647\u200C\u0647\u0627\u06CC \u06AF\u0627\u0631\u062F" },
  { n: 8, t: "\u0686\u0631\u062E\u0634 \u0634\u0627\u0646\u0647\u200C\u0647\u0627" },
  { n: 9, t: "\u062B\u0628\u0627\u062A \u0633\u0631" },
  { n: 10, t: "\u0641\u0631\u0645\u0627\u0646 \u0628\u062F\u0646" },
  { n: 11, t: "\u0633\u062A\u0648\u0646\u200C\u06AF\u06CC\u0631\u06CC \u062F\u0631 \u06AF\u0627\u0631\u062F" },
  { n: 12, t: "\u062D\u0631\u06A9\u062A \u067E\u0627\u06CC\u0647 \u062F\u0631 \u06AF\u0627\u0631\u062F" },
  { n: 13, t: "\u0686\u0631\u062E\u0634 \u0634\u0627\u0646\u0647 \u062F\u0631 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC" },
  { n: 14, t: "\u062F\u0641\u0627\u0639 \u0634\u0627\u0646\u0647" },
  { n: 15, t: "\u062D\u0641\u0638 \u0633\u062A\u0648\u0646 \u06AF\u0627\u0631\u062F \u062F\u0631 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC" },
  { n: 16, t: "\u0633\u062A\u0648\u0646\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u0627\u0646\u0642\u0628\u0627\u0636 \u062F\u0641\u0627\u0639\u06CC" },
  { n: 17, t: "\u0645\u0641\u0647\u0648\u0645 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u0648 \u062A\u063A\u06CC\u06CC\u0631 \u062F\u0631 \u06AF\u0627\u0631\u062F\u0647\u0627" },
  { n: 18, t: "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u062A\u06A9\u0645\u06CC\u0644\u06CC \u062A\u0645\u0631\u06CC\u0646\u0627\u062A" },
  { n: 19, t: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u0628\u0647 \u062C\u0644\u0648" },
  { n: 20, t: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u0628\u0647 \u0639\u0642\u0628" },
  { n: 21, t: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u0628\u0647 \u0686\u067E" },
  { n: 22, t: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u0628\u0647 \u0631\u0627\u0633\u062A" },
  { n: 23, t: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u062C\u0644\u0648 \u0648 \u0639\u0642\u0628" },
  { n: 24, t: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u062C\u0644\u0648 \u0648 \u0686\u067E" },
  { n: 25, t: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u062C\u0644\u0648 \u0648 \u0631\u0627\u0633\u062A" },
  { n: 26, t: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u0639\u0642\u0628 \u0628\u0647 \u062C\u0644\u0648" },
  { n: 27, t: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u0639\u0642\u0628 \u0628\u0647 \u0686\u067E" },
  { n: 28, t: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u0639\u0642\u0628 \u0628\u0647 \u0631\u0627\u0633\u062A" },
  { n: 29, t: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u0686\u067E \u0628\u0647 \u0639\u0642\u0628 \u0648 \u062C\u0644\u0648" },
  { n: 30, t: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u0631\u0627\u0633\u062A \u0628\u0647 \u0639\u0642\u0628 \u0648 \u062C\u0644\u0648" }
];
const CURRICULUM_ADVANCED = [
  { n: 1, t: "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0641\u0635\u0644" },
  { n: 2, t: "\u0645\u0639\u0631\u0641\u06CC \u0636\u0631\u0628\u0627\u062A \u062F\u0633\u062A" },
  { n: 3, t: "\u0636\u0631\u0628\u0647 \u062C\u0628" },
  { n: 4, t: "\u0636\u0631\u0628\u0647 \u06A9\u0631\u0627\u0633" },
  { n: 5, t: "\u0647\u0648\u06A9 \u062C\u0628" },
  { n: 6, t: "\u0647\u0648\u06A9 \u06A9\u0631\u0627\u0633" },
  { n: 7, t: "\u0622\u067E\u0631\u06A9\u0627\u062A \u062C\u0628" },
  { n: 8, t: "\u0622\u067E\u0631\u06A9\u0627\u062A \u06A9\u0631\u0627\u0633" },
  { n: 9, t: "\u0636\u0631\u0628\u0627\u062A \u062F\u0631 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u060C \u062C\u0644\u0648\u060C \u0639\u0642\u0628" },
  { n: 10, t: "\u0636\u0631\u0628\u0627\u062A \u062F\u0631 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u0686\u067E\u060C \u0631\u0627\u0633\u062A" },
  { n: 11, t: "\u0645\u0641\u0647\u0648\u0645 \u0634\u0648\u06A9 \u0636\u0631\u0628\u0627\u062A" },
  { n: 12, t: "\u0627\u062C\u0631\u0627\u06CC \u0634\u0648\u06A9 \u0636\u0631\u0628\u0627\u062A" },
  { n: 13, t: "\u0645\u0641\u0647\u0648\u0645 \u0627\u062A\u0635\u0627\u0644\u060C \u0628\u0631\u06AF\u0634\u062A \u0636\u0631\u0628\u0627\u062A" },
  { n: 14, t: "\u0627\u062C\u0631\u0627\u06CC \u0627\u062A\u0635\u0627\u0644 \u0636\u0631\u0628\u0627\u062A" },
  { n: 15, t: "\u0627\u0646\u062A\u0642\u0627\u0644 \u0648\u0632\u0646 \u0628\u062F\u0646" },
  { n: 16, t: "\u0627\u062C\u0631\u0627\u06CC \u0634\u0648\u06A9 \u0648 \u0627\u0646\u062A\u0642\u0627\u0644 \u0642\u062F\u0631\u062A" },
  { n: 17, t: "\u0636\u0631\u0628\u0627\u062A \u0632\u06CC\u06AF\u0632\u0627\u06AF\u06CC" },
  { n: 18, t: "\u062A\u06A9\u0646\u06CC\u06A9 \u0632\u0648\u062C \u0648 \u0641\u0631\u062F" },
  { n: 19, t: "\u0627\u062C\u0631\u0627\u06CC \u062A\u06A9\u0646\u06CC\u06A9 \u0632\u0648\u062C \u0648 \u0641\u0631\u062F" },
  { n: 20, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062A\u0631\u06A9\u06CC\u0628 \u0632\u0646\u06CC \u062B\u0627\u0628\u062A)" },
  { n: 21, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062A\u0631\u06A9\u06CC\u0628 \u0632\u0646\u06CC \u062B\u0627\u0628\u062A)" },
  { n: 22, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062A\u0631\u06A9\u06CC\u0628 \u0632\u0646\u06CC \u062B\u0627\u0628\u062A)" },
  { n: 23, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062A\u0631\u06A9\u06CC\u0628 \u0632\u0646\u06CC \u062B\u0627\u0628\u062A)" },
  { n: 24, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062A\u0631\u06A9\u06CC\u0628 \u0632\u0646\u06CC \u062B\u0627\u0628\u062A)" },
  { n: 25, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062A\u0631\u06A9\u06CC\u0628 \u0632\u0646\u06CC \u062F\u0631 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC)" },
  { n: 26, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062A\u0631\u06A9\u06CC\u0628 \u0632\u0646\u06CC \u062F\u0631 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC)" },
  { n: 27, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062A\u0631\u06A9\u06CC\u0628 \u0632\u0646\u06CC \u062F\u0631 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC)" },
  { n: 28, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062A\u0631\u06A9\u06CC\u0628 \u0632\u0646\u06CC \u062F\u0631 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC)" },
  { n: 29, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062A\u0631\u06A9\u06CC\u0628 \u0632\u0646\u06CC \u062F\u0631 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC)" },
  { n: 30, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062A\u0631\u06A9\u06CC\u0628 \u0632\u0646\u06CC \u062F\u0631 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC)" }
];
const CURRICULUM_EXTRA = [
  { n: 1, t: "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0641\u0635\u0644" },
  { n: 2, t: "\u062A\u0648\u0636\u06CC\u062D \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u067E\u0627\u06CC\u06CC\u0646 \u062A\u0646\u0647" },
  { n: 3, t: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u062E\u0637\u06CC" },
  { n: 4, t: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u067E\u0631\u06AF\u0627\u0631\u06CC" },
  { n: 5, t: "\u0641\u0648\u062A\u0648\u0631\u06A9" },
  { n: 6, t: "\u062A\u063A\u06CC\u06CC\u0631 \u06AF\u0627\u0631\u062F" },
  { n: 7, t: "\u06AF\u0631\u062F\u0634 \u062F\u0648\u0631\u0627\u0646\u06CC" },
  { n: 8, t: "\u062A\u0644\u0641\u06CC\u0642 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u200C\u0647\u0627" },
  { n: 9, t: "\u062A\u0644\u0641\u06CC\u0642 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u200C\u0647\u0627" },
  { n: 10, t: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u200C\u0647\u0627\u06CC \u0628\u0627\u0644\u0627\u062A\u0646\u0647" },
  { n: 11, t: "\u0627\u0633\u0644\u06CC\u067E" },
  { n: 12, t: "\u067E\u0648\u0644 \u0628\u06A9" },
  { n: 13, t: "\u0631\u0648\u0648\u0644 \u06A9\u0631\u062F\u0646" },
  { n: 14, t: "\u062A\u0645\u0631\u06CC\u0646 (\u0627\u0633\u0644\u06CC\u067E)" },
  { n: 15, t: "\u062A\u0645\u0631\u06CC\u0646 (\u0631\u0648\u0648\u0644 \u06A9\u0631\u062F\u0646)" },
  { n: 16, t: "\u062A\u0645\u0631\u06CC\u0646 (\u067E\u0648\u0644 \u0628\u06A9)" },
  { n: 17, t: "\u062A\u0645\u0631\u06CC\u0646 (\u0627\u0633\u0644\u06CC\u067E + \u0631\u0648\u0648\u0644)" },
  { n: 18, t: "\u062A\u0645\u0631\u06CC\u0646 (\u067E\u0648\u0644 \u0628\u06A9 + \u0627\u0633\u0644\u06CC\u067E + \u0631\u0648\u0648\u0644)" },
  { n: 19, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u200C\u0647\u0627\u06CC \u067E\u0627\u06CC\u06CC\u0646 \u062A\u0646\u0647)" },
  { n: 20, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u200C\u0647\u0627\u06CC \u067E\u0627\u06CC\u06CC\u0646 \u062A\u0646\u0647)" },
  { n: 21, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u200C\u0647\u0627\u06CC \u067E\u0627\u06CC\u06CC\u0646 \u062A\u0646\u0647)" },
  { n: 22, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u200C\u0647\u0627\u06CC \u067E\u0627\u06CC\u06CC\u0646 \u062A\u0646\u0647)" },
  { n: 23, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u200C\u0647\u0627\u06CC \u067E\u0627\u06CC\u06CC\u0646 \u062A\u0646\u0647)" },
  { n: 24, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u200C\u0647\u0627\u06CC \u067E\u0627\u06CC\u06CC\u0646 \u062A\u0646\u0647)" },
  { n: 25, t: "\u062A\u0645\u0631\u06CC\u0646 (\u0627\u0633\u0644\u06CC\u067E + \u067E\u0648\u0644 \u0628\u06A9)" },
  { n: 26, t: "\u062A\u0645\u0631\u06CC\u0646 (\u0627\u0633\u0644\u06CC\u067E \u0631\u0648\u0648\u0644)" },
  { n: 27, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u200C\u0647\u0627\u06CC \u0628\u0627\u0644\u0627\u062A\u0646\u0647)" },
  { n: 28, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u200C\u0647\u0627\u06CC \u0628\u0627\u0644\u0627\u062A\u0646\u0647)" },
  { n: 29, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u200C\u0647\u0627\u06CC \u0628\u0627\u0644\u0627\u062A\u0646\u0647)" },
  { n: 30, t: "\u062A\u0645\u0631\u06CC\u0646 (\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC\u200C\u0647\u0627\u06CC \u0628\u0627\u0644\u0627\u062A\u0646\u0647)" }
];
const CURRICULUM_FIGHT = Array.from({ length: 30 }, (_, i) => ({
  n: i + 1,
  t: "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u062D\u062A\u0648\u0627"
}));
const CURRICULUM_PARTNER = Array.from({ length: 30 }, (_, i) => ({
  n: i + 1,
  t: "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u062D\u062A\u0648\u0627"
}));
const CURRICULUM_FOCUS = Array.from({ length: 30 }, (_, i) => ({
  n: i + 1,
  t: "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u062D\u062A\u0648\u0627"
}));
const HIGHLIGHT_YELLOW = /* @__PURE__ */ new Set([30]);
const DEFAULT_CHAPTER_TITLES = {
  basic: "\u0622\u0645\u0648\u0632\u0634 \u067E\u0627\u06CC\u0647 \u06AF\u0627\u0631\u062F",
  advanced: "\u0622\u0645\u0648\u0632\u0634 \u0636\u0631\u0628\u0627\u062A",
  extra: "\u0622\u0645\u0648\u0632\u0634 \u062C\u0627\u0628\u062C\u0627\u06CC\u06CC",
  fight: "\u062A\u06A9\u0646\u06CC\u06A9\u200C\u0647\u0627\u06CC \u062A\u062E\u0635\u0635\u06CC \u0628\u0648\u06A9\u0633",
  partner: "\u0627\u0633\u067E\u0627\u0631\u06CC\u0646\u06AF / \u062A\u0645\u0631\u06CC\u0646 \u0645\u0628\u0627\u0631\u0632\u0647",
  focus: "\u0642\u0627\u0644\u0628 \u0627\u0633\u062A\u0627\u06CC\u0644 / \u0645\u0628\u0627\u0631\u0632\u0647"
};
const INVITE_SHARE_TITLE = "\u0622\u0645\u0648\u0632\u0634 \u0628\u0648\u06A9\u0633 \u062D\u0631\u0641\u0647\u200C\u0627\u06CC";
const INVITE_SHARE_TEXT = "\u{1F947}\u0627\u0648\u0644\u06CC\u0646 \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u0622\u0645\u0648\u0632\u0634 \u0628\u0648\u06A9\u0633 \u062D\u0631\u0641\u0647 \u0627\u06CC \u{1F947}\n\u062D\u062A\u0645\u0627 \u0627\u0645\u062A\u062D\u0627\u0646\u0634 \u06A9\u0646 \u{1F339}";
const INVITE_SHARE_URL = "https://YOUR_APP_LINK";
function PlayIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M8 5v14l11-7z" }));
}
function PauseIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "currentColor" }, /* @__PURE__ */ React.createElement("rect", { x: "6", y: "5", width: "4", height: "14", rx: "1" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "5", width: "4", height: "14", rx: "1" }));
}
function MuteIcon({ className, muted }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 9v6h4l5 4V5L8 9H4z", fill: "currentColor", stroke: "none" }), muted ? /* @__PURE__ */ React.createElement("path", { d: "M16 9l5 6M21 9l-5 6" }) : /* @__PURE__ */ React.createElement("path", { d: "M16.5 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14" }));
}
function ExpandIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" }));
}
function UploadCloudIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M7 18a4 4 0 0 1-1-7.9A5 5 0 0 1 16 8a4 4 0 0 1 1 7.9" }), /* @__PURE__ */ React.createElement("path", { d: "M12 12v7M9 15l3-3 3 3" }));
}
function formatTime(sec) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}
const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5];
const SEEK_STEP_SECONDS = 10;
const CONTROLS_HIDE_MS = 3e3;
const DOUBLE_TAP_MS = 280;
const videoPosterCache = /* @__PURE__ */ new Map();
const POSTER_MAX_WIDTH = 640;
const POSTER_PROBE_TIMEOUT_MS = 4e3;
function shouldCapturePoster() {
  const memory = typeof navigator !== "undefined" ? navigator.deviceMemory : void 0;
  return !(memory && memory <= 2);
}
function captureVideoPoster(src, isCancelled, timeoutMs = 15e3) {
  return new Promise((resolve) => {
    const probe = document.createElement("video");
    let settled = false;
    let timer = null;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      probe.onloadedmetadata = null;
      probe.onseeked = null;
      probe.onerror = null;
      probe.removeAttribute("src");
      try {
        probe.load();
      } catch (e) {
      }
      resolve(value);
    };
    timer = setTimeout(() => finish(null), timeoutMs);
    probe.crossOrigin = "anonymous";
    probe.muted = true;
    probe.playsInline = true;
    probe.preload = "metadata";
    probe.onloadedmetadata = () => {
      if (isCancelled == null ? void 0 : isCancelled()) return finish(null);
      const target = Math.min(1, Math.max(0.05, (probe.duration || 1) * 0.1));
      try {
        probe.currentTime = target;
      } catch (e) {
        finish(null);
      }
    };
    probe.onseeked = () => {
      try {
        const w = probe.videoWidth;
        const h = probe.videoHeight;
        if (!w || !h) return finish(null);
        const scale = Math.min(1, POSTER_MAX_WIDTH / w);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(w * scale);
        canvas.height = Math.round(h * scale);
        canvas.getContext("2d").drawImage(probe, 0, 0, canvas.width, canvas.height);
        finish(canvas.toDataURL("image/jpeg", 0.72));
      } catch (e) {
        finish(null);
      }
    };
    probe.onerror = () => finish(null);
    probe.src = src;
  });
}
function SkipIcon({ className, forward }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, forward ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 1 1-3-6.7L21 8" }), /* @__PURE__ */ React.createElement("path", { d: "M21 3v5h-5" })) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 1 0 3-6.7L3 8" }), /* @__PURE__ */ React.createElement("path", { d: "M3 3v5h5" })), /* @__PURE__ */ React.createElement("text", { x: "12", y: "15.5", textAnchor: "middle", fontSize: "8", fontWeight: "700", fill: "currentColor", stroke: "none", fontFamily: "Oswald, sans-serif" }, "10"));
}
function ReplayIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 1 0 3-6.7L3 8" }), /* @__PURE__ */ React.createElement("path", { d: "M3 3v5h5" }));
}
function ShrinkIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" }));
}
function VideoPlayer({ src, onComplete, onTick, storageScope }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const barRef = useRef(null);
  const tapTimerRef = useRef(null);
  const flashTimerRef = useRef(null);
  const noteTimerRef = useRef(null);
  const lastTapRef = useRef(0);
  const draggingRef = useRef(false);
  const lastTimeRef = useRef(0);
  const lastSavedRef = useRef(0);
  const endedRef = useRef(false);
  const pendingSeekRef = useRef(0);
  const speedRef = useRef(1);
  const playIntentRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedPct, setBufferedPct] = useState(0);
  const [buffering, setBuffering] = useState(false);
  const [error, setError] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [interactionTick, setInteractionTick] = useState(0);
  const [dragRatio, setDragRatio] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [flash, setFlash] = useState(null);
  const [resumeNote, setResumeNote] = useState("");
  const [poster, setPoster] = useState(() => videoPosterCache.get(src) || null);
  const [mediaReady, setMediaReady] = useState(() => videoPosterCache.has(src) || !shouldCapturePoster());
  const playingRef = useRef(false);
  const showControlsRef = useRef(true);
  const speedMenuOpenRef = useRef(false);
  playingRef.current = playing;
  showControlsRef.current = showControls;
  speedMenuOpenRef.current = speedMenuOpen;
  const posKey = storageScope ? accountKey(storageScope, `video-pos:${src}`) : `video-pos:${src}`;
  const netState = useConnectivity();
  const prevNetStateRef = useRef(netState);
  const [slowBuffer, setSlowBuffer] = useState(false);
  const revealControls = () => {
    setShowControls(true);
    setInteractionTick((t) => t + 1);
  };
  useEffect(() => {
    setPlaying(false);
    setEnded(false);
    setCurrent(0);
    setDuration(0);
    setBufferedPct(0);
    setBuffering(false);
    setError(false);
    setShowControls(true);
    setSpeedMenuOpen(false);
    setDragRatio(null);
    setResumeNote("");
    endedRef.current = false;
    lastTimeRef.current = 0;
    lastSavedRef.current = 0;
    pendingSeekRef.current = 0;
    return () => {
      const t = Math.floor(lastTimeRef.current);
      if (!endedRef.current && t >= 5) AppStorage.set(posKey, String(t));
    };
  }, [src]);
  useEffect(() => {
    const cached = videoPosterCache.get(src);
    setPoster(cached || null);
    if (cached || !shouldCapturePoster()) {
      setMediaReady(true);
      return;
    }
    setMediaReady(false);
    playIntentRef.current = false;
    let cancelled = false;
    captureVideoPoster(src, () => cancelled, POSTER_PROBE_TIMEOUT_MS).then((url) => {
      if (cancelled) return;
      if (url) {
        videoPosterCache.set(src, url);
        setPoster(url);
      }
      setMediaReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [src]);
  useEffect(() => {
    var _a2, _b2, _c;
    if (mediaReady && playIntentRef.current) {
      playIntentRef.current = false;
      (_c = (_b2 = (_a2 = videoRef.current) == null ? void 0 : _a2.play()) == null ? void 0 : _b2.catch) == null ? void 0 : _c.call(_b2, () => {
      });
    }
  }, [mediaReady]);
  const applySpeed = (value) => {
    speedRef.current = value;
    setSpeed(value);
    const v = videoRef.current;
    if (v) {
      v.defaultPlaybackRate = value;
      v.playbackRate = value;
    }
  };
  useEffect(() => {
    AppStorage.get("video-speed").then((stored) => {
      const n = Number(stored);
      if (PLAYBACK_SPEEDS.includes(n)) applySpeed(n);
    });
  }, []);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => onTick == null ? void 0 : onTick(), 1e3);
    return () => clearInterval(id);
  }, [playing]);
  useEffect(() => {
    if (!showControls || !playing || speedMenuOpen || dragRatio !== null) return;
    const id = setTimeout(() => setShowControls(false), CONTROLS_HIDE_MS);
    return () => clearTimeout(id);
  }, [showControls, playing, speedMenuOpen, dragRatio, interactionTick]);
  useEffect(() => {
    const onVisibility = () => {
      var _a2;
      if (document.hidden) (_a2 = videoRef.current) == null ? void 0 : _a2.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    const onChange = () => {
      var _a2, _b2;
      const active = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
      setIsFullscreen(active);
      if (!active) {
        try {
          (_b2 = (_a2 = screen.orientation) == null ? void 0 : _a2.unlock) == null ? void 0 : _b2.call(_a2);
        } catch (e) {
        }
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      var _a2;
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        (_a2 = document.exitFullscreen || document.webkitExitFullscreen) == null ? void 0 : _a2.call(document);
      }
    };
  }, []);
  useEffect(() => {
    return () => {
      clearTimeout(tapTimerRef.current);
      clearTimeout(flashTimerRef.current);
      clearTimeout(noteTimerRef.current);
    };
  }, []);
  const togglePlay = () => {
    var _a2, _b2;
    const v = videoRef.current;
    if (!v) return;
    if (!mediaReady) {
      playIntentRef.current = true;
      return;
    }
    if (v.ended) v.currentTime = 0;
    if (v.paused || v.ended) {
      (_b2 = (_a2 = v.play()) == null ? void 0 : _a2.catch) == null ? void 0 : _b2.call(_a2, () => {
      });
    } else {
      v.pause();
    }
  };
  const showSkipFlash = (side, seconds) => {
    setFlash((f) => ({ side, total: f && f.side === side ? f.total + seconds : seconds }));
    clearTimeout(flashTimerRef.current);
    flashTimerRef.current = setTimeout(() => setFlash(null), 700);
  };
  const skip = (delta) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    v.currentTime = Math.min(Math.max(0, v.currentTime + delta), v.duration);
    lastTimeRef.current = v.currentTime;
    setCurrent(v.currentTime);
    showSkipFlash(delta < 0 ? "back" : "fwd", Math.abs(delta));
  };
  const handleSurfaceTap = (e) => {
    var _a2;
    const rect = (_a2 = containerRef.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const now = Date.now();
    if (now - lastTapRef.current < DOUBLE_TAP_MS) {
      lastTapRef.current = 0;
      clearTimeout(tapTimerRef.current);
      if (x < 0.35) skip(-SEEK_STEP_SECONDS);
      else if (x > 0.65) skip(SEEK_STEP_SECONDS);
      else togglePlay();
      return;
    }
    lastTapRef.current = now;
    clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => {
      if (speedMenuOpenRef.current) {
        setSpeedMenuOpen(false);
        return;
      }
      if (!playingRef.current) {
        togglePlay();
        return;
      }
      if (showControlsRef.current) setShowControls(false);
      else revealControls();
    }, DOUBLE_TAP_MS);
  };
  const updateBuffered = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const t = v.currentTime;
    let end = 0;
    for (let i = 0; i < v.buffered.length; i++) {
      if (v.buffered.start(i) <= t + 0.5 && v.buffered.end(i) >= t) end = v.buffered.end(i);
    }
    setBufferedPct(end / v.duration * 100);
  };
  const persistPosition = () => {
    const t = Math.floor(lastTimeRef.current);
    if (t < 5) return;
    lastSavedRef.current = t;
    AppStorage.set(posKey, String(t));
  };
  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    lastTimeRef.current = v.currentTime;
    if (!draggingRef.current) setCurrent(v.currentTime);
    updateBuffered();
    if (Math.abs(v.currentTime - lastSavedRef.current) >= 5) persistPosition();
  };
  const onLoadedMeta = async () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration);
    v.defaultPlaybackRate = speedRef.current;
    v.playbackRate = speedRef.current;
    if (pendingSeekRef.current > 0) {
      v.currentTime = pendingSeekRef.current;
      pendingSeekRef.current = 0;
      return;
    }
    const stored = Number(await AppStorage.get(posKey));
    if (stored > 5 && v.duration && stored < v.duration - 5 && v.currentTime < 1) {
      v.currentTime = stored;
      setCurrent(stored);
      setResumeNote(`\u0627\u062F\u0627\u0645\u0647 \u0627\u0632 ${formatTime(stored)}`);
      clearTimeout(noteTimerRef.current);
      noteTimerRef.current = setTimeout(() => setResumeNote(""), 3e3);
    }
  };
  const handleRetry = () => {
    var _a2, _b2;
    const v = videoRef.current;
    if (!v) return;
    pendingSeekRef.current = lastTimeRef.current;
    setError(false);
    setBuffering(true);
    v.load();
    (_b2 = (_a2 = v.play()) == null ? void 0 : _a2.catch) == null ? void 0 : _b2.call(_a2, () => {
    });
  };
  useEffect(() => {
    const was = prevNetStateRef.current;
    prevNetStateRef.current = netState;
    if (error && was !== "ok" && netState === "ok") {
      const id = setTimeout(handleRetry, 500);
      return () => clearTimeout(id);
    }
  }, [netState]);
  useEffect(() => {
    if (!buffering) {
      setSlowBuffer(false);
      return;
    }
    const id = setTimeout(() => {
      setSlowBuffer(true);
      pingServer();
    }, 6e3);
    return () => clearTimeout(id);
  }, [buffering]);
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    revealControls();
  };
  const toggleFullscreen = async () => {
    var _a2, _b2;
    const el = containerRef.current;
    if (!el) return;
    revealControls();
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        await (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      } else {
        const request = el.requestFullscreen || el.webkitRequestFullscreen;
        if (!request) return;
        await request.call(el);
        try {
          await ((_b2 = (_a2 = screen.orientation) == null ? void 0 : _a2.lock) == null ? void 0 : _b2.call(_a2, "landscape"));
        } catch (e) {
        }
      }
    } catch (e) {
    }
  };
  const ratioFromPointer = (e) => {
    const rect = barRef.current.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
  };
  const onBarPointerDown = (e) => {
    var _a2, _b2;
    if (!duration) return;
    (_b2 = (_a2 = e.currentTarget).setPointerCapture) == null ? void 0 : _b2.call(_a2, e.pointerId);
    draggingRef.current = true;
    setDragRatio(ratioFromPointer(e));
    revealControls();
  };
  const onBarPointerMove = (e) => {
    if (draggingRef.current) setDragRatio(ratioFromPointer(e));
  };
  const finishBarDrag = (e, commit) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const v = videoRef.current;
    if (commit && v && v.duration) {
      const target = ratioFromPointer(e) * v.duration;
      v.currentTime = target;
      lastTimeRef.current = target;
      setCurrent(target);
    }
    setDragRatio(null);
    revealControls();
  };
  const progressPct = dragRatio !== null ? dragRatio * 100 : duration ? current / duration * 100 : 0;
  const displayTime = dragRatio !== null ? dragRatio * duration : current;
  const controlsVisible = showControls || !playing || error;
  const uiPointer = controlsVisible ? "auto" : "none";
  const roundBtn = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "9999px",
    background: "rgba(11,11,13,0.55)",
    border: "1px solid rgba(243,238,230,0.18)",
    color: "#F3EEE6"
  };
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ref: containerRef,
      "data-fast-tap": "true",
      dir: "ltr",
      style: {
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "#000",
        aspectRatio: "16 / 9",
        borderRadius: isFullscreen ? 0 : "12px",
        touchAction: "manipulation"
      },
      onContextMenu: (e) => e.preventDefault()
    },
    /* @__PURE__ */ React.createElement("style", null, `
        @keyframes vpSpin { to { transform: rotate(360deg); } }
        @keyframes vpFlash { 0% { opacity: 0; transform: scale(0.9); } 15% { opacity: 1; transform: scale(1); } 100% { opacity: 0.9; } }
      `),
    /* @__PURE__ */ React.createElement(
      "video",
      {
        ref: videoRef,
        src: mediaReady ? `${src}#t=0.1` : void 0,
        poster: poster || void 0,
        preload: "metadata",
        style: { width: "100%", height: "100%", objectFit: "contain", display: "block" },
        onTimeUpdate,
        onProgress: updateBuffered,
        onLoadedMetadata: onLoadedMeta,
        onPlay: () => {
          setPlaying(true);
          setEnded(false);
          endedRef.current = false;
        },
        onPause: () => {
          setPlaying(false);
          persistPosition();
        },
        onPlaying: () => setBuffering(false),
        onWaiting: () => setBuffering(true),
        onSeeking: () => setBuffering(true),
        onSeeked: () => setBuffering(false),
        onCanPlay: () => setBuffering(false),
        onError: () => {
          setBuffering(false);
          setPlaying(false);
          setError(true);
          pingServer();
        },
        onEnded: () => {
          setPlaying(false);
          setEnded(true);
          endedRef.current = true;
          AppStorage.remove(posKey);
          lastSavedRef.current = 0;
          onComplete == null ? void 0 : onComplete();
        },
        onContextMenu: (e) => e.preventDefault(),
        controlsList: "nodownload noremoteplayback",
        disablePictureInPicture: true,
        disableRemotePlayback: true,
        playsInline: true
      }
    ),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        onClick: handleSurfaceTap,
        style: { position: "absolute", inset: 0 }
      }
    ),
    /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 8, right: 8, width: 14, height: 14, borderTop: "2px solid #D91E2B", borderRight: "2px solid #D91E2B", pointerEvents: "none" } }),
    /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 8, left: 8, width: 14, height: 14, borderBottom: "2px solid #E8B33D", borderLeft: "2px solid #E8B33D", pointerEvents: "none" } }),
    flash && /* @__PURE__ */ React.createElement(
      "div",
      {
        key: flash.total + flash.side,
        style: {
          position: "absolute",
          top: "50%",
          [flash.side === "back" ? "left" : "right"]: "10%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          animation: "vpFlash 700ms ease-out both",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          color: "#F3EEE6",
          textShadow: "0 1px 4px rgba(0,0,0,0.9)"
        }
      },
      /* @__PURE__ */ React.createElement(SkipIcon, { forward: flash.side === "fwd", className: "w-8 h-8" }),
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", fontSize: 11, fontWeight: 700 } }, flash.total.toLocaleString("fa-IR"), " \u062B\u0627\u0646\u06CC\u0647")
    ),
    resumeNote && /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          background: "rgba(11,11,13,0.8)",
          border: "1px solid rgba(232,179,61,0.5)",
          borderRadius: 9999,
          padding: "4px 12px",
          fontFamily: "Vazirmatn, sans-serif",
          fontSize: 11,
          color: "#E8B33D",
          whiteSpace: "nowrap"
        }
      },
      resumeNote
    ),
    error && /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          background: "rgba(11,11,13,0.88)",
          textAlign: "center",
          padding: 16
        }
      },
      netState !== "ok" && /* @__PURE__ */ React.createElement(WifiOffIcon, { className: "w-7 h-7", style: { color: "#D91E2B" } }),
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", fontSize: 13 } }, netState === "blocked" ? NETWORK_BLOCKED_MESSAGE : netState === "offline" ? NETWORK_OFFLINE_MESSAGE : netState === "weak" ? "\u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0636\u0639\u06CC\u0641 \u0627\u0633\u062A" : "\u067E\u062E\u0634 \u0648\u06CC\u062F\u06CC\u0648 \u0628\u0627 \u0645\u0634\u06A9\u0644 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646."),
      netState !== "blocked" && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#E8B33D", fontSize: 11 } }, NETWORK_VPN_HINT),
      netState !== "ok" && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790", fontSize: 11 } }, "\u0648\u0642\u062A\u06CC \u0627\u062A\u0635\u0627\u0644 \u0628\u0631\u0642\u0631\u0627\u0631 \u0634\u062F\u060C \u067E\u062E\u0634 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u062F\u0627\u0645\u0647 \u067E\u06CC\u062F\u0627 \u0645\u06CC\u200C\u06A9\u0646\u0647"),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: handleRetry,
          style: { fontFamily: "Vazirmatn, sans-serif", background: "#D91E2B", color: "#F3EEE6", fontSize: 12, fontWeight: 700, borderRadius: 8, padding: "8px 18px", marginTop: 4 }
        },
        "\u062A\u0644\u0627\u0634 \u0645\u062C\u062F\u062F"
      )
    ),
    (buffering || !mediaReady) && !error && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, pointerEvents: "none" } }, /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          width: 38,
          height: 38,
          borderRadius: "50%",
          border: "3px solid rgba(243,238,230,0.25)",
          borderTopColor: "#E8B33D",
          animation: "vpSpin 0.8s linear infinite"
        }
      }
    ), (netState === "offline" || netState === "blocked" || slowBuffer || netState === "weak") && /* @__PURE__ */ React.createElement(
      "span",
      {
        style: {
          fontFamily: "Vazirmatn, sans-serif",
          fontSize: 12,
          color: "#F3EEE6",
          background: "rgba(11,11,13,0.78)",
          border: `1px solid ${netState === "offline" ? "#D91E2B" : "#E8B33D"}`,
          borderRadius: 9999,
          padding: "3px 12px"
        }
      },
      netState === "blocked" ? NETWORK_BLOCKED_MESSAGE : netState === "offline" ? NETWORK_OFFLINE_MESSAGE : "\u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0636\u0639\u06CC\u0641 \u0627\u0633\u062A"
    )),
    !error && /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
          pointerEvents: "none",
          opacity: controlsVisible && !buffering ? 1 : 0,
          transition: "opacity 200ms"
        }
      },
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            skip(-SEEK_STEP_SECONDS);
            revealControls();
          },
          "aria-label": "\u06F1\u06F0 \u062B\u0627\u0646\u06CC\u0647 \u0639\u0642\u0628",
          style: __spreadProps(__spreadValues({}, roundBtn), { width: 40, height: 40, pointerEvents: uiPointer })
        },
        /* @__PURE__ */ React.createElement(SkipIcon, { className: "w-6 h-6" })
      ),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            togglePlay();
            revealControls();
          },
          "aria-label": playing ? "\u062A\u0648\u0642\u0641" : "\u067E\u062E\u0634",
          style: {
            width: 58,
            height: 58,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "9999px",
            background: "rgba(217,30,43,0.92)",
            boxShadow: "0 0 20px rgba(217,30,43,0.55)",
            color: "#F3EEE6",
            pointerEvents: uiPointer
          }
        },
        ended ? /* @__PURE__ */ React.createElement(ReplayIcon, { className: "w-6 h-6", style: { color: "#F3EEE6" } }) : playing ? /* @__PURE__ */ React.createElement(PauseIcon, { className: "w-6 h-6", style: { color: "#F3EEE6" } }) : /* @__PURE__ */ React.createElement(PlayIcon, { className: "w-6 h-6", style: { color: "#F3EEE6", marginRight: "-2px" } })
      ),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            skip(SEEK_STEP_SECONDS);
            revealControls();
          },
          "aria-label": "\u06F1\u06F0 \u062B\u0627\u0646\u06CC\u0647 \u062C\u0644\u0648",
          style: __spreadProps(__spreadValues({}, roundBtn), { width: 40, height: 40, pointerEvents: uiPointer })
        },
        /* @__PURE__ */ React.createElement(SkipIcon, { forward: true, className: "w-6 h-6" })
      )
    ),
    speedMenuOpen && controlsVisible && /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          position: "absolute",
          right: 10,
          bottom: 52,
          display: "flex",
          flexDirection: "column",
          background: "rgba(23,22,26,0.96)",
          border: "1px solid #2a292e",
          borderRadius: 10,
          overflow: "hidden",
          zIndex: 2
        }
      },
      PLAYBACK_SPEEDS.map((s) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: s,
          onClick: () => {
            applySpeed(s);
            AppStorage.set("video-speed", String(s));
            setSpeedMenuOpen(false);
            revealControls();
          },
          style: {
            fontFamily: "Oswald, sans-serif",
            fontSize: 12,
            padding: "5px 18px",
            color: s === speed ? "#E8B33D" : "#DAD6CE",
            fontWeight: s === speed ? 700 : 400,
            background: s === speed ? "rgba(232,179,61,0.12)" : "transparent",
            textAlign: "center"
          }
        },
        s,
        "x"
      ))
    ),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "22px 12px 6px",
          background: "linear-gradient(to top, rgba(0,0,0,0.88), transparent)",
          opacity: controlsVisible ? 1 : 0,
          transition: "opacity 200ms",
          pointerEvents: "none"
        }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          ref: barRef,
          onPointerDown: onBarPointerDown,
          onPointerMove: onBarPointerMove,
          onPointerUp: (e) => finishBarDrag(e, true),
          onPointerCancel: (e) => finishBarDrag(e, false),
          style: { height: 24, display: "flex", alignItems: "center", cursor: "pointer", touchAction: "none", pointerEvents: uiPointer, position: "relative" }
        },
        /* @__PURE__ */ React.createElement(
          "div",
          {
            style: {
              position: "relative",
              width: "100%",
              height: dragRatio !== null ? 6 : 4,
              borderRadius: 9999,
              background: "rgba(255,255,255,0.25)",
              transition: "height 120ms"
            }
          },
          /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, top: 0, bottom: 0, width: `${bufferedPct}%`, borderRadius: 9999, background: "rgba(255,255,255,0.35)" } }),
          /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, top: 0, bottom: 0, width: `${progressPct}%`, borderRadius: 9999, background: "linear-gradient(90deg,#D91E2B,#E8B33D)" } }),
          /* @__PURE__ */ React.createElement(
            "div",
            {
              style: {
                position: "absolute",
                top: "50%",
                left: `${progressPct}%`,
                width: dragRatio !== null ? 16 : 12,
                height: dragRatio !== null ? 16 : 12,
                borderRadius: "50%",
                background: "#E8B33D",
                boxShadow: "0 0 8px rgba(232,179,61,0.7)",
                transform: "translate(-50%,-50%)",
                transition: "width 120ms, height 120ms"
              }
            }
          ),
          dragRatio !== null && /* @__PURE__ */ React.createElement(
            "div",
            {
              style: {
                position: "absolute",
                bottom: 18,
                left: `${Math.min(92, Math.max(8, progressPct))}%`,
                transform: "translateX(-50%)",
                background: "rgba(11,11,13,0.92)",
                border: "1px solid #E8B33D",
                borderRadius: 6,
                padding: "2px 7px",
                fontFamily: "Oswald, sans-serif",
                fontSize: 11,
                color: "#F3EEE6",
                whiteSpace: "nowrap"
              }
            },
            formatTime(displayTime)
          )
        )
      ),
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", pointerEvents: uiPointer } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: toggleMute, "aria-label": muted ? "\u067E\u062E\u0634 \u0635\u062F\u0627" : "\u0628\u06CC\u200C\u0635\u062F\u0627", style: { padding: 4, color: "#F3EEE6" } }, /* @__PURE__ */ React.createElement(MuteIcon, { className: "w-5 h-5", muted, style: { color: "#F3EEE6" } })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Oswald, sans-serif", color: "#DAD6CE", fontSize: 11 } }, formatTime(displayTime), " / ", formatTime(duration))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            setSpeedMenuOpen((o) => !o);
            revealControls();
          },
          "aria-label": "\u0633\u0631\u0639\u062A \u067E\u062E\u0634",
          style: {
            fontFamily: "Oswald, sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: speed === 1 ? "#F3EEE6" : "#E8B33D",
            border: `1px solid ${speed === 1 ? "rgba(243,238,230,0.35)" : "#E8B33D"}`,
            borderRadius: 6,
            padding: "2px 8px"
          }
        },
        speed,
        "x"
      ), /* @__PURE__ */ React.createElement("button", { onClick: toggleFullscreen, "aria-label": "\u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647", style: { padding: 4, color: "#F3EEE6" } }, isFullscreen ? /* @__PURE__ */ React.createElement(ShrinkIcon, { className: "w-5 h-5", style: { color: "#F3EEE6" } }) : /* @__PURE__ */ React.createElement(ExpandIcon, { className: "w-5 h-5", style: { color: "#F3EEE6" } }))))
    )
  );
}
function setScreenCaptureBlocked(blocked) {
  var _a2, _b2, _c, _d;
  const PS = (_b2 = (_a2 = window.Capacitor) == null ? void 0 : _a2.Plugins) == null ? void 0 : _b2.PrivacyScreen;
  if (!PS) return;
  if (blocked) (_c = PS.enable) == null ? void 0 : _c.call(PS).catch(() => {
  });
  else (_d = PS.disable) == null ? void 0 : _d.call(PS).catch(() => {
  });
}
function LessonScreen({ item, videoSrc, curriculumKey, isAdmin, authToken, accountId, videosStatus, onRetryVideos, onUploaded, onRename, onComplete, onPracticeTick, onBack }) {
  const connectivityState = useConnectivity();
  const fileRef = useRef(null);
  const isHi = HIGHLIGHT_YELLOW.has(item.n);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(item.t);
  const [savingTitle, setSavingTitle] = useState(false);
  useEffect(() => {
    setScreenCaptureBlocked(true);
    return () => setScreenCaptureBlocked(false);
  }, []);
  const handleFile = (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (!file) return;
    setError("");
    setProgress(0);
    setUploading(true);
    const form = new FormData();
    form.append("video", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE_URL}/videos/${curriculumKey}/${item.n}`);
    xhr.setRequestHeader("Authorization", `Bearer ${authToken}`);
    xhr.upload.onprogress = (ev) => {
      if (ev.lengthComputable) {
        setProgress(Math.round(ev.loaded / ev.total * 100));
      }
    };
    xhr.onload = () => {
      setUploading(false);
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && data.ok) {
          onUploaded(toAbsoluteVideoUrl(data.url));
        } else {
          setError(data.error || "\u0622\u067E\u0644\u0648\u062F \u0648\u06CC\u062F\u06CC\u0648 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
        }
      } catch (e2) {
        setError("\u0622\u067E\u0644\u0648\u062F \u0648\u06CC\u062F\u06CC\u0648 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
      }
    };
    xhr.onerror = () => {
      setUploading(false);
      setError(NETWORK_OFFLINE_MESSAGE);
      pingServer();
    };
    xhr.send(form);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto px-4 pt-3 pb-6", dir: "rtl" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onBack,
      style: {
        color: "#0B0B0D",
        fontFamily: "Vazirmatn, sans-serif",
        background: "#DAD6CE"
      },
      className: "text-sm mb-3 rounded-lg px-3 py-1.5 font-bold inline-block"
    },
    "\u203A \u0628\u0627\u0632\u06AF\u0634\u062A"
  ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-4" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "rounded-full flex items-center justify-center shrink-0",
      style: {
        width: "28px",
        height: "28px",
        background: isHi ? "#E8B33D" : "#17161A",
        border: `1.5px solid ${isHi ? "#E8B33D" : "#D91E2B"}`
      }
    },
    /* @__PURE__ */ React.createElement(
      "span",
      {
        style: {
          fontFamily: "Oswald, sans-serif",
          color: isHi ? "#0B0B0D" : "#F3EEE6",
          fontSize: "11px"
        },
        className: "font-bold"
      },
      item.n
    )
  ), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-base font-black leading-6 flex-1" }, item.t), isAdmin && !editingTitle && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setTitleDraft(item.t);
        setEditingTitle(true);
      },
      className: "shrink-0 rounded-full p-1.5",
      style: { background: "#17161A", border: "1px solid #2a292e" }
    },
    /* @__PURE__ */ React.createElement(PencilIcon, { className: "w-3.5 h-3.5", style: { color: "#E8B33D" } })
  )), isAdmin && editingTitle && /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "flex items-center gap-2 mb-4 rounded-xl px-3 py-2 border",
      style: { background: "#17161A", borderColor: "#2a292e" }
    },
    /* @__PURE__ */ React.createElement(
      "input",
      {
        value: titleDraft,
        onChange: (e) => setTitleDraft(e.target.value),
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" },
        className: "bg-transparent outline-none flex-1 text-sm",
        autoFocus: true
      }
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        disabled: savingTitle || !titleDraft.trim(),
        onClick: async () => {
          setSavingTitle(true);
          try {
            await (onRename == null ? void 0 : onRename(titleDraft.trim()));
            setEditingTitle(false);
          } catch (e) {
          } finally {
            setSavingTitle(false);
          }
        },
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", background: "#D91E2B" },
        className: "rounded-lg px-3 py-1.5 text-xs font-bold shrink-0"
      },
      savingTitle ? "..." : "\u0630\u062E\u06CC\u0631\u0647"
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setEditingTitle(false),
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" },
        className: "text-xs shrink-0"
      },
      "\u0627\u0646\u0635\u0631\u0627\u0641"
    )
  ), videoSrc ? /* @__PURE__ */ React.createElement(VideoPlayer, { src: videoSrc, onComplete, onTick: onPracticeTick, storageScope: accountId }) : uploading ? /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "relative w-full rounded-xl flex flex-col items-center justify-center gap-3 border",
      style: { aspectRatio: "16 / 9", background: "#141317", borderColor: "#2a292e" }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Oswald, sans-serif", color: "#E8B33D" }, className: "text-lg font-bold" }, progress, "%"),
    /* @__PURE__ */ React.createElement("div", { className: "w-2/3 rounded-full overflow-hidden", style: { height: "5px", background: "#2a292e" } }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "h-full rounded-full",
        style: { width: `${progress}%`, background: "linear-gradient(90deg,#D91E2B,#E8B33D)" }
      }
    )),
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-xs" }, "\u062F\u0631 \u062D\u0627\u0644 \u0622\u067E\u0644\u0648\u062F \u0648\u06CC\u062F\u06CC\u0648\u2026")
  ) : connectivityState !== "ok" ? /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "relative w-full rounded-xl flex flex-col items-center justify-center gap-2 border px-4 text-center",
      style: { aspectRatio: "16 / 9", background: "#141317", borderColor: "#2a292e" }
    },
    /* @__PURE__ */ React.createElement(WifiOffIcon, { className: "w-8 h-8", style: { color: "#D91E2B" } }),
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-sm" }, connectivityState === "blocked" ? NETWORK_BLOCKED_MESSAGE : connectivityState === "weak" ? "\u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0636\u0639\u06CC\u0641 \u0627\u0633\u062A" : NETWORK_OFFLINE_MESSAGE),
    connectivityState !== "blocked" && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#E8B33D" }, className: "text-xs" }, NETWORK_VPN_HINT),
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-xs" }, "\u0648\u0642\u062A\u06CC \u0627\u062A\u0635\u0627\u0644 \u0628\u0631\u0642\u0631\u0627\u0631 \u0634\u062F\u060C \u0648\u06CC\u062F\u06CC\u0648 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0645\u06CC\u200C\u0634\u0647")
  ) : videosStatus === "loading" ? /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "relative w-full rounded-xl flex flex-col items-center justify-center gap-2 border px-4 text-center",
      style: { aspectRatio: "16 / 9", background: "#141317", borderColor: "#2a292e" }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-sm" }, "\u062F\u0631 \u062D\u0627\u0644 \u062F\u0631\u06CC\u0627\u0641\u062A \u0644\u06CC\u0633\u062A \u0648\u06CC\u062F\u06CC\u0648\u0647\u0627\u2026")
  ) : videosStatus === "error" ? /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-testid": "videos-load-failed",
      className: "relative w-full rounded-xl flex flex-col items-center justify-center gap-2 border px-4 text-center",
      style: { aspectRatio: "16 / 9", background: "#141317", borderColor: "#2a292e" }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-sm" }, "\u0644\u06CC\u0633\u062A \u0648\u06CC\u062F\u06CC\u0648\u0647\u0627 \u062F\u0631\u06CC\u0627\u0641\u062A \u0646\u0634\u062F"),
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#E8B33D" }, className: "text-xs leading-6" }, "\u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u062F\u0633\u062A\u06AF\u0627\u0647 \u0631\u0627 \u0686\u06A9 \u06A9\u0646\u06CC\u062F \u0648 ", NETWORK_VPN_HINT),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onRetryVideos,
        style: { fontFamily: "Vazirmatn, sans-serif", background: "#D91E2B", color: "#F3EEE6" },
        className: "rounded-lg px-5 py-2 text-xs font-bold"
      },
      "\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647"
    )
  ) : isAdmin ? /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        var _a2;
        return (_a2 = fileRef.current) == null ? void 0 : _a2.click();
      },
      className: "relative w-full rounded-xl flex flex-col items-center justify-center gap-2 border",
      style: { aspectRatio: "16 / 9", background: "#141317", borderColor: "#2a292e" }
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "absolute inset-0",
        style: {
          backgroundImage: "repeating-linear-gradient(135deg, transparent 0 16px, rgba(217,30,43,0.06) 16px 17px, transparent 17px 33px)"
        }
      }
    ),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "relative rounded-full flex items-center justify-center",
        style: { width: "48px", height: "48px", background: "rgba(217,30,43,0.12)", border: "1px solid rgba(217,30,43,0.4)" }
      },
      /* @__PURE__ */ React.createElement(UploadCloudIcon, { className: "w-6 h-6", style: { color: "#D91E2B" } })
    ),
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "relative text-xs" }, "\u0622\u067E\u0644\u0648\u062F \u0648\u06CC\u062F\u06CC\u0648\u06CC \u0627\u06CC\u0646 \u062C\u0644\u0633\u0647")
  ) : /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "relative w-full rounded-xl flex flex-col items-center justify-center gap-2 border",
      style: { aspectRatio: "16 / 9", background: "#141317", borderColor: "#2a292e" }
    },
    /* @__PURE__ */ React.createElement(GloveIcon, { className: "w-8 h-8", style: { color: "#3a393e" } }),
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }, className: "text-xs" }, "\u0648\u06CC\u062F\u06CC\u0648\u06CC \u0627\u06CC\u0646 \u062C\u0644\u0633\u0647 \u0647\u0646\u0648\u0632 \u0627\u0636\u0627\u0641\u0647 \u0646\u0634\u062F\u0647")
  ), /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "video/*", onChange: handleFile, className: "hidden" }), error && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }, className: "text-xs text-center mt-2" }, error), videoSrc && isAdmin && !uploading && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        var _a2;
        return (_a2 = fileRef.current) == null ? void 0 : _a2.click();
      },
      style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790", border: "1px solid #2a292e" },
      className: "mt-3 w-full rounded-lg py-2.5 text-xs"
    },
    "\u062A\u0639\u0648\u06CC\u0636 \u0648\u06CC\u062F\u06CC\u0648"
  ), /* @__PURE__ */ React.createElement("div", { className: "mt-6 rounded-xl p-4", style: { background: "#17161A", border: "1px solid #232227" } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-xs leading-6" }, "\xA9 \u062A\u0645\u0627\u0645\u06CC \u062D\u0642\u0648\u0642 \u0627\u06CC\u0646 \u0648\u06CC\u062F\u06CC\u0648 \u0645\u062A\u0639\u0644\u0642 \u0628\u0647 \u0622\u06A9\u0627\u062F\u0645\u06CC \u0622\u0645\u0648\u0632\u0634 \u0628\u0648\u06A9\u0633 \u0646\u0627\u0635\u0631\u06CC \u0627\u0633\u062A. \u0647\u0631\u06AF\u0648\u0646\u0647 \u06A9\u067E\u06CC\u200C\u0628\u0631\u062F\u0627\u0631\u06CC\u060C \u062F\u0627\u0646\u0644\u0648\u062F \u06CC\u0627 \u0628\u0627\u0632\u0646\u0634\u0631 \u0622\u0646 \u0628\u062F\u0648\u0646 \u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u06A9\u062A\u0628\u06CC\u060C \u067E\u06CC\u06AF\u0631\u062F \u0642\u0627\u0646\u0648\u0646\u06CC \u062F\u0627\u0631\u062F.")));
}
const FREE_LESSONS_COUNT = 5;
function CurriculumScreen({ title, items, onBack, onSelect, hasVideo, plan, onLockedSelect, isCompleted, curriculumKey, isAdmin, onRename }) {
  const isGoldChapter = ["fight", "partner", "focus"].includes(curriculumKey);
  const hasAccess = isAdmin || (isGoldChapter ? plan === "gold" : plan === "silver");
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title);
  const [savingTitle, setSavingTitle] = useState(false);
  return /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto px-4 pt-3 pb-6", dir: "rtl" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onBack,
      style: {
        color: "#0B0B0D",
        fontFamily: "Vazirmatn, sans-serif",
        background: "#DAD6CE"
      },
      className: "text-sm mb-3 rounded-lg px-3 py-1.5 font-bold inline-block"
    },
    "\u203A \u0628\u0627\u0632\u06AF\u0634\u062A"
  ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(
    "h1",
    {
      style: {
        fontFamily: "Vazirmatn, sans-serif",
        color: "#F3EEE6",
        textShadow: "0 0 12px rgba(95,211,232,0.85), 0 0 24px rgba(95,211,232,0.5)"
      },
      className: "text-base font-black text-center leading-6"
    },
    title
  ), isAdmin && !editingTitle && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setTitleDraft(title);
        setEditingTitle(true);
      },
      className: "shrink-0 rounded-full p-1.5",
      style: { background: "#17161A", border: "1px solid #2a292e" }
    },
    /* @__PURE__ */ React.createElement(PencilIcon, { className: "w-3.5 h-3.5", style: { color: "#E8B33D" } })
  )), isAdmin && editingTitle && /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "flex items-center gap-2 mb-3 rounded-xl px-3 py-2 border",
      style: { background: "#17161A", borderColor: "#2a292e" }
    },
    /* @__PURE__ */ React.createElement(
      "input",
      {
        value: titleDraft,
        onChange: (e) => setTitleDraft(e.target.value),
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" },
        className: "bg-transparent outline-none flex-1 text-sm",
        autoFocus: true
      }
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        disabled: savingTitle || !titleDraft.trim(),
        onClick: async () => {
          setSavingTitle(true);
          try {
            await (onRename == null ? void 0 : onRename(titleDraft.trim()));
            setEditingTitle(false);
          } catch (e) {
          } finally {
            setSavingTitle(false);
          }
        },
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", background: "#D91E2B" },
        className: "rounded-lg px-3 py-1.5 text-xs font-bold shrink-0"
      },
      savingTitle ? "..." : "\u0630\u062E\u06CC\u0631\u0647"
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setEditingTitle(false),
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" },
        className: "text-xs shrink-0"
      },
      "\u0627\u0646\u0635\u0631\u0627\u0641"
    )
  ), /* @__PURE__ */ React.createElement("div", { className: "w-full rounded-full mb-4", style: { background: "#D91E2B", height: "3px" } }), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-5 gap-x-1.5 gap-y-3" }, items.map((it) => {
    const isHi = HIGHLIGHT_YELLOW.has(it.n);
    const hasVid = hasVideo == null ? void 0 : hasVideo(it.n);
    const locked = it.n > FREE_LESSONS_COUNT && !hasAccess;
    const done = isCompleted == null ? void 0 : isCompleted(it.n);
    const squareColor = done ? "#1FA855" : isGoldChapter ? "#E8B33D" : "#D91E2B";
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: it.n,
        onClick: () => locked ? onLockedSelect == null ? void 0 : onLockedSelect() : onSelect(it),
        className: "flex flex-col items-center active:scale-95 transition-transform"
      },
      /* @__PURE__ */ React.createElement("div", { className: "relative w-full aspect-square" }, /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "absolute -inset-1.5 rounded-xl",
          style: {
            background: `radial-gradient(circle, ${squareColor}80 0%, ${squareColor}00 72%)`,
            filter: "blur(3px)"
          }
        }
      ), /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "relative w-full h-full rounded-lg overflow-hidden",
          style: {
            background: "#17161A",
            border: `1.5px solid ${squareColor}`
          }
        },
        /* @__PURE__ */ React.createElement(
          "img",
          {
            src: LOGO_SRC,
            alt: "",
            className: "absolute inset-0 w-full h-full object-cover",
            style: { opacity: 0.35 }
          }
        ),
        /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0", style: { background: "rgba(11,11,13,0.35)" } }),
        locked ? /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex items-center justify-center", style: { background: "rgba(0,0,0,0.45)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "12px", lineHeight: 1 } }, "\u{1F512}")) : hasVid && /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "rounded-full flex items-center justify-center",
            style: { width: "16px", height: "16px", background: isGoldChapter ? "rgba(232,179,61,0.9)" : "rgba(217,30,43,0.85)" }
          },
          /* @__PURE__ */ React.createElement(
            "div",
            {
              style: {
                width: 0,
                height: 0,
                borderTop: "3px solid transparent",
                borderBottom: "3px solid transparent",
                borderRight: "5px solid #F3EEE6",
                marginRight: "2px"
              }
            }
          )
        )),
        /* @__PURE__ */ React.createElement(
          "span",
          {
            style: {
              fontFamily: "Oswald, sans-serif",
              color: isHi ? "#E8B33D" : "#F3EEE6",
              fontSize: "9px",
              textShadow: "0 1px 3px rgba(0,0,0,0.9)",
              top: "3px",
              right: "3px"
            },
            className: "absolute font-bold"
          },
          it.n
        )
      )),
      /* @__PURE__ */ React.createElement(
        "span",
        {
          style: {
            fontFamily: "Vazirmatn, sans-serif",
            color: "#F3EEE6",
            fontSize: "3.8px",
            lineHeight: 1.15
          },
          className: "text-center mt-1 break-words block"
        },
        it.t
      )
    );
  })));
}
function CheckIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6L9 17l-5-5" }));
}
const PLAN_TONES = {
  silver: {
    background: "linear-gradient(145deg, #3b4150 0%, #1e2129 46%, #2f3541 100%)",
    border: "1px solid rgba(214,226,245,0.6)",
    shadow: "0 0 26px rgba(160,190,255,0.30), 0 8px 30px rgba(0,0,0,0.5), inset 0 0 18px rgba(255,255,255,0.07)",
    glow: "rgba(170,200,255,0.5)",
    shine: "rgba(255,255,255,0.24)",
    spark: "#EAF1FF"
  },
  gold: {
    background: "linear-gradient(145deg, #5e4510 0%, #2a1f0a 46%, #4d3811 100%)",
    border: "1px solid rgba(255,214,102,0.7)",
    shadow: "0 0 28px rgba(255,170,40,0.34), 0 8px 30px rgba(0,0,0,0.5), inset 0 0 18px rgba(255,214,102,0.10)",
    glow: "rgba(255,190,70,0.55)",
    shine: "rgba(255,236,170,0.28)",
    spark: "#FFE9A8"
  }
};
const PLAN_CARD_CSS = `
  .plan-glow { position: absolute; inset: 0; pointer-events: none; animation: planGlow 3.6s ease-in-out infinite; will-change: opacity; }
  .plan-shine { position: absolute; top: 0; bottom: 0; left: 0; width: 38%; pointer-events: none; transform: translateX(-140%) skewX(-18deg); animation: planShine 5.5s ease-in-out infinite; will-change: transform; }
  .plan-spark { position: absolute; pointer-events: none; font-size: 12px; opacity: 0; animation: planSpark 3s ease-in-out infinite; }
  .plan-float { display: inline-block; animation: planFloat 2.6s ease-in-out infinite; }
  .plan-cta { animation: planCta 2.6s ease-in-out infinite; will-change: transform; }
  @keyframes planGlow { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
  @keyframes planShine { 0% { transform: translateX(-140%) skewX(-18deg); } 55%, 100% { transform: translateX(380%) skewX(-18deg); } }
  @keyframes planSpark { 0%, 100% { opacity: 0; transform: scale(0.6); } 50% { opacity: 1; transform: scale(1.15); } }
  @keyframes planFloat { 0%, 100% { transform: translateY(-2px); } 50% { transform: translateY(2px); } }
  @keyframes planCta { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.025); } }
  @media (prefers-reduced-motion: reduce) {
    .plan-glow, .plan-shine, .plan-spark, .plan-float, .plan-cta { animation: none !important; }
    .plan-glow { opacity: 0.8; }
  }
`;
function PlanCard({ tone, delay = 0, className = "", children }) {
  const t = PLAN_TONES[tone];
  const sparks = [
    { top: "14px", right: "18px", d: 0 },
    { top: "64px", left: "16px", d: 1.1 },
    { bottom: "96px", right: "26px", d: 2 }
  ];
  return /* @__PURE__ */ React.createElement("div", { "data-testid": `plan-card-${tone}`, className: `relative rounded-2xl overflow-hidden ${className}`, style: { background: t.background, border: t.border, boxShadow: t.shadow } }, /* @__PURE__ */ React.createElement("div", { className: "plan-glow", style: { background: `radial-gradient(ellipse at 50% -15%, ${t.glow}, transparent 64%)`, animationDelay: `${delay}s` } }), /* @__PURE__ */ React.createElement("div", { className: "plan-shine", style: { background: `linear-gradient(90deg, transparent, ${t.shine}, transparent)`, animationDelay: `${delay}s` } }), sparks.map((sp, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "plan-spark", style: { top: sp.top, bottom: sp.bottom, left: sp.left, right: sp.right, color: t.spark, animationDelay: `${sp.d + delay}s` } }, "\u2726")), /* @__PURE__ */ React.createElement("div", { className: "relative p-5" }, children));
}
const DEFAULT_PROMO_TEXT = "\u{1F525} \u062A\u062E\u0641\u06CC\u0641 \u0648\u06CC\u0698\u0647\u200C\u06CC \u0622\u063A\u0627\u0632\u06CC\u0646!\n\u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0627\u0634\u062A\u0631\u0627\u06A9\u062A \u0631\u0648 \u0628\u06AF\u06CC\u0631 \u0648 \u0645\u0633\u06CC\u0631 \u0642\u0647\u0631\u0645\u0627\u0646\u06CC \u0631\u0648 \u0634\u0631\u0648\u0639 \u06A9\u0646";
const PROMO_TEXT_MAX = 100;
function PromoBanner({ text, isAdmin, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const shown = text || DEFAULT_PROMO_TEXT;
  const save = async (value) => {
    setSaving(true);
    setError("");
    try {
      await onSave(value);
      setEditing(false);
    } catch (err) {
      setError(err.message || "\u0630\u062E\u06CC\u0631\u0647 \u0646\u0634\u062F");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-testid": "promo-banner",
      className: "relative w-full rounded-2xl overflow-hidden mb-4",
      style: {
        background: "linear-gradient(120deg, #5B21B6 0%, #C026D3 52%, #06B6D4 100%)",
        border: "1px solid rgba(255,255,255,0.28)",
        // درخشش ثابت (سبک برای گوشی)؛ «زنده بودن» از لایه‌های متحرک زیر میاد که فقط opacity/transform عوض می‌کنن
        boxShadow: "0 0 30px rgba(192,38,211,0.50), 0 0 60px rgba(91,33,182,0.32), inset 0 0 18px rgba(255,255,255,0.12)"
      }
    },
    /* @__PURE__ */ React.createElement("style", null, `
        @keyframes promoPulse { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.95; } }
        @keyframes promoShine { 0% { transform: translateX(-130%) skewX(-18deg); } 60%, 100% { transform: translateX(260%) skewX(-18deg); } }
        @media (prefers-reduced-motion: reduce) { .promo-anim { animation: none !important; } }
      `),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "promo-anim absolute inset-0 pointer-events-none",
        style: { background: "radial-gradient(ellipse at 50% 120%, rgba(6,182,212,0.75), transparent 62%)", animation: "promoPulse 3.2s ease-in-out infinite", willChange: "opacity" }
      }
    ),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "promo-anim absolute top-0 bottom-0 pointer-events-none",
        style: { width: "40%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent)", animation: "promoShine 4.5s ease-in-out infinite", willChange: "transform" }
      }
    ),
    editing ? /* @__PURE__ */ React.createElement("div", { className: "relative p-3" }, /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: draft,
        onChange: (e) => setDraft(e.target.value.slice(0, PROMO_TEXT_MAX)),
        rows: 2,
        maxLength: PROMO_TEXT_MAX,
        dir: "rtl",
        placeholder: "\u0645\u062A\u0646 \u062A\u0628\u0644\u06CC\u063A\u0627\u062A\u06CC (\u062D\u062F\u0627\u06A9\u062B\u0631 \u062F\u0648 \u062E\u0637)",
        style: { fontFamily: "Vazirmatn, sans-serif", background: "rgba(11,11,13,0.45)", color: "#fff", border: "1px solid rgba(255,255,255,0.35)", lineHeight: 1.75, resize: "none" },
        className: "w-full rounded-xl px-3 py-2 text-sm text-center outline-none"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mt-2 gap-2" }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Oswald, sans-serif", color: "rgba(255,255,255,0.8)" }, className: "text-xs" }, draft.length, "/", PROMO_TEXT_MAX), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => save(""),
        disabled: saving,
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#fff", border: "1px solid rgba(255,255,255,0.45)" },
        className: "rounded-lg px-3 py-1.5 text-xs"
      },
      "\u0645\u062A\u0646 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setEditing(false),
        disabled: saving,
        style: { fontFamily: "Vazirmatn, sans-serif", color: "#fff", border: "1px solid rgba(255,255,255,0.45)" },
        className: "rounded-lg px-3 py-1.5 text-xs"
      },
      "\u0627\u0646\u0635\u0631\u0627\u0641"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => save(draft),
        disabled: saving,
        style: { fontFamily: "Vazirmatn, sans-serif", background: "#fff", color: "#5B21B6" },
        className: "rounded-lg px-4 py-1.5 text-xs font-black"
      },
      saving ? "\u2026" : "\u0630\u062E\u06CC\u0631\u0647"
    ))), error && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#FFE4E6" }, className: "text-xs mt-2 text-center" }, error)) : /* @__PURE__ */ React.createElement("div", { className: "relative flex items-center justify-center px-12", style: { height: "80px" } }, /* @__PURE__ */ React.createElement(
      "p",
      {
        "data-testid": "promo-text",
        style: {
          fontFamily: "Vazirmatn, sans-serif",
          color: "#fff",
          lineHeight: 1.8,
          fontSize: "14px",
          fontWeight: 800,
          textAlign: "center",
          whiteSpace: "pre-line",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textShadow: "0 1px 10px rgba(0,0,0,0.45)"
        }
      },
      shown
    ), isAdmin && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setDraft(text || DEFAULT_PROMO_TEXT);
          setError("");
          setEditing(true);
        },
        "aria-label": "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0645\u062A\u0646 \u062A\u0628\u0644\u06CC\u063A\u0627\u062A\u06CC",
        className: "absolute rounded-full flex items-center justify-center",
        style: { top: "8px", left: "8px", width: "28px", height: "28px", background: "rgba(11,11,13,0.4)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff" }
      },
      /* @__PURE__ */ React.createElement(PencilIcon, { className: "w-3.5 h-3.5" })
    ))
  );
}
function SubscriptionScreen({ plan, planExpiresAt, authToken, isLoggedIn, onPlanConfirmed, chapterVisibility, chapterTitles, promoText, isAdmin, onSavePromoText }) {
  const chapterName = (key) => (chapterTitles == null ? void 0 : chapterTitles[key]) || DEFAULT_CHAPTER_TITLES[key];
  const silverChapterNames = ["basic", "advanced", "extra"].map(chapterName).join("\u060C ");
  const goldChapterNames = ["fight", "partner", "focus"].map(chapterName).join("\u060C ");
  const goldUnlocked = Boolean((chapterVisibility == null ? void 0 : chapterVisibility.fight) || (chapterVisibility == null ? void 0 : chapterVisibility.partner) || (chapterVisibility == null ? void 0 : chapterVisibility.focus));
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!isLoggedIn || plan !== "none") return;
    apiCheckPlanStatus(authToken).then(({ plan: confirmed, planExpiresAt: expiresAt }) => {
      if (confirmed && confirmed !== "none") onPlanConfirmed == null ? void 0 : onPlanConfirmed(confirmed, expiresAt);
    });
  }, [isLoggedIn, plan, authToken]);
  const ORIGINAL_PRICE_DISPLAY = "\u06F2,\u06F0\u06F0\u06F0,\u06F0\u06F0\u06F0";
  const handleBuy = async (planKey) => {
    setError("");
    if (!isLoggedIn) {
      setError("\u0627\u0648\u0644 \u0628\u0627\u06CC\u062F \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628\u062A \u0628\u0634\u06CC");
      return;
    }
    setLoadingPlan(planKey);
    if (DEMO_MODE) {
      await new Promise((r) => setTimeout(r, 500));
      const twoYearsFromNow = Date.now() + 2 * 365 * 24 * 60 * 60 * 1e3;
      onPlanConfirmed == null ? void 0 : onPlanConfirmed(planKey, twoYearsFromNow);
      setLoadingPlan(null);
      return;
    }
    try {
      const url = await apiCreatePayment(authToken, planKey);
      window.location.href = url;
    } catch (err) {
      setError(err.message || "\u0627\u062A\u0635\u0627\u0644 \u0628\u0647 \u062F\u0631\u06AF\u0627\u0647 \u067E\u0631\u062F\u0627\u062E\u062A \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
    } finally {
      setLoadingPlan(null);
    }
  };
  const badgeSrc = plan === "gold" ? MEDAL_GOLD_SRC : plan === "silver" ? MEDAL_SILVER_SRC : MEDAL_BRONZE_SRC;
  const badgeLabel = plan === "gold" ? "\u0627\u0634\u062A\u0631\u0627\u06A9 \u0637\u0644\u0627\u06CC\u06CC" : plan === "silver" ? "\u0627\u0634\u062A\u0631\u0627\u06A9 \u0646\u0642\u0631\u0647\u200C\u0627\u06CC" : "\u0627\u0634\u062A\u0631\u0627\u06A9 \u0628\u0631\u0646\u0632\u06CC";
  return /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto px-5 pt-3 pb-6", dir: "rtl" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center text-center mb-6 mt-2" }, /* @__PURE__ */ React.createElement("div", { className: "relative flex items-center justify-center mb-3" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "absolute rounded-full",
      style: {
        width: "180px",
        height: "180px",
        background: "radial-gradient(circle, rgba(95,211,232,0.28) 0%, rgba(95,211,232,0.12) 45%, transparent 72%)",
        filter: "blur(2px)"
      }
    }
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "relative w-36 h-36 rounded-full flex items-center justify-center overflow-hidden",
      style: {
        background: "conic-gradient(from 90deg, #E8B33D, #D91E2B, #E8B33D)",
        padding: "3px"
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "w-full h-full rounded-full overflow-hidden", style: { background: "#0B0B0D" } }, /* @__PURE__ */ React.createElement("img", { src: badgeSrc, alt: plan, className: "w-full h-full object-cover" }))
  )), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-xl font-black mb-3" }, badgeLabel), /* @__PURE__ */ React.createElement(PromoBanner, { text: promoText, isAdmin, onSave: onSavePromoText }), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790", maxWidth: "280px" }, className: "text-xs leading-6" }, "\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u062F\u0648\u0631\u0647\u200C\u0647\u0627\u06CC \u0622\u0645\u0648\u0632\u0634\u06CC \u0631\u0648 \u0628\u0627 \u06CC\u06A9\u06CC \u0627\u0632 \u0627\u06CC\u0646 \u062F\u0648 \u067E\u0644\u0646 \u0628\u0627\u0632 \u06A9\u0646")), /* @__PURE__ */ React.createElement("style", null, PLAN_CARD_CSS), /* @__PURE__ */ React.createElement(PlanCard, { tone: "silver", className: "mb-5" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-1" }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", textShadow: "0 0 12px rgba(190,215,255,0.55)" }, className: "text-base font-black" }, /* @__PURE__ */ React.createElement("span", { className: "plan-float" }, "\u{1F948}"), " \u0627\u0634\u062A\u0631\u0627\u06A9 \u0646\u0642\u0631\u0647\u200C\u0627\u06CC")), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#DAD6CE" }, className: "text-base font-bold text-center mb-4" }, "(\u06F1\u06F2 \u0645\u0627\u0647\u0647)"), /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline justify-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Oswald, sans-serif", color: "#696469", textDecoration: "line-through" }, className: "text-lg" }, ORIGINAL_PRICE_DISPLAY), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Oswald, sans-serif", color: "#FFFFFF", textShadow: "0 0 14px rgba(190,215,255,0.65)" }, className: "text-3xl font-black" }, "\u06F1,\u06F4\u06F9\u06F0,\u06F0\u06F0\u06F0"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#B5BAC6" }, className: "text-sm" }, "\u062A\u0648\u0645\u0627\u0646")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-center mb-5" }, /* @__PURE__ */ React.createElement(
    "span",
    {
      style: { fontFamily: "Vazirmatn, sans-serif", color: "#3DE08A", background: "rgba(31,168,85,0.18)", border: "1px solid rgba(61,224,138,0.35)" },
      className: "text-[11px] font-bold rounded-full px-3 py-1"
    },
    "\u062A\u062E\u0641\u06CC\u0641 \u0622\u063A\u0627\u0632\u06CC\u0646"
  )), /* @__PURE__ */ React.createElement(
    "p",
    {
      style: { fontFamily: "Vazirmatn, sans-serif", color: "#DAD6CE" },
      className: "text-xs leading-6 text-center mb-5"
    },
    "\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u06F3 \u0641\u0635\u0644 (",
    silverChapterNames,
    ")"
  ), plan === "silver" || plan === "gold" ? /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "rounded-xl py-3 text-center",
      style: { background: "rgba(192,192,192,0.12)", border: "1px solid rgba(192,192,192,0.4)" }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#DADADA" }, className: "text-sm font-bold" }, "\u0639\u0636\u0648\u06CC\u062A \u0646\u0642\u0631\u0647\u200C\u0627\u06CC \u062A\u0648 \u0641\u0639\u0627\u0644\u0647 \u2713"),
    planExpiresAt && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-xs mt-1" }, "\u0645\u0639\u062A\u0628\u0631 \u062A\u0627 ", formatExpiryDate(planExpiresAt))
  ) : /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleBuy("silver"),
      disabled: loadingPlan === "silver",
      style: {
        fontFamily: "Vazirmatn, sans-serif",
        background: loadingPlan === "silver" ? "#1f3a28" : "linear-gradient(135deg, #1FA855, #2fd37a)",
        color: loadingPlan === "silver" ? "#5a7a63" : "#F3EEE6",
        boxShadow: loadingPlan === "silver" ? "none" : "0 0 18px rgba(47,211,122,0.5)"
      },
      className: `w-full rounded-xl py-3.5 font-bold text-sm transition-colors ${loadingPlan === "silver" ? "" : "plan-cta"}`
    },
    loadingPlan === "silver" ? "\u062F\u0631 \u062D\u0627\u0644 \u0627\u062A\u0635\u0627\u0644 \u0628\u0647 \u062F\u0631\u06AF\u0627\u0647\u2026" : "\u062E\u0631\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9 \u0646\u0642\u0631\u0647\u200C\u0627\u06CC"
  )), /* @__PURE__ */ React.createElement(PlanCard, { tone: "gold", delay: 1.4, className: "mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-1" }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#FFF1CC", textShadow: "0 0 14px rgba(255,190,70,0.7)" }, className: "text-base font-black" }, /* @__PURE__ */ React.createElement("span", { className: "plan-float" }, "\u{1F3C5}"), " \u0627\u0634\u062A\u0631\u0627\u06A9 \u0637\u0644\u0627\u06CC\u06CC")), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#DAD6CE" }, className: "text-base font-bold text-center mb-4" }, "(\u06F1\u06F2 \u0645\u0627\u0647\u0647)"), /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline justify-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Oswald, sans-serif", color: "#696469", textDecoration: "line-through" }, className: "text-lg" }, ORIGINAL_PRICE_DISPLAY), /* @__PURE__ */ React.createElement(
    "span",
    {
      style: {
        fontFamily: "Oswald, sans-serif",
        background: "linear-gradient(90deg, #FFE08A, #FFB347)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "#FFD36B",
        filter: "drop-shadow(0 0 10px rgba(255,170,40,0.55))"
      },
      className: "text-3xl font-black"
    },
    "\u06F1,\u06F4\u06F9\u06F0,\u06F0\u06F0\u06F0"
  ), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#C9B98E" }, className: "text-sm" }, "\u062A\u0648\u0645\u0627\u0646")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-center mb-5" }, /* @__PURE__ */ React.createElement(
    "span",
    {
      style: { fontFamily: "Vazirmatn, sans-serif", color: "#FFD36B", background: "rgba(232,179,61,0.18)", border: "1px solid rgba(255,214,102,0.4)" },
      className: "text-[11px] font-bold rounded-full px-3 py-1"
    },
    "\u062A\u062E\u0641\u06CC\u0641 \u0622\u063A\u0627\u0632\u06CC\u0646"
  )), /* @__PURE__ */ React.createElement(
    "p",
    {
      style: { fontFamily: "Vazirmatn, sans-serif", color: "#DAD6CE" },
      className: "text-xs leading-6 text-center mb-5"
    },
    "\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u06F3 \u0641\u0635\u0644 (",
    goldChapterNames,
    ")"
  ), plan === "gold" ? /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "rounded-xl py-3 text-center",
      style: { background: "rgba(232,179,61,0.12)", border: "1px solid rgba(232,179,61,0.4)" }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#E8B33D" }, className: "text-sm font-bold" }, "\u0639\u0636\u0648\u06CC\u062A \u0637\u0644\u0627\u06CC\u06CC \u062A\u0648 \u0641\u0639\u0627\u0644\u0647 \u2713"),
    planExpiresAt && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-xs mt-1" }, "\u0645\u0639\u062A\u0628\u0631 \u062A\u0627 ", formatExpiryDate(planExpiresAt))
  ) : goldUnlocked ? /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleBuy("gold"),
      disabled: loadingPlan === "gold",
      style: {
        fontFamily: "Vazirmatn, sans-serif",
        background: loadingPlan === "gold" ? "#4a3a1f" : "linear-gradient(135deg, #E8B33D, #FFD36B)",
        color: loadingPlan === "gold" ? "#8a7550" : "#17161A",
        boxShadow: loadingPlan === "gold" ? "none" : "0 0 18px rgba(255,190,70,0.55)"
      },
      className: `w-full rounded-xl py-3.5 font-bold text-sm transition-colors ${loadingPlan === "gold" ? "" : "plan-cta"}`
    },
    loadingPlan === "gold" ? "\u062F\u0631 \u062D\u0627\u0644 \u0627\u062A\u0635\u0627\u0644 \u0628\u0647 \u062F\u0631\u06AF\u0627\u0647\u2026" : "\u062E\u0631\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9 \u0637\u0644\u0627\u06CC\u06CC"
  ) : /* @__PURE__ */ React.createElement(
    "button",
    {
      disabled: true,
      style: {
        fontFamily: "Vazirmatn, sans-serif",
        background: "#5c564e",
        color: "#9a948a",
        cursor: "not-allowed"
      },
      className: "w-full rounded-xl py-3.5 font-bold text-sm"
    },
    "\u0628\u0647\u200C\u0632\u0648\u062F\u06CC \u0641\u0639\u0627\u0644 \u0645\u06CC\u200C\u0634\u0647"
  )), error && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }, className: "text-xs text-center mt-2" }, error), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }, className: "text-xs text-center leading-6 mt-5" }, "\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0632 \u0637\u0631\u06CC\u0642 \u062F\u0631\u06AF\u0627\u0647 \u0627\u0645\u0646 \u0632\u0631\u06CC\u0646\u200C\u067E\u0627\u0644 \u0627\u0646\u062C\u0627\u0645 \u0645\u06CC\u200C\u0634\u0648\u062F."));
}
function ComingSoonScreen({ title, onBack }) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col items-center justify-center px-8 text-center", dir: "rtl" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "w-16 h-16 rounded-full flex items-center justify-center mb-5",
      style: { background: "rgba(232,179,61,0.12)", border: "1px solid rgba(232,179,61,0.4)" }
    },
    /* @__PURE__ */ React.createElement(BeltIcon, { className: "w-7 h-7", style: { color: "#E8B33D" } })
  ), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }, className: "text-lg font-black mb-2" }, title), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "Vazirmatn, sans-serif", color: "#8A8790" }, className: "text-sm leading-7 mb-8" }, "\u0633\u0631\u0641\u0635\u0644\u200C\u0647\u0627\u06CC \u0627\u06CC\u0646 \u0628\u062E\u0634 \u0628\u0647\u200C\u0632\u0648\u062F\u06CC \u0627\u0636\u0627\u0641\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F."), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onBack,
      style: { fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE", color: "#0B0B0D" },
      className: "rounded-xl py-3 px-8 font-bold text-sm"
    },
    "\u0628\u0627\u0632\u06AF\u0634\u062A"
  ));
}
function UserIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "8", r: "3.5" }), /* @__PURE__ */ React.createElement("path", { d: "M4.5 20c1.5-4 4-5.5 7.5-5.5s6 1.5 7.5 5.5" }));
}
function HomeIcon({ className }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", className, fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M12 3l9 8h-2.5v9h-5v-6h-3v6h-5v-9H3z" }));
}
function BottomTabs({ active, onNavigate }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "relative grid pt-2 pb-3 border-t shrink-0",
      style: { background: "#0B0B0D", borderColor: "#1c1b1f", gridTemplateColumns: "1fr 1fr 1fr" },
      dir: "rtl"
    },
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => onNavigate == null ? void 0 : onNavigate("profile"),
        className: "flex flex-col items-center gap-1 justify-self-center"
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "rounded-full flex items-center justify-center",
          style: {
            width: "44px",
            height: "44px",
            background: active === "profile" ? "#D91E2B" : "#17161A",
            border: `2px solid ${active === "profile" ? "#F3EEE6" : "#2a292e"}`,
            boxShadow: active === "profile" ? "0 0 14px rgba(217,30,43,0.5)" : "none"
          }
        },
        /* @__PURE__ */ React.createElement(UserIcon, { className: "w-5 h-5", style: { color: active === "profile" ? "#F3EEE6" : "#55535a" } })
      ),
      /* @__PURE__ */ React.createElement(
        "span",
        {
          style: {
            fontFamily: "Vazirmatn, sans-serif",
            color: active === "profile" ? "#F3EEE6" : "#55535a",
            fontSize: "9px"
          }
        },
        "\u067E\u0646\u0644 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC"
      )
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => onNavigate == null ? void 0 : onNavigate("home"),
        className: "flex flex-col items-center justify-self-center",
        style: { marginTop: "-28px" }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "rounded-full flex items-center justify-center",
          style: {
            width: "56px",
            height: "56px",
            background: active === "home" ? "#D91E2B" : "#17161A",
            border: `2px solid ${active === "home" ? "#F3EEE6" : "#2a292e"}`,
            boxShadow: active === "home" ? "0 0 18px rgba(217,30,43,0.55)" : "none"
          }
        },
        /* @__PURE__ */ React.createElement(HomeIcon, { className: "w-6 h-6", style: { color: active === "home" ? "#F3EEE6" : "#55535a" } })
      ),
      /* @__PURE__ */ React.createElement(
        "span",
        {
          style: {
            fontFamily: "Oswald, sans-serif",
            color: active === "home" ? "#F3EEE6" : "#55535a",
            fontSize: "9px"
          },
          className: "mt-1"
        },
        "home"
      )
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => onNavigate == null ? void 0 : onNavigate("subscription"),
        className: "flex flex-col items-center gap-1 justify-self-center"
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "rounded-full flex items-center justify-center",
          style: {
            width: "44px",
            height: "44px",
            background: active === "subscription" ? "#D91E2B" : "#17161A",
            border: `2px solid ${active === "subscription" ? "#F3EEE6" : "#2a292e"}`,
            boxShadow: active === "subscription" ? "0 0 14px rgba(217,30,43,0.5)" : "none"
          }
        },
        /* @__PURE__ */ React.createElement(
          "span",
          {
            style: {
              fontFamily: "Oswald, sans-serif",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "0.03em",
              color: active === "subscription" ? "#F3EEE6" : "#55535a"
            }
          },
          "VIP"
        )
      ),
      /* @__PURE__ */ React.createElement(
        "span",
        {
          style: {
            fontFamily: "Vazirmatn, sans-serif",
            color: active === "subscription" ? "#F3EEE6" : "#55535a",
            fontSize: "9px"
          }
        },
        "\u0627\u0634\u062A\u0631\u0627\u06A9"
      )
    )
  );
}
const CHAPTER_ORDER = ["basic", "advanced", "extra", "fight", "partner", "focus"];
const PLACEHOLDER_LESSON_TITLE = "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u062D\u062A\u0648\u0627";
const REMINDER_NOTIFICATION_ID = 1001;
function computeNextLesson(lastLesson, chaptersByKey, availableKeys) {
  const isReal = (it) => Boolean(it && it.t && it.t !== PLACEHOLDER_LESSON_TITLE);
  const toResult = (key, it) => ({ curriculumKey: key, n: it.n, title: it.t });
  const firstRealOfChaptersAfter = (afterIndex) => {
    for (let i = afterIndex + 1; i < CHAPTER_ORDER.length; i++) {
      const key = CHAPTER_ORDER[i];
      if (!availableKeys.includes(key)) continue;
      const first = (chaptersByKey[key] || [])[0];
      if (isReal(first)) return toResult(key, first);
    }
    return null;
  };
  if (!lastLesson) return firstRealOfChaptersAfter(-1);
  const items = chaptersByKey[lastLesson.curriculumKey] || [];
  const following = items.find((it) => it.n === lastLesson.n + 1);
  if (isReal(following)) return toResult(lastLesson.curriculumKey, following);
  return firstRealOfChaptersAfter(CHAPTER_ORDER.indexOf(lastLesson.curriculumKey));
}
function buildReminderText(next) {
  if (!next) {
    return { title: "\u0648\u0642\u062A \u0645\u0631\u0648\u0631 \u062A\u0645\u0631\u06CC\u0646\u0647 \u{1F94A}", body: "\u0647\u0645\u0647\u200C\u06CC \u062C\u0644\u0633\u0647\u200C\u0647\u0627\u06CC \u0641\u0639\u0644\u06CC \u0631\u0648 \u062F\u06CC\u062F\u06CC\u061B \u0627\u0645\u0631\u0648\u0632 \u06CC\u0647 \u0645\u0631\u0648\u0631 \u0633\u0631\u06CC\u0639 \u062A\u0645\u0631\u06CC\u0646\u200C\u0647\u0627\u06CC \u0642\u0628\u0644\u06CC \u0628\u06A9\u0646" };
  }
  return {
    title: "\u0648\u0642\u062A \u062A\u0645\u0631\u06CC\u0646\u0647 \u{1F94A}",
    body: `\u062C\u0644\u0633\u0647\u200C\u06CC ${next.n.toLocaleString("fa-IR")}: \xAB${next.title}\xBB \u0645\u0646\u062A\u0638\u0631\u062A\u0647`
  };
}
function nextReminderDate(timeStr) {
  const [hh, mm] = String(timeStr || "18:00").split(":").map(Number);
  const now = /* @__PURE__ */ new Date();
  const target = /* @__PURE__ */ new Date();
  target.setHours(Number.isNaN(hh) ? 18 : hh, Number.isNaN(mm) ? 0 : mm, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  return target;
}
let browserReminderTimer = null;
async function cancelReminder() {
  var _a2, _b2;
  clearTimeout(browserReminderTimer);
  const LocalNotifications = (_b2 = (_a2 = window.Capacitor) == null ? void 0 : _a2.Plugins) == null ? void 0 : _b2.LocalNotifications;
  if (!LocalNotifications) return;
  try {
    await LocalNotifications.cancel({ notifications: [{ id: REMINDER_NOTIFICATION_ID }] });
  } catch (e) {
  }
}
async function armReminder(timeStr, next, askPermission) {
  var _a2, _b2;
  if (!/^\d{1,2}:\d{2}$/.test(String(timeStr || ""))) return "invalid";
  const target = nextReminderDate(timeStr);
  const text = buildReminderText(next);
  const LocalNotifications = (_b2 = (_a2 = window.Capacitor) == null ? void 0 : _a2.Plugins) == null ? void 0 : _b2.LocalNotifications;
  if (LocalNotifications) {
    try {
      let perm = await LocalNotifications.checkPermissions();
      if (perm.display !== "granted" && askPermission) perm = await LocalNotifications.requestPermissions();
      if (perm.display !== "granted") return "denied";
      await LocalNotifications.cancel({ notifications: [{ id: REMINDER_NOTIFICATION_ID }] });
      await LocalNotifications.schedule({
        notifications: [
          {
            id: REMINDER_NOTIFICATION_ID,
            title: text.title,
            body: text.body,
            schedule: { at: target, allowWhileIdle: true },
            smallIcon: "ic_stat_glove"
          }
        ]
      });
      return "scheduled";
    } catch (e) {
    }
  }
  if (askPermission && typeof Notification !== "undefined" && Notification.permission === "default") {
    try {
      await Notification.requestPermission();
    } catch (e) {
    }
  }
  clearTimeout(browserReminderTimer);
  browserReminderTimer = setTimeout(() => {
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      try {
        new Notification(text.title, { body: text.body, icon: SPLASH_LOGO_SRC });
        return;
      } catch (e) {
      }
    }
    alert(`${text.title}
${text.body}`);
  }, target.getTime() - Date.now());
  return "scheduled";
}
const CHAPTER_ITEMS = {
  basic: CURRICULUM_BASIC,
  advanced: CURRICULUM_ADVANCED,
  extra: CURRICULUM_EXTRA,
  fight: CURRICULUM_FIGHT,
  partner: CURRICULUM_PARTNER,
  focus: CURRICULUM_FOCUS
};
function canCompleteLesson(storedCompleted, videos, curriculumKey, n) {
  const items = CHAPTER_ITEMS[curriculumKey] || [];
  for (const it of items) {
    if (it.n >= n) break;
    const key = `${curriculumKey}-${it.n}`;
    if ((videos == null ? void 0 : videos[key]) && !storedCompleted[key]) return false;
  }
  return true;
}
function computeChainedCompletions(storedCompleted, videos) {
  const out = {};
  for (const [curriculumKey, items] of Object.entries(CHAPTER_ITEMS)) {
    for (const it of items) {
      const key = `${curriculumKey}-${it.n}`;
      if (storedCompleted[key]) out[key] = true;
      else if (videos == null ? void 0 : videos[key]) break;
    }
  }
  return out;
}
function computeProgressPercent(completedLessons) {
  let percent = 0;
  for (const key of Object.keys(completedLessons)) {
    const [curriculumKey, nStr] = key.split("-");
    const n = Number(nStr);
    percent += curriculumKey === "extra" && n <= 10 ? 2 : 1;
  }
  return Math.min(percent, 100);
}
function getHardwareBackDestination(step, activeLesson, isAdmin, activeSupportIdentifier) {
  switch (step) {
    case "otp":
      return { type: "step", step: "signup" };
    case "curriculum-basic":
    case "curriculum-advanced":
    case "curriculum-extra":
    case "curriculum-fight":
    case "curriculum-partner":
    case "curriculum-focus":
    case "profile":
    case "subscription":
      return { type: "step", step: "home" };
    case "lesson":
      return { type: "step", step: `curriculum-${(activeLesson == null ? void 0 : activeLesson.curriculumKey) || "basic"}` };
    case "info-gear":
    case "info-tips":
    case "info-about":
    case "info-faq":
    case "info-coach":
    case "info-rules":
    case "admin-users":
    case "support-inbox":
      return { type: "stepAndMenu", step: "home" };
    case "support-chat":
      return isAdmin && activeSupportIdentifier ? { type: "step", step: "support-inbox" } : { type: "stepAndMenu", step: "home" };
    default:
      return { type: "root" };
  }
}
function App() {
  useFonts();
  useDisableZoom();
  const [step, setStep] = useState("splash");
  const [contact, setContact] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  const [legacyAuth, setLegacyAuth] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const [videos, setVideos] = useState({});
  const [activeLesson, setActiveLesson] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [completedLessons, setCompletedLessons] = useState({});
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [practiceSeconds, setPracticeSeconds] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const [lessonTitles, setLessonTitles] = useState({});
  const [memberCount, setMemberCount] = useState(0);
  const [realMemberCount, setRealMemberCount] = useState(null);
  const [videosStatus, setVideosStatus] = useState("loading");
  const [promoText, setPromoText] = useState("");
  const [chapterVisibility, setChapterVisibility] = useState({ fight: false, partner: false, focus: false });
  const [chapterTitles, setChapterTitles] = useState({});
  const [supportMessages, setSupportMessages] = useState([]);
  const [supportThreads, setSupportThreads] = useState([]);
  const [supportLoading, setSupportLoading] = useState(false);
  const [supportError, setSupportError] = useState("");
  const [activeSupportIdentifier, setActiveSupportIdentifier] = useState(null);
  const [supportStatus, setSupportStatus] = useState(null);
  const [exitHint, setExitHint] = useState(false);
  const lastPersistedPracticeRef = useRef(0);
  const lastBackPressRef = useRef(0);
  const [lastLesson, setLastLesson] = useState(null);
  const [reminder, setReminder] = useState({ enabled: false, time: "18:00" });
  const [remindersLoaded, setRemindersLoaded] = useState(false);
  const backStateRef = useRef({ step, activeLesson, menuOpen, isAdmin: authUser == null ? void 0 : authUser.isAdmin, activeSupportIdentifier });
  backStateRef.current = { step, activeLesson, menuOpen, isAdmin: authUser == null ? void 0 : authUser.isAdmin, activeSupportIdentifier };
  useEffect(() => {
    var _a2, _b2, _c, _d;
    const runBackAction = () => {
      var _a3, _b3, _c2, _d2;
      const { step: curStep, activeLesson: curLesson, menuOpen: curMenuOpen, isAdmin: curIsAdmin, activeSupportIdentifier: curSupportId } = backStateRef.current;
      if (curMenuOpen) {
        setMenuOpen(false);
        return;
      }
      const dest = getHardwareBackDestination(curStep, curLesson, curIsAdmin, curSupportId);
      if (dest.type === "step") {
        setStep(dest.step);
        return;
      }
      if (dest.type === "stepAndMenu") {
        setStep(dest.step);
        setMenuOpen(true);
        return;
      }
      const now = Date.now();
      if (now - lastBackPressRef.current < 2e3) {
        (_d2 = (_c2 = (_b3 = (_a3 = window.Capacitor) == null ? void 0 : _a3.Plugins) == null ? void 0 : _b3.App) == null ? void 0 : _c2.exitApp) == null ? void 0 : _d2.call(_c2);
      } else {
        lastBackPressRef.current = now;
        setExitHint(true);
        setTimeout(() => setExitHint(false), 2e3);
      }
    };
    let removeListener = null;
    let cancelled = false;
    Promise.resolve((_d = (_c = (_b2 = (_a2 = window.Capacitor) == null ? void 0 : _a2.Plugins) == null ? void 0 : _b2.App) == null ? void 0 : _c.addListener) == null ? void 0 : _d.call(_c, "backButton", runBackAction)).then((handle) => {
      var _a3;
      if (cancelled) (_a3 = handle == null ? void 0 : handle.remove) == null ? void 0 : _a3.call(handle);
      else removeListener = () => {
        var _a4;
        return (_a4 = handle == null ? void 0 : handle.remove) == null ? void 0 : _a4.call(handle);
      };
    }).catch(() => {
    });
    document.addEventListener("backbutton", runBackAction, false);
    return () => {
      cancelled = true;
      removeListener == null ? void 0 : removeListener();
      document.removeEventListener("backbutton", runBackAction, false);
    };
  }, []);
  useEffect(() => {
    getOrCreateDeviceId().then(setDeviceId);
  }, []);
  useEffect(() => {
    (async () => {
      const minDelay = new Promise((resolve) => setTimeout(resolve, 5e3));
      const [session] = await Promise.all([loadSession(), minDelay]);
      if (session) {
        setAuthToken(session.token);
        setAuthUser(session.user);
        setStep("home");
      }
      setSessionChecked(true);
    })();
  }, []);
  useEffect(() => {
    onAuthFailure = () => {
      setAuthToken(null);
      setAuthUser(null);
      setStep("signup");
      clearSession();
    };
    return () => {
      onAuthFailure = null;
    };
  }, []);
  const loadVideoList = () => {
    apiFetchVideos().then((list) => {
      if (list) {
        setVideos(list);
        setVideosStatus("ok");
      } else {
        setVideosStatus((prev) => prev === "ok" ? "ok" : "error");
      }
    });
  };
  const handleRetryVideos = () => {
    setVideosStatus("loading");
    loadVideoList();
  };
  const loadPublicData = () => {
    loadVideoList();
    apiFetchLessonTitles().then(setLessonTitles);
    apiFetchMemberCount().then(setMemberCount);
    apiFetchChapterVisibility().then(setChapterVisibility);
    apiFetchChapterTitles().then(setChapterTitles);
    apiFetchPromoText().then(setPromoText);
  };
  const handleSavePromoText = async (text) => {
    const saved = await apiSetPromoText(authToken, text);
    setPromoText(saved);
  };
  useEffect(() => {
    const onHidden = () => {
      if (document.hidden) {
        clearTimeout(syncTimerRef.current);
        syncTimerRef.current = null;
        flushSync();
      }
    };
    document.addEventListener("visibilitychange", onHidden);
    return () => document.removeEventListener("visibilitychange", onHidden);
  }, []);
  useEffect(() => {
    if (step !== "profile" && step !== "subscription" || !authToken) return;
    apiFetchPlanStatus(authToken).then((status) => {
      if (!status) return;
      setAuthUser((u) => {
        if (!u || u.plan === status.plan && (u.planExpiresAt || null) === (status.planExpiresAt || null)) return u;
        const next = __spreadProps(__spreadValues({}, u), { plan: status.plan, planExpiresAt: status.planExpiresAt });
        saveSession(authToken, next);
        return next;
      });
    });
  }, [step, authToken]);
  const loadAdminStats = () => {
    if (!(authUser == null ? void 0 : authUser.isAdmin) || !authToken) return;
    apiFetchAdminStats(authToken).then((stats) => {
      if (stats) setRealMemberCount(stats.totalUsers);
    });
  };
  useEffect(() => {
    loadPublicData();
  }, []);
  useEffect(() => {
    if (!(authUser == null ? void 0 : authUser.isAdmin)) setRealMemberCount(null);
    loadAdminStats();
  }, [authUser == null ? void 0 : authUser.isAdmin, authToken]);
  useEffect(() => {
    if (menuOpen) loadAdminStats();
  }, [menuOpen]);
  const appConnectivity = useConnectivity();
  const prevAppConnectivityRef = useRef(appConnectivity);
  useEffect(() => {
    const was = prevAppConnectivityRef.current;
    prevAppConnectivityRef.current = appConnectivity;
    if (was !== "ok" && appConnectivity === "ok") {
      loadPublicData();
      loadAdminStats();
      if (accountIdRef.current && loadedAccountRef.current === accountIdRef.current) {
        if (!serverSyncedRef.current) reconcileProgress(accountIdRef.current);
        else flushSync();
      }
    }
  }, [appConnectivity]);
  const handleRenameLesson = async (curriculumKey, n, newTitle) => {
    const key = `${curriculumKey}-${n}`;
    const saved = await apiSetLessonTitle(curriculumKey, n, newTitle, authToken);
    setLessonTitles((prev) => __spreadProps(__spreadValues({}, prev), { [key]: saved }));
  };
  const handleRenameChapter = async (curriculumKey, newTitle) => {
    const saved = await apiSetChapterTitle(curriculumKey, newTitle, authToken);
    setChapterTitles((prev) => __spreadProps(__spreadValues({}, prev), { [curriculumKey]: saved }));
  };
  const handleSetMemberCount = async (newCount) => {
    const saved = await apiSetMemberCount(newCount, authToken);
    setMemberCount(saved);
  };
  const handleToggleChapterVisibility = async (key, visible) => {
    const saved = await apiSetChapterVisibility(key, visible, authToken);
    setChapterVisibility((prev) => __spreadProps(__spreadValues({}, prev), { [key]: saved }));
  };
  const refreshSupportStatus = async () => {
    if (!authToken) {
      setSupportStatus(null);
      return;
    }
    try {
      if (authUser == null ? void 0 : authUser.isAdmin) {
        const threads = await apiFetchSupportThreads(authToken);
        if (threads.length === 0) setSupportStatus(null);
        else if (threads.some((t) => t.lastSender === "user")) setSupportStatus("pending");
        else setSupportStatus("answered");
      } else {
        const messages = await apiFetchMySupportMessages(authToken);
        if (messages.length === 0) setSupportStatus(null);
        else setSupportStatus(messages[messages.length - 1].sender === "user" ? "pending" : "answered");
      }
    } catch (e) {
    }
  };
  useEffect(() => {
    refreshSupportStatus();
  }, [authToken, authUser == null ? void 0 : authUser.isAdmin]);
  const openMySupportChat = async () => {
    setActiveSupportIdentifier(null);
    setStep("support-chat");
    setSupportLoading(true);
    setSupportError("");
    try {
      const messages = await apiFetchMySupportMessages(authToken);
      setSupportMessages(messages);
    } catch (err) {
      setSupportError(err.message || "\u062F\u0631\u06CC\u0627\u0641\u062A \u06AF\u0641\u062A\u06AF\u0648 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
    } finally {
      setSupportLoading(false);
    }
  };
  const openSupportInbox = async () => {
    setStep("support-inbox");
    setSupportLoading(true);
    setSupportError("");
    try {
      const threads = await apiFetchSupportThreads(authToken);
      setSupportThreads(threads);
    } catch (err) {
      setSupportError(err.message || "\u062F\u0631\u06CC\u0627\u0641\u062A \u0644\u06CC\u0633\u062A \u06AF\u0641\u062A\u06AF\u0648\u0647\u0627 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
    } finally {
      setSupportLoading(false);
    }
  };
  const openAdminSupportThread = async (identifier) => {
    setActiveSupportIdentifier(identifier);
    setStep("support-chat");
    setSupportLoading(true);
    setSupportError("");
    try {
      const messages = await apiFetchSupportThread(authToken, identifier);
      setSupportMessages(messages);
    } catch (err) {
      setSupportError(err.message || "\u062F\u0631\u06CC\u0627\u0641\u062A \u06AF\u0641\u062A\u06AF\u0648 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F");
    } finally {
      setSupportLoading(false);
    }
  };
  const handleOpenSupport = () => {
    if (authUser == null ? void 0 : authUser.isAdmin) openSupportInbox();
    else openMySupportChat();
  };
  const handleInviteFriends = async () => {
    var _a2, _b2;
    try {
      const NativeShare = (_b2 = (_a2 = window.Capacitor) == null ? void 0 : _a2.Plugins) == null ? void 0 : _b2.Share;
      if (NativeShare == null ? void 0 : NativeShare.share) {
        await NativeShare.share({
          title: INVITE_SHARE_TITLE,
          text: INVITE_SHARE_TEXT,
          url: INVITE_SHARE_URL,
          dialogTitle: "\u062F\u0639\u0648\u062A \u0627\u0632 \u062F\u0648\u0633\u062A\u0627\u0646"
        });
        return;
      }
      if (navigator.share) {
        await navigator.share({ title: INVITE_SHARE_TITLE, text: INVITE_SHARE_TEXT, url: INVITE_SHARE_URL });
        return;
      }
      await navigator.clipboard.writeText(`${INVITE_SHARE_TEXT} ${INVITE_SHARE_URL}`);
      window.alert("\u0645\u062A\u0646 \u062F\u0639\u0648\u062A \u06A9\u067E\u06CC \u0634\u062F\u061B \u0645\u06CC\u200C\u062A\u0648\u0646\u06CC \u0627\u0644\u0627\u0646 \u0628\u0631\u0627\u06CC \u062F\u0648\u0633\u062A\u062A \u0628\u0641\u0631\u0633\u062A\u06CC\u0634.");
    } catch (e) {
    }
  };
  const handleSendSupportMessage = async (text) => {
    if ((authUser == null ? void 0 : authUser.isAdmin) && activeSupportIdentifier) {
      await apiSendSupportReply(authToken, activeSupportIdentifier, text);
      setSupportMessages((prev) => [...prev, { sender: "admin", message: text, createdAt: Date.now() }]);
      refreshSupportStatus();
    } else {
      const { botReply } = await apiSendSupportMessage(authToken, text);
      setSupportMessages((prev) => {
        const next = [...prev, { sender: "user", message: text, createdAt: Date.now() }];
        if (botReply) next.push(botReply);
        return next;
      });
      setSupportStatus(botReply ? "answered" : "pending");
    }
  };
  const handleSendSupportVoice = async (audioData) => {
    if ((authUser == null ? void 0 : authUser.isAdmin) && activeSupportIdentifier) {
      await apiSendSupportVoiceReply(authToken, activeSupportIdentifier, audioData);
      setSupportMessages((prev) => [
        ...prev,
        { sender: "admin", message: "\u067E\u06CC\u0627\u0645 \u0635\u0648\u062A\u06CC", type: "voice", audioData, createdAt: Date.now() }
      ]);
      refreshSupportStatus();
    } else {
      const { botReply } = await apiSendSupportVoice(authToken, audioData);
      setSupportMessages((prev) => {
        const next = [
          ...prev,
          { sender: "user", message: "\u067E\u06CC\u0627\u0645 \u0635\u0648\u062A\u06CC", type: "voice", audioData, createdAt: Date.now() }
        ];
        if (botReply) next.push(botReply);
        return next;
      });
      setSupportStatus("pending");
    }
  };
  const curriculumBasicMerged = CURRICULUM_BASIC.map((it) => __spreadProps(__spreadValues({}, it), {
    t: lessonTitles[`basic-${it.n}`] || it.t
  }));
  const curriculumAdvancedMerged = CURRICULUM_ADVANCED.map((it) => __spreadProps(__spreadValues({}, it), {
    t: lessonTitles[`advanced-${it.n}`] || it.t
  }));
  const curriculumExtraMerged = CURRICULUM_EXTRA.map((it) => __spreadProps(__spreadValues({}, it), {
    t: lessonTitles[`extra-${it.n}`] || it.t
  }));
  const curriculumFightMerged = CURRICULUM_FIGHT.map((it) => __spreadProps(__spreadValues({}, it), {
    t: lessonTitles[`fight-${it.n}`] || it.t
  }));
  const curriculumPartnerMerged = CURRICULUM_PARTNER.map((it) => __spreadProps(__spreadValues({}, it), {
    t: lessonTitles[`partner-${it.n}`] || it.t
  }));
  const curriculumFocusMerged = CURRICULUM_FOCUS.map((it) => __spreadProps(__spreadValues({}, it), {
    t: lessonTitles[`focus-${it.n}`] || it.t
  }));
  const accountId = (authUser == null ? void 0 : authUser.identifier) || null;
  const accountIdRef = useRef(null);
  accountIdRef.current = accountId;
  const loadedAccountRef = useRef(null);
  const saveAccountData = (base, value) => {
    const id = accountIdRef.current;
    if (!id || loadedAccountRef.current !== id) return;
    return AppStorage.set(accountKey(id, base), value);
  };
  const authTokenRef = useRef(null);
  authTokenRef.current = authToken;
  const completedRef = useRef({});
  completedRef.current = completedLessons;
  const practiceRef = useRef(0);
  practiceRef.current = practiceSeconds;
  const lastLessonRef = useRef(null);
  lastLessonRef.current = lastLesson;
  const profileNameRef = useRef("");
  profileNameRef.current = profileName;
  const profileImageRef = useRef(null);
  profileImageRef.current = profileImage;
  const syncPendingRef = useRef({});
  const syncTimerRef = useRef(null);
  const syncingRef = useRef(false);
  const serverSyncedRef = useRef(false);
  const persistPending = () => saveAccountData("sync-pending", JSON.stringify(syncPendingRef.current));
  const flushSync = async () => {
    const id = accountIdRef.current;
    const token = authTokenRef.current;
    if (!id || !token || loadedAccountRef.current !== id || syncingRef.current) return;
    if (Object.keys(syncPendingRef.current).length === 0) return;
    syncingRef.current = true;
    const sent = syncPendingRef.current;
    syncPendingRef.current = {};
    const result = await apiPutProgress(token, sent);
    syncingRef.current = false;
    if (accountIdRef.current !== id) return;
    if (!result) syncPendingRef.current = mergePendingSync(sent, syncPendingRef.current);
    persistPending();
    if (result && Object.keys(syncPendingRef.current).length > 0) scheduleSync(300);
  };
  const scheduleSync = (delay = 1500, keepExisting = false) => {
    if (keepExisting && syncTimerRef.current) return;
    clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(() => {
      syncTimerRef.current = null;
      flushSync();
    }, delay);
  };
  const queueSync = (partial, delay = 1500, keepExisting = false) => {
    syncPendingRef.current = mergePendingSync(syncPendingRef.current, partial);
    persistPending();
    scheduleSync(delay, keepExisting);
  };
  const reconcileProgress = async (id) => {
    var _a2, _b2;
    const token = authTokenRef.current;
    if (!token || accountIdRef.current !== id) return;
    if (Object.keys(syncPendingRef.current).length > 0) await flushSync();
    const server = await apiFetchProgress(token);
    if (!server || accountIdRef.current !== id) return;
    const mergedCompleted = __spreadValues(__spreadValues({}, server.completed), completedRef.current);
    const mergedPractice = Math.max(server.practiceSeconds || 0, practiceRef.current);
    const mergedLast = server.lastLesson || lastLessonRef.current;
    const mergedName = ((_a2 = server.profile) == null ? void 0 : _a2.name) || profileNameRef.current;
    const mergedImage = profileImageRef.current;
    setCompletedLessons(mergedCompleted);
    saveAccountData("completed-lessons", JSON.stringify(mergedCompleted));
    setPracticeSeconds(mergedPractice);
    lastPersistedPracticeRef.current = mergedPractice;
    saveAccountData("practice-seconds", String(mergedPractice));
    if (mergedLast) {
      setLastLesson(mergedLast);
      saveAccountData("last-lesson", JSON.stringify(mergedLast));
    }
    setProfileName(mergedName || "");
    setProfileImage(mergedImage || null);
    if (mergedName || mergedImage) saveAccountData("profile-info", JSON.stringify({ name: mergedName || "", image: mergedImage || null }));
    const push = {};
    const onlyLocal = Object.keys(mergedCompleted).filter((key) => {
      var _a3;
      return !((_a3 = server.completed) == null ? void 0 : _a3[key]);
    });
    if (onlyLocal.length > 0) push.completed = Object.fromEntries(onlyLocal.map((key) => [key, true]));
    if (mergedPractice > (server.practiceSeconds || 0)) push.practiceSeconds = mergedPractice;
    if (!server.lastLesson && mergedLast) push.lastLesson = mergedLast;
    if (!((_b2 = server.profile) == null ? void 0 : _b2.name) && mergedName) push.profile = { name: mergedName };
    serverSyncedRef.current = true;
    if (Object.keys(push).length > 0) queueSync(push, 200);
  };
  useEffect(() => {
    loadedAccountRef.current = null;
    serverSyncedRef.current = false;
    clearTimeout(syncTimerRef.current);
    syncTimerRef.current = null;
    syncPendingRef.current = {};
    setRemindersLoaded(false);
    setCompletedLessons({});
    setPracticeSeconds(0);
    lastPersistedPracticeRef.current = 0;
    setProfileName("");
    setProfileImage(null);
    setLastLesson(null);
    setReminder({ enabled: false, time: "18:00" });
    if (!accountId) {
      cancelReminder();
      return;
    }
    let cancelled = false;
    (async () => {
      await purgeLegacyAccountData();
      const [lastRaw, reminderRaw, completedRaw, practiceRaw, profileRaw, pendingRaw] = await Promise.all(
        ACCOUNT_DATA_KEYS.map((key) => AppStorage.get(accountKey(accountId, key)))
      );
      if (cancelled) return;
      const parse = (raw) => {
        try {
          return raw ? JSON.parse(raw) : null;
        } catch (e) {
          return null;
        }
      };
      const last = parse(lastRaw);
      if ((last == null ? void 0 : last.curriculumKey) && (last == null ? void 0 : last.n)) setLastLesson(last);
      const savedReminder = parse(reminderRaw);
      if (savedReminder == null ? void 0 : savedReminder.time) setReminder({ enabled: Boolean(savedReminder.enabled), time: savedReminder.time });
      const completed = parse(completedRaw);
      if (completed && typeof completed === "object") setCompletedLessons(completed);
      const seconds = Number(practiceRaw) || 0;
      setPracticeSeconds(seconds);
      lastPersistedPracticeRef.current = seconds;
      const profile = parse(profileRaw);
      if (profile == null ? void 0 : profile.name) setProfileName(profile.name);
      if (profile == null ? void 0 : profile.image) setProfileImage(profile.image);
      const pending = parse(pendingRaw);
      if (pending && typeof pending === "object") syncPendingRef.current = pending;
      loadedAccountRef.current = accountId;
      setRemindersLoaded(true);
      completedRef.current = completed && typeof completed === "object" ? completed : {};
      practiceRef.current = seconds;
      lastLessonRef.current = (last == null ? void 0 : last.curriculumKey) && (last == null ? void 0 : last.n) ? last : null;
      profileNameRef.current = (profile == null ? void 0 : profile.name) || "";
      profileImageRef.current = (profile == null ? void 0 : profile.image) || null;
      reconcileProgress(accountId);
    })();
    return () => {
      cancelled = true;
    };
  }, [accountId]);
  const availableChapterKeys = [
    "basic",
    "advanced",
    "extra",
    ...NEW_CHAPTER_KEYS.filter((k) => (authUser == null ? void 0 : authUser.isAdmin) || (chapterVisibility == null ? void 0 : chapterVisibility[k]))
  ];
  const nextLesson = computeNextLesson(
    lastLesson,
    {
      basic: curriculumBasicMerged,
      advanced: curriculumAdvancedMerged,
      extra: curriculumExtraMerged,
      fight: curriculumFightMerged,
      partner: curriculumPartnerMerged,
      focus: curriculumFocusMerged
    },
    availableChapterKeys
  );
  useEffect(() => {
    if (!remindersLoaded || !reminder.enabled) return;
    armReminder(reminder.time, nextLesson, false);
  }, [remindersLoaded, reminder.enabled, reminder.time, nextLesson == null ? void 0 : nextLesson.curriculumKey, nextLesson == null ? void 0 : nextLesson.n, nextLesson == null ? void 0 : nextLesson.title]);
  const handleSetReminder = async (time) => {
    const status = await armReminder(time, nextLesson, true);
    if (status !== "scheduled") return status;
    const next = { enabled: true, time };
    setReminder(next);
    saveAccountData("reminder", JSON.stringify(next));
    return status;
  };
  const handlePracticeTick = () => {
    setPracticeSeconds((s) => {
      const next = s + 1;
      if (next - lastPersistedPracticeRef.current >= 10) {
        lastPersistedPracticeRef.current = next;
        saveAccountData("practice-seconds", String(next));
        queueSync({ practiceSeconds: next }, 3e4, true);
      }
      return next;
    });
  };
  const saveProfileInfo = async (next) => {
    await saveAccountData("profile-info", JSON.stringify(next));
  };
  const handleNameChange = (name) => {
    setProfileName(name);
    saveProfileInfo({ name, image: profileImage });
    queueSync({ profile: { name } });
  };
  const handleImageChange = (image) => {
    setProfileImage(image);
    saveProfileInfo({ name: profileName, image });
  };
  const openLesson = (curriculumKey, item) => {
    const isGoldChapter = ["fight", "partner", "focus"].includes(curriculumKey);
    const hasAccess = (authUser == null ? void 0 : authUser.isAdmin) || (isGoldChapter ? (authUser == null ? void 0 : authUser.plan) === "gold" : (authUser == null ? void 0 : authUser.plan) === "silver");
    if (item.n > FREE_LESSONS_COUNT && !hasAccess) {
      setStep("subscription");
      return;
    }
    const record = { curriculumKey, n: item.n };
    setLastLesson(record);
    saveAccountData("last-lesson", JSON.stringify(record));
    queueSync({ lastLesson: record });
    setActiveLesson({ curriculumKey, item });
    setStep("lesson");
  };
  const lessonKey = activeLesson ? `${activeLesson.curriculumKey}-${activeLesson.item.n}` : null;
  const effectiveCompleted = computeChainedCompletions(completedLessons, videos);
  const handleLessonComplete = async () => {
    if (!lessonKey || completedLessons[lessonKey]) return;
    if (!canCompleteLesson(completedLessons, videos, activeLesson.curriculumKey, activeLesson.item.n)) return;
    const updated = __spreadProps(__spreadValues({}, completedLessons), { [lessonKey]: true });
    setCompletedLessons(updated);
    await saveAccountData("completed-lessons", JSON.stringify(updated));
    queueSync({ completed: { [lessonKey]: true } });
  };
  const handleSendOtp = async () => {
    if (DEMO_MODE) {
      setStep("otp");
      return;
    }
    await apiSendOtp(contact, contactMethod);
    setStep("otp");
  };
  const handleResendOtp = async () => {
    if (DEMO_MODE) return;
    await apiSendOtp(contact, contactMethod);
  };
  const handleVerifyOtp = async (typedCode, force) => {
    if (DEMO_MODE) {
      const normalized = normalizeIdentifier(contact, contactMethod);
      const demoUser = { identifier: normalized, isAdmin: DEMO_ADMIN_IDENTIFIERS.includes(normalized), plan: "none" };
      setAuthToken("demo-token");
      setAuthUser(demoUser);
      setStep("home");
      saveSession("demo-token", demoUser);
      return;
    }
    const data = await apiVerifyOtp(contact, contactMethod, typedCode, deviceId, force);
    setAuthToken(data.token);
    setAuthUser(data.user);
    setStep("home");
    saveSession(data.token, data.user);
  };
  const handleAuthSuccess = (data) => {
    setAuthToken(data.token);
    setAuthUser(data.user);
    setStep("home");
    saveSession(data.token, data.user);
  };
  const handleUseLegacyAuth = (prefillPhone) => {
    if (prefillPhone) {
      setContactMethod("phone");
      setContact(prefillPhone);
    }
    setLegacyAuth(true);
  };
  useEffect(() => {
    if (!authToken || DEMO_MODE || !deviceId) return;
    const id = setInterval(async () => {
      const active = await apiCheckSession(authToken, deviceId);
      if (!active) {
        clearInterval(id);
        alert("\u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u0628\u0631 \u0631\u0648\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647 \u062F\u06CC\u06AF\u0631 \u0641\u0639\u0627\u0644 \u0627\u0633\u062A");
        setAuthToken(null);
        setAuthUser(null);
        setStep("signup");
        clearSession();
      }
    }, 2e4);
    return () => clearInterval(id);
  }, [authToken, deviceId]);
  const handleLogout = async () => {
    clearTimeout(syncTimerRef.current);
    syncTimerRef.current = null;
    await Promise.race([flushSync(), new Promise((resolve) => setTimeout(resolve, 2500))]);
    setAuthToken(null);
    setAuthUser(null);
    setLegacyAuth(false);
    setContact("");
    setCode(["", "", "", ""]);
    setStep("signup");
    clearSession();
  };
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "w-full",
      style: {
        height: "100vh",
        background: "radial-gradient(circle at 50% 0%, #1a1418 0%, #0B0B0D 55%)",
        touchAction: "pan-y"
      }
    },
    /* @__PURE__ */ React.createElement("style", null, `
          @keyframes screenPunchIn {
            0% { opacity: 0; transform: scale(1.08); }
            100% { opacity: 1; transform: scale(1); }
          }
          .screen-enter {
            animation: screenPunchIn 200ms ease-out both;
          }
          @keyframes activeDotPulse {
            0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.55); }
            70% { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
            100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
          }
          .active-dot {
            animation: activeDotPulse 1.8s ease-out infinite;
          }
        `),
    /* @__PURE__ */ React.createElement(PhoneMock, { bgImage: getScreenBackground(step) }, /* @__PURE__ */ React.createElement(TopNotch, null), /* @__PURE__ */ React.createElement(NetworkBanner, null), /* @__PURE__ */ React.createElement("div", { key: step, className: "screen-enter flex-1 flex flex-col min-h-0" }, step === "splash" && /* @__PURE__ */ React.createElement(SplashScreen, { loading: !sessionChecked, onStart: () => setStep("signup") }), step === "signup" && !legacyAuth && /* @__PURE__ */ React.createElement(PasswordAuthFlow, { deviceId, onSuccess: handleAuthSuccess, onUseLegacy: handleUseLegacyAuth }), step === "signup" && legacyAuth && /* @__PURE__ */ React.createElement(
      SignupScreen,
      {
        contact,
        setContact,
        method: contactMethod,
        setMethod: setContactMethod,
        onSubmit: handleSendOtp,
        onUsePassword: () => setLegacyAuth(false)
      }
    ), step === "otp" && /* @__PURE__ */ React.createElement(
      OtpScreen,
      {
        contact,
        method: contactMethod,
        code,
        setCode,
        onVerify: {
          next: handleVerifyOtp,
          resend: handleResendOtp,
          back: () => setStep("signup")
        }
      }
    ), step === "home" && /* @__PURE__ */ React.createElement(
      HomeScreen,
      {
        onNavigate: setStep,
        menuOpen,
        setMenuOpen,
        onLogout: handleLogout,
        isAdmin: Boolean(authUser == null ? void 0 : authUser.isAdmin),
        memberCount,
        realMemberCount,
        accountName: profileName,
        accountContact: authUser == null ? void 0 : authUser.identifier,
        onOpenAccount: () => {
          setMenuOpen(false);
          setStep("profile");
        },
        onSetMemberCount: handleSetMemberCount,
        chapterVisibility,
        onToggleChapterVisibility: handleToggleChapterVisibility,
        onOpenSupport: handleOpenSupport,
        chapterTitles,
        supportStatus,
        onInviteFriends: handleInviteFriends
      }
    ), step === "info-gear" && /* @__PURE__ */ React.createElement(
      InfoScreen,
      {
        title: "\u0648\u0633\u0627\u06CC\u0644 \u0628\u0648\u06A9\u0633",
        items: GEAR_ITEMS,
        onBack: () => {
          setStep("home");
          setMenuOpen(true);
        }
      }
    ), step === "info-tips" && /* @__PURE__ */ React.createElement(
      InfoScreen,
      {
        title: "\u0646\u06A9\u0627\u062A \u06A9\u0644\u06CC\u062F\u06CC",
        items: TIPS_ITEMS,
        onBack: () => {
          setStep("home");
          setMenuOpen(true);
        }
      }
    ), step === "info-about" && /* @__PURE__ */ React.createElement(
      InfoScreen,
      {
        title: "\u062F\u0631\u0628\u0627\u0631\u0647 \u0622\u06A9\u0627\u062F\u0645\u06CC Naseri",
        paragraph: ABOUT_TEXT,
        onBack: () => {
          setStep("home");
          setMenuOpen(true);
        }
      }
    ), step === "info-faq" && /* @__PURE__ */ React.createElement(
      AccordionScreen,
      {
        title: "\u0633\u0648\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644",
        items: FAQ_ITEMS,
        onBack: () => {
          setStep("home");
          setMenuOpen(true);
        }
      }
    ), step === "info-coach" && /* @__PURE__ */ React.createElement(
      AccordionScreen,
      {
        title: "\u0645\u0631\u0628\u06CC \u06A9\u0645\u06A9\u06CC",
        items: COACH_ITEMS,
        onBack: () => {
          setStep("home");
          setMenuOpen(true);
        }
      }
    ), step === "info-rules" && /* @__PURE__ */ React.createElement(
      AccordionScreen,
      {
        title: "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A",
        items: RULES_ITEMS,
        onBack: () => {
          setStep("home");
          setMenuOpen(true);
        }
      }
    ), step === "admin-users" && /* @__PURE__ */ React.createElement(
      AdminUsersScreen,
      {
        authToken,
        onBack: () => {
          setStep("home");
          setMenuOpen(true);
        }
      }
    ), step === "support-inbox" && /* @__PURE__ */ React.createElement(
      SupportInboxScreen,
      {
        threads: supportThreads,
        loading: supportLoading,
        error: supportError,
        onOpenThread: openAdminSupportThread,
        onBack: () => {
          setStep("home");
          setMenuOpen(true);
        }
      }
    ), step === "support-chat" && /* @__PURE__ */ React.createElement(
      SupportChatScreen,
      {
        title: "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
        subtitle: (authUser == null ? void 0 : authUser.isAdmin) && activeSupportIdentifier ? activeSupportIdentifier : null,
        messages: supportMessages,
        myRole: (authUser == null ? void 0 : authUser.isAdmin) && activeSupportIdentifier ? "admin" : "user",
        onSend: handleSendSupportMessage,
        onSendVoice: handleSendSupportVoice,
        onBack: () => {
          if ((authUser == null ? void 0 : authUser.isAdmin) && activeSupportIdentifier) {
            setStep("support-inbox");
          } else {
            setStep("home");
            setMenuOpen(true);
          }
        }
      }
    ), step === "curriculum-extra" && /* @__PURE__ */ React.createElement(
      CurriculumScreen,
      {
        title: (chapterTitles == null ? void 0 : chapterTitles.extra) || DEFAULT_CHAPTER_TITLES.extra,
        items: curriculumExtraMerged,
        curriculumKey: "extra",
        onBack: () => setStep("home"),
        onSelect: (item) => openLesson("extra", item),
        hasVideo: (n) => Boolean(videos[`extra-${n}`]),
        isCompleted: (n) => Boolean(effectiveCompleted[`extra-${n}`]),
        plan: (authUser == null ? void 0 : authUser.plan) || "none",
        onLockedSelect: () => setStep("subscription"),
        isAdmin: Boolean(authUser == null ? void 0 : authUser.isAdmin),
        onRename: (newTitle) => handleRenameChapter("extra", newTitle)
      }
    ), step === "curriculum-basic" && /* @__PURE__ */ React.createElement(
      CurriculumScreen,
      {
        title: (chapterTitles == null ? void 0 : chapterTitles.basic) || DEFAULT_CHAPTER_TITLES.basic,
        items: curriculumBasicMerged,
        curriculumKey: "basic",
        onBack: () => setStep("home"),
        onSelect: (item) => openLesson("basic", item),
        hasVideo: (n) => Boolean(videos[`basic-${n}`]),
        isCompleted: (n) => Boolean(effectiveCompleted[`basic-${n}`]),
        plan: (authUser == null ? void 0 : authUser.plan) || "none",
        onLockedSelect: () => setStep("subscription"),
        isAdmin: Boolean(authUser == null ? void 0 : authUser.isAdmin),
        onRename: (newTitle) => handleRenameChapter("basic", newTitle)
      }
    ), step === "curriculum-advanced" && /* @__PURE__ */ React.createElement(
      CurriculumScreen,
      {
        title: (chapterTitles == null ? void 0 : chapterTitles.advanced) || DEFAULT_CHAPTER_TITLES.advanced,
        items: curriculumAdvancedMerged,
        curriculumKey: "advanced",
        onBack: () => setStep("home"),
        onSelect: (item) => openLesson("advanced", item),
        hasVideo: (n) => Boolean(videos[`advanced-${n}`]),
        isCompleted: (n) => Boolean(effectiveCompleted[`advanced-${n}`]),
        plan: (authUser == null ? void 0 : authUser.plan) || "none",
        onLockedSelect: () => setStep("subscription"),
        isAdmin: Boolean(authUser == null ? void 0 : authUser.isAdmin),
        onRename: (newTitle) => handleRenameChapter("advanced", newTitle)
      }
    ), step === "curriculum-fight" && /* @__PURE__ */ React.createElement(
      CurriculumScreen,
      {
        title: (chapterTitles == null ? void 0 : chapterTitles.fight) || DEFAULT_CHAPTER_TITLES.fight,
        items: curriculumFightMerged,
        curriculumKey: "fight",
        onBack: () => setStep("home"),
        onSelect: (item) => openLesson("fight", item),
        hasVideo: (n) => Boolean(videos[`fight-${n}`]),
        isCompleted: (n) => Boolean(effectiveCompleted[`fight-${n}`]),
        plan: (authUser == null ? void 0 : authUser.plan) || "none",
        onLockedSelect: () => setStep("subscription"),
        isAdmin: Boolean(authUser == null ? void 0 : authUser.isAdmin),
        onRename: (newTitle) => handleRenameChapter("fight", newTitle)
      }
    ), step === "curriculum-partner" && /* @__PURE__ */ React.createElement(
      CurriculumScreen,
      {
        title: (chapterTitles == null ? void 0 : chapterTitles.partner) || DEFAULT_CHAPTER_TITLES.partner,
        items: curriculumPartnerMerged,
        curriculumKey: "partner",
        onBack: () => setStep("home"),
        onSelect: (item) => openLesson("partner", item),
        hasVideo: (n) => Boolean(videos[`partner-${n}`]),
        isCompleted: (n) => Boolean(effectiveCompleted[`partner-${n}`]),
        plan: (authUser == null ? void 0 : authUser.plan) || "none",
        onLockedSelect: () => setStep("subscription"),
        isAdmin: Boolean(authUser == null ? void 0 : authUser.isAdmin),
        onRename: (newTitle) => handleRenameChapter("partner", newTitle)
      }
    ), step === "curriculum-focus" && /* @__PURE__ */ React.createElement(
      CurriculumScreen,
      {
        title: (chapterTitles == null ? void 0 : chapterTitles.focus) || DEFAULT_CHAPTER_TITLES.focus,
        items: curriculumFocusMerged,
        curriculumKey: "focus",
        onBack: () => setStep("home"),
        onSelect: (item) => openLesson("focus", item),
        hasVideo: (n) => Boolean(videos[`focus-${n}`]),
        isCompleted: (n) => Boolean(effectiveCompleted[`focus-${n}`]),
        plan: (authUser == null ? void 0 : authUser.plan) || "none",
        onLockedSelect: () => setStep("subscription"),
        isAdmin: Boolean(authUser == null ? void 0 : authUser.isAdmin),
        onRename: (newTitle) => handleRenameChapter("focus", newTitle)
      }
    ), step === "lesson" && activeLesson && /* @__PURE__ */ React.createElement(
      LessonScreen,
      {
        item: activeLesson.item,
        videoSrc: videos[lessonKey],
        curriculumKey: activeLesson.curriculumKey,
        isAdmin: Boolean(authUser == null ? void 0 : authUser.isAdmin),
        authToken,
        accountId,
        videosStatus,
        onRetryVideos: handleRetryVideos,
        onUploaded: (url) => setVideos((v) => __spreadProps(__spreadValues({}, v), { [lessonKey]: url })),
        onRename: (newTitle) => handleRenameLesson(activeLesson.curriculumKey, activeLesson.item.n, newTitle),
        onComplete: handleLessonComplete,
        onPracticeTick: handlePracticeTick,
        onBack: () => setStep(`curriculum-${activeLesson.curriculumKey}`)
      }
    ), step === "profile" && /* @__PURE__ */ React.createElement(
      ProfileScreen,
      {
        sessionsCount: Object.keys(effectiveCompleted).length,
        progressPercent: computeProgressPercent(effectiveCompleted),
        practiceMinutes: Math.floor(practiceSeconds / 60),
        profileName,
        profileImage,
        onNameChange: handleNameChange,
        onImageChange: handleImageChange,
        nextLesson,
        reminder,
        onSetReminder: handleSetReminder,
        plan: (authUser == null ? void 0 : authUser.plan) || "none",
        planExpiresAt: (authUser == null ? void 0 : authUser.planExpiresAt) || null,
        accountContact: authUser == null ? void 0 : authUser.identifier,
        badgeUnlocked: {
          basic: CURRICULUM_BASIC.every((it) => effectiveCompleted[`basic-${it.n}`]),
          advanced: CURRICULUM_ADVANCED.every((it) => effectiveCompleted[`advanced-${it.n}`]),
          extra: CURRICULUM_EXTRA.every((it) => effectiveCompleted[`extra-${it.n}`]),
          fight: CURRICULUM_FIGHT.every((it) => effectiveCompleted[`fight-${it.n}`]),
          partner: CURRICULUM_PARTNER.every((it) => effectiveCompleted[`partner-${it.n}`]),
          focus: CURRICULUM_FOCUS.every((it) => effectiveCompleted[`focus-${it.n}`])
        }
      }
    ), step === "subscription" && /* @__PURE__ */ React.createElement(
      SubscriptionScreen,
      {
        plan: (authUser == null ? void 0 : authUser.plan) || "none",
        planExpiresAt: (authUser == null ? void 0 : authUser.planExpiresAt) || null,
        authToken,
        isLoggedIn: Boolean(authToken),
        chapterVisibility,
        chapterTitles,
        promoText,
        isAdmin: Boolean(authUser == null ? void 0 : authUser.isAdmin),
        onSavePromoText: handleSavePromoText,
        onPlanConfirmed: (newPlan, expiresAt) => {
          setAuthUser((u) => {
            const next = __spreadProps(__spreadValues({}, u), { plan: newPlan, planExpiresAt: expiresAt || (u == null ? void 0 : u.planExpiresAt) || null });
            saveSession(authToken, next);
            return next;
          });
        }
      }
    )), (step === "home" || step === "profile" || step === "subscription") && /* @__PURE__ */ React.createElement(BottomTabs, { active: step, onNavigate: setStep }), exitHint && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "absolute left-1/2 -translate-x-1/2",
        style: {
          bottom: "84px",
          background: "rgba(23,22,26,0.95)",
          border: "1px solid #2a292e",
          zIndex: 50
        }
      },
      /* @__PURE__ */ React.createElement(
        "p",
        {
          style: { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" },
          className: "text-xs px-4 py-2 rounded-full whitespace-nowrap"
        },
        "\u0628\u0631\u0627\u06CC \u062E\u0631\u0648\u062C \u062F\u0648\u0628\u0627\u0631\u0647 \u0628\u0632\u0646\u06CC\u062F"
      )
    ))
  );
}
const rootEl = document.getElementById("root");
ReactDOM.createRoot(rootEl).render(/* @__PURE__ */ React.createElement(App, null));
