const { useState, useRef, useEffect, useMemo } = React;

// ---------- چندزبانه (فارسی / English / العربية / Türkçe / 中文) ----------
// متن‌های اپ به‌صورت فارسی نوشته شدن و tr("متن فارسی") معادل زبان انتخاب‌شده رو از جدول I18N_DICT برمی‌داره
// (جدول ترجمه‌ها توی فایل i18n/dict.js نگهداری می‌شه و موقع ساخت app.js اول فایل قرار می‌گیره).
// اگه ترجمه‌ای پیدا نشه، همون متن فارسی نشون داده می‌شه. تغییر زبان: ذخیره‌ی انتخاب و بارگذاری دوباره‌ی اپ.
const APP_LANGS = [
  { code: "fa", name: "فارسی", dir: "rtl", locale: "fa-IR" },
  { code: "en", name: "English", dir: "ltr", locale: "en-US" },
  { code: "ar", name: "العربية", dir: "rtl", locale: "ar-EG" },
  { code: "tr", name: "Türkçe", dir: "ltr", locale: "tr-TR" },
  { code: "zh", name: "中文", dir: "ltr", locale: "zh-CN" },
];
const LANG_STORAGE_KEY = "app-language";
function readStoredLang() {
  try {
    const v = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (APP_LANGS.some((l) => l.code === v)) return v;
  } catch {
    // حافظه در دسترس نیست؛ فارسی
  }
  return "fa";
}
const APP_LANG = readStoredLang();
const APP_LANG_INFO = APP_LANGS.find((l) => l.code === APP_LANG);
const APP_DIR = APP_LANG_INFO.dir; // "rtl" برای فارسی و عربی، "ltr" برای بقیه
const NUM_LOCALE = APP_LANG_INFO.locale; // قالب اعداد و تاریخ (فارسی: تقویم شمسی)
const I18N_TABLE = (typeof I18N_DICT !== "undefined" && I18N_DICT[APP_LANG]) || null;

// ترجمه‌ی متن‌هایی که ادمین توی اپ نوشته/ویرایش کرده؛ سرور خودکار ترجمه‌شون می‌کنه (GET /translations/:lang)
const DYN_TABLE = {};
// همه‌ی رشته‌های یک آبجکت/آرایه رو (به‌جز آدرس‌ها) از DYN_TABLE ترجمه می‌کنه. ادمین همیشه متن اصلی رو می‌بینه تا موقع ویرایش، ترجمه ذخیره نشه.
function dynTr(v) {
  if (APP_LANG === "fa") return v;
  if (typeof v === "string") return tr(v);
  if (Array.isArray(v)) return v.map(dynTr);
  if (v && typeof v === "object") {
    const o = {};
    for (const k of Object.keys(v)) o[k] = dynTr(v[k]);
    return o;
  }
  return v;
}

// ترجمه‌ی یک متن. جاهای خالی به شکل {name} نوشته می‌شن: tr("جلسه {n}", { n: 3 })
function tr(text, params) {
  let out = text;
  if (I18N_TABLE && Object.prototype.hasOwnProperty.call(I18N_TABLE, text)) out = I18N_TABLE[text];
  else if (APP_LANG !== "fa" && Object.prototype.hasOwnProperty.call(DYN_TABLE, text)) out = DYN_TABLE[text];
  if (params) out = out.replace(/\{(\w+)\}/g, (m, k) => (k in params ? String(params[k]) : m));
  return out;
}

// مثل tr، ولی مقدار جاهای خالی می‌تونه المنت React باشه (خروجی: آرایه‌ای از متن و المنت)
function trNode(text, params) {
  const out = tr(text);
  const parts = out.split(/(\{\w+\})/g);
  return parts.map((part, i) => {
    const m = /^\{(\w+)\}$/.exec(part);
    if (m && params && m[1] in params) return React.createElement(React.Fragment, { key: i }, params[m[1]]);
    return part;
  });
}

function setAppLanguage(code) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, code);
  } catch {
    // نادیده گرفته می‌شه
  }
  window.location.reload();
}

if (typeof document !== "undefined") {
  document.documentElement.lang = APP_LANG;
  document.documentElement.dir = APP_DIR;
  if (APP_DIR === "ltr") {
    // کلاس‌هایی که جهتِ فیزیکی دارن برای زبان‌های چپ‌به‌راست برعکس می‌شن
    const st = document.createElement("style");
    st.textContent = 'html[dir="ltr"] .text-right{text-align:left}html[dir="ltr"] .mr-auto{margin-right:0;margin-left:auto}';
    document.head.appendChild(st);
  }
}

// ---- Design tokens ----
// Background: #0B0B0D (near-black canvas)
// Card: #17161A
// Accent Red: #D91E2B (ring-rope red)
// Accent Gold: #F3EEE6 (championship belt gold)
// Off-white text: #F3EEE6
// Muted gray text: #8A8790

const LOGO_SRC = "assets/logo.png";

const BADGE1_SRC = "assets/badge1.jpg";

const BADGE2_SRC = "assets/badge2.jpg";

const BADGE3_SRC = "assets/badge3.jpg";
const BADGE4_SRC = "assets/badge4.jpg";

const BADGE5_SRC = "assets/badge5.jpg";

const BADGE6_SRC = "assets/badge6.jpg";


// عکس‌های پس‌زمینه‌ی رینگ بوکس - کم‌رنگ و به‌عنوان تکسچر پشت صفحات استفاده می‌شن
const ARENA_BG_1 = "assets/arena-bg-1.jpg";

const ARENA_BG_2 = "assets/arena-bg-2.jpg";

const ARENA_BG_3 = "assets/arena-bg-3.jpg";

const ARENA_BG_4 = "assets/arena-bg-4.jpg";

const ARENA_BG_5 = "assets/arena-bg-5.jpg";

// بر اساس اسم صفحه، یکی از عکس‌های رینگ رو برای پس‌زمینه انتخاب می‌کنه - برای تنوع بین بخش‌های مختلف اپ
function getScreenBackground(step) {
  if (step === "splash" || step === "signup" || step === "otp") return ARENA_BG_1;
  if (step === "home") return ARENA_BG_2;
  if (step?.startsWith("curriculum-") || step === "lesson") return ARENA_BG_3;
  if (step === "subscription") return ARENA_BG_4;
  return ARENA_BG_5; // پروفایل، صفحات اطلاعاتی، پشتیبانی، پنل ادمین و بقیه
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

const CHAPTER5_IMAGE_SRC = "assets/chapter6-image.jpg";

const CHAPTER6_IMAGE_SRC = "assets/chapter5-image.jpg";

const MEDAL_BRONZE_SRC = "assets/medal-bronze.png";
const MEDAL_SILVER_SRC = "assets/medal-silver.png";
const MEDAL_GOLD_SRC = "assets/medal-gold.png";

const FONT_LINK_ID = "boxing-app-fonts";

// ---------- تنظیمات اتصال به بک‌اند ----------
// بعد از دیپلوی کردن پوشه backend، آدرس سرورت رو اینجا بذار.
// مثال: "https://ringside-api.up.railway.app"
const API_BASE_URL = "https://api.naseri-group-iran.ir";

// تا وقتی آدرس بالا رو عوض نکردی، اپ در «حالت آزمایشی» کار می‌کنه:
// بدون نیاز به ایمیل/پیامک واقعی، هر ایمیل یا شماره + هر کد ۴ رقمی وارد اپ می‌شه
// تا بتونی همه‌ی بخش‌ها رو تست کنی. بعد از وصل کردن سرور واقعی، خودکار غیرفعال می‌شه.
const DEMO_MODE = API_BASE_URL.includes("YOUR_SERVER_URL");
const DEMO_ADMIN_IDENTIFIERS = ["yazdannaseri98@gmail.com", "yazdannaseri76@gmail.com"];

// ---------- وضعیت اینترنت ----------
// هرجا اینترنت قطع یا ضعیف باشه (ورود، جابه‌جایی بین صفحه‌ها، پخش ویدیو، پرداخت، پشتیبانی و...)
// همین‌جا تشخیص داده می‌شه و یه نوار هشدار بالای صفحه نشون می‌ده: «اینترنت دستگاه را چک کنید».
// وقتی اینترنت برگرده، نوار خودش جمع می‌شه و اطلاعات صفحه دوباره از سرور گرفته می‌شه.
const NETWORK_OFFLINE_MESSAGE = tr("اینترنت دستگاه را چک کنید");
const NETWORK_WEAK_MESSAGE = tr("اینترنت ضعیف است؛ دوباره امتحان کنید");
// سرور ایرانیه و با فیلترشکن (آی‌پی خارجی) ممکنه جواب نده یا صفحه‌ی بلاک بده؛ کاربر باید بدونه مشکل از فیلترشکنه
const NETWORK_VPN_HINT = tr("اگه فیلترشکن روشنه، خاموشش کن");
const NETWORK_BLOCKED_MESSAGE = tr("فیلترشکن را خاموش کنید");
const NETWORK_BLOCKED_DETAIL = tr("ارتباط با سرور برقرار نشد؛ فیلترشکن را خاموش کنید و دوباره امتحان کنید");
const NETWORK_OFFLINE_ERROR = `${NETWORK_OFFLINE_MESSAGE}${tr("؛ ")}${NETWORK_VPN_HINT}`;
const NETWORK_WEAK_ERROR = `${NETWORK_WEAK_MESSAGE} (${NETWORK_VPN_HINT})`;
const API_TIMEOUT_MS = 20000;
const API_VOICE_TIMEOUT_MS = 60000;
const CONNECTIVITY_PROBE_INTERVAL_MS = 4000;

const connectivity = {
  offlineFlag: typeof navigator !== "undefined" && navigator.onLine === false,
  timeoutFlag: false,
  blockedFlag: false, // سرور جواب داده ولی «صفحه‌ی بلاک/فیلتر» بوده (مثلاً با فیلترشکن)
  state: "ok", // "ok" | "weak" | "offline" | "blocked"
  listeners: new Set(),
  probeTimer: null,
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
  const type = typeof navigator !== "undefined" ? navigator.connection?.effectiveType : null;
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
  // یه جواب (هرچند صفحه‌ی بلاک) رسیده، یعنی خود اینترنت وصله و مشکل از مسیر/فیلترشکنه
  connectivity.offlineFlag = false;
  connectivity.timeoutFlag = false;
  connectivity.blockedFlag = true;
  refreshConnectivityState();
  startConnectivityProbe();
}

// جواب سرور ما همیشه JSON ـه. اگه به‌جاش یه صفحه‌ی HTML (مثلاً «دسترسی مسدوده») یا ریدایرکت اومد، یعنی یه فیلتر/دروازه
// جلوی ارتباط رو گرفته (معمولاً چون فیلترشکن روشنه). خطاهای عادی خود سرور (۴۰۴ و ۵xx) جزو این حساب نمی‌شن.
function isBlockedResponse(res) {
  const type = res.headers?.get?.("content-type") || "";
  if (/json/i.test(type)) return false;
  const s = res.status;
  return (s >= 200 && s < 400 && s !== 204) || s === 403 || s === 407 || s === 451;
}

function markNetworkSuccess() {
  connectivity.offlineFlag = false;
  connectivity.timeoutFlag = false;
  connectivity.blockedFlag = false;
  refreshConnectivityState();
}

// یه درخواست خیلی سبک به سرور؛ فقط برای فهمیدن این‌که اینترنت واقعاً کار می‌کنه یا نه
async function pingServer(timeoutMs = 6000) {
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
    markNetworkFailure(err?.name === "AbortError" ? "timeout" : "offline");
    return false;
  } finally {
    clearTimeout(timer);
  }
}

// تا وقتی اینترنت قطع/ضعیفه، هر چند ثانیه چک می‌کنه که برگشته یا نه
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
  navigator.connection?.addEventListener?.("change", refreshConnectivityState);
  if (connectivity.offlineFlag) {
    refreshConnectivityState();
    startConnectivityProbe();
  }
}

// جایگزین fetch برای همه‌ی درخواست‌های سرور: اگه اینترنت نباشه یا خیلی کند باشه،
// به‌جای پیام عجیب «Failed to fetch» یه خطای فارسی و قابل‌فهم می‌ده
async function apiFetch(url, options = {}) {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    markNetworkFailure("offline");
    throw new NetworkError(NETWORK_OFFLINE_ERROR, false);
  }
  const timeoutMs = String(url).includes("/voice") ? API_VOICE_TIMEOUT_MS : API_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    if (isBlockedResponse(res)) {
      markNetworkBlocked();
      const err = new NetworkError(NETWORK_BLOCKED_DETAIL, false);
      err.blocked = true;
      throw err;
    }
    markNetworkSuccess();
    if (APP_LANG !== "fa") {
      // پیام‌های خطای سرور فارسی هستن؛ اگه ترجمه داشته باشن، به زبان انتخاب‌شده نشون داده می‌شن
      const origJson = res.json.bind(res);
      res.json = async () => {
        const data = await origJson();
        if (data && typeof data.error === "string") data.error = tr(data.error);
        return data;
      };
    }
    return res;
  } catch (err) {
    if (err?.isNetworkError) throw err;
    const timedOut = err?.name === "AbortError";
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

// اگه توکن روی سرور دیگه معتبر نبود (منقضی شده یا دستکاری شده)، همه‌جای اپ از همین
// یه نقطه خبردار می‌شه و کاربر رو با خیال راحت خارج می‌کنه - به‌جای این‌که خطاهای
// عجیب و غریب بی‌دلیل توی صفحات مختلف نشون بده.
let onAuthFailure = null;
function triggerAuthFailure() {
  onAuthFailure?.();
}

function normalizeEmail(rawInput) {
  return rawInput.trim().toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeIranPhone(rawInput) {
  // ورودی مثل "912 345 6789" رو به "09123456789" تبدیل می‌کند
  const digits = rawInput.replace(/\D/g, "");
  return digits.startsWith("0") ? digits : "0" + digits;
}

function isValidIranPhone(value) {
  return /^09\d{9}$/.test(value);
}

// یه ورودی ایمیل یا شماره موبایل رو به شکل نرمال‌شده برمی‌گردونه (هرکدوم که باشه)
function normalizeIdentifier(raw, method) {
  return method === "phone" ? normalizeIranPhone(raw) : normalizeEmail(raw);
}

function isValidIdentifier(raw, method) {
  return method === "phone" ? isValidIranPhone(raw) : isValidEmail(raw);
}

// جلوی کاراکترهای خطرناک/بی‌فایده رو توی متن‌هایی که کاربر خودش وارد می‌کنه
// (مثل اسم پروفایل) می‌گیره و طولش رو محدود می‌کنه
function sanitizeUserText(raw, maxLength) {
  return raw.replace(/[<>]/g, "").trim().slice(0, maxLength);
}

async function apiSendOtp(rawIdentifier, method) {
  const identifier = normalizeIdentifier(rawIdentifier, method);
  const res = await apiFetch(`${API_BASE_URL}/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || tr("ارسال کد با خطا مواجه شد"));
  }
  return data;
}

async function apiVerifyOtp(rawIdentifier, method, code, deviceId, force) {
  const identifier = normalizeIdentifier(rawIdentifier, method);
  const res = await apiFetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, code, deviceId, force: Boolean(force) }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    const err = new Error(data.error || tr("کد وارد شده نامعتبر است"));
    err.code = data.code;
    throw err;
  }
  return data;
}

// ---------- عکس پروفایل ----------
const AVATAR_SIZE = 240;
const MAX_PHOTO_BYTES = 80 * 1024 * 1024;

// عکس انتخاب‌شده رو به یه مربع ۲۴۰×۲۴۰ تبدیل می‌کنه، بدون این‌که کل فایل به‌صورت متن (base64) خونده بشه و
// بدون decode کامل عکس‌های خیلی بزرگ (مثلاً ۲۰ تا ۳۰ مگابایتی دوربین گوشی که صدها مگابایت حافظه می‌خوره و WebView رو می‌ترکونه).
// عکس مستقیم از روی فایل و هم‌زمان با کوچیک شدن decode می‌شه.
async function makeAvatarDataUrl(file) {
  if (!file || file.size > MAX_PHOTO_BYTES) throw new Error("PHOTO_TOO_LARGE");
  let source = null;
  let objectUrl = null;
  try {
    if (typeof createImageBitmap === "function") {
      try {
        // فقط عرض داده می‌شه؛ ارتفاع با حفظ نسبت خودکار حساب می‌شه. جهت عکس (EXIF) هم رعایت می‌شه.
        source = await createImageBitmap(file, { resizeWidth: AVATAR_SIZE * 2, resizeQuality: "medium" });
      } catch {
        source = null; // WebView قدیمی یا فرمت ناشناخته؛ می‌ریم سراغ روش دوم
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
    source?.close?.();
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }
}

// ---------- اطلاعات جدا برای هر حساب ----------
// پیشرفت، تایم تمرین، پروفایل، آخرین جلسه و یادآور هر کاربر فقط برای همون حساب ذخیره و نشون داده می‌شه
// (قبلاً همه‌ی حساب‌هایی که روی یه گوشی وارد می‌شدن یه اطلاعات مشترک می‌دیدن).
const ACCOUNT_DATA_KEYS = ["last-lesson", "reminder", "completed-lessons", "practice-seconds", "profile-info", "sync-pending", "last-basic"];

function accountKey(identifier, base) {
  return `acct:${identifier}:${base}`;
}

// اطلاعات قدیمیِ مشترک (قبل از جداسازی حساب‌ها) مال هیچ حساب مشخصی نیست؛ پاک می‌شه تا به حساب دیگه‌ای نشت نکنه
async function purgeLegacyAccountData() {
  for (const key of ACCOUNT_DATA_KEYS) await AppStorage.remove(key);
}

// ---------- حساب با شماره موبایل + رمز عبور ----------
// ارقام فارسی/عربی رو به لاتین تبدیل می‌کنه (کاربر ایرانی ممکنه با کیبورد فارسی تایپ کنه)
function toLatinDigits(input) {
  return String(input ?? "")
    .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

const OTP_CODE_LENGTH = 6;

// قوانین رمز؛ دقیقاً همونی که سرور هم چک می‌کنه (این‌جا فقط برای نشون دادن زنده‌ی «چی کمه»)
function getPasswordChecks(rawPassword, phone) {
  const password = toLatinDigits(rawPassword);
  const phoneDigits = toLatinDigits(phone || "").replace(/^0/, "");
  return {
    length: Array.from(password).length >= 8 && Array.from(password).length <= 64,
    mix: /\p{L}/u.test(password) && /[0-9]/.test(password),
    notPhone: !phoneDigits || !password.replace(/\D/g, "").includes(phoneDigits),
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
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    const err = new Error(data.error || tr("خطایی رخ داد. دوباره امتحان کن"));
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

// ---------- پیشرفت روی سرور ----------
// خروجی: پیشرفت کاربر، یا null اگه نشد (اینترنت قطع/خطا). اگه این دستگاه دیگه «دستگاه فعال» نباشه، کاربر خارج می‌شه.
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
  } catch {
    return null;
  }
}

async function apiFetchJourney(token) {
  if (DEMO_MODE || !token) return null;
  try {
    const res = await apiFetch(`${API_BASE_URL}/journey`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 401) { triggerAuthFailure(); return null; }
    const data = await res.json().catch(() => ({}));
    return res.ok && data.ok ? data.journey : null;
  } catch { return null; }
}
async function apiPutJourney(token, payload) {
  if (DEMO_MODE || !token) return null;
  try {
    const res = await apiFetch(`${API_BASE_URL}/journey`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
    if (res.status === 401) { triggerAuthFailure(); return null; }
    const data = await res.json().catch(() => ({}));
    return res.ok && data.ok ? data.journey : null;
  } catch { return null; }
}

async function apiPutProgress(token, payload) {
  if (DEMO_MODE) return null;
  try {
    const res = await apiFetch(`${API_BASE_URL}/progress`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    if (res.status === 401) {
      triggerAuthFailure();
      return null;
    }
    const data = await res.json().catch(() => ({}));
    return res.ok && data.ok ? data.progress : null;
  } catch {
    return null;
  }
}

// تغییرات هنوز-ارسال‌نشده رو با هم ادغام می‌کنه (جلسه‌ها اضافه می‌شن، تایم تمرین فقط بیشتر می‌شه، بقیه آخرین مقدار)
function mergePendingSync(base, partial) {
  const next = { ...base };
  if (partial.completed) next.completed = { ...(base.completed || {}), ...partial.completed };
  if (partial.practiceSeconds !== undefined) next.practiceSeconds = Math.max(base.practiceSeconds || 0, partial.practiceSeconds);
  if (partial.lastLesson !== undefined) next.lastLesson = partial.lastLesson;
  if (partial.profile !== undefined) next.profile = { ...(base.profile || {}), ...partial.profile };
  return next;
}

async function apiCheckSession(token, deviceId) {
  if (DEMO_MODE) return true;
  try {
    const res = await apiFetch(`${API_BASE_URL}/auth/session-check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ deviceId }),
    });
    if (res.status === 401) {
      triggerAuthFailure();
      return false;
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return true; // اگه سرور جواب نداد، کاربر رو بی‌دلیل بیرون نمی‌کنیم
    return Boolean(data.active);
  } catch {
    return true;
  }
}

// لایه‌ی ذخیره‌سازی محلی: روی خود گوشی (اپ نصب‌شده) از حافظه‌ی دائمی بومی
// (Capacitor Preferences) استفاده می‌کنه که واقعاً بین بازکردن‌های مختلف اپ باقی می‌مونه.
// اگه بیرون از اپ (مثلاً همین پیش‌نمایش) اجرا بشه، خودش با ذخیره‌سازی محلی جایگزین کار می‌کنه.
const AppStorage = {
  async get(key) {
    try {
      const Prefs = window.Capacitor?.Plugins?.Preferences;
      if (Prefs) {
        const { value } = await Prefs.get({ key });
        return value ?? null;
      }
      if (window.storage) {
        const result = await window.storage.get(key, false);
        return result?.value ?? null;
      }
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  async set(key, value) {
    try {
      const Prefs = window.Capacitor?.Plugins?.Preferences;
      if (Prefs) return void (await Prefs.set({ key, value }));
      if (window.storage) return void (await window.storage.set(key, value, false));
      localStorage.setItem(key, value);
    } catch {
      // ذخیره نشد؛ تغییرات همچنان توی همین session نمایش داده می‌شه
    }
  },
  async remove(key) {
    try {
      const Prefs = window.Capacitor?.Plugins?.Preferences;
      if (Prefs) return void (await Prefs.remove({ key }));
      if (window.storage) return void (await window.storage.delete(key, false));
      localStorage.removeItem(key);
    } catch {
      // مشکلی نیست، شاید از قبل چیزی ذخیره نشده بود
    }
  },
};

async function getOrCreateDeviceId() {
  const key = "device-id";
  const existing = await AppStorage.get(key);
  if (existing) return existing;
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `dev-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  await AppStorage.set(key, id);
  return id;
}

const GUEST_USER = { identifier: "guest", isGuest: true, isAdmin: false, plan: "none" };
async function apiGuestVisit(deviceId) {
  if (DEMO_MODE || !deviceId) return;
  try {
    await fetch(`${API_BASE_URL}/guest/visit`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ deviceId }) });
  } catch {}
}

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // ۳۰ روز

async function saveSession(token, user) {
  await AppStorage.set("auth-session", JSON.stringify({ token, user, savedAt: Date.now() }));
}

async function loadSession() {
  const value = await AppStorage.get("auth-session");
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    if (!parsed?.token || !parsed?.savedAt) return null;
    if (Date.now() - parsed.savedAt > SESSION_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function clearSession() {
  await AppStorage.remove("auth-session");
}

// آدرس ویدیوها از سرور به‌صورت نسبی برمی‌گرده (مثلاً "/uploads/basic-1.mp4")؛
// چون اپ از یه آدرس دیگه (نه خود سرور) لود می‌شه، باید همیشه آدرس کامل سرور رو جلوش بذاریم وگرنه پخش نمی‌شه
function toAbsoluteVideoUrl(url) {
  if (!url) return url;
  return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
}

// خروجی: لیست ویدیوها، یا null اگه گرفتن لیست شکست خورد (تا «ویدیو نیست» با «لیست دریافت نشد» قاطی نشه)
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
  } catch {
    return null;
  }
}

async function apiUploadVideo(curriculumKey, n, file, token) {
  const form = new FormData();
  form.append("video", file);
  const res = await apiFetch(`${API_BASE_URL}/videos/${curriculumKey}/${n}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || tr("آپلود ویدیو با خطا مواجه شد"));
  }
  return toAbsoluteVideoUrl(data.url);
}

// ---------- زیرنویس ----------
const SUB_LANG_CODES = ["fa", "en", "ar", "tr", "zh"];
// [نام فارسی, نام بومی] هر زبان؛ نام بومی توی منوی CC پلیر نشون داده می‌شه و نام فارسی کنارش توی لیست انتخاب ادمین
const SUB_LANG_TABLE = {
  fa: ["فارسی", "فارسی"], en: ["انگلیسی", "English"], ar: ["عربی", "العربية"], tr: ["ترکی استانبولی", "Türkçe"], zh: ["چینی", "中文"],
  es: ["اسپانیایی", "Español"], fr: ["فرانسوی", "Français"], de: ["آلمانی", "Deutsch"], ru: ["روسی", "Русский"], it: ["ایتالیایی", "Italiano"],
  pt: ["پرتغالی", "Português"], hi: ["هندی", "हिन्दी"], ur: ["اردو", "اردو"], ja: ["ژاپنی", "日本語"], ko: ["کره‌ای", "한국어"],
  az: ["آذربایجانی", "Azərbaycanca"], id: ["اندونزیایی", "Bahasa Indonesia"], nl: ["هلندی", "Nederlands"], pl: ["لهستانی", "Polski"],
  uk: ["اوکراینی", "Українська"], he: ["عبری", "עברית"], ku: ["کردی", "کوردی"], ps: ["پشتو", "پښتو"], hy: ["ارمنی", "Հայերեն"],
  ka: ["گرجی", "ქართული"], tk: ["ترکمنی", "Türkmençe"], uz: ["ازبکی", "Oʻzbekcha"], bn: ["بنگالی", "বাংলা"], vi: ["ویتنامی", "Tiếng Việt"],
  th: ["تایلندی", "ไทย"], sv: ["سوئدی", "Svenska"], el: ["یونانی", "Ελληνικά"], ro: ["رومانیایی", "Română"], cs: ["چکی", "Čeština"],
  hu: ["مجاری", "Magyar"], da: ["دانمارکی", "Dansk"], no: ["نروژی", "Norsk"], fi: ["فنلاندی", "Suomi"], bg: ["بلغاری", "Български"],
  sr: ["صربی", "Српски"], hr: ["کرواتی", "Hrvatski"], sk: ["اسلواکی", "Slovenčina"], sl: ["اسلوونیایی", "Slovenščina"], lt: ["لیتوانیایی", "Lietuvių"],
  lv: ["لتونیایی", "Latviešu"], et: ["استونیایی", "Eesti"], ms: ["مالایی", "Bahasa Melayu"], fil: ["فیلیپینی", "Filipino"], sw: ["سواحیلی", "Kiswahili"],
  ta: ["تامیلی", "தமிழ்"], te: ["تلوگو", "తెలుగు"], ml: ["مالایالام", "മലയാളം"], mr: ["مراتی", "मराठी"], gu: ["گجراتی", "ગુજરાતી"],
  pa: ["پنجابی", "ਪੰਜਾਬੀ"], ne: ["نپالی", "नेपाली"], si: ["سینهالی", "සිංහල"], kk: ["قزاقی", "Қазақша"], ky: ["قرقیزی", "Кыргызча"],
  tg: ["تاجیکی", "Тоҷикӣ"], mn: ["مغولی", "Монгол"], am: ["امهری", "አማርኛ"], so: ["سومالیایی", "Soomaali"], ha: ["هوسایی", "Hausa"],
  yo: ["یوروبایی", "Yorùbá"], zu: ["زولو", "isiZulu"], af: ["آفریکانس", "Afrikaans"], sq: ["آلبانیایی", "Shqip"], bs: ["بوسنیایی", "Bosanski"],
  mk: ["مقدونی", "Македонски"], ca: ["کاتالان", "Català"], is: ["ایسلندی", "Íslenska"], ga: ["ایرلندی", "Gaeilge"], my: ["برمه‌ای", "မြန်မာ"],
  km: ["خمری", "ខ្មែរ"], lo: ["لائوسی", "ລາວ"],
};
const SUB_LANG_NAMES = Object.fromEntries(Object.entries(SUB_LANG_TABLE).map(([c, v]) => [c, v[1]]));
// زبان‌های پیشنهادی برای «افزودن زبان دیگر» (به‌جز ۵ زبان اصلی اپ)؛ هر کد زبان دیگه‌ای رو هم می‌شه دستی وارد کرد
const SUB_EXTRA_LANG_CODES = Object.keys(SUB_LANG_TABLE).filter((c) => !SUB_LANG_CODES.includes(c));
const SUB_LANG_CODE_RE = /^[a-z]{2,3}(-[a-z0-9]{2,8})?$/;
const SUB_RTL_LANGS = new Set(["fa", "ar", "ur", "he", "ku", "ps"]);
const subLangName = (code) => SUB_LANG_NAMES[code] || String(code).toUpperCase();
const subLangIsRtl = (code) => SUB_RTL_LANGS.has(String(code).split("-")[0]);

// زبان‌هایی که برای این ویدیو زیرنویس دارن؛ در صورت خطا لیست خالی
async function apiFetchSubLangs(subKey) {
  const m = /^([a-z]+)-(\d+)$/.exec(subKey || "");
  if (!m || DEMO_MODE) return [];
  try {
    const res = await apiFetch(`${API_BASE_URL}/videos/subtitles/${m[1]}/${m[2]}`);
    const data = await res.json().catch(() => null);
    return res.ok && data && data.ok ? data.langs || [] : [];
  } catch {
    return [];
  }
}

async function apiFetchSubText(subKey, lang) {
  const m = /^([a-z]+)-(\d+)$/.exec(subKey || "");
  if (!m) return "";
  // نکته: اینجا عمداً fetch ساده‌ست، نه apiFetch؛ چون جواب زیرنویس متن خالصه (نه JSON) و apiFetch هر جواب غیر JSON رو
  // «اینترنت فیلتره» تشخیص می‌ده و زیرنویس هیچ‌وقت لود نمی‌شد
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(`${API_BASE_URL}/videos/subtitles/${m[1]}/${m[2]}/${lang}`, { signal: controller.signal });
    return res.ok ? await res.text() : "";
  } catch {
    return "";
  } finally {
    clearTimeout(timer);
  }
}

async function apiUploadSub(subKey, lang, file, token) {
  const m = /^([a-z]+)-(\d+)$/.exec(subKey || "");
  const form = new FormData();
  form.append("subtitle", file);
  const res = await apiFetch(`${API_BASE_URL}/videos/subtitles/${m[1]}/${m[2]}/${lang}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("آپلود زیرنویس با خطا مواجه شد"));
}

// لیست سراسری زبان‌های اضافه (برای همه‌ی جلسه‌ها)
async function apiFetchSubLanguages() {
  if (DEMO_MODE) return [];
  try {
    const res = await apiFetch(`${API_BASE_URL}/videos/subtitle-languages`);
    const data = await res.json().catch(() => null);
    return res.ok && data && data.ok ? data.languages || [] : [];
  } catch {
    return [];
  }
}

async function apiSetSubLanguage(lang, token, remove) {
  const res = await apiFetch(`${API_BASE_URL}/videos/subtitle-languages/${lang}`, {
    method: remove ? "DELETE" : "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("آپلود زیرنویس با خطا مواجه شد"));
  return data.languages || [];
}

async function apiDeleteSub(subKey, lang, token) {
  const m = /^([a-z]+)-(\d+)$/.exec(subKey || "");
  const res = await apiFetch(`${API_BASE_URL}/videos/subtitles/${m[1]}/${m[2]}/${lang}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("حذف زیرنویس با خطا مواجه شد"));
}

// متن SRT -> [{ start, end, text }] (ثانیه)
function parseSrt(text) {
  const cues = [];
  const toSec = (h, m, sec, ms) => Number(h) * 3600 + Number(m) * 60 + Number(sec) + Number(String(ms).padEnd(3, "0")) / 1000;
  const blocks = String(text || "").replace(/^\uFEFF/, "").replace(/\r/g, "").split(/\n{2,}/);
  for (const block of blocks) {
    const lines = block.split("\n").filter((l) => l.trim() !== "");
    const i = lines.findIndex((l) => l.includes("-->"));
    if (i < 0) continue;
    const m = /(\d+):(\d{2}):(\d{2})[,.](\d{1,3})\s*-->\s*(\d+):(\d{2}):(\d{2})[,.](\d{1,3})/.exec(lines[i]);
    if (!m) continue;
    const body = lines.slice(i + 1).join("\n").replace(/<[^>]+>/g, "").replace(/\{\\[^}]*\}/g, "").trim();
    if (!body) continue;
    cues.push({ start: toSec(m[1], m[2], m[3], m[4]), end: toSec(m[5], m[6], m[7], m[8]), text: body });
  }
  return cues.sort((a, b) => a.start - b.start);
}

function CcIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M10.5 10.2a2.2 2.2 0 1 0 0 3.6" />
      <path d="M17 10.2a2.2 2.2 0 1 0 0 3.6" />
    </svg>
  );
}

async function apiCreatePayment(token, plan) {
  if (DEMO_MODE) {
    throw new Error(tr("سرور هنوز وصل نشده — این دکمه بعد از دیپلوی بک‌اند فعال می‌شه"));
  }
  const res = await apiFetch(`${API_BASE_URL}/payment/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ plan }),
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || tr("اتصال به درگاه پرداخت با خطا مواجه شد"));
  }
  return data.paymentUrl;
}

async function apiFetchLessonTitles() {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-lesson-titles");
    if (!stored) return {};
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }
  try {
    const res = await apiFetch(`${API_BASE_URL}/lessons/titles`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return {};
    return data.titles || {};
  } catch {
    return {};
  }
}

async function apiSetLessonTitle(curriculumKey, n, title, token) {
  if (DEMO_MODE) {
    // توی حالت آزمایشی هم روی خود گوشی ذخیره می‌مونه (تا بستن و باز کردن دوباره‌ی اپ)
    const stored = await AppStorage.get("demo-lesson-titles");
    const titles = stored ? JSON.parse(stored) : {};
    titles[`${curriculumKey}-${n}`] = title;
    await AppStorage.set("demo-lesson-titles", JSON.stringify(titles));
    return title;
  }
  const res = await apiFetch(`${API_BASE_URL}/lessons/titles/${curriculumKey}/${n}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ title }),
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || tr("تغییر عنوان با خطا مواجه شد"));
  }
  return data.title;
}

async function apiFetchUsers(token) {
  if (DEMO_MODE) {
    return {
      total: 1,
      users: [{ identifier: "demo@example.com", isAdmin: true, plan: "none", planExpiresAt: null, createdAt: Date.now() }],
    };
  }
  const res = await apiFetch(`${API_BASE_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || tr("دریافت لیست کاربران با خطا مواجه شد"));
  }
  return { users: data.users || [], total: data.total || 0 };
}

// عدد واقعی کاربرها (فقط ادمین؛ سرور برای بقیه ۴۰۳ می‌ده). اگه نشد null برمی‌گردونه.
async function apiFetchAdminStats(token) {
  if (DEMO_MODE) return { totalUsers: 1, guestUsers: 0, registeredUsers: 1, activeSubscriptions: 0 };
  try {
    const res = await apiFetch(`${API_BASE_URL}/admin/stats`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 401) triggerAuthFailure();
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return null;
    return {
      totalUsers: Number(data.totalUsers) || 0,
      guestUsers: Number(data.guestUsers) || 0,
      guestDevices: Number(data.guestDevices) || 0,
      registeredUsers: Number(data.registeredUsers) || 0,
      activeSubscriptions: Number(data.activeSubscriptions) || 0,
    };
  } catch {
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
  } catch {
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
    body: JSON.stringify({ count }),
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || tr("تغییر عدد با خطا مواجه شد"));
  }
  return data.count;
}

const NEW_CHAPTER_KEYS = ["fight", "fightb", "partner", "focus"];

async function apiFetchChapterVisibility() {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-chapter-visibility");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // نادیده می‌گیریم و پیش‌فرض برمی‌گردونیم
      }
    }
    return { fight: false, fightb: false, partner: false, focus: false };
  }
  try {
    const res = await apiFetch(`${API_BASE_URL}/settings/chapters`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return { fight: false, fightb: false, partner: false, focus: false };
    return data.visibility || { fight: false, fightb: false, partner: false, focus: false };
  } catch {
    return { fight: false, fightb: false, partner: false, focus: false };
  }
}

async function apiSetChapterVisibility(key, visible, token) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-chapter-visibility");
    const visibility = stored ? JSON.parse(stored) : { fight: false, fightb: false, partner: false, focus: false };
    visibility[key] = visible;
    await AppStorage.set("demo-chapter-visibility", JSON.stringify(visibility));
    return visible;
  }
  const res = await apiFetch(`${API_BASE_URL}/settings/chapters/${key}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ visible }),
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || tr("تغییر وضعیت فصل با خطا مواجه شد"));
  }
  return data.visible;
}

async function apiFetchChapterTitles() {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-chapter-titles");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // نادیده می‌گیریم و پیش‌فرض برمی‌گردونیم
      }
    }
    return {};
  }
  try {
    const res = await apiFetch(`${API_BASE_URL}/settings/chapter-titles`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return {};
    return data.titles || {};
  } catch {
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
    body: JSON.stringify({ title }),
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || tr("تغییر عنوان فصل با خطا مواجه شد"));
  }
  return data.title;
}

// ---------- پشتیبانی / تیکت ----------
// نسخه‌ی خلاصه‌شده‌ی ربات پشتیبانی، فقط برای تست توی حالت DEMO (نسخه‌ی اصلی و کامل‌تر روی خود سرور پیاده‌سازی شده)
const DEMO_BOT_RULES = [
  { keywords: ["قیمت", "هزینه", "چقدر", "تومان"], answer: "اشتراک دوره اول و دوم هرکدوم ۱,۴۹۰,۰۰۰ تومان و ۱۲ ماه اعتبار دارن. دوره اول فصل‌های پایه رو باز می‌کنه، دوره دوم فصل‌های تخصصی رو." },
  { keywords: ["دستگاه", "گوشی جدید", "همزمان"], answer: "هر حساب فقط روی یک گوشی همزمان فعاله." },
  { keywords: ["دانلود ویدیو", "بازنشر"], answer: "دانلود یا بازنشر ویدیوها مجاز نیست، فقط برای استفاده‌ی شخصی داخل اپه." },
  { keywords: ["سلام", "درود"], answer: "سلام! خوش اومدی 👋 چه کمکی از دستم برمیاد؟" },
  { keywords: ["ممنون", "مرسی", "تشکر"], answer: "خواهش می‌کنم 🙏 هر سوال دیگه‌ای هم داشتی بپرس." },
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
    body: JSON.stringify({ message }),
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("ارسال پیام با خطا مواجه شد"));
  return { botReply: data.botReply || null };
}

async function apiFetchMySupportMessages(token) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-support-messages");
    return stored ? JSON.parse(stored) : [];
  }
  const res = await apiFetch(`${API_BASE_URL}/support/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("دریافت پیام‌ها با خطا مواجه شد"));
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
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("دریافت لیست گفتگوها با خطا مواجه شد"));
  return data.threads || [];
}

async function apiFetchSupportThread(token, identifier) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-support-messages");
    return stored ? JSON.parse(stored) : [];
  }
  const res = await apiFetch(`${API_BASE_URL}/support/threads/${encodeURIComponent(identifier)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("دریافت گفتگو با خطا مواجه شد"));
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
    body: JSON.stringify({ message }),
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("ارسال پاسخ با خطا مواجه شد"));
}

async function apiSendSupportVoice(token, audioData) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-support-messages");
    const messages = stored ? JSON.parse(stored) : [];
    messages.push({ sender: "user", message: tr("پیام صوتی"), type: "voice", audioData, createdAt: Date.now() });
    await AppStorage.set("demo-support-messages", JSON.stringify(messages));
    return { botReply: null };
  }
  const res = await apiFetch(`${API_BASE_URL}/support/messages/voice`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ audioData }),
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("ارسال پیام صوتی با خطا مواجه شد"));
  return { botReply: data.botReply || null };
}

async function apiSendSupportVoiceReply(token, identifier, audioData) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-support-messages");
    const messages = stored ? JSON.parse(stored) : [];
    messages.push({ sender: "admin", message: tr("پیام صوتی"), type: "voice", audioData, createdAt: Date.now() });
    await AppStorage.set("demo-support-messages", JSON.stringify(messages));
    return;
  }
  const res = await apiFetch(`${API_BASE_URL}/support/threads/${encodeURIComponent(identifier)}/reply/voice`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ audioData }),
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("ارسال پاسخ صوتی با خطا مواجه شد"));
}


function formatExpiryDate(timestamp) {
  try {
    return new Date(timestamp).toLocaleDateString(NUM_LOCALE, { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return "";
  }
}

function formatMessageTime(timestamp) {
  try {
    const d = new Date(timestamp);
    const parts = new Intl.DateTimeFormat(`${NUM_LOCALE}-u-nu-latn`, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(d);
    const get = (type) => parts.find((p) => p.type === type)?.value || "";
    const datePart = `${get("day")}/${get("month")}/${get("year")}`;
    const timePart = d.toLocaleTimeString(`${NUM_LOCALE}-u-nu-latn`, { hour: "2-digit", minute: "2-digit" });
    return `${datePart},,${timePart}`;
  } catch {
    return "";
  }
}

// مثل apiCheckPlanStatus ولی اگه ارتباط/سرور مشکل داشت null برمی‌گردونه (تا اشتراک کاربر الکی «بدون اشتراک» نشون داده نشه)
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
  } catch {
    return null;
  }
}

// متن تبلیغاتی بالای صفحه‌ی اشتراک (ادمین ویرایشش می‌کنه؛ خالی = متن پیش‌فرض)
async function apiFetchDynTranslations() {
  if (DEMO_MODE || APP_LANG === "fa") return null;
  try {
    const res = await apiFetch(`${API_BASE_URL}/translations/${APP_LANG}`);
    const data = await res.json().catch(() => ({}));
    if (data.ok && data.map && typeof data.map === "object") {
      AppStorage.set(`dyn-tr-${APP_LANG}`, JSON.stringify(data.map));
      return data.map;
    }
  } catch {}
  return null;
}

async function apiFetchPromoText() {
  if (DEMO_MODE) return "";
  try {
    const res = await apiFetch(`${API_BASE_URL}/settings/promo-text`);
    const data = await res.json().catch(() => ({}));
    return data.ok ? String(data.text || "") : "";
  } catch {
    return "";
  }
}

// ---------- قیمت و متن باکس‌های اشتراک (ادمین ویرایش می‌کنه) ----------
// متن خالی یعنی «متن پیش‌فرض اپ»؛ قیمت همون عددیه که به درگاه پرداخت (زرین‌پال/سپ) هم فرستاده می‌شه
const DEFAULT_PLANS = {
  silver: { title: "", months: 12, price: 1490000, originalPrice: 2000000, badge: "", description: "", buttonText: "" },
  gold: { title: "", months: 12, price: 1490000, originalPrice: 2000000, badge: "", description: "", buttonText: "" },
};

function mergePlans(data) {
  const out = {};
  for (const key of ["silver", "gold"]) out[key] = { ...DEFAULT_PLANS[key], ...((data && data[key]) || {}) };
  return out;
}

// ۱۴۹۰۰۰۰ -> "۱,۴۹۰,۰۰۰" (فارسی) یا "1,490,000" (بقیه‌ی زبان‌ها)
function formatPrice(n) {
  const v = Math.round(Number(n) || 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return APP_LANG === "fa" ? v.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]) : v;
}

// ارقام فارسی/عربی و جداکننده‌ها رو به عدد معمولی تبدیل می‌کنه (برای فیلدهای عددی ادمین)
function parseNumberInput(v) {
  const latin = String(v || "")
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[^0-9]/g, "");
  return latin ? Number(latin) : 0;
}

async function apiFetchPlans() {
  if (DEMO_MODE) return DEFAULT_PLANS;
  try {
    const res = await apiFetch(`${API_BASE_URL}/settings/plans`);
    const data = await res.json().catch(() => ({}));
    return data.ok ? mergePlans(data.plans) : DEFAULT_PLANS;
  } catch {
    return DEFAULT_PLANS;
  }
}

async function apiSavePlan(token, key, plan) {
  const res = await apiFetch(`${API_BASE_URL}/settings/plans/${key}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(plan),
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("ذخیره نشد"));
  return mergePlans(data.plans);
}

async function apiResetPlan(token, key) {
  const res = await apiFetch(`${API_BASE_URL}/settings/plans/${key}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("ذخیره نشد"));
  return mergePlans(data.plans);
}

async function apiSetPromoText(token, text) {
  if (DEMO_MODE) return text;
  const res = await apiFetch(`${API_BASE_URL}/settings/promo-text`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ text }),
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("ذخیره‌ی متن انجام نشد"));
  return String(data.text || "");
}

async function apiCheckPlanStatus(token) {
  if (DEMO_MODE) return { plan: "none", planExpiresAt: null };
  try {
    const res = await apiFetch(`${API_BASE_URL}/payment/status`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      triggerAuthFailure();
      return { plan: "none", planExpiresAt: null };
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return { plan: "none", planExpiresAt: null };
    return { plan: data.plan || "none", planExpiresAt: data.planExpiresAt || null };
  } catch {
    return { plan: "none", planExpiresAt: null };
  }
}

function useFonts() {
  useEffect(() => {
    // فونت‌ها داخل خود اپ هستن (موقع ساخت APK گذاشته می‌شن)؛ دیگه از گوگل نمی‌گیریم
    if (window.__LOCAL_FONTS__) return;
    if (document.getElementById(FONT_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;900&family=Oswald:wght@500;600;700&family=Bebas+Neue&display=swap";
    document.head.appendChild(link);
  }, []);
}

function useDisableZoom() {
  useEffect(() => {
    // متا تگ viewport رو طوری تنظیم می‌کنیم که مرورگر اجازه‌ی زوم نده
    let meta = document.querySelector('meta[name="viewport"]');
    const hadMeta = Boolean(meta);
    const prevContent = meta?.getAttribute("content");
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "viewport");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
    );

    // خیلی از مرورگرهای موبایل (خصوصاً iOS Safari) به متا تگ بالا احترام نمی‌ذارن
    // برای همین جلوی ژست‌های زوم رو هم مستقیماً می‌گیریم
    const preventGesture = (e) => e.preventDefault();
    const preventMultiTouch = (e) => {
      if (e.touches && e.touches.length > 1) e.preventDefault();
    };
    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e) => {
      const now = Date.now();
      // داخل پلیر ویدیو دوتپ برای جلو/عقب بردن لازمه؛ زوم هم از قبل با viewport و touch-action بسته‌ست
      if (e.target?.closest?.("[data-fast-tap]")) {
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
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.5 3c-1.4 0-2.6.7-3.3 1.8-.5-.2-1.1-.3-1.7-.3-1.9 0-3.5 1.2-4 2.9-.4-.1-.8-.2-1.2-.2C6 7.2 4.2 9 4.2 11.3v3.4C4.2 18.6 7.6 22 11.7 22h1.6c3.7 0 6.7-3 6.7-6.7V8.5C20 5.5 22.5 3 18.5 3z" opacity="0.15"/>
      <path d="M15.8 2.2c-1.6 0-3 .9-3.7 2.2-.6-.3-1.3-.4-2-.4-2.1 0-3.9 1.4-4.5 3.3-.3-.1-.7-.1-1-.1C2.5 7.2.8 9 .8 11.1v3.6C.8 18.9 4.4 22.5 8.6 22.5h1.8c4.2 0 7.6-3.4 7.6-7.6V7.7c0-.5.4-.9.9-.9.6 0 1.1-.5 1.1-1.1v-.6c0-1.6-1.3-2.9-2.9-2.9h-1.3z"/>
    </svg>
  );
}

function BeltIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="8" y="9" width="8" height="6" rx="1" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <path d="M2 11c2 0 4 .5 6 2M22 11c-2 0-4 .5-6 2M2 15c2 0 4-.5 6-2M22 15c-2 0-4-.5-6-2" />
    </svg>
  );
}

function RingIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="5" y="5" width="14" height="14" rx="1" />
      <circle cx="5" cy="5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="19" cy="5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="5" cy="19" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="19" cy="19" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function RopeDivider() {
  return (
    <div className="relative h-3 my-1 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0" style={{ height: 3, borderRadius: 2, background: "linear-gradient(90deg,#1C6FD1 0 33.3%,#F3EEE6 33.3% 66.6%,#D91E2B 66.6% 100%)", opacity: 0.9, boxShadow: "0 0 10px rgba(77,163,255,0.35)" }} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 8px, rgba(217,30,43,0.35) 8px 9px, transparent 9px 18px)",
        }}
      />
    </div>
  );
}

function WifiOffIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h.01" />
      <path d="M8.5 16.43a5 5 0 0 1 7 0" />
      <path d="M5 12.86a10 10 0 0 1 5.17-2.69" />
      <path d="M19 12.86a10 10 0 0 0-2.01-1.48" />
      <path d="M2 8.82a15 15 0 0 1 4.18-2.65" />
      <path d="M10.7 5.1A15 15 0 0 1 22 8.82" />
      <path d="M2 2l20 20" />
    </svg>
  );
}

// نوار هشدار اینترنت: بالای همه‌ی صفحه‌ها (جزو چینش صفحه‌ست؛ روی دکمه‌ها نمی‌افته)
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

  const view =
    state === "blocked"
      ? { bg: "#4a1015", border: "#D91E2B", text: NETWORK_BLOCKED_MESSAGE, sub: tr("ارتباط با سرور برقرار نشد"), icon: true }
      : state === "offline"
        ? { bg: "#4a1015", border: "#D91E2B", text: NETWORK_OFFLINE_MESSAGE, sub: NETWORK_VPN_HINT, icon: true }
        : state === "weak"
          ? { bg: "#4a3a0e", border: "#F3EEE6", text: tr("اینترنت ضعیف است"), sub: NETWORK_VPN_HINT, icon: true }
          : { bg: "#10361f", border: "#2e9d57", text: tr("اینترنت وصل شد"), icon: false };

  return (
    <div
      role="status"
      dir={APP_DIR}
      className="shrink-0 flex items-center justify-center gap-2 px-3 py-1.5"
      style={{ background: view.bg, borderBottom: `1px solid ${view.border}`, fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", fontSize: 12 }}
    >
      {view.icon && <WifiOffIcon className="w-4 h-4 shrink-0" />}
      <div className="flex flex-col items-center text-center">
        <span>{view.text}</span>
        {view.sub && <span style={{ fontSize: 10, opacity: 0.8 }}>{view.sub}</span>}
      </div>
    </div>
  );
}

function PhoneMock({ children, bgImage, pencil }) {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col" style={{ background: pencil ? "#0F1011" : "#0B0B0D" }}>
      {/* تکسچر پس‌زمینه‌ی رینگ بوکس - پشت همه‌ی محتوا، روی باکس‌ها و عکس‌های فصل‌ها اصلاً تاثیری نداره */}
      {bgImage && !pencil && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}
      {pencil && (
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(130% 60% at 50% 0%, #1E1F22 0%, #141517 50%, #0C0D0E 100%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
                    <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.45) 100%)" }} />
        </div>
      )}
      <div className="relative flex-1 flex flex-col min-h-0" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

function TopNotch() {
  return (
    <div className="flex justify-center pt-2 pb-1 shrink-0">
      <div className="w-24 h-1.5 rounded-full" style={{ background: "#2a292e" }} />
    </div>
  );
}

// ---------- دروازه‌ی ورود: بدون اینترنت اپ اصلاً باز نمی‌شه ----------
// اگه اولین بار که اپ باز می‌شه اینترنت نباشه، به‌جای نمایش صفحه‌های نصفه، فقط این صفحه نشون داده می‌شه.
// بعد از این‌که یه بار با اینترنت باز شد، قطع شدن اینترنت فقط نوار هشدار بالای صفحه رو نشون می‌ده.
async function checkServerReachable() {
  if (DEMO_MODE) return true;
  if (typeof navigator !== "undefined" && navigator.onLine === false) return false;
  const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = setTimeout(() => ctrl && ctrl.abort(), 8000);
  try {
    await fetch(`${API_BASE_URL}/settings/app-update?_=${Date.now()}`, { cache: "no-store", signal: ctrl ? ctrl.signal : undefined });
    return true; // هر جوابی از سرور یعنی اینترنت هست
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function OfflineGateScreen({ onRetry, checking }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center" dir={APP_DIR} style={{ background: "radial-gradient(circle at 50% 20%, #2a1013 0%, #0B0B0D 60%)" }}>
      <div className="rounded-full flex items-center justify-center mb-6" style={{ width: 96, height: 96, background: "#44292E", border: "2px solid #D91E2B", boxShadow: "0 0 28px rgba(217,30,43,0.5)" }}>
        <WifiOffIcon className="w-11 h-11" style={{ color: "#D91E2B" }} />
      </div>
      <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xl font-black mb-2">{tr("اینترنت دستگاه را چک کنید")}</div>
      <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm leading-7 mb-8">
        {tr("برای باز کردن اپ باید به اینترنت وصل باشی. اگه فیلترشکن روشنه، خاموشش کن و دوباره امتحان کن.")}
      </div>
      <button
        onClick={onRetry}
        disabled={checking}
        style={{ fontFamily: "Vazirmatn, sans-serif", background: "linear-gradient(135deg, #D91E2B, #FF4A57)", color: "#fff", opacity: checking ? 0.7 : 1, boxShadow: "0 0 20px rgba(217,30,43,0.5)" }}
        className="w-full rounded-xl py-3.5 font-bold text-sm"
      >
        {checking ? tr("در حال بررسی…") : tr("تلاش دوباره")}
      </button>
    </div>
  );
}

// ---------- Screen 0: Splash / Entry ----------
function SplashScreen({ onStart, loading }) {
  return (
    <div
      className="flex-1 flex flex-col relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 50% 20%, #2a1013 0%, #0B0B0D 60%)",
      }}
      dir={APP_DIR}
    >
      {/* diagonal rope texture */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 22px, rgba(217,30,43,0.08) 22px 24px, transparent 24px 46px)",
        }}
      />
      {/* faint ring ropes at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-40">
        <div className="absolute left-0 right-0" style={{ background: "#D91E2B", height: "2px", bottom: "1.5rem" }} />
        <div className="absolute left-0 right-0" style={{ background: "#F3EEE6", height: "2px", bottom: "3.5rem" }} />
        <div className="absolute left-0 right-0" style={{ background: "#D91E2B", height: "2px", bottom: "5.5rem" }} />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="relative mb-6 flex items-center justify-center">
          <div
            className="absolute rounded-full"
            style={{
              width: "416px",
              height: "416px",
              background:
                "radial-gradient(circle, rgba(243,238,230,0.35) 0%, rgba(217,30,43,0.25) 45%, transparent 72%)",
              filter: "blur(2px)",
            }}
          />
          <img
            src={SPLASH_LOGO_SRC}
            alt="Boxing Club Academy Amertka"
            className="relative object-contain"
            style={{
              width: "320px",
              height: "320px",
              filter: "drop-shadow(0 0 18px rgba(217,30,43,0.55)) drop-shadow(0 0 6px rgba(243,238,230,0.4))",
            }}
          />
        </div>

        <h1
          style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", lineHeight: 1.5 }}
          className="text-3xl font-black mb-3"
        >
          {tr("آموزش بوکس حرفه‌ای NASERI")}</h1>
        <p dir="ltr" style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", opacity: 0.7, fontSize: "11px", letterSpacing: "0.08em" }}>1405/07/01</p>
      </div>

      <div className="relative px-6 pb-8">
        {loading ? (
          <>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ background: "#1c1b1f", height: "6px" }}
            >
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg,#1FA855,#3DE08A)",
                  animation: "splashLoadFill 5000ms ease-out forwards",
                }}
              />
            </div>
            <style>{`
              @keyframes splashLoadFill {
                0% { width: 0%; }
                100% { width: 100%; }
              }
            `}</style>
          </>
        ) : (
          <>
            <button
              onClick={onStart}
              style={{ fontFamily: "Vazirmatn, sans-serif", background: "#D91E2B", color: "#F3EEE6" }}
              className="w-full rounded-xl py-4 font-bold text-base mb-3 shadow-lg"
            >
              {tr("شروع کن")}</button>
            <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }} className="text-xs text-center">
              {tr("ثبت‌نام رایگان با ایمیل")}</p>
          </>
        )}
      </div>
    </div>
  );
}

// ---------- Screen 1: Signup with email or phone ----------
// ---------- ورود / ثبت‌نام / فراموشی رمز با شماره موبایل + رمز عبور ----------
function EyeIcon({ className, off }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M3 3l18 18" />}
    </svg>
  );
}

function AuthPhoneField({ value, onChange, onEnter, hasError, autoFocus }) {
  return (
    <div
      className="flex items-center rounded-xl px-4 py-3.5 border"
      style={{ background: "#17161A", borderColor: hasError ? "#D91E2B" : "#2a292e" }}
    >
      <span style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6", marginInlineEnd: "0.75rem" }} className="text-sm font-semibold">
        +98
      </span>
      <div className="w-px h-5" style={{ background: "#2a292e", marginInlineEnd: "0.75rem" }} />
      <input
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        autoFocus={autoFocus}
        placeholder="912 345 6789"
        value={value}
        onChange={(e) => onChange(toLatinDigits(e.target.value).replace(/[^\d\s]/g, ""))}
        onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
        style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6" }}
        className="bg-transparent outline-none flex-1 text-base tracking-wider"
        dir="ltr"
      />
    </div>
  );
}

function AuthPasswordField({ value, onChange, onEnter, placeholder, autoComplete, hasError }) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className="flex items-center rounded-xl px-4 py-3.5 border"
      style={{ background: "#17161A", borderColor: hasError ? "#D91E2B" : "#2a292e" }}
    >
      <input
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
        style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6" }}
        className="bg-transparent outline-none flex-1 text-base tracking-wider min-w-0"
        dir="ltr"
        maxLength={64}
      />
      <button type="button" onClick={() => setVisible((v) => !v)} aria-label={visible ? tr("پنهان کردن رمز") : tr("نمایش رمز")} style={{ color: "#F3EEE6" }} className="mr-2">
        <EyeIcon className="w-5 h-5" off={visible} />
      </button>
    </div>
  );
}

function AuthCodeInput({ digits, setDigits, hasError, onComplete }) {
  const refs = useRef([]);
  const setAt = (i, val) => {
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < digits.length - 1) refs.current[i + 1]?.focus();
    if (next.every((d) => d !== "")) onComplete?.(next.join(""));
  };
  const handleChange = (i, raw) => {
    const clean = toLatinDigits(raw).replace(/\D/g, "");
    if (clean.length > 1) {
      // چند رقم یک‌جا (پیست یا تکمیل خودکار پیامک)
      const next = [...digits];
      clean.slice(0, digits.length - i).split("").forEach((d, k) => (next[i + k] = d));
      setDigits(next);
      refs.current[Math.min(i + clean.length, digits.length - 1)]?.focus();
      if (next.every((d) => d !== "")) onComplete?.(next.join(""));
      return;
    }
    setAt(i, clean);
  };
  return (
    <div className="flex gap-2 justify-center" dir="ltr">
      {digits.map((c, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={c}
          autoFocus={i === 0}
          autoComplete={i === 0 ? "one-time-code" : "off"}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
          }}
          inputMode="numeric"
          style={{
            fontFamily: "Oswald, sans-serif",
            background: "#17161A",
            borderColor: hasError ? "#D91E2B" : c ? "#D91E2B" : "#2a292e",
            color: "#F3EEE6",
          }}
          className="w-11 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none"
        />
      ))}
    </div>
  );
}

function PasswordRules({ password, phone }) {
  const c = getPasswordChecks(password, phone);
  const rows = [
    [c.length, tr("حداقل ۸ کاراکتر")],
    [c.mix, tr("هم حرف و هم عدد داشته باشه")],
    [c.notPhone, tr("شماره موبایلت نباشه")],
  ];
  return (
    <div className="mt-3 flex flex-col gap-1.5">
      {rows.map(([passed, text]) => (
        <div key={text} className="flex items-center gap-2" style={{ fontFamily: "Vazirmatn, sans-serif", fontSize: 12, color: passed ? "#4ADE80" : "#8A8790" }}>
          <span style={{ width: 14, textAlign: "center" }}>{passed ? "✓" : "○"}</span>
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}

// مراحل: mode = login | register | forgot  ،  stage = phone | code | password
function PasswordAuthFlow({ deviceId, onSuccess, onUseLegacy, onGuest, initialPhone }) {
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
    const id = setTimeout(() => setResendLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [resendLeft]);

  const clearError = () => {
    setError("");
    setErrorCode(null);
  };

  const fail = (err) => {
    setError(err.message || tr("خطایی رخ داد. دوباره امتحان کن"));
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

  // ورود با رمز
  const handleLogin = (force) =>
    run(async () => {
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

  // ارسال کد (ثبت‌نام یا فراموشی)
  const handleSendCode = () =>
    run(async () => {
      await apiOtpSend(normalizedPhone, purpose);
      setDigits(Array(OTP_CODE_LENGTH).fill(""));
      setStage("code");
      setResendLeft(60);
    });

  const handleResend = () =>
    run(async () => {
      await apiOtpSend(normalizedPhone, purpose);
      setDigits(Array(OTP_CODE_LENGTH).fill(""));
      setResendLeft(60);
    });

  const handleVerifyCode = (codeOverride) =>
    run(async () => {
      const code = codeOverride || digits.join("");
      const data = await apiOtpVerify(normalizedPhone, code, purpose);
      setProofToken(data.proofToken);
      setStage("password");
    });

  const handleSetPassword = (force) =>
    run(async () => {
      if (!isPasswordAcceptable(password, normalizedPhone)) throw new Error(tr("رمز عبور شرایط لازم رو نداره"));
      if (password !== confirm) throw new Error(tr("تکرار رمز عبور با رمز اصلی یکی نیست"));
      try {
        const data =
          mode === "forgot"
            ? await apiResetPassword(proofToken, password, deviceId, normalizedPhone)
            : await apiRegisterAccount(proofToken, password, deviceId, force, normalizedPhone);
        onSuccess(data);
      } catch (err) {
        if (err.code === "DEVICE_CONFLICT") {
          setConflict(true);
          setError(err.message);
          return;
        }
        if (err.code === "PROOF_INVALID") {
          // مهلت تایید شماره تموم شده؛ از اول
          setStage("phone");
          setProofToken(null);
          setDigits(Array(OTP_CODE_LENGTH).fill(""));
        }
        throw err;
      }
    });

  const label = { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" };
  const primaryBtn = (enabled) => ({
    fontFamily: "Vazirmatn, sans-serif",
    background: enabled ? "#D91E2B" : "#3a2226",
    color: enabled ? "#F3EEE6" : "#7a5a5d",
  });
  const linkBtn = { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" };

  const errorBox = error ? (
    <div className="mb-4">
      <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }} className="text-xs leading-6">
        {error}
      </p>
      {errorCode === "ACCOUNT_EXISTS" && (
        <button onClick={() => goMode("login")} style={linkBtn} className="text-xs font-bold mt-1">
          {tr("رفتن به صفحه‌ی ورود")}</button>
      )}
      {errorCode === "NO_ACCOUNT" && (
        <button onClick={() => goMode("register")} style={linkBtn} className="text-xs font-bold mt-1">
          {tr("ثبت‌نام")}</button>
      )}
      {errorCode === "NO_PASSWORD" && (
        <div className="flex gap-4 mt-1">
          <button onClick={() => goMode("register")} style={linkBtn} className="text-xs font-bold">
            {tr("تعیین رمز عبور")}</button>
          <button onClick={() => onUseLegacy?.(normalizedPhone)} style={linkBtn} className="text-xs font-bold">
            {tr("ورود با کد پیامکی")}</button>
        </div>
      )}
    </div>
  ) : null;

  const conflictBox = (onForce) => (
    <div className="rounded-xl p-4 mb-4" style={{ background: "#3C2A2F", border: "1px solid rgba(217,30,43,0.35)" }}>
      <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs leading-6 mb-3 text-center">
        {tr("این حساب همین الان روی یه گوشی دیگه بازه. هر حساب فقط می‌تونه روی یه دستگاه فعال باشه.")}</p>
      <button
        onClick={onForce}
        disabled={loading}
        style={{ fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE", color: "#0B0B0D" }}
        className="w-full rounded-lg py-2.5 text-xs font-bold"
      >
        {loading ? tr("در حال ورود…") : tr("خروج از دستگاه قبلی و ورود اینجا")}
      </button>
    </div>
  );

  const header = (
    <div className="flex items-center gap-2 mb-6">
      {mode === "login" ? (
        <img src={SPLASH_LOGO_SRC} alt="NASERI" className="w-8 h-8 object-contain" />
      ) : (
        <button
          onClick={() => (stage === "phone" ? goMode("login") : setStage(stage === "password" ? "code" : "phone"))}
          style={{ color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" }}
          className="text-sm rounded-lg px-3 py-1.5 font-bold"
        >
          {tr("‹ بازگشت")}</button>
      )}
      {DEMO_MODE && (
        <span
          style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", background: "#424245", border: "1px solid rgba(243,238,230,0.4)", fontSize: "9px" }}
          className="rounded-full px-2 py-1 mr-auto"
        >
          {tr("حالت آزمایشی")}</span>
      )}
    </div>
  );

  // ----- ورود -----
  if (mode === "login") {
    const canLogin = phoneValid && password.length > 0 && !loading && Boolean(deviceId);
    return (
      <div className="flex-1 flex flex-col px-6 pt-4 overflow-y-auto" dir={APP_DIR}>
        {header}
        <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", lineHeight: 1.3 }} className="text-3xl font-black mb-2">
          {tr("وارد رینگ شو.")}</h1>
        <p style={label} className="text-sm mb-6 leading-7">
          {tr("با شماره موبایل و رمز عبورت وارد شو.")}</p>

        <label style={label} className="text-xs mb-2 block">{tr("شماره موبایل")}</label>
        <div className="mb-4">
          <AuthPhoneField value={phone} onChange={(v) => { setPhone(v); clearError(); setConflict(false); }} hasError={Boolean(error)} />
        </div>

        <label style={label} className="text-xs mb-2 block">{tr("رمز عبور")}</label>
        <div className="mb-2">
          <AuthPasswordField
            value={password}
            onChange={(v) => { setPassword(v); clearError(); setConflict(false); }}
            onEnter={() => canLogin && handleLogin(false)}
            placeholder={tr("رمز عبور")}
            autoComplete="current-password"
            hasError={Boolean(error)}
          />
        </div>

        <div className="flex justify-start mb-5">
          <button onClick={() => goMode("forgot")} style={linkBtn} className="text-xs font-bold">
            {tr("رمزت رو فراموش کردی؟")}</button>
        </div>

        {errorBox}
        {conflict ? (
          conflictBox(() => handleLogin(true))
        ) : (
          <button onClick={() => handleLogin(false)} disabled={!canLogin} style={primaryBtn(canLogin)} className="w-full rounded-xl py-4 font-bold text-base transition-colors mb-4">
            {loading ? tr("در حال ورود…") : tr("ورود")}
          </button>
        )}

        <p style={label} className="text-sm text-center mb-3">
          {tr("حساب نداری؟")}{" "}
          <button onClick={() => goMode("register")} style={linkBtn} className="font-bold">
            {tr("ثبت‌نام")}</button>
        </p>

        {onGuest && (
          <button
            onClick={onGuest}
            data-testid="guest-login"
            className="w-full rounded-xl py-3 font-bold text-sm mb-2"
            style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", background: "transparent", border: "1px solid #4DA3FF" }}
          >
            {tr("ورود به‌عنوان مهمان")}
          </button>
        )}

        <div className="mt-auto mb-6" />
      </div>
    );
  }

  const isForgot = mode === "forgot";

  // ----- مرحله‌ی ۱: شماره -----
  if (stage === "phone") {
    const canSend = phoneValid && !loading;
    return (
      <div className="flex-1 flex flex-col px-6 pt-4 overflow-y-auto" dir={APP_DIR}>
        {header}
        <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", lineHeight: 1.3 }} className="text-2xl font-black mb-2">
          {isForgot ? tr("بازیابی رمز عبور") : tr("ساخت حساب")}
        </h1>
        <p style={label} className="text-sm mb-6 leading-7">
          {isForgot
            ? tr("شماره‌ای که با اون ثبت‌نام کردی رو وارد کن تا یه کد تایید برات پیامک کنیم.")
            : tr("شماره موبایلت رو وارد کن تا یه کد تایید برات پیامک کنیم. بعدش رمز عبورت رو انتخاب می‌کنی.")}
        </p>
        <label style={label} className="text-xs mb-2 block">{tr("شماره موبایل")}</label>
        <div className="mb-3">
          <AuthPhoneField value={phone} onChange={(v) => { setPhone(v); clearError(); }} onEnter={() => canSend && handleSendCode()} hasError={Boolean(error)} autoFocus />
        </div>
        {errorBox}
        <button onClick={handleSendCode} disabled={!canSend} style={primaryBtn(canSend)} className="w-full rounded-xl py-4 font-bold text-base transition-colors mb-4 mt-2">
          {loading ? tr("در حال ارسال…") : tr("دریافت کد تایید")}
        </button>
        <p style={label} className="text-sm text-center">
          {isForgot ? tr("یادت اومد؟") : tr("قبلاً ثبت‌نام کردی؟")}{" "}
          <button onClick={() => goMode("login")} style={linkBtn} className="font-bold">
            {tr("ورود")}</button>
        </p>
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }} className="text-xs text-center leading-6 mt-auto mb-6">
          {tr("با ادامه، شرایط استفاده و حریم خصوصی رو می‌پذیری.")}</p>
      </div>
    );
  }

  // ----- مرحله‌ی ۲: کد پیامکی -----
  if (stage === "code") {
    const filled = digits.every((d) => d !== "");
    return (
      <div className="flex-1 flex flex-col px-6 pt-4 overflow-y-auto" dir={APP_DIR}>
        {header}
        <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-2xl font-black mb-2">
          {tr("کد تایید رو وارد کن")}</h1>
        <p style={label} className="text-sm mb-6 leading-7">
          {trNode("کد {n} رقمی به شماره {phone} پیامک شد.", {
            n: OTP_CODE_LENGTH.toLocaleString(NUM_LOCALE),
            phone: <span style={{ color: "#F3EEE6", direction: "ltr", display: "inline-block" }}>{normalizedPhone}</span>,
          })}
        </p>
        <div className="mb-4">
          <AuthCodeInput digits={digits} setDigits={(d) => { setDigits(d); clearError(); }} hasError={Boolean(error)} onComplete={(code) => !loading && handleVerifyCode(code)} />
        </div>
        <div className="text-center">{errorBox}</div>
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }} className="text-xs text-center mb-6">
          {resendLeft > 0 ? (
            <span dir="ltr" style={{ display: "inline-block" }}>
              {tr("ارسال مجدد تا {time}", {
                time: `${String(Math.floor(resendLeft / 60)).padStart(2, "0")}:${String(resendLeft % 60).padStart(2, "0")}`,
              })}
            </span>
          ) : (
            <>
              {tr("کد رو دریافت نکردی؟")}{" "}
              <button onClick={handleResend} disabled={loading} style={linkBtn}>
                {tr("ارسال مجدد")}</button>
            </>
          )}
        </p>
        <button onClick={() => handleVerifyCode()} disabled={!filled || loading} style={primaryBtn(filled && !loading)} className="w-full rounded-xl py-4 font-bold text-base transition-colors">
          {loading ? tr("در حال بررسی…") : tr("تایید")}
        </button>
        <button onClick={() => { setStage("phone"); clearError(); }} style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs underline mt-4">
          {tr("ویرایش شماره")}</button>
      </div>
    );
  }

  // ----- مرحله‌ی ۳: انتخاب رمز -----
  const passwordOk = isPasswordAcceptable(password, normalizedPhone);
  const matches = password.length > 0 && password === confirm;
  const canSubmit = passwordOk && matches && !loading && Boolean(deviceId);
  return (
    <div className="flex-1 flex flex-col px-6 pt-4 overflow-y-auto" dir={APP_DIR}>
      {header}
      <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", lineHeight: 1.3 }} className="text-2xl font-black mb-2">
        {isForgot ? tr("رمز عبور جدید") : tr("رمز عبورت رو انتخاب کن")}
      </h1>
      <p style={label} className="text-sm mb-6 leading-7">
        {isForgot
          ? tr("با ثبت رمز جدید، اگه روی گوشی دیگه‌ای وارد شده باشی از اون خارج می‌شی.")
          : tr("شماره‌ات تایید شد. این رمز رو برای ورودهای بعدی لازم داری.")}
      </p>

      <label style={label} className="text-xs mb-2 block">{isForgot ? tr("رمز عبور جدید") : tr("رمز عبور")}</label>
      <AuthPasswordField value={password} onChange={(v) => { setPassword(v); clearError(); setConflict(false); }} placeholder={tr("رمز عبور")} autoComplete="new-password" hasError={false} />
      <PasswordRules password={password} phone={normalizedPhone} />

      <label style={label} className="text-xs mb-2 mt-5 block">{tr("تکرار رمز عبور")}</label>
      <AuthPasswordField
        value={confirm}
        onChange={(v) => { setConfirm(v); clearError(); }}
        onEnter={() => canSubmit && handleSetPassword(false)}
        placeholder={tr("تکرار رمز عبور")}
        autoComplete="new-password"
        hasError={confirm.length > 0 && !matches}
      />
      {confirm.length > 0 && !matches && (
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }} className="text-xs mt-2">
          {tr("تکرار رمز با رمز اصلی یکی نیست")}</p>
      )}

      <div className="mt-5">{errorBox}</div>
      {conflict ? (
        conflictBox(() => handleSetPassword(true))
      ) : (
        <button onClick={() => handleSetPassword(false)} disabled={!canSubmit} style={primaryBtn(canSubmit)} className="w-full rounded-xl py-4 font-bold text-base transition-colors mb-6">
          {loading ? tr("در حال ذخیره…") : isForgot ? tr("ثبت رمز جدید و ورود") : tr("ساخت حساب و ورود")}
        </button>
      )}
    </div>
  );
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
      setError(err.message || tr("ارسال کد با خطا مواجه شد"));
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

  return (
    <div className="flex-1 flex flex-col px-6 pt-4" dir={APP_DIR}>
      <div className="flex items-center gap-2 mb-8">
        <img src={SPLASH_LOGO_SRC} alt="NASERI" className="w-8 h-8 object-contain" />
        {DEMO_MODE && (
          <span
            style={{
              fontFamily: "Vazirmatn, sans-serif",
              color: "#F3EEE6",
              background: "#424245",
              border: "1px solid rgba(243,238,230,0.4)",
              fontSize: "9px",
            }}
            className="rounded-full px-2 py-1 mr-auto"
          >
            {tr("حالت آزمایشی")}</span>
        )}
      </div>

      <h1
        style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", lineHeight: 1.3 }}
        className="text-3xl font-black mb-2"
      >
        {tr("وارد رینگ شو.")}</h1>
      <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm mb-6 leading-7">
        {tr("با ایمیل یا شماره موبایلت ثبت‌نام کن و برنامه تمرینی حرفه‌ای بوکس رو شروع کن.")}</p>

      <div
        className="flex rounded-xl p-1 mb-6"
        style={{ background: "#17161A", border: "1px solid #2a292e" }}
      >
        <button
          onClick={() => switchMethod("email")}
          style={{
            fontFamily: "Vazirmatn, sans-serif",
            background: method === "email" ? "#D91E2B" : "transparent",
            color: method === "email" ? "#F3EEE6" : "#8A8790",
          }}
          className="flex-1 rounded-lg py-2.5 text-sm font-bold transition-colors"
        >
          {tr("ایمیل")}</button>
        <button
          onClick={() => switchMethod("phone")}
          style={{
            fontFamily: "Vazirmatn, sans-serif",
            background: method === "phone" ? "#D91E2B" : "transparent",
            color: method === "phone" ? "#F3EEE6" : "#8A8790",
          }}
          className="flex-1 rounded-lg py-2.5 text-sm font-bold transition-colors"
        >
          {tr("شماره موبایل")}</button>
      </div>

      <label
        style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }}
        className="text-xs mb-2 block"
      >
        {method === "email" ? tr("ایمیل") : tr("شماره موبایل")}
      </label>
      <div
        className="flex items-center rounded-xl px-4 py-3.5 mb-2 border"
        style={{ background: "#17161A", borderColor: error ? "#D91E2B" : "#2a292e" }}
      >
        {method === "phone" && (
          <>
            <span style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6", marginInlineEnd: "0.75rem" }} className="text-sm font-semibold">
              +98
            </span>
            <div className="w-px h-5" style={{ background: "#2a292e", marginInlineEnd: "0.75rem" }} />
          </>
        )}
        <input
          type={method === "email" ? "email" : "tel"}
          inputMode={method === "email" ? "email" : "numeric"}
          autoComplete={method === "email" ? "email" : "tel"}
          placeholder={method === "email" ? "example@email.com" : "912 345 6789"}
          value={contact}
          onChange={(e) =>
            setContact(
              method === "email" ? e.target.value.replace(/\s/g, "") : e.target.value.replace(/[^\d\s]/g, "")
            )
          }
          style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6" }}
          className="bg-transparent outline-none flex-1 text-base tracking-wider"
          dir="ltr"
        />
      </div>
      <p
        style={{ fontFamily: "Vazirmatn, sans-serif", color: error ? "#D91E2B" : "#55535a" }}
        className="text-xs mb-8"
      >
        {error ||
          (DEMO_MODE
            ? tr("حالت آزمایشی: هر کد ۴ رقمی دلخواه رو قبول می‌کنه.")
            : method === "email"
            ? tr("کد تایید برای همین ایمیل ارسال می‌شود.")
            : tr("کد تایید برای همین شماره پیامک می‌شود."))}
      </p>

      <button
        onClick={handleSubmit}
        disabled={!contactValid || loading}
        style={{
          fontFamily: "Vazirmatn, sans-serif",
          background: contactValid && !loading ? "#D91E2B" : "#3a2226",
          color: contactValid && !loading ? "#F3EEE6" : "#7a5a5d",
        }}
        className="w-full rounded-xl py-4 font-bold text-base transition-colors mb-4"
      >
        {loading ? tr("در حال ارسال…") : tr("دریافت کد تایید")}
      </button>

      {onUsePassword && (
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm text-center mb-3">
          {tr("با شماره موبایل و رمز عبور وارد می‌شی؟")}{" "}
          <button onClick={onUsePassword} style={{ color: "#F3EEE6" }} className="font-bold">
            {tr("ورود با رمز عبور")}</button>
        </p>
      )}

      <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }} className="text-xs text-center leading-6 mt-auto mb-6">
        {tr("با ادامه، شرایط استفاده و حریم خصوصی رو می‌پذیری.")}</p>
    </div>
  );
}

// ---------- Screen 2: OTP verification ----------
function OtpScreen({ contact, method, onVerify, code, setCode }) {
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const [deviceConflict, setDeviceConflict] = useState(false);
  const [resendSecondsLeft, setResendSecondsLeft] = useState(120); // ثانیه‌شمار ۲ دقیقه‌ای قبل از فعال شدن «ارسال مجدد»

  useEffect(() => {
    if (resendSecondsLeft <= 0) return;
    const timer = setTimeout(() => setResendSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendSecondsLeft]);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    setError("");
    setDeviceConflict(false);
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 3) inputsRef.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
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
        setError(err.message || tr("کد وارد شده اشتباه است"));
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
      setError(err.message || tr("ارسال دوباره کد با خطا مواجه شد"));
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 pt-4" dir={APP_DIR}>
      <button
        onClick={onVerify.back}
        style={{
          color: "#0B0B0D",
          fontFamily: "Vazirmatn, sans-serif",
          background: "#DAD6CE",
        }}
        className="self-start text-sm mb-8 rounded-lg px-3 py-1.5 font-bold"
      >
        {tr("‹ بازگشت")}</button>

      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6 overflow-hidden mx-auto"
        style={{ background: "#3F292F", border: "1px solid rgba(217,30,43,0.4)" }}
      >
        <img src={SPLASH_LOGO_SRC} alt="NASERI" className="w-20 h-20 object-contain" />
      </div>

      <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-2xl font-black mb-2">
        {tr("کد تایید رو وارد کن")}</h1>
      <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm mb-8 leading-7">
        {trNode(method === "email" ? tr("کد ۴ رقمی به ایمیل {contact} ارسال شد.") : tr("کد ۴ رقمی به شماره {contact} پیامک شد."), {
          contact: <span style={{ color: "#F3EEE6", direction: "ltr", display: "inline-block" }}>{contact || "example@email.com"}</span>,
        })}
      </p>

      <div className="flex gap-3 mb-3 justify-center" dir="ltr">
        {code.map((c, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            value={c}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            inputMode="numeric"
            maxLength={1}
            style={{
              fontFamily: "Oswald, sans-serif",
              background: "#17161A",
              borderColor: error ? "#D91E2B" : c ? "#D91E2B" : "#2a292e",
              color: "#F3EEE6",
            }}
            className="w-14 h-16 text-center text-2xl font-bold rounded-xl border-2 outline-none"
          />
        ))}
      </div>

      {error && (
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }} className="text-xs text-center mb-3">
          {error}
        </p>
      )}

      {deviceConflict ? (
        <div
          className="rounded-xl p-4 mb-6"
          style={{ background: "#3C2A2F", border: "1px solid rgba(217,30,43,0.35)" }}
        >
          <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs leading-6 mb-3 text-center">
            {tr("این حساب همین الان روی یه گوشی دیگه بازه. هر حساب فقط می‌تونه روی یه دستگاه فعال باشه.")}</p>
          <button
            onClick={() => handleVerify(true)}
            disabled={loading}
            style={{ fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE", color: "#0B0B0D" }}
            className="w-full rounded-lg py-2.5 text-xs font-bold"
          >
            {loading ? tr("در حال ورود…") : tr("خروج از دستگاه قبلی و ورود اینجا")}
          </button>
        </div>
      ) : (
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }} className="text-xs text-center mb-10">
          {resendSecondsLeft > 0 ? (
            <span dir="ltr" style={{ display: "inline-block" }}>
              {tr("ارسال مجدد تا {time}", {
                time: `${String(Math.floor(resendSecondsLeft / 60)).padStart(2, "0")}:${String(resendSecondsLeft % 60).padStart(2, "0")}`,
              })}
            </span>
          ) : (
            <>
              {tr("کد رو دریافت نکردی؟")}{" "}
              <button onClick={handleResend} disabled={resending} style={{ color: "#F3EEE6" }}>
                {resending ? tr("در حال ارسال…") : tr("ارسال مجدد")}
              </button>
            </>
          )}
        </p>
      )}

      {!deviceConflict && (
        <button
          onClick={() => handleVerify(false)}
          disabled={!filled || loading}
          style={{
            fontFamily: "Vazirmatn, sans-serif",
            background: filled && !loading ? "#D91E2B" : "#3a2226",
            color: filled && !loading ? "#F3EEE6" : "#7a5a5d",
          }}
          className="w-full rounded-xl py-4 font-bold text-base transition-colors"
        >
          {loading ? tr("در حال بررسی…") : tr("تایید و ورود")}
        </button>
      )}
    </div>
  );
}

// ---------- Screen 3: Professional Profile ----------
function CameraIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      <circle cx="12" cy="13.5" r="3.2" />
    </svg>
  );
}

function PencilIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function BellIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

// وضعیت اشتراک برای نمایش در پروفایل (بدون اشتراک = برنزی، مثل صفحه‌ی اشتراک)
const PLAN_DISPLAY = {
  none: { label: tr("برنزی"), color: "#CD7F32" },
  silver: { label: tr("دوره اول"), color: "#E0A82E" },
  gold: { label: tr("دوره دوم"), color: "#E8B33D" },
};

// جعبه‌ی نورانی (بک‌لایت): حاشیه‌ی رنگی + درخشش بیرونی و داخلی؛ رنگ هر جعبه جدا انتخاب می‌شه
const glowBox = (c, strong) => ({
  background: `linear-gradient(160deg, color-mix(in srgb, ${c} 13%, #17161A) 0%, #17161A 55%, #121115 100%)`,
  border: `1px solid ${c}`,
  boxShadow: `0 0 ${strong ? 24 : 16}px ${c}66, inset 0 1px 0 rgba(255,255,255,0.07), inset 0 0 20px ${c}18`,
});

function ProfileScreen({ sessionsCount, badgeUnlocked, progressPercent, practiceMinutes, profileName, profileImage, onNameChange, onImageChange, nextLesson, reminder, onSetReminder, plan, planExpiresAt, accountContact, authToken, isGuest, onOpenJourney }) {
  const planInfo = PLAN_DISPLAY[plan] || PLAN_DISPLAY.none;
  const hasPaidPlan = plan === "silver" || plan === "gold";
  const daysLeft = hasPaidPlan && planExpiresAt ? Math.max(0, Math.ceil((planExpiresAt - Date.now()) / 86400000)) : null;
  const BOXER_LEVELS = [tr("مبتدی"), tr("متوسط"), tr("حرفه‌ای")];
  const chaptersCompleted = [badgeUnlocked?.basic, badgeUnlocked?.advanced, badgeUnlocked?.extra].filter(Boolean).length;
  const boxerLevel = BOXER_LEVELS[Math.min(chaptersCompleted, BOXER_LEVELS.length - 1)];

  const stats = [
    { label: tr("جلسه تمرین"), value: String(sessionsCount ?? 0) },
    { label: tr("تایم، تمرین کردن"), value: tr("{n} دقیقه", { n: practiceMinutes ?? 0 }) },
    { label: tr("سطح بوکسور"), value: boxerLevel },
  ];

  const badges = [
    { name: tr("گارد طلایی"), image: BADGE1_SRC, unlocked: Boolean(badgeUnlocked?.basic) },
    { name: tr("دستکش طلایی"), image: BADGE2_SRC, unlocked: Boolean(badgeUnlocked?.advanced) },
    { name: tr("رینگ طلایی"), image: BADGE3_SRC, unlocked: Boolean(badgeUnlocked?.extra) },
    { name: tr("مبارز تکنیکی"), image: BADGE4_SRC, unlocked: Boolean(badgeUnlocked?.fight) },
    { name: tr("آماده قهرمانی"), image: BADGE5_SRC, unlocked: Boolean(badgeUnlocked?.partner) },
    { name: tr("بوکسور جهانی"), image: BADGE6_SRC, unlocked: Boolean(badgeUnlocked?.focus) },
  ];

  const fileRef = useRef(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(profileName || "");

  // اسم جلسه‌ی بعدی از روی آخرین ویدیویی که کاربر بازش کرده محاسبه می‌شه (توی App)
  const nextSessionTitle = nextLesson ? nextLesson.title : tr("مرور تمرین‌های قبلی");
  const reminderTime = reminder?.time || "18:00";
  const reminderEnabled = Boolean(reminder?.enabled);
  const reminderDayWord = nextReminderDate(reminderTime).getDate() === new Date().getDate() ? tr("امروز") : tr("فردا");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timeDraft, setTimeDraft] = useState(reminderTime);

  const handleSetReminder = async () => {
    const status = await onSetReminder?.(timeDraft);
    if (status === "denied") {
      alert(tr("برای فعال کردن یادآور، اجازه‌ی نوتیفیکیشن رو از تنظیمات گوشی بدید."));
      return;
    }
    setShowTimePicker(false);
  };

  const displayName = profileName || tr("نام و نام خانوادگی");
  const initial = displayName.trim().charAt(0) || tr("؟");

  const [photoBusy, setPhotoBusy] = useState(false);

  const handlePickPhoto = () => {
    if (!photoBusy) fileRef.current?.click();
  };

  const handlePhotoFile = async (e) => {
    const file = e.target.files?.[0];
    // اجازه بده همون فایل دوباره هم قابل انتخاب باشه
    e.target.value = "";
    if (!file || photoBusy) return;
    setPhotoBusy(true);
    try {
      onImageChange(await makeAvatarDataUrl(file));
    } catch (err) {
      alert(
        err.message === "PHOTO_TOO_LARGE"
          ? tr("حجم این عکس خیلی زیاده. یه عکس کم‌حجم‌تر انتخاب کن.")
          : tr("این عکس قابل استفاده نیست. یه عکس دیگه انتخاب کن.")
      );
    } finally {
      setPhotoBusy(false);
    }
  };

  const startEditName = () => {
    setNameDraft(displayName === tr("نام و نام خانوادگی") ? "" : displayName);
    setIsEditingName(true);
  };

  const saveName = () => {
    const cleaned = sanitizeUserText(nameDraft, 40);
    if (cleaned) onNameChange(cleaned);
    setIsEditingName(false);
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-2 pb-6" dir={APP_DIR}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm">
          {tr("پروفایل حرفه‌ای")}</span>
        <div className="flex items-center gap-1.5">
          <span style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6" }} className="text-xs font-semibold tracking-wider">
            PRO
          </span>
          <div className="w-2 h-2 rounded-full" style={{ background: "#F3EEE6" }} />
        </div>
      </div>

      {/* Avatar + belt ring */}
      <div className="flex flex-col items-center mb-6">
        <div
          className="relative w-28 h-28 rounded-full flex items-center justify-center mb-4"
          style={{
            background: "conic-gradient(from 90deg, #F3EEE6, #D91E2B, #F3EEE6)",
            padding: "3px",
          }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center text-3xl font-black overflow-hidden"
            style={{ background: "#17161A", color: "#F3EEE6", fontFamily: "Oswald, sans-serif" }}
          >
            {profileImage ? (
              <img src={profileImage} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              initial
            )}
          </div>
          <button
            onClick={handlePickPhoto}
            className="absolute rounded-full flex items-center justify-center"
            style={{
              width: "30px",
              height: "30px",
              background: "#D91E2B",
              border: "2px solid #0B0B0D",
              bottom: "2px",
              left: "2px",
            }}
          >
            <CameraIcon className="w-4 h-4" style={{ color: "#F3EEE6" }} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoFile} className="hidden" />
        </div>

        {isEditingName ? (
          <div className="flex items-center gap-2 mb-1">
            <input
              autoFocus
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveName()}
              placeholder={tr("نام و نام خانوادگی")}
              maxLength={40}
              style={{
                fontFamily: "Vazirmatn, sans-serif",
                color: "#F3EEE6",
                background: "#17161A",
                border: "1px solid #D91E2B",
              }}
              className="text-lg font-bold text-center rounded-lg px-3 py-1.5 outline-none"
            />
            <button
              onClick={saveName}
              style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }}
              className="text-xs font-bold"
            >
              {tr("ثبت")}</button>
          </div>
        ) : (
          <button onClick={startEditName} className="flex items-center gap-1.5 mb-1">
            <h2 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xl font-black">
              {displayName}
            </h2>
            <PencilIcon className="w-3.5 h-3.5" style={{ color: "#55535a" }} />
          </button>
        )}

        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs">
          {tr("مربی: یزدان ناصری گهر · باشگاه آنلاین")}</p>
      </div>

      {/* اطلاعات حساب: اشتراک فعلی، شماره حساب، اعتبار اشتراک */}
      <div data-testid="account-info" className="rounded-2xl mb-6 overflow-hidden" style={glowBox("#4DA3FF", true)}>
        {[
          {
            key: "plan",
            label: tr("اشتراک فعلی"),
            value: (
              <span className="flex items-center gap-2 font-bold" style={{ color: planInfo.color }}>
                <span className="inline-block rounded-full" style={{ width: "9px", height: "9px", background: planInfo.color, boxShadow: `0 0 8px ${planInfo.color}` }} />
                {planInfo.label}
              </span>
            ),
          },
          {
            key: "account",
            label: tr("شماره حساب"),
            value: (
              <span dir="ltr" style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em", color: "#F3EEE6" }}>
                {accountContact || "—"}
              </span>
            ),
          },
          {
            key: "expiry",
            label: tr("اعتبار اشتراک"),
            value: hasPaidPlan && planExpiresAt ? (
              <span className="flex flex-col items-end" style={{ color: "#F3EEE6" }}>
                <span>{formatExpiryDate(planExpiresAt)}</span>
                <span style={{ color: daysLeft <= 14 ? "#D91E2B" : "#8A8790", fontSize: "11px" }}>
                  {tr("{n} روز مانده", { n: daysLeft.toLocaleString(NUM_LOCALE) })}
                </span>
              </span>
            ) : (
              <span style={{ color: "#F3EEE6" }}>{tr("اشتراک فعال نداری")}</span>
            ),
          },
        ].map((row, i) => (
          <div
            key={row.key}
            data-testid={`account-row-${row.key}`}
            className="flex items-center justify-between px-4 py-3.5"
            style={{ borderTop: i === 0 ? "none" : "1px solid rgba(77,163,255,0.18)", fontFamily: "Vazirmatn, sans-serif", fontSize: "14px" }}
          >
            <span style={{ color: "#F3EEE6", fontWeight: 700 }}>{row.label}</span>
            {row.value}
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        {stats.map((s, i) => {
          const c = "#4DA3FF";
          return (
          <div
            key={s.label}
            className="rounded-xl py-4 px-2 text-center"
            style={glowBox(c)}
          >
            <div style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6" }} className="text-2xl font-bold mb-1">
              {s.value}
            </div>
            <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", fontSize: "11px", fontWeight: 700 }} className="leading-4">
              {s.label}
            </div>
          </div>
          );
        })}
      </div>

      <div className="mb-6"><JourneyProfileBox accountId={accountContact} authToken={authToken} isGuest={isGuest} onOpen={onOpenJourney} /></div>

      <RopeDivider />

      {/* Level progress */}
      <div className="mb-6 mt-3 rounded-2xl p-4" style={glowBox("#D91E2B")}>
        <div className="flex justify-between items-center mb-2">
          <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-bold">
            {tr("سطح: {level}", { level: boxerLevel })}
          </span>
          <span style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6" }} className="text-xs">
            {progressPercent}%
          </span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "#0B0B0D", border: "1px solid #2a292e" }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${progressPercent}%`, background: "linear-gradient(90deg,#1FA855,#3DE08A)", boxShadow: "0 0 10px rgba(243,238,230,0.7)" }}
          />
        </div>
      </div>

      {/* Badges */}
      <div className="mb-6 rounded-2xl p-4" style={glowBox("#F3EEE6")}>
        <h3 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", textShadow: "0 0 10px rgba(243,238,230,0.5)" }} className="text-sm font-black mb-4">
          {tr("نشان‌های افتخار")}</h3>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    background: b.unlocked ? "conic-gradient(from 90deg, #F3EEE6, #D91E2B, #F3EEE6)" : "#17161A",
                    padding: b.unlocked ? "2.5px" : "0",
                    boxShadow: b.unlocked ? "0 0 14px rgba(243,238,230,0.5)" : "none",
                    border: b.unlocked ? "none" : "1px solid #2a292e",
                  }}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
                    style={{ background: b.image ? "#000" : b.unlocked ? "#17161A" : "transparent" }}
                  >
                    {b.image ? (
                      <img
                        src={b.image}
                        alt={b.name}
                        className="w-full h-full object-cover"
                        style={{ filter: b.unlocked ? "none" : "grayscale(1) brightness(0.5)" }}
                      />
                    ) : (
                      <Icon className="w-6 h-6" style={{ color: b.unlocked ? "#F3EEE6" : "#3a393e" }} />
                    )}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "Vazirmatn, sans-serif",
                    color: b.unlocked ? "#F3EEE6" : "#6d6a72",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                  className="text-center leading-3"
                >
                  {b.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next session card */}
      <div
        className="rounded-2xl p-4"
        style={{ ...glowBox("#D91E2B", true), background: "linear-gradient(135deg,#3a1418,#17161A 70%)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs font-bold mb-1">
              {tr("تنظیم یادآور روزانه")}</p>
            <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-bold">
              {nextSessionTitle}
            </p>
            <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs mt-1">
              {reminderDayWord} · {reminderTime}
            </p>
          </div>
          <img src={SPLASH_LOGO_SRC} alt="NASERI" className="w-11 h-11 object-contain shrink-0" />
        </div>

        <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(217,30,43,0.2)" }}>
          {showTimePicker ? (
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={timeDraft}
                onChange={(e) => setTimeDraft(e.target.value)}
                style={{
                  fontFamily: "Oswald, sans-serif",
                  background: "#17161A",
                  color: "#F3EEE6",
                  border: "1px solid #2a292e",
                }}
                className="rounded-lg px-2 py-1.5 text-sm outline-none flex-1"
                dir="ltr"
              />
              <button
                onClick={handleSetReminder}
                style={{ fontFamily: "Vazirmatn, sans-serif", background: "#D91E2B", color: "#F3EEE6" }}
                className="rounded-lg px-3 py-1.5 text-xs font-bold"
              >
                {tr("تنظیم")}</button>
            </div>
          ) : (
            <button
              onClick={() => {
                setTimeDraft(reminderTime);
                setShowTimePicker(true);
              }}
              className="flex items-center gap-1.5"
            >
              <BellIcon className="w-4 h-4" style={{ color: reminderEnabled ? "#F3EEE6" : "#8A8790" }} />
              <span
                style={{
                  fontFamily: "Vazirmatn, sans-serif",
                  color: reminderEnabled ? "#F3EEE6" : "#8A8790",
                }}
                className="text-xs"
              >
                {reminderEnabled ? tr("یادآور برای ساعت {time} فعاله", { time: reminderTime }) : tr("تنظیم یادآور")}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ChapterVisibilityToggle({ visible, onToggle }) {
  const [saving, setSaving] = useState(false);
  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        setSaving(true);
        try {
          await onToggle(!visible);
        } finally {
          setSaving(false);
        }
      }}
      disabled={saving}
      className="absolute top-2 left-2 z-10 flex items-center gap-1.5 rounded-full px-2.5 py-1"
      style={{
        fontFamily: "Vazirmatn, sans-serif",
        background: visible ? "rgba(77,163,255,0.15)" : "rgba(217,30,43,0.15)",
        border: `1px solid ${visible ? "rgba(77,163,255,0.5)" : "rgba(217,30,43,0.5)"}`,
        color: visible ? "#4DA3FF" : "#D91E2B",
      }}
    >
      <span className="text-[10px] font-bold">{saving ? "..." : visible ? tr("عمومی ✓") : tr("فقط ادمین")}</span>
    </button>
  );
}

function TrainingWindow({ title, onClick, image, locked, comingSoon }) {
  const isBlocked = locked || comingSoon;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 px-0.5">
        <h3 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-base font-black">
          {title}
        </h3>
      </div>

      <button
        onClick={comingSoon ? undefined : onClick}
        className="relative w-full rounded-2xl overflow-hidden border block active:scale-95 transition-transform"
        style={{
          borderColor: "rgba(77,163,255,0.45)",
          background: "#141317",
          aspectRatio: "16 / 9",
          cursor: comingSoon ? "default" : "pointer",
          boxShadow: "0 0 24px rgba(77,163,255,0.3), inset 0 0 18px rgba(77,163,255,0.06)",
        }}
      >
        {image ? (
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-contain" />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent 0 16px, rgba(217,30,43,0.06) 16px 17px, transparent 17px 33px)",
            }}
          />
        )}

        {image && (
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(11,11,13,0.75) 0%, rgba(11,11,13,0.1) 55%, transparent 100%)" }}
          />
        )}

        {isBlocked && <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />}

        {/* corner rope accents */}
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: "#D91E2B" }} />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: "#F3EEE6" }} />

        {isBlocked && (
          <div
            className="absolute top-3 left-3 rounded-full flex items-center justify-center"
            style={{ width: "26px", height: "26px", background: "rgba(0,0,0,0.6)", border: "1px solid #2a292e" }}
          >
            <span style={{ fontSize: "13px", lineHeight: 1 }}>🔒</span>
          </div>
        )}

        {comingSoon ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <span
              style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
              className="text-xs font-bold"
            >
              {tr("به‌زودی")}</span>
            <span
              style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
              className="text-xs"
            >
              {tr("در حال آماده‌سازی محتوا")}</span>
          </div>
        ) : locked ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <span
              style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
              className="text-xs font-bold"
            >
              {tr("نیازمند اشتراک")}</span>
            <span
              style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
              className="text-xs"
            >
              {tr("خرید اشتراک ‹")}</span>
          </div>
        ) : image ? null : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: "#3F292F", border: "1px solid rgba(217,30,43,0.4)" }}
            >
              <GloveIcon className="w-5 h-5" style={{ color: "#D91E2B" }} />
            </div>
          </div>
        )}
      </button>
    </div>
  );
}

function ComingSoonBox({ title, subtitle }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 px-0.5">
        <h3 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-base font-black">
          {title}
        </h3>
        <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#55535a", fontSize: "11px" }}>
          {subtitle}
        </span>
      </div>

      <div
        className="relative w-full rounded-2xl overflow-hidden border flex items-center justify-center"
        style={{ borderColor: "#232227", background: "#141317", aspectRatio: "16 / 9" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent 0 16px, rgba(255,255,255,0.03) 16px 17px, transparent 17px 33px)",
          }}
        />
        <span
          style={{ fontFamily: "Oswald, sans-serif", color: "#3a393e", letterSpacing: "0.1em" }}
          className="relative text-sm font-bold"
        >
          {tr("به‌زودی")}</span>

        <div
          className="absolute top-3 right-3 rounded-full flex items-center justify-center"
          style={{ width: "26px", height: "26px", background: "rgba(0,0,0,0.55)", border: "1px solid #2a292e" }}
        >
          <span style={{ fontSize: "13px", lineHeight: 1 }}>🔒</span>
        </div>
      </div>
    </div>
  );
}

// ---------- Screen: Home ----------
function MenuIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function LogoutIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" />
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  );
}

function TipIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6h5.4c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3z" />
    </svg>
  );
}

function InfoIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 8v.01" />
    </svg>
  );
}

function QuestionIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 0 1 4.8 1c0 1.5-2.3 1.8-2.3 3.3" />
      <path d="M12 17v.01" />
    </svg>
  );
}

function SupportIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a8 8 0 1 1-3.2-6.4" />
      <path d="M21 4v5h-5" />
      <path d="M8 12h8M8 15h5" />
    </svg>
  );
}

function CoachIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" />
      <path d="M16 4.5c1.2.4 2 1.5 2 2.8s-.8 2.4-2 2.8M19 20c0-2.8-1.8-5-4-5.8" />
    </svg>
  );
}

/* ================= تایمر تمرین بوکس ================= */
function TimerIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 13.5V9.5M9.5 2.5h5M12 2.5v3.5M18.6 6.4l1.2-1.2" />
    </svg>
  );
}

const TIMER_PRESETS = [
  { id: "pro", name: "حرفه‌ای", rounds: 12, roundSec: 180, restSec: 60 },
  { id: "amateur", name: "آماتور", rounds: 3, roundSec: 180, restSec: 60 },
  { id: "bag", name: "کیسه", rounds: 6, roundSec: 180, restSec: 60 },
  { id: "shadow", name: "سایه‌زنی", rounds: 5, roundSec: 120, restSec: 30 },
  { id: "tabata", name: "تاباتا", rounds: 8, roundSec: 20, restSec: 10 },
];
const TIMER_DEFAULT = { rounds: 3, roundSec: 180, restSec: 60, prepSec: 10, warn: true, sound: true, vibrate: true };
const TIMER_COLORS = { prep: "#4DA3FF", round: "#D91E2B", rest: "#F3EEE6", done: "#4DA3FF" };

function timerClampCfg(c) {
  const n = (v, a, b, d) => {
    v = Math.round(Number(v));
    if (!isFinite(v)) return d;
    return Math.min(b, Math.max(a, v));
  };
  return {
    rounds: n(c.rounds, 1, 30, TIMER_DEFAULT.rounds),
    roundSec: n(c.roundSec, 10, 600, TIMER_DEFAULT.roundSec),
    restSec: n(c.restSec, 0, 300, TIMER_DEFAULT.restSec),
    prepSec: n(c.prepSec, 0, 60, TIMER_DEFAULT.prepSec),
    warn: c.warn !== false,
    sound: c.sound !== false,
    vibrate: c.vibrate !== false,
  };
}

// خط زمانی: آماده‌سازی ← راند ← استراحت ← ... ← راند آخر (بدون استراحت بعد از آخرین راند)
function buildTimerTimeline(cfg) {
  const segs = [];
  let t = 0;
  const push = (type, sec, idx) => {
    if (sec <= 0) return;
    segs.push({ type, idx, start: t, end: t + sec * 1000, dur: sec * 1000 });
    t += sec * 1000;
  };
  push("prep", cfg.prepSec, 0);
  for (let r = 1; r <= cfg.rounds; r++) {
    push("round", cfg.roundSec, r);
    if (r < cfg.rounds) push("rest", cfg.restSec, r);
  }
  return { segs, total: t };
}

function timerLocate(tl, el) {
  if (el >= tl.total) return null;
  const e = Math.max(0, el);
  for (let i = 0; i < tl.segs.length; i++) {
    const s = tl.segs[i];
    if (e < s.end) return { i, seg: s, into: e - s.start, left: s.end - e };
  }
  return null;
}

// رویدادهایی که بین دو لحظه‌ی prev و cur (میلی‌ثانیه) رخ داده‌اند
function timerEvents(tl, cfg, prev, cur) {
  const ev = [];
  const crossed = (x) => x > prev && x <= cur;
  tl.segs.forEach((s) => {
    if (s.start > 0 || prev < 0) {
      if (crossed(s.start) || (prev < 0 && s.start === 0 && cur >= 0)) {
        if (s.type === "round") ev.push("roundStart");
        else if (s.type === "rest") ev.push("restStart");
      }
    }
    if (s.type === "round" && cfg.warn && s.dur > 20000 && crossed(s.end - 10000)) ev.push("warn");
    if (s.type !== "round") {
      [3000, 2000, 1000].forEach((k) => {
        if (s.dur > k && crossed(s.end - k)) ev.push("tick");
      });
    }
  });
  if (crossed(tl.total)) ev.push("done");
  return ev;
}

function fmtClock(ms) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m < 10 ? "0" + m : m}:${r < 10 ? "0" + r : r}`;
}

function makeTimerAudio() {
  let ctx = null;
  const get = () => {
    try {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
      }
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    } catch {
      return null;
    }
  };
  // خروجی مشترک با کمپرسور + اکوی کوتاه (فضای سالن)
  let bus = null;
  const getBus = (c) => {
    if (bus && bus.ctx === c) return bus.in;
    const comp = c.createDynamicsCompressor();
    comp.threshold.value = -14; comp.knee.value = 12; comp.ratio.value = 6; comp.attack.value = 0.003; comp.release.value = 0.2;
    const master = c.createGain();
    master.gain.value = 0.95;
    const dry = c.createGain(); dry.gain.value = 1;
    const delay = c.createDelay(0.5); delay.delayTime.value = 0.09;
    const fb = c.createGain(); fb.gain.value = 0.32;
    const wet = c.createGain(); wet.gain.value = 0.28;
    const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 3800;
    const input = c.createGain();
    input.connect(dry); dry.connect(master);
    input.connect(delay); delay.connect(lp); lp.connect(fb); fb.connect(delay); lp.connect(wet); wet.connect(master);
    master.connect(comp); comp.connect(c.destination);
    bus = { ctx: c, in: input };
    return input;
  };
  const noiseBuf = (c) => {
    const len = Math.floor(c.sampleRate * 0.25);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  };
  // ضربه‌ی زنگ فلزی رینگ بوکس: چند هارمونیک غیرهماهنگ با محو شدن بلند + ضربه‌ی چکش
  const bellOnce = (c, at, vol = 1) => {
    const out = getBus(c);
    const f0 = 760;
    const partials = [[0.5, 0.5, 2.4], [1, 1, 2.2], [1.19, 0.55, 1.6], [1.56, 0.4, 1.3], [2.0, 0.55, 1.5], [2.74, 0.45, 1.0], [3.76, 0.3, 0.7], [5.4, 0.18, 0.45], [6.9, 0.1, 0.3]];
    partials.forEach(([r, a, dec]) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "sine";
      o.frequency.value = f0 * r * (1 + (Math.random() - 0.5) * 0.002);
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(a * 0.5 * vol, at + 0.003);
      g.gain.exponentialRampToValueAtTime(0.0001, at + dec);
      o.connect(g); g.connect(out);
      o.start(at); o.stop(at + dec + 0.05);
    });
    // صدای ضربه‌ی چکش به فلز
    const n = c.createBufferSource();
    n.buffer = noiseBuf(c);
    const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 3200; bp.Q.value = 0.9;
    const ng = c.createGain();
    ng.gain.setValueAtTime(0.5 * vol, at);
    ng.gain.exponentialRampToValueAtTime(0.0001, at + 0.05);
    n.connect(bp); bp.connect(ng); ng.connect(out);
    n.start(at); n.stop(at + 0.1);
  };
  // کوبش چوب (هشدار ۱۰ ثانیه‌ی آخر راند)
  const clap = (c, at) => {
    const out = getBus(c);
    const n = c.createBufferSource();
    n.buffer = noiseBuf(c);
    const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1700; bp.Q.value = 1.4;
    const g = c.createGain();
    g.gain.setValueAtTime(0.9, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.07);
    n.connect(bp); bp.connect(g); g.connect(out);
    n.start(at); n.stop(at + 0.12);
    const o = c.createOscillator(); const og = c.createGain();
    o.type = "triangle"; o.frequency.setValueAtTime(900, at); o.frequency.exponentialRampToValueAtTime(380, at + 0.05);
    og.gain.setValueAtTime(0.35, at); og.gain.exponentialRampToValueAtTime(0.0001, at + 0.06);
    o.connect(og); og.connect(out); o.start(at); o.stop(at + 0.08);
  };
  const beep = (c, at, f, len, vol) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(vol, at + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, at + len);
    o.connect(g);
    g.connect(getBus(c));
    o.start(at);
    o.stop(at + len + 0.02);
  };
  return {
    unlock() {
      const c = get();
      if (c) beep(c, c.currentTime, 440, 0.01, 0.0001);
    },
    bell(times) {
      const c = get();
      if (!c) return;
      // شروع راند: یک ضربه‌ی کامل؛ استراحت: دو ضربه؛ پایان: سه ضربه‌ی پشت‌سرهم مثل زنگ واقعی
      const gap = times === 1 ? 0 : 0.42;
      for (let i = 0; i < times; i++) bellOnce(c, c.currentTime + 0.02 + i * gap, i === times - 1 ? 1 : 0.85);
    },
    clapper() {
      const c = get();
      if (!c) return;
      for (let i = 0; i < 3; i++) clap(c, c.currentTime + i * 0.11);
    },
    tick() {
      const c = get();
      if (c) beep(c, c.currentTime, 1040, 0.09, 0.6);
    },
    close() {
      try { ctx && ctx.close && ctx.close(); } catch {}
      ctx = null;
      bus = null;
    },
  };
}

function TimerStepper({ label, value, onChange, min, max, step, format }) {
  const btn = {
    width: 40, height: 40, borderRadius: 12, background: "#26242A", color: "#F3EEE6",
    border: "1px solid #3a3840", fontSize: 22, fontWeight: 900, lineHeight: 1,
  };
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));
  return (
    <div className="flex items-center justify-between rounded-xl px-3 py-2" style={{ background: "#17161A", border: "1px solid #2c2a31" }}>
      <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-bold">{label}</span>
      <div className="flex items-center gap-3" dir="ltr">
        <button onClick={dec} style={btn} aria-label="-">−</button>
        <span style={{ fontFamily: '"Bebas Neue", Oswald, sans-serif', color: "#F3EEE6", fontSize: 26, minWidth: 64, textAlign: "center", letterSpacing: 1 }}>
          {format ? format(value) : value}
        </span>
        <button onClick={inc} style={btn} aria-label="+">+</button>
      </div>
    </div>
  );
}

function TimerToggle({ label, on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="flex items-center justify-between rounded-xl px-3 py-2.5 w-full"
      style={{ background: "#17161A", border: "1px solid #2c2a31" }}
    >
      <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-bold">{label}</span>
      <span dir="ltr" style={{ width: 46, height: 26, borderRadius: 13, background: on ? "#D91E2B" : "#3a3840", position: "relative", flexShrink: 0, transition: "background .2s" }}>
        <span style={{ position: "absolute", top: 3, left: on ? 23 : 3, width: 20, height: 20, borderRadius: 10, background: "#F3EEE6", transition: "left .2s" }} />
      </span>
    </button>
  );
}

function TimerScreen({ onBack }) {
  const [cfg, setCfg] = useState(TIMER_DEFAULT);
  const [loaded, setLoaded] = useState(false);
  const [mode, setMode] = useState("idle"); // idle | running | paused | done
  const [elapsed, setElapsed] = useState(0);
  const modeRef = useRef("idle");
  const baseRef = useRef(0);
  const startRef = useRef(0);
  const prevRef = useRef(0);
  const audioRef = useRef(null);
  const lockRef = useRef(null);
  const cfgRef = useRef(cfg);
  cfgRef.current = cfg;

  const tl = useMemo(() => buildTimerTimeline(cfg), [cfg]);
  const tlRef = useRef(tl);
  tlRef.current = tl;

  useEffect(() => {
    let alive = true;
    AppStorage.get("timer-cfg").then((v) => {
      if (!alive) return;
      try {
        if (v) setCfg(timerClampCfg({ ...TIMER_DEFAULT, ...JSON.parse(v) }));
      } catch {}
      setLoaded(true);
    });
    return () => { alive = false; };
  }, []);

  const updateCfg = (patch) => {
    const next = timerClampCfg({ ...cfgRef.current, ...patch });
    setCfg(next);
    AppStorage.set("timer-cfg", JSON.stringify(next));
  };

  const getAudio = () => {
    if (!audioRef.current) audioRef.current = makeTimerAudio();
    return audioRef.current;
  };

  const buzz = (p) => {
    try { if (cfgRef.current.vibrate && navigator.vibrate) navigator.vibrate(p); } catch {}
  };

  const fire = (events) => {
    const c = cfgRef.current;
    events.forEach((e) => {
      if (e === "roundStart") { if (c.sound) getAudio().bell(1); buzz(400); }
      else if (e === "restStart") { if (c.sound) getAudio().bell(2); buzz([200, 100, 200]); }
      else if (e === "done") { if (c.sound) getAudio().bell(3); buzz([300, 120, 300, 120, 600]); }
      else if (e === "warn") { if (c.sound) getAudio().clapper(); buzz(150); }
      else if (e === "tick") { if (c.sound) getAudio().tick(); }
    });
  };

  const acquireLock = async () => {
    try {
      const KA = window.Capacitor?.Plugins?.KeepAwake;
      if (KA && KA.keepAwake) await KA.keepAwake();
      if (navigator.wakeLock && navigator.wakeLock.request) lockRef.current = await navigator.wakeLock.request("screen");
    } catch {}
  };
  const releaseLock = () => {
    try {
      const KA = window.Capacitor?.Plugins?.KeepAwake;
      if (KA && KA.allowSleep) KA.allowSleep();
      if (lockRef.current) { lockRef.current.release(); lockRef.current = null; }
    } catch {}
  };

  const tick = () => {
    if (modeRef.current !== "running") return;
    const cur = baseRef.current + (Date.now() - startRef.current);
    const prev = prevRef.current;
    prevRef.current = cur;
    fire(timerEvents(tlRef.current, cfgRef.current, prev, cur));
    if (cur >= tlRef.current.total) {
      modeRef.current = "done";
      setMode("done");
      setElapsed(tlRef.current.total);
      releaseLock();
    } else {
      setElapsed(cur);
    }
  };

  useEffect(() => {
    if (mode !== "running") return undefined;
    const id = setInterval(tick, 100);
    const vis = () => { if (document.visibilityState === "visible") { tick(); acquireLock(); } };
    document.addEventListener && document.addEventListener("visibilitychange", vis);
    return () => {
      clearInterval(id);
      document.removeEventListener && document.removeEventListener("visibilitychange", vis);
    };
  }, [mode]);

  useEffect(() => () => {
    modeRef.current = "idle";
    releaseLock();
    if (audioRef.current) audioRef.current.close();
  }, []);

  const setM = (m) => { modeRef.current = m; setMode(m); };

  const start = () => {
    getAudio().unlock();
    baseRef.current = 0;
    startRef.current = Date.now();
    prevRef.current = -1;
    setElapsed(0);
    setM("running");
    acquireLock();
    fire(timerEvents(tlRef.current, cfgRef.current, -1, 0));
    prevRef.current = 0;
  };
  const pause = () => {
    baseRef.current += Date.now() - startRef.current;
    setM("paused");
  };
  const resume = () => {
    getAudio().unlock();
    startRef.current = Date.now();
    setM("running");
    acquireLock();
  };
  const reset = () => {
    setM("idle");
    setElapsed(0);
    baseRef.current = 0;
    releaseLock();
  };
  const skip = () => {
    const loc = timerLocate(tlRef.current, modeRef.current === "running" ? baseRef.current + (Date.now() - startRef.current) : baseRef.current);
    if (!loc) return;
    const target = loc.seg.end;
    baseRef.current = target;
    startRef.current = Date.now();
    prevRef.current = target;
    setElapsed(target);
    if (target >= tlRef.current.total) {
      fire(["done"]);
      setM("done");
      releaseLock();
    } else {
      const nxt = tlRef.current.segs.find((s) => s.start === target);
      if (nxt) fire([nxt.type === "round" ? "roundStart" : "restStart"]);
    }
  };

  const loc = timerLocate(tl, elapsed);
  const phase = mode === "done" ? "done" : loc ? loc.seg.type : "prep";
  const color = TIMER_COLORS[phase] || TIMER_COLORS.round;
  const active = mode !== "idle";
  const timeLeft = loc ? loc.left : 0;
  const prog = loc ? loc.into / loc.seg.dur : 1;
  const nextSeg = loc ? tl.segs[loc.i + 1] : null;
  const phaseName = (s) =>
    s.type === "prep" ? tr("آماده‌سازی") : s.type === "rest" ? tr("استراحت") : tr("راند {n}", { n: s.idx });
  const totalLeft = Math.max(0, tl.total - elapsed);

  const R = 118;
  const C = 2 * Math.PI * R;

  const presetActive = (p) => cfg.rounds === p.rounds && cfg.roundSec === p.roundSec && cfg.restSec === p.restSec;
  const isCustom = !TIMER_PRESETS.some(presetActive);

  const ctrlBtn = (bg, fg, extra) => ({
    background: bg, color: fg, borderRadius: 16, fontFamily: "Vazirmatn, sans-serif", fontWeight: 900, ...extra,
  });

  return (
    <div
      className="flex-1 overflow-y-auto px-5 pt-3 pb-6 flex flex-col"
      dir={APP_DIR}
      style={{
        background: active ? `radial-gradient(ellipse at 50% 30%, ${color}33 0%, rgba(11,11,13,0) 65%)` : undefined,
        transition: "background .4s",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => { releaseLock(); onBack(); }}
          style={{ color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" }}
          className="text-sm rounded-lg px-3 py-1.5 font-bold inline-block"
        >
          {tr("› بازگشت")}
        </button>
        <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-lg font-black flex items-center gap-2">
          <TimerIcon className="w-5 h-5" style={{ color: "#D91E2B" }} />
          {tr("تایمر تمرین")}
        </h1>
      </div>

      {!active && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {TIMER_PRESETS.map((p) => {
              const on = presetActive(p);
              return (
                <button
                  key={p.id}
                  onClick={() => updateCfg({ rounds: p.rounds, roundSec: p.roundSec, restSec: p.restSec })}
                  className="rounded-full px-3 py-1.5 text-xs font-black"
                  style={{
                    fontFamily: "Vazirmatn, sans-serif",
                    background: on ? "#D91E2B" : "#17161A",
                    color: on ? "#fff" : "#CFC9BF",
                    border: on ? "1px solid #D91E2B" : "1px solid #3a3840",
                  }}
                >
                  {tr(p.name)}
                </button>
              );
            })}
            <span
              className="rounded-full px-3 py-1.5 text-xs font-black"
              style={{ fontFamily: "Vazirmatn, sans-serif", background: isCustom ? "#4DA3FF" : "#17161A", color: isCustom ? "#0B0B0D" : "#6d6a72", border: "1px solid #3a3840" }}
            >
              {tr("دلخواه")}
            </span>
          </div>

          <div className="rounded-2xl py-4 flex flex-col items-center" style={{ background: "#17161A", border: "1px solid #4DA3FF", boxShadow: "0 0 18px rgba(77,163,255,0.25)" }}>
            <span style={{ fontFamily: '"Bebas Neue", Oswald, sans-serif', color: "#F3EEE6", fontSize: 56, letterSpacing: 2, lineHeight: 1 }} dir="ltr">{fmtClock(cfg.roundSec * 1000)}</span>
            <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs mt-1">
              {tr("{n} راند", { n: cfg.rounds })} · {tr("استراحت")} {fmtClock(cfg.restSec * 1000)}
            </span>
            <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs font-bold mt-1">
              {tr("مجموع زمان: {time}", { time: fmtClock(tl.total) })}
            </span>
          </div>

          <TimerStepper label={tr("تعداد راند")} value={cfg.rounds} min={1} max={30} step={1} onChange={(v) => updateCfg({ rounds: v })} />
          <TimerStepper label={tr("مدت هر راند")} value={cfg.roundSec} min={10} max={600} step={cfg.roundSec >= 60 ? 15 : 5} format={(v) => fmtClock(v * 1000)} onChange={(v) => updateCfg({ roundSec: v })} />
          <TimerStepper label={tr("زمان استراحت")} value={cfg.restSec} min={0} max={300} step={cfg.restSec >= 60 ? 15 : 5} format={(v) => fmtClock(v * 1000)} onChange={(v) => updateCfg({ restSec: v })} />
          <TimerStepper label={tr("آماده‌سازی قبل از شروع")} value={cfg.prepSec} min={0} max={60} step={5} format={(v) => fmtClock(v * 1000)} onChange={(v) => updateCfg({ prepSec: v })} />

          <TimerToggle label={tr("هشدار ۱۰ ثانیه آخر راند")} on={cfg.warn} onChange={(v) => updateCfg({ warn: v })} />
          <TimerToggle label={tr("صدا")} on={cfg.sound} onChange={(v) => updateCfg({ sound: v })} />
          <TimerToggle label={tr("لرزش")} on={cfg.vibrate} onChange={(v) => updateCfg({ vibrate: v })} />

          <button
            onClick={start}
            disabled={!loaded}
            className="w-full py-4 text-lg mt-1"
            style={ctrlBtn("#D91E2B", "#fff", { boxShadow: "0 0 22px rgba(217,30,43,0.55)", opacity: loaded ? 1 : 0.6 })}
          >
            ▶ {tr("شروع تمرین")}
          </button>
        </div>
      )}

      {active && (
        <div className="flex-1 flex flex-col items-center justify-between">
          <div className="flex flex-col items-center gap-2 mt-1">
            <span
              style={{ fontFamily: "Vazirmatn, sans-serif", color: "#0B0B0D", background: color, letterSpacing: 1 }}
              className="rounded-full px-4 py-1 text-sm font-black"
            >
              {mode === "done" ? tr("تمرین تمام شد!") : loc ? phaseName(loc.seg) : ""}
            </span>
            {mode !== "done" && loc && (
              <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-bold">
                {loc.seg.type === "prep" ? tr("آماده باش…") : tr("راند {n} از {total}", { n: loc.seg.type === "rest" ? loc.seg.idx + 1 : loc.seg.idx, total: cfg.rounds })}
              </span>
            )}
          </div>

          <div className="relative my-3" style={{ width: 280, height: 280 }} dir="ltr">
            <svg viewBox="0 0 280 280" width="280" height="280" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="140" cy="140" r={R} fill="none" stroke="#26242A" strokeWidth="14" />
              <circle
                cx="140" cy="140" r={R} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
                strokeDasharray={C} strokeDashoffset={C * (mode === "done" ? 0 : prog)}
                style={{ filter: `drop-shadow(0 0 8px ${color})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {mode === "done" ? (
                <span style={{ fontSize: 72, color: TIMER_COLORS.done }}>✓</span>
              ) : (
                <span
                  style={{
                    fontFamily: '"Bebas Neue", Oswald, Impact, sans-serif', color: loc && loc.seg.type === "round" && timeLeft <= 10000 ? "#FF5A64" : "#F3EEE6", fontSize: 92, lineHeight: 1, letterSpacing: 2,
                    textShadow: `0 0 18px ${color}88`,
                  }}
                >
                  {fmtClock(timeLeft)}
                </span>
              )}
              {mode === "paused" && (
                <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs font-black mt-1">{tr("متوقف شد")}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex flex-wrap justify-center gap-1.5" dir="ltr">
              {Array.from({ length: cfg.rounds }, (_, i) => {
                const n = i + 1;
                const cur = loc && loc.seg.type !== "prep" && (loc.seg.type === "round" ? loc.seg.idx === n : loc.seg.idx === n);
                const finished = mode === "done" || (loc && (loc.seg.type === "round" ? loc.seg.idx > n : loc.seg.idx >= n) && loc.seg.type !== "prep");
                return (
                  <span key={n} style={{ width: 12, height: 12, borderRadius: 6, background: finished ? "#D91E2B" : cur ? color : "#3a3840", boxShadow: cur ? `0 0 8px ${color}` : "none" }} />
                );
              })}
            </div>
            {mode === "done" ? (
              <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-bold text-center">
                {tr("{n} راند", { n: cfg.rounds })} · {fmtClock(tl.total)}
              </span>
            ) : (
              <>
                {nextSeg && (
                  <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs font-bold">
                    {tr("بعدی: {name}", { name: phaseName(nextSeg) })}
                  </span>
                )}
                <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs">
                  {tr("زمان باقی‌مانده: {time}", { time: fmtClock(totalLeft) })}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 w-full mt-4">
            {mode === "done" ? (
              <>
                <button onClick={reset} className="flex-1 py-4" style={ctrlBtn("#26242A", "#F3EEE6", { border: "1px solid #3a3840" })}>{tr("تنظیمات")}</button>
                <button onClick={start} className="flex-[2] py-4 text-lg" style={ctrlBtn("#D91E2B", "#fff", { boxShadow: "0 0 22px rgba(217,30,43,0.55)" })}>↻ {tr("شروع دوباره")}</button>
              </>
            ) : (
              <>
                <button onClick={reset} className="flex-1 py-4" style={ctrlBtn("#26242A", "#F3EEE6", { border: "1px solid #3a3840" })}>{tr("ریست")}</button>
                {mode === "running" ? (
                  <button onClick={pause} className="flex-[2] py-4 text-lg" style={ctrlBtn("#F3EEE6", "#0B0B0D")}>❚❚ {tr("توقف")}</button>
                ) : (
                  <button onClick={resume} className="flex-[2] py-4 text-lg" style={ctrlBtn("#D91E2B", "#fff", { boxShadow: "0 0 22px rgba(217,30,43,0.55)" })}>▶ {tr("ادامه")}</button>
                )}
                <button onClick={skip} className="flex-1 py-4" style={ctrlBtn("#26242A", "#F3EEE6", { border: "1px solid #3a3840" })}>{tr("رد کردن")}</button>
              </>
            )}
          </div>
          <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#6d6a72" }} className="text-xs mt-3 text-center">
            {tr("صفحه روشن می‌ماند")}
          </span>
        </div>
      )}
    </div>
  );
}

// ---------- بروزرسانی اپ ----------
// شماره‌ی ساخت (build) همین نسخه از اپ. با هر انتشار نسخه‌ی جدید روی بازار، این عدد یکی زیاد می‌شه.
// اگه ادمین «آخرین نسخه» رو بزرگ‌تر از این عدد بذاره، پیام بروزرسانی روی صفحه‌ی هوم نشون داده می‌شه.
// شماره‌ی ساخت (versionCode) خودکار از خود اپ اندروید خونده می‌شه (= شماره‌ی اجرای GitHub Actions)؛ نیازی به تغییر دستی نیست.
let APP_BUILD = 0; // ۰ = نامشخص (مثلاً اجرا توی مرورگر) ← پیام بروزرسانی نشون داده نمی‌شه
async function loadAppBuild() {
  try {
    const info = await window.Capacitor?.Plugins?.App?.getInfo?.();
    const n = Number(info?.build);
    if (Number.isFinite(n) && n > 0) APP_BUILD = n;
  } catch {}
  return APP_BUILD;
}
const DEFAULT_APP_UPDATE = { enabled: true, latest: 0, force: false, title: "", message: "", url: "https://cafebazaar.ir/app/ir.naseri.boxingapp" };

async function apiFetchAppUpdate() {
  if (DEMO_MODE) return DEFAULT_APP_UPDATE;
  try {
    const res = await apiFetch(`${API_BASE_URL}/settings/app-update`);
    const data = await res.json().catch(() => ({}));
    if (data.ok) {
      const u = { ...DEFAULT_APP_UPDATE, ...data.update };
      try { localStorage.setItem("appUpdateCache", JSON.stringify(u)); } catch {}
      return u;
    }
  } catch {}
  // اگه شبکه/سرور جواب نداد، آخرین اطلاعات ذخیره‌شده رو استفاده کن تا پیام برای بعضی‌ها گم نشه
  try {
    const c = JSON.parse(localStorage.getItem("appUpdateCache") || "null");
    if (c) return { ...DEFAULT_APP_UPDATE, ...c };
  } catch {}
  return DEFAULT_APP_UPDATE;
}

async function apiCheckAppUpdate(token) {
  const res = await apiFetch(`${API_BASE_URL}/settings/app-update/check`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("ذخیره انجام نشد"));
  return { ...DEFAULT_APP_UPDATE, ...data.update };
}

async function apiSaveAppUpdate(token, update) {
  if (DEMO_MODE) return update;
  const res = await apiFetch(`${API_BASE_URL}/settings/app-update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(update),
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("ذخیره انجام نشد"));
  return { ...DEFAULT_APP_UPDATE, ...data.update };
}

function openExternalUrl(url) {
  try {
    const w = window.open(url, "_system");
    if (!w) window.location.href = url;
  } catch {
    try { window.location.href = url; } catch {}
  }
}

function UpdateIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12M7 10l5 5 5-5M4 20h16" />
    </svg>
  );
}

function UpdateModal({ update, onLater }) {
  return (
    <div
      data-testid="update-modal"
      dir={APP_DIR}
      style={{ position: "fixed", inset: 0, zIndex: 70, background: "rgba(0,0,0,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
    >
      <div
        className="w-full rounded-2xl p-5 flex flex-col items-center text-center"
        style={{ maxWidth: 340, background: "#17161A", border: "1px solid #4DA3FF", boxShadow: "0 0 28px rgba(77,163,255,0.4)" }}
      >
        <div style={{ width: 64, height: 64, borderRadius: 32, background: "#44292E", border: "1px solid #D91E2B", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 18px rgba(217,30,43,0.45)" }}>
          <UpdateIcon className="w-8 h-8" style={{ color: "#D91E2B" }} />
        </div>
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#4DA3FF" }} className="text-xs font-black mt-3">
          {tr("بروزرسانی اپ")}
        </p>
        <h2 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-lg font-black mt-1">
          {update.title || tr("نسخه‌ی جدید آکادمی Naseri منتشر شد")}
        </h2>
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", lineHeight: 1.9 }} className="text-sm mt-3">
          {update.message || tr("برای استفاده از جدیدترین امکانات، تمرین‌های کامل‌تر و عملکرد بهتر، اپ را به آخرین نسخه بروزرسانی کنید. بروزرسانی فقط چند ثانیه طول می‌کشد و پیشرفت و اشتراک شما حفظ می‌شود.")}
        </p>
        <button
          onClick={() => openExternalUrl(update.url)}
          className="w-full py-3 mt-5 text-base"
          style={{ background: "#D91E2B", color: "#fff", borderRadius: 14, fontFamily: "Vazirmatn, sans-serif", fontWeight: 900, boxShadow: "0 0 20px rgba(217,30,43,0.5)" }}
        >
          {tr("بروزرسانی در بازار")}
        </button>
        {!update.force && (
          <button
            onClick={onLater}
            className="w-full py-2 mt-2 text-sm"
            style={{ color: "#F3EEE6", fontFamily: "Vazirmatn, sans-serif", fontWeight: 700 }}
          >
            {tr("بعداً")}
          </button>
        )}
      </div>
    </div>
  );
}

// ---------- اعلان‌های ادمین (نوتیفیکیشن محلی زمان‌بندی‌شده) ----------
// ادمین پیام + زمان رو ثبت می‌کنه؛ اپ موقع باز شدن اعلان‌های جدید رو می‌گیره و روی خود گوشی زمان‌بندی می‌کنه
async function apiFetchAnnouncements() {
  try {
    const res = await apiFetch(`${API_BASE_URL}/announcements`);
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || !data.ok) return null;
    return Array.isArray(data.announcements) ? data.announcements : [];
  } catch {
    return null;
  }
}
async function syncAnnouncements() {
  if (DEMO_MODE) return;
  const LN = window.Capacitor?.Plugins?.LocalNotifications;
  if (!LN) return;
  const list = await apiFetchAnnouncements();
  if (!list || !list.length) return;
  let done = [];
  try { done = JSON.parse((await AppStorage.get("ann-done")) || "[]"); } catch {}
  if (!Array.isArray(done)) done = [];
  const fresh = list.filter((a) => !done.includes(a.id));
  if (!fresh.length) return;
  try {
    let perm = await LN.checkPermissions();
    if (perm.display !== "granted") perm = await LN.requestPermissions();
    if (perm.display !== "granted") return;
    const now = Date.now();
    const notifications = fresh.map((a, i) => {
      let h = 7; for (const ch of a.id) h = (h * 31 + ch.charCodeAt(0)) % 100000;
      return {
        id: 3000 + (h % 90000),
        title: a.title,
        body: a.body,
        schedule: { at: new Date(Math.max(a.at, now + 3000 + i * 1500)), allowWhileIdle: true },
        smallIcon: "ic_stat_glove",
      };
    });
    await LN.schedule({ notifications });
    await AppStorage.set("ann-done", JSON.stringify([...done, ...fresh.map((a) => a.id)].slice(-100)));
  } catch {}
}
async function apiAdminAnnouncements(token, method, path, payload) {
  const res = await apiFetch(`${API_BASE_URL}/announcements${path}`, {
    method,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    ...(payload ? { body: JSON.stringify(payload) } : {}),
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("ذخیره انجام نشد"));
  return data.announcements || [];
}

const ANN_TEMPLATES = [
  { label: "آپدیت جدید", title: "آپدیت جدید آکادمی ناصری 🥊", body: "مسیر پیشرفت ۱۰۰ روزه، علوم ضروری بوکس و برنامه‌های تخصصی اومد. همین حالا اپ رو آپدیت کن 💪" },
  { label: "یادآوری تمرین", title: "امروز تمرین کردی؟ 🔔", body: "فقط یه جلسه کافیه تا زنجیره‌ی پیشرفتت نشکنه. جلسه‌ی بعدی منتظرته 🥊" },
  { label: "تشویق به اشتراک", title: "همه‌ی فصل‌ها منتظرتن 🏆", body: "با اشتراک آکادمی ناصری همه‌ی فصل‌ها و برنامه‌های تخصصی رو باز کن 🥇" },
];

function annTimeOptions() {
  const at = (dayOffset, h) => { const d = new Date(); d.setDate(d.getDate() + dayOffset); d.setHours(h, 0, 0, 0); return d.getTime(); };
  const now = Date.now();
  const opts = [{ k: "now", l: "همین الان", at: now }];
  [[0, 20, "امشب ۲۰:۰۰"], [1, 10, "فردا ۱۰:۰۰"], [1, 18, "فردا ۱۸:۰۰"]].forEach(([d, h, l]) => { const t = at(d, h); if (t > now) opts.push({ k: l, l, at: t }); });
  return opts;
}

function AdminAnnounceScreen({ authToken, onBack }) {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [timeKey, setTimeKey] = useState("now");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const field = { background: "#17161A", border: "1px solid #3a3840", color: "#F3EEE6", borderRadius: 12, fontFamily: "Vazirmatn, sans-serif", padding: "10px 12px", width: "100%" };
  const lab = { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" };
  useEffect(() => { apiAdminAnnouncements(authToken, "GET", "/all").then(setList).catch((e) => setMsg(e.message)); }, [authToken]);
  const opts = annTimeOptions();
  const send = async () => {
    if (!title.trim() || !body.trim() || busy) return;
    const o = opts.find((x) => x.k === timeKey) || opts[0];
    setBusy(true); setMsg("");
    try {
      setList(await apiAdminAnnouncements(authToken, "POST", "", { title: title.trim(), body: body.trim(), at: o.at }));
      setTitle(""); setBody(""); setMsg(tr("ثبت شد ✓ هر کاربری که اپ رو باز کنه، پیام رو در زمان تعیین‌شده به‌صورت نوتیفیکیشن می‌گیره."));
    } catch (e) { setMsg(e.message || tr("ذخیره انجام نشد")); }
    setBusy(false);
  };
  const del = async (id) => {
    try { setList(await apiAdminAnnouncements(authToken, "DELETE", "/" + id)); } catch (e) { setMsg(e.message); }
  };
  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6" dir={APP_DIR}>
      <button onClick={onBack} style={{ color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" }} className="text-sm mb-4 rounded-lg px-3 py-1.5 font-bold inline-block">{tr("› بازگشت")}</button>
      <h1 style={lab} className="text-lg font-black mb-1">{tr("ارسال اعلان به کاربران")}</h1>
      <p style={lab} className="text-xs mb-3" >{tr("پیام شما بعد از باز شدن اپ توسط هر کاربر، در زمان انتخابی به‌صورت نوتیفیکیشن روی گوشی‌اش نمایش داده می‌شه.")}</p>
      <div className="flex gap-2 flex-wrap mb-3">
        {ANN_TEMPLATES.map((t) => (
          <button key={t.label} onClick={() => { setTitle(t.title); setBody(t.body); }} className="rounded-lg px-3 py-1.5 text-xs font-black" style={{ background: "#2B2C30", border: "1px solid #5C5D62", color: "#F3EEE6", fontFamily: "Vazirmatn, sans-serif" }}>{t.label}</button>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <p style={lab} className="text-xs font-bold mb-1">{tr("عنوان")}</p>
          <input value={title} maxLength={80} onChange={(e) => setTitle(e.target.value)} style={field} />
        </div>
        <div>
          <p style={lab} className="text-xs font-bold mb-1">{tr("متن پیام")}</p>
          <textarea rows={4} value={body} maxLength={300} onChange={(e) => setBody(e.target.value)} style={{ ...field, resize: "none", lineHeight: 1.9 }} />
        </div>
        <div>
          <p style={lab} className="text-xs font-bold mb-1">{tr("زمان نمایش")}</p>
          <div className="flex gap-2 flex-wrap">
            {opts.map((o) => (
              <button key={o.k} onClick={() => setTimeKey(o.k)} className="rounded-xl px-3 py-2 text-xs font-black" style={{ fontFamily: "Vazirmatn, sans-serif", background: timeKey === o.k ? "#F3EEE6" : "#2B2C30", color: timeKey === o.k ? "#0B0B0D" : "#F3EEE6", border: "1px solid #5C5D62" }}>{o.l}</button>
            ))}
          </div>
        </div>
        <button disabled={busy || !title.trim() || !body.trim()} onClick={send} className="rounded-xl py-3 text-sm font-black" style={{ background: "#D91E2B", color: "#fff", fontFamily: "Vazirmatn, sans-serif", opacity: busy || !title.trim() || !body.trim() ? 0.5 : 1 }}>{busy ? "..." : tr("ثبت اعلان")}</button>
        {msg && <p style={{ ...lab, color: msg.includes("✓") ? "#3DE08A" : "#FF6B76", lineHeight: 1.9 }} className="text-xs font-bold text-center">{msg}</p>}
      </div>
      {list.length > 0 && (
        <div className="mt-5">
          <p style={lab} className="text-sm font-black mb-2">{tr("اعلان‌های ثبت‌شده")}</p>
          <div className="flex flex-col gap-2">
            {list.slice().reverse().map((a) => (
              <div key={a.id} className="rounded-xl p-3 flex items-start gap-2" style={{ background: "#2B2C30", border: "1px solid #5C5D62" }}>
                <div className="flex-1 min-w-0">
                  <p style={lab} className="text-xs font-black">{a.title}</p>
                  <p style={lab} className="text-[11px] mt-1 leading-5">{a.body}</p>
                  <p style={lab} className="text-[10px] mt-1 opacity-70" dir="ltr">{new Date(a.at).toLocaleString("fa-IR")}</p>
                </div>
                <button onClick={() => del(a.id)} className="rounded-lg px-2.5 py-1 text-[11px] font-black shrink-0" style={{ background: "#D91E2B", color: "#fff", fontFamily: "Vazirmatn, sans-serif" }}>{tr("حذف")}</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AdminUpdateScreen({ update, build, authToken, onSave, onCheck, onBack }) {
  const [d, setD] = useState({ ...update, latest: "" });
  const [checking, setChecking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const field = { background: "#17161A", border: "1px solid #3a3840", color: "#F3EEE6", borderRadius: 12, fontFamily: "Vazirmatn, sans-serif", padding: "10px 12px", width: "100%" };
  const lab = { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" };
  const save = async () => {
    setBusy(true);
    setMsg("");
    try {
      await onSave({ ...d, latest: Number(d.latest) });
      setMsg(tr("ذخیره شد ✓"));
    } catch (e) {
      setMsg(e.message || tr("ذخیره انجام نشد"));
    }
    setBusy(false);
  };
  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6" dir={APP_DIR}>
      <button onClick={onBack} style={{ color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" }} className="text-sm mb-4 rounded-lg px-3 py-1.5 font-bold inline-block">
        {tr("› بازگشت")}
      </button>
      <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-lg font-black mb-1">{tr("بروزرسانی اپ")}</h1>
      <p style={{ ...lab, color: "#F3EEE6" }} className="text-xs mb-4">
        {tr("نسخه‌ی نصب‌شده روی این گوشی: {n}", { n: build || "—" })}
      </p>
      <div className="rounded-xl p-3 mb-3" style={{ background: "#17161A", border: "1px solid #2c2a31" }}>
        <p style={lab} className="text-sm font-bold">
          {update.autoOk ? tr("آخرین نسخه‌ی منتشرشده در بازار (خودکار): {n}", { n: update.autoLatest }) : tr("تشخیص خودکار از بازار هنوز نتیجه‌ای نداشته")}
        </p>
        <p style={{ ...lab, color: "#F3EEE6" }} className="text-xs mt-1">{tr("هر ۶ ساعت خودکار بررسی می‌شود؛ هر نسخه‌ی جدید به‌صورت خودکار برای کاربران پیام می‌دهد.")}</p>
        <button
          disabled={checking}
          onClick={async () => { setChecking(true); try { await onCheck(); } catch {} setChecking(false); }}
          className="mt-2 rounded-lg px-3 py-1.5 text-xs font-black"
          style={{ background: "#4DA3FF", color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", opacity: checking ? 0.6 : 1 }}
        >
          {tr("بررسی همین الان")}
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <TimerToggle label={tr("ارسال خودکار پیام بروزرسانی به کاربران")} on={!!d.enabled} onChange={(v) => setD({ ...d, enabled: v })} />
        <TimerToggle label={tr("بروزرسانی اجباری (بدون دکمه‌ی بعداً)")} on={!!d.force} onChange={(v) => setD({ ...d, force: v })} />
        <div>
          <p style={lab} className="text-xs font-bold mb-1">{tr("شماره‌ی نسخه‌ی دستی (اختیاری؛ فقط اگر تشخیص خودکار کار نکرد)")}</p>
          <input dir="ltr" inputMode="numeric" value={d.latest} onChange={(e) => setD({ ...d, latest: e.target.value.replace(/[^0-9]/g, "") })} style={field} />
        </div>
        <div>
          <p style={lab} className="text-xs font-bold mb-1">{tr("عنوان (خالی = متن پیش‌فرض)")}</p>
          <input maxLength={60} value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} style={field} />
        </div>
        <div>
          <p style={lab} className="text-xs font-bold mb-1">{tr("متن پیام (خالی = متن پیش‌فرض)")}</p>
          <textarea rows={4} maxLength={400} value={d.message} onChange={(e) => setD({ ...d, message: e.target.value })} style={field} />
        </div>
        <div>
          <p style={lab} className="text-xs font-bold mb-1">{tr("لینک اپ در بازار")}</p>
          <input dir="ltr" value={d.url} onChange={(e) => setD({ ...d, url: e.target.value })} style={field} />
        </div>
        <button onClick={save} disabled={busy} className="w-full py-3 text-base" style={{ background: "#D91E2B", color: "#fff", borderRadius: 14, fontFamily: "Vazirmatn, sans-serif", fontWeight: 900, opacity: busy ? 0.6 : 1 }}>
          {tr("ذخیره")}
        </button>
        {msg && <p style={{ ...lab, color: "#F3EEE6" }} className="text-sm font-bold text-center">{msg}</p>}
      </div>
    </div>
  );
}

// راهنمای نصب روی آیفون: فقط وقتی اپ داخل Safari (نسخه‌ی وب) باز شده و هنوز روی صفحه‌ی اصلی نصب نشده
function IosInstallHint() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      const native = Boolean(window.Capacitor?.isNativePlatform?.());
      const ios = /iphone|ipad|ipod/i.test(navigator.userAgent || "");
      const standalone = Boolean(navigator.standalone) || Boolean(window.matchMedia?.("(display-mode: standalone)")?.matches);
      if (!native && ios && !standalone && window.localStorage.getItem("ios-install-hint") !== "1") setShow(true);
    } catch {}
  }, []);
  if (!show) return null;
  const close = () => {
    try { window.localStorage.setItem("ios-install-hint", "1"); } catch {}
    setShow(false);
  };
  return (
    <div
      data-testid="ios-install-hint"
      dir={APP_DIR}
      style={{ position: "fixed", left: 12, right: 12, bottom: 12, zIndex: 80, background: "#17161A", border: "1px solid #4DA3FF", borderRadius: 14, padding: "12px 14px", boxShadow: "0 0 18px rgba(77,163,255,0.35)" }}
    >
      <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", lineHeight: 1.9 }} className="text-xs font-bold">
        {tr("برای نصب اپ روی آیفون: دکمه‌ی اشتراک‌گذاری (Share) را بزنید و «Add to Home Screen» را انتخاب کنید.")}
      </p>
      <button onClick={close} className="mt-2 rounded-lg px-3 py-1 text-xs font-black" style={{ background: "#4DA3FF", color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif" }}>
        {tr("متوجه شدم")}
      </button>
    </div>
  );
}

// ---------- صفحه‌ی یادآور روزانه (از منو) ----------
function ReminderScreen({ reminder, nextLesson, onSet, onDisable, onBack }) {
  const enabled = Boolean(reminder?.enabled);
  const [time, setTime] = useState(reminder?.time || "18:00");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => { setTime(reminder?.time || "18:00"); }, [reminder?.time]);
  const presets = ["06:00", "12:00", "18:00", "21:00"];
  const day = nextReminderDate(time).getDate() === new Date().getDate() ? tr("امروز") : tr("فردا");
  const lessonTitle = nextLesson ? nextLesson.title : tr("مرور تمرین‌های قبلی");

  const save = async () => {
    setBusy(true);
    setMsg("");
    try {
      const status = await onSet(time);
      if (status === "denied") setMsg(tr("برای فعال کردن یادآور، اجازه‌ی نوتیفیکیشن رو از تنظیمات گوشی بدید."));
      else setMsg(tr("یادآور فعال شد ✓"));
    } catch {
      setMsg(tr("ذخیره انجام نشد"));
    }
    setBusy(false);
  };
  const turnOff = async () => {
    setBusy(true);
    setMsg("");
    try { await onDisable(); setMsg(tr("یادآور خاموش شد")); } catch {}
    setBusy(false);
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6" dir={APP_DIR}>
      <button onClick={onBack} style={{ color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" }} className="text-sm mb-4 rounded-lg px-3 py-1.5 font-bold inline-block">
        {tr("› بازگشت")}
      </button>
      <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-lg font-black mb-1 flex items-center gap-2">
        <BellIcon className="w-5 h-5" style={{ color: "#F3EEE6" }} />
        {tr("یادآور روزانه")}
      </h1>
      <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", lineHeight: 1.9 }} className="text-xs mb-4">
        {tr("هر روز سر ساعت انتخابی، جلسه‌ی بعدی تمرینت یادآوری می‌شه.")}
      </p>

      <div className="rounded-2xl p-5 flex flex-col items-center mb-4" style={glowBox(enabled ? "#F3EEE6" : "#4DA3FF", true)}>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          dir="ltr"
          style={{ fontFamily: '"Bebas Neue", Oswald, sans-serif', fontSize: 56, letterSpacing: 2, color: "#F3EEE6", background: "transparent", border: "none", outline: "none", textAlign: "center", lineHeight: 1.1 }}
        />
        <span style={{ fontFamily: "Vazirmatn, sans-serif", color: enabled ? "#F3EEE6" : "#8A8790" }} className="text-xs font-bold mt-1">
          {enabled ? tr("یادآور برای ساعت {time} فعاله", { time: reminder.time }) : tr("یادآور خاموشه")}
        </span>
        <div className="flex flex-wrap justify-center gap-2 mt-4" dir="ltr">
          {presets.map((t) => (
            <button
              key={t}
              onClick={() => setTime(t)}
              className="rounded-full px-3 py-1.5 text-xs font-black"
              style={{ fontFamily: "Oswald, sans-serif", background: time === t ? "#D91E2B" : "#17161A", color: time === t ? "#fff" : "#CFC9BF", border: time === t ? "1px solid #D91E2B" : "1px solid #3a3840" }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl px-4 py-3 mb-4" style={glowBox("#D91E2B")}>
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs font-bold mb-1">{tr("متن یادآور")}</p>
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-bold">{lessonTitle}</p>
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs mt-1">{day} · {time}</p>
      </div>

      <button onClick={save} disabled={busy || !time} className="w-full py-3.5 text-base mb-2" style={{ background: "#D91E2B", color: "#fff", borderRadius: 14, fontFamily: "Vazirmatn, sans-serif", fontWeight: 900, boxShadow: "0 0 20px rgba(217,30,43,0.5)", opacity: busy ? 0.6 : 1 }}>
        {enabled ? tr("بروزرسانی یادآور") : tr("فعال کردن یادآور")}
      </button>
      {enabled && (
        <button onClick={turnOff} disabled={busy} className="w-full py-3 text-sm" style={{ background: "#26242A", color: "#F3EEE6", borderRadius: 14, border: "1px solid #3a3840", fontFamily: "Vazirmatn, sans-serif", fontWeight: 700 }}>
          {tr("خاموش کردن یادآور")}
        </button>
      )}
      {msg && <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-bold text-center mt-3">{msg}</p>}
    </div>
  );
}

// ---------- آیکن‌های منو (دو‌رنگه و هم‌سبک) ----------
function MenuTipIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.8a6.2 6.2 0 0 0-3.6 11.3c.7.5 1.1 1.3 1.1 2.1v.3h5v-.3c0-.8.4-1.6 1.1-2.1A6.2 6.2 0 0 0 12 2.8z" fill="currentColor" fillOpacity="0.2"/><path d="M9.7 19.2h4.6M10.6 21.5h2.8"/><path d="m9.9 8.6 2.1 2.3 2.1-2.3M12 10.9v5"/>
    </svg>
  );
}

function MenuCoachIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9.2" r="3.4" fill="currentColor" fillOpacity="0.2"/><path d="M5.2 20.5c.4-3.7 3-6 6.8-6s6.4 2.3 6.8 6" fill="currentColor" fillOpacity="0.2"/><path d="M7.6 9.2a4.4 4.4 0 0 1 8.8 0M16.4 9.2v1.8a1.8 1.8 0 0 1-1.8 1.8h-1.2"/>
    </svg>
  );
}

function MenuTimerIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13.4" r="7.6" fill="currentColor" fillOpacity="0.2"/><path d="M12 13.4V9.2M9.6 2.8h4.8M12 2.8v3M18.4 6.6l1.4-1.4"/><circle cx="12" cy="13.4" r="1" fill="currentColor"/>
    </svg>
  );
}

function MenuBellIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z" fill="currentColor" fillOpacity="0.2"/><path d="M10.2 21.2a2 2 0 0 0 3.6 0M12 3.4V5"/>
    </svg>
  );
}

function MenuQuestionIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9.2" fill="currentColor" fillOpacity="0.2"/><path d="M9.3 9.6a2.8 2.8 0 1 1 4.2 2.4c-1 .6-1.5 1.2-1.5 2.2"/><circle cx="12" cy="17.2" r=".9" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function MenuGloveIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17.5C5.4 16.4 4.6 14.7 4.6 12.8V9.6A6.6 6.6 0 0 1 11.2 3h1.2A6.6 6.6 0 0 1 19 9.6v3.2c0 1.9-.8 3.6-2.4 4.7z" fill="currentColor" fillOpacity="0.2"/><rect x="7" y="17.5" width="9.6" height="3.8" rx="1" fill="currentColor" fillOpacity="0.2"/><path d="M8.4 13.2c0-1.6 1-2.6 2.5-2.6h4.4M8.4 13.2c0 1.3.9 2.2 2.2 2.2h3.6"/><path d="M7 19.4h9.6"/>
    </svg>
  );
}

function MenuSupportIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 12a8.5 8.5 0 1 0-15.2 5.2L4 21l4.2-1.2A8.5 8.5 0 0 0 20.5 12z" fill="currentColor" fillOpacity="0.2"/><path d="M8.6 10.4h6.8M8.6 13.6h4.2"/>
    </svg>
  );
}

function MenuRulesIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.8 19.5 5.6v5.9c0 4.4-3 8-7.5 9.7-4.5-1.7-7.5-5.3-7.5-9.7V5.6z" fill="currentColor" fillOpacity="0.2"/><path d="m8.8 12.2 2.3 2.3 4.3-4.6"/>
    </svg>
  );
}

function MenuAboutIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9.2" fill="currentColor" fillOpacity="0.2"/><path d="M12 11v5.4"/><circle cx="12" cy="7.8" r=".95" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function MenuUsersIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9.2" cy="8.6" r="3.2" fill="currentColor" fillOpacity="0.2"/><path d="M3 19.8c.4-3.3 2.8-5.2 6.2-5.2s5.8 1.9 6.2 5.2z" fill="currentColor" fillOpacity="0.2"/><path d="M15.6 5.7a3 3 0 0 1 0 5.8M17.8 14.9c1.8.7 2.9 2.3 3.2 4.6"/>
    </svg>
  );
}

function MenuUpdateIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9.2" fill="currentColor" fillOpacity="0.2"/><path d="M12 7v8.2m0 0 3.2-3.2M12 15.2 8.8 12"/><path d="M8 17.6h8"/>
    </svg>
  );
}

function MenuInviteIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.2" y="9" width="17.6" height="11.2" rx="2" fill="currentColor" fillOpacity="0.2"/><path d="M12 9v11.2M3.2 13.2h17.6"/><path d="M12 9c-1.8 0-4.4-.6-4.4-2.6A1.9 1.9 0 0 1 9.5 4.5C11 4.5 12 7 12 9zM12 9c1.8 0 4.4-.6 4.4-2.6a1.9 1.9 0 0 0-1.9-1.9C13 4.5 12 7 12 9z"/>
    </svg>
  );
}

function MenuPhoneIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6.5" y="2.8" width="11" height="18.4" rx="2.4" fill="currentColor" fillOpacity="0.2"/><path d="M10.5 5.6h3M11 18.4h2"/><path d="M9.2 11.2l2-2 2 2M11.2 9.2v5" />
    </svg>
  );
}

function MenuGlobeIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9.2" fill="currentColor" fillOpacity="0.2"/><path d="M2.8 12h18.4M12 2.8c2.6 2.6 3.8 5.7 3.8 9.2s-1.2 6.6-3.8 9.2c-2.6-2.6-3.8-5.7-3.8-9.2S9.4 5.4 12 2.8z"/>
    </svg>
  );
}

function GlobeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
    </svg>
  );
}

function InviteIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.2 10.8 15.8 6.2M8.2 13.2l7.6 4.6" />
    </svg>
  );
}

function LockIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

// ---------- محتوای منوی کشویی ----------
const CUP_SRC = "assets/cup.jpg";

const WALLBAG_SRC = "assets/wallbag.jpg";

const SPRINGBAG_SRC = "assets/springbag.jpg";

const GEAR_ITEMS = [
  { text: tr("دستکش بوکس (تمرینی و مسابقه‌ای)"), image: GLOVES_SRC },
  { text: tr("بانداژ / دستبند بوکس"), image: WRAPS_SRC },
  { text: tr("کلاه آتل‌دار"), image: HELMET_SRC },
  { text: tr("لثه‌بند"), image: MOUTHGUARD_SRC },
  { text: tr("کیسه بوکس سنگین و سبک"), image: BAG_SRC },
  { text: tr("طناب ورزشی"), image: ROPE_SRC },
  { text: tr("کفش مخصوص بوکس"), image: BOOTS_SRC },
  { text: tr("هدبال"), image: HEADBALL_SRC },
  { text: tr("دمبل سبک"), image: DUMBBELL_SRC },
  { text: tr("کاپ بیضه‌بند بوکس"), image: CUP_SRC },
  { text: tr("گلابی دیواری"), image: WALLBAG_SRC },
  { text: tr("کیسه گلابی فنری"), image: SPRINGBAG_SRC },
];

const TIPS_ITEMS = [
  tr("هر تمرین رو توی یک جلسه انجام بده"),
  tr("هر تمرین رو چند بار ببین تا کامل متوجه نکات ریز بشی"),
  tr("مرحله به مرحله پیش برو، ترتیب آموزش‌ها اصلی‌ترین نکته‌ی آموزشه"),
  tr("می‌تونی با یه حریف هم‌قد و هم‌سن خودت تمرین‌ها رو انجام بدی"),
  tr("حتماً توی یه باشگاه بوکس توی شهر خودت ثبت‌نام کن، چون این تمرینات نیاز به نظر مربی حرفه‌ای هم دارن"),
  tr("حتماً همیشه و هر هفته، تمرینات هفته‌ی گذشته‌ی خودت رو مرور کن"),
  tr("همیشه قبل از تمرین بدنت رو گرم کن"),
  tr("گارد رو هیچ‌وقت پایین نیار"),
  tr("روی تنفس درست حین ضربه تمرکز کن"),
  tr("فوت‌ورک رو جدی بگیر، نه فقط دست‌ها"),
  tr("بعد از هر جلسه، استراحت و ریکاوری کافی داشته باش"),
  tr("حتماً ویدیوهای مسابقات بوکس آماتور و حرفه‌ای رو ببین تا ذهن پویاییت فعال بشه و بدونی داری چیکار می‌کنی"),
  tr("حتماً تمرینات هوازی و کراسفیت رو همراه با آموزش‌ها هفته‌ای دو بار انجام بده تا به یه بوکسور حرفه‌ای تبدیل بشی"),
];

// اسم فصل‌ها: همون عنوانی که ادمین گذاشته؛ اگه عوض نکرده باشه، عنوان پیش‌فرض.
// متن‌های «درباره آکادمی»، «سوالات متداول» و «قوانین» با همین اسم‌ها ساخته می‌شن، پس با تغییر عنوان، همه‌جا خودکار عوض می‌شن.
function resolveChapterTitles(chapterTitles) {
  const out = {};
  for (const k of Object.keys(DEFAULT_CHAPTER_TITLES)) out[k] = (chapterTitles && chapterTitles[k]) || DEFAULT_CHAPTER_TITLES[k];
  return out;
}

function buildAboutText(t) {
  // هر پاراگراف جدا ترجمه می‌شه؛ اسم فصل‌ها جای {basic} و ... می‌شینه
  return [
    tr(`من یزدان ناصری‌ام؛ مربی رسمی فدراسیون بوکس آماتور، کسی که سال‌ها راه بوکس حرفه‌ای رو توی چین و ارمنستان دنبال کرد تا بفهمه اون‌طرف دنیا این ورزش رو چطور جدی می‌گیرن.`, t),
    tr(`همه‌ی تلاشم این بود که یه دوره‌ی آموزشی بسازم که دیگه بهونه‌ای براش نمونه؛ نه اندام خاص می‌خواد، نه سن مشخص، نه قدرت بدنی فوق‌العاده. فقط باید مثل یه کلاس درس، قدم‌به‌قدم پیش بری.`, t),
    tr(`برای رسیدن به این نقطه، ده‌ها ساعت ویدیوی مبارزات مایک تایسون، محمد علی کلی و خیلی از بوکسورهای بزرگ تاریخ رو تحلیل کردم؛ هر مبارزه یه نکته‌ی طلایی داشت. این نکته‌ها رو بردم توی باشگاه خودم، روی شاگردایی با هر سن و شرایطی امتحان کردم، تا وقتی به نتیجه‌ای رسیدم که واقعاً جواب می‌ده.`, t),
    tr(`حالا این اپ با ۶ فصل کامل ({basic}، {advanced}، {extra}، {fight}، {partner} و {focus}) دروازه‌ی ورودت به دنیای بوکسه — از اولین قدم تا آماده شدن برای رینگ.`, t),
    tr(`آرزوی موفقیت دارم برای همه‌ی هم‌وطنام. بیا با هم شروع کنیم.`, t),
  ].join("\n\n");
}


function buildFaqItems(t) {
  return [
  {
    q: tr("آموزش‌ها چرا توی چند فصل و دو دوره هستن؟"),
    a: tr(`یادگیری بوکس مرحله‌به‌مرحله‌ست. «دوره A» شامل سه فصل اوله ({basic}، {advanced} و {extra}) که پایه‌ها و تکنیک‌ها رو می‌سازه. «دوره A+» شامل فصل‌های ۴ تا ۷ ({fight}، {fightb}، {partner} و {focus}) که تکنیک‌های تخصصی‌تر، کار با پارتنر و آماده‌سازی برای رینگ رو پوشش می‌ده. رعایت ترتیب فصل‌ها بهترین نتیجه رو می‌ده.`, t),
  },
  {
    q: tr("چه چیزهایی رایگانه و چه چیزهایی نیاز به اشتراک داره؟"),
    a: tr("پنج جلسه‌ی اول هر فصل رایگانه. تمرین «تاباتا» از بخش تمرینات تخصصی بوکس هم رایگانه و سه روز اول «مسیر پیشرفت من» هم بدون اشتراک بازه. بقیه‌ی جلسه‌ها و برنامه‌ها با اشتراک باز می‌شن: اشتراک دوره اول، فصل‌های دوره A و تمرینات تخصصی رو باز می‌کنه و اشتراک دوره دوم، فصل‌های دوره A+ رو. این دو اشتراک مستقل از همن."),
  },
  {
    q: tr("باکس «ادامه تمرین» توی صفحه‌ی اصلی چی نشون می‌ده؟"),
    a: tr("فقط به پیشرفت فصل اول وصله و جلسه‌ی بعدیِ آخرین جلسه‌ی دیده‌شده‌ی فصل اول رو نشون می‌ده. مثلاً اگه تا جلسه‌ی ۸ فصل اول رسیده باشی، حتی اگه جلسه‌ی ۵ فصل دوم رو هم ببینی، باکس همچنان جلسه‌ی ۹ فصل اول رو نشون می‌ده. با لمس باکس مستقیم به همون جلسه می‌ری."),
  },
  {
    q: tr("«مسیر پیشرفت من» چیه و چطور کار می‌کنه؟"),
    a: tr("یه برنامه‌ی ۱۰۰ روزه‌ست که هر روزش چند مرحله‌ی تمرینی داره. وقتی یه مرحله رو داخل اپ (ویدیو، برنامه‌ی تخصصی یا تمرین لیستی) کامل می‌کنی، خودکار تیک می‌خوره و وقتی همه‌ی مرحله‌های یه روز تموم بشه، همون روز سبز می‌شه. هر هفته مدال می‌گیری و آخر روز صد جام قهرمانی منتظرته. نمودار پیشرفتت هم توی صفحه‌ی خود مسیر و داخل پروفایل دیده می‌شه. سه روز اول رایگانه و ادامه‌ش با اشتراک بازه."),
  },
  {
    q: tr("چرا باید روزانه یک تمرین انجام بدم؟"),
    a: tr("چون بدن و ذهن با تکرار منظم یاد می‌گیره، نه با حجم زیاد و نامنظم. یک جلسه‌ی روزانه باعث می‌شه حرکات توی حافظه‌ی عضلانی‌ت جا بیفته و پیشرفتت پیوسته باشه."),
  },
  {
    q: tr("توی چند ماه نتیجه می‌گیرم؟"),
    a: tr("اگه منظم و طبق ترتیب جلسات پیش بری، معمولاً بین ۳ تا ۴ ماه تغییر محسوسی توی تکنیک، فرم بدنی و اعتمادبه‌نفست می‌بینی. سرعت پیشرفت به تداوم تمرینت بستگی داره."),
  },
  {
    q: tr("بخش «برنامه‌های تخصصی» (تمرینات تخصصی بوکس) چیه؟"),
    a: tr("مجموعه‌ای از برنامه‌های تمرینی کمکی مثل تاباتا، بدنسازی (با وزنه)، کراس‌فیت و آمادگی جسمانی بوکس که کنار آموزش‌ها انجام می‌دی. هر برنامه چند تمرین آماده داره که با تایمر و راهنمای حرکت اجرا می‌شه و با کامل کردنش مرحله‌ی مربوط توی «مسیر پیشرفت من» هم تیک می‌خوره. تاباتا رایگانه و بقیه با اشتراک باز می‌شن."),
  },
  {
    q: tr("«علوم ضروری بوکس» شامل چی می‌شه؟"),
    a: tr("یه مرجع کامل و مصور برای شناخت دنیای بوکس: قوانین مسابقات آماتور و حرفه‌ای، قوانین داوری و قضاوت، انواع مسابقات، مسیر پیشرفت در بوکس حرفه‌ای و موضوع‌های مهم دیگه. از میانبر صفحه‌ی اصلی یا از منو بازش کن."),
  },
  {
    q: tr("«تایمر تمرین» به چه دردی می‌خوره؟"),
    a: tr("یه تایمر راند و استراحت مخصوص بوکسه با حالت‌های آماده (حرفه‌ای، آماتور، کیسه، سایه‌زنی و تاباتا). می‌تونی تعداد راند، زمان راند و استراحت رو خودت هم تنظیم کنی و حین تمرین آزاد (مثل کیسه یا سایه‌زنی) ازش استفاده کنی؛ هشدار پایان راند با صدا و لرزش هم داره."),
  },
  {
    q: tr("چطور یادآور روزانه تنظیم کنم؟"),
    a: tr("از منو وارد «یادآور روزانه» بشو، ساعت دلخواهت رو انتخاب کن و فعالش کن. هر روز همون ساعت یه اعلان می‌گیری که جلسه‌ی بعدیت رو بهت یادآوری می‌کنه. اگه اجازه‌ی اعلان رو ندادی، از تنظیمات گوشی فعالش کن."),
  },
  {
    q: tr("توی پروفایل چه چیزهایی می‌بینم؟"),
    a: tr("اسم و عکس پروفایلت (قابل ویرایش)، تعداد جلسه‌های تمرین، تایم تمرین، سطح بوکسور، نوار پیشرفت کلی، مدال‌های فصل‌ها (مثل گارد طلایی و دستکش طلایی)، وضعیت اشتراک و روزهای باقی‌مونده، و باکس مسیر پیشرفت روزانه با نمودارش."),
  },
  {
    q: tr("«وسایل بوکس» و «کمک مربی» چیه؟"),
    a: tr("«وسایل بوکس» معرفی تجهیزات بوکس مثل دستکش، باندپیچ، کاسک، محافظ دهان، کیسه، طناب و کفشه. «کمک مربی» جواب‌های آماده برای مشکلات رایج تمرینه؛ اگه موقع تمرین به مشکلی خوردی اول اونجا رو ببین."),
  },
  {
    q: tr("اگه مشکل تو تمرین یا اپ داشتم چیکار کنم؟"),
    a: tr("برای مشکل تمرین، «کمک مربی» رو ببین. برای مشکل فنی، پرداخت یا اشتراک از گزینه‌ی «پشتیبانی» توی منو پیام بده (متن یا پیام صوتی)؛ جواب همون‌جا برات میاد."),
  },
  {
    q: tr("چطور زبان اپ رو عوض کنم؟"),
    a: tr("از منو گزینه‌ی «تغییر زبان» رو بزن و زبان دلخواهت رو انتخاب کن. زیرنویس ویدیوها هم بسته به زبان انتخابی نمایش داده می‌شه (اگه برای اون ویدیو موجود باشه)."),
  },
  {
    q: tr("آیا می‌تونم دوستام رو دعوت کنم؟"),
    a: tr("بله، از منو «دعوت از دوستان» رو بزن و لینک اپ یا نسخه‌ی وب رو برای دوستانت بفرست."),
  },
  {
    q: tr("نسخه‌ی وب و بروزرسانی اپ چطور کار می‌کنن؟"),
    a: tr("از منو می‌تونی نسخه‌ی وب آکادمی رو از مرورگر باز کنی؛ با همون حسابت وارد می‌شی و پیشرفتت همه‌جا یکیه. گزینه‌ی «بروز رسانی» هم آخرین نسخه‌ی اپ رو بهت نشون می‌ده."),
  },
  {
    q: tr("آیا می‌تونم با یه حساب روی چند گوشی وارد بشم و بدون ثبت‌نام استفاده کنم؟"),
    a: tr("هر حساب فقط روی یه گوشی فعاله و ورود روی گوشی جدید، گوشی قبلی رو از حساب خارج می‌کنه. ورود به‌عنوان مهمان هم ممکنه، ولی پیشرفت و خرید اشتراک فقط با ثبت‌نام ذخیره می‌شه. برای حفظ حقوق آموزش‌ها، اسکرین‌شات و ضبط صفحه توی صفحه‌ی ویدیوها مسدوده."),
  },
  {
    q: tr("بعد از یادگیری چیکار کنم؟"),
    a: tr("بعد از تکمیل فصل‌ها، حتماً توی یه باشگاه بوکس ثبت‌نام کن، زیر نظر یه مربی حرفه‌ای تمرین اسپارینگ (مبارزه‌ی کنترل‌شده) رو شروع کن و در صورت علاقه، برای مسابقات آماتور اقدام کن."),
  },
  {
    q: tr("همراه آموزش‌ها چه ورزش‌هایی می‌تونم انجام بدم؟"),
    a: tr("تمرینات هوازی و کراس‌فیت رو هفته‌ای دو بار همراه آموزش‌ها انجام بده؛ برنامه‌های تخصصی اپ هم برای همین طراحی شدن. این ترکیب استقامت، سرعت و قدرت لازم برای تبدیل شدن به یه بوکسور حرفه‌ای رو بهت می‌ده."),
  },
  {
    q: tr("چطور کاری کنم تمرینای قبلی یادم نره؟"),
    a: tr("طبق نکات کلیدی، هر هفته حتماً تمرینات هفته‌ی قبل رو مرور کن. آموزش پلکانیه و هر تمرین بعدی به قبلی وصله و تکرارش می‌کنه، برای همین فراموش کردنش سخت‌تره."),
  },
];
}


function buildRulesItems(t, plans) {
  const pl = mergePlans(plans);
  return [
  {
    q: tr("هر ایمیل فقط روی یک دستگاه فعاله"),
    a: tr("هر حساب (ایمیل) فقط می‌تونه همزمان روی یک گوشی فعال باشه. اگه با همون ایمیل روی گوشی دیگه‌ای وارد بشی، اون دستگاه جدید جایگزین قبلی می‌شه و گوشی قبلی خودکار از حساب خارج می‌شه."),
  },
  {
    q: tr("کد ورود چقدر اعتبار داره؟"),
    a: tr("کد ۴ رقمی که به ایمیلت ارسال می‌شه فقط تا ۵ دقیقه معتبره و حداکثر ۵ بار می‌تونی واردش کنی. بعد از اون باید یه کد جدید درخواست بدی."),
  },
  {
    q: tr("اشتراک VIP چطور کار می‌کنه؟"),
    a: tr(`با خرید اشتراک دوره اول ({silverPrice} تومان، {silverMonths} ماهه) یا دوره دوم ({goldPrice} تومان، {goldMonths} ماهه)، به فصل‌های مربوط به همون اشتراک از تاریخ خرید دسترسی پیدا می‌کنی. دوره اول فصل‌های {basic}، {advanced} و {extra} رو باز می‌کنه و دوره دوم فصل‌های {fight}، {partner} و {focus} رو؛ این دو تا مستقل از همن، پس برای دسترسی کامل باید هر دو رو جدا تهیه کنی. بعد از پایان مدت اشتراک، برای ادامه‌ی دسترسی باید تمدید کنی.`, {
      ...t,
      silverPrice: formatPrice(pl.silver.price),
      goldPrice: formatPrice(pl.gold.price),
      silverMonths: pl.silver.months.toLocaleString(NUM_LOCALE),
      goldMonths: pl.gold.months.toLocaleString(NUM_LOCALE),
    }),
  },
  {
    q: tr("آیا وجه پرداختی قابل بازگشته؟"),
    a: tr("چون اشتراک دسترسی به محتوای دیجیتاله، وجه پرداخت‌شده برای بازه‌ای که فعال بوده قابل بازگشت نیست. اگه در پرداخت مشکلی (مثل کسر مبلغ بدون فعال شدن اشتراک) پیش اومد، از طریق پشتیبانی اطلاع بده تا بررسی بشه."),
  },
  {
    q: tr("اطلاعاتم کجا نگهداری می‌شه؟"),
    a: tr("فقط ایمیل، وضعیت اشتراک، و دستگاه فعالت ذخیره می‌شه. اطلاعات پرداخت و کارت بانکی هیچ‌وقت روی سرور ما ذخیره نمی‌شه؛ پرداخت‌ها مستقیم و امن توسط درگاه بانکی (زرین‌پال) پردازش می‌شن."),
  },
  {
    q: tr("آیا می‌تونم ویدیوها رو دانلود یا بازنشر کنم؟"),
    a: tr("نه. محتوای آموزشی فقط برای استفاده‌ی شخصی داخل همین اپلیکیشنه. دانلود، ضبط، یا بازنشر ویدیوها در جای دیگه (مثل کانال‌ها و شبکه‌های اجتماعی) مجاز نیست."),
  },
  {
    q: tr("آیا این قوانین ممکنه تغییر کنه؟"),
    a: tr("بله، ممکنه با اضافه شدن امکانات جدید به اپ، این قوانین به‌روزرسانی بشن. هر تغییر مهم از همین بخش قابل مشاهده خواهد بود."),
  },
];
}



const COACH_ITEMS = [
  {
    q: tr("من نمی‌تونم توی گارد درست وایسم!"),
    a: tr("جلوی آینه تمرین کن: پاها به اندازه‌ی عرض شونه باز، وزن بدن روی هر دو پا مساوی، و دست‌ها بالا کنار چونه. دوباره جلسه‌ی «ایستادن در گارد پایه» رو ببین و حرکت رو آهسته تکرار کن."),
  },
  {
    q: tr("من نمی‌تونم توی گارد درست به جهت‌ها جابجا بشم!"),
    a: tr("قدم‌ها رو کوچیک بردار و هیچ‌وقت پاهات رو از هم رد نکن. اول بدون دست‌کش فقط روی فوت‌ورک تمرکز کن، بعد گارد رو هم اضافه کن."),
  },
  {
    q: tr("من نمی‌تونم قشنگ شونه‌هامو بچرخونم!"),
    a: tr("چرخش شونه رو اول خیلی آروم و بدون مشت زدن تمرین کن. حواست باشه چرخش از کمر شروع بشه، نه فقط از دست."),
  },
  {
    q: tr("من توی حرکت با چرخش شانه مشکل دارم!"),
    a: tr("فوت‌ورک و چرخش شونه رو جدا جدا تمرین کن تا هرکدوم روون بشه، بعد دوتاشون رو با سرعت کم ترکیب کن."),
  },
  {
    q: tr("من حرکات قبلی رو فراموش کردم!"),
    a: tr("طبق نکات کلیدی، هر هفته تمرینای هفته‌ی قبل رو مرور کن. برگرد به همون جلسه توی برنامه و چندبار دیگه ببینش."),
  },
  {
    q: tr("من نمی‌تونم سرم رو با چرخش ثابت نگه دارم!"),
    a: tr("جلوی آینه یه نقطه رو انتخاب کن و حین چرخش شونه، نگاهت رو ثابت روی همون نقطه نگه دار تا سرت کمتر تکون بخوره."),
  },
  {
    q: tr("من گاردم رو توی حرکات خراب می‌کنم!"),
    a: tr("سرعت حرکت رو کم کن. بعد از هر ضربه یا چرخش، آگاهانه به گارد اولیه برگرد؛ این برگشت باید مثل خود ضربه تمرین بشه."),
  },
  {
    q: tr("من نمی‌تونم پاهامو با شانه بچرخونم!"),
    a: tr("هماهنگی پا و شونه نیاز به تمرین جدا داره. اول فقط چرخش پا، بعد فقط چرخش شونه، در آخر هر دو رو با سرعت خیلی کم با هم انجام بده."),
  },
  {
    q: tr("وقتی جابجا می‌شم باید چقد پام بچرخه!"),
    a: tr("چرخش پا معمولاً کوچیک و کنترل‌شده‌ست، نه زیاد. دوباره ویدیوی همون جلسه رو ببین و زاویه‌ی چرخش پای مربی رو دقیق نگاه کن."),
  },
  {
    q: tr("من نمی‌تونم دستامو توی گارد مستقر کنم!"),
    a: tr("دست‌ها باید نزدیک صورت و چونه باشن و آرنج‌ها چسبیده به بدن. چند دقیقه فقط نگه‌داشتن گارد جلوی آینه رو تمرین کن تا این حالت عادی بشه."),
  },
  {
    q: tr("من ضربه‌هارو درست اجرا نمی‌کنم!"),
    a: tr("سرعت رو فراموش کن، اول فرم درست بساز. جلوی آینه هر ضربه رو خیلی آروم و کامل انجام بده تا مسیر درست دست و چرخش بدن جا بیفته، بعد کم‌کم سرعت بگیر."),
  },
  {
    q: tr("من نمی‌تونم ضربه‌هارو درست به هم بچسبونم!"),
    a: tr("اول هر ضربه رو تنها و تک‌تک تمرین کن تا روون بشه. بعد فقط دو ضربه رو با فاصله‌ی زمانی کم به‌هم وصل کن، وقتی این جا افتاد ترکیب‌های بزرگ‌تر رو اضافه کن."),
  },
  {
    q: tr("من نمی‌تونم درست با جابجایی ضربه بزنم!"),
    a: tr("فوت‌ورک و ضربه رو جدا جدا تمرین کن. اول فقط جابجا شو بدون مشت زدن، بعد فقط ضربه بزن بدون جابجایی، در آخر با سرعت خیلی کم هر دو رو با هم انجام بده."),
  },
  {
    q: tr("من توی هوک مشکل دارم!"),
    a: tr("قدرت هوک از چرخش کمر و لگن میاد، نه فقط دست. آرنجت رو زاویه‌ی ثابت (تقریباً ۹۰ درجه) نگه دار و بذار چرخش بدن دستت رو با خودش بیاره."),
  },
  {
    q: tr("من توی آپرکات مشکل دارم!"),
    a: tr("کمی زانو خم کن و ضربه رو از پا و لگن به سمت بالا هل بده، نه این‌که فقط دستت رو بالا بیاری. فاصله‌ی کوتاه ولی فشار زیاد، رمز آپرکات خوبه."),
  },
  {
    q: tr("من نمی‌تونم درست شوک بدم!"),
    a: tr("شوک یعنی انفجار کوتاه، نه ضربه‌ی طولانی. با طناب قدرت تمرین کن و روی این تمرکز کن که کل بدنت (نه فقط دست) یهو منقبض بشه و سریع برگرده."),
  },
  {
    q: tr("من نمی‌تونم ترکیب‌زنی ذهنی انجام بدم!"),
    a: tr("اول با سایه‌زنی شروع کن: یه حریف فرضی رو تصور کن و فقط با دو ضربه‌ی ساده باهاش تمرین کن. کم‌کم تعداد ضربات ترکیب رو زیاد کن، عجله نکن."),
  },
  {
    q: tr("من نمی‌تونم مشتامو قدرتی بزنم!"),
    a: tr("قدرت مشت از چرخش پا و لگن میاد، نه فقط عضله‌ی بازو. آروم و با تمرکز روی چرخش کامل بدن تمرین کن؛ قدرت واقعی بعد از تکرار زیاد خودش میاد."),
  },
  {
    q: tr("من توی ضربات زیگزاگی مشکل دارم!"),
    a: tr("اول فقط حرکت بالا-پایین بدن رو بدون مشت زدن تمرین کن تا هماهنگ بشه، بعد ضربه رو دقیقاً توی لحظه‌ی درست این حرکت اضافه کن."),
  },
  {
    q: tr("من نمی‌تونم ترکیب زیگزاگی بزنم!"),
    a: tr("هر ضربه‌ی زیگزاگی رو جدا و آروم تمرین کن تا دقیق بشه، بعد فقط دو ضربه رو به‌هم وصل کن. سرعت رو فقط وقتی زیاد کن که دقتت از دست نره."),
  },
];

// «کمک مربی» سه باکس داره (به ترتیب فصل‌های اول تا سوم). هر گزینه‌ی بالا به فصل مربوط به خودش میره:
// پایه گارد: گارد، دست‌ها، چرخش شونه، ثبات سر، مرور حرکات | ضربات: همه‌ی مشکلات ضربه‌زنی | جابجایی: جابجایی در گارد، پا و شونه
const COACH_CHAPTER_KEYS = ["basic", "advanced", "extra"];
const COACH_DEFAULT_INDEXES = {
  basic: [0, 2, 4, 5, 9],
  advanced: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  extra: [1, 3, 6, 7, 8],
};
const COACH_BY_CHAPTER = Object.fromEntries(
  COACH_CHAPTER_KEYS.map((k) => [k, COACH_DEFAULT_INDEXES[k].map((i) => COACH_ITEMS[i])])
);

// صفحه‌ی اول «کمک مربی»: سه باکس فصل؛ با زدن هر کدوم، گزینه‌های همون فصل باز می‌شه
function CoachHub({ chapterNames, counts, legacyCount, onOpen, onBack }) {
  const boxes = COACH_CHAPTER_KEYS.map((k, i) => ({ key: k, n: i + 1, title: chapterNames[k], count: counts[k] }));
  if (legacyCount > 0) boxes.push({ key: "legacy", n: boxes.length + 1, title: tr("سایر موارد"), count: legacyCount });
  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6" dir={APP_DIR}>
      <button
        onClick={onBack}
        style={{ color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" }}
        className="text-sm mb-4 rounded-lg px-3 py-1.5 font-bold inline-block"
      >
        {tr("› بازگشت")}</button>
      <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-lg font-black mb-1">
        {tr("مربی کمکی")}
      </h1>
      <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs leading-6 mb-4">
        {tr("فصلِ مربوط به مشکلت رو انتخاب کن")}
      </p>
      <div className="flex flex-col gap-3">
        {boxes.map((b) => (
          <button
            key={b.key}
            data-testid={`coach-box-${b.key}`}
            onClick={() => onOpen(b.key)}
            className="rounded-xl p-4 transition-all"
            style={{ background: "#17161A", border: "1px solid #4DA3FF", boxShadow: "0 0 12px rgba(77,163,255,0.45)", textAlign: "start" }}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: "34px", height: "34px", background: "#44292E" }}>
                <span style={{ fontFamily: "Oswald, sans-serif", color: "#D91E2B" }} className="text-sm font-bold">{b.n.toLocaleString(NUM_LOCALE)}</span>
              </div>
              <div className="flex-1">
                <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-black block">{b.title}</span>
                <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs block mt-1">
                  {tr("{n} مورد", { n: b.count.toLocaleString(NUM_LOCALE) })}
                </span>
              </div>
              <span style={{ color: "#F3EEE6" }} className="text-sm shrink-0">{APP_DIR === "rtl" ? "‹" : "›"}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- Screen: آکاردئون قابل استفاده مجدد (سوالات متداول / مربی کمکی) ----------
// ---------- ویرایش متن صفحه‌های اطلاعاتی (فقط ادمین) ----------
// نکات کلیدی / سوالات متداول / مربی کمکی / قوانین و مقررات / درباره آکادمی.
// ادمین می‌تونه متن هر باکس (عنوان و توضیح) رو عوض کنه، باکس جدید اضافه یا حذف کنه، یا به متن پیش‌فرض برگرده.
// این بخش عمداً بدون JSX نوشته شده تا کد app.jsx و app.js دقیقاً یکی باشه.
const CONTENT_FONT = { fontFamily: "Vazirmatn, sans-serif" };

async function apiFetchContent() {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-content");
    try {
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }
  try {
    const res = await apiFetch(`${API_BASE_URL}/settings/content`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return {};
    return data.content || {};
  } catch {
    return {};
  }
}

async function apiSaveContent(token, section, value) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-content");
    let all = {};
    try {
      all = stored ? JSON.parse(stored) : {};
    } catch {
      all = {};
    }
    all[section] = value;
    await AppStorage.set("demo-content", JSON.stringify(all));
    return value;
  }
  const res = await apiFetch(`${API_BASE_URL}/settings/content/${section}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(typeof value === "string" ? { text: value } : { items: value }),
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("ذخیره‌ی متن با خطا مواجه شد"));
  return data.value;
}

async function apiResetContent(token, section) {
  if (DEMO_MODE) {
    const stored = await AppStorage.get("demo-content");
    try {
      const all = stored ? JSON.parse(stored) : {};
      delete all[section];
      await AppStorage.set("demo-content", JSON.stringify(all));
    } catch {
      // نادیده گرفته می‌شه
    }
    return;
  }
  const res = await apiFetch(`${API_BASE_URL}/settings/content/${section}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("بازگشت به متن پیش‌فرض با خطا مواجه شد"));
}

// kind: "qa" (عنوان + توضیح) | "text" (فقط یک متن، مثل نکات کلیدی) | "paragraph" (یک متن بلند، مثل درباره آکادمی)
function ContentEditor({ kind, title, initial, onSave, onReset, onCancel }) {
  const h = React.createElement;
  const isQA = kind === "qa";
  const isPara = kind === "paragraph";
  const [draft, setDraft] = useState(() =>
    isPara
      ? String(initial || "")
      : (initial || []).map((it) => (isQA ? { q: (it && it.q) || "", a: (it && it.a) || "" } : { text: typeof it === "string" ? it : (it && it.text) || "" }))
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [confirmDel, setConfirmDel] = useState(-1);
  const [confirmReset, setConfirmReset] = useState(false);

  const setField = (idx, field, value) => setDraft((d) => d.map((it, i) => (i === idx ? { ...it, [field]: value } : it)));

  const save = async () => {
    setError("");
    let value;
    if (isPara) {
      value = String(draft).trim();
      if (!value) {
        setError(tr("متن نمی‌تونه خالی باشه"));
        return;
      }
    } else {
      const cleaned = [];
      for (const it of draft) {
        if (isQA) {
          const q = it.q.trim();
          const a = it.a.trim();
          if (!q && !a) continue;
          if (!q || !a) {
            setError(tr("برای هر باکس هم عنوان و هم توضیح لازمه"));
            return;
          }
          cleaned.push({ q, a });
        } else {
          const t = it.text.trim();
          if (t) cleaned.push(t);
        }
      }
      value = cleaned;
    }
    setBusy(true);
    try {
      await onSave(value);
      onCancel();
    } catch (e) {
      setError((e && e.message) || tr("ذخیره نشد؛ دوباره امتحان کن"));
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    setBusy(true);
    setError("");
    try {
      await onReset();
      onCancel();
    } catch (e) {
      setError((e && e.message) || tr("انجام نشد؛ دوباره امتحان کن"));
      setConfirmReset(false);
    } finally {
      setBusy(false);
    }
  };

  const area = (value, onChange, rows, placeholder, testId) =>
    h("textarea", {
      value,
      rows,
      placeholder,
      dir: APP_DIR,
      "data-testid": testId,
      onChange: (e) => onChange(e.target.value),
      className: "w-full rounded-lg p-2 text-sm leading-7 outline-none",
      style: { ...CONTENT_FONT, color: "#F3EEE6", background: "#0B0B0D", border: "1px solid rgba(77,163,255,0.5)", resize: "vertical" },
    });

  const smallBtn = (label, onClick, style, testId) =>
    h("button", { onClick, disabled: busy, "data-testid": testId, className: "rounded-lg px-3 py-1.5 text-xs font-bold", style: { ...CONTENT_FONT, ...style } }, label);

  const topBar = h(
    "div",
    { className: "flex items-center justify-between gap-2 mb-4" },
    smallBtn(tr("› انصراف"), onCancel, { color: "#0B0B0D", background: "#DAD6CE" }, "content-cancel"),
    smallBtn(busy ? tr("در حال ذخیره…") : tr("ذخیره"), save, { color: "#0B0B0D", background: "#4DA3FF" }, "content-save")
  );

  const cards = isPara
    ? [h("div", { key: "p" }, area(draft, setDraft, 18, tr("متن..."), "content-paragraph"))]
    : draft.map((it, i) =>
        h(
          "div",
          { key: i, className: "rounded-xl p-3 flex flex-col gap-2", style: { background: "#17161A", border: "1px solid #4DA3FF" } },
          h(
            "div",
            { className: "flex items-center justify-between" },
            h("span", { style: { fontFamily: "Oswald, sans-serif", color: "#D91E2B" }, className: "text-xs font-bold" }, i + 1),
            h(
              "button",
              {
                onClick: () => {
                  if (confirmDel === i) {
                    setDraft((d) => d.filter((_, k) => k !== i));
                    setConfirmDel(-1);
                  } else {
                    setConfirmDel(i);
                  }
                },
                disabled: busy,
                className: "rounded-lg px-2 py-1 text-[11px] font-bold",
                style: { ...CONTENT_FONT, color: "#fff", background: confirmDel === i ? "#D91E2B" : "#3a393e" },
              },
              confirmDel === i ? tr("تایید حذف") : tr("حذف")
            )
          ),
          isQA
            ? [
                h("div", { key: "q" }, area(it.q, (v) => setField(i, "q", v), 2, tr("عنوان (سوال)"), "content-q-" + i)),
                h("div", { key: "a" }, area(it.a, (v) => setField(i, "a", v), 5, tr("توضیح (جواب)"), "content-a-" + i)),
              ]
            : h("div", null, area(it.text, (v) => setField(i, "text", v), 3, tr("متن"), "content-text-" + i))
        )
      );

  return h(
    "div",
    { className: "flex-1 overflow-y-auto px-5 pt-3 pb-10", dir: APP_DIR, "data-testid": "content-editor" },
    topBar,
    h("h1", { style: { ...CONTENT_FONT, color: "#F3EEE6" }, className: "text-lg font-black mb-1" }, tr("ویرایش: ") + title),
    h("p", { style: { ...CONTENT_FONT, color: "#F3EEE6" }, className: "text-xs mb-4 leading-6" }, tr("تغییرها بعد از «ذخیره» برای همه‌ی کاربرها اعمال می‌شه.")),
    error && h("p", { style: { ...CONTENT_FONT, color: "#ff6b6b" }, className: "text-xs mb-3" }, error),
    h("div", { className: "flex flex-col gap-3" }, cards),
    !isPara &&
      h(
        "button",
        {
          onClick: () => setDraft((d) => [...d, isQA ? { q: "", a: "" } : { text: "" }]),
          disabled: busy,
          "data-testid": "content-add",
          className: "w-full rounded-xl py-3 mt-3 text-sm font-bold",
          style: { ...CONTENT_FONT, color: "#4DA3FF", background: "#2D3540", border: "1px dashed #4DA3FF" },
        },
        tr("+ افزودن باکس جدید")
      ),
    h(
      "button",
      {
        onClick: reset,
        disabled: busy,
        "data-testid": "content-reset",
        className: "w-full rounded-xl py-2 mt-6 text-xs font-bold",
        style: { ...CONTENT_FONT, color: confirmReset ? "#fff" : "#8A8790", background: confirmReset ? "#D91E2B" : "transparent", border: "1px solid #3a393e" },
      },
      confirmReset ? tr("مطمئنی؟ دوباره بزن تا همه‌ی ویرایش‌ها پاک بشه") : tr("بازگشت به متن پیش‌فرض اپ")
    )
  );
}

// صفحه‌ی اطلاعاتی + دکمه‌ی «ویرایش» (فقط برای ادمین)
function EditableContent({ kind, title, items, paragraph, isAdmin, onSave, onReset, onBack }) {
  const h = React.createElement;
  const [editing, setEditing] = useState(false);
  if (editing) {
    return h(ContentEditor, {
      kind,
      title,
      initial: kind === "paragraph" ? paragraph : items,
      onSave,
      onReset,
      onCancel: () => setEditing(false),
    });
  }
  const editBtn = isAdmin
    ? h(
        "button",
        {
          onClick: () => setEditing(true),
          "data-testid": "content-edit",
          className: "mb-4 rounded-lg px-3 py-1.5 text-xs font-bold",
          style: { ...CONTENT_FONT, color: "#0B0B0D", background: "#4DA3FF" },
        },
        tr("✎ ویرایش و افزودن (ادمین)")
      )
    : null;
  if (kind === "qa") return h(AccordionScreen, { title, items, onBack, headerExtra: editBtn });
  return h(InfoScreen, { title, items, paragraph, onBack, headerExtra: editBtn });
}

function AccordionScreen({ title, items, onBack, headerExtra }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6" dir={APP_DIR}>
      <button
        onClick={onBack}
        style={{
          color: "#0B0B0D",
          fontFamily: "Vazirmatn, sans-serif",
          background: "#DAD6CE",
        }}
        className="text-sm mb-4 rounded-lg px-3 py-1.5 font-bold inline-block"
      >
        {tr("› بازگشت")}</button>

      <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-lg font-black mb-4">
        {title}
      </h1>
      {headerExtra}

      <div className="flex flex-col gap-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <button
              key={i}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="text-right rounded-xl p-3 transition-all"
              style={{
                background: "#17161A",
                border: "1px solid #4DA3FF",
                boxShadow: "0 0 12px rgba(77,163,255,0.45)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="rounded-full flex items-center justify-center shrink-0"
                  style={{ width: "26px", height: "26px", background: "#44292E" }}
                >
                  <span style={{ fontFamily: "Oswald, sans-serif", color: "#D91E2B" }} className="text-xs font-bold">
                    {i + 1}
                  </span>
                </div>
                <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-bold flex-1">
                  {item.q}
                </span>
                <span style={{ color: "#F3EEE6" }} className="text-xs shrink-0">
                  {isOpen ? "▲" : "▼"}
                </span>
              </div>

              {isOpen && (
                <p
                  style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }}
                  className="text-xs leading-7 mt-3 pt-3"
                >
                  <span style={{ display: "block", borderTop: "1px solid rgba(77,163,255,0.25)", marginBottom: "10px" }} />
                  {item.a}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Screen: Admin - User list ----------
// ---------- Screen: پشتیبانی - چت (هم برای کاربر عادی، هم برای ادمین وقتی یه گفتگوی خاص رو باز می‌کنه) ----------
// ---------- ضبط پیام صوتی: روی گوشی از پلاگین بومی Capacitor استفاده می‌کنه، توی مرورگر/دمو از MediaRecorder وب ----------
// صفحه‌ی تنظیمات خود اپ رو توی گوشی باز می‌کنه (برای وقتی که کاربر باید یه دسترسی رو دستی فعال کنه)
function openAppSettings() {
  const NS = window.Capacitor?.Plugins?.NativeSettings;
  if (NS?.open) {
    NS.open({ optionAndroid: "application_details", optionIOS: "App" }).catch(() => {});
  }
}

// وقتی که پرتاب می‌شه یعنی کاربر باید خودش دستی از تنظیمات گوشی دسترسی رو فعال کنه
class PermissionDeniedError extends Error {}

async function startVoiceRecording() {
  const VR = window.Capacitor?.Plugins?.VoiceRecorder;
  if (VR?.startRecording) {
    const has = await VR.hasAudioRecordingPermission().catch(() => ({ value: false }));
    if (!has?.value) {
      const granted = await VR.requestAudioRecordingPermission().catch(() => ({ value: false }));
      if (!granted?.value) {
        throw new PermissionDeniedError(tr("اجازه‌ی دسترسی به میکروفون داده نشد."));
      }
    }
    await VR.startRecording();
    return { mode: "native" };
  }
  // پلاگین بومی ضبط صدا روی این نسخه از اپ شناسایی نشد؛ فالبک وب رو امتحان می‌کنیم
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.start();
    return { mode: "web", recorder, chunks, stream };
  } catch {
    // برای عیب‌یابی: لیست پلاگین‌های Capacitor که واقعاً روی این نسخه از اپ نصب و شناسایی شدن
    const available = Object.keys(window.Capacitor?.Plugins || {}).join(tr("، ")) || tr("هیچ‌کدام");
    throw new Error(tr("قابلیت ضبط صدا روی این نسخه از اپ فعال نیست. (پلاگین‌های شناسایی‌شده: {available})", { available }));
  }
}

async function stopVoiceRecording(session) {
  if (session.mode === "native") {
    const VR = window.Capacitor?.Plugins?.VoiceRecorder;
    const result = await VR.stopRecording();
    const mimeType = result?.value?.mimeType || "audio/aac";
    const base64 = result?.value?.recordDataBase64 || "";
    if (!base64) throw new Error(tr("ضبط صدا با خطا مواجه شد"));
    return `data:${mimeType};base64,${base64}`;
  }
  return new Promise((resolve, reject) => {
    session.recorder.onstop = () => {
      const blob = new Blob(session.chunks, { type: session.recorder.mimeType || "audio/webm" });
      session.stream.getTracks().forEach((t) => t.stop());
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject(new Error(tr("ضبط صدا با خطا مواجه شد")));
      reader.readAsDataURL(blob);
    };
    session.recorder.stop();
  });
}

function cancelVoiceRecording(session) {
  if (!session) return;
  if (session.mode === "native") {
    window.Capacitor?.Plugins?.VoiceRecorder?.stopRecording?.().catch(() => {});
  } else {
    try {
      session.recorder.stop();
    } catch {
      // ضبط از قبل متوقف شده - مشکلی نیست
    }
    session.stream.getTracks().forEach((t) => t.stop());
  }
}

function MicIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8" />
    </svg>
  );
}

function StopSquareIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

// حداکثر مدت مجاز یه پیام صوتی (ثانیه) - بعد از این مدت خودکار قطع و ارسال می‌شه
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
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    // اگه کاربر وسط ضبط از صفحه خارج بشه، ضبط رو کامل قطع می‌کنیم تا میکروفون آزاد بمونه
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
    } catch {
      // خطای شبکه - متن توی فیلد می‌مونه تا دوباره امتحان کنه
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
      }, 1000);
    } catch (err) {
      setVoiceError(err.message || tr("دسترسی به میکروفون امکان‌پذیر نشد"));
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
      setVoiceError(err.message || tr("ارسال پیام صوتی با خطا مواجه شد"));
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

  // وضعیت گفتگو فقط برای خودِ کاربر نشون داده می‌شه: بر اساس آخرین پیام مشخص می‌شه
  // که پیامش هنوز در حال بررسیه (زرد) یا پشتیبانی جواب داده (سبز)
  const lastMessage = messages.length ? messages[messages.length - 1] : null;
  const showStatusBanner = myRole === "user" && Boolean(lastMessage);
  const isAnswered = lastMessage?.sender === "admin" || lastMessage?.sender === "bot";

  return (
    <div className="flex-1 flex flex-col min-h-0" dir={APP_DIR}>
      <div className="px-5 pt-3 pb-2 shrink-0">
        <button
          onClick={onBack}
          style={{ color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" }}
          className="text-sm mb-3 rounded-lg px-3 py-1.5 font-bold inline-block"
        >
          {tr("› بازگشت")}</button>
        <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-lg font-black">
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6", direction: "ltr" }} className="text-xs mt-1">
            {subtitle}
          </p>
        )}
        {showStatusBanner && (
          <div
            className="mt-3 rounded-xl px-3.5 py-2.5 text-center"
            style={{
              background: isAnswered ? "rgba(28,111,209,0.15)" : "rgba(243,238,230,0.15)",
              border: `1px solid ${isAnswered ? "#1C6FD1" : "#F3EEE6"}`,
            }}
          >
            <span
              style={{ fontFamily: "Vazirmatn, sans-serif", color: isAnswered ? "#1C6FD1" : "#F3EEE6" }}
              className="text-xs font-bold"
            >
              {isAnswered ? tr("✓ پاسخ پشتیبان") : tr("⏳ پیام شما در حال بررسیه")}
            </span>
          </div>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-2">
        {messages.length === 0 && (
          <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }} className="text-xs text-center mt-10">
            {tr("هنوز پیامی رد و بدل نشده. اولین پیام رو بفرست.")}</p>
        )}
        {messages.map((m, i) => {
          const isMine = m.sender === myRole;
          const showSenderLabel = myRole === "user" && !isMine && m.sender === "bot";
          return (
            <div key={i} className={`flex flex-col ${isMine ? "items-start" : "items-end"}`}>
              {showSenderLabel && (
                <span
                  style={{ fontFamily: "Vazirmatn, sans-serif", color: "#4DA3FF" }}
                  className="text-[10px] font-bold mb-1 px-1"
                >
                  {tr("🤖 پاسخ خودکار")}</span>
              )}
              <div
                className="rounded-2xl px-3.5 py-2.5"
                style={{
                  maxWidth: "78%",
                  background: isMine ? "#D91E2B" : "#17161A",
                  border: isMine ? "none" : "1px solid #2a292e",
                }}
              >
                {m.type === "voice" ? (
                  <audio controls src={m.audioData} style={{ maxWidth: "220px", height: "34px" }} />
                ) : (
                  <p
                    style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }}
                    className="text-sm leading-6 whitespace-pre-wrap"
                  >
                    {m.message}
                  </p>
                )}
              </div>
              {m.createdAt && (
                <span
                  style={{ fontFamily: "Vazirmatn, sans-serif", color: "#55535a", direction: "ltr" }}
                  className="text-[10px] mt-1 px-1"
                >
                  {formatMessageTime(m.createdAt)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {voiceError && (
        <div className="px-4 pb-2 shrink-0 text-center">
          <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }} className="text-xs mb-1.5">
            {voiceError}
          </p>
          {voicePermissionDenied && (
            <button
              onClick={openAppSettings}
              style={{ fontFamily: "Vazirmatn, sans-serif", background: "#17161A", color: "#4DA3FF", border: "1px solid #4DA3FF" }}
              className="rounded-lg px-3 py-1.5 text-xs font-bold"
            >
              {tr("برو به تنظیمات و مجوز میکروفون رو فعال کن")}</button>
          )}
        </div>
      )}
      {isRecording ? (
        <div className="px-4 py-3 flex items-center gap-2 shrink-0" style={{ borderTop: "1px solid #2a292e" }}>
          <button
            onClick={handleCancelRecording}
            style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", background: "#17161A", border: "1px solid #2a292e" }}
            className="rounded-xl px-3 py-2.5 text-sm shrink-0"
          >
            {tr("لغو")}</button>
          <div
            className="flex-1 flex items-center gap-2 rounded-xl px-3.5 py-2.5"
            style={{ background: "#17161A", border: "1px solid #D91E2B" }}
          >
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: "#D91E2B" }} />
            <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", direction: "ltr" }} className="text-sm">
              {String(Math.floor(recordSeconds / 60)).padStart(2, "0")}:{String(recordSeconds % 60).padStart(2, "0")}
            </span>
          </div>
          <button
            onClick={handleStopRecording}
            style={{ fontFamily: "Vazirmatn, sans-serif", background: "#D91E2B", color: "#F3EEE6" }}
            className="rounded-xl p-2.5 shrink-0"
          >
            <StopSquareIcon className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="px-4 py-3 flex items-center gap-2 shrink-0" style={{ borderTop: "1px solid #2a292e" }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder={myRole === "admin" ? tr("پیامت رو بنویس یا 🎤 رو بزن...") : tr("پیامت رو بنویس...")}
            style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", background: "#17161A", border: "1px solid #2a292e" }}
            className="flex-1 rounded-xl px-3.5 py-2.5 text-sm outline-none"
          />
          {text.trim() || myRole !== "admin" ? (
            <button
              onClick={handleSend}
              disabled={sending}
              style={{
                fontFamily: "Vazirmatn, sans-serif",
                background: !sending ? "#D91E2B" : "#3a2226",
                color: !sending ? "#F3EEE6" : "#7a5a5d",
              }}
              className="rounded-xl px-4 py-2.5 text-sm font-bold shrink-0"
            >
              {tr("ارسال")}</button>
          ) : (
            <button
              onClick={handleStartRecording}
              style={{ fontFamily: "Vazirmatn, sans-serif", background: "#D91E2B", color: "#F3EEE6" }}
              className="rounded-xl p-2.5 shrink-0"
            >
              <MicIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
      {myRole === "user" && (
        <p
          style={{ fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }}
          className="text-[11px] text-center leading-5 px-6 pb-3 shrink-0"
        >
          {tr("پاسخ‌گویی تیم پشتیبانی ناصری معمولاً در کوتاه‌ترین زمان ممکن انجام می‌شه و حداکثر ظرف ۷۲ ساعت کاری پاسخ پیام شما داده خواهد شد.")}</p>
      )}
    </div>
  );
}

// ---------- Screen: پشتیبانی - لیست گفتگوها (فقط ادمین) ----------
function SupportInboxScreen({ threads, loading, error, onOpenThread, onBack }) {
  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6" dir={APP_DIR}>
      <button
        onClick={onBack}
        style={{ color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" }}
        className="text-sm mb-4 rounded-lg px-3 py-1.5 font-bold inline-block"
      >
        {tr("› بازگشت")}</button>
      <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-lg font-black mb-4">
        {tr("پشتیبانی")}</h1>

      {loading && (
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm text-center mt-10">
          {tr("در حال بارگذاری…")}</p>
      )}
      {error && (
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }} className="text-sm text-center mt-10">
          {error}
        </p>
      )}
      {!loading && !error && threads.length === 0 && (
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }} className="text-sm text-center mt-10">
          {tr("هنوز هیچ تیکتی ثبت نشده.")}</p>
      )}

      <div className="flex flex-col gap-2">
        {threads.map((t) => (
          <button
            key={t.identifier}
            onClick={() => onOpenThread(t.identifier)}
            className="text-right rounded-xl p-3"
            style={{ background: "#17161A", border: "1px solid #2a292e" }}
          >
            <div className="flex items-center justify-between mb-1">
              <span
                style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6", direction: "ltr" }}
                className="text-sm font-bold"
              >
                {t.identifier}
              </span>
              {t.lastSender === "user" && (
                <span
                  style={{ background: "#D91E2B" }}
                  className="w-2 h-2 rounded-full shrink-0"
                />
              )}
            </div>
            <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs truncate">
              {t.lastSender === "admin" ? tr("شما: ") : ""}
              {t.lastMessage}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function AdminUsersScreen({ authToken, onBack }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cancelled = false;
    apiFetchUsers(authToken)
      .then(({ users, total }) => {
        if (cancelled) return;
        setUsers(users);
        setTotal(total);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || tr("دریافت لیست کاربران با خطا مواجه شد"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [authToken]);

  const planLabel = { none: tr("بدون اشتراک"), silver: tr("دوره اول"), gold: tr("دوره دوم") };

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6" dir={APP_DIR}>
      <button
        onClick={onBack}
        style={{ color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" }}
        className="text-sm mb-4 rounded-lg px-3 py-1.5 font-bold inline-block"
      >
        {tr("› بازگشت")}</button>

      <div className="flex items-center justify-between mb-4">
        <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-lg font-black">
          {tr("لیست کاربران")}</h1>
        <span
          style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6", background: "#424245" }}
          className="text-xs font-bold rounded-full px-3 py-1"
        >
          {tr("{n} نفر", { n: total.toLocaleString("en-US") })}
        </span>
      </div>

      {loading && (
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm text-center mt-10">
          {tr("در حال بارگذاری…")}</p>
      )}
      {error && (
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }} className="text-sm text-center mt-10">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-2">
        {users.map((u) => {
          // «فعال» یعنی پول پرداخت کرده و اشتراکش هنوز منقضی نشده - نه اینکه صرفاً وارد اپ شده
          const isActivePaid =
            (u.plan === "silver" || u.plan === "gold") && u.planExpiresAt && u.planExpiresAt > Date.now();
          return (
            <div
              key={u.identifier}
              className="rounded-xl p-3"
              style={{ background: "#17161A", border: "1px solid #2a292e" }}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6", direction: "ltr" }}
                  className="text-sm font-bold"
                >
                  {u.identifier}{u.name ? ` · ${u.name}` : ""}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {u.isAdmin && (
                    <span
                      style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", background: "#424245" }}
                      className="text-[10px] font-bold rounded-full px-2 py-0.5"
                    >
                      {tr("ادمین")}</span>
                  )}
                  {isActivePaid && (
                    <span
                      style={{ fontFamily: "Vazirmatn, sans-serif", color: "#1C6FD1", background: "#283342" }}
                      className="text-[10px] font-bold rounded-full px-2 py-0.5 flex items-center gap-1"
                    >
                      <span style={{ background: "#1C6FD1" }} className="w-1.5 h-1.5 rounded-full" />
                      {tr("فعال")}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs">
                  {planLabel[u.plan] || u.plan}
                  {u.planExpiresAt ? tr(" · تا {date}", { date: formatExpiryDate(u.planExpiresAt) }) : ""}
                </span>
                <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }} className="text-xs">
                  {formatExpiryDate(u.createdAt)}
                </span>
              </div>
              {(u.journeyDays > 0) && (
                <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#4DA3FF" }} className="text-[11px] mt-1">{`مسیر ۱۰۰ روزه: ${u.journeyDays} روز • ${u.journeyMedals || 0} مدال`}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
function InfoScreen({ title, items, paragraph, onBack, headerExtra }) {
  const [expandedItem, setExpandedItem] = useState(null);

  if (expandedItem) {
    return (
      <div className="flex-1 flex flex-col px-5 pt-3 pb-6" dir={APP_DIR}>
        <button
          onClick={() => setExpandedItem(null)}
          style={{
          color: "#0B0B0D",
          fontFamily: "Vazirmatn, sans-serif",
          background: "#DAD6CE",
        }}
          className="text-sm mb-4 self-start rounded-lg px-3 py-1.5 font-bold inline-block"
        >
          {tr("› بازگشت")}</button>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div
            className="relative w-full rounded-2xl overflow-hidden mb-5"
            style={{ aspectRatio: "1 / 1", background: "#0B0B0D", border: "1px solid #4DA3FF", boxShadow: "0 0 20px rgba(77,163,255,0.4)" }}
          >
            <img src={expandedItem.image} alt={expandedItem.text} className="w-full h-full object-contain" />
          </div>
          <h2 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-lg font-black text-center">
            {expandedItem.text}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6" dir={APP_DIR}>
      <button
        onClick={onBack}
        style={{
          color: "#0B0B0D",
          fontFamily: "Vazirmatn, sans-serif",
          background: "#DAD6CE",
        }}
        className="text-sm mb-4 rounded-lg px-3 py-1.5 font-bold inline-block"
      >
        {tr("› بازگشت")}</button>

      <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-lg font-black mb-4">
        {title}
      </h1>
      {headerExtra}

      {paragraph && (
        <p
          style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", whiteSpace: "pre-line" }}
          className="text-sm leading-8"
        >
          {paragraph}
        </p>
      )}

      {items && (
        <div className="flex flex-col gap-3">
          {items.map((raw, i) => {
            const item = typeof raw === "string" ? { text: raw } : raw;
            const Wrapper = item.image ? "button" : "div";
            return (
              <Wrapper
                key={i}
                onClick={item.image ? () => setExpandedItem(item) : undefined}
                className="flex items-center gap-3 rounded-xl p-3"
                style={{
                  background: "#17161A",
                  border: "1px solid #4DA3FF",
                  boxShadow: "0 0 12px rgba(77,163,255,0.45)",
                }}
              >
                {item.image ? (
                  <div
                    className="rounded-lg overflow-hidden shrink-0"
                    style={{ width: "44px", height: "44px", background: "#0B0B0D" }}
                  >
                    <img src={item.image} alt={item.text} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div
                    className="rounded-full flex items-center justify-center shrink-0"
                    style={{ width: "26px", height: "26px", background: "#44292E" }}
                  >
                    <span style={{ fontFamily: "Oswald, sans-serif", color: "#D91E2B" }} className="text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>
                )}
                <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm">
                  {item.text}
                </span>
              </Wrapper>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------- آمار تفکیکی کاربران (فقط ادمین، داخل باکس منو) ----------
// مهمان = ورود با رمز یکبار مصرف | ثابت = ثبت‌نام‌شده با رمز عبور | اشتراک فعال = خریداران اشتراکِ منقضی‌نشده
function AdminStatsRows({ stats }) {
  const rows = [
    { key: "guestdev", label: tr("کاربران مهمان"), hint: tr("ورود بدون ثبت‌نام"), value: stats?.guestDevices, color: "#F3EEE6" },
    { key: "registered", label: tr("کاربران ثابت"), hint: tr("ثبت‌نام‌شده"), value: stats?.registeredUsers, color: "#4DA3FF" },
    { key: "subscribed", label: tr("اشتراک فعال"), hint: tr("خریداران اشتراک"), value: stats?.activeSubscriptions, color: "#4DA3FF" },
  ];
  return (
    <div
      data-testid="admin-stats"
      className="w-full mt-3 pt-3 flex flex-col gap-2"
      style={{ borderTop: "1px solid rgba(77,163,255,0.25)" }}
    >
      {rows.map((r) => (
        <div key={r.key} data-testid={`admin-stat-${r.key}`} className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 min-w-0">
            <span className="rounded-full shrink-0" style={{ width: "8px", height: "8px", background: r.color }} />
            <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs font-bold whitespace-nowrap">
              {r.label}
            </span>
            <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-[10px] truncate">
              {r.hint}
            </span>
          </span>
          <span style={{ fontFamily: "Oswald, sans-serif", color: r.color }} className="text-sm font-bold shrink-0">
            {r.value == null ? "—" : Number(r.value).toLocaleString("en-US")}
          </span>
        </div>
      ))}
    </div>
  );
}

function MenuPlanIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3.5" width="14" height="17.5" rx="2.2" fill="currentColor" fillOpacity="0.2"/><path d="M9 3.5V2.6h6v.9M8.6 9.2h6.8M8.6 13h6.8M8.6 16.8h4"/><circle cx="6.9" cy="9.2" r=".5"/><circle cx="6.9" cy="13" r=".5"/>
    </svg>
  );
}

// ---------- ویدیوی حرکت‌ها (ادمین آپلود می‌کنه؛ تکراری و بی‌صدا پخش می‌شه) ----------
// کلید ویدیو از «اسم اصلی» حرکت ساخته می‌شه تا یه حرکت (مثلاً «برپی») که تو چند برنامه هست، یه بار آپلود بشه.
function pgCore(name) {
  return String(name || "")
    .replace(/\(.*?\)/g, " ")
    .split("—")[0]
    .replace(/^[\s\d۰-۹]+/, "")
    .replace(/[\d۰-۹]+\s*(دقیقه|ثانیه)?/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function pgKey(name) {
  const core = pgCore(name);
  let h = 5381;
  for (let i = 0; i < core.length; i++) h = ((h * 33) ^ core.charCodeAt(i)) >>> 0;
  return "e" + h.toString(36);
}
async function apiFetchExerciseVideos() {
  if (DEMO_MODE) return {};
  try {
    const res = await apiFetch(`${API_BASE_URL}/exercise-videos`);
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || !data.ok) return null;
    const out = {};
    for (const [k, url] of Object.entries(data.videos || {})) out[k] = toAbsoluteVideoUrl(url);
    return out;
  } catch {
    return null;
  }
}
async function apiUploadExerciseVideo(key, file, token) {
  const form = new FormData();
  form.append("video", file);
  const res = await apiFetch(`${API_BASE_URL}/exercise-videos/${key}`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("آپلود ویدیو با خطا مواجه شد"));
  return toAbsoluteVideoUrl(data.url);
}
async function apiDeleteExerciseVideo(key, token) {
  const res = await apiFetch(`${API_BASE_URL}/exercise-videos/${key}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("ذخیره انجام نشد"));
}

// ویدیوی تکرارشونده‌ی یه حرکت (بی‌صدا، خودکار، حلقه‌ای)
function ExerciseClip({ name, exVideos, height = 170 }) {
  const url = exVideos && exVideos[pgKey(name)];
  if (!url) return null;
  return (
    <video key={url} src={url} autoPlay loop muted playsInline preload="auto" controlsList="nodownload noplaybackrate" disablePictureInPicture
      className="rounded-xl mb-2" style={{ display: "block", width: "100%", height: "auto", maxHeight: "55vh", objectFit: "contain", background: "transparent", border: "1px solid #2a292e" }} />
  );
}

// پنل ادمین: آپلود/جایگزینی/حذف ویدیوی هر حرکت یک برنامه
function ExerciseVideoAdmin({ names, exVideos, authToken, onChanged }) {
  const [busy, setBusy] = useState("");
  const [err, setErr] = useState("");
  const uniq = [];
  const seen = new Set();
  names.forEach((n) => { const k = pgKey(n); if (!seen.has(k)) { seen.add(k); uniq.push({ k, label: pgCore(n) || n }); } });
  const pick = (k) => {
    const input = document.createElement("input");
    input.type = "file"; input.accept = "video/*";
    input.onchange = async () => {
      const f = input.files && input.files[0];
      if (!f) return;
      setErr(""); setBusy(k);
      try { const url = await apiUploadExerciseVideo(k, f, authToken); onChanged(k, url); }
      catch (e) { setErr(e.message || "خطا"); }
      finally { setBusy(""); }
    };
    input.click();
  };
  const del = async (k) => {
    setErr(""); setBusy(k);
    try { await apiDeleteExerciseVideo(k, authToken); onChanged(k, null); }
    catch (e) { setErr(e.message || "خطا"); }
    finally { setBusy(""); }
  };
  return (
    <div className="rounded-xl p-3 mb-4" style={{ background: "#17161A", border: "1px dashed #F3EEE6" }}>
      <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs font-black mb-2">ویدیوی حرکت‌ها (فقط ادمین)</div>
      <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-[10px] leading-4 mb-2">ویدیو کوتاه (۵ تا ۱۰ ثانیه) بذار؛ توی اپ بی‌صدا و تکراری پخش می‌شه. ویدیوی هر حرکت توی همه‌ی برنامه‌ها مشترکه.</div>
      {uniq.map(({ k, label }) => (
        <div key={k} className="flex items-center justify-between gap-2 py-1.5" style={{ borderTop: "1px solid #2a292e" }}>
          <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs flex-1">{label}</span>
          <span style={{ fontFamily: "Vazirmatn, sans-serif", color: exVideos && exVideos[k] ? "#4DA3FF" : "#8A8790" }} className="text-[10px]">{exVideos && exVideos[k] ? "دارد ✓" : "ندارد"}</span>
          <button disabled={busy === k} onClick={() => pick(k)} className="rounded-lg px-2.5 py-1 text-[11px] font-bold" style={{ fontFamily: "Vazirmatn, sans-serif", background: "#F3EEE6", color: "#0B0B0D", opacity: busy === k ? 0.6 : 1 }}>
            {busy === k ? "..." : exVideos && exVideos[k] ? "جایگزینی" : "آپلود"}
          </button>
          {exVideos && exVideos[k] && (
            <button disabled={busy === k} onClick={() => del(k)} className="rounded-lg px-2 py-1 text-[11px] font-bold" style={{ background: "#3a1418", color: "#FF6B76" }}>حذف</button>
          )}
        </div>
      ))}
      {err && <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#FF6B76" }} className="text-xs mt-2">{err}</div>}
    </div>
  );
}

// ---------- برنامه‌های تمرینی ----------
// سه نوع برنامه: interval (تایمر کار/استراحت قدم‌به‌قدم)، amrap (شمارش معکوس + شمارنده‌ی دور)، list (ست و تکرار + تایمر استراحت)
const PG_PREP = 10;
function pgBuildSteps(p) {
  const steps = [{ type: "prep", name: "آماده شو", dur: PG_PREP }];
  const blocks = p.blocks || [];
  blocks.forEach((b, bi) => {
    for (let r = 1; r <= b.rounds; r++) {
      b.ex.forEach((ex, ei) => {
        steps.push({ type: "work", name: ex, dur: b.work, round: r, rounds: b.rounds });
        const lastOfBlock = r === b.rounds && ei === b.ex.length - 1;
        if (!lastOfBlock && b.rest > 0) steps.push({ type: "rest", name: "استراحت", dur: b.rest, next: null });
      });
    }
    if (b.restAfter && bi < blocks.length - 1) steps.push({ type: "rest", name: "استراحت", dur: b.restAfter, next: null });
  });
  steps.forEach((s, i) => {
    if (s.type === "rest") {
      const nx = steps.slice(i + 1).find((x) => x.type === "work");
      s.next = nx ? nx.name : null;
    }
  });
  return steps;
}
const pgTotal = (steps) => steps.reduce((a, s) => a + s.dur, 0);
const pgMin = (steps) => Math.max(1, Math.round(pgTotal(steps) / 60));

const PG_SAFETY = "قبل از شروع ۵ دقیقه گرم کن (چرخش مفاصل، طناب سبک). اگه بیماری قلبی/مفصلی داری یا درد داری، با پزشک مشورت کن. تمرین رو با تکنیک درست انجام بده، نه با سرعت بی‌پروا.";

const PG_DATA = [
  {
    id: "tabata", img: "assets/prog-tabata.webp", icon: "⚡", color: "#FF5A36", title: "تاباتا",
    desc: "هر حرکت ۲۰ ثانیه تمام قدرت، ۱۰ ثانیه استراحت؛ ۸ دور = ۴ دقیقه. کوتاه ولی خیلی سنگین.",
    programs: [
      { id: "tb-full", name: "تاباتا تمام‌بدن", level: "متوسط", mode: "interval", desc: "۴ بلوک ۴ دقیقه‌ای؛ بین بلوک‌ها ۶۰ ثانیه استراحت.",
        blocks: [
          { ex: ["پرش اسکات", "کوهنورد (Mountain Climber)"], work: 20, rest: 10, rounds: 4, restAfter: 60 },
          { ex: ["شنا", "پلانک‌جک"], work: 20, rest: 10, rounds: 4, restAfter: 60 },
          { ex: ["لانج جهشی", "بالا آوردن زانو"], work: 20, rest: 10, rounds: 4, restAfter: 60 },
          { ex: ["برپی", "دراز و نشست"], work: 20, rest: 10, rounds: 4 },
        ] },
      { id: "tb-legs", name: "تاباتا پا و باسن", level: "متوسط", mode: "interval", desc: "۳ بلوک؛ پاها رو خسته می‌کنه.",
        blocks: [
          { ex: ["اسکات وزن بدن", "لانج متناوب"], work: 20, rest: 10, rounds: 4, restAfter: 60 },
          { ex: ["اسکات پرشی", "پل باسن"], work: 20, rest: 10, rounds: 4, restAfter: 60 },
          { ex: ["اسکی‌باز (Skater)", "دیوار‌نشین (Wall Sit)"], work: 20, rest: 10, rounds: 4 },
        ] },
      { id: "tb-upper", name: "تاباتا بالاتنه و شکم", level: "مبتدی", mode: "interval", desc: "شنا و حرکات شکم؛ اگه شنا سخته روی زانو انجام بده.",
        blocks: [
          { ex: ["شنا (روی زانو هم اوکیه)", "پلانک"], work: 20, rest: 10, rounds: 4, restAfter: 45 },
          { ex: ["دراز و نشست", "کوهنورد"], work: 20, rest: 10, rounds: 4, restAfter: 45 },
          { ex: ["شنا الماسی", "بالا آوردن پا"], work: 20, rest: 10, rounds: 4 },
        ] },
      { id: "tb-box", name: "تاباتا بوکس", level: "پیشرفته", mode: "interval", desc: "ضربه‌های سریع و کاندیشنینگ مخصوص بوکسور.",
        blocks: [
          { ex: ["جَب-کراس سریع (شَدو)", "برپی"], work: 20, rest: 10, rounds: 4, restAfter: 60 },
          { ex: ["هوک و آپرکات (شَدو)", "پرش اسکات"], work: 20, rest: 10, rounds: 4, restAfter: 60 },
          { ex: ["حرکت پا + جَب (سایه‌بوکس)", "کوهنورد"], work: 20, rest: 10, rounds: 4 },
        ] },
    ],
  },
  {
    id: "hiit", img: "assets/prog-hiit.webp", icon: "🔥", color: "#F3EEE6", title: "HIIT (تمرین تناوبی شدید)",
    desc: "تناوب بین تلاش شدید و استراحت کوتاه. چربی‌سوزی بالا در زمان کم.",
    programs: [
      { id: "hiit-beg", name: "HIIT مبتدی ۱۵ دقیقه", level: "مبتدی", mode: "interval", desc: "۳۰ ثانیه کار / ۳۰ ثانیه استراحت، ۳ دور ۵ حرکتی.",
        blocks: [{ ex: ["جامپینگ‌جک", "اسکات وزن بدن", "شنا روی زانو", "کوهنورد آرام", "پلانک"], work: 30, rest: 30, rounds: 3 }] },
      { id: "hiit-mid", name: "HIIT متوسط ۲۰ دقیقه", level: "متوسط", mode: "interval", desc: "۴۰ ثانیه کار / ۲۰ ثانیه استراحت، ۴ دور ۵ حرکتی.",
        blocks: [{ ex: ["برپی", "اسکات پرشی", "شنا", "کوهنورد", "لانج جهشی"], work: 40, rest: 20, rounds: 4 }] },
      { id: "hiit-adv", name: "HIIT پیشرفته ۲۵ دقیقه", level: "پیشرفته", mode: "interval", desc: "۴۵ ثانیه کار / ۱۵ ثانیه استراحت، ۵ دور ۵ حرکتی.",
        blocks: [{ ex: ["برپی با شنا", "پرش جعبه‌ای (یا اسکات پرشی)", "شنا انفجاری", "کوهنورد سریع", "دراز و نشست V"], work: 45, rest: 15, rounds: 5 }] },
      { id: "hiit-sprint", name: "HIIT دویدن (اسپرینت)", level: "متوسط", mode: "interval", desc: "۳۰ ثانیه دوی سریع / ۹۰ ثانیه راه رفتن، ۸ دور.",
        blocks: [{ ex: ["دوی سریع"], work: 30, rest: 90, rounds: 8 }] },
    ],
  },
  {
    id: "crossfit", img: "assets/prog-crossfit.webp", icon: "🏋️", color: "#4DA3FF", title: "کراس‌فیت",
    desc: "تمرین‌های عملکردی با شدت بالا و متنوع (WOD). با شمارش دور یا زمان انجام می‌شن.",
    programs: [
      { id: "cf-amrap", name: "AMRAP ۱۲ دقیقه", level: "متوسط", mode: "amrap", total: 720,
        desc: "تا ۱۲ دقیقه هر چند دور که می‌تونی. دورها رو بشمار.",
        items: ["۱۰ اسکات هوایی", "۱۰ شنا", "۱۰ دراز و نشست", "۱۰ پرش اسکات"] },
      { id: "cf-cindy", name: "WOD «سیندی» ۲۰ دقیقه", level: "پیشرفته", mode: "amrap", total: 1200,
        desc: "WOD معروف کراس‌فیت: ۲۰ دقیقه AMRAP.",
        items: ["۵ بارفیکس (یا بارفیکس کمکی)", "۱۰ شنا", "۱۵ اسکات هوایی"] },
      { id: "cf-emom", name: "EMOM ۱۰ دقیقه", level: "متوسط", mode: "interval", desc: "هر دقیقه یک حرکت: اون رو ۴۰ ثانیه انجام بده و ۲۰ ثانیه استراحت کن.",
        blocks: [{ ex: ["۱۲ برپی", "۱۵ اسکات پرشی", "۱۰ شنا", "۲۰ کوهنورد", "۱۵ لانج"], work: 40, rest: 20, rounds: 2 }] },
      { id: "cf-chipper", name: "چیپر (۵ حرکت پشت‌سرهم)", level: "پیشرفته", mode: "list", desc: "هر حرکت رو به ترتیب تموم کن، زمانت رو یادداشت کن و دفعه بعد بشکونش.",
        items: ["۵۰ جامپینگ‌جک", "۴۰ اسکات هوایی", "۳۰ دراز و نشست", "۲۰ شنا", "۱۰ برپی"], rest: 0 },
    ],
  },
  {
    id: "fitness", img: "assets/prog-fitness.webp", icon: "💪", color: "#4DA3FF", title: "فیتنس و تمام‌بدن",
    desc: "برنامه‌های عمومی برای تناسب اندام، قدرت پایه و آمادگی جسمانی.",
    programs: [
      { id: "ft-circuit", name: "سیرکویت تمام‌بدن (۲۰ دقیقه)", level: "مبتدی", mode: "interval", desc: "۴۰ ثانیه کار / ۲۰ ثانیه استراحت، ۳ دور ۶ حرکتی.",
        blocks: [{ ex: ["اسکات", "شنا (زانو هم اوکیه)", "لانج متناوب", "پلانک", "جامپینگ‌جک", "پل باسن"], work: 40, rest: 20, rounds: 3 }] },
      { id: "ft-home", name: "تمرین خانگی بدون وسیله", level: "مبتدی", mode: "list", desc: "۳ ست از هر حرکت، بین ست‌ها ۶۰ ثانیه استراحت.", rest: 60,
        items: ["اسکات — ۳×۱۵", "شنا — ۳×۱۰", "لانج — ۳×۱۲ برای هر پا", "پلانک — ۳×۳۰ ثانیه", "پل باسن — ۳×۱۵", "دراز و نشست — ۳×۱۵"] },
      { id: "ft-core", name: "شکم و مرکز بدن (۱۰ دقیقه)", level: "متوسط", mode: "interval", desc: "۴۵ ثانیه کار / ۱۵ ثانیه استراحت.",
        blocks: [{ ex: ["پلانک", "دراز و نشست دوچرخه‌ای", "بالا آوردن پا", "پلانک کناری راست", "پلانک کناری چپ", "کوهنورد"], work: 45, rest: 15, rounds: 2 }] },
    ],
  },
  {
    id: "bodybuilding", img: "assets/prog-bodybuilding.webp", icon: "🏆", color: "#D91E2B", title: "بدنسازی (با وزنه)",
    desc: "برنامه‌های تقسیم‌بندی‌شده برای افزایش حجم و قدرت. وزنه رو طوری انتخاب کن که ۲-۳ تکرار آخر سخت باشه.",
    programs: [
      { id: "bb-full", name: "تمام‌بدن ۳ روز در هفته", level: "مبتدی", mode: "list", desc: "شنبه / دوشنبه / چهارشنبه. بین ست‌ها ۹۰ ثانیه استراحت.", rest: 90,
        items: ["اسکات با هالتر — ۳×۸", "پرس سینه — ۳×۸", "زیربغل سیم‌کش — ۳×۱۰", "پرس سرشانه — ۳×۱۰", "جلو بازو — ۲×۱۲", "پشت بازو — ۲×۱۲", "پلانک — ۳×۴۵ ثانیه"] },
      { id: "bb-push", name: "روز Push (سینه، شانه، پشت بازو)", level: "متوسط", mode: "list", desc: "بین ست‌ها ۹۰ ثانیه.", rest: 90,
        items: ["پرس سینه هالتر — ۴×۸", "پرس بالا سینه دمبل — ۳×۱۰", "پرس سرشانه — ۴×۱۰", "نشر از جانب — ۳×۱۵", "پشت بازو سیم‌کش — ۳×۱۲", "دیپ — ۳×۱۰"] },
      { id: "bb-pull", name: "روز Pull (پشت، جلو بازو)", level: "متوسط", mode: "list", desc: "بین ست‌ها ۹۰ ثانیه.", rest: 90,
        items: ["بارفیکس (یا لت‌پول) — ۴×۸", "زیربغل هالتر خم — ۴×۸", "زیربغل سیم‌کش — ۳×۱۰", "فِیس‌پول — ۳×۱۵", "جلو بازو هالتر — ۳×۱۰", "جلو بازو چکشی — ۳×۱۲"] },
      { id: "bb-legs", name: "روز Legs (پا)", level: "متوسط", mode: "list", desc: "بین ست‌ها ۱۲۰ ثانیه.", rest: 120,
        items: ["اسکات — ۴×۸", "پرس پا — ۴×۱۰", "رومانیایی ددلیفت — ۳×۱۰", "جلو پا — ۳×۱۲", "پشت پا — ۳×۱۲", "ساق پا — ۴×۱۵"] },
      { id: "bb-upper", name: "بالاتنه (Upper) — حجم و قدرت", level: "متوسط", mode: "list", desc: "روز بالاتنه در تقسیم ۴ روزه. بین ست‌ها ۹۰ ثانیه.", rest: 90,
        items: ["پرس سینه هالتر — ۴×۸", "زیربغل هالتر خم — ۴×۸", "پرس سرشانه دمبل — ۳×۱۰", "لت‌پول — ۳×۱۰", "نشر از جانب — ۳×۱۵", "جلو بازو هالتر — ۳×۱۰", "پشت بازو سیم‌کش — ۳×۱۲"] },
      { id: "bb-lower", name: "پایین‌تنه (Lower) — حجم و قدرت", level: "متوسط", mode: "list", desc: "روز پایین‌تنه در تقسیم ۴ روزه. بین ست‌ها ۱۲۰ ثانیه.", rest: 120,
        items: ["اسکات هالتر — ۴×۸", "رومانیایی ددلیفت — ۴×۸", "پرس پا — ۳×۱۲", "لانج واکینگ با دمبل — ۳×۱۰ هر پا", "پشت پا — ۳×۱۲", "ساق پا — ۴×۱۵"] },
      { id: "bb-531", name: "قدرت ۵×۵ (اسکات، پرس، ددلیفت)", level: "پیشرفته", mode: "list", desc: "برنامه‌ی قدرتی: وزنه‌ی سنگین و تکرار کم. بین ست‌ها ۱۸۰ ثانیه. تکنیک رو فدا نکن و حتماً هم‌تمرین داشته باش.", rest: 180,
        items: ["اسکات هالتر — ۵×۵", "پرس سینه هالتر — ۵×۵", "ددلیفت — ۳×۵", "پرس سرشانه ایستاده — ۳×۸", "بارفیکس با وزنه — ۳×۶"] },
      { id: "bb-glute", name: "پایین‌تنه و باسن (مخصوص بانوان)", level: "مبتدی", mode: "list", desc: "تمرکز روی باسن و پا؛ بین ست‌ها ۷۵ ثانیه.", rest: 75,
        items: ["هیپ‌تراست — ۴×۱۲", "اسکات سومو — ۴×۱۲", "رومانیایی ددلیفت با دمبل — ۳×۱۲", "لانج عقب — ۳×۱۰ هر پا", "کیک‌بک سیم‌کش — ۳×۱۵ هر پا", "ابداکشن (بازکردن ران) — ۳×۲۰"] },
      { id: "bb-dropset", name: "پمپ بازو و شانه (دراپ‌ست)", level: "پیشرفته", mode: "list", desc: "هر حرکت ۳ ست؛ ست آخر دراپ‌ست (۲۰٪ وزنه کم کن و تا ناتوانی ادامه بده). بین ست‌ها ۶۰ ثانیه.", rest: 60,
        items: ["پرس سرشانه دمبل — ۴×۱۰", "نشر از جانب — ۴×۱۵", "نشر خم به عقب — ۳×۱۵", "جلو بازو هالتر ز — ۴×۱۰", "جلو بازو چکشی — ۳×۱۲", "پشت بازو سیم‌کش — ۴×۱۲", "پشت بازو پشت‌سر دمبل — ۳×۱۲"] },
      { id: "bb-fighter", name: "قدرت مخصوص بوکسور (۳ روز)", level: "متوسط", mode: "list", desc: "قدرت انفجاری برای ضربه‌ی محکم‌تر، بدون حجم اضافه. بین ست‌ها ۹۰ ثانیه.", rest: 90,
        items: ["پرتاب توپ مدیسین به دیوار — ۴×۸", "اسکات پرشی — ۴×۶", "ددلیفت — ۴×۵", "پرس سینه دمبل (سریع بالا) — ۴×۶", "بارفیکس — ۴×۶", "چرخش مدیسین‌بال (پرتاب چرخشی) — ۳×۱۰ هر طرف", "پلانک — ۳×۶۰ ثانیه"] },
    ],
  },
  {
    id: "cardio", img: "assets/prog-cardio.webp", icon: "🏃", color: "#4DA3FF", title: "ورزش‌های هوازی",
    desc: "تقویت قلب و ریه و چربی‌سوزی؛ پایه‌ی آمادگی بوکسور.",
    programs: [
      { id: "cd-walkrun", name: "راه رفتن/دویدن مبتدی (۲۵ دقیقه)", level: "مبتدی", mode: "interval", desc: "۱ دقیقه دویدن آرام، ۲ دقیقه راه رفتن؛ ۸ بار.",
        blocks: [{ ex: ["دویدن آرام"], work: 60, rest: 120, rounds: 8 }] },
      { id: "cd-rope", name: "طناب‌زنی تناوبی (۱۵ دقیقه)", level: "متوسط", mode: "interval", desc: "۶۰ ثانیه طناب / ۳۰ ثانیه استراحت، ۱۰ دور.",
        blocks: [{ ex: ["طناب‌زنی"], work: 60, rest: 30, rounds: 10 }] },
      { id: "cd-liss", name: "هوازی ملایم (۳۰ دقیقه)", level: "مبتدی", mode: "interval", desc: "حرکت پیوسته با شدت متوسط؛ باید بتونی صحبت کنی.",
        blocks: [{ ex: ["راه سریع / دوی نرم / دوچرخه"], work: 1800, rest: 0, rounds: 1 }] },
      { id: "cd-stairs", name: "پله و پرش (۱۲ دقیقه)", level: "متوسط", mode: "interval", desc: "۴۰ ثانیه کار / ۲۰ ثانیه استراحت.",
        blocks: [{ ex: ["بالا رفتن از پله", "پرش اسکات", "زانو بالا (درجا)"], work: 40, rest: 20, rounds: 4 }] },
    ],
  },
  {
    id: "boxing", img: "assets/prog-boxing.webp", icon: "🥊", color: "#D91E2B", title: "کاندیشنینگ بوکس",
    desc: "تمرین‌های آمادگی مخصوص بوکسور: استقامت راند، سرعت دست و پا و قدرت مرکز بدن.",
    programs: [
      { id: "bx-rounds", name: "۶ راند سایه‌بوکسینگ", level: "مبتدی", mode: "interval", desc: "۳ دقیقه راند / ۱ دقیقه استراحت. هر راند روی یک تمرکز.",
        blocks: [{ ex: ["راند ۱: جَب و حرکت پا", "راند ۲: جَب-کراس", "راند ۳: هوک", "راند ۴: دفاع و ضدحمله", "راند ۵: ترکیب‌ها", "راند ۶: تمام قدرت"], work: 180, rest: 60, rounds: 1 }] },
      { id: "bx-circuit", name: "سیرکویت کاندیشنینگ", level: "متوسط", mode: "interval", desc: "۴۰ ثانیه کار / ۲۰ ثانیه استراحت، ۴ دور.",
        blocks: [{ ex: ["طناب", "برپی", "سایه‌بوکس سریع", "اسکات پرشی", "پلانک", "چرخش روسی (شکم)"], work: 40, rest: 20, rounds: 4 }] },
      { id: "bx-speed", name: "سرعت دست و پا", level: "متوسط", mode: "interval", desc: "۳۰ ثانیه حداکثر سرعت / ۳۰ ثانیه استراحت، ۳ دور.",
        blocks: [{ ex: ["جَب سریع", "نردبان چابکی (یا جابه‌جایی پا)", "کراس-هوک سریع", "پرش طناب دوبل"], work: 30, rest: 30, rounds: 3 }] },
      { id: "bx-neck", name: "گردن و شانه (محافظ ضربه)", level: "مبتدی", mode: "list", desc: "برای مقاومت در برابر ضربه. بین ست‌ها ۶۰ ثانیه.", rest: 60,
        items: ["پل گردن (ملایم) — ۳×۱۰ ثانیه", "شراگ شانه — ۳×۱۵", "نشر از جانب — ۳×۱۵", "چرخش شانه با کش — ۳×۱۵"] },
      { id: "bx-combo1", name: "ترکیب ضربات: مبتدی (۶ راند)", level: "مبتدی", mode: "interval", desc: "سیستم شماره‌گذاری: ۱=جَب ۲=کراس ۳=هوک جلو ۴=هوک عقب ۵=آپرکات جلو ۶=آپرکات عقب. راند ۳ دقیقه / استراحت ۱ دقیقه.",
        blocks: [{ ex: ["راند ۱: ۱-۲ آروم و دقیق", "راند ۲: ۱-۱-۲", "راند ۳: ۱-۲-۳ (جَب-کراس-هوک)", "راند ۴: ۱-۲-۳-۲", "راند ۵: ۱-۲ + اسلیپ", "راند ۶: همه‌ی ترکیب‌ها با ریتم"], work: 180, rest: 60, rounds: 1 }] },
      { id: "bx-combo2", name: "ترکیب ضربات: پیشرفته (۸ راند)", level: "پیشرفته", mode: "interval", desc: "سیستم شماره‌گذاری: ۱=جَب ۲=کراس ۳=هوک جلو ۴=هوک عقب ۵=آپرکات جلو ۶=آپرکات عقب. هر راند یک ترکیب بلند + دفاع. راند ۳ دقیقه / استراحت ۴۵ ثانیه.",
        blocks: [{ ex: ["راند ۱: ۱-۲-۳-۲ (گرم‌کردن سرعتی)", "راند ۲: ۱-۲-۵-۶-۳-۲", "راند ۳: ۱-۲-اسلیپ-۲-۳-۲", "راند ۴: ۲-۳-رول-۳-۴-۵-۳", "راند ۵: ۱-۱-۲-باب‌ویو-۳-۴-۳", "راند ۶: ۱-۲-۳-پولبک-۲-۳-۲", "راند ۷: ۱-اسلیپ-۲-رول-۳-۲-پیوت", "راند ۸: همه‌چی! بدون توقف"], work: 180, rest: 45, rounds: 1 }] },
      { id: "bx-head", name: "رقص سر و جاخالی (اسلیپ، رول)", level: "متوسط", mode: "interval", desc: "دفاع با سر و بدن: اسلیپ = جاخالی کناری، رول = چرخش U شکل زیر ضربه، باب‌ویو = خم شدن، پولبک = عقب کشیدن سر. دست‌ها بالا، چانه پایین.",
        blocks: [{ ex: ["اسلیپ راست و چپ بدون ضربه", "رول چپ-راست (U شکل)", "باب‌ویو و بالا آمدن", "اسلیپ-اسلیپ-رول + جَب", "پولبک + ضدحمله ۱-۲", "رقص سر آزاد روی ریتم موزیک"], work: 40, rest: 20, rounds: 4, restAfter: 45 }] },
      { id: "bx-counter", name: "ضدحمله: جاخالی + ضربه", level: "پیشرفته", mode: "interval", desc: "هر جاخالی رو بلافاصله با ضربه تموم کن؛ سرعت واکنش مهم‌ترین چیزه. ۴۵ ثانیه کار / ۱۵ ثانیه استراحت.",
        blocks: [{ ex: ["اسلیپ راست ← ۲-۳", "پولبک ← ۱-۲", "رول چپ ← هوک بدن ۳ ← ۲", "پَری ← ۲ ← ۳", "باب‌ویو ← ۳-۲-۳ از زیر", "اسلیپ-رول ← ۱-۲-۳-۲"], work: 45, rest: 15, rounds: 4, restAfter: 60 }] },
      { id: "bx-bag", name: "کیسه‌ی سنگین: قدرت و ترکیب (۶ راند)", level: "متوسط", mode: "interval", desc: "سیستم شماره‌گذاری: ۱=جَب ۲=کراس ۳=هوک جلو ۴=هوک عقب ۵=آپرکات جلو ۶=آپرکات عقب. روی کیسه‌ی بوکس. راند ۳ دقیقه / استراحت ۶۰ ثانیه.",
        blocks: [{ ex: ["راند ۱: جَب سنگین + کار پا دور کیسه", "راند ۲: ۱-۲ با تمام قدرت", "راند ۳: ۱-۲-۳ و خروج با پیوت", "راند ۴: ضربات بدن ۳ بدن - ۳ سر - ۲", "راند ۵: آپرکات ۵-۶ پشت‌سرهم", "راند ۶: ۱۰ ثانیه قدرت کامل / ۵ ثانیه آرام"], work: 180, rest: 60, rounds: 1 }] },
      { id: "bx-pro", name: "کاندیشن حرفه‌ای (سیرکویت بوکس)", level: "پیشرفته", mode: "interval", desc: "ترکیب ضربه، دفاع و قدرت در یک سیرکویت. ۴۰ ثانیه کار / ۲۰ ثانیه استراحت، ۵ دور.",
        blocks: [{ ex: ["ترکیب ۱-۲-۳-۲ سریع", "اسلیپ-رول-اسلیپ ریتمیک", "برپی + جَب-کراس", "پیوت و ضربه (چپ/راست)", "طناب دوبل یا سایه‌بوکس سریع", "آپرکات ۵-۶ پشت‌سرهم"], work: 40, rest: 20, rounds: 5, restAfter: 60 }] },
      { id: "bx-footwork", name: "کار پا و زاویه گرفتن", level: "مبتدی", mode: "interval", desc: "پایه‌ی همه‌ی ترکیب‌ها: تعادل و حرکت. ۴۰ ثانیه کار / ۲۰ ثانیه استراحت.",
        blocks: [{ ex: ["قدم و کشیدن (Step-Drag) جلو و عقب", "چرخش دور حریف ساعتگرد با جَب", "چرخش دور حریف پادساعتگرد با جَب", "پیوت چپ و راست", "In & Out: جلو جَب، عقب خروج", "زیگزاگ و رقص سر"], work: 40, rest: 20, rounds: 3, restAfter: 45 }] },
    ],
  },
  {
    id: "calisthenics", img: "assets/prog-calisthenics.webp", icon: "🤸", color: "#4DA3FF", title: "تمرین با وزن بدن",
    desc: "قدرت و کنترل بدن بدون وسیله — هر جا و هر زمان.",
    programs: [
      { id: "cal-beg", name: "پایه (۳ روز در هفته)", level: "مبتدی", mode: "list", desc: "۳ ست، بین ست‌ها ۶۰ ثانیه.", rest: 60,
        items: ["شنا — ۳×۸", "اسکات — ۳×۱۵", "بارفیکس منفی/کمکی — ۳×۵", "دیپ روی صندلی — ۳×۱۰", "پلانک — ۳×۳۰ ثانیه"] },
      { id: "cal-adv", name: "پیشرفته", level: "پیشرفته", mode: "list", desc: "۴ ست، بین ست‌ها ۹۰ ثانیه.", rest: 90,
        items: ["شنا یک‌دست/الماسی — ۴×۱۰", "بارفیکس — ۴×۸", "دیپ موازی — ۴×۱۰", "اسکات تک‌پا (پیستول) — ۴×۶", "اِل‌سیت — ۴×۱۵ ثانیه"] },
    ],
  },
  {
    id: "recovery", img: "assets/prog-recovery.webp", icon: "🧘", color: "#8FA3B8", title: "کشش و ریکاوری",
    desc: "بعد از تمرین یا روزهای استراحت؛ انعطاف و جلوگیری از آسیب.",
    programs: [
      { id: "rc-full", name: "کشش تمام‌بدن (۱۰ دقیقه)", level: "مبتدی", mode: "interval", desc: "هر حرکت ۳۰ ثانیه، ۱۰ ثانیه تعویض.",
        blocks: [{ ex: ["کشش گردن", "کشش شانه", "کشش سینه", "کشش پشت (گربه-گاو)", "کشش جلو ران", "کشش پشت ران", "کشش ساق", "کشش باسن"], work: 30, rest: 10, rounds: 2 }] },
      { id: "rc-warm", name: "گرم‌کردن (۵ دقیقه)", level: "مبتدی", mode: "interval", desc: "قبل از هر تمرین. ۳۰ ثانیه برای هر حرکت.",
        blocks: [{ ex: ["چرخش گردن و شانه", "چرخش مچ و آرنج", "چرخش کمر", "زانو بالا (درجا)", "پاشنه به باسن", "جامپینگ‌جک سبک"], work: 30, rest: 5, rounds: 1 }] },
    ],
  },
];

// ترتیب نمایش باکس‌ها (دو ستون): تاباتا اولی و بقیه به این ترتیب
const PG_ORDER = ["tabata", "bodybuilding", "crossfit", "fitness", "hiit", "cardio", "boxing", "calisthenics", "recovery"];
PG_DATA.sort((a, b) => PG_ORDER.indexOf(a.id) - PG_ORDER.indexOf(b.id));
// فقط تاباتا برای همه بازه؛ بقیه با اشتراک دوره اول (یا ادمین)
const PG_FREE = ["tabata"];
PG_DATA.forEach((c, i) => { c.color = ["#D91E2B", "#4DA3FF", "#F3EEE6"][i % 3]; });

const PG_LEVEL_COLOR = { "مبتدی": "#4DA3FF", "متوسط": "#F3EEE6", "پیشرفته": "#D91E2B" };
const fmtMMSS = (sec) => { const s = Math.max(0, Math.ceil(sec)); return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; };

// پخش‌کننده‌ی تایمر مشترک: لیستی از مرحله‌ها (steps) رو یکی‌یکی اجرا می‌کنه
function ProgramPlayer({ title, steps, onExit, extra, exVideos, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [left, setLeft] = useState(steps[0] ? steps[0].dur : 0);
  const [mode, setMode] = useState("idle"); // idle | running | paused | done
  const audioRef = useRef(null);
  const endRef = useRef(0);
  const idxRef = useRef(0);
  const modeRef = useRef("idle");
  const lastTickRef = useRef(-1);
  const getAudio = () => { if (!audioRef.current) audioRef.current = makeTimerAudio(); return audioRef.current; };
  const beep = (fn) => { try { fn(getAudio()); } catch {} };
  const buzz = (p) => { try { navigator.vibrate && navigator.vibrate(p); } catch {} };
  const setM = (m) => { modeRef.current = m; setMode(m); };
  const completedRef = useRef(false);
  useEffect(() => { if (mode === "done" && !completedRef.current) { completedRef.current = true; onComplete && onComplete(); } }, [mode]);

  const enter = (i) => {
    idxRef.current = i;
    setIdx(i);
    const s = steps[i];
    endRef.current = Date.now() + s.dur * 1000;
    lastTickRef.current = -1;
    setLeft(s.dur);
    if (s.type === "work") { beep((a) => a.bell(1)); buzz(300); }
    else if (s.type === "rest") { beep((a) => a.bell(2)); buzz([150, 80, 150]); }
  };

  useEffect(() => {
    if (mode !== "running") return undefined;
    const id = setInterval(() => {
      if (modeRef.current !== "running") return;
      const rem = (endRef.current - Date.now()) / 1000;
      const whole = Math.ceil(rem);
      if (rem <= 0) {
        const n = idxRef.current + 1;
        if (n >= steps.length) { setLeft(0); setM("done"); beep((a) => a.bell(3)); buzz([300, 120, 300, 120, 600]); }
        else enter(n);
        return;
      }
      setLeft(rem);
      if (whole <= 3 && whole !== lastTickRef.current) { lastTickRef.current = whole; beep((a) => a.tick()); }
    }, 100);
    return () => clearInterval(id);
  }, [mode]);

  useEffect(() => () => { modeRef.current = "idle"; try { audioRef.current && audioRef.current.close(); } catch {} }, []);

  const start = () => { beep((a) => a.unlock()); enter(0); setM("running"); };
  const pause = () => { endRef.current = endRef.current - Date.now(); setM("paused"); };   // باقیمونده رو نگه می‌داره
  const resume = () => { beep((a) => a.unlock()); endRef.current = Date.now() + endRef.current; setM("running"); };
  const skip = () => { const n = idxRef.current + 1; if (n >= steps.length) { setM("done"); setLeft(0); beep((a) => a.bell(3)); } else enter(n); };
  const prev = () => { enter(Math.max(0, idxRef.current - 1)); };
  const reset = () => { setM("idle"); setIdx(0); setLeft(steps[0] ? steps[0].dur : 0); };

  const s = steps[idx] || steps[0];
  const colorOf = { prep: "#4DA3FF", work: "#D91E2B", rest: "#4DA3FF" };
  const col = mode === "done" ? "#F3EEE6" : colorOf[s.type] || "#D91E2B";
  const nextWork = s.type === "rest" ? s.next : (steps.slice(idx + 1).find((x) => x.type === "work") || {}).name;
  const R = 104, C = 2 * Math.PI * R;
  const prog = s ? 1 - Math.min(1, Math.max(0, left / s.dur)) : 1;
  const workSteps = steps.filter((x) => x.type === "work");
  const workDone = steps.slice(0, idx).filter((x) => x.type === "work").length;

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6 flex flex-col" dir={APP_DIR}
      style={{ background: mode !== "idle" ? `radial-gradient(ellipse at 50% 28%, ${col}33 0%, rgba(11,11,13,0) 65%)` : undefined, transition: "background .4s" }}>
      <div className="flex items-center justify-between mb-3">
        <button onClick={onExit} style={{ color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" }} className="text-sm rounded-lg px-3 py-1.5 font-bold inline-block">{"› بازگشت"}</button>
        <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs">{`حدود ${pgMin(steps)} دقیقه`}</span>
      </div>
      <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-center text-base font-black mb-2">{title}</div>

      <div className="flex flex-col items-center my-2">
        <div className="relative" style={{ width: 240, height: 240 }}>
          <svg width="240" height="240" viewBox="0 0 240 240" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="120" cy="120" r={R} stroke="#222127" strokeWidth="12" fill="none" />
            <circle cx="120" cy="120" r={R} stroke={col} strokeWidth="12" fill="none" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - (mode === "idle" ? 0 : prog))} style={{ filter: `drop-shadow(0 0 8px ${col})` }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <div style={{ fontFamily: "Vazirmatn, sans-serif", color: col }} className="text-xs font-black mb-1">
              {mode === "done" ? "تمرین تموم شد 🎉" : mode === "idle" ? "آماده؟" : s.type === "prep" ? "آماده‌سازی" : s.type === "rest" ? "استراحت" : "تمرین"}
            </div>
            <div style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6", textShadow: `0 0 18px ${col}88` }} className="text-5xl font-bold">{mode === "idle" ? fmtMMSS(steps[0].dur) : fmtMMSS(left)}</div>
          </div>
        </div>
        {mode !== "idle" && mode !== "done" && (
          <div className="w-full mt-3">
            <ExerciseClip name={s.type === "work" ? s.name : (s.type === "rest" ? s.next : (steps.find((x) => x.type === "work") || {}).name)} exVideos={exVideos} />
          </div>
        )}
        <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-center text-lg font-black mt-3 leading-8 min-h-[3.5rem]">
          {mode === "idle" ? "برای شروع بزن" : mode === "done" ? "آفرین! یه کم کشش بده." : s.type === "rest" ? (s.next ? `بعدی: ${s.next}` : "نفس بگیر") : s.name}
        </div>
        {mode !== "idle" && mode !== "done" && s.type === "work" && s.rounds > 1 && (
          <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs">{`دور ${s.round} از ${s.rounds}`}</div>
        )}
        {mode !== "idle" && mode !== "done" && nextWork && s.type === "work" && (
          <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs mt-1">{`بعدی: ${nextWork}`}</div>
        )}
        {workSteps.length > 1 && <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs mt-1">{`${Math.min(workDone + (s && s.type === "work" ? 1 : 0), workSteps.length)} / ${workSteps.length} حرکت`}</div>}
      </div>

      <div className="flex items-center justify-center gap-3 mt-3">
        {mode === "idle" && (
          <button onClick={start} className="rounded-2xl px-10 py-3.5 text-base" style={{ fontFamily: "Vazirmatn, sans-serif", fontWeight: 900, background: "linear-gradient(135deg,#1C6FD1,#4DA3FF)", color: "#fff", boxShadow: "0 0 18px rgba(77,163,255,0.5)" }}>شروع</button>
        )}
        {mode === "running" && (<>
          <button onClick={prev} className="rounded-2xl px-4 py-3.5 text-sm" style={{ fontFamily: "Vazirmatn, sans-serif", fontWeight: 900, background: "#2a292e", color: "#F3EEE6" }}>قبلی</button>
          <button onClick={pause} className="rounded-2xl px-8 py-3.5 text-base" style={{ fontFamily: "Vazirmatn, sans-serif", fontWeight: 900, background: "#F3EEE6", color: "#0B0B0D" }}>توقف</button>
          <button onClick={skip} className="rounded-2xl px-4 py-3.5 text-sm" style={{ fontFamily: "Vazirmatn, sans-serif", fontWeight: 900, background: "#2a292e", color: "#F3EEE6" }}>بعدی</button>
        </>)}
        {mode === "paused" && (<>
          <button onClick={resume} className="rounded-2xl px-8 py-3.5 text-base" style={{ fontFamily: "Vazirmatn, sans-serif", fontWeight: 900, background: "linear-gradient(135deg,#1C6FD1,#4DA3FF)", color: "#fff" }}>ادامه</button>
          <button onClick={reset} className="rounded-2xl px-5 py-3.5 text-sm" style={{ fontFamily: "Vazirmatn, sans-serif", fontWeight: 900, background: "#2a292e", color: "#F3EEE6" }}>از اول</button>
        </>)}
        {mode === "done" && (
          <button onClick={reset} className="rounded-2xl px-8 py-3.5 text-base" style={{ fontFamily: "Vazirmatn, sans-serif", fontWeight: 900, background: "#F3EEE6", color: "#0B0B0D" }}>دوباره</button>
        )}
      </div>
      {extra}
    </div>
  );
}

// پیش‌نمایش ترتیب حرکت‌ها (قبل از شروع)
function ProgramMoveList({ steps }) {
  const works = steps.filter((x) => x.type === "work");
  return (
    <div className="rounded-xl p-3 mb-4" style={{ background: "#17161A", border: "1px solid #2a292e" }}>
      <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs font-black mb-2">{`حرکت‌ها (${works.length})`}</div>
      <div className="flex flex-col gap-1">
        {works.map((w, i) => (
          <div key={i} style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs leading-6">{`${i + 1}. ${w.name} — ${w.dur >= 60 ? Math.round(w.dur / 60) + " دقیقه" : w.dur + " ثانیه"}`}</div>
        ))}
      </div>
    </div>
  );
}

// AMRAP: شمارش معکوس کل زمان + شمارنده‌ی دور
function AmrapPlayer({ program, onExit, exVideos }) {
  const steps = useMemo(() => [{ type: "prep", name: "آماده شو", dur: PG_PREP }, { type: "work", name: "AMRAP", dur: program.total, round: 1, rounds: 1 }], [program]);
  const [rounds, setRounds] = useState(0);
  const extra = (
    <div className="mt-4 rounded-xl p-3" style={{ background: "#17161A", border: "1px solid #4DA3FF" }}>
      <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#4DA3FF" }} className="text-xs font-black mb-2">در هر دور:</div>
      {program.items.map((it, i) => (<div key={i}><ExerciseClip name={it} exVideos={exVideos} height={120} /><div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm leading-7">{it}</div></div>))}
      <div className="flex items-center justify-center gap-4 mt-3">
        <button onClick={() => setRounds((r) => Math.max(0, r - 1))} className="rounded-xl w-11 h-11 text-xl font-black" style={{ background: "#2a292e", color: "#F3EEE6" }}>−</button>
        <div style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6" }} className="text-3xl font-bold w-24 text-center">{rounds}<span style={{ fontFamily: "Vazirmatn, sans-serif", fontSize: 12, color: "#F3EEE6" }}>{" دور"}</span></div>
        <button onClick={() => setRounds((r) => r + 1)} className="rounded-xl w-11 h-11 text-xl font-black" style={{ background: "#4DA3FF", color: "#0B0B0D" }}>+</button>
      </div>
    </div>
  );
  return <ProgramPlayer title={program.name} steps={steps} onExit={onExit} extra={extra} exVideos={exVideos} />;
}

// برنامه‌ی ست و تکرار: چک‌لیست + تایمر استراحت
function ListWorkout({ program, onExit, exVideos, onComplete }) {
  const [done, setDone] = useState({});
  const completedRef = useRef(false);
  const [restLeft, setRestLeft] = useState(0);
  const audioRef = useRef(null);
  const restSec = program.rest || 60;
  useEffect(() => {
    if (restLeft <= 0) return undefined;
    const id = setTimeout(() => {
      const n = restLeft - 1;
      if (n <= 3 && n > 0) { try { (audioRef.current || (audioRef.current = makeTimerAudio())).tick(); } catch {} }
      if (n === 0) { try { (audioRef.current || (audioRef.current = makeTimerAudio())).bell(1); navigator.vibrate && navigator.vibrate(300); } catch {} }
      setRestLeft(n);
    }, 1000);
    return () => clearTimeout(id);
  }, [restLeft]);
  useEffect(() => () => { try { audioRef.current && audioRef.current.close(); } catch {} }, []);
  const startRest = () => { try { (audioRef.current || (audioRef.current = makeTimerAudio())).unlock(); } catch {} setRestLeft(restSec); };
  const count = Object.values(done).filter(Boolean).length;
  useEffect(() => { if (count >= program.items.length && count > 0 && !completedRef.current) { completedRef.current = true; onComplete && onComplete(); } }, [count]);
  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6" dir={APP_DIR}>
      <button onClick={onExit} style={{ color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" }} className="text-sm rounded-lg px-3 py-1.5 font-bold inline-block mb-3">{"› بازگشت"}</button>
      <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-base font-black mb-1">{program.name}</div>
      <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs leading-6 mb-3">{program.desc}</div>
      <div className="flex flex-col gap-2 mb-4">
        {program.items.map((it, i) => (
          <div key={i}>
          <ExerciseClip name={it} exVideos={exVideos} height={150} />
          <button onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))} className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-right"
            style={{ background: done[i] ? "rgba(77,163,255,0.12)" : "#17161A", border: `1px solid ${done[i] ? "#4DA3FF" : "#2a292e"}` }}>
            <span className="rounded-full flex items-center justify-center shrink-0" style={{ width: 24, height: 24, border: `2px solid ${done[i] ? "#4DA3FF" : "#55535a"}`, background: done[i] ? "#4DA3FF" : "transparent", color: "#0B0B0D", fontWeight: 900, fontSize: 14 }}>{done[i] ? "✓" : ""}</span>
            <span style={{ fontFamily: "Vazirmatn, sans-serif", color: done[i] ? "#8A8790" : "#F3EEE6", textDecoration: done[i] ? "line-through" : "none" }} className="text-sm font-bold">{it}</span>
          </button>
          </div>
        ))}
      </div>
      <div className="rounded-2xl p-4 text-center" style={{ background: "#17161A", border: "1px solid #4DA3FF", boxShadow: "0 0 14px rgba(77,163,255,0.3)" }}>
        <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#4DA3FF" }} className="text-xs font-black mb-1">{`تایمر استراحت بین ست‌ها (${restSec} ثانیه)`}</div>
        <div style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6" }} className="text-4xl font-bold mb-2">{fmtMMSS(restLeft || restSec)}</div>
        {restLeft > 0 ? (
          <button onClick={() => setRestLeft(0)} className="rounded-xl px-6 py-2.5 text-sm font-bold" style={{ fontFamily: "Vazirmatn, sans-serif", background: "#2a292e", color: "#F3EEE6" }}>لغو</button>
        ) : (
          <button onClick={startRest} className="rounded-xl px-6 py-2.5 text-sm font-bold" style={{ fontFamily: "Vazirmatn, sans-serif", background: "linear-gradient(135deg,#1C6FD1,#4DA3FF)", color: "#fff" }}>شروع استراحت</button>
        )}
      </div>
      <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs text-center mt-3">{`${count} از ${program.items.length} حرکت انجام شد`}</div>
    </div>
  );
}

function ProgramsScreen({ onBack, isAdmin, authToken, plan, onSubscribe, initialCat }) {
  const canOpen = (c) => isAdmin || PG_FREE.includes(c.id) || plan === "silver";
  const initC = initialCat ? PG_DATA.find((x) => x.id === initialCat) : null;
  const [lockedCat, setLockedCat] = useState(initC && !canOpen(initC) ? initC : null);
  const [exVideos, setExVideos] = useState({});
  useEffect(() => { let alive = true; apiFetchExerciseVideos().then((m) => { if (alive && m) setExVideos(m); }); return () => { alive = false; }; }, []);
  const onVideoChanged = (k, url) => setExVideos((m) => { const n = { ...m }; if (url) n[k] = url; else delete n[k]; return n; });
  const [cat, setCat] = useState(initC && canOpen(initC) ? initC : null);
  const [prog, setProg] = useState(null);
  const [playing, setPlaying] = useState(false);

  const hdr = (backFn, title) => (
    <div className="flex items-center justify-between mb-3">
      <button onClick={backFn} style={{ color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" }} className="text-sm rounded-lg px-3 py-1.5 font-bold inline-block">{"› بازگشت"}</button>
      <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-black">{title}</span>
    </div>
  );

  // ۱) پخش‌کننده
  if (prog && playing) {
    if (prog.mode === "amrap") return <AmrapPlayer program={prog} onExit={() => setPlaying(false)} exVideos={exVideos} />;
    if (prog.mode === "list") return <ListWorkout program={prog} onExit={() => setPlaying(false)} exVideos={exVideos} />;
    return <ProgramPlayer title={prog.name} steps={pgBuildSteps(prog)} onExit={() => setPlaying(false)} exVideos={exVideos} />;
  }

  // ۲) جزئیات برنامه
  if (prog) {
    const steps = prog.mode === "interval" ? pgBuildSteps(prog) : null;
    return (
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6" dir={APP_DIR}>
        {hdr(() => setProg(null), cat.title)}
        <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-lg font-black mb-1">{prog.name}</div>
        <div className="flex items-center gap-2 mb-2">
          <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ fontFamily: "Vazirmatn, sans-serif", background: `color-mix(in srgb, ${PG_LEVEL_COLOR[prog.level]} 13%, #17161A)`, color: PG_LEVEL_COLOR[prog.level], border: `1px solid ${PG_LEVEL_COLOR[prog.level]}` }}>{prog.level}</span>
          {steps && <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs">{`حدود ${pgMin(steps)} دقیقه`}</span>}
          {prog.mode === "amrap" && <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs">{`${Math.round(prog.total / 60)} دقیقه`}</span>}
        </div>
        <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm leading-7 mb-4">{prog.desc}</div>
        {steps && <ProgramMoveList steps={steps} />}
        {prog.mode !== "interval" && (
          <div className="rounded-xl p-3 mb-4" style={{ background: "#17161A", border: "1px solid #2a292e" }}>
            <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs font-black mb-2">{prog.mode === "amrap" ? "حرکت‌های هر دور" : "حرکت‌ها"}</div>
            {prog.items.map((it, i) => (<div key={i} style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs leading-6">{`${i + 1}. ${it}`}</div>))}
          </div>
        )}
        {isAdmin && (
          <ExerciseVideoAdmin
            names={prog.mode === "interval" ? pgBuildSteps(prog).filter((x) => x.type === "work").map((x) => x.name) : prog.items}
            exVideos={exVideos} authToken={authToken} onChanged={onVideoChanged}
          />
        )}
        <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-[11px] leading-5 mb-4">{PG_SAFETY}</div>
        <button onClick={() => setPlaying(true)} className="w-full rounded-xl py-3.5 text-sm font-bold" style={{ fontFamily: "Vazirmatn, sans-serif", background: `linear-gradient(135deg, ${cat.color}, ${cat.color}CC)`, color: "#fff", boxShadow: `0 0 18px ${cat.color}77` }}>شروع تمرین</button>
      </div>
    );
  }

  // ۳) لیست برنامه‌های یک سیستم
  if (cat) {
    return (
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6" dir={APP_DIR}>
        {hdr(() => setCat(null), "برنامه‌های تمرینی")}
        <div className="flex items-center gap-3 mb-2">
          <span style={{ fontSize: 30 }}>{cat.icon}</span>
          <span style={{ fontFamily: "Vazirmatn, sans-serif", color: cat.color }} className="text-lg font-black">{cat.title}</span>
        </div>
        <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm leading-7 mb-4">{cat.desc}</div>
        <div className="flex flex-col gap-2.5">
          {cat.programs.map((p) => (
            <button key={p.id} onClick={() => setProg(p)} className="rounded-xl px-4 py-3.5 text-right flex items-center justify-between gap-3" style={{ background: "#17161A", border: `1px solid ${cat.color}`, boxShadow: `0 0 12px ${cat.color}44` }}>
              <span className="flex flex-col gap-1">
                <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-black">{p.name}</span>
                <span style={{ fontFamily: "Vazirmatn, sans-serif", color: PG_LEVEL_COLOR[p.level] }} className="text-[11px] font-bold">{p.level}</span>
              </span>
              <span style={{ color: cat.color, fontSize: 22 }}>{"‹"}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ۴) لیست سیستم‌های تمرینی (باکس‌ها)
  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6" dir={APP_DIR}>
      <div className="flex items-center justify-between mb-3">
        <button onClick={onBack} style={{ color: "#0B0B0D", fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE" }} className="text-sm rounded-lg px-3 py-1.5 font-bold inline-block">{"› بازگشت"}</button>
      </div>
      <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xl font-black mb-1">برنامه‌های تمرینی</div>
      <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs leading-6 mb-4">سیستم تمرینی مورد نظرت رو انتخاب کن و با تایمر همراه تمرین کن.</div>
      <div className="grid grid-cols-2 gap-3">
        {PG_DATA.map((c) => (
          <button key={c.id} onClick={() => (canOpen(c) ? setCat(c) : setLockedCat(c))} className="relative rounded-2xl p-3.5 text-center flex flex-col items-center justify-center gap-2" style={{ minHeight: 190, opacity: canOpen(c) ? 1 : 0.85, background: `linear-gradient(145deg, color-mix(in srgb, ${c.color} 15%, #17161A), #17161A 70%)`, border: `1px solid ${c.color}`, boxShadow: `0 0 16px ${c.color}55, inset 0 0 14px ${c.color}18` }}>
            {c.img ? (
              <img src={c.img} alt="" draggable={false} style={{ height: 112, width: "auto", maxWidth: "100%", objectFit: "contain", filter: `drop-shadow(0 4px 10px ${c.color}66)` }} />
            ) : (
              <span style={{ fontSize: 56, height: 112, display: "flex", alignItems: "center", filter: `drop-shadow(0 0 8px ${c.color})` }}>{c.icon}</span>
            )}
            <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-black leading-5">{c.title}</span>
            <span style={{ fontFamily: "Vazirmatn, sans-serif", color: c.color }} className="text-[10px] font-bold">{`${c.programs.length} برنامه`}</span>
            {!canOpen(c) && <span className="absolute top-2 left-2 text-base" style={{ filter: "drop-shadow(0 0 4px #000)" }}>🔒</span>}
            {PG_FREE.includes(c.id) && !isAdmin && plan !== "silver" && <span className="absolute top-2 left-2 rounded-full px-2 py-0.5 text-[9px] font-black" style={{ fontFamily: "Vazirmatn, sans-serif", background: "#4DA3FF", color: "#0B0B0D" }}>رایگان</span>}
          </button>
        ))}
      </div>
      <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-[11px] leading-5 mt-5">{PG_SAFETY}</div>
      {lockedCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: "rgba(0,0,0,0.75)" }} onClick={() => setLockedCat(null)}>
          <div className="w-full rounded-2xl p-5 text-center" dir={APP_DIR} style={{ maxWidth: 320, background: "#17161A", border: "1px solid #F3EEE6", boxShadow: "0 0 22px rgba(243,238,230,0.35)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 38 }}>🔒</div>
            <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-base font-black mt-1 mb-2">{lockedCat.title}</div>
            <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm leading-7 mb-4">این بخش با خرید «اشتراک دوره اول» باز می‌شه. فقط تاباتا برای همه رایگانه.</div>
            <button onClick={() => { setLockedCat(null); onSubscribe && onSubscribe(); }} className="w-full rounded-xl py-3 text-sm font-bold mb-2" style={{ fontFamily: "Vazirmatn, sans-serif", background: "linear-gradient(135deg, #8F1019, #D91E2B)", color: "#FFFFFF" }}>مشاهده اشتراک</button>
            <button onClick={() => setLockedCat(null)} className="w-full rounded-xl py-2.5 text-sm font-bold" style={{ fontFamily: "Vazirmatn, sans-serif", background: "#2a292e", color: "#F3EEE6" }}>بستن</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- مسیر پیشرفت ۱۰۰ روزه: موتور ساخت برنامه ----------
const JR_WEEKDAYS = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
const jrFa = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
const JR_DEFAULT = { level: 0, track: "strength", freq: 7, gender: "m", goal: "fit", equip: "none", minutes: 45 };
const JR_TOTAL_DAYS = 100;

// ---- بانک تمرین‌ها ----
const JR_POOL = {
  none: {
    push: [
      ["شنا روی زانو", "شنا با شیب (دست روی میز)", "شنا دست‌پهن روی زانو", "شنا استاندارد (هر چقدر می‌تونی)", "دیپ روی صندلی"],
      ["شنا استاندارد", "شنا الماسی", "شنا پایه‌بلند", "دیپ روی صندلی", "شنا با مکث پایین"],
      ["شنا انفجاری", "شنا الماسی", "شنا پایک (شانه)", "شنا پایه‌بلند", "شنا آهسته (۳ ثانیه پایین)"],
    ],
    pull: [
      ["ردیف معکوس زیر میز", "سوپرمن", "ردیف با حوله", "جلو بازو با حوله (مقاومتی)"],
      ["ردیف معکوس زیر میز", "بارفیکس منفی (آهسته پایین)", "سوپرمن با مکث", "جلو بازو با حوله (مقاومتی)"],
      ["بارفیکس", "بارفیکس منفی آهسته", "ردیف تک‌دست با کیف سنگین", "سوپرمن با مکث"],
    ],
    legs: [
      ["اسکات", "لانج عقب", "پل باسن", "اسکات دیوار", "ساق پا ایستاده"],
      ["اسکات بلغاری", "لانج جهشی", "پل باسن تک‌پا", "اسکات با مکث", "ساق پا تک‌پا"],
      ["اسکات پرشی", "اسکات تک‌پا (پیستول با کمک)", "لانج واکینگ", "پل باسن تک‌پا با مکث", "اسکات بلغاری آهسته"],
    ],
    glute: ["پل باسن", "کیک‌بک چهارنقطه", "حرکت پا به‌پهلو (خوابیده)", "اسکات سومو", "پل باسن تک‌پا"],
    shoulder: ["نشر جانب با بطری آب", "شنا پایک", "چرخش شانه با حوله", "شراگ با کیف"],
  },
  gym: {
    push: [
      ["پرس سینه دمبل", "پرس بالا سینه دمبل", "پرس سرشانه دمبل", "نشر از جانب", "پشت بازو سیم‌کش"],
      ["پرس سینه هالتر", "پرس بالا سینه دمبل", "پرس سرشانه هالتر", "نشر از جانب", "دیپ", "پشت بازو سیم‌کش"],
      ["پرس سینه هالتر", "پرس بالا سینه هالتر", "پرس سرشانه ایستاده", "نشر از جانب سیم‌کش", "دیپ با وزنه", "فلای سینه"],
    ],
    pull: [
      ["لت‌پول", "زیربغل سیم‌کش", "فِیس‌پول", "جلو بازو دمبل"],
      ["لت‌پول", "زیربغل هالتر خم", "زیربغل سیم‌کش", "فِیس‌پول", "جلو بازو هالتر"],
      ["بارفیکس", "زیربغل هالتر خم", "ردیف تک‌دست دمبل", "فِیس‌پول", "جلو بازو چکشی", "شراگ"],
    ],
    legs: [
      ["اسکات گابلت", "پرس پا", "رومانیایی ددلیفت با دمبل", "لانج دمبل", "ساق پا"],
      ["اسکات هالتر", "پرس پا", "رومانیایی ددلیفت", "لانج دمبل", "جلو پا", "پشت پا"],
      ["اسکات هالتر", "ددلیفت", "پرس پا", "لانج واکینگ با دمبل", "پشت پا", "ساق پا"],
    ],
    glute: ["هیپ‌تراست", "اسکات سومو", "کیک‌بک سیم‌کش", "رومانیایی ددلیفت", "پل باسن با هالتر"],
    shoulder: ["نشر از جانب سیم‌کش", "پرس سرشانه دمبل", "نشر خم به عقب", "شراگ دمبل"],
  },
};
const JR_POWER = {
  none: ["شنا انفجاری", "اسکات پرشی", "برپی", "پرش روی پله/جعبه", "چرخش پرتاب کیف شنی"],
  gym: ["پرتاب توپ مدیسین به دیوار", "سوئینگ کتل‌بل", "اسکات پرشی سبک", "چرخش مدیسین‌بال (پرتاب چرخشی)", "ددلیفت سبک سریع"],
};
const JR_CORE = [
  ["پلانک", "دراز و نشست دوچرخه‌ای", "بالا آوردن پا", "پلانک کناری راست", "پلانک کناری چپ", "دددباگ (Dead Bug)"],
  ["پلانک", "چرخش روسی", "بالا آوردن پا", "پلانک با لمس شانه", "کوهنورد آرام", "پلانک کناری راست", "پلانک کناری چپ"],
  ["پلانک با لمس شانه", "V-up", "چرخش روسی با وزنه", "کوهنورد سریع", "بالا آوردن پا آویزان (یا روی زمین)", "پلانک کناری با بالا بردن پا"],
];
const JR_HIIT = [
  ["جامپینگ‌جک", "اسکات", "شنا روی زانو", "کوهنورد آرام", "پلانک‌جک", "زانو بالا", "لانج متناوب"],
  ["برپی (نیم)", "اسکات پرشی", "شنا", "کوهنورد", "لانج جهشی", "اسکی‌باز", "زانو بالا سریع"],
  ["برپی کامل", "اسکات پرشی", "شنا انفجاری", "کوهنورد سریع", "لانج جهشی", "V-up", "برپی با شنا"],
];
const JR_BOXCOND = ["سایه‌بوکس سریع", "طناب‌زنی", "جَب-کراس سرعتی", "هوک-آپرکات پیوسته", "اسلیپ-رول ریتمیک", "برپی", "پیوت و ضربه", "زانو بالا + جَب"];
const JR_WARM = ["چرخش گردن و شانه", "چرخش مچ و آرنج", "چرخش کمر و لگن", "زانو بالا (درجا)", "پاشنه به باسن", "جامپینگ‌جک سبک", "سایه‌بوکس خیلی سبک"];
const JR_COOL = ["کشش گردن", "کشش شانه و سینه", "کشش پشت (گربه-گاو)", "کشش جلو ران", "کشش پشت ران", "کشش ساق", "کشش باسن", "تنفس عمیق (ریکاوری)"];

// ---- ضربات و دفاع (سیستم شماره‌گذاری بوکس: ۱=جَب ۲=کراس ۳=هوک جلو ۴=هوک عقب ۵=آپرکات جلو ۶=آپرکات عقب) ----
const JR_COMBOS = [
  ["۱-۲ (جَب-کراس)", "۱-۱-۲", "۱-۲-۳ (جَب-کراس-هوک)", "۲-۳-۲", "۱-۲-۵-۲", "۱-۲ و بعدش خروج با پا"],
  ["۱-۲-۳-۲", "۱-۲-۳-۴", "۱-۲-اسلیپ-۲", "۱-۱-۲-۳-۲", "۲-۳-۶-۳", "۱-۲-رول-۳-۲", "۱-۲-۵-۶-۳"],
  ["۱-۲-۳-۲-رول-۳-۴", "۱-۲-اسلیپ-۲-۳-۲", "۱-۲-۵-۶-۳-۲", "۱-۱-۲-باب‌ویو-۳-۴-۳", "۱-۲-۳-پولبک-۲-۳-۲", "۲-۳-رول-۳-۴-۵-۳", "۱-اسلیپ-۲-رول-۳-۲-پیوت"],
];
const JR_DEFENSE = ["اسلیپ (جاخالی کناری) راست و چپ", "رول (چرخش زیر ضربه‌ی خیالی) به‌شکل U", "باب‌ویو (خم شدن و حرکت زیر ضربه)", "پولبک (عقب کشیدن سر)", "پَری و بلاک (دفع ضربه با دست)", "شولدر رول (چرخش شانه)", "پیوت و زاویه گرفتن"];
const JR_FOOTWORK = ["کار پا: قدم و کشیدن (Step-Drag)", "چرخش دور حریف (ساعتگرد)", "چرخش دور حریف (پادساعتگرد)", "جلو و عقب (In & Out) همراه جَب", "پیوت چپ و راست", "حرکت زیگزاگ (رقص سر و کار پا)"];
const JR_HEADMOVE = ["رقص سر: اسلیپ-اسلیپ-رول بدون ضربه", "رقص سر + جَب بعد هر جاخالی", "رول-باب‌ویو پشت‌سرهم و ریتمیک", "رقص سر با دست‌های بالا (روی ریتم موزیک)"];
const JR_COUNTER = ["اسلیپ راست ← ضدحمله ۲-۳", "پولبک ← ۱-۲ ضد", "رول چپ ← هوک بدن ۳ ← ۲", "پَری ← ۲ ← ۳", "باب‌ویو ← ۳-۲-۳ از زیر"];
const JR_POWERRND = ["قدرت: ۲-۳ سنگین (۱۰ ثانیه تمام قدرت / ۵ ثانیه آرام)", "راند سرعت: ۱-۱-۲ سریع", "ضربات بدن: ۳ بدن-۳ سر-۲", "آپرکات‌های پشت‌سرهم ۵-۶ با ریتم", "ترکیب‌های سنگین ۱-۲-۳-۲ با پرتاب وزن بدن"];
const JR_TIPS = [
  "قبل از تمرین ۱ تا ۲ ساعت قبل یه وعده سبک بخور و حین تمرین آب کافی بنوش.",
  "خواب ۷ تا ۸ ساعته نصف نتیجه‌ی تمرینه؛ امشب زودتر بخواب.",
  "پروتئین کافی (تخم‌مرغ، مرغ، ماهی، حبوبات) بعد از تمرین عضلات رو بازسازی می‌کنه.",
  "تکنیک مهم‌تر از سرعته؛ ضربه‌هات رو کنترل‌شده بزن.",
  "اگه درد مفصل داشتی، حرکت رو قطع کن و استراحت بده.",
  "دست‌ها همیشه نزدیک چانه و چانه پایین؛ حتی وقتی خسته‌ای.",
  "نفس رو با ضربه خارج کن (ش‌ش‌ش) تا زودتر خسته نشی.",
  "هر هفته یه ذره سخت‌تر؛ ولی هیچ‌وقت تمرین رو با خستگی شدید و درد ادامه نده.",
  "یه لیوان آب بعد از بیدار شدن، انرژی روزت رو بالا می‌بره.",
  "نتایجت رو یادداشت کن؛ دیدن پیشرفت بهترین انگیزه‌ست.",
];

// ---- پارامترهای شدت: سطح × فاز ----
// فازها: ۱-۳ پایه‌ریزی | ۵-۷ ساخت | ۹-۱۱ تشدید | ۱۳-۱۵ اوج؛ هفته‌های ۴ و ۸ و ۱۲ هفته‌ی کم‌فشار (ریکاوری)
function jrParams(cfg, w) {
  const L = cfg.level;
  const deload = w % 4 === 0 && w < 15;
  const ph = w <= 3 ? 0 : w <= 7 ? 1 : w <= 11 ? 2 : 3;
  const roundSec = [[120, 120, 150, 150], [150, 180, 180, 180], [180, 180, 180, 180]][L][ph];
  const roundRest = [60, 60, 45][L] - (ph === 3 && L === 2 ? 5 : 0);
  let sets = [[2, 3, 3, 3], [3, 3, 4, 4], [3, 4, 4, 5]][L][ph] - (deload ? 1 : 0);
  let reps = [[12, 12, 10, 10], [12, 10, 8, 8], [10, 8, 6, 6]][L][ph];
  let rest = [60, 75, 90][L];
  if (cfg.goal === "fatloss") { reps += 3; rest -= 15; }
  else if (cfg.goal === "muscle") { rest += 15; reps = Math.max(6, reps); }
  else if (cfg.goal === "fight") { reps = Math.max(5, reps - 2); }
  const hw = [[[30, 30], [35, 25], [40, 20], [40, 20]], [[40, 20], [40, 20], [45, 15], [45, 15]], [[45, 15], [45, 15], [50, 10], [50, 10]]][L][ph];
  const endMin = [[15, 20, 25, 30], [20, 25, 35, 40], [30, 40, 45, 55]][L][ph] * (deload ? 0.7 : 1);
  return { L, w, ph, deload, roundSec, roundRest, sets: Math.max(2, sets), reps, rest, hiitWork: hw[0], hiitRest: hw[1], endMin: Math.round(endMin), plankSec: 30 + ph * 8 + L * 6 };
}

const jrClamp = (v, a, b) => Math.max(a, Math.min(b, v));
function jrPick(arr, k, seed) {
  const out = [];
  const n = arr.length;
  for (let i = 0; i < Math.min(k, n); i++) out.push(arr[(seed * 2 + i) % n]);
  return out;
}

// ---- بلوک‌ساز‌ها: هرکدوم {title, kind, program, minutes} برمی‌گردونن ----
// program برای پخش‌کننده: interval → {name, mode:"interval", blocks}  |  list → {name, mode:"list", items, rest, desc}
function jrMinutes(program) {
  if (program.mode === "interval") {
    const steps = pgBuildSteps(program);
    return Math.max(1, Math.round(steps.reduce((a, s) => a + s.dur, 0) / 60));
  }
  const sets = program._sets || 3;
  return Math.round(program.items.length * (sets * (0.75 + (program.rest || 60) / 60)));
}
function jrIntervalBlock(title, blocks, desc) {
  const program = { name: title, mode: "interval", blocks, desc: desc || "" };
  return { title, kind: "interval", program, minutes: jrMinutes(program) };
}

function jrWarm() {
  return jrIntervalBlock("گرم‌کردن", [{ ex: JR_WARM, work: 35, rest: 5, rounds: 1 }], "بدنت رو آماده کن؛ این بخش رو حذف نکن.");
}
function jrCool() {
  return jrIntervalBlock("سردکردن و کشش", [{ ex: JR_COOL.slice(0, 6), work: 30, rest: 5, rounds: 1 }], "ضربان رو پایین بیار و عضلات رو بکش.");
}

function jrStrength(kind, cfg, P, seed, budget) {
  const eq = cfg.equip === "gym" ? "gym" : "none";
  const pool = JR_POOL[eq];
  const L = cfg.level;
  const f = cfg.gender === "f";
  let list = [];
  const take = (arr, k) => jrPick(arr, k, seed);
  if (kind === "push") list = take(pool.push[L], 5);
  else if (kind === "pull") list = take(pool.pull[L], 5);
  else if (kind === "legs") list = take(f ? [...pool.glute.slice(0, 2), ...pool.legs[L]] : pool.legs[L], 5);
  else if (kind === "upper") list = [...take(pool.push[L], 3), ...take(pool.pull[L], 3)];
  else if (kind === "lower") list = [...take(pool.legs[L], 4), ...take(pool.glute, 2)];
  else if (kind === "circuit") list = [...take(pool.legs[L], 2), ...take(pool.push[L], 2), ...take(pool.pull[L], 2)];
  else list = [pool.legs[L][seed % pool.legs[L].length], pool.push[L][seed % pool.push[L].length], pool.pull[L][seed % pool.pull[L].length], pool.legs[L][(seed + 1) % pool.legs[L].length], pool.push[L][(seed + 2) % pool.push[L].length], pool.pull[L][(seed + 1) % pool.pull[L].length]];
  // نیم‌نگاه جنسیتی: بانوان ← تمرکز روی پایین‌تنه و مرکز بدن؛ آقایان ← شانه و بازو
  if (f && (kind === "push" || kind === "upper")) list.push(take(pool.glute, 1)[0]);
  if (!f && (kind === "pull" || kind === "push" || kind === "upper")) list.push(take(pool.shoulder, 1)[0]);
  const seen = new Set();
  list = list.filter((x) => (seen.has(x) ? false : (seen.add(x), true)));
  const perEx = P.sets * (0.75 + P.rest / 60);
  const n = jrClamp(Math.floor(budget / perEx), 3, Math.min(6, list.length));
  list = list.slice(0, n);
  const isTimed = (nm) => /^پلانک/.test(nm) || /مکث$/.test(nm) && false;
  const items = list.map((nm) => (isTimed(nm) ? `${nm} — ${jrFa(P.sets)}×${jrFa(P.plankSec)} ثانیه` : `${nm} — ${jrFa(P.sets)}×${jrFa(P.reps)}`));
  const names = { push: "قدرت: هل دادن (سینه، شانه، پشت بازو)", pull: "قدرت: کشیدن (پشت و جلو بازو)", legs: "قدرت: پا و باسن", upper: "قدرت: بالاتنه", lower: "قدرت: پایین‌تنه و باسن", circuit: "قدرت: سیرکویت تمام‌بدن", full: "قدرت: تمام‌بدن" };
  const title = names[kind] || "قدرت";
  const desc = `${jrFa(P.sets)} ست، بین ست‌ها ${jrFa(P.rest)} ثانیه استراحت. وزنه رو طوری انتخاب کن که ۲ تکرار آخر سخت باشه ولی تکنیک خراب نشه.${P.deload ? " (هفته‌ی سبک: وزنه و ست کمتر)" : ""}`;
  const program = { name: title, mode: "list", items, rest: P.rest, desc, _sets: P.sets };
  return { title, kind: "list", program, minutes: jrMinutes(program) };
}

function jrCore(cfg, P, seed, budget) {
  const L = cfg.level;
  const work = [35, 40, 45][L] + P.ph * 2;
  const rest = 15;
  const per = (work + rest) / 60;
  const rounds = jrClamp(Math.floor(budget / (per * 5)), 1, 3);
  const ex = jrPick(JR_CORE[L], 5, seed);
  return jrIntervalBlock("شکم و مرکز بدن", [{ ex, work, rest, rounds }], "مرکز بدن = قدرت ضربه و تعادل.");
}

function jrHiit(cfg, P, seed, budget, boxy) {
  const L = cfg.level;
  const pool = boxy ? [...JR_BOXCOND, ...JR_HIIT[L].slice(0, 3)] : JR_HIIT[L];
  const ex = jrPick(pool, 5, seed);
  const per = (5 * (P.hiitWork + P.hiitRest)) / 60;
  const rounds = jrClamp(Math.floor(budget / per), 1, 5);
  const title = boxy ? "کاندیشنینگ تناوبی بوکس" : `HIIT ${jrFa(P.hiitWork)}/${jrFa(P.hiitRest)}`;
  return jrIntervalBlock(title, [{ ex, work: P.hiitWork, rest: P.hiitRest, rounds, restAfter: 45 }], "تا جای ممکن شدید کار کن؛ استراحت‌ها رو کامل بگیر.");
}

function jrTabata(cfg, P, seed, budget) {
  const L = cfg.level;
  const pool = JR_HIIT[L];
  const nBlocks = jrClamp(Math.floor(budget / 5), 1, 3);
  const blocks = [];
  for (let i = 0; i < nBlocks; i++) blocks.push({ ex: [pool[(seed + i * 2) % pool.length], pool[(seed + i * 2 + 1) % pool.length]], work: 20, rest: 10, rounds: 4, restAfter: 60 });
  return jrIntervalBlock("تاباتا", blocks, "۲۰ ثانیه تمام قدرت، ۱۰ ثانیه استراحت.");
}

function jrEndurance(kind, cfg, P, budget) {
  const L = cfg.level;
  const total = Math.round(jrClamp(Math.min(P.endMin, budget), 8, 70));
  if (kind === "tempo") {
    const hard = Math.max(4, total - 10);
    const p = { name: "تمپو", mode: "interval", blocks: [{ ex: ["گرم‌کردن آرام (۵ دقیقه)"], work: 300, rest: 0, rounds: 1 }, { ex: [`تمپو: شدت نسبتاً سخت (${jrFa(hard)} دقیقه)`], work: hard * 60, rest: 0, rounds: 1 }, { ex: ["سرد کردن آرام (۵ دقیقه)"], work: 300, rest: 0, rounds: 1 }], desc: "شدتی که فقط جمله‌های کوتاه بتونی بگی." };
    return { title: "دویدن/طناب تمپو", kind: "interval", program: p, minutes: jrMinutes(p) };
  }
  if (kind === "intervals") {
    const hardMin = [1, 2, 3][L];
    const n = jrClamp(Math.floor(budget / (hardMin + 1.5)), 3, 8);
    const p = { name: "تناوبی استقامتی", mode: "interval", blocks: [{ ex: ["شدت بالا (دویدن/طناب/دوچرخه)"], work: hardMin * 60, rest: 90, rounds: n }], desc: "هر دور شدید، بعدش آرام راه برو." };
    return { title: `تناوبی استقامتی ${jrFa(n)}×${jrFa(hardMin)} دقیقه`, kind: "interval", program: p, minutes: jrMinutes(p) };
  }
  if (kind === "ladder") {
    const p = { name: "نردبان", mode: "interval", blocks: [{ ex: ["۱ دقیقه سخت", "۲ دقیقه سخت", "۳ دقیقه سخت", "۲ دقیقه سخت", "۱ دقیقه سخت"], work: 120, rest: 90, rounds: 1 }], desc: "سرعت رو با زمان تنظیم کن؛ استراحت: راه رفتن." };
    return { title: "نردبان شدت (۱-۲-۳-۲-۱)", kind: "interval", program: p, minutes: jrMinutes(p) };
  }
  const p = { name: "استقامتی ملایم", mode: "interval", blocks: [{ ex: ["دویدن آرام / طناب / دوچرخه (باید بتونی صحبت کنی)"], work: total * 60, rest: 0, rounds: 1 }], desc: "شدت متوسط و پیوسته؛ پایه‌ی استقامت بوکسور." };
  return { title: `استقامت ملایم ${jrFa(total)} دقیقه`, kind: "interval", program: p, minutes: jrMinutes(p) };
}

// ---- راندهای بوکس: تکنیک، ترکیب، دفاع (رقص سر)، ضربه‌ی قدرتی، هوازی، استقامتی ----
function jrBoxing(style, cfg, P, seed, budget) {
  const L = cfg.level;
  const per = (P.roundSec + P.roundRest) / 60;
  let n = jrClamp(Math.floor(budget / per), 2, 12);
  if (P.deload) n = Math.max(2, n - 1);
  const combos = JR_COMBOS[L];
  const c = (i) => combos[(seed + i) % combos.length];
  const pickFrom = (arr, i) => arr[(seed + i) % arr.length];
  const rounds = [];
  for (let i = 0; i < n; i++) {
    let t;
    if (i === 0) t = "گرم‌کردن سبک (۷۰٪ قدرت): جَب و کار پا";
    else if (style === "technique") t = [`ترکیب ${c(i)}`, pickFrom(JR_FOOTWORK, i), `ترکیب ${c(i + 1)} + ${pickFrom(JR_DEFENSE, i)}`][i % 3];
    else if (style === "combos") t = `ترکیب ${c(i)} → ${c(i + 2)} (پشت‌سرهم)`;
    else if (style === "defense") t = [pickFrom(JR_DEFENSE, i), pickFrom(JR_HEADMOVE, i), pickFrom(JR_COUNTER, i)][i % 3];
    else if (style === "power") t = pickFrom(JR_POWERRND, i);
    else if (style === "cardio") t = [`سرعتی: ${c(i)} + طناب‌زنی بین ترکیب‌ها`, "سایه‌بوکس پرتحرک و بدون توقف", `ریتمیک: ${c(i)} + ${pickFrom(JR_HEADMOVE, i)}`][i % 3];
    else t = [`استقامتی: ${c(i)} با ریتم ثابت`, pickFrom(JR_FOOTWORK, i) + " + جَب-کراس مداوم", `ترکیب ${c(i + 1)} + ${pickFrom(JR_DEFENSE, i)}`][i % 3];
    rounds.push(`راند ${jrFa(i + 1)}: ${t}`);
  }
  if (n >= 4 && L >= 1 && style !== "defense") rounds[n - 1] = `راند ${jrFa(n)} (آخر): همه‌چی! ترکیب ${c(0)} + ${c(3)} با تمام قدرت`;
  const titles = { technique: "بوکس: تکنیک و کار پا", combos: "بوکس: ترکیب ضربات", defense: "بوکس: دفاع و رقص سر (اسلیپ، رول)", power: "بوکس: ضربات قدرتی", cardio: "بوکس هوازی (راندهای سریع)", stamina: "بوکس استقامتی (راندهای بلند)" };
  const title = titles[style];
  const desc = "سیستم شماره‌گذاری: ۱=جَب ۲=کراس ۳=هوک جلو ۴=هوک عقب ۵=آپرکات جلو ۶=آپرکات عقب. روی کیسه یا سایه‌بوکس انجام بده.";
  return jrIntervalBlock(title, [{ ex: rounds, work: P.roundSec, rest: P.roundRest, rounds: 1 }], desc);
}

function jrRecovery(seed) {
  const p = { name: "ریکاوری فعال", mode: "interval", blocks: [{ ex: ["پیاده‌روی سبک (۱۵ دقیقه)"], work: 900, rest: 0, rounds: 1 }, { ex: JR_COOL, work: 40, rest: 5, rounds: 1 }], desc: "فشار نیار؛ هدف: بازسازی عضلات و رفع خستگی." };
  return { title: "ریکاوری فعال", kind: "interval", program: p, minutes: jrMinutes(p) };
}
function jrRestDay(seed) {
  const p = { name: "استراحت فعال", mode: "interval", blocks: [{ ex: ["پیاده‌روی سبک (۲۰ دقیقه)"], work: 1200, rest: 0, rounds: 1 }, { ex: JR_COOL.slice(0, 6), work: 35, rest: 5, rounds: 1 }], desc: "امروز روز استراحته؛ فقط ۲۰ دقیقه راه برو و کشش بده. این هم یه جلسه حساب می‌شه!" };
  return { title: "استراحت فعال", kind: "interval", program: p, minutes: jrMinutes(p) };
}
function jrTestBlock(P) {
  const p = {
    name: "تست‌های هفته", mode: "interval",
    blocks: [{ ex: ["تست شنا: حداکثر تکرار در ۶۰ ثانیه", "تست اسکات: حداکثر تکرار در ۶۰ ثانیه", "تست پلانک: تا حداکثر زمان (۶۰ ثانیه)", "تست طناب/سایه‌بوکس سرعتی ۶۰ ثانیه"], work: 60, rest: 90, rounds: 1 }],
    desc: "هر تست رو با تمام قدرت انجام بده و نتیجه‌ات رو بعدش ثبت کن.",
  };
  return { title: "تست‌های هفته", kind: "interval", program: p, minutes: jrMinutes(p) };
}

// ---- الگوی هفتگی: برای هر نوع برنامه (track) و تعداد روز تمرین در هفته (freq) ----
// اسلات‌ها: ۰=شنبه ... ۶=جمعه؛ هر روز لیست بلوک‌های اصلی (به ترتیب اولویت) یا "R" (ریکاوری)
const JR_WEEK = {
  strength: {
    7: [["S:push", "B:technique"], ["S:legs", "C:hiit"], ["B:combos", "K:core"], ["S:pull", "C:tabata"], ["B:power", "S:circuit"], ["E:steady", "K:core"], ["R"]],
    3: { 0: ["S:full", "B:technique"], 2: ["B:combos", "C:hiit", "K:core"], 4: ["S:lower", "B:power"] },
    2: { 0: ["S:full", "B:technique"], 3: ["B:combos", "C:hiit", "K:core"] },
  },
  aerobic: {
    7: [["B:cardio", "K:core"], ["C:hiitbox", "K:core"], ["B:technique", "B:combos"], ["E:steady", "K:core"], ["B:power", "C:tabata"], ["S:circuit", "C:hiit"], ["R"]],
    3: { 0: ["B:cardio", "C:hiitbox"], 2: ["B:technique", "C:hiit", "K:core"], 4: ["E:steady", "S:circuit"] },
    2: { 0: ["B:cardio", "C:hiitbox"], 3: ["E:steady", "B:technique"] },
  },
  endurance: {
    7: [["E:tempo", "K:core"], ["B:stamina", "K:core"], ["E:intervals", "K:core"], ["B:technique", "S:circuit"], ["E:steady", "B:combos"], ["B:stamina", "C:hiit"], ["R"]],
    3: { 0: ["E:tempo", "B:technique"], 2: ["B:stamina", "S:circuit"], 4: ["E:intervals", "K:core"] },
    2: { 0: ["B:stamina", "E:steady"], 3: ["E:intervals", "S:circuit"] },
  },
};

function jrSlotTokens(cfg, wd) {
  const t = JR_WEEK[cfg.track] || JR_WEEK.strength;
  const f = Number(cfg.freq);
  if (f === 7) return t[7][wd];
  const m = t[f] || t[3];
  return m[wd] || null;
}

function jrBuildDay(cfgIn, n) {
  const cfg = { ...JR_DEFAULT, ...cfgIn };
  const wd = (n - 1) % 7;
  const w = Math.ceil(n / 7);
  const P = jrParams(cfg, w);
  const seed = w * 3 + wd;
  const tip = JR_TIPS[(n - 1) % JR_TIPS.length];
  const base = { n, w, wd, weekday: JR_WEEKDAYS[wd], tip, deload: P.deload };
  if (n === JR_TOTAL_DAYS) {
    const blocks = [jrWarm(), jrTestBlock(P), jrCool()];
    return { ...base, type: "final", title: "روز آخر: تست نهایی ۱۰۰ روزه", summary: "آخرین چالش! نتیجه‌ات رو با هفته‌ی اول مقایسه کن.", blocks, minutes: blocks.reduce((a, b) => a + b.minutes, 0) };
  }
  const tokens = jrSlotTokens(cfg, wd);
  if (!tokens) {
    const b = jrRestDay(seed);
    return { ...base, type: "rest", title: "استراحت فعال", summary: "امروز روز استراحته؛ پیاده‌روی سبک و کشش. این روز هم باید ثبت بشه.", blocks: [b], minutes: b.minutes };
  }
  if (tokens[0] === "R") {
    const b = jrRecovery(seed);
    return { ...base, type: "recovery", title: "ریکاوری فعال", summary: "امروز بدنت رو بازسازی کن تا هفته‌ی بعد قوی‌تر باشی.", blocks: [b], minutes: b.minutes };
  }
  const D = Number(cfg.minutes) || 45;
  const mainBudget = Math.max(12, D - 9);
  const weights = tokens.length === 1 ? [1] : tokens.length === 2 ? [0.58, 0.42] : [0.45, 0.32, 0.23];
  const blocks = [jrWarm()];
  tokens.forEach((tk, i) => {
    const [kind, sub] = tk.split(":");
    const budget = mainBudget * weights[i];
    let b = null;
    if (kind === "S") b = jrStrength(sub, cfg, P, seed + i, budget);
    else if (kind === "B") b = jrBoxing(sub, cfg, P, seed + i, budget);
    else if (kind === "C") b = sub === "tabata" ? jrTabata(cfg, P, seed + i, budget) : jrHiit(cfg, P, seed + i, budget, sub === "hiitbox");
    else if (kind === "E") b = jrEndurance(sub, cfg, P, budget);
    else if (kind === "K") b = jrCore(cfg, P, seed + i, budget);
    if (b) blocks.push(b);
  });
  blocks.push(jrCool());
  const mains = blocks.slice(1, -1);
  const title = mains.map((b) => b.title).slice(0, 2).join(" + ");
  const phases = ["پایه‌ریزی", "ساخت", "تشدید", "اوج"];
  const summary = `هفته ${jrFa(w)} • فاز ${phases[P.ph]}${P.deload ? " (هفته‌ی سبک)" : ""} • حدود ${jrFa(blocks.reduce((a, b) => a + b.minutes, 0))} دقیقه`;
  return { ...base, type: "train", title, summary, blocks, minutes: blocks.reduce((a, b) => a + b.minutes, 0) };
}

// ساختار نودهای مسیر: ۷ روز، بعدش یک دایره‌ی طلایی (جلسه‌ی ویژه + مدال)؛ آخر کار جام قهرمانی
function jrNodes() {
  const nodes = [];
  for (let n = 1; n <= JR_TOTAL_DAYS; n++) {
    nodes.push({ kind: "day", n });
    if (n % 7 === 0 && n < JR_TOTAL_DAYS) nodes.push({ kind: "gold", w: n / 7 });
  }
  nodes.push({ kind: "trophy" });
  return nodes;
}

// ---------- صفحه‌ی «مسیر پیشرفت من» ----------
const JR_STORE = "journey_v1";
const JR_OPTS = {
  level: [[0, "مبتدی"], [1, "متوسط"], [2, "پیشرفته"]],
  track: [["strength", "بوکس + بدنسازی"], ["aerobic", "بوکس هوازی"], ["endurance", "بوکس استقامتی"]],
  freq: [[7, "هر روز"], [3, "۳ روز در هفته"], [2, "۲ روز در هفته"]],
  gender: [["m", "مرد"], ["f", "زن"]],
  goal: [["fit", "تناسب اندام"], ["fatloss", "چربی‌سوزی"], ["muscle", "عضله‌سازی"], ["fight", "آمادگی مسابقه"]],
  equip: [["none", "بدون وسیله (خونه)"], ["gym", "باشگاه / وزنه"]],
  minutes: [[30, "۳۰ دقیقه"], [45, "۴۵ دقیقه"], [60, "۶۰ دقیقه"], [90, "۹۰ دقیقه"]],
};
const JR_LABELS = { level: "سطح", track: "نوع برنامه", freq: "تعداد روز تمرین", gender: "جنسیت", goal: "هدف", equip: "امکانات", minutes: "زمان هر جلسه" };
const JR_FONT = { fontFamily: "Vazirmatn, sans-serif" };

function jrGoldDay(w) {
  const blocks = [jrWarm(), jrTestBlock(), jrCool()];
  return { type: "gold", n: 0, w, title: `جلسه‌ی طلایی هفته ${jrFa(w)}`, summary: "تست‌های هفته + مدال طلا 🏅", tip: "نتایجت رو ثبت کن تا پیشرفتت رو ببینی.", blocks, minutes: blocks.reduce((a, b) => a + b.minutes, 0) };
}

const JR_FREE_DAYS = 3;
const jrStoreKey = (accountId) => JR_STORE + "_" + String(accountId || "guest");
const jrDoneT = (v) => (v && typeof v === "object" ? Number(v.t) || 0 : Number(v) || 0);
const jrDoneM = (v) => (v && typeof v === "object" ? Number(v.m) || 0 : 0);
function jrMerge(a, b) {
  const d = { ...(a || {}) };
  for (const [k, v] of Object.entries(b || {})) if (!d[k]) d[k] = v;
  return d;
}
// بارگذاری پیشرفت: اول از گوشی، بعد (اگه وارد شده باشه) ادغام با سرور
async function jrLoadState(accountId, token, isGuest) {
  let local = { cfg: null, done: {}, res: {}, blk: {} };
  try { const v = await AppStorage.get(jrStoreKey(accountId)); if (v) { const o = JSON.parse(v); local = { cfg: o.cfg || null, done: o.done || {}, res: o.res || {}, blk: o.blk || {} }; } } catch {}
  let synced = false;
  if (token && !isGuest) {
    const sv = await apiFetchJourney(token);
    if (sv) {
      local = { ...local, cfg: local.cfg || sv.cfg || null, done: jrMerge(local.done, sv.done), res: { ...(sv.res || {}), ...local.res } };
      synced = true;
    }
  }
  return { ...local, synced };
}

function jrDayStats(done) {
  const keys = Object.keys(done || {});
  const days = keys.filter((k) => k[0] === "d").length;
  const medals = keys.filter((k) => k[0] === "g").length;
  const minutes = keys.reduce((a, k) => a + jrDoneM(done[k]), 0);
  const dayKey = (t) => { const x = new Date(t); return x.getFullYear() * 10000 + (x.getMonth() + 1) * 100 + x.getDate(); };
  const byDay = {};
  keys.forEach((k) => { const t = jrDoneT(done[k]); if (t) { const dk = dayKey(t); byDay[dk] = (byDay[dk] || 0) + jrDoneM(done[k]); } });
  const last14 = [];
  for (let i = 13; i >= 0; i--) { const t = new Date(); t.setHours(12, 0, 0, 0); t.setDate(t.getDate() - i); last14.push({ date: t, v: byDay[dayKey(t)] || 0 }); }
  let streak = 0;
  for (let i = last14.length - 1; i >= 0; i--) { if (last14[i].v > 0 || (byDay[dayKey(last14[i].date)] !== undefined)) streak++; else if (i === last14.length - 1) continue; else break; }
  const weeks = [];
  for (let w = 1; w <= 15; w++) { let c = 0; for (let d = 1; d <= 7; d++) { if (done["d" + ((w - 1) * 7 + d)]) c++; } weeks.push({ w, c, gold: !!done["g" + w] }); }
  return { days, medals, minutes, last14, streak, weeks };
}

function JourneyChartBox({ done, onOpen }) {
  const st = jrDayStats(done);
  const max = Math.max(30, ...st.last14.map((x) => x.v));
  const W = 320, H = 120, pad = 18, bw = (W - pad * 2) / 14;
  const dn = ["ی", "د", "س", "چ", "پ", "ج", "ش"];
  const pct = Math.round((st.days / JR_TOTAL_DAYS) * 100);
  return (
    <div className="rounded-2xl p-4" style={{ background: "#17161A", border: "1px solid #4DA3FF88", boxShadow: "0 0 16px #4DA3FF33" }}>
      <div className="flex items-center justify-between mb-3">
        <span style={{ ...JR_FONT, color: "#4DA3FF" }} className="text-sm font-black">📈 مسیر پیشرفت ۱۰۰ روزه</span>
        {onOpen && <button onClick={onOpen} className="rounded-lg px-2.5 py-1 text-[11px] font-bold" style={{ ...JR_FONT, background: "#4DA3FF22", color: "#4DA3FF", border: "1px solid #4DA3FF" }}>ادامه تمرین ›</button>}
      </div>
      <div className="grid grid-cols-4 gap-2 mb-3">
        {[[jrFa(st.days), "روز انجام‌شده", "#3DE08A"], [jrFa(st.medals), "مدال طلا", "#E8B33D"], [jrFa(st.streak), "روز پیاپی", "#D91E2B"], [jrFa(st.minutes), "دقیقه تمرین", "#4DA3FF"]].map(([v, l, c]) => (
          <div key={l} className="rounded-xl py-2 text-center" style={{ background: "#0B0B0D", border: `1px solid ${c}55` }}>
            <div style={{ fontFamily: "Oswald, sans-serif", color: c }} className="text-lg font-bold leading-6">{v}</div>
            <div style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-[9px]">{l}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-1">
        <div className="flex-1 rounded-full overflow-hidden" style={{ height: 8, background: "#222127" }}><div style={{ width: pct + "%", height: "100%", background: "linear-gradient(90deg,#1FA855,#3DE08A)" }} /></div>
        <span style={{ ...JR_FONT, color: "#3DE08A" }} className="text-[11px] font-black">{jrFa(pct)}٪</span>
      </div>
      <div style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-[11px] font-bold mt-3 mb-1">تمرین ۱۴ روز اخیر (دقیقه)</div>
      <svg viewBox={`0 0 ${W} ${H + 22}`} width="100%" style={{ display: "block", direction: "ltr" }}>
        <defs><linearGradient id="jrbar" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4DA3FF" /><stop offset="100%" stopColor="#1c6fd1" /></linearGradient></defs>
        {[0, 0.5, 1].map((f) => (<line key={f} x1={pad} x2={W - pad} y1={H - f * (H - 14)} y2={H - f * (H - 14)} stroke="#2a292e" strokeWidth="1" strokeDasharray="3 3" />))}
        {st.last14.map((x, i) => {
          const h = x.v > 0 ? Math.max(5, (x.v / max) * (H - 14)) : 2;
          const cx = pad + i * bw + bw / 2;
          const today = i === 13;
          return (
            <g key={i}>
              <rect x={cx - bw * 0.32} y={H - h} width={bw * 0.64} height={h} rx="3" fill={x.v > 0 ? "url(#jrbar)" : "#2a292e"} style={x.v > 0 ? { filter: "drop-shadow(0 0 4px #4DA3FF88)" } : undefined} />
              {x.v > 0 && <text x={cx} y={H - h - 3} textAnchor="middle" fontSize="7" fill="#CFC9BF">{x.v}</text>}
              <text x={cx} y={H + 11} textAnchor="middle" fontSize="8" fill={today ? "#E8B33D" : "#8A8790"} fontWeight={today ? "700" : "400"}>{dn[(x.date.getDay() + 1) % 7]}</text>
              <text x={cx} y={H + 20} textAnchor="middle" fontSize="6.5" fill="#55535a">{x.date.getDate()}</text>
            </g>
          );
        })}
      </svg>
      <div style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-[11px] font-bold mt-2 mb-1">هفته‌ها (روزهای انجام‌شده از ۷)</div>
      <div className="flex items-end gap-1" style={{ height: 44, direction: "ltr" }}>
        {st.weeks.map((w) => (
          <div key={w.w} className="flex-1 flex flex-col items-center justify-end gap-0.5" style={{ height: "100%" }}>
            <div style={{ width: "100%", height: Math.max(3, (w.c / 7) * 30), borderRadius: 3, background: w.c === 7 ? "linear-gradient(180deg,#3DE08A,#1FA855)" : w.c > 0 ? "#2f8f5a" : "#2a292e" }} />
            <span style={{ fontSize: 7, color: w.gold ? "#E8B33D" : "#55535a" }}>{w.gold ? "🏅" : jrFa(w.w)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function JourneyScreen({ onBack, authToken, isGuest, isAdmin, plan, accountId, onSubscribe }) {
  const isPaid = Boolean(isAdmin) || plan === "silver" || plan === "gold";
  const [cfg, setCfg] = useState(JR_DEFAULT);
  const [done, setDone] = useState({});
  const [res, setRes] = useState({});
  const [blk, setBlk] = useState({});
  const [ready, setReady] = useState(false);
  const [showSet, setShowSet] = useState(false);
  const [sel, setSel] = useState(null);
  const [play, setPlay] = useState(null);
  const [reward, setReward] = useState(null);
  const [lockModal, setLockModal] = useState(false);
  const [exVideos, setExVideos] = useState({});
  const stateRef = useRef({});
  stateRef.current = { cfg, done, res, blk };
  useEffect(() => { let alive = true; apiFetchExerciseVideos().then((m) => { if (alive && m) setExVideos(m); }); return () => { alive = false; }; }, []);
  useEffect(() => {
    let alive = true;
    jrLoadState(accountId, authToken, isGuest).then((o) => {
      if (!alive) return;
      if (o.cfg) { setCfg({ ...JR_DEFAULT, ...o.cfg }); } else setShowSet(true);
      setDone(o.done); setRes(o.res); setBlk(o.blk);
      setReady(true);
      if (o.synced) apiPutJourney(authToken, { cfg: o.cfg || undefined, done: o.done, res: o.res });
    });
    return () => { alive = false; };
  }, []);
  const save = (c, d, r, b) => {
    AppStorage.set(jrStoreKey(accountId), JSON.stringify({ cfg: c, done: d, res: r, blk: b }));
    if (authToken && !isGuest) apiPutJourney(authToken, { cfg: c, done: d, res: r });
  };
  const setOpt = (k, v) => { const c = { ...cfg, [k]: v }; setCfg(c); save(c, done, res, blk); };

  const nodes = useMemo(() => jrNodes(), []);
  const doneDays = Object.keys(done).filter((k) => k[0] === "d").length;
  const firstUndone = (() => { for (let n = 1; n <= JR_TOTAL_DAYS; n++) if (!done["d" + n]) return n; return 0; })();
  const goldCount = Object.keys(done).filter((k) => k[0] === "g").length;
  const locked = (nd) => !isPaid && (nd.kind !== "day" || nd.n > JR_FREE_DAYS);
  const openNode = (nd) => { if (locked(nd)) { setLockModal(true); return; } setSel(nd.kind === "gold" ? { kind: "gold", w: nd.w } : { kind: "day", n: nd.n }); };

  const dayOf = (s) => (s.kind === "gold" ? jrGoldDay(s.w) : jrBuildDay(cfg, s.n));
  const keyOf = (s) => (s.kind === "gold" ? "g" + s.w : "d" + s.n);

  // هر بخش که تموم شد، خودکار تیک می‌خوره؛ وقتی همه‌ی بخش‌ها تموم شدن، خود روز سبز می‌شه
  const completeBlock = (s, i) => {
    const { cfg: c, done: d, res: r, blk: b } = stateRef.current;
    const key = keyOf(s);
    const day = dayOf(s);
    const cur = new Set(b[key] || []);
    cur.add(i);
    const nb = { ...b, [key]: [...cur] };
    let nd = d;
    let rw = null;
    if (cur.size >= day.blocks.length && !d[key]) {
      nd = { ...d, [key]: { t: Date.now(), m: day.minutes || 0 } };
      rw = s.kind === "gold" ? "gold" : s.n === JR_TOTAL_DAYS ? "trophy" : "day";
    }
    setBlk(nb); setDone(nd);
    save(c, nd, r, nb);
    if (rw && rw !== "day") setReward(rw);
    if (rw) setSel(null);
  };

  const btn = (onClick, label, extra) => (<button onClick={onClick} style={{ ...JR_FONT, color: "#0B0B0D", background: "#DAD6CE", ...extra }} className="text-sm rounded-lg px-3 py-1.5 font-bold inline-block">{label}</button>);

  if (!ready) return <div className="flex-1 flex items-center justify-center" style={{ ...JR_FONT, color: "#F3EEE6" }}>...</div>;

  if (play) {
    const prog = play.block.program;
    const exit = () => setPlay(null);
    const onComplete = () => completeBlock(play.s, play.i);
    if (prog.mode === "list") return <ListWorkout program={prog} onExit={exit} exVideos={exVideos} onComplete={onComplete} />;
    return <ProgramPlayer title={prog.name} steps={pgBuildSteps(prog)} onExit={exit} exVideos={exVideos} onComplete={onComplete} />;
  }

  if (sel) {
    const isGold = sel.kind === "gold";
    const day = dayOf(sel);
    const key = keyOf(sel);
    const isDone = !!done[key];
    const doneBlocks = new Set(isDone ? day.blocks.map((_, i) => i) : blk[key] || []);
    const col = isGold ? "#E8B33D" : isDone ? "#3DE08A" : "#4DA3FF";
    const r = res[key] || {};
    const setR = (f, v) => { const nr = { ...res, [key]: { ...(res[key] || {}), [f]: v } }; setRes(nr); save(cfg, done, nr, blk); };
    return (
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-8" dir={APP_DIR}>
        <div className="mb-3">{btn(() => setSel(null), "› بازگشت")}</div>
        <div style={{ ...JR_FONT, color: col }} className="text-xs font-black mb-1">{isGold ? "جلسه‌ی ویژه" : `روز ${jrFa(day.n)} • ${day.weekday}`}{isDone ? " • ✓ انجام شد" : ""}</div>
        <div style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-lg font-black mb-1">{day.title}</div>
        <div style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-xs leading-6 mb-3">{day.summary}{day.minutes ? ` • حدود ${jrFa(day.minutes)} دقیقه` : ""}</div>
        <div style={{ ...JR_FONT, color: "#8FA3B8" }} className="text-[11px] leading-6 mb-3">هر بخش که تموم بشه خودکار تیک می‌خوره؛ با تموم شدن همه‌ی بخش‌ها این روز سبز می‌شه.</div>
        <div className="flex flex-col gap-2.5 mb-4">
          {day.blocks.map((b, i) => {
            const names = b.kind === "list" ? b.program.items : [...new Set(b.program.blocks.flatMap((x) => x.ex))];
            const ok = doneBlocks.has(i);
            return (
              <div key={i} className="rounded-xl p-3" style={{ background: ok ? "rgba(61,224,138,0.10)" : "#17161A", border: `1px solid ${ok ? "#3DE08A" : col + "66"}` }}>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="flex items-center gap-2">
                    <span className="rounded-full flex items-center justify-center shrink-0" style={{ width: 22, height: 22, border: `2px solid ${ok ? "#3DE08A" : "#55535a"}`, background: ok ? "#3DE08A" : "transparent", color: "#0B0B0D", fontWeight: 900, fontSize: 13 }}>{ok ? "✓" : ""}</span>
                    <span style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-sm font-black">{`${jrFa(i + 1)}. ${b.title}`}</span>
                  </span>
                  <span style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-[11px]">{`${jrFa(b.minutes)} دقیقه`}</span>
                </div>
                <div style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-[11px] leading-5 mb-2">{names.slice(0, 7).join(" • ")}{names.length > 7 ? " ..." : ""}</div>
                <button onClick={() => setPlay({ block: b, i, s: sel })} className="w-full rounded-lg py-2 text-xs font-bold" style={{ ...JR_FONT, background: `color-mix(in srgb, ${ok ? "#3DE08A" : col} 13%, #17161A)`, color: ok ? "#3DE08A" : col, border: `1px solid ${ok ? "#3DE08A" : col}` }}>{ok ? "تکرار این بخش ▶" : "شروع این بخش ▶"}</button>
              </div>
            );
          })}
        </div>
        {isGold && (
          <div className="rounded-xl p-3 mb-4" style={{ background: "#17161A", border: "1px solid #E8B33D66" }}>
            <div style={{ ...JR_FONT, color: "#E8B33D" }} className="text-xs font-black mb-2">نتایج تست‌هات (اختیاری)</div>
            <div className="grid grid-cols-3 gap-2">
              {[["push", "شنا"], ["squat", "اسکات"], ["plank", "پلانک (ثانیه)"]].map(([f, l]) => (
                <label key={f} className="flex flex-col gap-1">
                  <span style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-[10px]">{l}</span>
                  <input type="number" inputMode="numeric" value={r[f] || ""} onChange={(e) => setR(f, e.target.value)} className="rounded-lg px-2 py-1.5 text-sm text-center" style={{ background: "#0B0B0D", color: "#F3EEE6", border: "1px solid #2a292e", width: "100%" }} />
                </label>
              ))}
            </div>
          </div>
        )}
        <div style={{ ...JR_FONT, color: "#8FA3B8" }} className="text-[11px] leading-6 mb-4">{"💡 " + day.tip}</div>
        <div style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-[11px] leading-5">{PG_SAFETY}</div>
      </div>
    );
  }

  const circle = (nd, i) => {
    const lk = locked(nd);
    const lockBadge = lk ? (<span className="absolute" style={{ top: -3, left: -3, fontSize: 10 }}>🔒</span>) : null;
    if (nd.kind === "trophy") {
      const ok = !!done["d" + JR_TOTAL_DAYS];
      return (
        <button key={i} onClick={() => (lk ? setLockModal(true) : ok && setReward("trophy"))} className="relative rounded-full aspect-square flex items-center justify-center" style={{ background: ok ? "linear-gradient(135deg,#B8860B,#FFD76A)" : "#17161A", border: `2px solid ${ok ? "#FFD76A" : "#3a3940"}`, fontSize: 18, boxShadow: ok ? "0 0 14px #FFD76Aaa" : "none", opacity: ok ? 1 : 0.6 }}>🏆{lockBadge}</button>
      );
    }
    if (nd.kind === "gold") {
      const dn = !!done["g" + nd.w];
      return (
        <button key={i} onClick={() => openNode(nd)} className="relative rounded-full aspect-square flex flex-col items-center justify-center" style={{ background: dn ? "linear-gradient(135deg,#B8860B,#FFD76A)" : "linear-gradient(135deg,#3a2b05,#6b4e0b)", border: "2px solid #E8B33D", boxShadow: dn ? "0 0 14px #FFD76Acc" : "0 0 8px #E8B33D66" }}>
          <img src={MEDAL_GOLD_SRC} alt="" draggable={false} style={{ width: "68%", height: "68%", objectFit: "contain", opacity: dn ? 1 : 0.8 }} />{lockBadge}
        </button>
      );
    }
    const n = nd.n; const dn = !!done["d" + n]; const cur = n === firstUndone;
    const wd = JR_WEEKDAYS[(n - 1) % 7];
    return (
      <button key={i} onClick={() => openNode(nd)} className="rounded-full aspect-square flex flex-col items-center justify-center leading-none relative" style={{ background: dn ? "linear-gradient(135deg,#1FA855,#3DE08A)" : "#17161A", border: `2px solid ${dn ? "#3DE08A" : cur ? "#4DA3FF" : "#3a3940"}`, boxShadow: cur ? "0 0 12px #4DA3FFcc" : dn ? "0 0 8px #3DE08A66" : "none", color: dn ? "#06210f" : "#F3EEE6", opacity: lk ? 0.7 : 1 }}>
        <span style={{ ...JR_FONT, fontSize: 6.5, fontWeight: 800, whiteSpace: "nowrap" }}>{wd}</span>
        <span style={{ fontFamily: "Oswald, sans-serif", fontSize: 12, fontWeight: 700, marginTop: 1 }}>{dn ? "✓" : jrFa(n)}</span>{lockBadge}
      </button>
    );
  };

  const summary = JR_OPTS.level.find((x) => x[0] === cfg.level)[1] + " • " + JR_OPTS.track.find((x) => x[0] === cfg.track)[1] + " • " + JR_OPTS.freq.find((x) => x[0] === Number(cfg.freq))[1];
  const pct = Math.round((doneDays / JR_TOTAL_DAYS) * 100);
  const nextNode = firstUndone ? { kind: "day", n: firstUndone } : null;

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-3 pb-8" dir={APP_DIR}>
      <div className="mb-3">{btn(onBack, "› بازگشت")}</div>
      <div style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-xl font-black mb-1">مسیر پیشرفت من</div>
      <div style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-xs leading-6 mb-3">۱۰۰ روز، هفته‌به‌هفته. با کامل کردن همه‌ی بخش‌های هر روز، دایره‌ی اون روز سبز می‌شه؛ هر ۷ روز یه جلسه‌ی طلایی با مدال منتظرته.{!isPaid ? ` ${jrFa(JR_FREE_DAYS)} روز اول رایگانه و ادامه‌ی مسیر با «اشتراک دوره اول» یا «دوم» باز می‌شه.` : ""}</div>

      <div className="rounded-2xl p-3 mb-3" style={{ background: "#17161A", border: "1px solid #4DA3FF88", boxShadow: "0 0 14px #4DA3FF33" }}>
        <button onClick={() => setShowSet((s) => !s)} className="w-full flex items-center justify-between gap-2 text-right">
          <span className="flex flex-col gap-0.5">
            <span style={{ ...JR_FONT, color: "#4DA3FF" }} className="text-sm font-black">⚙️ تنظیم برنامه‌ی تمرینی</span>
            <span style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-[11px]">{summary}</span>
          </span>
          <span style={{ color: "#4DA3FF", fontSize: 18 }}>{showSet ? "▲" : "▼"}</span>
        </button>
        {showSet && (
          <div className="mt-3 flex flex-col gap-3">
            {Object.keys(JR_OPTS).map((k) => (
              <div key={k}>
                <div style={{ ...JR_FONT, color: "#E8B33D" }} className="text-[11px] font-black mb-1.5">{JR_LABELS[k]}</div>
                <div className="flex flex-wrap gap-1.5">
                  {JR_OPTS[k].map(([v, l]) => {
                    const on = String(cfg[k]) === String(v);
                    return (<button key={String(v)} onClick={() => setOpt(k, v)} className="rounded-full px-3 py-1.5 text-xs font-bold" style={{ ...JR_FONT, background: on ? "linear-gradient(135deg,#1c6fd1,#4DA3FF)" : "#0B0B0D", color: on ? "#fff" : "#CFC9BF", border: `1px solid ${on ? "#4DA3FF" : "#3a3940"}` }}>{l}</button>);
                  })}
                </div>
              </div>
            ))}
            <div style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-[11px] leading-5">با تغییر تنظیمات، روزهای انجام‌نشده بر اساس انتخاب جدیدت دوباره ساخته می‌شن و روزهای سبز شده می‌مونن.</div>
            <button onClick={() => { setShowSet(false); save(cfg, done, res, blk); }} className="rounded-xl py-2.5 text-sm font-bold" style={{ ...JR_FONT, background: "linear-gradient(135deg,#1C6FD1,#4DA3FF)", color: "#fff" }}>ذخیره و بستن</button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 rounded-full overflow-hidden" style={{ height: 8, background: "#222127" }}><div style={{ width: pct + "%", height: "100%", background: "linear-gradient(90deg,#1FA855,#3DE08A)" }} /></div>
        <span dir="rtl" style={{ ...JR_FONT, color: "#3DE08A", whiteSpace: "nowrap" }} className="text-xs font-black">{`${jrFa(doneDays)} از ${jrFa(JR_TOTAL_DAYS)} روز · ${jrFa(goldCount)} مدال`}</span>
      </div>
      {nextNode && (
        <button onClick={() => openNode(nextNode)} className="w-full rounded-xl py-3 text-sm font-bold mb-4" style={{ ...JR_FONT, background: "linear-gradient(135deg,#1c6fd1,#4DA3FF)", color: "#fff", boxShadow: "0 0 16px #4DA3FF66" }}>{`تمرین امروز: روز ${jrFa(firstUndone)} ▶`}</button>
      )}

      <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(9, minmax(0, 1fr))" }}>
        {nodes.map((nd, i) => circle(nd, i))}
      </div>
      <div className="flex flex-wrap gap-3 mt-4 justify-center" style={{ ...JR_FONT, color: "#F3EEE6", fontSize: 10 }}>
        <span>🟢 انجام‌شده</span><span>🔵 روز فعلی</span><span>🟡 جلسه‌ی طلایی + مدال</span><span>🏆 جام ۱۰۰ روز</span><span>🔒 نیازمند اشتراک</span>
      </div>

      {lockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: "rgba(0,0,0,0.75)" }} onClick={() => setLockModal(false)}>
          <div className="w-full rounded-2xl p-5 text-center" dir={APP_DIR} style={{ maxWidth: 320, background: "#17161A", border: "1px solid #E8B33D", boxShadow: "0 0 22px rgba(232,179,61,0.35)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 38 }}>🔒</div>
            <div style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-base font-black mt-1 mb-2">ادامه‌ی مسیر ۱۰۰ روزه</div>
            <div style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-sm leading-7 mb-4">{`${jrFa(JR_FREE_DAYS)} روز اول رایگانه. برای باز شدن بقیه‌ی روزها و جلسه‌های طلایی، «اشتراک دوره اول» یا «اشتراک دوره دوم» بخر.`}</div>
            <button onClick={() => { setLockModal(false); onSubscribe && onSubscribe(); }} className="w-full rounded-xl py-3 text-sm font-bold mb-2" style={{ ...JR_FONT, background: "linear-gradient(135deg, #7A4300, #B86A00)", color: "#FFF6D8" }}>مشاهده اشتراک</button>
            <button onClick={() => setLockModal(false)} className="w-full rounded-xl py-2.5 text-sm font-bold" style={{ ...JR_FONT, background: "#2a292e", color: "#F3EEE6" }}>بستن</button>
          </div>
        </div>
      )}

      {reward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: "rgba(0,0,0,0.8)" }} onClick={() => setReward(null)}>
          <div className="w-full rounded-2xl p-6 text-center" dir={APP_DIR} style={{ maxWidth: 320, background: "#17161A", border: "1px solid #E8B33D", boxShadow: "0 0 28px rgba(232,179,61,0.5)" }} onClick={(e) => e.stopPropagation()}>
            {reward === "gold" ? <img src={MEDAL_GOLD_SRC} alt="" style={{ width: 120, height: 120, objectFit: "contain", margin: "0 auto", filter: "drop-shadow(0 0 14px #E8B33D)" }} /> : <div style={{ fontSize: 80 }}>🏆</div>}
            <div style={{ ...JR_FONT, color: "#FFD76A" }} className="text-lg font-black mt-2 mb-1">{reward === "gold" ? "مدال طلا گرفتی!" : "قهرمان ۱۰۰ روزه شدی!"}</div>
            <div style={{ ...JR_FONT, color: "#F3EEE6" }} className="text-sm leading-7 mb-4">{reward === "gold" ? "یک هفته‌ی دیگه رو با قدرت تموم کردی. ادامه بده!" : "۱۰۰ روز تمرین مداوم یعنی تو یه بوکسور واقعی‌ای. افتخار می‌کنیم!"}</div>
            <button onClick={() => setReward(null)} className="w-full rounded-xl py-3 text-sm font-bold" style={{ ...JR_FONT, background: "linear-gradient(135deg,#B8860B,#E8B33D)", color: "#2a1a00" }}>ادامه</button>
          </div>
        </div>
      )}
    </div>
  );
}

// باکس پیشرفت روزانه در صفحه‌ی حساب کاربری
function JourneyProfileBox({ accountId, authToken, isGuest, onOpen }) {
  const [done, setDone] = useState(null);
  useEffect(() => { let alive = true; jrLoadState(accountId, authToken, isGuest).then((o) => { if (alive) setDone(o.done); }); return () => { alive = false; }; }, []);
  if (!done) return null;
  return <JourneyChartBox done={done} onOpen={onOpen} />;
}

function MenuJourneyIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="5" cy="18" r="2.2" /><circle cx="12" cy="10" r="2.2" /><circle cx="19" cy="4.5" r="2.2" /><path d="M6.8 16.6 10.3 11.6M13.8 8.6 17.4 6" />
    </svg>
  );
}

// ---------- علوم ضروری بوکس ----------
const BS_SRC_NOTE = "منبع و دقت: این بخش بر پایه‌ی قوانین یکپارچه‌ی بوکس حرفه‌ای (Unified Rules / ABC)، مقررات سازمان‌های WBC، WBA، IBF، WBO و قوانین بوکس آماتور سبک المپیک (World Boxing / IBA) تنظیم شده. جزئیات (مثل وزن دستکش یا تعداد قاضی) بین فدراسیون‌ها، کمیسیون‌ها و کشورها کمی فرق می‌کنه؛ برای مسابقه‌ی رسمی همیشه آخرین آیین‌نامه‌ی فدراسیون خودتون رو ببینید.";

const BS_TOPICS = [
  {
    id: "amateur-rules", icon: "🥊", color: "#4DA3FF", title: "قوانین مسابقات آماتور", sub: "آیین‌نامه‌ی سبک المپیک",
    blocks: [
      { t: "p", x: "بوکس آماتور (سبک المپیک) برای مهارت، ایمنی و امتیاز‌گیری دقیق طراحی شده؛ هدف اول ناک‌اوت نیست، ضربه‌ی تمیز و درست روی ناحیه‌ی مجاز و برتری فنی و تاکتیکیه." },
      { t: "h", x: "ساختار مسابقه" },
      { t: "svg", k: "timeline" },
      { t: "ul", x: [
        "بزرگسالان (نخبه) زن و مرد: ۳ راند ۳ دقیقه‌ای با ۱ دقیقه استراحت بین راندها.",
        "رده‌های سنی پایین‌تر راندهای کوتاه‌تر دارن؛ مثلاً در آیین‌نامه‌ی WBC نوجوانان ۳ راند ۲ دقیقه‌ای و رده‌های کوچک‌تر ۳ راند ۱ تا ۱٫۵ دقیقه‌ای هستن.",
        "رده‌های سنی متداول: نوجوانان (حدود ۱۵ تا ۱۶ سال)، جوانان (۱۷ تا ۱۸ سال) و بزرگسالان/نخبه (۱۹ تا ۴۰ سال). محدوده‌ی دقیق سن بین فدراسیون‌ها کمی متفاوته.",
        "مسابقه با تعیین قرعه و حذفیِ تک‌حذفی برگزار می‌شه؛ بازنده از جدول خارج می‌شه.",
      ] },
      { t: "h", x: "ناحیه‌ی مجاز ضربه" },
      { t: "svg", k: "body" },
      { t: "p", x: "فقط ضربه‌ای امتیاز داره که با قسمت سفید (بند انگشتی) دستکش بسته، روی جلو و کناره‌های سر یا تنه‌ی بالای کمربند، تمیز و با قدرت فرود بیاد. ضربه‌ی روی بازوی حریف، با دستکش باز، یا ضربه‌ی بدون نیرو امتیاز نمی‌گیره." },
      { t: "h", x: "امتیازدهی" },
      { t: "ul", x: [
        "سیستم «۱۰ امتیازی اجباری» (10-point must): برنده‌ی راند ۱۰ و بازنده معمولاً ۹ می‌گیره؛ مساوی در راند مجاز نیست.",
        "دو ضربه‌ی سنگین/ناک‌داون یا برتری کامل می‌تونه راند ۱۰-۸ و حتی ۱۰-۷ بشه.",
        "قاضی‌ها حداکثر ۵ نفر هستن (بعضی آیین‌نامه‌ها ۳ نفر) و جدا از هم امتیاز می‌دن.",
        "معیارها به ترتیب: تعداد ضربات باکیفیت روی ناحیه‌ی مجاز، برتری فنی و تاکتیکی، رقابتی‌بودن (تهاجم هوشمند) و رعایت قوانین.",
        "امتیاز کسرشده بابت خطا، به نفع بوکسور خطاخورده ثبت می‌شه.",
      ] },
      { t: "h", x: "تجهیزات اجباری" },
      { t: "ul", x: [
        "دستکش: ۱۰ اونس (۲۸۴ گرم) تا حدود ۶۴ کیلو و ۱۲ اونس (۳۴۰ گرم) برای وزن‌های بالاتر در آیین‌نامه‌ی WBC؛ سایر فدراسیون‌ها کمی متفاوت‌ان.",
        "کلاه ایمنی: در آیین‌نامه‌ی WBC همه‌ی رده‌ها اجباریه. در المپیک و مسابقات رده‌ی بزرگسالان فدراسیون جهانی، سال‌هاست بدون کلاه برگزار می‌شه (حذف از ۲۰۱۶ برای مردان به دلیل آمار ضربه‌ی مغزی).",
        "محافظ دندان (ماوس‌گارد)، محافظ کشاله و لباس یک‌رنگ قرمز یا آبی، پابند/بانداژ مجاز.",
        "کمربند مسابقه: خط رسمی پایین ناحیه‌ی مجاز رو مشخص می‌کنه.",
      ] },
      { t: "h", x: "اخطار و کسر امتیاز" },
      { t: "ul", x: [
        "طبق آیین‌نامه‌ی WBC فقط ۲ اخطار در ۳ راند مجازه؛ اخطار سوم یعنی رد صلاحیت (DQ).",
        "اخطار علنی (Public warning): داور مسابقه رو متوقف می‌کنه، خطا رو نشون می‌ده و ۱ امتیاز از خاطی کم می‌شه.",
        "افتادن ماوس‌گارد یا خارج‌کردن عمدی اون: اخطار، بعد کسر امتیاز و در تکرار رد صلاحیت.",
      ] },
      { t: "h", x: "شمارش محافظتی (Standing count)" },
      { t: "p", x: "وقتی بوکسور سرپا ولی گیج و بی‌دفاعه، داور مسابقه رو متوقف و شمارش محافظتی می‌کنه. در آیین‌نامه‌ی WBC: جوانان و بانوان حداکثر ۲ شمارش در راند و ۳ در مسابقه؛ بزرگسالان مرد حداکثر ۳ در راند و ۴ در مسابقه. بیشتر از این معمولاً یعنی توقف مسابقه (RSC)." },
      { t: "note", x: BS_SRC_NOTE },
    ],
  },
  {
    id: "pro-rules", icon: "🏆", color: "#F3EEE6", title: "قوانین مسابقات حرفه‌ای", sub: "قوانین یکپارچه‌ی بوکس حرفه‌ای",
    blocks: [
      { t: "p", x: "بوکس حرفه‌ای تحت نظر کمیسیون‌های ورزشی (مثل Nevada یا New York در آمریکا، BBBofC در بریتانیا) و سازمان‌های جهانی برگزار می‌شه. بیشتر مقررات بر اساس «قوانین یکپارچه‌ی بوکس» و رهنمودهای انجمن کمیسیون‌های بوکس (ABC) تنظیم شده." },
      { t: "h", x: "تعداد و طول راندها" },
      { t: "ul", x: [
        "مسابقه‌ها ۴، ۶، ۸، ۱۰ یا ۱۲ راند برنامه‌ریزی می‌شن. مبارزه‌ی عنوان قهرمانی جهان معمولاً ۱۲ رانده.",
        "هر راند ۳ دقیقه و بین راندها ۱ دقیقه استراحت. در بعضی مسابقات بانوان راندها ۲ دقیقه‌ای و تا ۱۰ راند بود؛ امروز برخی کمیسیون‌ها و سازمان‌ها راند ۳ دقیقه‌ای رو هم اجرا می‌کنن.",
        "در بوکس حرفه‌ای کلاه ایمنی استفاده نمی‌شه و لباس مسابقه شورت/تن‌پوش بدون پوشش بالاتنه‌ست.",
      ] },
      { t: "h", x: "تجهیزات" },
      { t: "ul", x: [
        "وزن دستکش معمولاً ۸ اونس تا وزن ولترویت (۱۴۷ پوند / ۶۶٫۷ کیلو) و ۱۰ اونس برای وزن‌های بالاتر؛ بعضی کمیسیون‌ها برای مبارزه‌های غیرعنوانی یا شرایط خاص ۱۰ اونس رو اجباری می‌کنن.",
        "بانداژ دست زیر نظر نماینده‌ی کمیسیون بسته و مهر می‌شه؛ مقدار گاز و چسب محدود و مشخصه.",
        "محافظ دندان و محافظ کشاله اجباریه. مواد روی صورت (مثل وازلین) فقط در حد مجاز و توسط کورنر.",
      ] },
      { t: "h", x: "نقش‌ها در رینگ" },
      { t: "ul", x: [
        "داور رینگ (Referee): تنها مرجع داخل رینگ؛ قوانین رو اجرا، اخطار و کسر امتیاز اعمال، شمارش و توقف مسابقه رو انجام می‌ده.",
        "قاضی‌ها: ۳ نفر که از سه سمت مختلف رینگ می‌شینن و مستقل امتیاز می‌دن.",
        "پزشک رینگ: در همه‌ی مسابقات حاضره؛ می‌تونه توقف رو توصیه کنه ولی تصمیم نهایی با داوره.",
        "کورنر (سکند‌ها): مربی اصلی (Chief second)، کات‌من (مراقب بریدگی) و دستیار؛ مربی می‌تونه حوله رو برای توقف مسابقه بندازه.",
        "ناظر کمیسیون و سرپرست مسابقه: صلاحیت وزن‌کشی، تجهیزات و قرارداد رو بررسی می‌کنن.",
      ] },
      { t: "h", x: "توزین و آمادگی" },
      { t: "ul", x: [
        "وزن‌کشی معمولاً یک روز قبل از مسابقه انجام می‌شه. نرسیدن به وزن مجاز می‌تونه جریمه‌ی مالی، لغو عنوان یا لغو مسابقه رو به همراه داشته باشه.",
        "بعضی سازمان‌ها برای جلوگیری از افزایش وزن خطرناک بین توزین و مسابقه، حد مجاز یا وزن‌کشی مجدد در روز مسابقه دارن.",
        "معاینه‌ی پزشکی قبل از مسابقه: چشم، علائم حیاتی و شرایط عمومی؛ و آزمایش‌های دوره‌ای لازم برای مجوز.",
      ] },
      { t: "h", x: "ناک‌داون و شمارش" },
      { t: "ul", x: [
        "اگر به‌خاطر ضربه‌ی مجاز هر قسمتی از بدن غیر از کف پاها به زمین برسه، یا بی‌دفاع به طناب‌ها آویزون بمونه، ناک‌داون محسوبه.",
        "شمارش تا ۱۰ انجام می‌شه و بوکسور باید قبل از ۱۰ ایستاده و آماده‌ی ادامه باشه. بعد از ناک‌داون، «شمارش اجباری ۸» (Mandatory eight count) وجود داره حتی اگه سریع بلند بشه.",
        "زنگ پایان راند باعث نجات بوکسوری که ناک‌داون شده نمی‌شه (در راند آخر هم همین‌طور).",
        "قانون «سه ناک‌داون در یک راند = توقف مسابقه» فقط در بعضی کمیسیون‌ها اجرا می‌شه و سازمان‌های اصلی (WBC، WBA، IBF، WBO) در عناوین جهانی معمولاً اجرا نمی‌کنن.",
        "اگه بوکسور از رینگ بیرون بیفته، ۲۰ ثانیه فرصت داره بدون کمک برگرده.",
      ] },
      { t: "h", x: "جریمه و خطا" },
      { t: "p", x: "جزئیات خطاها در بخش «خطاها و جریمه‌ها» اومده. خلاصه: اخطار کلامی، بعد کسر امتیاز (معمولاً ۱ یا ۲ امتیاز) و در موارد شدید رد صلاحیت." },
      { t: "note", x: BS_SRC_NOTE },
    ],
  },
  {
    id: "judging", icon: "⚖️", color: "#4DA3FF", title: "قوانین داوری و قضاوت مسابقات", sub: "امتیازدهی، معیارها و نمونه‌ی برگه",
    blocks: [
      { t: "p", x: "نتیجه‌ی مسابقه‌هایی که با ناک‌اوت یا توقف تموم نمی‌شن از روی برگه‌ی امتیاز قاضی‌ها مشخص می‌شه. فهمیدن منطق امتیازدهی بهت کمک می‌کنه استراتژی‌ات رو با راند‌به‌راند بودن مسابقه تنظیم کنی." },
      { t: "h", x: "سیستم ۱۰ امتیازی اجباری" },
      { t: "table", head: ["نتیجه‌ی راند", "امتیاز", "چه موقع؟"], rows: [
        ["۱۰-۹", "رایج‌ترین", "برتری مشخص ولی نه کامل"],
        ["۱۰-۸", "برتری شدید", "یک ناک‌داون یا کنترل کامل راند"],
        ["۱۰-۷", "بسیار نادر", "دو ناک‌داون یا برتری مطلق"],
        ["۱۰-۱۰", "خیلی نادر", "راند کاملاً مساوی"],
        ["۹-۹", "نادر", "برنده‌ی راند خودش هم یک ناک‌داون یا کسر امتیاز داشته"],
      ] },
      { t: "h", x: "معیارهای قضاوت (به ترتیب اولویت)" },
      { t: "ol", x: [
        "ضربه‌ی تمیز و مؤثر (Clean punching): ضربه‌ی درست، روی ناحیه‌ی مجاز، با قدرت و بدون مسدود شدن.",
        "تهاجم مؤثر (Effective aggressiveness): تهاجمی که منجر به ضربه‌ی تمیز بشه؛ فقط جلو رفتن امتیاز نیست.",
        "کنترل رینگ (Ring generalship): تعیین سرعت و محل مبارزه، مجبور کردن حریف به عکس‌العمل.",
        "دفاع (Defense): جاخالی، بلاک، حرکت پا؛ دفاع به‌تنهایی راند رو نمی‌بره ولی در تساوی‌ها تعیین‌کننده‌ست.",
      ] },
      { t: "h", x: "نمونه‌ی برگه‌ی امتیاز ۱۲ راندی" },
      { t: "table", head: ["", "قاضی ۱", "قاضی ۲", "قاضی ۳"], rows: [
        ["راندهای ۱ تا ۴", "۴۰-۳۶", "۳۹-۳۷", "۴۰-۳۶"],
        ["راندهای ۵ تا ۸", "۳۸-۳۸", "۳۸-۳۸", "۳۷-۳۹"],
        ["راندهای ۹ تا ۱۲", "۳۹-۳۷", "۳۸-۳۸", "۳۹-۳۷"],
        ["مجموع", "۱۱۷-۱۱۱", "۱۱۵-۱۱۳", "۱۱۶-۱۱۲"],
      ] },
      { t: "p", x: "قاعده‌ی کلی: اگه هر ۱۲ راند را ۱۰-۹ به نفع یک نفر بدیم، حاصل ۱۲۰-۱۰۸ می‌شه. هر امتیاز کسرشده، از مجموع بوکسور خاطی کم می‌شه." },
      { t: "h", x: "انواع تصمیم قضات" },
      { t: "kv", x: [
        ["تصمیم یکپارچه (Unanimous)", "هر ۳ قاضی یک نفر رو برنده می‌دونن."],
        ["تصمیم دوتکه (Split)", "دو قاضی یک نفر و قاضی سوم نفر مقابل رو برنده اعلام می‌کنه."],
        ["تصمیم اکثریت (Majority)", "دو قاضی یک نفر رو برنده می‌دونن و سومی مساوی داده."],
        ["تساوی", "تساوی یکپارچه، دوتکه یا اکثریت؛ بسته به برگه‌ها."],
        ["تصمیم فنی (Technical decision)", "اگه خطای تصادفی (مثل سرزنی) مسابقه رو بعد از تعداد کافی راند متوقف کنه، برگه‌ها تعیین‌کننده‌ن. در بسیاری از مقررات حداقل ۴ راند کامل لازمه؛ قبلش «بدون نتیجه» (No Contest) می‌شه."],
      ] },
      { t: "h", x: "بوکس آماتور: تفاوت‌ها" },
      { t: "ul", x: [
        "تعداد قاضی‌ها تا ۵ نفره.",
        "تاکید بیشتر روی تعداد ضربات باکیفیت روی ناحیه‌ی مجاز نسبت به تهاجم.",
        "امتیاز راند: ۱۰-۹ و در موارد خاص ۱۰-۸ یا ۱۰-۷.",
      ] },
      { t: "h", x: "رفتار داور رینگ" },
      { t: "ul", x: [
        "فرمان‌های اصلی: «Stop»، «Box»، «Break» و «Time».",
        "داور باید قبل از شروع، تجهیزات و آمادگی بوکسورها رو بررسی و دستورها رو بگه.",
        "در صورت دیدن خطر جدی، داور حق توقف مسابقه رو بدون هماهنگی با دیگران داره.",
      ] },
      { t: "note", x: BS_SRC_NOTE },
    ],
  },
];
const BS_TOPICS_2 = [
  {
    id: "career", icon: "🚀", color: "#4DA3FF", title: "مسیر پیشرفت در بوکس حرفه‌ای", sub: "از آماتور تا قهرمانی جهان",
    blocks: [
      { t: "p", x: "هیچ مسیر یگانه‌ای وجود نداره، ولی ساختار رایج پیشرفت در بوکس حرفه‌ای مثل یک نردبانه: هر پله با رکورد، رتبه‌بندی و مدیریت درست حریف‌ها باز می‌شه." },
      { t: "svg", k: "ladder" },
      { t: "h", x: "مراحل مسیر" },
      { t: "ol", x: [
        "پایه‌ی آماتور (توصیه‌شده): تجربه‌ی مبارزه‌ی آماتور هرچه بیشتر بهتر؛ قهرمانی‌های ملی/قاره‌ای یا تیم ملی؛ پایه‌ی فنی و تحمل مسابقه رو می‌سازه.",
        "گرفتن مجوز حرفه‌ای: ثبت نزد کمیسیون/فدراسیون، معاینات پزشکی کامل (چشم، مغز، قلب، آزمایش خون) و قرارداد با مدیر و مروج.",
        "شروع حرفه‌ای: اولین مبارزه‌ها ۴ راندی با حریف‌های هم‌سطح یا کم‌تجربه برای ساخت رکورد و اعتمادبه‌نفس.",
        "افزایش راند: ۶ راندی، بعد ۸ راندی و ۱۰ راندی با حریف‌های قوی‌تر؛ مرحله‌ی «پروسپکت» (Prospect).",
        "عنوان‌های منطقه‌ای و ملی: کمربندهای ملی، قاره‌ای و رده‌های نقره‌ای/بین‌المللی سازمان‌ها (مثل WBC Silver) که وارد رتبه‌بندی جهانی می‌کنه.",
        "رتبه‌بندی جهانی: ورود به ۱۵ نفر برتر سازمان‌ها (WBC، WBA، IBF، WBO و …).",
        "مبارزه‌ی حذفی (Eliminator) و چالشگر اجباری (Mandatory challenger): برنده فرصت چالش با قهرمانی که کمربند رو داره رو می‌گیره.",
        "مبارزه‌ی عنوان جهانی و دفاع از کمربند؛ قهرمان باید طبق مقررات ظرف مدت مشخص با چالشگر اجباری مبارزه کنه.",
        "یکپارچه‌سازی (Unification): دو قهرمان سازمان‌های مختلف برای یکی کردن کمربندها مبارزه می‌کنن؛ جمع کردن ۴ کمربند اصلی یعنی «قهرمان بلامنازع» (Undisputed).",
      ] },
      { t: "h", x: "نقش مدیر، مروج و مربی" },
      { t: "ul", x: [
        "مروج (Promoter): برگزارکننده‌ی مسابقه و معمولاً قرارداد‌دهنده؛ سالن، پخش تلویزیونی و پول مسابقه رو فراهم می‌کنه.",
        "مدیر (Manager): مذاکره‌ی قراردادها و انتخاب مسیر؛ سهم مدیر معمولاً تا حدود یک‌سوم پول مسابقه است و مربی حدود ۱۰٪، ولی به قرارداد و قوانین هر کشور/ایالت بستگی داره.",
        "مربی و تیم کورنر: برنامه‌ی تمرین، استراتژی راند‌به‌راند، کنترل بریدگی‌ها و سلامت.",
      ] },
      { t: "h", x: "اصول بقا و رشد" },
      { t: "ul", x: [
        "رکورد (برد-باخت-مساوی) مهمه ولی کیفیت حریف‌ها مهم‌تره؛ ۲۰ برد با حریف ضعیف ارزش کمتری از ۱۰ برد با حریف‌های رتبه‌دار داره.",
        "بین مبارزه‌ها فاصله‌ی ریکاوری رعایت کن؛ بعد از ناک‌اوت، کمیسیون‌ها معمولاً ۳۰ تا ۹۰ روز تعلیق پزشکی می‌ذارن.",
        "وزن‌گیری سالم: رده‌ی وزنی‌ای انتخاب کن که بدون کم‌آبی شدید بهش برسی؛ کم‌آبی شدید خطر مغزی و افت عملکرده.",
        "به همه‌ی شروط قرارداد توجه کن: شروط تجدید مسابقه (Rematch clause)، حق انتخاب (Option) و پایان قرارداد.",
      ] },
      { t: "note", x: "نکته: بوکس حرفه‌ای پرخطره؛ آمادگی بدنی، معاینات پزشکی منظم و تیم قابل اعتماد، مهم‌ترین سرمایه‌ی مسیر حرفه‌ای هستن." },
    ],
  },
  {
    id: "amateur-types", icon: "🥇", color: "#4DA3FF", title: "انواع مسابقات بوکس آماتور", sub: "از باشگاهی تا المپیک",
    blocks: [
      { t: "p", x: "مسابقه‌های آماتور بر اساس اهمیت و سطح به چند دسته تقسیم می‌شن. هر چقدر بالاتر بری، سطح رقابت و شرایط انتخاب بوکسور سخت‌تره." },
      { t: "kv", x: [
        ["مسابقه‌ی باشگاهی و دوستانه (Local / Exhibition)", "تمرین مسابقه‌ای با داور و قوانین رسمی ولی معمولاً بدون حذفی؛ مناسب تجربه‌ی اول."],
        ["مسابقه‌ی دوتیمه (Dual)", "دو باشگاه، استان یا کشور مقابل هم تیم می‌بندن و بوکسورها هم‌وزن با هم می‌جنگن."],
        ["تورنمنت (Tournament)", "مسابقه‌ی حذفی در چند روز؛ دسته‌ی A یا B بسته به اهمیت و ارتباط با انتخابی‌های جهانی/المپیک."],
        ["لیگ و جام (Cup / League)", "مسابقه‌های باشگاهی/استانی/ملی با امتیاز تیمی."],
        ["قهرمانی‌ها (Championships)", "قهرمانی کشوری، آسیا، اروپا، جهان؛ ورود معمولاً با سهمیه یا انتخابی."],
        ["بازی‌های چندرشته‌ای (Games)", "المپیک، بازی‌های آسیایی، همبستگی اسلامی و بازی‌های قاره‌ای؛ مهم‌ترین رویدادهای چهارساله."],
        ["مسابقات سنی", "نوجوانان، جوانان، بزرگسالان، دانش‌آموزی و دانشجویی (مثل جام‌ها و المپیاد‌ها)."],
        ["گلدن گلاوز (Golden Gloves)", "تورنمنت سنتی آماتور در آمریکا؛ معمولاً فقط برنده‌ها مدال می‌گیرن."],
      ] },
      { t: "h", x: "المپیک و مسیر آینده" },
      { t: "ul", x: [
        "در المپیک پاریس ۲۰۲۴ بوکس ۱۳ وزن داشت (۷ مردان، ۶ بانوان).",
        "سازمان جهانی بوکس (World Boxing) در سال ۲۰۲۳ تأسیس شد و در فوریه‌ی ۲۰۲۵ شناسایی موقت کمیته‌ی بین‌المللی المپیک (IOC) رو گرفت؛ IBA (فدراسیون قبلی AIBA) در سال ۲۰۲۳ از سوی IOC کنار گذاشته شد.",
        "در مارس ۲۰۲۵ بوکس رسماً در برنامه‌ی المپیک لس‌آنجلس ۲۰۲۸ تأیید شد؛ آوریل ۲۰۲۵ تساوی جنسیتی با ۷ وزن مردان و ۷ وزن بانوان و ۱۲۴+۱۲۴ سهمیه اعلام شد.",
        "مسیر سهمیه: قهرمانی جهان (آوریل ۲۰۲۷)، انتخابی‌های قاره‌ای ۲۰۲۸، دو انتخابی جهانی و سهمیه‌های میزبان و جهانی (یونیورسالیتی). سهمیه‌ها متعلق به خود بوکسوره (نه کشور).",
      ] },
      { t: "h", x: "نحوه‌ی مدال‌دهی" },
      { t: "p", x: "در بیشتر مسابقه‌های سبک المپیک: طلا برای برنده‌ی فینال، نقره برای بازنده‌ی فینال و برنز برای دو بازنده‌ی نیمه‌نهایی." },
      { t: "note", x: BS_SRC_NOTE },
    ],
  },
  {
    id: "pro-types", icon: "💰", color: "#F3EEE6", title: "انواع مسابقات بوکس حرفه‌ای", sub: "کارت مسابقه، عنوان و فرمت‌ها",
    blocks: [
      { t: "p", x: "هر شب مسابقه‌ی حرفه‌ای (Fight card) مجموعه‌ای از مبارزه‌هاست که از مبتدی‌ها تا مبارزه‌ی اصلی شب مرتب می‌شن." },
      { t: "kv", x: [
        ["مبارزه‌ی مقدماتی (Prelim)", "اول شب و معمولاً ۴ تا ۶ راند؛ بوکسورهای تازه‌کار و جوان."],
        ["انتهای کارت (Undercard)", "مبارزه‌های ۶ تا ۱۰ راندی قبل از مبارزه‌ی اصلی؛ اغلب با بوکسورهای رتبه‌دار."],
        ["مبارزه‌ی اصلی (Main event)", "مبارزه‌ی پایانی و اصلی شب؛ معمولاً ۱۰ تا ۱۲ راند و عنوان قهرمانی."],
        ["مبارزه‌ی عنوان خالی (Vacant title)", "کمربندی که قهرمان نداره؛ دو رتبه‌دار برتر برای گرفتنش می‌جنگن."],
        ["دفاع از عنوان (Title defense)", "قهرمان از کمربندش دفاع می‌کنه؛ مبارزه‌ی اجباری و اختیاری."],
        ["مبارزه‌ی یکپارچه‌سازی (Unification)", "قهرمانان سازمان‌های مختلف برای یکی کردن عنوان‌ها."],
        ["مبارزه‌ی حذفی (Eliminator)", "برنده، چالشگر اجباری قهرمان می‌شه."],
        ["عنوان موقت (Interim)", "وقتی قهرمان اصلی مصدوم یا مشغول مبارزه‌ی دیگره، سازمان عنوان موقت می‌ده."],
        ["مسابقه‌ی انتقامی (Rematch) و سه‌گانه (Trilogy)", "برگزاری مجدد بعد از یک مبارزه‌ی نزدیک یا جنجالی؛ سه مبارزه‌ی پشت‌سرهم."],
        ["مبارزه با وزن مشخص (Catchweight)", "توافق دو طرف روی وزنی غیر از رده‌های رسمی."],
        ["مبارزه‌ی نمایشی (Exhibition)", "بدون برنده‌ی رسمی و معمولاً بدون ثبت در رکورد؛ قوانین مخصوص خودش رو داره."],
      ] },
      { t: "h", x: "فرمت‌های اقتصادی" },
      { t: "ul", x: [
        "مسابقه‌ی تلویزیونی/پرداخت به‌ازای تماشا (PPV): مبارزه‌های بزرگ با درآمد بالا.",
        "مبارزه‌های باشگاهی و منطقه‌ای: کارت‌های کوچک برای ساخت رکورد.",
        "مسابقه‌ی نیمه‌حرفه‌ای (Semi-pro / Pro-Am): فرمت‌هایی که بین آماتور و حرفه‌ای قرار دارن؛ قوانین بسته به برگزارکننده فرق می‌کنه.",
      ] },
      { t: "h", x: "سازمان‌ها و کمربندها" },
      { t: "ul", x: [
        "چهار سازمان اصلی جهانی: WBC (شورای جهانی بوکس)، WBA (انجمن جهانی بوکس)، IBF (فدراسیون بین‌المللی بوکس) و WBO (سازمان جهانی بوکس).",
        "سازمان‌های دیگر مثل IBO و کمربند «ذی‌رینگ» (The Ring) هم وجود دارن اما اعتبار بین‌المللی «چهار کمربند اصلی» بیشتره.",
        "هر سازمان رتبه‌بندی و قوانین خودش رو داره؛ ممکنه چند قهرمان مختلف در یک وزن وجود داشته باشه (مثلاً سوپر/معمولی/موقت در WBA).",
        "قهرمان بلامنازع (Undisputed): کسی که کمربند هر ۴ سازمان اصلی رو هم‌زمان در یک وزن داشته باشه.",
      ] },
      { t: "note", x: BS_SRC_NOTE },
    ],
  },
  {
    id: "weights", icon: "⚖️", color: "#4DA3FF", title: "رده‌های وزنی", sub: "حرفه‌ای و المپیک",
    blocks: [
      { t: "p", x: "رده‌ی وزنی تضمین می‌کنه دو بوکسور از نظر جثه برابر باشن. وزن‌کشی دقیق و رعایت سقف هر رده اجباریه." },
      { t: "h", x: "رده‌های حرفه‌ای (بر حسب پوند و کیلوگرم)" },
      { t: "svg", k: "weights" },
      { t: "h", x: "رده‌های المپیک و آماتور (کیلوگرم)" },
      { t: "table", head: ["مردان (LA28)", "بانوان (LA28)"], rows: [
        ["تا ۵۵ کیلو (خروسی)", "تا ۵۱ کیلو (پرواز)"],
        ["تا ۶۰ کیلو (سبک)", "تا ۵۴ کیلو (خروسی)"],
        ["تا ۶۵ کیلو (نیم‌متوسط)", "تا ۵۷ کیلو (پر)"],
        ["تا ۷۰ کیلو (سبک‌متوسط)", "تا ۶۰ کیلو (سبک)"],
        ["تا ۸۰ کیلو (نیم‌سنگین)", "تا ۶۵ کیلو (نیم‌متوسط)"],
        ["تا ۹۰ کیلو (سنگین)", "تا ۷۰ کیلو (سبک‌متوسط)"],
        ["بالای ۹۰ کیلو (فوق‌سنگین)", "تا ۷۵ کیلو (متوسط)"],
      ] },
      { t: "p", x: "نمونه رده‌های دیگر در آیین‌نامه‌ی WBC برای بزرگسالان مردان: ۵۰، ۵۵، ۶۰، ۶۵، ۷۰، ۷۵، ۸۰، ۸۵، ۹۰ و ۹۰+ کیلوگرم؛ برای بانوان ۴۸، ۵۱، ۵۴، ۵۷، ۶۰، ۶۵، ۷۰، ۷۵، ۸۰ و ۸۰+ کیلوگرم." },
      { t: "h", x: "نکات وزن‌کشی" },
      { t: "ul", x: [
        "کم‌آبی شدید برای رسیدن به وزن، ریسک ضربه‌ی مغزی و افت قدرت رو بالا می‌بره.",
        "بازگشت بیش از حد وزن بعد از توزین (ریهیدریشن شدید) خطرناکه و تعادل و دوام رو خراب می‌کنه؛ بعضی سازمان‌ها برای اون سقف دارن.",
        "با مربی و متخصص تغذیه، رده‌ای انتخاب کن که با کاهش وزن تدریجی و سالم بهش برسی.",
      ] },
      { t: "note", x: BS_SRC_NOTE },
    ],
  },
  {
    id: "fouls", icon: "🚫", color: "#FF5C5C", title: "خطاها و جریمه‌ها", sub: "کارهای ممنوع در رینگ",
    blocks: [
      { t: "p", x: "رعایت قوانین فقط برای جلوگیری از جریمه نیست؛ حفظ سلامت خودت و حریفه. لیست زیر خطاهای رایج در آیین‌نامه‌ی آماتور و حرفه‌ای رو جمع کرده." },
      { t: "ul", x: [
        "ضربه یا نگه‌داشتن زیر کمربند.",
        "ضربه به پشت سر (Rabbit punch)، پشت گردن و ناحیه‌ی کلیه‌ها (Kidney punch).",
        "ضربه با سر، شانه، ساعد یا آرنج و کشیدن سر روی طناب‌ها.",
        "ضربه با دستکش باز، داخل دستکش، مچ یا کناره‌ی دست.",
        "ضربه به حریفی که به زمین افتاده یا در حال بلند شدنه.",
        "نگه‌داشتن و ضربه زدن (Holding and hitting) یا هل دادن و ضربه زدن.",
        "گرفتن یا قلاب کردن دست و سر حریف؛ کلینچ طولانی بدون فعالیت.",
        "تکیه به طناب‌ها یا حمله با نگه‌داشتن طناب.",
        "ضربه بعد از اعلام «بریک» یا بعد از زنگ پایان راند.",
        "خم شدن خطرناک و پایین‌تر از کمر.",
        "ناسزا، رفتار تحریک‌آمیز یا اعتراض به داور.",
        "عمداً انداختن یا برداشتن ماوس‌گارد.",
        "فرار و پشت کردن به حریف برای اجتناب از ضربه (در آماتور).",
      ] },
      { t: "h", x: "پیامدها" },
      { t: "kv", x: [
        ["اخطار (Warning)", "اولین واکنش داور برای خطای معمولی."],
        ["کسر امتیاز", "معمولاً ۱ امتیاز برای تکرار یا خطای عمدی؛ در بوکس حرفه‌ای خطای عمدی مجروح‌کننده می‌تونه ۲ امتیاز کسر داشته باشه."],
        ["رد صلاحیت (DQ)", "برای خطاهای فاحش، تکرار بعد از چند اخطار یا ضربه‌ی عمدی بسیار خطرناک."],
        ["تعلیق و جریمه‌ی مالی", "کمیسیون یا سازمان می‌تونه علاوه بر نتیجه، بوکسور رو جریمه یا تعلیق کنه."],
      ] },
      { t: "h", x: "ضربه‌ی غیرقانونی به زیر کمربند" },
      { t: "p", x: "قربانی ضربه‌ی پایین‌ حداکثر تا ۵ دقیقه فرصت ریکاوری می‌گیره (حرفه‌ای). تکرار ضربه‌ی پایین باعث کسر امتیاز یا رد صلاحیت می‌شه." },
      { t: "note", x: BS_SRC_NOTE },
    ],
  },
  {
    id: "results", icon: "📋", color: "#4DA3FF", title: "پایان مسابقه و انواع نتیجه", sub: "KO، TKO، تصمیم و موارد خاص",
    blocks: [
      { t: "kv", x: [
        ["KO (ناک‌اوت)", "بوکسور قبل از شمارش ۱۰ بلند نمی‌شه یا ادامه نمی‌ده."],
        ["TKO / RSC (توقف فنی)", "داور، پزشک یا کورنر مسابقه رو متوقف می‌کنه. در آماتور: RSC، RSC-I (آسیب)، RSC-H (ضربه‌ی سر) و …"],
        ["انصراف (RET/ABD)", "کورنر با حوله یا بوکسور اعلام می‌کنه ادامه نمی‌ده."],
        ["تصمیم قضات", "یکپارچه، دوتکه یا اکثریت بر اساس برگه‌ها."],
        ["رد صلاحیت (DQ)", "برای خطای فاحش یا تکرار خطا."],
        ["تساوی (Draw)", "برگه‌ها مساوی؛ بدون برنده."],
        ["بدون نتیجه (NC)", "مسابقه به دلیل حادثه یا شرایط خاص بی‌اعتبار می‌شه؛ مثلاً توقف زودهنگام بر اثر سرزنی تصادفی."],
        ["بدون تصمیم (ND)", "مسابقه‌ی غیر رسمی یا بدون اعلام برنده."],
        ["WO (ورود نکردن)", "در آماتور اگر حریف حاضر نشه، برنده‌ی بدون مبارزه اعلام می‌شه."],
      ] },
      { t: "h", x: "اتفاق‌های خاص" },
      { t: "ul", x: [
        "سرزنی تصادفی (Accidental headbutt): نتیجه به نوع و زمان توقف بستگی داره؛ معمولاً پس از تعداد مشخصی راند، برگه‌ها حکم می‌کنن.",
        "بریدگی (Cut): داور و پزشک تصمیم می‌گیرن؛ اگه ادامه خطرناک باشه مسابقه متوقف می‌شه.",
        "بوکسور از رینگ بیفته: ۲۰ ثانیه فرصت بازگشت (حرفه‌ای).",
      ] },
      { t: "note", x: BS_SRC_NOTE },
    ],
  },
  {
    id: "ring", icon: "🏟️", color: "#D91E2B", title: "رینگ و تجهیزات مسابقه", sub: "ابعاد، گوشه‌ها و دستکش",
    blocks: [
      { t: "svg", k: "ring" },
      { t: "ul", x: [
        "رینگ حرفه‌ای: مربع ۱۶ تا ۲۴ فوت (حدود ۴٫۹ تا ۷٫۳ متر) داخل طناب‌ها؛ آماتور حدود ۴٫۹ تا ۶٫۱ متر. کف رینگ ۳ تا ۴ فوت بالاتر از زمین و با پوشش نرم زیر برزنت.",
        "طناب‌ها ۳ تا ۵ رشته و با روکش نرم‌اند؛ گوشه‌ها پد دارن.",
        "گوشه‌ها: یک گوشه‌ی قرمز، یک آبی و دو گوشه‌ی خنثی (سفید) برای زمان ناک‌داون و استراحت بوکسورها.",
        "قاضی‌ها بیرون رینگ و در سمت‌های مختلف می‌شینن تا زاویه‌ی دید متفاوت داشته باشن.",
        "دستکش: وزن و مدل بر اساس رده‌ی وزنی و مقررات تعیین می‌شه؛ ۸ تا ۱۲ اونس رایجه.",
        "بانداژ دست: برای محافظت از انگشت‌ها، مچ و استخوان‌های کف دست؛ باید پیش از مسابقه بازرسی بشه.",
      ] },
      { t: "note", x: BS_SRC_NOTE },
    ],
  },
  {
    id: "health", icon: "🩺", color: "#4DA3FF", title: "ایمنی و سلامت", sub: "پزشکی، ضربه‌ی مغزی و ریکاوری",
    blocks: [
      { t: "ul", x: [
        "قبل از هر مسابقه معاینه‌ی پزشکی انجام بده؛ بدون تأیید پزشک رینگ نمی‌شه وارد مسابقه شد.",
        "ضربه‌ی مغزی (Concussion) رو جدی بگیر: سردرد، گیجی، تاری دید، تهوع و فراموشی نشانه‌ی خطرن؛ تمرین و مسابقه رو متوقف و به پزشک مراجعه کن.",
        "بعد از ناک‌اوت یا ضربه‌ی شدید حداقل ۲۸ تا ۹۰ روز استراحت از اسپارینگ و مسابقه (بسته به کمیسیون) لازمه.",
        "اسپارینگ سنگین رو محدود کن و همیشه از کلاه، ماوس‌گارد و دستکش مناسب استفاده کن.",
        "آب، الکترولیت و خواب کافی؛ کاهش وزن سریع و بی‌برنامه ممنوع.",
        "قبل و بعد از تمرین گرم‌کردن و سردکردن رو انجام بده و برای مفاصل و مچ‌ها حرکات تقویتی بزن.",
        "مصرف مواد ممنوع (دوپینگ) هم از نظر سلامت و هم قانونی خطرناکه؛ آزمایش‌های ضددوپینگ در مسابقات رسمی انجام می‌شه.",
      ] },
      { t: "note", x: "این مطالب آموزشی هستن و جایگزین نظر پزشک نیستن. اگه علائمی مثل سردرد شدید یا تاری دید بعد از تمرین داشتی، سریع به پزشک مراجعه کن." },
    ],
  },
  {
    id: "glossary", icon: "📖", color: "#F3EEE6", title: "فرهنگ اصطلاحات بوکس", sub: "واژه‌های ضروری",
    blocks: [
      { t: "kv", x: [
        ["Jab (جَب)", "ضربه‌ی مستقیم دست جلو."],
        ["Cross (کراس)", "ضربه‌ی مستقیم دست عقب."],
        ["Hook (هوک)", "ضربه‌ی قوسی از کنار."],
        ["Uppercut (آپرکات)", "ضربه‌ی رو به بالا از زیر چانه یا بدن."],
        ["Slip (اسلیپ)", "جاخالی کناری از ضربه‌ی مستقیم."],
        ["Roll / Bob & Weave (رول / باب‌ویو)", "چرخش یا خم‌شدن زیر ضربه‌ی قوسی."],
        ["Pull back (پولبک)", "عقب بردن سر برای دور شدن از ضربه."],
        ["Clinch (کلینچ)", "گرفتن حریف برای قطع حمله؛ بیش از حد مجاز خطاست."],
        ["Counter (ضدحمله)", "ضربه‌ای که بلافاصله بعد از ضربه یا جاخالی حریف می‌زنی."],
        ["Orthodox / Southpaw", "استایل راست‌دست / چپ‌دست."],
        ["Ring generalship", "کنترل رینگ و تعیین ریتم مبارزه."],
        ["Knockdown / KO / TKO", "به زمین رفتن / ناک‌اوت / توقف فنی."],
        ["Prospect", "بوکسور جوان آینده‌دار."],
        ["Journeyman", "بوکسور باتجربه‌ای که اغلب نقش حریف تست را بازی می‌کنه."],
        ["Pound-for-pound", "رتبه‌بندی بهترین‌ها بدون در نظر گرفتن وزن."],
        ["Purse", "پول مسابقه‌ی بوکسور."],
        ["Cutman", "مراقب بریدگی و تورم در کورنر."],
        ["Sparring (اسپارینگ)", "تمرین مبارزه با حریف."],
        ["Mandatory challenger", "چالشگر اجباری عنوان."],
        ["Weigh-in", "وزن‌کشی رسمی."],
      ] },
    ],
  },
];
const BSF = { fontFamily: "Vazirmatn, sans-serif" };
const BS_PRO_WEIGHTS = [
  ["مینی‌مام (Minimumweight)", 105, 47.6], ["لایت‌فلای (Light flyweight)", 108, 49.0], ["فلای (Flyweight)", 112, 50.8], ["سوپرفلای (Super flyweight)", 115, 52.2],
  ["بنتم (Bantamweight)", 118, 53.5], ["سوپربنتم (Super bantamweight)", 122, 55.3], ["فدر (Featherweight)", 126, 57.2], ["سوپرفدر (Super featherweight)", 130, 59.0],
  ["لایت (Lightweight)", 135, 61.2], ["سوپرلایت (Super lightweight)", 140, 63.5], ["ولتر (Welterweight)", 147, 66.7], ["سوپرولتر (Super welterweight)", 154, 69.9],
  ["میدل (Middleweight)", 160, 72.6], ["سوپرمیدل (Super middleweight)", 168, 76.2], ["لایت‌هوی (Light heavyweight)", 175, 79.4], ["کروزر (Cruiserweight)", 200, 90.7], ["هوی (Heavyweight)", 201, 90.7],
];

function BsRingSvg() {
  return (
    <svg viewBox="0 0 320 300" width="100%" style={{ display: "block" }}>
      <rect x="0" y="0" width="320" height="300" rx="16" fill="#0F0F12" />
      <rect x="55" y="45" width="210" height="210" fill="#1b1b22" stroke="#3a3940" />
      {[0, 8, 16].map((d) => (<rect key={d} x={55 + d} y={45 + d} width={210 - d * 2} height={210 - d * 2} fill="none" stroke={d === 0 ? "#D91E2B" : d === 8 ? "#DAD6CE" : "#4DA3FF"} strokeWidth="2" opacity="0.8" />))}
      <circle cx="55" cy="255" r="11" fill="#D91E2B" /><circle cx="265" cy="45" r="11" fill="#4DA3FF" />
      <circle cx="55" cy="45" r="11" fill="#DAD6CE" /><circle cx="265" cy="255" r="11" fill="#DAD6CE" />
      <text x="55" y="283" textAnchor="middle" fontSize="11" fill="#FF6B76" style={BSF} fontWeight="700">گوشه‌ی قرمز</text>
      <text x="265" y="30" textAnchor="middle" fontSize="11" fill="#8CC4FF" style={BSF} fontWeight="700">گوشه‌ی آبی</text>
      <text x="55" y="30" textAnchor="middle" fontSize="10" fill="#CFC9BF" style={BSF}>خنثی</text>
      <text x="265" y="283" textAnchor="middle" fontSize="10" fill="#CFC9BF" style={BSF}>خنثی</text>
      <circle cx="140" cy="150" r="9" fill="#D91E2B" /><circle cx="180" cy="150" r="9" fill="#4DA3FF" /><circle cx="160" cy="125" r="7" fill="#F3EEE6" />
      <text x="160" y="112" textAnchor="middle" fontSize="10" fill="#F3EEE6" style={BSF} fontWeight="700">داور</text>
      <text x="160" y="195" textAnchor="middle" fontSize="9" fill="#8A8790" style={BSF}>مرکز رینگ</text>
      <rect x="146" y="6" width="28" height="14" rx="3" fill="#2a2a32" /><text x="160" y="16" textAnchor="middle" fontSize="8" fill="#4DA3FF" style={BSF}>قاضی ۱</text>
      <rect x="2" y="143" width="34" height="14" rx="3" fill="#2a2a32" /><text x="19" y="153" textAnchor="middle" fontSize="8" fill="#4DA3FF" style={BSF}>قاضی ۲</text>
      <rect x="284" y="143" width="34" height="14" rx="3" fill="#2a2a32" /><text x="301" y="153" textAnchor="middle" fontSize="8" fill="#4DA3FF" style={BSF}>قاضی ۳</text>
    </svg>
  );
}

function BsBodySvg() {
  return (
    <svg viewBox="0 0 320 260" width="100%" style={{ display: "block", direction: "ltr" }}>
      <rect x="0" y="0" width="320" height="260" rx="16" fill="#0F0F12" />
      <g transform="translate(40,10)">
        <circle cx="60" cy="30" r="22" fill="#4DA3FF" opacity="0.55" stroke="#4DA3FF" />
        <rect x="52" y="50" width="16" height="12" fill="#3a3940" />
        <rect x="28" y="62" width="64" height="80" rx="14" fill="#4DA3FF" opacity="0.4" stroke="#4DA3FF" />
        <rect x="6" y="66" width="20" height="70" rx="10" fill="#2a292e" stroke="#4a4950" /><rect x="94" y="66" width="20" height="70" rx="10" fill="#2a292e" stroke="#4a4950" />
        <rect x="28" y="142" width="64" height="34" rx="8" fill="#D91E2B" opacity="0.45" stroke="#D91E2B" />
        <rect x="32" y="176" width="24" height="70" rx="8" fill="#2a292e" stroke="#4a4950" /><rect x="64" y="176" width="24" height="70" rx="8" fill="#2a292e" stroke="#4a4950" />
        <line x1="14" y1="142" x2="106" y2="142" stroke="#F3EEE6" strokeWidth="2.5" strokeDasharray="5 3" />
      </g>
      <text x="190" textAnchor="start" y="52" fontSize="12" fill="#4DA3FF" style={BSF} fontWeight="700">✓ ناحیه‌ی مجاز</text>
      <text x="190" textAnchor="start" y="70" fontSize="10" fill="#CFC9BF" style={BSF}>جلو و کناره‌ی سر</text>
      <text x="190" textAnchor="start" y="86" fontSize="10" fill="#CFC9BF" style={BSF}>تنه‌ی بالای کمربند</text>
      <text x="190" textAnchor="start" y="136" fontSize="11" fill="#F3EEE6" style={BSF} fontWeight="700">خط کمربند</text>
      <text x="190" textAnchor="start" y="166" fontSize="12" fill="#FF6B76" style={BSF} fontWeight="700">✕ ممنوع</text>
      <text x="190" textAnchor="start" y="184" fontSize="10" fill="#CFC9BF" style={BSF}>زیر کمربند</text>
      <text x="190" textAnchor="start" y="200" fontSize="10" fill="#CFC9BF" style={BSF}>پشت سر و گردن</text>
      <text x="190" textAnchor="start" y="216" fontSize="10" fill="#CFC9BF" style={BSF}>کلیه‌ها و کمر</text>
    </svg>
  );
}

function BsTimelineSvg() {
  const box = (n, c) => <div key={n} className="rounded-md text-center" style={{ flex: 1, padding: "6px 0", background: c + "33", border: `1px solid ${c}`, color: c, fontSize: 10, ...BSF, fontWeight: 700 }}>{n}</div>;
  return (
    <div className="rounded-xl p-3 mb-3" style={{ background: "#0F0F12", border: "1px solid #2a292e" }}>
      <div style={{ ...BSF, color: "#8CC4FF", fontSize: 11, fontWeight: 800 }} className="mb-1.5">آماتور بزرگسالان: ۳ راند × ۳ دقیقه</div>
      <div className="flex gap-1 mb-3">{[1, 2, 3].map((i) => box("راند " + jrFa(i), "#4DA3FF"))}</div>
      <div style={{ ...BSF, color: "#F3EEE6", fontSize: 11, fontWeight: 800 }} className="mb-1.5">حرفه‌ای عنوان قهرمانی: تا ۱۲ راند × ۳ دقیقه</div>
      <div className="flex gap-0.5">{Array.from({ length: 12 }, (_, i) => box(jrFa(i + 1), "#F3EEE6"))}</div>
      <div style={{ ...BSF, color: "#F3EEE6", fontSize: 10 }} className="mt-2">بین هر راند ۱ دقیقه استراحت</div>
    </div>
  );
}

function BsWeightsSvg() {
  const max = 91;
  return (
    <div className="rounded-xl p-3 mb-3" style={{ background: "#0F0F12", border: "1px solid #2a292e" }}>
      {BS_PRO_WEIGHTS.map(([n, lb, kg], i) => (
        <div key={i} className="flex items-center gap-2 mb-1.5" style={{ direction: "ltr" }}>
          <div style={{ width: 118, textAlign: "left", fontSize: 8.5, color: "#F3EEE6", ...BSF }}>{n}</div>
          <div className="flex-1 rounded-sm" style={{ height: 10, background: "#1b1b22" }}>
            <div style={{ width: (kg / max) * 100 + "%", height: "100%", borderRadius: 2, background: `linear-gradient(90deg,#1c6fd1,${i > 14 ? "#D91E2B" : "#4DA3FF"})` }} />
          </div>
          <div style={{ width: 62, fontSize: 9, color: "#F3EEE6", fontFamily: "Oswald, sans-serif" }}>{i === 16 ? "200+ lb" : lb + " lb"} • {i === 16 ? "+90.7" : kg}</div>
        </div>
      ))}
      <div style={{ ...BSF, color: "#F3EEE6", fontSize: 10 }} className="mt-2">سقف هر رده بر اساس پوند (lb) و کیلوگرم؛ برخی سازمان‌ها رده‌های اضافه (مثل بریج‌ر ۲۲۴ پوند) هم دارن.</div>
    </div>
  );
}

function BsLadder() {
  const steps = [["قهرمان جهان / یکپارچه‌سازی", "#FFFFFF"], ["مبارزه‌ی عنوان جهانی", "#F3EEE6"], ["حذفی و چالشگر اجباری", "#D91E2B"], ["رتبه‌ی ۱۵ نفر برتر جهان", "#D91E2B"], ["عناوین قاره‌ای و ملی", "#4DA3FF"], ["۸ تا ۱۰ راندی با رتبه‌داران", "#4DA3FF"], ["۴ و ۶ راندی ابتدایی", "#4DA3FF"], ["مجوز و مبارزه‌ی حرفه‌ای اول", "#4DA3FF"], ["پایه‌ی آماتور", "#8A8790"]];
  return (
    <div className="flex flex-col items-center gap-1.5 mb-3">
      {steps.map(([t, c], i) => (
        <div key={i} className="text-center rounded-lg" style={{ width: `${46 + i * 6.5}%`, padding: "8px 4px", background: c + "26", border: `1px solid ${c}`, color: c, fontSize: 11, fontWeight: 800, ...BSF }}>{t}</div>
      ))}
    </div>
  );
}

function BsBlocks({ blocks, color }) {
  return (
    <div className="flex flex-col gap-2">
      {blocks.map((b, i) => {
        if (b.t === "h") return <div key={i} style={{ ...BSF, color }} className="text-sm font-black mt-4 mb-0.5">{b.x}</div>;
        if (b.t === "p") return <p key={i} style={{ ...BSF, color: "#F3EEE6" }} className="text-[13px] leading-7">{b.x}</p>;
        if (b.t === "ul") return (<ul key={i} className="flex flex-col gap-1.5">{b.x.map((x, j) => (<li key={j} className="flex gap-2 text-[13px] leading-7" style={{ ...BSF, color: "#F3EEE6" }}><span style={{ color }}>•</span><span>{x}</span></li>))}</ul>);
        if (b.t === "ol") return (<ol key={i} className="flex flex-col gap-1.5">{b.x.map((x, j) => (<li key={j} className="flex gap-2 text-[13px] leading-7" style={{ ...BSF, color: "#F3EEE6" }}><span style={{ color, fontWeight: 900, minWidth: 18 }}>{jrFa(j + 1)}.</span><span>{x}</span></li>))}</ol>);
        if (b.t === "note") return (<div key={i} className="rounded-xl p-3 mt-3 text-[11px] leading-6" style={{ ...BSF, background: "#3A3B3E", border: "1px solid rgba(243,238,230,0.4)", color: "#F3EEE6" }}>ℹ️ {b.x}</div>);
        if (b.t === "kv") return (<div key={i} className="flex flex-col gap-2">{b.x.map(([k, v], j) => (<div key={j} className="rounded-xl p-3" style={{ background: "#17161A", border: `1px solid ${color}55` }}><div style={{ ...BSF, color }} className="text-[13px] font-black mb-0.5">{k}</div><div style={{ ...BSF, color: "#F3EEE6" }} className="text-xs leading-6">{v}</div></div>))}</div>);
        if (b.t === "table") return (
          <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${color}55` }}>
            <table style={{ width: "100%", borderCollapse: "collapse", ...BSF }}>
              <thead><tr>{b.head.map((h, j) => (<th key={j} style={{ background: color + "26", color, fontSize: 11, padding: "8px 6px", textAlign: "center" }}>{h}</th>))}</tr></thead>
              <tbody>{b.rows.map((r, j) => (<tr key={j} style={{ background: j % 2 ? "#141418" : "#17161A" }}>{r.map((c, k) => (<td key={k} style={{ color: "#F3EEE6", fontSize: 11.5, padding: "8px 6px", textAlign: "center", borderTop: "1px solid #24232a" }}>{c}</td>))}</tr>))}</tbody>
            </table>
          </div>
        );
        if (b.t === "svg") { const C = { ring: BsRingSvg, body: BsBodySvg, timeline: BsTimelineSvg, weights: BsWeightsSvg, ladder: BsLadder }[b.k]; return <div key={i} className="my-2"><C /></div>; }
        return null;
      })}
    </div>
  );
}

function BoxingScienceScreen({ onBack }) {
  const topics = [...BS_TOPICS, ...BS_TOPICS_2];
  const [open, setOpen] = useState(null);
  const back = (fn) => (<button onClick={fn} style={{ color: "#0B0B0D", ...BSF, background: "#DAD6CE" }} className="text-sm rounded-lg px-3 py-1.5 font-bold inline-block mb-3">{"› بازگشت"}</button>);
  if (open) {
    const t = topics.find((x) => x.id === open);
    return (
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-10" dir={APP_DIR}>
        {back(() => setOpen(null))}
        <div className="flex items-center gap-3 mb-3">
          <span style={{ fontSize: 34 }}>{t.icon}</span>
          <div><div style={{ ...BSF, color: t.color }} className="text-lg font-black leading-7">{t.title}</div><div style={{ ...BSF, color: "#F3EEE6" }} className="text-[11px]">{t.sub}</div></div>
        </div>
        <BsBlocks blocks={t.blocks} color={t.color} />
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-10" dir={APP_DIR}>
      {back(onBack)}
      <div style={{ ...BSF, color: "#F3EEE6" }} className="text-xl font-black mb-1">علوم ضروری بوکس</div>
      <div style={{ ...BSF, color: "#F3EEE6" }} className="text-xs leading-6 mb-4">قوانین، داوری، رده‌های وزنی، مسیر حرفه‌ای و هر چیزی که یک بوکسور باید بدونه.</div>
      <div className="flex flex-col gap-2.5">
        {topics.map((t) => (
          <button key={t.id} onClick={() => setOpen(t.id)} className="rounded-xl px-4 py-3.5 text-right flex items-center gap-3" style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${t.color} 12%, #17161A), #17161A 65%)`, border: `1px solid ${t.color}`, boxShadow: `0 0 12px ${t.color}44` }}>
            <span style={{ fontSize: 28 }}>{t.icon}</span>
            <span className="flex-1 flex flex-col gap-0.5"><span style={{ ...BSF, color: "#F3EEE6" }} className="text-sm font-black">{t.title}</span><span style={{ ...BSF, color: t.color }} className="text-[11px] font-bold">{t.sub}</span></span>
            <span style={{ color: t.color, fontSize: 22 }}>{"‹"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MenuBookIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5" /><path d="M9 8h6M9 12h6" />
    </svg>
  );
}


const HM_CHAPTERS = [
  { key: "basic", img: "CHAPTER1_IMAGE_SRC", arr: "CURRICULUM_BASIC", color: "#4DA3FF" },
  { key: "advanced", img: "CHAPTER2_IMAGE_SRC", arr: "CURRICULUM_ADVANCED", color: "#D91E2B" },
  { key: "extra", img: "CHAPTER3_IMAGE_SRC", arr: "CURRICULUM_EXTRA", color: "#F3EEE6" },
  { key: "fight", img: "CHAPTER4_IMAGE_SRC", arr: "CURRICULUM_FIGHT", color: "#4DA3FF", gated: true },
  { key: "fightb", img: "CHAPTER4_IMAGE_SRC", arr: "CURRICULUM_FIGHT", color: "#D91E2B", gated: true },
  { key: "partner", img: "CHAPTER5_IMAGE_SRC", arr: "CURRICULUM_PARTNER", color: "#D91E2B", gated: true },
  { key: "focus", img: "CHAPTER6_IMAGE_SRC", arr: "CURRICULUM_FOCUS", color: "#F3EEE6", gated: true },
];
function hmChapterData(k) {
  const m = { CHAPTER1_IMAGE_SRC, CHAPTER2_IMAGE_SRC, CHAPTER3_IMAGE_SRC, CHAPTER4_IMAGE_SRC, CHAPTER5_IMAGE_SRC, CHAPTER6_IMAGE_SRC, CURRICULUM_BASIC, CURRICULUM_ADVANCED, CURRICULUM_EXTRA, CURRICULUM_FIGHT, CURRICULUM_PARTNER, CURRICULUM_FOCUS };
  return { img: m[k.img], arr: m[k.arr] || [] };
}
function HmSectionTitle({ title, sub, color, gold }) {
  return (
    <div className="flex items-end justify-between mb-2.5 px-0.5">
      <div className="flex items-center gap-2">
        <span style={{ width: 4, height: 18, borderRadius: 3, background: `linear-gradient(180deg, ${color || "#D91E2B"}, transparent)`, boxShadow: `0 0 10px ${color || "#D91E2B"}` }} />
        <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", ...(gold ? { background: "linear-gradient(180deg, #FFF3B8 0%, #F2CF5E 38%, #B98A22 62%, #F8DF84 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.7))" } : {}) }} className={gold ? "text-2xl font-black" : "text-base font-black"}>{title}</span>
      </div>
      {sub && <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-[11px]">{sub}</span>}
    </div>
  );
}
async function apiFetchBanners(group = "top") {
  if (DEMO_MODE) return [];
  try {
    const res = await apiFetch(`${API_BASE_URL}/banners?group=${group}`);
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || !data.ok) return null;
    return (data.banners || []).map((b) => ({ id: b.id, url: toAbsoluteVideoUrl(b.url) }));
  } catch {
    return null;
  }
}
// عکس رو قبل از آپلود کوچیک می‌کنه (حداکثر ۱۴۰۰ پیکسل عرض) تا از سقف حجم رد نشه
function shrinkImageFile(file, maxW = 1400) {
  return new Promise((resolve) => {
    try {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const k = Math.min(1, maxW / img.width);
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        c.toBlob((b) => resolve(b ? new File([b], "banner.jpg", { type: "image/jpeg" }) : file), "image/jpeg", 0.88);
      };
      img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
      img.src = url;
    } catch { resolve(file); }
  });
}
async function apiUploadBanner(file, token, replaceId, group = "top") {
  const form = new FormData();
  form.append("image", file);
  const res = await apiFetch(`${API_BASE_URL}/banners?group=${group}${replaceId ? `&replace=${replaceId}` : ""}`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("آپلود عکس با خطا مواجه شد"));
  return (data.banners || []).map((b) => ({ id: b.id, url: toAbsoluteVideoUrl(b.url) }));
}
async function apiDeleteBanner(id, token, group = "top") {
  const res = await apiFetch(`${API_BASE_URL}/banners/${id}?group=${group}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 401) triggerAuthFailure();
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || tr("ذخیره انجام نشد"));
  return (data.banners || []).map((b) => ({ id: b.id, url: toAbsoluteVideoUrl(b.url) }));
}
// بنرهای تبلیغاتی بالای صفحه‌ی هوم؛ ادمین می‌تونه عکس جدید اضافه کنه، عوض کنه یا حذف کنه
function HmBanners({ isAdmin, authToken, group = "top", auto = true }) {
  const [list, setList] = useState(null);
  const [busy, setBusy] = useState("");
  const [err, setErr] = useState("");
  const addRef = useRef(null);
  const repRef = useRef(null);
  const repId = useRef("");
  const scrollRef = useRef(null);
  const pausedRef = useRef(0);
  const n = (list || []).length;
  // حرکت خودکار بی‌نهایت: بعد از آخرین بنر، کپی بنر اول میاد و بعد بی‌صدا به بنر اول واقعی می‌پره
  useEffect(() => {
    const el = scrollRef.current;
    if (!auto || !el || n < 2) return undefined;
    const pause = () => { pausedRef.current = Date.now() + 6000; };
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("wheel", pause, { passive: true });
    const deltaTo = (k) => {
      const er = el.getBoundingClientRect(), kr = k.getBoundingClientRect();
      return getComputedStyle(el).direction === "rtl" ? kr.right - er.right : kr.left - er.left;
    };
    const current = (kids) => {
      const er = el.getBoundingClientRect();
      let cur = 0, best = 1e9;
      kids.forEach((k, i) => { const kr = k.getBoundingClientRect(); const m = Math.min(Math.abs(kr.left - er.left), Math.abs(kr.right - er.right)); if (m < best) { best = m; cur = i; } });
      return cur;
    };
    const timer = setInterval(() => {
      if (Date.now() < pausedRef.current) return;
      const kids = Array.from(el.children);
      if (kids.length < n + 1) return;
      let cur = current(kids);
      if (cur >= n) { el.scrollBy({ left: deltaTo(kids[0]), behavior: "auto" }); cur = 0; }
      el.scrollBy({ left: deltaTo(kids[cur + 1]), behavior: "smooth" });
      if (cur + 1 === n) setTimeout(() => { if (Date.now() >= pausedRef.current && el.children[0]) el.scrollBy({ left: deltaTo(el.children[0]), behavior: "auto" }); }, 900);
    }, 3800);
    return () => { clearInterval(timer); el.removeEventListener("touchstart", pause); el.removeEventListener("wheel", pause); };
  }, [n, auto]);
  useEffect(() => { let alive = true; apiFetchBanners(group).then((l) => alive && l && setList(l)); return () => { alive = false; }; }, []);
  const pick = async (e, replaceId) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setErr(""); setBusy(replaceId || "new");
    try { setList(await apiUploadBanner(await shrinkImageFile(f), authToken, replaceId, group)); }
    catch (x) { setErr(x.message || "خطا"); }
    finally { setBusy(""); }
  };
  const del = async (id) => {
    if (!window.confirm(tr("این بنر حذف بشه؟"))) return;
    setErr(""); setBusy(id);
    try { setList(await apiDeleteBanner(id, authToken, group)); }
    catch (x) { setErr(x.message || "خطا"); }
    finally { setBusy(""); }
  };
  const items = list || [];
  if (!items.length && !isAdmin) return null;
  const card = { flex: "0 0 100%", width: "100%", aspectRatio: "21 / 8", scrollSnapAlign: "start" };
  return (
    <div className="mb-4" style={{ margin: "0 -20px 16px", padding: "12px 20px 12px", background: "#F3EEE6", backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.06) 0 2px, transparent 2px 12px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.06) 0 2px, transparent 2px 12px)", borderTop: "1px solid #FFFFFF", borderBottom: "1px solid #FFFFFF" }}>
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto" style={{ scrollSnapType: isAdmin || !auto ? "x mandatory" : "none", overflowX: isAdmin || !auto ? "auto" : "hidden", touchAction: isAdmin || !auto ? "pan-x pan-y" : "pan-y", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
        {items.map((b) => (
          <div key={b.id} className="relative shrink-0 rounded-2xl overflow-hidden" style={{ ...card, background: "#2B2C30", border: "1px solid rgba(243,238,230,0.4)" }}>
            <img src={b.url} alt="" draggable={false} className="absolute inset-0 w-full h-full object-cover" />
            {isAdmin && (
              <div className="absolute top-2 left-2 flex gap-1.5">
                <button disabled={!!busy} onClick={() => { repId.current = b.id; repRef.current?.click(); }} className="rounded-lg px-2.5 py-1 text-[11px] font-black" style={{ fontFamily: "Vazirmatn, sans-serif", background: "#F3EEE6", color: "#0B0B0D" }}>{busy === b.id ? "..." : tr("تعویض عکس")}</button>
                <button disabled={!!busy} onClick={() => del(b.id)} className="rounded-lg px-2.5 py-1 text-[11px] font-black" style={{ fontFamily: "Vazirmatn, sans-serif", background: "#D91E2B", color: "#fff" }}>{tr("حذف")}</button>
              </div>
            )}
          </div>
        ))}
        {auto && items.length > 1 && (
          <div key="loop-clone" aria-hidden="true" className="relative shrink-0 rounded-2xl overflow-hidden" style={{ ...card, background: "#2B2C30", border: "1px solid rgba(243,238,230,0.4)" }}>
            <img src={items[0].url} alt="" draggable={false} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        )}
        {isAdmin && (
          <button disabled={!!busy} onClick={() => addRef.current?.click()} className="shrink-0 rounded-2xl flex flex-col items-center justify-center gap-1" style={{ ...card, background: "#2B2C30", border: "1.5px dashed rgba(243,238,230,0.6)", color: "#F3EEE6", fontFamily: "Vazirmatn, sans-serif" }}>
            <span style={{ fontSize: 30, lineHeight: 1 }}>{busy === "new" ? "..." : "+"}</span>
            <span className="text-xs font-black">{tr("افزودن بنر تبلیغاتی")}</span>
            <span className="text-[10px]">{tr("نسبت پیشنهادی ۲۱ به ۸")}</span>
          </button>
        )}
      </div>
      {isAdmin && err && <div className="mt-1.5 text-[11px] text-center" style={{ fontFamily: "Vazirmatn, sans-serif", color: "#FF6B76" }}>{err}</div>}
      {isAdmin && (
        <>
          <input ref={addRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => pick(e, "")} />
          <input ref={repRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => pick(e, repId.current)} />
        </>
      )}
    </div>
  );
}
function HmRow({ children, auto }) {
  const ref = useRef(null);
  const kidsArr = React.Children.toArray(children);
  const n = kidsArr.length;
  useEffect(() => {
    if (!auto || n < 2) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    let pausedUntil = 0;
    const pause = () => { pausedUntil = Date.now() + 6000; };
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("wheel", pause, { passive: true });
    const deltaTo = (k) => {
      const er = el.getBoundingClientRect(), kr = k.getBoundingClientRect();
      return getComputedStyle(el).direction === "rtl" ? kr.right - er.right + 20 : kr.left - er.left - 20;
    };
    // بی‌نهایت: بعد از آخرین کارت، کپی کارت اول میاد و بعد بی‌صدا به کارت اول واقعی می‌پره
    const timer = setInterval(() => {
      if (Date.now() < pausedUntil) return;
      const kids = Array.from(el.children);
      if (kids.length < n + 1) return;
      const er = el.getBoundingClientRect();
      let cur = 0, best = 1e9;
      kids.forEach((k, i) => { const kr = k.getBoundingClientRect(); const m = Math.min(Math.abs(kr.left - er.left - 20), Math.abs(kr.right - er.right + 20)); if (m < best) { best = m; cur = i; } });
      if (cur >= n) { el.scrollBy({ left: deltaTo(kids[0]), behavior: "auto" }); cur = 0; }
      el.scrollBy({ left: deltaTo(kids[cur + 1]), behavior: "smooth" });
      if (cur + 1 === n) setTimeout(() => { if (Date.now() >= pausedUntil && el.children[0]) el.scrollBy({ left: deltaTo(el.children[0]), behavior: "auto" }); }, 900);
    }, 3800);
    return () => {
      clearInterval(timer);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("wheel", pause);
    };
  }, [auto, n]);
  return (
    <div className="relative" style={{ margin: "0 -20px", padding: "14px 0 6px", background: "transparent" }}>
      <div ref={ref} className="relative flex gap-3 overflow-x-auto pb-3 px-5" style={{ scrollSnapType: "x mandatory", scrollPaddingInline: "20px", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
        {kidsArr}
        {auto && n > 1 && React.cloneElement(kidsArr[0], { key: "loop-clone" })}
      </div>
    </div>
  );
}
function HmHero({ lesson, chapterTitle, percent, onContinue }) {
  return (
    <button onClick={onContinue} className="relative w-full rounded-2xl overflow-hidden text-right block active:scale-[0.985] transition-transform" style={{ background: "linear-gradient(180deg, #3A3B40 0%, #2A2B2F 100%)", border: "1px solid rgba(243,238,230,0.35)", padding: "12px 14px" }}>
      <div className="flex items-center justify-between gap-2 mb-1">
        <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-[11px] font-bold">{chapterTitle}</span>
        <span className="rounded-full px-2.5 py-0.5 text-[10px] font-black shrink-0" style={{ fontFamily: "Vazirmatn, sans-serif", background: "#D91E2B", color: "#fff" }}>{lesson ? "ادامه تمرین" : "شروع مسیر"}</span>
      </div>
      <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-base font-black leading-7 mb-2">{lesson ? lesson.title : "مسیر پیشرفت ۱۰۰ روزه"}</div>
      <div className="flex items-center gap-3">
        <div className="flex-1 rounded-full overflow-hidden" style={{ height: 5, background: "#5A5B60" }}><div style={{ width: percent + "%", height: "100%", background: "linear-gradient(90deg,#1FA855,#3DE08A)" }} /></div>
        <span style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6" }} className="text-xs">{percent}%</span>
        <span className="rounded-full flex items-center justify-center" style={{ width: 32, height: 32, background: "#D91E2B", color: "#fff", fontSize: 12 }}>▶</span>
      </div>
    </button>
  );
}
function HmShortcuts({ items }) {
  return (
    <div className="grid grid-cols-4 gap-2.5" style={{ margin: "0 -20px", padding: "14px 20px 10px", background: "#F3EEE6", backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.06) 0 2px, transparent 2px 12px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.06) 0 2px, transparent 2px 12px)", borderTop: "1px solid #FFFFFF", borderBottom: "1px solid #FFFFFF" }}>
      {items.map((it) => (
        <button key={it.key} onClick={it.onClick} className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
          <img src={it.img} alt="" draggable={false} style={{ width: 64, height: 64, objectFit: "contain", filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.35))" }} />
          <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#17181A" }} className="text-[12.5px] font-black text-center leading-5">{it.label}</span>
        </button>
      ))}
    </div>
  );
}

function HomeScreen({ onNavigate, menuOpen, setMenuOpen, onLogout, isAdmin, accountName, accountContact, onOpenAccount, memberCount, realMemberCount, adminStats, onSetMemberCount, chapterVisibility, onToggleChapterVisibility, onOpenSupport, chapterTitles, supportStatus, onInviteFriends, isGuest, onGuestLogin, completed, nextLesson, onContinue, onOpenProgramCat, plan, authToken }) {
  const [editingCount, setEditingCount] = useState(false);
  const [countDraft, setCountDraft] = useState(String(memberCount));
  const [inviteOpen, setInviteOpen] = useState(false); // انتخاب نوع لینک دعوت
  const [langOpen, setLangOpen] = useState(false); // پنجره‌ی انتخاب زبان
  const [savingCount, setSavingCount] = useState(false);

  useEffect(() => {
    if (!editingCount) setCountDraft(String(memberCount));
  }, [memberCount]);

  const menuItems = [
    { color: "#4DA3FF", key: "journey", label: tr("مسیر پیشرفت من"), icon: MenuJourneyIcon },
    { color: "#4DA3FF", key: "programs", label: tr("برنامه‌های تخصصی"), icon: MenuPlanIcon },
    { color: "#F3EEE6", key: "boxsci", label: tr("علوم ضروری بوکس"), icon: MenuBookIcon },
    { color: "#4DA3FF", key: "info-coach", label: tr("کمک مربی"), icon: MenuCoachIcon },
    { color: "#F3EEE6", key: "info-tips", label: tr("نکات کلیدی"), icon: MenuTipIcon },
    { color: "#D91E2B", key: "timer", label: tr("تایمر تمرین"), icon: MenuTimerIcon },
    { color: "#F3EEE6", key: "reminder", label: tr("یادآور روزانه"), icon: MenuBellIcon },
    { color: "#4DA3FF", key: "info-faq", label: tr("سوالات متداول"), icon: MenuQuestionIcon },
    { color: "#D91E2B", key: "info-gear", label: tr("وسایل بوکس"), icon: MenuGloveIcon },
    { color: "#8FA3B8", key: "info-rules", label: tr("قوانین و مقررات"), icon: MenuRulesIcon },
    { color: "#D91E2B", key: "invite", label: tr("دعوت از دوستان"), icon: MenuInviteIcon },
    { color: "#4DA3FF", key: "language", label: tr("تغییر زبان") + " / Language", icon: MenuGlobeIcon },
    // فعلاً پشتیبانی فقط برای ادمین نشون داده می‌شه (برای مدیریت گفتگوهای قبلی)، از دسترس کاربر عادی خارجه
    ...(isAdmin ? [{ color: "#4DA3FF", key: "support", label: tr("پشتیبانی"), icon: MenuSupportIcon }] : []),
    { color: "#4DA3FF", key: "info-about", label: tr("درباره آکادمی Naseri"), icon: MenuAboutIcon },
    ...(isAdmin ? [{ color: "#4DA3FF", key: "admin-users", label: tr("لیست کاربران"), icon: MenuUsersIcon }] : []),
    ...(isAdmin ? [{ color: "#4DA3FF", key: "admin-announce", label: tr("ارسال اعلان به کاربران"), icon: MenuUpdateIcon }] : []),
    ...(isAdmin ? [{ color: "#4DA3FF", key: "admin-update", label: tr("بروزرسانی اپ"), icon: MenuUpdateIcon }] : []),
    { color: "#4DA3FF", key: "webapp", label: tr("نسخه وب / iOS"), icon: MenuPhoneIcon },
  ];
  const membersBox = (
            <div
              className="flex flex-wrap items-center justify-between rounded-xl px-3 py-3"
              style={{
                background: "#2D3540",
                border: "1px solid rgba(77,163,255,0.4)",
                boxShadow: "0 0 22px rgba(77,163,255,0.35), inset 0 0 14px rgba(77,163,255,0.08)",
              }}
            >
              {editingCount ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    value={countDraft}
                    onChange={(e) => setCountDraft(e.target.value.replace(/[^\d]/g, ""))}
                    inputMode="numeric"
                    autoFocus
                    style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6" }}
                    className="bg-transparent outline-none flex-1 text-sm"
                  />
                  <button
                    disabled={savingCount}
                    onClick={async () => {
                      setSavingCount(true);
                      try {
                        await onSetMemberCount?.(Number(countDraft) || 0);
                        setEditingCount(false);
                      } catch {
                        // خطای شبکه - فرم باز می‌مونه
                      } finally {
                        setSavingCount(false);
                      }
                    }}
                    style={{ fontFamily: "Vazirmatn, sans-serif", color: "#0B0B0D", background: "#4DA3FF" }}
                    className="rounded-lg px-2.5 py-1 text-xs font-bold shrink-0"
                  >
                    {savingCount ? "..." : tr("ذخیره")}
                  </button>
                </div>
              ) : (
                <>
                  <span className="flex items-center gap-2">
                    <span
                      className="active-dot rounded-full shrink-0"
                      style={{ width: "8px", height: "8px", background: "#4DA3FF" }}
                    />
                    <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#4DA3FF" }} className="text-xs font-bold">
                      {tr("اعضای فعال اپ")}</span>
                  </span>
                  <div className="flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-2">
                      <span style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6" }} className="text-sm font-bold">
                        {Number(memberCount).toLocaleString("en-US")}
                      </span>
                      {isAdmin && (
                        <button
                          onClick={() => {
                            setCountDraft(String(memberCount));
                            setEditingCount(true);
                          }}
                        >
                          <PencilIcon className="w-3.5 h-3.5" style={{ color: "#4DA3FF" }} />
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
              {/* فقط برای ادمین: آمار تفکیکی کاربران */}
              {isAdmin && <AdminStatsRows stats={adminStats} />}
            </div>
  );

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      {inviteOpen && (
        <div
          data-testid="invite-modal"
          className="absolute inset-0 z-50 flex items-center justify-center px-6"
          style={{ background: "rgba(0,0,0,0.75)" }}
          onClick={() => setInviteOpen(false)}
        >
          <div
            dir={APP_DIR}
            className="w-full rounded-2xl p-4"
            style={{ background: "#17161A", border: "1px solid #D91E2B", boxShadow: "0 0 22px rgba(217,30,43,0.35)", maxWidth: "320px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-black text-center mb-3">{tr("دعوت از دوستان")}</div>
            <button
              onClick={() => { setInviteOpen(false); onInviteFriends?.("android"); }}
              className="w-full rounded-xl py-3 mb-2.5 text-sm font-bold"
              style={{ fontFamily: "Vazirmatn, sans-serif", background: "linear-gradient(135deg,#1C6FD1,#4DA3FF)", color: "#fff" }}
            >{tr("اشتراک‌گذاری نسخه اندروید")}</button>
            <button
              onClick={() => { setInviteOpen(false); onInviteFriends?.("web"); }}
              className="w-full rounded-xl py-3 text-sm font-bold"
              style={{ fontFamily: "Vazirmatn, sans-serif", background: "linear-gradient(135deg,#1E6FD9,#4DA3FF)", color: "#fff" }}
            >{tr("اشتراک‌گذاری نسخه وب / iOS")}</button>
          </div>
        </div>
      )}
      {langOpen && (
        <div
          data-testid="language-modal"
          className="absolute inset-0 z-50 flex items-center justify-center px-6"
          style={{ background: "rgba(0,0,0,0.75)" }}
          onClick={() => setLangOpen(false)}
        >
          <div
            dir="ltr"
            className="w-full rounded-2xl p-4"
            style={{ background: "#17161A", border: "1px solid #4DA3FF", boxShadow: "0 0 22px rgba(77,163,255,0.35)", maxWidth: "320px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-black mb-3 text-center">
              {tr("زبان برنامه")} / Language
            </p>
            <div className="flex flex-col gap-2">
              {APP_LANGS.map((l) => (
                <button
                  key={l.code}
                  data-testid={`lang-${l.code}`}
                  onClick={() => (l.code === APP_LANG ? setLangOpen(false) : setAppLanguage(l.code))}
                  className="flex items-center justify-between rounded-xl px-4 py-3"
                  style={{
                    fontFamily: "Vazirmatn, sans-serif",
                    color: l.code === APP_LANG ? "#0B0B0D" : "#F3EEE6",
                    background: l.code === APP_LANG ? "#4DA3FF" : "#0B0B0D",
                    border: "1px solid rgba(77,163,255,0.5)",
                  }}
                >
                  <span className="text-sm font-bold">{l.name}</span>
                  {l.code === APP_LANG && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6" dir={APP_DIR}>
        <div className="flex items-center justify-between mb-1 gap-2">
          <div className="w-12 flex items-center shrink-0">
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-lg flex items-center justify-center"
              style={{ width: "32px", height: "32px", background: "#F3EEE6", border: "1px solid #F3EEE6" }}
            >
              <MenuIcon className="w-4 h-4" style={{ color: "#0B0B0D" }} />
            </button>
          </div>
          {/* عنوان وسط صفحه‌ی هوم؛ اگه صفحه خیلی باریک بود خودش به دو خط می‌شکنه (Naseri / Boxing Academy) */}
          <h1
            dir="ltr"
            className="flex-1 min-w-0 text-center"
            style={{
              fontFamily: '"Bebas Neue", Oswald, Impact, "sans-serif-condensed", "Arial Narrow", sans-serif',
              fontSize: "clamp(15px, 5vw, 21px)",
              letterSpacing: "0.1em",
              lineHeight: 1.15,
              fontWeight: 400,
              textShadow: "0 0 14px rgba(217,30,43,0.35)",
            }}
          >
            <span
              style={{
                color: "#F3EEE6",
                background: "linear-gradient(90deg, #F3EEE6, #D91E2B)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Naseri
            </span>{" "}
            <span style={{ color: "#F3EEE6" }}>Boxing Academy</span>
          </h1>
          <div className="w-12 flex items-center justify-end shrink-0">
            <img src={SPLASH_LOGO_SRC} alt="NASERI" className="w-12 h-12 object-contain" />
          </div>
        </div>

        <RopeDivider />

        {isGuest && (
          <button
            onClick={onGuestLogin}
            data-testid="guest-banner"
            className="w-full rounded-xl px-3 py-2.5 mt-3 flex items-center justify-between gap-2"
            style={{ background: "#3E3E41", border: "1px solid rgba(243,238,230,0.5)" }}
          >
            <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", lineHeight: 1.7 }} className="text-xs font-bold text-right">
              {tr("برای ذخیره‌ی پیشرفت و خرید اشتراک وارد شوید")}
            </span>
            <span style={{ fontFamily: "Vazirmatn, sans-serif", background: "#F3EEE6", color: "#0B0B0D" }} className="rounded-lg px-3 py-1 text-xs font-black shrink-0">
              {tr("ورود / ثبت‌نام")}
            </span>
          </button>
        )}

        <div className="mt-4">
          {(() => {
            const done = completed || {};
            let tot = 0, dn = 0;
            HM_CHAPTERS.forEach((c) => { const arr = hmChapterData(c).arr; arr.forEach((it) => { if (it.t && it.t !== PLACEHOLDER_LESSON_TITLE) { tot++; if (done[`${c.key}-${it.n}`]) dn++; } }); });
            const pct = tot ? Math.round((dn / tot) * 100) : 0;
            const heroCh = HM_CHAPTERS.find((c) => c.key === nextLesson?.curriculumKey) || HM_CHAPTERS[0];
            const titles = (k) => chapterTitles?.[k] || DEFAULT_CHAPTER_TITLES[k];
            return (
              <>
                <HmBanners isAdmin={isAdmin} authToken={authToken} />
                <HmHero lesson={nextLesson} chapterTitle={nextLesson ? titles(nextLesson.curriculumKey) : ""} percent={pct} onContinue={onContinue} />

                <div className="mt-5">
                  <HmShortcuts items={[
                    { key: "journey", label: tr("مسیر پیشرفت من"), img: "assets/sc-journey.webp", onClick: () => onNavigate("journey") },
                    { key: "programs", label: tr("برنامه‌های تخصصی"), img: "assets/sc-programs.webp", onClick: () => onNavigate("programs") },
                    { key: "timer", label: tr("تایمر تمرین"), img: "assets/sc-timer.webp", onClick: () => onNavigate("timer") },
                    { key: "boxsci", label: tr("علوم ضروری بوکس"), img: "assets/sc-boxsci.webp", onClick: () => onNavigate("boxsci") },
                  ]} />
                </div>

                <div className="mt-6">
                  <HmSectionTitle title="دوره A" sub="سه فصل اول" color="#F2CF5E" gold />
                  <HmRow tone="blue">
                    {HM_CHAPTERS.filter((c) => !c.gated).map((c) => {
                      const { img, arr } = hmChapterData(c);
                      const real = arr.filter((it) => it.t && it.t !== PLACEHOLDER_LESSON_TITLE);
                      const d = real.filter((it) => done[`${c.key}-${it.n}`]).length;
                      const cp = real.length ? Math.round((d / real.length) * 100) : 0;
                      const soon = c.gated && !isAdmin && !chapterVisibility?.[c.key];
                      return (
                        <div key={c.key} className="relative shrink-0" style={{ width: "calc(100vw - 40px)", maxWidth: 420, scrollSnapAlign: "start" }}>
                          <button onClick={soon ? undefined : () => onNavigate("curriculum-" + c.key)} className="relative block w-full rounded-2xl overflow-hidden border active:scale-95 transition-transform" style={{ aspectRatio: "16 / 9", background: "#141317", borderColor: `${c.color}99`, cursor: soon ? "default" : "pointer" }}>
                            <img src={img} alt={titles(c.key)} draggable={false} className="absolute inset-0 w-full h-full object-contain" />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,11,13,0.7) 0%, rgba(11,11,13,0.05) 45%, transparent 100%)" }} />
                            {soon && <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />}
                            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: "#D91E2B" }} />
                            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: "#F3EEE6" }} />
                            <div className="absolute top-2.5 left-2.5 rounded-full px-2 py-0.5 text-[10px] font-black" style={{ fontFamily: "Oswald, sans-serif", background: c.color, color: "#0B0B0D" }}>{String(HM_CHAPTERS.indexOf(c) + 1).padStart(2, "0")}</div>
                            {soon && <div className="absolute inset-0 flex flex-col items-center justify-center gap-1"><span style={{ fontSize: 28 }}>🔒</span><span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", textShadow: "0 2px 8px #000" }} className="text-xl font-black">به‌زودی</span></div>}
                            {!soon && <div className="absolute bottom-0 inset-x-0" style={{ height: 4, background: "#505154" }}><div style={{ width: cp + "%", height: "100%", background: "linear-gradient(90deg,#1FA855,#3DE08A)" }} /></div>}
                          </button>
                          <div className="flex flex-col items-center mt-2 gap-0.5 text-center">
                            <h3 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-base font-black">{titles(c.key)}</h3>
                            <span style={{ fontFamily: "Vazirmatn, sans-serif", color: soon ? "#D0CCC4" : "#8CC4FF" }} className="text-[11px] font-black">{soon ? "" : `${d} از ${real.length} جلسه`}</span>
                          </div>
                          {isAdmin && c.gated && (
                            <ChapterVisibilityToggle visible={Boolean(chapterVisibility?.[c.key])} onToggle={(v) => onToggleChapterVisibility?.(c.key, v)} />
                          )}
                        </div>
                      );
                    })}
                  </HmRow>
                </div>

                <div className="mt-6"><HmBanners isAdmin={isAdmin} authToken={authToken} group="mid" auto={false} /></div>
                <div className="mt-6">
                  <HmSectionTitle title="تمرینات تخصصی بوکس" sub="تاباتا رایگانه" color="#F2CF5E" gold />
                  <HmRow tone="red" auto>
                    {PG_DATA.map((c) => {
                      const open = isAdmin || PG_FREE.includes(c.id) || plan === "silver";
                      return (
                        <div key={c.id} className="shrink-0 flex flex-col items-center gap-2" style={{ width: 232, scrollSnapAlign: "start" }}>
                        <button onClick={() => onOpenProgramCat?.(c.id)} className="relative w-full rounded-2xl flex items-center justify-center active:scale-95 transition-transform" style={{ height: 276, background: "#2B2C30", border: `1px solid ${c.color}`, boxShadow: `0 0 16px ${c.color}44` }}>
                          {c.img ? <img src={c.img} alt="" draggable={false} style={{ height: 256, width: "92%", objectFit: "contain", filter: `drop-shadow(0 4px 10px ${c.color}77)` }} /> : <span style={{ fontSize: 140, height: 256, display: "flex", alignItems: "center" }}>{c.icon}</span>}
                          {!open && <span className="absolute top-2 left-2 text-sm">🔒</span>}
                          {PG_FREE.includes(c.id) && !isAdmin && plan !== "silver" && <span className="absolute top-2 left-2 rounded-full px-1.5 py-0.5 text-[8px] font-black" style={{ fontFamily: "Vazirmatn, sans-serif", background: "#4DA3FF", color: "#0B0B0D" }}>رایگان</span>}
                        </button>
                        <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-base font-black leading-6 text-center">{c.title}</span>
                      </div>
                      );
                    })}
                  </HmRow>
                </div>
                <div className="mt-6">
                  <HmSectionTitle title="دوره A+" sub="فصل‌های ۴ تا ۷" color="#F2CF5E" gold />
                  <HmRow tone="blue" auto>
                    {HM_CHAPTERS.filter((c) => c.gated).map((c) => {
                      const { img, arr } = hmChapterData(c);
                      const real = arr.filter((it) => it.t && it.t !== PLACEHOLDER_LESSON_TITLE);
                      const d = real.filter((it) => done[`${c.key}-${it.n}`]).length;
                      const cp = real.length ? Math.round((d / real.length) * 100) : 0;
                      const soon = c.gated && !isAdmin && !chapterVisibility?.[c.key];
                      return (
                        <div key={c.key} className="relative shrink-0" style={{ width: "calc(100vw - 40px)", maxWidth: 420, scrollSnapAlign: "start" }}>
                          <button onClick={soon ? undefined : () => onNavigate("curriculum-" + c.key)} className="relative block w-full rounded-2xl overflow-hidden border active:scale-95 transition-transform" style={{ aspectRatio: "16 / 9", background: "#141317", borderColor: `${c.color}99`, cursor: soon ? "default" : "pointer" }}>
                            <img src={img} alt={titles(c.key)} draggable={false} className="absolute inset-0 w-full h-full object-contain" />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,11,13,0.7) 0%, rgba(11,11,13,0.05) 45%, transparent 100%)" }} />
                            {soon && <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />}
                            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: "#D91E2B" }} />
                            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: "#F3EEE6" }} />
                            <div className="absolute top-2.5 left-2.5 rounded-full px-2 py-0.5 text-[10px] font-black" style={{ fontFamily: "Oswald, sans-serif", background: c.color, color: "#0B0B0D" }}>{String(HM_CHAPTERS.indexOf(c) + 1).padStart(2, "0")}</div>
                            {soon && <div className="absolute inset-0 flex flex-col items-center justify-center gap-1"><span style={{ fontSize: 28 }}>🔒</span><span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", textShadow: "0 2px 8px #000" }} className="text-xl font-black">به‌زودی</span></div>}
                            {!soon && <div className="absolute bottom-0 inset-x-0" style={{ height: 4, background: "#505154" }}><div style={{ width: cp + "%", height: "100%", background: "linear-gradient(90deg,#1FA855,#3DE08A)" }} /></div>}
                          </button>
                          <div className="flex flex-col items-center mt-2 gap-0.5 text-center">
                            <h3 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-base font-black">{titles(c.key)}</h3>
                            <span style={{ fontFamily: "Vazirmatn, sans-serif", color: soon ? "#D0CCC4" : "#8CC4FF" }} className="text-[11px] font-black">{soon ? "" : `${d} از ${real.length} جلسه`}</span>
                          </div>
                          {isAdmin && c.gated && (
                            <ChapterVisibilityToggle visible={Boolean(chapterVisibility?.[c.key])} onToggle={(v) => onToggleChapterVisibility?.(c.key, v)} />
                          )}
                        </div>
                      );
                    })}
                  </HmRow>
                </div>

              </>
            );
          })()}
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0"
          style={{ background: "rgba(0,0,0,0.55)", zIndex: 30 }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute top-0 ${APP_DIR === "rtl" ? "right-0" : "left-0"} h-full flex flex-col px-5 pt-5 pb-24 overflow-y-auto [&>*]:shrink-0`}
            style={{ width: "62%", background: "#111013", [APP_DIR === "rtl" ? "borderLeft" : "borderRight"]: "1px solid #2a292e", overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
            dir={APP_DIR}
          >
            <div className="flex items-center justify-between mb-6">
              <span style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6", letterSpacing: "0.1em" }} className="text-xs font-semibold">
                {tr("منو")}</span>
              <button onClick={() => setMenuOpen(false)}>
                <CloseIcon className="w-5 h-5" style={{ color: "#F3EEE6" }} />
              </button>
            </div>

            {/* باکس حساب کاربری: با کلیک می‌ره به صفحه‌ی حساب کاربری */}
            <button
              data-testid="menu-account-box"
              onClick={onOpenAccount}
              className="w-full flex items-center gap-3 rounded-2xl px-4 py-5 mb-4 text-right"
              style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #E3F6FD 52%, #BFE6F5 100%)",
                border: "1px solid #FFFFFF",
                boxShadow: "0 0 26px rgba(230,248,255,0.6), 0 0 52px rgba(77,163,255,0.4), inset 0 0 18px rgba(255,255,255,0.9)",
              }}
            >
              <div
                className="rounded-full flex items-center justify-center shrink-0"
                style={{ width: "54px", height: "54px", background: "#334963", border: "1.5px solid #4DA3FF", boxShadow: "0 0 12px rgba(77,163,255,0.5)" }}
              >
                <UserIcon className="w-7 h-7" style={{ color: "#1C4FB0" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontFamily: "Vazirmatn, sans-serif", color: "#3C5A8A", fontSize: "12px", fontWeight: 700 }}>{tr("حساب کاربری")}</div>
                <div data-testid="menu-account-name" style={{ fontFamily: "Vazirmatn, sans-serif", color: "#0B1F45" }} className="text-base font-black truncate">
                  {accountName || tr("نام کاربر")}
                </div>
                <div data-testid="menu-account-contact" dir="ltr" style={{ fontFamily: "Oswald, sans-serif", color: "#1D3F7A", letterSpacing: "0.05em", textAlign: "right" }} className="text-sm truncate">
                  {accountContact || ""}
                </div>
              </div>
              <span style={{ color: "#1C4FB0", fontSize: "24px", lineHeight: 1 }}>‹</span>
            </button>


            <div className="mb-4">{membersBox}</div>

            <div className="flex flex-col gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const dotColor =
                  item.key === "support" && supportStatus === "pending"
                    ? "#F3EEE6"
                    : item.key === "support" && supportStatus === "answered"
                    ? "#1C6FD1"
                    : null;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      setMenuOpen(false);
                      if (item.key === "support") {
                        onOpenSupport?.();
                      } else if (item.key === "invite") {
                        setInviteOpen(true);
                      } else if (item.key === "webapp") {
                        openExternalUrl(WEB_APP_URL);
                      } else if (item.key === "language") {
                        setLangOpen(true);
                      } else {
                        onNavigate(item.key);
                      }
                    }}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 relative"
                    style={{
                      background: "#17161A",
                      border: "1px solid #4DA3FF",
                      boxShadow: "0 0 12px rgba(77,163,255,0.45)",
                    }}
                  >
                    <span className="shrink-0 flex items-center justify-center" style={{ color: item.color || "#D91E2B", filter: `drop-shadow(0 0 5px ${(item.color || "#D91E2B")}99)` }}>
                      <Icon className="w-6 h-6" style={{ color: item.color || "#D91E2B" }} />
                    </span>
                    <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-bold">
                      {item.label}
                    </span>
                    {dotColor && (
                      <span
                        style={{ background: dotColor, boxShadow: `0 0 6px ${dotColor}` }}
                        className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="h-4" />
            <button
              onClick={() => {
                setMenuOpen(false);
                onLogout();
              }}
              className="flex items-center gap-3 rounded-xl px-3 py-3 mt-auto mb-2"
              style={{ background: "#3C2A2F", border: "1px solid rgba(217,30,43,0.4)" }}
            >
              <LogoutIcon className="w-5 h-5" style={{ color: "#D91E2B" }} />
              <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }} className="text-sm font-bold">
                {isGuest ? tr("ورود / ثبت‌نام") : tr("خروج از حساب کاربری")}</span>
            </button>
            <ContactUs />
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- ارتباط با ما (پایین منو) ----------
const CONTACT_EMAIL = "Naseri.boxing.academy@gmail.com";
const CONTACT_TELEGRAM_ID = "@Nasseri_boxing_academy";

function GmailLogo({ className }) {
  return (
    <svg viewBox="0 0 48 36" className={className} aria-hidden="true">
      <rect x="0" y="0" width="48" height="36" rx="4" fill="#FFFFFF" />
      <path d="M0 6.5 V33 a3 3 0 0 0 3 3 H9 V14.5 Z" fill="#4285F4" />
      <path d="M48 6.5 V33 a3 3 0 0 1 -3 3 H39 V14.5 Z" fill="#34A853" />
      <path d="M0 6.5 a3 3 0 0 1 3 -3.5 h1.2 L24 17.5 L43.8 3 H45 a3 3 0 0 1 3 3.5 L39 14.5 L24 25.5 L9 14.5 Z" fill="#EA4335" />
      <path d="M48 6.5 L39 14.5 V8 Z" fill="#FBBC04" />
      <path d="M0 6.5 L9 14.5 V8 Z" fill="#C5221F" />
    </svg>
  );
}

function TelegramLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#2AABEE" />
      <path d="M5.2 11.6 L18.6 6.2 L16.3 17.6 L12.2 14.6 L9.7 17 L9.3 13.2 Z" fill="#FFFFFF" />
      <path d="M9.3 13.2 L16.1 8.3 L10.2 14.3 Z" fill="#C8DAEA" />
    </svg>
  );
}

// بدون باکس: یه تیتر کوچیک و دو خط (آیکون + متن) که با لمس، جیمیل یا تلگرام باز می‌شه
function ContactUs() {
  const row = { fontFamily: "Oswald, sans-serif", color: "#F3EEE6", letterSpacing: "0.02em" };
  return (
    <div data-testid="contact-us" className="mt-4 mb-4 flex flex-col items-start text-right">
      <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs font-bold mb-2">
        {tr("ارتباط با ما")}</span>
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        data-testid="contact-email"
        className="flex items-center gap-2 py-1.5"
        style={{ textDecoration: "none" }}
      >
        <GmailLogo className="w-5 h-4 shrink-0" />
        <span dir="ltr" style={row} className="text-xs break-all">
          {CONTACT_EMAIL}
        </span>
      </a>
      <a
        href={`https://t.me/${CONTACT_TELEGRAM_ID.slice(1)}`}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="contact-telegram"
        className="flex items-center gap-2 py-1.5"
        style={{ textDecoration: "none" }}
      >
        <TelegramLogo className="w-5 h-5 shrink-0" />
        <span dir="ltr" style={row} className="text-xs">
          {CONTACT_TELEGRAM_ID}
        </span>
      </a>
    </div>
  );
}

// ---------- Curriculum data (basic-to-intermediate) ----------
const CURRICULUM_BASIC = [
  { n: 1, t: tr("تئوری و مفهوم گارد") },
  { n: 2, t: tr("ایستادن در گارد") },
  { n: 3, t: tr("استقرار پاها") },
  { n: 4, t: tr("استقرار دست‌ها و گارد پایه") },
  { n: 5, t: tr("گارد پیکابو") },
  { n: 6, t: tr("گارد فیلی شل") },
  { n: 7, t: tr("نکته‌های گارد") },
  { n: 8, t: tr("چرخش شانه‌ها") },
  { n: 9, t: tr("ثبات سر") },
  { n: 10, t: tr("فرمان بدن") },
  { n: 11, t: tr("ستون‌گیری در گارد") },
  { n: 12, t: tr("حرکت پایه در گارد") },
  { n: 13, t: tr("چرخش شانه در جابجایی") },
  { n: 14, t: tr("دفاع شانه") },
  { n: 15, t: tr("حفظ ستون گارد در جابجایی") },
  { n: 16, t: tr("ستون‌گیری و انقباض دفاعی") },
  { n: 17, t: tr("مفهوم جابجایی و تغییر در گاردها") },
  { n: 18, t: tr("توضیحات تکمیلی تمرینات") },
  { n: 19, t: tr("جابجایی به جلو") },
  { n: 20, t: tr("جابجایی به عقب") },
  { n: 21, t: tr("جابجایی به چپ") },
  { n: 22, t: tr("جابجایی به راست") },
  { n: 23, t: tr("جابجایی جلو و عقب") },
  { n: 24, t: tr("جابجایی جلو و چپ") },
  { n: 25, t: tr("جابجایی جلو و راست") },
  { n: 26, t: tr("جابجایی عقب به جلو") },
  { n: 27, t: tr("جابجایی عقب به چپ") },
  { n: 28, t: tr("جابجایی عقب به راست") },
  { n: 29, t: tr("جابجایی چپ به عقب و جلو") },
  { n: 30, t: tr("جابجایی راست به عقب و جلو") },
];

// ---------- Curriculum data (فصل دو - آموزش ضربات) ----------
const CURRICULUM_ADVANCED = [
  { n: 1, t: tr("توضیحات فصل") },
  { n: 2, t: tr("معرفی ضربات دست") },
  { n: 3, t: tr("ضربه جب") },
  { n: 4, t: tr("ضربه کراس") },
  { n: 5, t: tr("هوک جب") },
  { n: 6, t: tr("هوک کراس") },
  { n: 7, t: tr("آپرکات جب") },
  { n: 8, t: tr("آپرکات کراس") },
  { n: 9, t: tr("ضربات در جابجایی، جلو، عقب") },
  { n: 10, t: tr("ضربات در جابجایی چپ، راست") },
  { n: 11, t: tr("مفهوم شوک ضربات") },
  { n: 12, t: tr("اجرای شوک ضربات") },
  { n: 13, t: tr("مفهوم اتصال، برگشت ضربات") },
  { n: 14, t: tr("اجرای اتصال ضربات") },
  { n: 15, t: tr("انتقال وزن بدن") },
  { n: 16, t: tr("اجرای شوک و انتقال قدرت") },
  { n: 17, t: tr("ضربات زیگزاگی") },
  { n: 18, t: tr("تکنیک زوج و فرد") },
  { n: 19, t: tr("اجرای تکنیک زوج و فرد") },
  { n: 20, t: tr("تمرین (ترکیب زنی ثابت)") },
  { n: 21, t: tr("تمرین (ترکیب زنی ثابت)") },
  { n: 22, t: tr("تمرین (ترکیب زنی ثابت)") },
  { n: 23, t: tr("تمرین (ترکیب زنی ثابت)") },
  { n: 24, t: tr("تمرین (ترکیب زنی ثابت)") },
  { n: 25, t: tr("تمرین (ترکیب زنی در جابجایی)") },
  { n: 26, t: tr("تمرین (ترکیب زنی در جابجایی)") },
  { n: 27, t: tr("تمرین (ترکیب زنی در جابجایی)") },
  { n: 28, t: tr("تمرین (ترکیب زنی در جابجایی)") },
  { n: 29, t: tr("تمرین (ترکیب زنی در جابجایی)") },
  { n: 30, t: tr("تمرین (ترکیب زنی در جابجایی)") },
];

// ---------- Curriculum data (فصل سه - آموزش جابجایی) ----------
const CURRICULUM_EXTRA = [
  { n: 1, t: tr("توضیحات فصل") },
  { n: 2, t: tr("توضیح جابجایی پایین تنه") },
  { n: 3, t: tr("جابجایی خطی") },
  { n: 4, t: tr("جابجایی پرگاری") },
  { n: 5, t: tr("فوتورک") },
  { n: 6, t: tr("تغییر گارد") },
  { n: 7, t: tr("گردش دورانی") },
  { n: 8, t: tr("تلفیق جابجایی‌ها") },
  { n: 9, t: tr("تلفیق جابجایی‌ها") },
  { n: 10, t: tr("جابجایی‌های بالاتنه") },
  { n: 11, t: tr("اسلیپ") },
  { n: 12, t: tr("پول بک") },
  { n: 13, t: tr("روول کردن") },
  { n: 14, t: tr("تمرین (اسلیپ)") },
  { n: 15, t: tr("تمرین (روول کردن)") },
  { n: 16, t: tr("تمرین (پول بک)") },
  { n: 17, t: tr("تمرین (اسلیپ + روول)") },
  { n: 18, t: tr("تمرین (پول بک + اسلیپ + روول)") },
  { n: 19, t: tr("تمرین (جابجایی‌های پایین تنه)") },
  { n: 20, t: tr("تمرین (جابجایی‌های پایین تنه)") },
  { n: 21, t: tr("تمرین (جابجایی‌های پایین تنه)") },
  { n: 22, t: tr("تمرین (جابجایی‌های پایین تنه)") },
  { n: 23, t: tr("تمرین (جابجایی‌های پایین تنه)") },
  { n: 24, t: tr("تمرین (جابجایی‌های پایین تنه)") },
  { n: 25, t: tr("تمرین (اسلیپ + پول بک)") },
  { n: 26, t: tr("تمرین (اسلیپ روول)") },
  { n: 27, t: tr("تمرین (جابجایی‌های بالاتنه)") },
  { n: 28, t: tr("تمرین (جابجایی‌های بالاتنه)") },
  { n: 29, t: tr("تمرین (جابجایی‌های بالاتنه)") },
  { n: 30, t: tr("تمرین (جابجایی‌های بالاتنه)") },
];

// ---------- Curriculum data (فصل دوم - سه فصل جدید، در انتظار عنوان و محتوا) ----------
const CURRICULUM_FIGHT = Array.from({ length: 30 }, (_, i) => ({
  n: i + 1,
  t: tr("در انتظار محتوا"),
}));

const CURRICULUM_PARTNER = Array.from({ length: 30 }, (_, i) => ({
  n: i + 1,
  t: tr("در انتظار محتوا"),
}));

const CURRICULUM_FOCUS = Array.from({ length: 30 }, (_, i) => ({
  n: i + 1,
  t: tr("در انتظار محتوا"),
}));

const HIGHLIGHT_YELLOW = new Set([30]);

// عنوان پیش‌فرض فصل‌ها (اگه ادمین از توی اپ عوضش نکرده باشه همین‌ها نشون داده می‌شن)
const DEFAULT_CHAPTER_TITLES = {
  basic: tr("آموزش پایه گارد"),
  advanced: tr("آموزش ضربات"),
  extra: tr("آموزش جابجایی"),
  fight: tr("تکنیک‌های تخصصی بوکس"),
  fightb: tr("تکنیک‌های تخصصی بوکس ۲"),
  partner: tr("اسپارینگ / تمرین مبارزه"),
  focus: tr("قالب استایل / مبارزه"),
};

// متن و لینک دعوت از دوستان - وقتی لینک واقعی اپ (کافه‌بازار، صفحه‌ی دانلود مستقیم و ...) رو آماده کردی، همینجا جایگزینش کن
const INVITE_SHARE_TITLE = tr("آموزش بوکس حرفه‌ای");
const INVITE_SHARE_TEXT_ANDROID = tr("🥇اولین اپلیکیشن آموزش بوکس حرفه ای 🥇\nحتما امتحانش کن 🌹");
const WEB_APP_URL = "https://naseri-group-iran.ir/app/";
const INVITE_SHARE_WEB_TEXT = tr("🥇اولین اپلیکیشن آموزش بوکس حرفه ای 🥇\nنسخه وب / iOS (آیفون): لینک رو توی Safari باز کن و Add to Home Screen بزن 🌹");
const INVITE_SHARE_URL_ANDROID = "http://cafebazaar.ir/app/?id=ir.naseri.boxingapp&ref=share";

function PlayIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}
function MuteIcon({ className, muted }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
      {muted ? (
        <path d="M16 9l5 6M21 9l-5 6" />
      ) : (
        <path d="M16.5 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14" />
      )}
    </svg>
  );
}
function ExpandIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}
function UploadCloudIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 18a4 4 0 0 1-1-7.9A5 5 0 0 1 16 8a4 4 0 0 1 1 7.9" />
      <path d="M12 12v7M9 15l3-3 3 3" />
    </svg>
  );
}

function formatTime(sec) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

// ---------- Professional Video Player ----------
const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5];
const SEEK_STEP_SECONDS = 10;
const CONTROLS_HIDE_MS = 3000;
const DOUBLE_TAP_MS = 280;

// عکس پیش‌نمایش هر ویدیو (یه فریم از خود ویدیو) - بعد از یه‌بار ساخته شدن توی همین نشست نگه داشته می‌شه
const videoPosterCache = new Map();
const POSTER_MAX_WIDTH = 640;

// یه فریم از ویدیو رو با یه عنصر <video> مخفی می‌گیره و به‌صورت عکس برمی‌گردونه.
// اگه سرور اجازه‌ی CORS نده یا هر مشکلی پیش بیاد، null برمی‌گردونه و پلیر مثل قبل کار می‌کنه.
const POSTER_PROBE_TIMEOUT_MS = 4000;

// روی گوشی‌های کم‌رم (۲ گیگ یا کمتر) عکس پیش‌نمایش گرفته نمی‌شه تا فشاری روی حافظه و دیکودر ویدیو نیاد
function shouldCapturePoster() {
  const memory = typeof navigator !== "undefined" ? navigator.deviceMemory : undefined;
  return !(memory && memory <= 2);
}

function captureVideoPoster(src, isCancelled, timeoutMs = 15000) {
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
      } catch {
        // مهم نیست
      }
      resolve(value);
    };
    timer = setTimeout(() => finish(null), timeoutMs);
    probe.crossOrigin = "anonymous";
    probe.muted = true;
    probe.playsInline = true;
    probe.preload = "metadata";
    probe.onloadedmetadata = () => {
      if (isCancelled?.()) return finish(null);
      const target = Math.min(1, Math.max(0.05, (probe.duration || 1) * 0.1));
      try {
        probe.currentTime = target;
      } catch {
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
      } catch {
        // کنوس به‌خاطر CORS قفل شد
        finish(null);
      }
    };
    probe.onerror = () => finish(null);
    probe.src = src;
  });
}

function SkipIcon({ className, forward }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {forward ? (
        <>
          <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
          <path d="M21 3v5h-5" />
        </>
      ) : (
        <>
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
          <path d="M3 3v5h5" />
        </>
      )}
      <text x="12" y="15.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor" stroke="none" fontFamily="Oswald, sans-serif">
        10
      </text>
    </svg>
  );
}

function ReplayIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function ShrinkIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function VideoPlayer({ src, onComplete, onTick, storageScope, subKey, subVersion }) {
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
  const playIntentRef = useRef(false); // کاربر قبل از آماده شدن ویدیو دکمه‌ی پخش رو زده

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
  const [subLangs, setSubLangs] = useState([]); // زبان‌های زیرنویسِ موجود برای این ویدیو
  const [subPref, setSubPref] = useState("auto"); // "auto" (زبان اپ) | "off" | کد زبان
  const [subCues, setSubCues] = useState([]);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [subHint, setSubHint] = useState(false); // «زیرنویس موجوده» وقتی زیرنویس هست ولی روشن نیست
  const [showControls, setShowControls] = useState(true);
  const [interactionTick, setInteractionTick] = useState(0);
  const [dragRatio, setDragRatio] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [flash, setFlash] = useState(null); // { side: "back" | "fwd", total }
  const [resumeNote, setResumeNote] = useState("");
  const [poster, setPoster] = useState(() => videoPosterCache.get(src) || null);
  // ویدیوی اصلی فقط بعد از تموم شدن (و آزاد شدن) ویدیوی مخفیِ عکس پیش‌نمایش لود می‌شه؛ یعنی هیچ‌وقت دو دیکودر همزمان باز نیست
  const [mediaReady, setMediaReady] = useState(() => videoPosterCache.has(src) || !shouldCapturePoster());

  // رفرنس‌هایی که داخل تایمرها (closure قدیمی) هم مقدار تازه رو نشون بدن
  const playingRef = useRef(false);
  const showControlsRef = useRef(true);
  const speedMenuOpenRef = useRef(false);
  playingRef.current = playing;
  showControlsRef.current = showControls;
  speedMenuOpenRef.current = speedMenuOpen;

  // زبانِ زیرنویسِ فعال: «خودکار» یعنی زبان اپ (برای فارسی، چون صدای ویدیو فارسیه، پیش‌فرض خاموشه)
  const activeSubLang =
    subPref === "off"
      ? null
      : subPref === "auto"
        ? APP_LANG !== "fa" && subLangs.includes(APP_LANG)
          ? APP_LANG
          : null
        : subLangs.includes(subPref)
          ? subPref
          : null;

  useEffect(() => {
    AppStorage.get("video-sub").then((v) => {
      if (v === "off" || v === "auto" || SUB_LANG_CODE_RE.test(String(v))) setSubPref(v);
    });
  }, []);

  useEffect(() => {
    let alive = true;
    setSubLangs([]);
    apiFetchSubLangs(subKey).then((l) => alive && setSubLangs(l));
    return () => {
      alive = false;
    };
  }, [subKey, subVersion]);

  useEffect(() => {
    let alive = true;
    setSubCues([]);
    if (!activeSubLang) return undefined;
    apiFetchSubText(subKey, activeSubLang).then((t) => alive && setSubCues(parseSrt(t)));
    return () => {
      alive = false;
    };
  }, [subKey, activeSubLang, subVersion]);

  // اگه برای این ویدیو زیرنویس هست ولی الان روشن نیست (مثلاً اپ فارسیه)، چند ثانیه یادآوری می‌کنیم که دکمه‌ی CC هست
  useEffect(() => {
    if (subLangs.length === 0 || activeSubLang || subPref === "off") return undefined;
    setSubHint(true);
    const timer = setTimeout(() => setSubHint(false), 5000);
    return () => clearTimeout(timer);
  }, [subLangs, subPref, activeSubLang]);

  const currentCue = activeSubLang ? subCues.find((c) => current >= c.start && current <= c.end) : null;

  const posKey = storageScope ? accountKey(storageScope, `video-pos:${src}`) : `video-pos:${src}`;

  const netState = useConnectivity();
  const prevNetStateRef = useRef(netState);
  const [slowBuffer, setSlowBuffer] = useState(false);

  const revealControls = () => {
    setShowControls(true);
    setInteractionTick((t) => t + 1);
  };

  // وقتی منبع ویدیو عوض شد (جلسه‌ی دیگه)، همه‌چیز از اول
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
    setSubMenuOpen(false);
    setDragRatio(null);
    setResumeNote("");
    endedRef.current = false;
    lastTimeRef.current = 0;
    lastSavedRef.current = 0;
    pendingSeekRef.current = 0;
    // موقع خروج از جلسه (یا عوض شدن ویدیو)، آخرین نقطه‌ی تماشا رو ذخیره می‌کنیم
    return () => {
      const t = Math.floor(lastTimeRef.current);
      if (!endedRef.current && t >= 5) AppStorage.set(posKey, String(t));
    };
  }, [src]);

  // عکس پیش‌نمایش: قبل از پخش، یه فریم از خود ویدیو نشون داده می‌شه (به‌جای صفحه‌ی خالی)
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

  // اگه کاربر قبل از آماده شدن ویدیو «پخش» رو زده بود، حالا شروع می‌شه
  useEffect(() => {
    if (mediaReady && playIntentRef.current) {
      playIntentRef.current = false;
      videoRef.current?.play()?.catch?.(() => {});
    }
  }, [mediaReady]);

  // سرعت پخش انتخاب‌شده‌ی قبلی (مثلاً ۰.۷۵ برای دیدن آهسته‌ی تکنیک) بین جلسات یادش می‌مونه
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

  // هر ثانیه‌ای که ویدیو واقعاً در حال پخشه، به تایم تمرین اضافه می‌شه
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => onTick?.(), 1000);
    return () => clearInterval(id);
  }, [playing]);

  // کنترل‌ها وقتی ویدیو در حال پخشه و کاربر کاری نمی‌کنه، بعد از چند ثانیه خودکار مخفی می‌شن
  useEffect(() => {
    if (!showControls || !playing || speedMenuOpen || dragRatio !== null) return;
    const id = setTimeout(() => setShowControls(false), CONTROLS_HIDE_MS);
    return () => clearTimeout(id);
  }, [showControls, playing, speedMenuOpen, dragRatio, interactionTick]);

  // وقتی اپ می‌ره پس‌زمینه، ویدیو متوقف می‌شه
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) videoRef.current?.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // وضعیت تمام‌صفحه + قفل افقی (اگه گوشی/وب‌ویو اجازه بده)
  useEffect(() => {
    const onChange = () => {
      const active = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
      setIsFullscreen(active);
      if (!active) {
        try {
          screen.orientation?.unlock?.();
        } catch {
          // مهم نیست
        }
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
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
    const v = videoRef.current;
    if (!v) return;
    // هنوز منتظر آماده شدن ویدیو هستیم (عکس پیش‌نمایش در حال ساخته شدنه)؛ پخش به‌محض آماده شدن شروع می‌شه
    if (!mediaReady) {
      playIntentRef.current = true;
      return;
    }
    if (v.ended) v.currentTime = 0;
    if (v.paused || v.ended) {
      v.play()?.catch?.(() => {});
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

  // لمس روی خود ویدیو: یک‌بار = نمایش/مخفی کنترل‌ها (یا پخش اگه متوقفه)، دوبار سریع = جلو/عقب یا پخش/توقف
  const handleSurfaceTap = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
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
    setBufferedPct((end / v.duration) * 100);
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

    // بعد از خطا و «تلاش مجدد»: از همون نقطه‌ای که بودیم ادامه بده
    if (pendingSeekRef.current > 0) {
      v.currentTime = pendingSeekRef.current;
      pendingSeekRef.current = 0;
      return;
    }
    // ادامه از جایی که دفعه‌ی قبل ول کرده بود
    const stored = Number(await AppStorage.get(posKey));
    if (stored > 5 && v.duration && stored < v.duration - 5 && v.currentTime < 1) {
      v.currentTime = stored;
      setCurrent(stored);
      setResumeNote(tr("ادامه از {time}", { time: formatTime(stored) }));
      clearTimeout(noteTimerRef.current);
      noteTimerRef.current = setTimeout(() => setResumeNote(""), 3000);
    }
  };

  const handleRetry = () => {
    const v = videoRef.current;
    if (!v) return;
    pendingSeekRef.current = lastTimeRef.current;
    setError(false);
    setBuffering(true);
    v.load();
    v.play()?.catch?.(() => {});
  };

  // اگه ویدیو به‌خاطر قطعی اینترنت خطا داده بود، با برگشتن اینترنت خودکار دوباره تلاش می‌کنه
  useEffect(() => {
    const was = prevNetStateRef.current;
    prevNetStateRef.current = netState;
    if (error && was !== "ok" && netState === "ok") {
      const id = setTimeout(handleRetry, 500);
      return () => clearTimeout(id);
    }
  }, [netState]);

  // اگه بافر شدن بیشتر از چند ثانیه طول بکشه، یعنی اینترنت ضعیفه
  useEffect(() => {
    if (!buffering) {
      setSlowBuffer(false);
      return;
    }
    const id = setTimeout(() => {
      setSlowBuffer(true);
      pingServer();
    }, 6000);
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
          await screen.orientation?.lock?.("landscape");
        } catch {
          // قفل افقی روی همه‌ی دستگاه‌ها پشتیبانی نمی‌شه - مشکلی نیست
        }
      }
    } catch {
      // مرورگر/وب‌ویو اجازه‌ی تمام‌صفحه نداد
    }
  };

  // ---- نوار پیشرفت: کشیدن با انگشت ----
  const ratioFromPointer = (e) => {
    const rect = barRef.current.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
  };
  const onBarPointerDown = (e) => {
    if (!duration) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
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

  const progressPct = dragRatio !== null ? dragRatio * 100 : duration ? (current / duration) * 100 : 0;
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
    color: "#F3EEE6",
  };

  return (
    <div
      ref={containerRef}
      data-fast-tap="true"
      dir="ltr"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "#000",
        aspectRatio: "16 / 9",
        borderRadius: isFullscreen ? 0 : "12px",
        touchAction: "manipulation",
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <style>{`
        @keyframes vpSpin { to { transform: rotate(360deg); } }
        @keyframes vpFlash { 0% { opacity: 0; transform: scale(0.9); } 15% { opacity: 1; transform: scale(1); } 100% { opacity: 0.9; } }
      `}</style>

      <video
        ref={videoRef}
        src={mediaReady ? `${src}#t=0.1` : undefined}
        poster={poster || undefined}
        preload="metadata"
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        onTimeUpdate={onTimeUpdate}
        onProgress={updateBuffered}
        onLoadedMetadata={onLoadedMeta}
        onPlay={() => {
          setPlaying(true);
          setEnded(false);
          endedRef.current = false;
        }}
        onPause={() => {
          setPlaying(false);
          persistPosition();
        }}
        onPlaying={() => setBuffering(false)}
        onWaiting={() => setBuffering(true)}
        onSeeking={() => setBuffering(true)}
        onSeeked={() => setBuffering(false)}
        onCanPlay={() => setBuffering(false)}
        onError={() => {
          setBuffering(false);
          setPlaying(false);
          setError(true);
          pingServer(); // ببین خطا از قطعی اینترنته یا نه
        }}
        onEnded={() => {
          setPlaying(false);
          setEnded(true);
          endedRef.current = true;
          AppStorage.remove(posKey);
          lastSavedRef.current = 0;
          onComplete?.();
        }}
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        playsInline
      />

      {/* لایه‌ی لمس روی ویدیو: تپ ساده / دوتپ برای جلو و عقب */}
      <div
        onClick={handleSurfaceTap}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* زیرنویس */}
      {currentCue && !error && (
        <div
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            bottom: controlsVisible ? 58 : 12,
            transition: "bottom 200ms",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span
            dir={subLangIsRtl(activeSubLang) ? "rtl" : "ltr"}
            style={{
              fontFamily: subLangIsRtl(activeSubLang) ? "Vazirmatn, sans-serif" : "system-ui, sans-serif",
              fontSize: isFullscreen ? 18 : 13,
              lineHeight: 1.6,
              color: "#fff",
              background: "rgba(0,0,0,0.7)",
              borderRadius: 6,
              padding: "2px 10px",
              textAlign: "center",
              whiteSpace: "pre-line",
              maxWidth: "100%",
              textShadow: "0 1px 2px rgba(0,0,0,0.9)",
            }}
          >
            {currentCue.text}
          </span>
        </div>
      )}

      {/* گوشه‌های طناب رینگ، مثل بقیه‌ی اپ */}
      <div style={{ position: "absolute", top: 8, right: 8, width: 14, height: 14, borderTop: "2px solid #D91E2B", borderRight: "2px solid #D91E2B", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 8, left: 8, width: 14, height: 14, borderBottom: "2px solid #F3EEE6", borderLeft: "2px solid #F3EEE6", pointerEvents: "none" }} />

      {/* بازخورد دوتپ: ۱۰ ثانیه جلو/عقب */}
      {flash && (
        <div
          key={flash.total + flash.side}
          style={{
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
            textShadow: "0 1px 4px rgba(0,0,0,0.9)",
          }}
        >
          <SkipIcon forward={flash.side === "fwd"} className="w-8 h-8" />
          <span style={{ fontFamily: "Vazirmatn, sans-serif", fontSize: 11, fontWeight: 700 }}>
            {tr("{n} ثانیه", { n: flash.total.toLocaleString(NUM_LOCALE) })}
          </span>
        </div>
      )}

      {/* یادآوری زیرنویس */}
      {subHint && !resumeNote && !error && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
            background: "rgba(11,11,13,0.8)",
            border: "1px solid rgba(77,163,255,0.5)",
            borderRadius: 9999,
            padding: "4px 12px",
            fontFamily: "Vazirmatn, sans-serif",
            fontSize: 11,
            color: "#4DA3FF",
            whiteSpace: "nowrap",
          }}
        >
          {tr("زیرنویس موجوده؛ با دکمه‌ی CC روشنش کن")}
        </div>
      )}

      {/* پیام «ادامه از ...» */}
      {resumeNote && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
            background: "rgba(11,11,13,0.8)",
            border: "1px solid rgba(243,238,230,0.5)",
            borderRadius: 9999,
            padding: "4px 12px",
            fontFamily: "Vazirmatn, sans-serif",
            fontSize: 11,
            color: "#F3EEE6",
            whiteSpace: "nowrap",
          }}
        >
          {resumeNote}
        </div>
      )}

      {/* حالت خطا */}
      {error && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: "rgba(11,11,13,0.88)",
            textAlign: "center",
            padding: 16,
          }}
        >
          {netState !== "ok" && <WifiOffIcon className="w-7 h-7" style={{ color: "#D91E2B" }} />}
          <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", fontSize: 13 }}>
            {netState === "blocked"
              ? NETWORK_BLOCKED_MESSAGE
              : netState === "offline"
                ? NETWORK_OFFLINE_MESSAGE
                : netState === "weak"
                  ? tr("اینترنت ضعیف است")
                  : tr("پخش ویدیو با مشکل مواجه شد. دوباره امتحان کن.")}
          </span>
          {netState !== "blocked" && (
            <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", fontSize: 11 }}>{NETWORK_VPN_HINT}</span>
          )}
          {netState !== "ok" && (
            <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", fontSize: 11 }}>
              {tr("وقتی اتصال برقرار شد، پخش خودکار ادامه پیدا می‌کنه")}</span>
          )}
          <button
            onClick={handleRetry}
            style={{ fontFamily: "Vazirmatn, sans-serif", background: "#D91E2B", color: "#F3EEE6", fontSize: 12, fontWeight: 700, borderRadius: 8, padding: "8px 18px", marginTop: 4 }}
          >
            {tr("تلاش مجدد")}</button>
        </div>
      )}

      {/* اسپینر بافر + هشدار اینترنت */}
      {(buffering || !mediaReady) && !error && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, pointerEvents: "none" }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              border: "3px solid rgba(243,238,230,0.25)",
              borderTopColor: "#F3EEE6",
              animation: "vpSpin 0.8s linear infinite",
            }}
          />
          {(netState === "offline" || netState === "blocked" || slowBuffer || netState === "weak") && (
            <span
              style={{
                fontFamily: "Vazirmatn, sans-serif",
                fontSize: 12,
                color: "#F3EEE6",
                background: "rgba(11,11,13,0.78)",
                border: `1px solid ${netState === "offline" ? "#D91E2B" : "#F3EEE6"}`,
                borderRadius: 9999,
                padding: "3px 12px",
              }}
            >
              {netState === "blocked" ? NETWORK_BLOCKED_MESSAGE : netState === "offline" ? NETWORK_OFFLINE_MESSAGE : tr("اینترنت ضعیف است")}
            </span>
          )}
        </div>
      )}

      {/* دکمه‌های وسط: ۱۰ ثانیه عقب / پخش و توقف / ۱۰ ثانیه جلو */}
      {!error && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            pointerEvents: "none",
            opacity: controlsVisible && !buffering ? 1 : 0,
            transition: "opacity 200ms",
          }}
        >
          <button
            onClick={() => {
              skip(-SEEK_STEP_SECONDS);
              revealControls();
            }}
            aria-label={tr("۱۰ ثانیه عقب")}
            style={{ ...roundBtn, width: 40, height: 40, pointerEvents: uiPointer }}
          >
            <SkipIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              togglePlay();
              revealControls();
            }}
            aria-label={playing ? tr("توقف") : tr("پخش")}
            style={{
              width: 58,
              height: 58,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9999px",
              background: "rgba(217,30,43,0.92)",
              boxShadow: "0 0 20px rgba(217,30,43,0.55)",
              color: "#F3EEE6",
              pointerEvents: uiPointer,
            }}
          >
            {ended ? (
              <ReplayIcon className="w-6 h-6" style={{ color: "#F3EEE6" }} />
            ) : playing ? (
              <PauseIcon className="w-6 h-6" style={{ color: "#F3EEE6" }} />
            ) : (
              <PlayIcon className="w-6 h-6" style={{ color: "#F3EEE6", marginRight: "-2px" }} />
            )}
          </button>
          <button
            onClick={() => {
              skip(SEEK_STEP_SECONDS);
              revealControls();
            }}
            aria-label={tr("۱۰ ثانیه جلو")}
            style={{ ...roundBtn, width: 40, height: 40, pointerEvents: uiPointer }}
          >
            <SkipIcon forward className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* منوی زیرنویس */}
      {subMenuOpen && controlsVisible && subLangs.length > 0 && (
        <div
          style={{
            position: "absolute",
            right: 52,
            bottom: 52,
            display: "flex",
            flexDirection: "column",
            background: "rgba(23,22,26,0.96)",
            border: "1px solid #2a292e",
            borderRadius: 10,
            overflow: "hidden",
            zIndex: 3,
            minWidth: 110,
          }}
        >
          {[{ code: "off", label: tr("خاموش") }, ...subLangs.map((c) => ({ code: c, label: subLangName(c) }))].map((o) => {
            const selected = o.code === "off" ? subPref === "off" || !activeSubLang : activeSubLang === o.code;
            return (
              <button
                key={o.code}
                onClick={() => {
                  setSubPref(o.code);
                  AppStorage.set("video-sub", o.code);
                  setSubMenuOpen(false);
                  revealControls();
                }}
                style={{
                  fontFamily: "Vazirmatn, sans-serif",
                  fontSize: 12,
                  padding: "6px 16px",
                  color: selected ? "#F3EEE6" : "#DAD6CE",
                  fontWeight: selected ? 700 : 400,
                  background: selected ? "rgba(243,238,230,0.12)" : "transparent",
                  textAlign: "center",
                }}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      )}

      {/* منوی سرعت پخش */}
      {speedMenuOpen && controlsVisible && (
        <div
          style={{
            position: "absolute",
            right: 10,
            bottom: 52,
            display: "flex",
            flexDirection: "column",
            background: "rgba(23,22,26,0.96)",
            border: "1px solid #2a292e",
            borderRadius: 10,
            overflow: "hidden",
            zIndex: 2,
          }}
        >
          {PLAYBACK_SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => {
                applySpeed(s);
                AppStorage.set("video-speed", String(s));
                setSpeedMenuOpen(false);
                revealControls();
              }}
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: 12,
                padding: "5px 18px",
                color: s === speed ? "#F3EEE6" : "#DAD6CE",
                fontWeight: s === speed ? 700 : 400,
                background: s === speed ? "rgba(243,238,230,0.12)" : "transparent",
                textAlign: "center",
              }}
            >
              {s}x
            </button>
          ))}
        </div>
      )}

      {/* نوار پایین: پیشرفت + زمان + صدا + سرعت + تمام‌صفحه */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "22px 12px 6px",
          background: "linear-gradient(to top, rgba(0,0,0,0.88), transparent)",
          opacity: controlsVisible ? 1 : 0,
          transition: "opacity 200ms",
          pointerEvents: "none",
        }}
      >
        <div
          ref={barRef}
          onPointerDown={onBarPointerDown}
          onPointerMove={onBarPointerMove}
          onPointerUp={(e) => finishBarDrag(e, true)}
          onPointerCancel={(e) => finishBarDrag(e, false)}
          style={{ height: 24, display: "flex", alignItems: "center", cursor: "pointer", touchAction: "none", pointerEvents: uiPointer, position: "relative" }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: dragRatio !== null ? 6 : 4,
              borderRadius: 9999,
              background: "#5F6063",
              transition: "height 120ms",
            }}
          >
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${bufferedPct}%`, borderRadius: 9999, background: "rgba(255,255,255,0.35)" }} />
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${progressPct}%`, borderRadius: 9999, background: "linear-gradient(90deg,#1FA855,#3DE08A)" }} />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: `${progressPct}%`,
                width: dragRatio !== null ? 16 : 12,
                height: dragRatio !== null ? 16 : 12,
                borderRadius: "50%",
                background: "#F3EEE6",
                boxShadow: "0 0 8px rgba(243,238,230,0.7)",
                transform: "translate(-50%,-50%)",
                transition: "width 120ms, height 120ms",
              }}
            />
            {dragRatio !== null && (
              <div
                style={{
                  position: "absolute",
                  bottom: 18,
                  left: `${Math.min(92, Math.max(8, progressPct))}%`,
                  transform: "translateX(-50%)",
                  background: "rgba(11,11,13,0.92)",
                  border: "1px solid #F3EEE6",
                  borderRadius: 6,
                  padding: "2px 7px",
                  fontFamily: "Oswald, sans-serif",
                  fontSize: 11,
                  color: "#F3EEE6",
                  whiteSpace: "nowrap",
                }}
              >
                {formatTime(displayTime)}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", pointerEvents: uiPointer }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button onClick={toggleMute} aria-label={muted ? tr("پخش صدا") : tr("بی‌صدا")} style={{ padding: 4, color: "#F3EEE6" }}>
              <MuteIcon className="w-5 h-5" muted={muted} style={{ color: "#F3EEE6" }} />
            </button>
            <span style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6", fontSize: 11 }}>
              {formatTime(displayTime)} / {formatTime(duration)}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {subLangs.length > 0 && (
              <button
                onClick={() => {
                  setSubMenuOpen((o) => !o);
                  setSpeedMenuOpen(false);
                  revealControls();
                }}
                aria-label={tr("زیرنویس")}
                style={{ padding: 4, color: activeSubLang ? "#F3EEE6" : "#F3EEE6" }}
              >
                <CcIcon className="w-5 h-5" style={{ color: activeSubLang ? "#F3EEE6" : "#F3EEE6" }} />
              </button>
            )}
            <button
              onClick={() => {
                setSpeedMenuOpen((o) => !o);
                setSubMenuOpen(false);
                revealControls();
              }}
              aria-label={tr("سرعت پخش")}
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: speed === 1 ? "#F3EEE6" : "#F3EEE6",
                border: `1px solid ${speed === 1 ? "rgba(243,238,230,0.35)" : "#F3EEE6"}`,
                borderRadius: 6,
                padding: "2px 8px",
              }}
            >
              {speed}x
            </button>
            <button onClick={toggleFullscreen} aria-label={tr("تمام‌صفحه")} style={{ padding: 4, color: "#F3EEE6" }}>
              {isFullscreen ? (
                <ShrinkIcon className="w-5 h-5" style={{ color: "#F3EEE6" }} />
              ) : (
                <ExpandIcon className="w-5 h-5" style={{ color: "#F3EEE6" }} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Screen: Lesson detail with video ----------
// جلوی اسکرین‌شات و ضبط صفحه رو با فلگ امنیتی اندروید می‌گیره - فقط وقتی از این استفاده کن که واقعاً لازمه
function setScreenCaptureBlocked(blocked) {
  const PS = window.Capacitor?.Plugins?.PrivacyScreen;
  if (!PS) return;
  if (blocked) PS.enable?.().catch(() => {});
  else PS.disable?.().catch(() => {});
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
  const [subVersion, setSubVersion] = useState(0);
  const [adminSubLangs, setAdminSubLangs] = useState([]);
  const [subBusy, setSubBusy] = useState("");
  const subFileRef = useRef(null);
  const subTargetRef = useRef("en");
  const [extraLangChoice, setExtraLangChoice] = useState(""); // کد زبانِ انتخاب‌شده برای افزودن | "__custom"
  const [customLangCode, setCustomLangCode] = useState("");
  const [registryLangs, setRegistryLangs] = useState([]); // زبان‌های اضافه‌ی سراسری (برای همه‌ی جلسه‌ها)
  const lessonSubKey = `${curriculumKey === "fightb" ? "fight" : curriculumKey}-${item.n}`;

  useEffect(() => {
    if (!isAdmin) return undefined;
    let alive = true;
    apiFetchSubLangs(lessonSubKey).then((l) => alive && setAdminSubLangs(l));
    apiFetchSubLanguages().then((l) => alive && setRegistryLangs(l));
    return () => {
      alive = false;
    };
  }, [isAdmin, lessonSubKey, subVersion]);

  const handleSubFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const lang = subTargetRef.current;
    setError("");
    setSubBusy(lang);
    try {
      await apiUploadSub(lessonSubKey, lang, file, authToken);
      setSubVersion((v) => v + 1);
    } catch (err) {
      setError(err.message || tr("آپلود زیرنویس با خطا مواجه شد"));
    } finally {
      setSubBusy("");
    }
  };

  const handleSubDelete = async (lang) => {
    setError("");
    setSubBusy(lang);
    try {
      await apiDeleteSub(lessonSubKey, lang, authToken);
      setSubVersion((v) => v + 1);
    } catch (err) {
      setError(err.message || tr("حذف زیرنویس با خطا مواجه شد"));
    } finally {
      setSubBusy("");
    }
  };

  // تا وقتی کاربر توی صفحه‌ی ویدیوئه، اسکرین‌شات و ضبط صفحه مسدود می‌شه؛ با خروج از این صفحه دوباره آزاد می‌شه
  useEffect(() => {
    // ادمین آزاده اسکرین‌شات و ضبط صفحه بگیره
    setScreenCaptureBlocked(!isAdmin);
    return () => setScreenCaptureBlocked(false);
  }, [isAdmin]);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
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
        setProgress(Math.round((ev.loaded / ev.total) * 100));
      }
    };

    xhr.onload = () => {
      setUploading(false);
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && data.ok) {
          onUploaded(toAbsoluteVideoUrl(data.url));
        } else {
          setError(data.error || tr("آپلود ویدیو با خطا مواجه شد"));
        }
      } catch {
        setError(tr("آپلود ویدیو با خطا مواجه شد"));
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      setError(NETWORK_OFFLINE_MESSAGE);
      pingServer();
    };

    xhr.send(form);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6" dir={APP_DIR}>
      <button
        onClick={onBack}
        style={{
          color: "#0B0B0D",
          fontFamily: "Vazirmatn, sans-serif",
          background: "#DAD6CE",
        }}
        className="text-sm mb-3 rounded-lg px-3 py-1.5 font-bold inline-block"
      >
        {tr("› بازگشت")}</button>

      <div className="flex items-center gap-2 mb-4">
        <div
          className="rounded-full flex items-center justify-center shrink-0"
          style={{
            width: "28px",
            height: "28px",
            background: isHi ? "#F3EEE6" : "#17161A",
            border: `1.5px solid ${isHi ? "#F3EEE6" : "#D91E2B"}`,
          }}
        >
          <span
            style={{
              fontFamily: "Oswald, sans-serif",
              color: isHi ? "#0B0B0D" : "#F3EEE6",
              fontSize: "11px",
            }}
            className="font-bold"
          >
            {item.n}
          </span>
        </div>
        <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-base font-black leading-6 flex-1">
          {item.t}
        </h1>
        {isAdmin && !editingTitle && (
          <button
            onClick={() => {
              setTitleDraft(item.t);
              setEditingTitle(true);
            }}
            className="shrink-0 rounded-full p-1.5"
            style={{ background: "#17161A", border: "1px solid #2a292e" }}
          >
            <PencilIcon className="w-3.5 h-3.5" style={{ color: "#F3EEE6" }} />
          </button>
        )}
      </div>

      {isAdmin && editingTitle && (
        <div
          className="flex items-center gap-2 mb-4 rounded-xl px-3 py-2 border"
          style={{ background: "#17161A", borderColor: "#2a292e" }}
        >
          <input
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }}
            className="bg-transparent outline-none flex-1 text-sm"
            autoFocus
          />
          <button
            disabled={savingTitle || !titleDraft.trim()}
            onClick={async () => {
              setSavingTitle(true);
              try {
                await onRename?.(titleDraft.trim());
                setEditingTitle(false);
              } catch {
                // خطای شبکه - فرم باز می‌مونه تا دوباره امتحان کنه
              } finally {
                setSavingTitle(false);
              }
            }}
            style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", background: "#D91E2B" }}
            className="rounded-lg px-3 py-1.5 text-xs font-bold shrink-0"
          >
            {savingTitle ? "..." : tr("ذخیره")}
          </button>
          <button
            onClick={() => setEditingTitle(false)}
            style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }}
            className="text-xs shrink-0"
          >
            {tr("انصراف")}</button>
        </div>
      )}

      {videoSrc ? (
        <VideoPlayer src={videoSrc} onComplete={onComplete} onTick={onPracticeTick} storageScope={accountId} subKey={`${curriculumKey}-${item.n}`} subVersion={subVersion} />
      ) : uploading ? (
        <div
          className="relative w-full rounded-xl flex flex-col items-center justify-center gap-3 border"
          style={{ aspectRatio: "16 / 9", background: "#141317", borderColor: "#2a292e" }}
        >
          <span style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6" }} className="text-lg font-bold">
            {progress}%
          </span>
          <div className="w-2/3 rounded-full overflow-hidden" style={{ height: "5px", background: "#2a292e" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg,#1FA855,#3DE08A)" }}
            />
          </div>
          <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs">
            {tr("در حال آپلود ویدیو…")}</span>
        </div>
      ) : connectivityState !== "ok" ? (
        <div
          className="relative w-full rounded-xl flex flex-col items-center justify-center gap-2 border px-4 text-center"
          style={{ aspectRatio: "16 / 9", background: "#141317", borderColor: "#2a292e" }}
        >
          <WifiOffIcon className="w-8 h-8" style={{ color: "#D91E2B" }} />
          <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm">
            {connectivityState === "blocked" ? NETWORK_BLOCKED_MESSAGE : connectivityState === "weak" ? tr("اینترنت ضعیف است") : NETWORK_OFFLINE_MESSAGE}
          </span>
          {connectivityState !== "blocked" && (
            <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs">
              {NETWORK_VPN_HINT}
            </span>
          )}
          <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs">
            {tr("وقتی اتصال برقرار شد، ویدیو خودکار بارگذاری می‌شه")}</span>
        </div>
      ) : videosStatus === "loading" ? (
        <div
          className="relative w-full rounded-xl flex flex-col items-center justify-center gap-2 border px-4 text-center"
          style={{ aspectRatio: "16 / 9", background: "#141317", borderColor: "#2a292e" }}
        >
          <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm">
            {tr("در حال دریافت لیست ویدیوها…")}</span>
        </div>
      ) : videosStatus === "error" ? (
        <div
          data-testid="videos-load-failed"
          className="relative w-full rounded-xl flex flex-col items-center justify-center gap-2 border px-4 text-center"
          style={{ aspectRatio: "16 / 9", background: "#141317", borderColor: "#2a292e" }}
        >
          <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm">
            {tr("لیست ویدیوها دریافت نشد")}</span>
          <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs leading-6">
            {tr("اینترنت دستگاه را چک کنید و {hint}", { hint: NETWORK_VPN_HINT })}
          </span>
          <button
            onClick={onRetryVideos}
            style={{ fontFamily: "Vazirmatn, sans-serif", background: "#D91E2B", color: "#F3EEE6" }}
            className="rounded-lg px-5 py-2 text-xs font-bold"
          >
            {tr("تلاش دوباره")}</button>
        </div>
      ) : isAdmin ? (
        <button
          onClick={() => fileRef.current?.click()}
          className="relative w-full rounded-xl flex flex-col items-center justify-center gap-2 border"
          style={{ aspectRatio: "16 / 9", background: "#141317", borderColor: "#2a292e" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent 0 16px, rgba(217,30,43,0.06) 16px 17px, transparent 17px 33px)",
            }}
          />
          <div
            className="relative rounded-full flex items-center justify-center"
            style={{ width: "48px", height: "48px", background: "#3F292F", border: "1px solid rgba(217,30,43,0.4)" }}
          >
            <UploadCloudIcon className="w-6 h-6" style={{ color: "#D91E2B" }} />
          </div>
          <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="relative text-xs">
            {tr("آپلود ویدیوی این جلسه")}</span>
        </button>
      ) : (
        <div
          className="relative w-full rounded-xl flex flex-col items-center justify-center gap-2 border"
          style={{ aspectRatio: "16 / 9", background: "#141317", borderColor: "#2a292e" }}
        >
          <GloveIcon className="w-8 h-8" style={{ color: "#3a393e" }} />
          <span style={{ fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }} className="text-xs">
            {tr("ویدیوی این جلسه هنوز اضافه نشده")}</span>
        </div>
      )}
      <input ref={fileRef} type="file" accept="video/*" onChange={handleFile} className="hidden" />
      <input ref={subFileRef} type="file" accept=".srt,text/plain,application/x-subrip" onChange={handleSubFile} className="hidden" />

      {isAdmin && videoSrc && (
        <div className="mt-3 rounded-xl border px-3 py-3" style={{ background: "#141317", borderColor: "#2a292e" }}>
          <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs font-bold mb-2">
            {tr("زیرنویس‌های این جلسه")}
          </p>
          {[...SUB_LANG_CODES, ...[...new Set([...registryLangs, ...adminSubLangs])].filter((c) => !SUB_LANG_CODES.includes(c)).sort()].map((code) => {
            const has = adminSubLangs.includes(code);
            return (
              <div key={code} className="flex items-center justify-between py-1.5">
                <span style={{ fontFamily: "Vazirmatn, sans-serif", color: has ? "#F3EEE6" : "#8A8790" }} className="text-xs">
                  {subLangName(code)} {has ? "✓" : ""}
                </span>
                <span className="flex items-center gap-3">
                  <button
                    disabled={subBusy !== ""}
                    onClick={() => {
                      subTargetRef.current = code;
                      subFileRef.current?.click();
                    }}
                    style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", background: "#D91E2B", opacity: subBusy ? 0.5 : 1 }}
                    className="rounded-lg px-3 py-1 text-xs font-bold"
                  >
                    {subBusy === code ? "..." : has ? tr("جایگزین کردن") : tr("آپلود SRT")}
                  </button>
                  {has && (
                    <button
                      disabled={subBusy !== ""}
                      onClick={() => handleSubDelete(code)}
                      style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }}
                      className="text-xs"
                    >
                      {tr("حذف")}
                    </button>
                  )}
                  {!has && !SUB_LANG_CODES.includes(code) && (
                    <button
                      disabled={subBusy !== ""}
                      onClick={async () => {
                        setError("");
                        try {
                          setRegistryLangs(await apiSetSubLanguage(code, authToken, true));
                        } catch (err) {
                          setError(err.message || tr("حذف زیرنویس با خطا مواجه شد"));
                        }
                      }}
                      aria-label={tr("حذف از لیست")}
                      style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }}
                      className="text-xs"
                    >
                      ✕
                    </button>
                  )}
                </span>
              </div>
            );
          })}

          <div className="mt-3 pt-3" style={{ borderTop: "1px solid #2a292e" }}>
            <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs mb-2">
              {tr("افزودن زبان دیگر")}
            </p>
            <div className="flex items-center gap-2">
              <select
                value={extraLangChoice}
                onChange={(e) => setExtraLangChoice(e.target.value)}
                style={{ fontFamily: "Vazirmatn, sans-serif", background: "#0B0B0D", color: "#F3EEE6", border: "1px solid #2a292e" }}
                className="flex-1 rounded-lg px-2 py-1.5 text-xs outline-none"
              >
                <option value="">{tr("انتخاب زبان…")}</option>
                {SUB_EXTRA_LANG_CODES.filter((c) => !adminSubLangs.includes(c)).map((c) => (
                  <option key={c} value={c}>
                    {SUB_LANG_TABLE[c][0]} — {SUB_LANG_TABLE[c][1]}
                  </option>
                ))}
                <option value="__custom">{tr("کد زبان دیگر…")}</option>
              </select>
              <button
                disabled={subBusy !== "" || !extraLangChoice || (extraLangChoice === "__custom" && !customLangCode.trim())}
                onClick={async () => {
                  const code = (extraLangChoice === "__custom" ? customLangCode : extraLangChoice).trim().toLowerCase();
                  if (!SUB_LANG_CODE_RE.test(code)) {
                    setError(tr("کد زبان معتبر نیست (مثلاً es یا pt-br)"));
                    return;
                  }
                  setError("");
                  try {
                    setRegistryLangs(await apiSetSubLanguage(code, authToken, false));
                    setExtraLangChoice("");
                    setCustomLangCode("");
                  } catch (err) {
                    setError(err.message || tr("آپلود زیرنویس با خطا مواجه شد"));
                  }
                }}
                style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", background: "#D91E2B", opacity: subBusy !== "" || !extraLangChoice ? 0.5 : 1 }}
                className="rounded-lg px-3 py-1.5 text-xs font-bold shrink-0"
              >
                {tr("افزودن زبان")}
              </button>
            </div>
            <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }} className="text-[11px] leading-5 mt-2">
              {tr("زبانِ اضافه‌شده برای همه‌ی جلسه‌ها در همین لیست ظاهر می‌شه؛ فایل زیرنویس رو برای هر جلسه جدا آپلود کن.")}
            </p>
            {extraLangChoice === "__custom" && (
              <input
                value={customLangCode}
                onChange={(e) => setCustomLangCode(e.target.value.slice(0, 12))}
                placeholder={tr("کد زبان (مثلاً es یا pt-br)")}
                dir="ltr"
                style={{ fontFamily: "Oswald, sans-serif", background: "#0B0B0D", color: "#F3EEE6", border: "1px solid #2a292e" }}
                className="w-full rounded-lg px-3 py-1.5 text-xs outline-none mt-2"
              />
            )}
          </div>
        </div>
      )}

      {error && (
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }} className="text-xs text-center mt-2">
          {error}
        </p>
      )}

      {videoSrc && isAdmin && !uploading && (
        <button
          onClick={() => fileRef.current?.click()}
          style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", border: "1px solid #2a292e" }}
          className="mt-3 w-full rounded-lg py-2.5 text-xs"
        >
          {tr("تعویض ویدیو")}</button>
      )}

      <div className="mt-6 rounded-xl p-4" style={{ background: "#17161A", border: "1px solid #232227" }}>
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xs leading-6">
          {tr("© تمامی حقوق این ویدیو متعلق به آکادمی آموزش بوکس ناصری است. هرگونه کپی‌برداری، دانلود یا بازنشر آن بدون اجازه‌ی کتبی، پیگرد قانونی دارد.")}</p>
      </div>
    </div>
  );
}

// ---------- Screen: Curriculum grid (50 boxes, 10 rows x 5) ----------
const FREE_LESSONS_COUNT = 5;

function CurriculumScreen({ title, items, onBack, onSelect, hasVideo, plan, onLockedSelect, isCompleted, curriculumKey, isAdmin, onRename }) {
  const isGoldChapter = ["fight", "fightb", "partner", "focus"].includes(curriculumKey);
  // اشتراک نقره‌ای فقط سه فصل اول (basic/advanced/extra) رو باز می‌کنه؛
  // اشتراک طلایی فقط سه فصل دوم (fight/partner/focus) رو باز می‌کنه - این دو تا از هم جدان
  // ادمین خودش همیشه به همه‌ی فصل‌ها دسترسی داره، نیازی به خرید اشتراک نداره
  const hasAccess = isAdmin || (isGoldChapter ? plan === "gold" : plan === "silver");
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title);
  const [savingTitle, setSavingTitle] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6" dir={APP_DIR}>
      <button
        onClick={onBack}
        style={{
          color: "#0B0B0D",
          fontFamily: "Vazirmatn, sans-serif",
          background: "#DAD6CE",
        }}
        className="text-sm mb-3 rounded-lg px-3 py-1.5 font-bold inline-block"
      >
        {tr("› بازگشت")}</button>

      <div className="flex items-center justify-center gap-2 mb-1">
        <h1
          style={{
            fontFamily: "Vazirmatn, sans-serif",
            color: "#F3EEE6",
            textShadow: "0 0 12px rgba(77,163,255,0.85), 0 0 24px rgba(77,163,255,0.5)",
          }}
          className="text-base font-black text-center leading-6"
        >
          {title}
        </h1>
        {isAdmin && !editingTitle && (
          <button
            onClick={() => {
              setTitleDraft(title);
              setEditingTitle(true);
            }}
            className="shrink-0 rounded-full p-1.5"
            style={{ background: "#17161A", border: "1px solid #2a292e" }}
          >
            <PencilIcon className="w-3.5 h-3.5" style={{ color: "#F3EEE6" }} />
          </button>
        )}
      </div>

      {isAdmin && editingTitle && (
        <div
          className="flex items-center gap-2 mb-3 rounded-xl px-3 py-2 border"
          style={{ background: "#17161A", borderColor: "#2a292e" }}
        >
          <input
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }}
            className="bg-transparent outline-none flex-1 text-sm"
            autoFocus
          />
          <button
            disabled={savingTitle || !titleDraft.trim()}
            onClick={async () => {
              setSavingTitle(true);
              try {
                await onRename?.(titleDraft.trim());
                setEditingTitle(false);
              } catch {
                // خطای شبکه - فرم باز می‌مونه تا دوباره امتحان کنه
              } finally {
                setSavingTitle(false);
              }
            }}
            style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", background: "#D91E2B" }}
            className="rounded-lg px-3 py-1.5 text-xs font-bold shrink-0"
          >
            {savingTitle ? "..." : tr("ذخیره")}
          </button>
          <button
            onClick={() => setEditingTitle(false)}
            style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }}
            className="text-xs shrink-0"
          >
            {tr("انصراف")}</button>
        </div>
      )}
      <div className="w-full rounded-full mb-4" style={{ background: "#D91E2B", height: "3px" }} />

      <div className="flex flex-col gap-3">
        <style>{`@keyframes lessonShine { 0% { transform: translateX(-140%) skewX(-18deg); } 55%, 100% { transform: translateX(380%) skewX(-18deg); } }`}</style>
        {items.map((it) => {
          const hasVid = hasVideo?.(it.n);
          const locked = it.n > FREE_LESSONS_COUNT && !hasAccess;
          const done = isCompleted?.(it.n);
          const squareColor = done ? "#2FD27A" : "#DCEBF5";
          return (
            <button
              key={it.n}
              onClick={() => (locked ? onLockedSelect?.() : onSelect(it))}
              className="relative w-full rounded-xl overflow-hidden flex items-center gap-3 px-4 active:scale-[0.98] transition-transform"
              style={{ height: "70px", background: "#2B2C30", border: `1.5px solid ${squareColor}` }}
            >
              <img src={SPLASH_LOGO_SRC} alt="" draggable={false} className="absolute pointer-events-none" style={{ left: "50%", top: "50%", height: "92%", width: "auto", transform: "translate(-50%, -50%)", opacity: 0.13, objectFit: "contain" }} />
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div style={{ position: "absolute", top: 0, bottom: 0, width: "38%", background: "linear-gradient(90deg, transparent, rgba(220,235,245,0.22), transparent)", animation: `lessonShine 3.6s ease-in-out ${(it.n % 6) * 0.45}s infinite`, willChange: "transform" }} />
              </div>
              <div className="relative shrink-0 rounded-lg flex items-center justify-center" style={{ width: "40px", height: "40px", background: "#1E1F22", border: `1px solid ${squareColor}` }}>
                <span style={{ fontFamily: "Oswald, sans-serif", color: "#F3EEE6", fontSize: "20px" }} className="font-bold">{it.n}</span>
              </div>
              <span
                style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", background: "linear-gradient(180deg, #FFF3B8 0%, #F2CF5E 38%, #B98A22 62%, #F8DF84 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.6))", fontSize: "15px", fontWeight: 800, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                className="relative flex-1 text-right break-words"
              >
                {it.t}
              </span>
              <div className="relative shrink-0 flex items-center justify-center">
                {locked ? (
                  <span style={{ fontSize: "22px", lineHeight: 1 }}>🔒</span>
                ) : done ? (
                  <CheckIcon className="w-7 h-7" style={{ color: "#2FD27A" }} />
                ) : (
                  hasVid && (
                    <div className="rounded-full flex items-center justify-center" style={{ width: "34px", height: "34px", background: "#DCEBF5" }}>
                      <div style={{ width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderRight: "11px solid #2B2C30", marginRight: "3px" }} />
                    </div>
                  )
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CheckIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

// ---------- Screen: Subscription / VIP ----------
// ---------- باکس‌های «زنده» اشتراک نقره‌ای/طلایی ----------
// فقط opacity و transform انیمیشن داره (سبک برای گوشی) و با «کاهش حرکت» در تنظیمات گوشی خاموش می‌شه
const PLAN_TONES = {
  silver: {
    background: "linear-gradient(145deg, #FFFFFF 0%, #E6EBF4 46%, #C9D2E0 100%)",
    border: "1px solid rgba(255,255,255,0.95)",
    shadow: "0 0 28px rgba(170,200,255,0.55), 0 0 56px rgba(190,210,245,0.35), 0 8px 26px rgba(0,0,0,0.45), inset 0 0 20px rgba(255,255,255,0.9)",
    glow: "rgba(150,185,255,0.45)",
    shine: "rgba(255,255,255,0.85)",
    spark: "#6E86C8",
  },
  gold: {
    background: "linear-gradient(145deg, #FFF6D0 0%, #FFE28A 46%, #F5BE45 100%)",
    border: "1px solid rgba(255,244,200,0.95)",
    shadow: "0 0 30px rgba(255,190,60,0.6), 0 0 60px rgba(255,170,40,0.35), 0 8px 26px rgba(0,0,0,0.45), inset 0 0 20px rgba(255,255,255,0.7)",
    glow: "rgba(255,200,80,0.55)",
    shine: "rgba(255,255,255,0.8)",
    spark: "#C27A00",
  },
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
    { bottom: "96px", right: "26px", d: 2 },
  ];
  return (
    <div data-testid={`plan-card-${tone}`} className={`relative rounded-2xl overflow-hidden ${className}`} style={{ background: t.background, border: t.border, boxShadow: t.shadow }}>
      <div className="plan-glow" style={{ background: `radial-gradient(ellipse at 50% -15%, ${t.glow}, transparent 64%)`, animationDelay: `${delay}s` }} />
      <div className="plan-shine" style={{ background: `linear-gradient(90deg, transparent, ${t.shine}, transparent)`, animationDelay: `${delay}s` }} />
      {sparks.map((sp, i) => (
        <span key={i} className="plan-spark" style={{ top: sp.top, bottom: sp.bottom, left: sp.left, right: sp.right, color: t.spark, animationDelay: `${sp.d + delay}s` }}>
          ✦
        </span>
      ))}
      <div className="relative p-5">{children}</div>
    </div>
  );
}

const GRAD_WHITE = { background: "linear-gradient(180deg, #FFFFFF 0%, #ECEFF5 45%, #A9B0BD 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" };
const PLAN_FRAME_CSS = `
  .pf-mask { position: absolute; inset: 0; pointer-events: none; -webkit-mask-size: 100% 100%; mask-size: 100% 100%; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; overflow: hidden; }
  .pf-sweep { position: absolute; top: -10%; bottom: -10%; left: 0; width: 34%; transform: translateX(-160%) skewX(-18deg); animation: pfSweep 4.8s ease-in-out infinite; will-change: transform; background: linear-gradient(90deg, transparent, rgba(255,236,170,0.55), rgba(255,255,255,0.9), rgba(255,236,170,0.55), transparent); }
  .pf-pulse { position: absolute; inset: 0; animation: pfPulse 3.4s ease-in-out infinite; will-change: opacity; background: radial-gradient(ellipse at 50% 0%, rgba(255,200,70,0.55), transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(255,170,40,0.4), transparent 55%); mix-blend-mode: screen; }
  .pf-spark { position: absolute; pointer-events: none; color: #FFE9A0; font-size: 13px; opacity: 0; animation: pfSpark 3s ease-in-out infinite; text-shadow: 0 0 8px #FFC83C; }
  .pf-neon { animation: pfNeon 2.2s ease-in-out infinite; }
  @keyframes pfSweep { 0% { transform: translateX(-160%) skewX(-18deg); } 55%, 100% { transform: translateX(420%) skewX(-18deg); } }
  @keyframes pfPulse { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.85; } }
  @keyframes pfSpark { 0%, 100% { opacity: 0; transform: scale(0.6); } 50% { opacity: 1; transform: scale(1.2); } }
  @keyframes pfNeon { 0%, 100% { text-shadow: 0 0 6px #39FF14, 0 0 14px rgba(57,255,20,0.7); } 50% { text-shadow: 0 0 10px #39FF14, 0 0 26px rgba(57,255,20,1); } }
  @media (prefers-reduced-motion: reduce) { .pf-sweep, .pf-pulse, .pf-spark, .pf-neon { animation: none !important; } .pf-pulse { opacity: 0.4; } }
`;

// قاب طلایی اشتراک: عکس قاب، متن‌ها داخل بخش مشکی، و نور زنده‌ای که دقیقاً به شکل قاب بریده می‌شه (mask)
function PlanFrame({ img, delay = 0, className = "", edit, children }) {
  const maskStyle = { WebkitMaskImage: `url(${img})`, maskImage: `url(${img})` };
  const sparks = [{ top: "3%", left: "47%", d: 0 }, { top: "22%", right: "9%", d: 1.1 }, { top: "24%", left: "8%", d: 2 }, { bottom: "6%", right: "14%", d: 0.6 }];
  return (
    <div className={`relative ${className}`} style={{ filter: "drop-shadow(0 6px 18px rgba(255,170,40,0.28))" }}>
      <img src={img} alt="" draggable={false} style={{ display: "block", width: "100%", height: "auto" }} />
      <div className="pf-mask" style={maskStyle}>
        <div className="pf-pulse" style={{ animationDelay: `${delay}s` }} />
        <div className="pf-sweep" style={{ animationDelay: `${delay}s` }} />
      </div>
      {sparks.map((sp, i) => (
        <span key={i} className="pf-spark" style={{ top: sp.top, bottom: sp.bottom, left: sp.left, right: sp.right, animationDelay: `${sp.d + delay}s` }}>✦</span>
      ))}
      {edit}
      <div className="absolute flex flex-col items-center justify-center text-center" style={{ top: "38%", bottom: "8%", left: "12%", right: "12%" }}>
        {children}
      </div>
    </div>
  );
}

const DEFAULT_PROMO_TEXT = tr("🔥 تخفیف ویژه‌ی آغازین!\nهمین حالا اشتراکت رو بگیر و مسیر قهرمانی رو شروع کن");
const PROMO_TEXT_MAX = 100;

// باکس تبلیغاتی بالای صفحه‌ی اشتراک: وسط‌چین، ارتفاع دو خط، گرادیان نئونی با بک‌لایت. ادمین می‌تونه متنش رو عوض کنه.
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
      setError(err.message || tr("ذخیره نشد"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      data-testid="promo-banner"
      className="relative w-full rounded-2xl overflow-hidden mb-4"
      style={{
        background: "linear-gradient(120deg, #5B21B6 0%, #C026D3 52%, #06B6D4 100%)",
        border: "1px solid rgba(255,255,255,0.28)",
        // درخشش ثابت (سبک برای گوشی)؛ «زنده بودن» از لایه‌های متحرک زیر میاد که فقط opacity/transform عوض می‌کنن
        boxShadow: "0 0 30px rgba(192,38,211,0.50), 0 0 60px rgba(91,33,182,0.32), inset 0 0 18px rgba(255,255,255,0.12)",
      }}
    >
      <style>{`
        @keyframes promoPulse { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.95; } }
        @keyframes promoShine { 0% { transform: translateX(-130%) skewX(-18deg); } 60%, 100% { transform: translateX(260%) skewX(-18deg); } }
        @media (prefers-reduced-motion: reduce) { .promo-anim { animation: none !important; } }
      `}</style>
      <div
        className="promo-anim absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(6,182,212,0.75), transparent 62%)", animation: "promoPulse 3.2s ease-in-out infinite", willChange: "opacity" }}
      />
      <div
        className="promo-anim absolute top-0 bottom-0 pointer-events-none"
        style={{ width: "40%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent)", animation: "promoShine 4.5s ease-in-out infinite", willChange: "transform" }}
      />

      {editing ? (
        <div className="relative p-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, PROMO_TEXT_MAX))}
            rows={2}
            maxLength={PROMO_TEXT_MAX}
            dir={APP_DIR}
            placeholder={tr("متن تبلیغاتی (حداکثر دو خط)")}
            style={{ fontFamily: "Vazirmatn, sans-serif", background: "rgba(11,11,13,0.45)", color: "#fff", border: "1px solid rgba(255,255,255,0.35)", lineHeight: 1.75, resize: "none" }}
            className="w-full rounded-xl px-3 py-2 text-sm text-center outline-none"
          />
          <div className="flex items-center justify-between mt-2 gap-2">
            <span style={{ fontFamily: "Oswald, sans-serif", color: "rgba(255,255,255,0.8)" }} className="text-xs">
              {draft.length}/{PROMO_TEXT_MAX}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => save("")}
                disabled={saving}
                style={{ fontFamily: "Vazirmatn, sans-serif", color: "#fff", border: "1px solid rgba(255,255,255,0.45)" }}
                className="rounded-lg px-3 py-1.5 text-xs"
              >
                {tr("متن پیش‌فرض")}</button>
              <button
                onClick={() => setEditing(false)}
                disabled={saving}
                style={{ fontFamily: "Vazirmatn, sans-serif", color: "#fff", border: "1px solid rgba(255,255,255,0.45)" }}
                className="rounded-lg px-3 py-1.5 text-xs"
              >
                {tr("انصراف")}</button>
              <button
                onClick={() => save(draft)}
                disabled={saving}
                style={{ fontFamily: "Vazirmatn, sans-serif", background: "#fff", color: "#5B21B6" }}
                className="rounded-lg px-4 py-1.5 text-xs font-black"
              >
                {saving ? "…" : tr("ذخیره")}
              </button>
            </div>
          </div>
          {error && (
            <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#FFE4E6" }} className="text-xs mt-2 text-center">
              {error}
            </p>
          )}
        </div>
      ) : (
        <div className="relative flex items-center justify-center px-12" style={{ height: "80px" }}>
          <p
            data-testid="promo-text"
            style={{
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
              textShadow: "0 1px 10px rgba(0,0,0,0.45)",
            }}
          >
            {shown}
          </p>
          {isAdmin && (
            <button
              onClick={() => {
                setDraft(text || DEFAULT_PROMO_TEXT);
                setError("");
                setEditing(true);
              }}
              aria-label={tr("ویرایش متن تبلیغاتی")}
              className="absolute rounded-full flex items-center justify-center"
              style={{ top: "8px", left: "8px", width: "28px", height: "28px", background: "rgba(11,11,13,0.4)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff" }}
            >
              <PencilIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// دکمه‌ی مدادِ گوشه‌ی باکس اشتراک (فقط ادمین)
function PlanEditButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={tr("ویرایش")}
      className="absolute rounded-full flex items-center justify-center"
      style={{ top: "10px", left: "10px", width: "30px", height: "30px", background: "rgba(11,11,13,0.55)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", zIndex: 5 }}
    >
      <PencilIcon className="w-4 h-4" />
    </button>
  );
}

// پنجره‌ی ویرایش قیمت و متن یک باکس اشتراک (فقط ادمین)
function PlanEditor({ planKey, initial, onSave, onReset, onClose }) {
  const [draft, setDraft] = useState({
    title: initial.title || "",
    months: String(initial.months),
    price: String(initial.price),
    originalPrice: initial.originalPrice ? String(initial.originalPrice) : "",
    badge: initial.badge || "",
    description: initial.description || "",
    buttonText: initial.buttonText || "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }));

  const fieldStyle = { fontFamily: "Vazirmatn, sans-serif", background: "#0B0B0D", color: "#F3EEE6", border: "1px solid #2a292e" };
  const labelStyle = { fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" };

  const save = async () => {
    setError("");
    const price = parseNumberInput(draft.price);
    const months = parseNumberInput(draft.months);
    if (price < 1000) {
      setError(tr("قیمت باید حداقل ۱,۰۰۰ تومان باشه"));
      return;
    }
    if (months < 1 || months > 60) {
      setError(tr("مدت اعتبار باید بین ۱ تا ۶۰ ماه باشه"));
      return;
    }
    setBusy(true);
    try {
      await onSave({
        title: draft.title,
        months,
        price,
        originalPrice: parseNumberInput(draft.originalPrice),
        badge: draft.badge,
        description: draft.description,
        buttonText: draft.buttonText,
      });
      onClose();
    } catch (err) {
      setError(err.message || tr("ذخیره نشد"));
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    setBusy(true);
    setError("");
    try {
      await onReset();
      onClose();
    } catch (err) {
      setError(err.message || tr("ذخیره نشد"));
      setBusy(false);
    }
  };

  const Field = ({ label, hint, children }) => (
    <label className="block mb-3">
      <span style={labelStyle} className="text-xs block mb-1">{label}</span>
      {children}
      {hint && <span style={{ ...labelStyle, color: "#55535a" }} className="text-[11px] block mt-1">{hint}</span>}
    </label>
  );

  return (
    <div className="fixed inset-0 flex items-end justify-center" style={{ background: "rgba(0,0,0,0.7)", zIndex: 60 }} dir={APP_DIR}>
      <div className="w-full rounded-t-2xl px-4 pt-4 pb-6 overflow-y-auto" style={{ background: "#141317", border: "1px solid #2a292e", maxHeight: "88%", maxWidth: 480 }}>
        <h2 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm font-black mb-1">
          {planKey === "silver" ? tr("ویرایش اشتراک دوره اول") : tr("ویرایش اشتراک دوره دوم")}
        </h2>
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#E8B33D" }} className="text-[11px] leading-5 mb-4">
          {tr("قیمت جدید همون لحظه برای خرید از درگاه پرداخت (زرین‌پال) هم اعمال می‌شه. فیلدهای متنی خالی = متن پیش‌فرض اپ (به زبان کاربر).")}
        </p>

        <Field label={tr("قیمت (تومان)")}>
          <input value={draft.price} onChange={(e) => set("price", e.target.value)} inputMode="numeric" dir="ltr" style={fieldStyle} className="w-full rounded-lg px-3 py-2 text-sm outline-none" />
        </Field>
        <Field label={tr("قیمت قبل از تخفیف (تومان)")} hint={tr("خالی = قیمت خط‌خورده نمایش داده نشه")}>
          <input value={draft.originalPrice} onChange={(e) => set("originalPrice", e.target.value)} inputMode="numeric" dir="ltr" style={fieldStyle} className="w-full rounded-lg px-3 py-2 text-sm outline-none" />
        </Field>
        <Field label={tr("مدت اعتبار (ماه)")}>
          <input value={draft.months} onChange={(e) => set("months", e.target.value)} inputMode="numeric" dir="ltr" style={fieldStyle} className="w-full rounded-lg px-3 py-2 text-sm outline-none" />
        </Field>
        <Field label={tr("عنوان باکس")}>
          <input value={draft.title} onChange={(e) => set("title", e.target.value.slice(0, 40))} dir={APP_DIR} style={fieldStyle} className="w-full rounded-lg px-3 py-2 text-sm outline-none" />
        </Field>
        <Field label={tr("برچسب (مثلاً تخفیف آغازین)")} hint={tr("برای پنهان کردن برچسب، فقط - بنویس")}>
          <input value={draft.badge} onChange={(e) => set("badge", e.target.value.slice(0, 30))} dir={APP_DIR} style={fieldStyle} className="w-full rounded-lg px-3 py-2 text-sm outline-none" />
        </Field>
        <Field label={tr("توضیح (زیر برچسب)")}>
          <textarea value={draft.description} onChange={(e) => set("description", e.target.value.slice(0, 200))} rows={3} dir={APP_DIR} style={fieldStyle} className="w-full rounded-lg px-3 py-2 text-sm outline-none" />
        </Field>
        <Field label={tr("متن دکمه‌ی خرید")}>
          <input value={draft.buttonText} onChange={(e) => set("buttonText", e.target.value.slice(0, 30))} dir={APP_DIR} style={fieldStyle} className="w-full rounded-lg px-3 py-2 text-sm outline-none" />
        </Field>

        {error && <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }} className="text-xs mb-2">{error}</p>}

        <div className="flex items-center gap-2 mt-2">
          <button onClick={save} disabled={busy} style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", background: "#D91E2B", opacity: busy ? 0.6 : 1 }} className="flex-1 rounded-xl py-2.5 text-sm font-bold">
            {busy ? "..." : tr("ذخیره")}
          </button>
          <button onClick={onClose} disabled={busy} style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", border: "1px solid #2a292e" }} className="rounded-xl px-4 py-2.5 text-sm">
            {tr("انصراف")}
          </button>
        </div>
        <button
          onClick={() => (confirmReset ? reset() : setConfirmReset(true))}
          disabled={busy}
          style={{ fontFamily: "Vazirmatn, sans-serif", color: confirmReset ? "#D91E2B" : "#8A8790" }}
          className="w-full text-xs mt-3"
        >
          {confirmReset ? tr("مطمئنی؟ دوباره بزن تا به قیمت و متن پیش‌فرض برگرده") : tr("بازگشت به قیمت و متن پیش‌فرض")}
        </button>
      </div>
    </div>
  );
}

function SubscriptionScreen({ plan, planExpiresAt, authToken, isLoggedIn, onRequireLogin, onPlanConfirmed, chapterVisibility, chapterTitles, promoText, plans, isAdmin, onSavePromoText, onSavePlan, onResetPlan }) {
  const pl = mergePlans(plans);
  const [editingPlan, setEditingPlan] = useState(null); // "silver" | "gold" | null
  // اسم فصل‌ها همون اسمیه که ادمین توی صفحه‌ی اصلی گذاشته (با تغییرش، این‌جا هم خودکار عوض می‌شه)
  const chapterName = (key) => chapterTitles?.[key] || DEFAULT_CHAPTER_TITLES[key];
  const silverChapterNames = ["basic", "advanced", "extra"].map(chapterName).join(tr("، "));
  const goldChapterNames = ["fight", "fightb", "partner", "focus"].map(chapterName).join(tr("، "));
  // به‌محض اینکه ادمین حتی یکی از فصل‌های طلایی (مبارزه/اسپارینگ/استایل) رو برای کاربرا باز کنه،
  // خرید اشتراک طلایی هم همون لحظه فعال می‌شه
  const goldUnlocked = Boolean(chapterVisibility?.fight || chapterVisibility?.fightb || chapterVisibility?.partner || chapterVisibility?.focus);
  const [loadingPlan, setLoadingPlan] = useState(null); // "silver" | null
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn || plan !== "none") return;
    apiCheckPlanStatus(authToken).then(({ plan: confirmed, planExpiresAt: expiresAt }) => {
      if (confirmed && confirmed !== "none") onPlanConfirmed?.(confirmed, expiresAt);
    });
  }, [isLoggedIn, plan, authToken]);

  // قیمت اصلی (قبل از تخفیف) فقط برای نمایش خط‌خورده - خود قیمت نهایی همون PLAN_PRICES سمت سرور می‌مونه

  const handleBuy = async (planKey) => {
    setError("");
    if (!isLoggedIn) {
      if (onRequireLogin) { onRequireLogin(); return; }
      setError(tr("اول باید وارد حسابت بشی"));
      return;
    }
    setLoadingPlan(planKey);

    if (DEMO_MODE) {
      // چون سرور واقعی وصل نیست، خرید رو فقط شبیه‌سازی می‌کنیم تا بتونی قفل شدن/باز شدن فصل‌ها رو تست کنی
      await new Promise((r) => setTimeout(r, 500));
      const twoYearsFromNow = Date.now() + 2 * 365 * 24 * 60 * 60 * 1000;
      onPlanConfirmed?.(planKey, twoYearsFromNow);
      setLoadingPlan(null);
      return;
    }

    try {
      const url = await apiCreatePayment(authToken, planKey);
      window.location.href = url;
    } catch (err) {
      setError(err.message || tr("اتصال به درگاه پرداخت با خطا مواجه شد"));
    } finally {
      setLoadingPlan(null);
    }
  };

  const badgeSrc = plan === "gold" ? MEDAL_GOLD_SRC : plan === "silver" ? MEDAL_SILVER_SRC : MEDAL_BRONZE_SRC;
  const badgeLabel = plan === "gold" ? tr("اشتراک دوره دوم") : plan === "silver" ? tr("اشتراک دوره اول") : tr("اشتراک برنزی");

  const renderPlanBody = (k, names) => {
    const p = pl[k];
    const active = k === "silver" ? (plan === "silver" || plan === "gold") : plan === "gold";
    const loading = loadingPlan === k;
    const canBuy = k === "silver" ? true : goldUnlocked;
    const ff = { fontFamily: "Vazirmatn, sans-serif" };
    return (
      <>
        <p style={{ ...ff, ...GRAD_WHITE }} className="text-base font-black leading-tight mb-1">
          {tr("({n} ماهه)", { n: p.months.toLocaleString(NUM_LOCALE) })}</p>
        {p.originalPrice > p.price && (
          <span style={{ fontFamily: "Oswald, sans-serif", color: "#FF3B47", textDecoration: "line-through", textDecorationThickness: "1.5px", textShadow: "0 0 8px rgba(255,59,71,0.4)" }} className="text-lg font-bold leading-tight">
            {formatPrice(p.originalPrice)}</span>
        )}
        <div className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-0">
          <span style={{ fontFamily: "Oswald, sans-serif", color: "#3DE08A", textShadow: "0 0 12px rgba(61,224,138,0.45)" }} className="text-[32px] leading-tight font-black">
            {formatPrice(p.price)}</span>
          <span style={{ ...ff, color: "#FFFFFF" }} className="text-sm font-black">{tr("تومان")}</span>
        </div>
        {p.badge !== "-" && (
          <span style={{ ...ff, color: "#39FF14" }} className="pf-neon text-sm font-black mt-0.5">
            {p.badge || tr("تخفیف آغازین")}</span>
        )}
        <p style={{ ...ff, ...GRAD_WHITE, fontWeight: 800 }} className="text-xs leading-5 mt-1 mb-2">
          {p.description || tr("دسترسی به ۳ فصل ({names})", { names })}
        </p>
        <div className="w-full">
          {active ? (
            <div className="rounded-xl py-2 text-center" style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,200,70,0.6)" }}>
              <span style={{ ...ff, color: "#FFFFFF" }} className="text-sm font-black">
                {k === "silver" ? tr("اشتراک دوره اول تو فعاله ✓") : tr("اشتراک دوره دوم تو فعاله ✓")}</span>
              {planExpiresAt && (
                <p style={{ ...ff, color: "#E9ECF2" }} className="text-xs font-bold mt-0.5">
                  {tr("معتبر تا {date}", { date: formatExpiryDate(planExpiresAt) })}</p>
              )}
            </div>
          ) : canBuy ? (
            <button
              onClick={() => handleBuy(k)}
              disabled={loading}
              style={{ ...ff, background: loading ? "#1f3a28" : k === "silver" ? "linear-gradient(135deg, #1FA855, #2fd37a)" : "linear-gradient(135deg, #6B7280, #9CA3AF)", color: loading ? "#5a7a63" : "#FFFFFF", boxShadow: loading ? "none" : k === "silver" ? "0 0 16px rgba(47,211,122,0.5)" : "0 0 14px rgba(120,128,140,0.5)" }}
              className={`w-full rounded-xl py-2.5 font-black text-sm ${loading ? "" : "plan-cta"}`}
            >
              {loading ? tr("در حال اتصال به درگاه…") : p.buttonText || (k === "silver" ? tr("خرید اشتراک دوره اول") : tr("خرید اشتراک دوره دوم"))}
            </button>
          ) : (
            <button disabled style={{ ...ff, background: "rgba(107,114,128,0.5)", color: "#D5D9E0", cursor: "not-allowed" }} className="w-full rounded-xl py-2.5 font-black text-sm">
              {tr("به‌زودی فعال می‌شه")}</button>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6" dir={APP_DIR}>
      <div className="flex flex-col items-center text-center mb-6 mt-2">
        <div className="relative flex items-center justify-center mb-3">
          <div
            className="absolute rounded-full"
            style={{
              width: "180px",
              height: "180px",
              background: "radial-gradient(circle, rgba(95,211,232,0.28) 0%, rgba(95,211,232,0.12) 45%, transparent 72%)",
              filter: "blur(2px)",
            }}
          />
          <div
            className="relative w-36 h-36 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: "conic-gradient(from 90deg, #E8B33D, #D91E2B, #E8B33D)",
              padding: "3px",
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden" style={{ background: "#0B0B0D" }}>
              <img src={badgeSrc} alt={plan} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-xl font-black mb-3">
          {badgeLabel}
        </h1>
        <PromoBanner text={promoText} isAdmin={isAdmin} onSave={onSavePromoText} />
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6", maxWidth: "280px" }} className="text-xs leading-6">
          {tr("دسترسی به دوره‌های آموزشی رو با یکی از این دو پلن باز کن")}</p>
      </div>

      <style>{PLAN_CARD_CSS + PLAN_FRAME_CSS}</style>

      {/* پلن‌ها: قاب طلایی */}
      <PlanFrame img="assets/plan-first.webp" className="mb-5" edit={isAdmin && <PlanEditButton onClick={() => setEditingPlan("silver")} />}>
        {renderPlanBody("silver", silverChapterNames)}
      </PlanFrame>
      <PlanFrame img="assets/plan-second.webp" delay={1.6} className="mb-3" edit={isAdmin && <PlanEditButton onClick={() => setEditingPlan("gold")} />}>
        {renderPlanBody("gold", goldChapterNames)}
      </PlanFrame>

      {error && (
        <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#D91E2B" }} className="text-xs text-center mt-2">
          {error}
        </p>
      )}

      <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#55535a" }} className="text-xs text-center leading-6 mt-5">
        {tr("پرداخت از طریق درگاه امن زرین‌پال انجام می‌شود.")}</p>

      {editingPlan && (
        <PlanEditor
          planKey={editingPlan}
          initial={pl[editingPlan]}
          onSave={(value) => onSavePlan(editingPlan, value)}
          onReset={() => onResetPlan(editingPlan)}
          onClose={() => setEditingPlan(null)}
        />
      )}
    </div>
  );
}

// ---------- Screen: Coming soon placeholder ----------
function ComingSoonScreen({ title, onBack }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center" dir={APP_DIR}>
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
        style={{ background: "#424245", border: "1px solid rgba(243,238,230,0.4)" }}
      >
        <BeltIcon className="w-7 h-7" style={{ color: "#F3EEE6" }} />
      </div>
      <h1 style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-lg font-black mb-2">
        {title}
      </h1>
      <p style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }} className="text-sm leading-7 mb-8">
        {tr("سرفصل‌های این بخش به‌زودی اضافه می‌شود.")}</p>
      <button
        onClick={onBack}
        style={{ fontFamily: "Vazirmatn, sans-serif", background: "#DAD6CE", color: "#0B0B0D" }}
        className="rounded-xl py-3 px-8 font-bold text-sm"
      >
        {tr("بازگشت")}</button>
    </div>
  );
}

function UserIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.5-4 4-5.5 7.5-5.5s6 1.5 7.5 5.5" />
    </svg>
  );
}

function HomeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 3l9 8h-2.5v9h-5v-6h-3v6h-5v-9H3z" />
    </svg>
  );
}

function BottomTabs({ active, onNavigate }) {
  const tab = (key, img, alt, raised) => (
    <button
      onClick={() => onNavigate?.(key)}
      aria-label={alt}
      className="flex flex-col items-center justify-self-center active:scale-95 transition-transform"
      style={{ marginTop: raised ? "-22px" : 0 }}
    >
      <img
        src={img}
        alt={alt}
        draggable={false}
        style={{
          height: raised ? 76 : 64,
          width: "auto",
          opacity: active === key ? 1 : 0.72,
          filter: active === key ? "drop-shadow(0 0 8px rgba(243,238,230,0.55))" : "none",
          transition: "all .2s",
        }}
      />
    </button>
  );
  return (
    <div
      className="relative grid pt-2 pb-2 border-t shrink-0"
      style={{ background: "#0B0B0D", borderColor: "#1c1b1f", gridTemplateColumns: "1fr 1fr 1fr" }}
      dir={APP_DIR}
    >
      {tab("profile", "assets/nav-profile.webp", tr("پنل حساب کاربری"), false)}
      {tab("home", "assets/nav-home.webp", "home", true)}
      {tab("subscription", "assets/nav-sub.webp", tr("اشتراک"), false)}
    </div>
  );
}

// ---------- یادآور تمرین: اسم جلسه‌ی بعدی ----------
const CHAPTER_ORDER = ["basic", "advanced", "extra", "fight", "fightb", "partner", "focus"];
const PLACEHOLDER_LESSON_TITLE = tr("در انتظار محتوا");
const REMINDER_NOTIFICATION_ID = 1001;

// کاربر آخرین بار کدوم جلسه رو باز کرده، جلسه‌ی بعدیش کدومه؟
// - اگه هنوز هیچ جلسه‌ای باز نکرده: اولین جلسه‌ی مسیر
// - اگه آخر یه فصل باشه: اولین جلسه‌ی فصل بعدی (فقط فصل‌هایی که برای کاربر در دسترسن و محتوا دارن)
// - اگه چیزی بعدش نمونده: null
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
    return { title: tr("وقت مرور تمرینه 🥊"), body: tr("همه‌ی جلسه‌های فعلی رو دیدی؛ امروز یه مرور سریع تمرین‌های قبلی بکن") };
  }
  return {
    title: tr("وقت تمرینه 🥊"),
    body: tr("جلسه‌ی {n}: «{title}» منتظرته", { n: next.n.toLocaleString(NUM_LOCALE), title: next.title }),
  };
}

// نزدیک‌ترین زمان آینده‌ی ساعت انتخاب‌شده (امروز یا فردا)
function nextReminderDate(timeStr) {
  const [hh, mm] = String(timeStr || "18:00").split(":").map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(Number.isNaN(hh) ? 18 : hh, Number.isNaN(mm) ? 0 : mm, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  return target;
}

let browserReminderTimer = null;

// لغو یادآور زمان‌بندی‌شده (موقع خروج از حساب، تا یادآور کاربر قبلی برای حساب بعدی نیاد)
async function cancelReminder() {
  clearTimeout(browserReminderTimer);
  const LocalNotifications = window.Capacitor?.Plugins?.LocalNotifications;
  if (!LocalNotifications) return;
  try {
    await LocalNotifications.cancel({ notifications: [{ id: REMINDER_NOTIFICATION_ID }] });
  } catch {
    // مهم نیست
  }
}

// یادآور رو (دوباره) تنظیم می‌کنه. askPermission فقط وقتی true باشه که کاربر خودش دکمه‌ی «تنظیم» رو زده
// خروجی: "scheduled" | "denied" | "invalid"
async function armReminder(timeStr, next, askPermission) {
  if (!/^\d{1,2}:\d{2}$/.test(String(timeStr || ""))) return "invalid";
  const target = nextReminderDate(timeStr);
  const text = buildReminderText(next);

  // روی خود گوشی: نوتیفیکیشن واقعی اندروید که حتی وقتی اپ بسته‌ست هم نمایش داده می‌شه
  const LocalNotifications = window.Capacitor?.Plugins?.LocalNotifications;
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
            smallIcon: "ic_stat_glove",
          },
        ],
      });
      return "scheduled";
    } catch {
      // اگه پلاگین در دسترس نبود (مثلاً پیش‌نمایش مرورگری)، برو سراغ روش مرورگر
    }
  }

  // فالبک پیش‌نمایش/مرورگر (بدون Capacitor)
  if (askPermission && typeof Notification !== "undefined" && Notification.permission === "default") {
    try {
      await Notification.requestPermission();
    } catch {
      // اگه درخواست مجوز رد شد، همچنان با الرت ساده کار می‌کنه
    }
  }
  clearTimeout(browserReminderTimer);
  browserReminderTimer = setTimeout(() => {
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      try {
        new Notification(text.title, { body: text.body, icon: SPLASH_LOGO_SRC });
        return;
      } catch {
        // برو سراغ الرت ساده
      }
    }
    alert(`${text.title}\n${text.body}`);
  }, target.getTime() - Date.now());
  return "scheduled";
}

// ---------- سبز شدن زنجیره‌ای جلسه‌ها (پلکانی) ----------
// جلسه‌ی n هر فصل فقط وقتی «دیده‌شده» حساب می‌شه که همه‌ی جلسه‌های قبلیِ همون فصل (از شماره‌ی ۱) دیده شده باشن.
// مثلاً کاربر تا ۷ دیده؛ ویدیوی ۲۰ رو ببینه سبز نمی‌شه. بعد از ۷ فقط ۸ می‌تونه سبز بشه، بعد ۹ و همین‌طور.
// جلسه‌ای که هنوز ویدیو نداره (ادمین آپلود نکرده) زنجیره رو قفل نمی‌کنه.
const CHAPTER_ITEMS = {
  basic: CURRICULUM_BASIC,
  advanced: CURRICULUM_ADVANCED,
  extra: CURRICULUM_EXTRA,
  fight: CURRICULUM_FIGHT,
  fightb: CURRICULUM_FIGHT,
  partner: CURRICULUM_PARTNER,
  focus: CURRICULUM_FOCUS,
};

// آیا الان مجازه جلسه‌ی n این فصل «دیده‌شده» ثبت بشه؟ (یعنی همه‌ی جلسه‌های قبلیِ دارای ویدیو دیده شدن)
function canCompleteLesson(storedCompleted, videos, curriculumKey, n) {
  const items = CHAPTER_ITEMS[curriculumKey] || [];
  for (const it of items) {
    if (it.n >= n) break;
    const key = `${curriculumKey}-${it.n}`;
    if (videos?.[key] && !storedCompleted[key]) return false;
  }
  return true;
}

// از روی چیزی که ذخیره شده، فقط زنجیره‌ی پیوسته از شماره‌ی ۱ هر فصل رو «سبز» حساب می‌کنه
// (درصد پیشرفت، مدال‌ها، تعداد جلسات و رنگ مربع‌ها همه از همین استفاده می‌کنن)
function computeChainedCompletions(storedCompleted, videos) {
  const out = {};
  for (const [curriculumKey, items] of Object.entries(CHAPTER_ITEMS)) {
    for (const it of items) {
      const key = `${curriculumKey}-${it.n}`;
      if (storedCompleted[key]) out[key] = true;
      else if (videos?.[key]) break; // اولین جلسه‌ی دیده‌نشده‌ی دارای ویدیو، زنجیره رو قطع می‌کنه
    }
  }
  return out;
}

// ده جلسه‌ی اول فصل سوم هرکدوم ۲٪، بقیه‌ی جلسات هرکدوم ۱٪
function computeProgressPercent(completedLessons) {
  let percent = 0;
  for (const key of Object.keys(completedLessons)) {
    const [curriculumKey, nStr] = key.split("-");
    const n = Number(nStr);
    percent += curriculumKey === "extra" && n <= 10 ? 2 : 1;
  }
  return Math.min(percent, 100);
}

// مسیر برگشت هر صفحه با دکمه‌ی برگشت گوشی رو مشخص می‌کنه.
// type "root" یعنی اینجا دیگه جای برگشتی نیست - دو بار پشت‌سرهم زدن یعنی خروج کامل از اپ.
function getHardwareBackDestination(step, activeLesson, isAdmin, activeSupportIdentifier) {
  switch (step) {
    case "otp":
      return { type: "step", step: "signup" };
    case "curriculum-basic":
    case "curriculum-advanced":
    case "curriculum-extra":
    case "curriculum-fight":
    case "curriculum-fightb":
    case "curriculum-partner":
    case "curriculum-focus":
    case "profile":
    case "subscription":
      return { type: "step", step: "home" };
    case "lesson":
      return { type: "step", step: `curriculum-${activeLesson?.curriculumKey || "basic"}` };
    case "timer":
    case "programs":
    case "journey":
    case "boxsci":
    case "reminder":
    case "info-gear":
    case "info-tips":
    case "info-about":
    case "info-faq":
    case "info-coach":
    case "info-rules":
    case "admin-users":
    case "admin-update":
    case "admin-announce":
    case "support-inbox":
      return { type: "stepAndMenu", step: "home" };
    case "support-chat":
      return isAdmin && activeSupportIdentifier
        ? { type: "step", step: "support-inbox" }
        : { type: "stepAndMenu", step: "home" };
    default:
      return { type: "root" };
  }
}

function App() {
  useFonts();
  useDisableZoom();
  const [step, setStep] = useState("splash"); // splash | signup | otp | home | profile
  const [contact, setContact] = useState("");
  const [contactMethod, setContactMethod] = useState("email"); // "email" | "phone"
  const [legacyAuth, setLegacyAuth] = useState(false); // true = صفحه‌ی ورود با ایمیل/کد پیامکی (روش قبلی)
  const [code, setCode] = useState(["", "", "", ""]);
  const [videos, setVideos] = useState({}); // key: `${curriculumKey}-${n}` -> permanent URL
  const [activeLesson, setActiveLesson] = useState(null); // { curriculumKey, item }
  const [authToken, setAuthToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [bootGate, setBootGate] = useState("checking"); // checking | offline | ok
  const [gateChecking, setGateChecking] = useState(false);
  const runBootCheck = async (reloadOnOk) => {
    setGateChecking(true);
    const ok = await checkServerReachable();
    setGateChecking(false);
    if (ok) { if (reloadOnOk) { try { window.location.reload(); return; } catch {} } setBootGate("ok"); }
    else setBootGate("offline");
  };
  useEffect(() => { runBootCheck(false); }, []);
  const [sessionChecked, setSessionChecked] = useState(false); // تا وقتی بررسی نشده، هیچ صفحه‌ای (نه ورود نه خانه) نشون داده نمی‌شه
  const [completedLessons, setCompletedLessons] = useState({}); // key: `${curriculumKey}-${n}` -> true
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [practiceSeconds, setPracticeSeconds] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [programsCat, setProgramsCat] = useState(null);
  useEffect(() => { if (step !== "programs") setProgramsCat(null); }, [step]);
  const [deviceId, setDeviceId] = useState(null);
  const [lessonTitlesRaw, setLessonTitles] = useState({}); // key: `${curriculumKey}-${n}` -> عنوان ویرایش‌شده
  const [memberCount, setMemberCount] = useState(0);
  const [realMemberCount, setRealMemberCount] = useState(null); // فقط برای ادمین پر می‌شه
  const [adminStats, setAdminStats] = useState(null); // آمار تفکیکی (مهمان / ثابت / اشتراک فعال)؛ فقط برای ادمین
  const [videosStatus, setVideosStatus] = useState("loading"); // "loading" | "ok" | "error" (لیست ویدیوها از سرور)
  const [coachChapter, setCoachChapter] = useState(null); // null = صفحه‌ی سه باکسِ کمک مربی | "basic" | "advanced" | "extra" | "legacy"
  const [plansRaw, setPlans] = useState(DEFAULT_PLANS); // قیمت و متن باکس‌های اشتراک
  const [appUpdateRaw, setAppUpdate] = useState(DEFAULT_APP_UPDATE);
  const [updateDismissed, setUpdateDismissed] = useState(false);
  // پیام بروزرسانی روزی یک بار نشون داده می‌شه (روز میلادی محلی)
  const todayKey = useMemo(() => { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }, []);
  const [updateSeenDay] = useState(() => { try { return localStorage.getItem("appUpdateSeenDay") || ""; } catch { return ""; } });
  const [appBuild, setAppBuild] = useState(0);
  useEffect(() => { loadAppBuild().then(setAppBuild); }, []);
  const [promoTextRaw, setPromoText] = useState(""); // متن تبلیغاتی صفحه‌ی اشتراک (خالی = پیش‌فرض)
  const [chapterVisibility, setChapterVisibility] = useState({ fight: false, fightb: false, partner: false, focus: false });
  const [chapterTitlesRaw, setChapterTitles] = useState({});
  const [contentOverridesRaw, setContentOverrides] = useState({});
  // ترجمه‌ی خودکار متن‌های ویرایش‌شده‌ی ادمین (برای ادمین، متن اصلی نشون داده می‌شه)
  const [dynVer, setDynVer] = useState(0);
  useEffect(() => {
    if (APP_LANG === "fa") return;
    AppStorage.get(`dyn-tr-${APP_LANG}`).then((v) => {
      try { if (v) { Object.assign(DYN_TABLE, JSON.parse(v)); setDynVer((x) => x + 1); } } catch {}
    });
  }, []);
  const showRaw = Boolean(authUser?.isAdmin);
  const T = (v) => (showRaw ? v : dynTr(v));
  const lessonTitles = useMemo(() => T(lessonTitlesRaw), [lessonTitlesRaw, dynVer, showRaw]);
  const plans = useMemo(() => T(plansRaw), [plansRaw, dynVer, showRaw]);
  const appUpdate = useMemo(() => T(appUpdateRaw), [appUpdateRaw, dynVer, showRaw]);
  const updateVisible = step === "home" && appUpdate.enabled && appBuild > 0 && Number(appUpdate.latest) > appBuild;
  useEffect(() => {
    if (updateVisible) { try { localStorage.setItem("appUpdateSeenDay", todayKey); } catch {} }
  }, [updateVisible, todayKey]);
  const promoText = useMemo(() => T(promoTextRaw), [promoTextRaw, dynVer, showRaw]);
  const chapterTitles = useMemo(() => T(chapterTitlesRaw), [chapterTitlesRaw, dynVer, showRaw]);
  const contentOverrides = useMemo(() => T(contentOverridesRaw), [contentOverridesRaw, dynVer, showRaw]); // متن‌های ویرایش‌شده‌ی ادمین (نکات / سوالات / مربی / قوانین / درباره)
  const [supportMessages, setSupportMessages] = useState([]);
  const [supportThreads, setSupportThreads] = useState([]);
  const [supportLoading, setSupportLoading] = useState(false);
  const [supportError, setSupportError] = useState("");
  const [activeSupportIdentifier, setActiveSupportIdentifier] = useState(null); // null = گفتگوی خودِ کاربر
  const [supportStatus, setSupportStatus] = useState(null); // null | "pending" | "answered" - برای نقطه‌ی رنگی روی گزینه‌ی پشتیبانی توی منو
  const [exitHint, setExitHint] = useState(false);
  const lastPersistedPracticeRef = useRef(0);
  const lastBackPressRef = useRef(0);
  const [lastBasic, setLastBasic] = useState(null); // آخرین جلسه‌ی فصل ۱ که دیده شده (برای باکس «ادامه تمرین» هوم)
  const [lastLesson, setLastLesson] = useState(null); // آخرین جلسه‌ای که کاربر بازش کرده: { curriculumKey, n }
  useEffect(() => {
    if (step !== "info-coach") setCoachChapter(null);
  }, [step]);

  const [reminder, setReminder] = useState({ enabled: false, time: "18:00" });
  const [remindersLoaded, setRemindersLoaded] = useState(false);

  // دکمه‌ی برگشت فیزیکی/اشاره‌ای گوشی: توی هر صفحه یه قدم برمی‌گرده عقب،
  // فقط توی صفحه‌ی اصلی دوبار پشت‌سرهم زدنش باعث خروج کامل از اپ می‌شه.
  // از ref استفاده می‌کنیم تا فقط یه‌بار (موقع باز شدن اپ) لیسنر ثبت بشه، نه هر بار عوض شدن صفحه.
  const backStateRef = useRef({ step, activeLesson, menuOpen, isAdmin: authUser?.isAdmin, activeSupportIdentifier, coachChapter });
  backStateRef.current = { step, activeLesson, menuOpen, isAdmin: authUser?.isAdmin, activeSupportIdentifier, coachChapter };

  useEffect(() => {
    const runBackAction = () => {
      const { step: curStep, activeLesson: curLesson, menuOpen: curMenuOpen, isAdmin: curIsAdmin, activeSupportIdentifier: curSupportId } = backStateRef.current;
      if (curMenuOpen) {
        setMenuOpen(false);
        return;
      }
      if (curStep === "info-coach" && backStateRef.current.coachChapter) {
        setCoachChapter(null);
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
      // root: دو بار پشت‌سرهم توی ۲ ثانیه یعنی خروج کامل
      const now = Date.now();
      if (now - lastBackPressRef.current < 2000) {
        window.Capacitor?.Plugins?.App?.exitApp?.();
      } else {
        lastBackPressRef.current = now;
        setExitHint(true);
        setTimeout(() => setExitHint(false), 2000);
      }
    };

    let removeListener = null;
    let cancelled = false;

    // راه اصلی: پلاگین App خود Capacitor
    Promise.resolve(window.Capacitor?.Plugins?.App?.addListener?.("backButton", runBackAction))
      .then((handle) => {
        if (cancelled) handle?.remove?.();
        else removeListener = () => handle?.remove?.();
      })
      .catch(() => {});

    // راه پشتیبان: برخی نسخه‌های Capacitor برای سازگاری با کوردوا این ایونت رو هم می‌شنون
    document.addEventListener("backbutton", runBackAction, false);

    return () => {
      cancelled = true;
      removeListener?.();
      document.removeEventListener("backbutton", runBackAction, false);
    };
  }, []);


  // ساخت/بازیابی شناسه‌ی یکتای همین دستگاه (برای قفل تک‌دستگاهی)
  useEffect(() => {
    getOrCreateDeviceId().then(setDeviceId);
  }, []);

  // اگه کاربر قبلاً (تا ۳۰ روز پیش) روی همین دستگاه وارد شده، مستقیم ببرش خانه
  // نکته: تا این بررسی تموم نشه هیچ صفحه‌ای رندر نمی‌شه، وگرنه یه لحظه صفحه‌ی ورود دیده می‌شه و بعد خونه - همون باگی که رفع شد
  useEffect(() => {
    (async () => {
      const minDelay = new Promise((resolve) => setTimeout(resolve, 5000)); // تاخیر مصنوعی تا نوار لودینگ کامل دیده بشه
      const [session] = await Promise.all([loadSession(), minDelay]);
      if (session) {
        setAuthToken(session.token);
        setAuthUser(session.user);
        setStep("home");
      } else if ((await AppStorage.get("guest-mode")) === "1") {
        setAuthUser(GUEST_USER);
        setStep("home");
      }
      setSessionChecked(true);
    })();
  }, []);

  // اگه توکن روی سرور نامعتبر شد (منقضی/دستکاری‌شده)، از همه‌جا خارجش کن
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

  // لیست ویدیوها + عنوان‌های ویرایش‌شده‌ی جلسات + عدد «اعضای فعال» + فصل‌های باز شده؛
  // این‌ها برای همه یکسانن و روی سرور ذخیره می‌شن
  const loadVideoList = () => {
    apiFetchVideos().then((list) => {
      if (list) {
        const withAlias = { ...list };
        Object.keys(list).forEach((k) => { if (k.startsWith("fight-")) { const a = "fightb-" + k.slice(6); if (!withAlias[a]) withAlias[a] = list[k]; } });
        setVideos(withAlias);
        setVideosStatus("ok");
      } else {
        // اگه قبلاً یه‌بار موفق گرفته بودیم، همون لیست قبلی می‌مونه
        setVideosStatus((prev) => (prev === "ok" ? "ok" : "error"));
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
    apiFetchAppUpdate().then(setAppUpdate);
    apiFetchPlans().then(setPlans);
    apiFetchContent().then(setContentOverrides);
    apiFetchDynTranslations().then((m) => {
      if (m) { Object.assign(DYN_TABLE, m); setDynVer((x) => x + 1); }
    });
  };

  const handleSaveContent = async (section, value) => {
    const saved = await apiSaveContent(authToken, section, value);
    setContentOverrides((prev) => ({ ...prev, [section]: saved }));
  };

  const handleResetContent = async (section) => {
    await apiResetContent(authToken, section);
    setContentOverrides((prev) => {
      const next = { ...prev };
      delete next[section];
      return next;
    });
  };

  const handleSavePlan = async (key, plan) => {
    setPlans(await apiSavePlan(authToken, key, plan));
  };

  const handleResetPlan = async (key) => {
    setPlans(await apiResetPlan(authToken, key));
  };

  const handleSavePromoText = async (text) => {
    const saved = await apiSetPromoText(authToken, text);
    setPromoText(saved);
  };

  // وقتی اپ می‌ره پس‌زمینه، تغییرات پیشرفت فوراً به سرور فرستاده می‌شه
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

  // وقتی پروفایل یا صفحه‌ی اشتراک باز می‌شه، وضعیت و تاریخ پایان اشتراک از سرور تازه گرفته می‌شه
  useEffect(() => {
    if ((step !== "profile" && step !== "subscription") || !authToken) return;
    apiFetchPlanStatus(authToken).then((status) => {
      if (!status) return;
      setAuthUser((u) => {
        if (!u || (u.plan === status.plan && (u.planExpiresAt || null) === (status.planExpiresAt || null))) return u;
        const next = { ...u, plan: status.plan, planExpiresAt: status.planExpiresAt };
        saveSession(authToken, next);
        return next;
      });
    });
  }, [step, authToken]);

  // عدد واقعی کاربرها - فقط اگه کاربر ادمینه (برای بقیه اصلاً درخواستی فرستاده نمی‌شه)
  const loadAdminStats = () => {
    if (!authUser?.isAdmin || !authToken) return;
    apiFetchAdminStats(authToken).then((stats) => {
      if (stats) {
        setRealMemberCount(stats.totalUsers);
        setAdminStats(stats);
      }
    });
  };

  // موقع باز شدن اپ
  useEffect(() => {
    loadPublicData();
  }, []);

  useEffect(() => {
    if (!authUser?.isAdmin) {
      setRealMemberCount(null);
      setAdminStats(null);
    }
    loadAdminStats();
  }, [authUser?.isAdmin, authToken]);

  // هر بار که ادمین منوی کناری رو باز می‌کنه، عدد تازه گرفته می‌شه
  useEffect(() => {
    if (menuOpen) loadAdminStats();
  }, [menuOpen]);

  // اگه اینترنت قطع/ضعیف بود و برگشت، دوباره از سرور می‌گیریم (وگرنه کاربر «ویدیو اضافه نشده» می‌دید)
  const appConnectivity = useConnectivity();
  const prevAppConnectivityRef = useRef(appConnectivity);
  useEffect(() => {
    const was = prevAppConnectivityRef.current;
    prevAppConnectivityRef.current = appConnectivity;
    if (was !== "ok" && appConnectivity === "ok") {
      loadPublicData();
      loadAdminStats();
      // اینترنت برگشت: پیشرفت‌های ارسال‌نشده بره، و اگه اولین دریافت از سرور انجام نشده بود دوباره تلاش بشه
      if (accountIdRef.current && loadedAccountRef.current === accountIdRef.current) {
        if (!serverSyncedRef.current) reconcileProgress(accountIdRef.current);
        else flushSync();
      }
    }
  }, [appConnectivity]);

  const handleRenameLesson = async (curriculumKey, n, newTitle) => {
    const key = `${curriculumKey}-${n}`;
    const saved = await apiSetLessonTitle(curriculumKey, n, newTitle, authToken);
    setLessonTitles((prev) => ({ ...prev, [key]: saved }));
  };

  const handleRenameChapter = async (curriculumKey, newTitle) => {
    const saved = await apiSetChapterTitle(curriculumKey, newTitle, authToken);
    setChapterTitles((prev) => ({ ...prev, [curriculumKey]: saved }));
  };

  const handleSetMemberCount = async (newCount) => {
    const saved = await apiSetMemberCount(newCount, authToken);
    setMemberCount(saved);
  };

  const handleToggleChapterVisibility = async (key, visible) => {
    const saved = await apiSetChapterVisibility(key, visible, authToken);
    setChapterVisibility((prev) => ({ ...prev, [key]: saved }));
  };

  const refreshSupportStatus = async () => {
    if (!authToken) {
      setSupportStatus(null);
      return;
    }
    try {
      if (authUser?.isAdmin) {
        const threads = await apiFetchSupportThreads(authToken);
        if (threads.length === 0) setSupportStatus(null);
        else if (threads.some((t) => t.lastSender === "user")) setSupportStatus("pending");
        else setSupportStatus("answered");
      } else {
        const messages = await apiFetchMySupportMessages(authToken);
        if (messages.length === 0) setSupportStatus(null);
        else setSupportStatus(messages[messages.length - 1].sender === "user" ? "pending" : "answered");
      }
    } catch {
      // خطای شبکه - نقطه‌ی رنگی فعلی رو دست‌نخورده می‌ذاریم
    }
  };

  // موقع ورود کاربر (یا ادمین)، وضعیت پشتیبانی رو می‌گیریم تا نقطه‌ی رنگی روی گزینه‌ی منو نشون داده بشه
  useEffect(() => {
    refreshSupportStatus();
  }, [authToken, authUser?.isAdmin]);

  const openMySupportChat = async () => {
    setActiveSupportIdentifier(null);
    setStep("support-chat");
    setSupportLoading(true);
    setSupportError("");
    try {
      const messages = await apiFetchMySupportMessages(authToken);
      setSupportMessages(messages);
    } catch (err) {
      setSupportError(err.message || tr("دریافت گفتگو با خطا مواجه شد"));
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
      setSupportError(err.message || tr("دریافت لیست گفتگوها با خطا مواجه شد"));
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
      setSupportError(err.message || tr("دریافت گفتگو با خطا مواجه شد"));
    } finally {
      setSupportLoading(false);
    }
  };

  const handleOpenSupport = () => {
    if (authUser?.isAdmin) openSupportInbox();
    else openMySupportChat();
  };

  const handleInviteFriends = async (kind = "android") => {
    const isWeb = kind === "web";
    const INVITE_SHARE_TEXT = isWeb ? INVITE_SHARE_WEB_TEXT : INVITE_SHARE_TEXT_ANDROID;
    const INVITE_SHARE_URL = isWeb ? WEB_APP_URL : INVITE_SHARE_URL_ANDROID;
    try {
      const NativeShare = window.Capacitor?.Plugins?.Share;
      if (NativeShare?.share) {
        await NativeShare.share({
          title: INVITE_SHARE_TITLE,
          text: INVITE_SHARE_TEXT,
          url: INVITE_SHARE_URL,
          dialogTitle: tr("دعوت از دوستان"),
        });
        return;
      }
      if (navigator.share) {
        await navigator.share({ title: INVITE_SHARE_TITLE, text: INVITE_SHARE_TEXT, url: INVITE_SHARE_URL });
        return;
      }
      await navigator.clipboard.writeText(`${INVITE_SHARE_TEXT} ${INVITE_SHARE_URL}`);
      window.alert(tr("متن دعوت کپی شد؛ می‌تونی الان برای دوستت بفرستیش."));
    } catch {
      // کاربر دیالوگ اشتراک‌گذاری رو لغو کرده - نیازی به نمایش خطا نیست
    }
  };

  const handleSendSupportMessage = async (text) => {
    if (authUser?.isAdmin && activeSupportIdentifier) {
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
      // اگه ربات جواب داد یعنی همون لحظه پاسخ داده شده، وگرنه هنوز منتظر پشتیبانه
      setSupportStatus(botReply ? "answered" : "pending");
    }
  };

  const handleSendSupportVoice = async (audioData) => {
    if (authUser?.isAdmin && activeSupportIdentifier) {
      await apiSendSupportVoiceReply(authToken, activeSupportIdentifier, audioData);
      setSupportMessages((prev) => [
        ...prev,
        { sender: "admin", message: tr("پیام صوتی"), type: "voice", audioData, createdAt: Date.now() },
      ]);
      refreshSupportStatus();
    } else {
      const { botReply } = await apiSendSupportVoice(authToken, audioData);
      setSupportMessages((prev) => {
        const next = [
          ...prev,
          { sender: "user", message: tr("پیام صوتی"), type: "voice", audioData, createdAt: Date.now() },
        ];
        if (botReply) next.push(botReply);
        return next;
      });
      // پیام صوتی رو ربات نمی‌فهمه، پس همیشه منتظر پشتیبانی می‌مونه
      setSupportStatus("pending");
    }
  };

  // آرایه‌های اصلی رو با عنوان‌های احتمالاً ویرایش‌شده ترکیب می‌کنیم
  const curriculumBasicMerged = CURRICULUM_BASIC.map((it) => ({
    ...it,
    t: lessonTitles[`basic-${it.n}`] || it.t,
  }));
  const curriculumAdvancedMerged = CURRICULUM_ADVANCED.map((it) => ({
    ...it,
    t: lessonTitles[`advanced-${it.n}`] || it.t,
  }));
  const curriculumExtraMerged = CURRICULUM_EXTRA.map((it) => ({
    ...it,
    t: lessonTitles[`extra-${it.n}`] || it.t,
  }));
  const curriculumFightMerged = CURRICULUM_FIGHT.map((it) => ({
    ...it,
    t: lessonTitles[`fight-${it.n}`] || it.t,
  }));
  const curriculumFightbMerged = CURRICULUM_FIGHT.map((it) => ({
    ...it,
    t: lessonTitles[`fightb-${it.n}`] || lessonTitles[`fight-${it.n}`] || it.t,
  }));
  const curriculumPartnerMerged = CURRICULUM_PARTNER.map((it) => ({
    ...it,
    t: lessonTitles[`partner-${it.n}`] || it.t,
  }));
  const curriculumFocusMerged = CURRICULUM_FOCUS.map((it) => ({
    ...it,
    t: lessonTitles[`focus-${it.n}`] || it.t,
  }));

  // ---- اطلاعات جدا برای هر حساب ----
  // با عوض شدن حساب (خروج / ورود با حساب دیگه) اطلاعات حساب قبلی از حافظه پاک می‌شه
  // و اطلاعات همون حسابِ جدید از روی گوشی لود می‌شه.
  const accountId = authUser?.identifier || null;
  const accountIdRef = useRef(null);
  accountIdRef.current = accountId;
  const loadedAccountRef = useRef(null);

  // ذخیره‌ی اطلاعات حساب فعلی (فقط بعد از این‌که اطلاعات همین حساب لود شده؛ تا چیزی روی اطلاعات حساب دیگه نشینه)
  const saveAccountData = (base, value) => {
    const id = accountIdRef.current;
    if (!id || loadedAccountRef.current !== id) return;
    return AppStorage.set(accountKey(id, base), value);
  };

  // ---- ذخیره‌ی پیشرفت روی سرور ----
  // روی گوشی (کش) + سرور: با عوض کردن گوشی، پیشرفت از سرور برمی‌گرده.
  // تغییرها اول توی صف (روی گوشی) نگه داشته می‌شن و بعد به سرور می‌رن؛ اگه اینترنت نبود، بعداً خودکار ارسال می‌شن.
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
    if (accountIdRef.current !== id) return; // حساب عوض شده؛ نسخه‌ی ذخیره‌شده‌ی صف برای همون حساب می‌مونه
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

  // موقع ورود (یا باز شدن اپ): اول چیزهایی که قبلاً ارسال نشده می‌رن، بعد پیشرفت سرور گرفته و با اطلاعات این گوشی ادغام می‌شه
  const reconcileProgress = async (id) => {
    const token = authTokenRef.current;
    if (!token || accountIdRef.current !== id) return;
    if (Object.keys(syncPendingRef.current).length > 0) await flushSync();
    const server = await apiFetchProgress(token);
    if (!server || accountIdRef.current !== id) return;

    const mergedCompleted = { ...server.completed, ...completedRef.current };
    const mergedPractice = Math.max(server.practiceSeconds || 0, practiceRef.current);
    const mergedLast = server.lastLesson || lastLessonRef.current;
    const mergedName = server.profile?.name || profileNameRef.current;
    const mergedImage = profileImageRef.current; // عکس فقط محلیه (روی سرور ذخیره نمی‌شه)

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

    // چیزی که فقط روی این گوشی بود (مثلاً پیشرفت قبل از این آپدیت) به سرور می‌ره
    const push = {};
    const onlyLocal = Object.keys(mergedCompleted).filter((key) => !server.completed?.[key]);
    if (onlyLocal.length > 0) push.completed = Object.fromEntries(onlyLocal.map((key) => [key, true]));
    if (mergedPractice > (server.practiceSeconds || 0)) push.practiceSeconds = mergedPractice;
    if (!server.lastLesson && mergedLast) push.lastLesson = mergedLast;
    if (!server.profile?.name && mergedName) push.profile = { name: mergedName };
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
    setLastBasic(null);
    setReminder({ enabled: false, time: "18:00" });
    if (!accountId) {
      cancelReminder();
      return;
    }

    let cancelled = false;
    (async () => {
      await purgeLegacyAccountData();
      const [lastRaw, reminderRaw, completedRaw, practiceRaw, profileRaw, pendingRaw, lastBasicRaw] = await Promise.all(
        ACCOUNT_DATA_KEYS.map((key) => AppStorage.get(accountKey(accountId, key)))
      );
      if (cancelled) return;
      const parse = (raw) => {
        try {
          return raw ? JSON.parse(raw) : null;
        } catch {
          return null; // مقدار خراب بود، نادیده می‌گیریم
        }
      };
      const last = parse(lastRaw);
      if (last?.curriculumKey && last?.n) setLastLesson(last);
      const lb = parse(lastBasicRaw);
      if (lb?.n) setLastBasic(lb); else if (last?.curriculumKey === "basic" && last?.n) setLastBasic({ n: last.n });
      const savedReminder = parse(reminderRaw);
      if (savedReminder?.time) setReminder({ enabled: Boolean(savedReminder.enabled), time: savedReminder.time });
      const completed = parse(completedRaw);
      if (completed && typeof completed === "object") setCompletedLessons(completed);
      const seconds = Number(practiceRaw) || 0;
      setPracticeSeconds(seconds);
      lastPersistedPracticeRef.current = seconds;
      const profile = parse(profileRaw);
      if (profile?.name) setProfileName(profile.name);
      if (profile?.image) setProfileImage(profile.image);
      const pending = parse(pendingRaw);
      if (pending && typeof pending === "object") syncPendingRef.current = pending;
      loadedAccountRef.current = accountId;
      setRemindersLoaded(true);
      // پیشرفت واقعی از سرور (با عوض کردن گوشی همین‌جا برمی‌گرده)
      completedRef.current = completed && typeof completed === "object" ? completed : {};
      practiceRef.current = seconds;
      lastLessonRef.current = last?.curriculumKey && last?.n ? last : null;
      profileNameRef.current = profile?.name || "";
      profileImageRef.current = profile?.image || null;
      reconcileProgress(accountId);
    })();
    return () => {
      cancelled = true;
    };
  }, [accountId]);

  // جلسه‌ی بعدی کاربر: فصل‌های جدید فقط وقتی حساب می‌شن که برای کاربر باز شده باشن (یا ادمین باشه)
  const availableChapterKeys = [
    "basic",
    "advanced",
    "extra",
    ...NEW_CHAPTER_KEYS.filter((k) => authUser?.isAdmin || chapterVisibility?.[k]),
  ];
  const nextLesson = computeNextLesson(
    lastLesson,
    {
      basic: curriculumBasicMerged,
      advanced: curriculumAdvancedMerged,
      extra: curriculumExtraMerged,
      fight: curriculumFightMerged,
      fightb: curriculumFightbMerged,
      partner: curriculumPartnerMerged,
      focus: curriculumFocusMerged,
    },
    availableChapterKeys
  );
  // باکس «ادامه تمرین» هوم فقط به پیشرفت فصل ۱ وصله: بعد از آخرین جلسه‌ی دیده‌شده‌ی فصل ۱؛ دیدن جلسه‌های فصل‌های دیگه روش اثر نداره
  const heroLesson = (() => {
    const items = curriculumBasicMerged || [];
    const isReal = (it) => Boolean(it && it.t && it.t !== PLACEHOLDER_LESSON_TITLE);
    const pick = lastBasic?.n ? items.find((it) => it.n === lastBasic.n + 1) : items[0];
    if (isReal(pick)) return { curriculumKey: "basic", n: pick.n, title: pick.t };
    return nextLesson;
  })();

  // هر بار که کاربر جلسه‌ی دیگه‌ای باز کنه (یا اسم جلسه عوض شه یا اپ دوباره باز شه)، متن نوتیف با جلسه‌ی بعدیِ تازه دوباره تنظیم می‌شه
  // اعلان‌های ادمین: موقع باز شدن اپ (و برگشت به اپ) اعلان‌های جدید رو می‌گیره و زمان‌بندی می‌کنه
  useEffect(() => {
    syncAnnouncements();
    const onVis = () => { if (document.visibilityState === "visible") syncAnnouncements(); };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (!remindersLoaded || !reminder.enabled) return;
    armReminder(reminder.time, nextLesson, false);
  }, [remindersLoaded, reminder.enabled, reminder.time, nextLesson?.curriculumKey, nextLesson?.n, nextLesson?.title]);

  const handleDisableReminder = async () => {
    await cancelReminder();
    const next = { ...reminder, enabled: false };
    setReminder(next);
    saveAccountData("reminder", JSON.stringify(next));
  };

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
      // برای جلوگیری از ذخیره‌ی مکرر، هر ۱۰ ثانیه یک‌بار ذخیره می‌کنیم
      if (next - lastPersistedPracticeRef.current >= 10) {
        lastPersistedPracticeRef.current = next;
        saveAccountData("practice-seconds", String(next));
        queueSync({ practiceSeconds: next }, 30000, true); // حداکثر هر ۳۰ ثانیه یک‌بار به سرور
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
    // عکس پروفایل فقط روی همین گوشی می‌مونه و عمداً به سرور فرستاده نمی‌شه
    setProfileImage(image);
    saveProfileInfo({ name: profileName, image });
  };

  const openLesson = (curriculumKey, item) => {
    const isGoldChapter = ["fight", "fightb", "partner", "focus"].includes(curriculumKey);
    // ادمین خودش همیشه به همه‌ی فصل‌ها دسترسی داره، نیازی به خرید اشتراک نداره
    const hasAccess =
      authUser?.isAdmin || (isGoldChapter ? authUser?.plan === "gold" : authUser?.plan === "silver");
    if (item.n > FREE_LESSONS_COUNT && !hasAccess) {
      setStep("subscription");
      return;
    }
    const record = { curriculumKey, n: item.n };
    setLastLesson(record);
    if (curriculumKey === "basic") { setLastBasic({ n: item.n }); saveAccountData("last-basic", JSON.stringify({ n: item.n })); }
    saveAccountData("last-lesson", JSON.stringify(record));
    queueSync({ lastLesson: record });
    setActiveLesson({ curriculumKey, item });
    setStep("lesson");
  };

  const lessonKey = activeLesson ? `${activeLesson.curriculumKey}-${activeLesson.item.n}` : null;

  // فقط زنجیره‌ی پیوسته از جلسه‌ی ۱ هر فصل سبز/شمرده می‌شه
  const effectiveCompleted = computeChainedCompletions(completedLessons, videos);

  const handleLessonComplete = async () => {
    if (!lessonKey || completedLessons[lessonKey]) return; // قبلاً شمرده شده
    // زنجیره‌ای: اگه جلسه‌های قبلی این فصل هنوز کامل دیده نشدن، این جلسه سبز/شمرده نمی‌شه
    if (!canCompleteLesson(completedLessons, videos, activeLesson.curriculumKey, activeLesson.item.n)) return;
    const updated = { ...completedLessons, [lessonKey]: true };
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
    AppStorage.remove("guest-mode");
    setAuthToken(data.token);
    setAuthUser(data.user);
    setStep("home");
    saveSession(data.token, data.user);
  };

  // ورود/ثبت‌نام/بازیابی رمز با شماره موبایل + رمز عبور (نتیجه‌ی موفق از سرور)
  const handleAuthSuccess = (data) => {
    AppStorage.remove("guest-mode");
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

  // هر ۲۰ ثانیه چک می‌کنیم که آیا حساب هنوز روی همین دستگاهه یا یه گوشی دیگه واردش شده
  useEffect(() => {
    if (!authToken || DEMO_MODE || !deviceId) return;
    const id = setInterval(async () => {
      const active = await apiCheckSession(authToken, deviceId);
      if (!active) {
        clearInterval(id);
        alert(tr("اپلیکیشن بر روی دستگاه دیگر فعال است"));
        setAuthToken(null);
        setAuthUser(null);
        setStep("signup");
        clearSession();
      }
    }, 20000);
    return () => clearInterval(id);
  }, [authToken, deviceId]);

  // ورود به‌عنوان مهمان: بدون پیامک و بدون ثبت‌نام؛ فقط محتوای رایگان، پیشرفت فقط روی همین گوشی
  const handleGuestLogin = () => {
    setAuthToken(null);
    setAuthUser(GUEST_USER);
    setStep("home");
    AppStorage.set("guest-mode", "1");
    apiGuestVisit(deviceId);
  };
  // مهمان وقتی می‌خواد وارد حساب بشه یا بخره
  const handleLeaveGuest = () => {
    AppStorage.remove("guest-mode");
    setAuthUser(null);
    setAuthToken(null);
    setMenuOpen(false);
    setStep("signup");
  };

  const handleLogout = async () => {
    if (authUser?.isGuest) { handleLeaveGuest(); return; }
    // قبل از خروج، تغییرات ارسال‌نشده‌ی پیشرفت رو (حداکثر ۲.۵ ثانیه) به سرور می‌فرستیم
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

  return (
    <div
      className="w-full"
      style={{
        height: "100vh",
        background:
          "radial-gradient(circle at 50% 0%, #1a1418 0%, #0B0B0D 55%)",
        touchAction: "pan-y",
      }}
    >
        <style>{`
          @keyframes screenPunchIn {
            0% { opacity: 0; transform: scale(1.08); }
            100% { opacity: 1; transform: scale(1); }
          }
          .screen-enter {
            animation: screenPunchIn 200ms ease-out both;
          }
          @keyframes activeDotPulse {
            0% { box-shadow: 0 0 0 0 rgba(77,163,255,0.55); }
            70% { box-shadow: 0 0 0 6px rgba(77,163,255,0); }
            100% { box-shadow: 0 0 0 0 rgba(77,163,255,0); }
          }
          .active-dot {
            animation: activeDotPulse 1.8s ease-out infinite;
          }
        `}</style>
        <IosInstallHint />
        <PhoneMock bgImage={getScreenBackground(step)} pencil={!(step === "subscription" || step === "lesson" || (typeof step === "string" && step.startsWith("curriculum-")))}>
          <TopNotch />
          <NetworkBanner />
          {bootGate === "offline" ? (
            <OfflineGateScreen checking={gateChecking} onRetry={() => runBootCheck(true)} />
          ) : bootGate === "checking" ? (
            <div className="flex-1" style={{ background: "#0B0B0D" }} />
          ) : (
          <div key={step} className="screen-enter flex-1 flex flex-col min-h-0">
          {step === "splash" && (
            <SplashScreen loading={!sessionChecked} onStart={() => setStep("signup")} />
          )}
          {step === "signup" && !legacyAuth && (
            <PasswordAuthFlow deviceId={deviceId} onSuccess={handleAuthSuccess} onUseLegacy={handleUseLegacyAuth} onGuest={handleGuestLogin} />
          )}
          {step === "signup" && legacyAuth && (
            <SignupScreen
              contact={contact}
              setContact={setContact}
              method={contactMethod}
              setMethod={setContactMethod}
              onSubmit={handleSendOtp}
              onUsePassword={() => setLegacyAuth(false)}
            />
          )}
          {step === "otp" && (
            <OtpScreen
              contact={contact}
              method={contactMethod}
              code={code}
              setCode={setCode}
              onVerify={{
                next: handleVerifyOtp,
                resend: handleResendOtp,
                back: () => setStep("signup"),
              }}
            />
          )}
          {step === "home" && (
            <HomeScreen
              onNavigate={setStep}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              onLogout={handleLogout}
              isAdmin={Boolean(authUser?.isAdmin)}
              memberCount={memberCount}
              realMemberCount={realMemberCount}
              adminStats={adminStats}
              accountName={profileName}
              accountContact={authUser?.identifier}
              isGuest={Boolean(authUser?.isGuest)}
              onGuestLogin={handleLeaveGuest}
              onOpenAccount={() => {
                if (authUser?.isGuest) { handleLeaveGuest(); return; }
                setMenuOpen(false);
                setStep("profile");
              }}
              onSetMemberCount={handleSetMemberCount}
              chapterVisibility={chapterVisibility}
              onToggleChapterVisibility={handleToggleChapterVisibility}
              onOpenSupport={handleOpenSupport}
              chapterTitles={chapterTitles}
              supportStatus={supportStatus}
              onInviteFriends={handleInviteFriends}
              completed={effectiveCompleted}
              nextLesson={heroLesson}
              plan={authUser?.plan || "none"}
              authToken={authToken}
              onOpenProgramCat={(id) => { setProgramsCat(id); setStep("programs"); }}
              onContinue={() => {
                const byKey = { basic: curriculumBasicMerged, advanced: curriculumAdvancedMerged, extra: curriculumExtraMerged, fight: curriculumFightMerged, fightb: curriculumFightbMerged, partner: curriculumPartnerMerged, focus: curriculumFocusMerged };
                const item = heroLesson ? (byKey[heroLesson.curriculumKey] || []).find((i) => i.n === heroLesson.n) : null;
                if (item) openLesson(heroLesson.curriculumKey, item); else setStep("journey");
              }}
            />
          )}
          {step === "home" && appUpdate.enabled && appBuild > 0 && Number(appUpdate.latest) > appBuild && (appUpdate.force || (!updateDismissed && updateSeenDay !== todayKey)) && (
            <UpdateModal update={appUpdate} onLater={() => setUpdateDismissed(true)} />
          )}
          {step === "admin-announce" && <AdminAnnounceScreen authToken={authToken} onBack={() => { setStep("home"); setMenuOpen(true); }} />}
          {step === "admin-update" && (
            <AdminUpdateScreen
              update={appUpdate}
              build={appBuild}
              authToken={authToken}
              onCheck={async () => { const u = await apiCheckAppUpdate(authToken); setAppUpdate(u); return u; }}
              onSave={async (u) => { const saved = await apiSaveAppUpdate(authToken, u); setAppUpdate(saved); }}
              onBack={() => { setStep("home"); setMenuOpen(true); }}
            />
          )}
          {step === "reminder" && (
            <ReminderScreen
              reminder={reminder}
              nextLesson={nextLesson}
              onSet={handleSetReminder}
              onDisable={handleDisableReminder}
              onBack={() => { setStep("home"); setMenuOpen(true); }}
            />
          )}
          {step === "boxsci" && <BoxingScienceScreen onBack={() => { setStep("home"); setMenuOpen(true); }} />}
          {step === "journey" && <JourneyScreen isAdmin={Boolean(authUser?.isAdmin)} isGuest={Boolean(authUser?.isGuest)} plan={authUser?.plan || "none"} authToken={authToken} accountId={authUser?.identifier} onSubscribe={() => setStep("subscription")} onBack={() => { setStep("home"); setMenuOpen(true); }} />}
          {step === "programs" && (
            <ProgramsScreen initialCat={programsCat} isAdmin={Boolean(authUser?.isAdmin)} authToken={authToken} plan={authUser?.plan || "none"} onSubscribe={() => setStep("subscription")} onBack={() => { setStep("home"); setMenuOpen(true); }} />
          )}
          {step === "timer" && (
            <TimerScreen onBack={() => { setStep("home"); setMenuOpen(true); }} />
          )}
          {step === "info-gear" && (
            <InfoScreen
              title={tr("وسایل بوکس")}
              items={GEAR_ITEMS}
              onBack={() => {
                setStep("home");
                setMenuOpen(true);
              }}
            />
          )}
          {step === "info-tips" && (
            <EditableContent
              kind="text"
              title={tr("نکات کلیدی")}
              items={contentOverrides.tips || TIPS_ITEMS}
              isAdmin={Boolean(authUser?.isAdmin)}
              onSave={(v) => handleSaveContent("tips", v)}
              onReset={() => handleResetContent("tips")}
              onBack={() => {
                setStep("home");
                setMenuOpen(true);
              }}
            />
          )}
          {step === "info-about" && (
            <EditableContent
              kind="paragraph"
              title={tr("درباره آکادمی Naseri")}
              paragraph={contentOverrides.about || buildAboutText(resolveChapterTitles(chapterTitles))}
              isAdmin={Boolean(authUser?.isAdmin)}
              onSave={(v) => handleSaveContent("about", v)}
              onReset={() => handleResetContent("about")}
              onBack={() => {
                setStep("home");
                setMenuOpen(true);
              }}
            />
          )}
          {step === "info-faq" && (
            <EditableContent
              kind="qa"
              title={tr("سوالات متداول")}
              items={contentOverrides.faq || buildFaqItems(resolveChapterTitles(chapterTitles))}
              isAdmin={Boolean(authUser?.isAdmin)}
              onSave={(v) => handleSaveContent("faq", v)}
              onReset={() => handleResetContent("faq")}
              onBack={() => {
                setStep("home");
                setMenuOpen(true);
              }}
            />
          )}
          {step === "info-coach" &&
            (() => {
              const chapterNames = resolveChapterTitles(chapterTitles);
              const itemsFor = (k) => contentOverrides[`coach_${k}`] || COACH_BY_CHAPTER[k];
              const goHome = () => {
                setStep("home");
                setMenuOpen(true);
              };
              if (!coachChapter) {
                return (
                  <CoachHub
                    chapterNames={chapterNames}
                    counts={Object.fromEntries(COACH_CHAPTER_KEYS.map((k) => [k, itemsFor(k).length]))}
                    legacyCount={Array.isArray(contentOverrides.coach) ? contentOverrides.coach.length : 0}
                    onOpen={setCoachChapter}
                    onBack={goHome}
                  />
                );
              }
              const section = coachChapter === "legacy" ? "coach" : `coach_${coachChapter}`;
              return (
                <EditableContent
                  key={coachChapter}
                  kind="qa"
                  title={coachChapter === "legacy" ? tr("سایر موارد") : chapterNames[coachChapter]}
                  items={coachChapter === "legacy" ? contentOverrides.coach || [] : itemsFor(coachChapter)}
                  isAdmin={Boolean(authUser?.isAdmin)}
                  onSave={(v) => handleSaveContent(section, v)}
                  onReset={() => handleResetContent(section)}
                  onBack={() => setCoachChapter(null)}
                />
              );
            })()}
          {step === "info-rules" && (
            <EditableContent
              kind="qa"
              title={tr("قوانین و مقررات")}
              items={contentOverrides.rules || buildRulesItems(resolveChapterTitles(chapterTitles), plans)}
              isAdmin={Boolean(authUser?.isAdmin)}
              onSave={(v) => handleSaveContent("rules", v)}
              onReset={() => handleResetContent("rules")}
              onBack={() => {
                setStep("home");
                setMenuOpen(true);
              }}
            />
          )}
          {step === "admin-users" && (
            <AdminUsersScreen
              authToken={authToken}
              onBack={() => {
                setStep("home");
                setMenuOpen(true);
              }}
            />
          )}
          {step === "support-inbox" && (
            <SupportInboxScreen
              threads={supportThreads}
              loading={supportLoading}
              error={supportError}
              onOpenThread={openAdminSupportThread}
              onBack={() => {
                setStep("home");
                setMenuOpen(true);
              }}
            />
          )}
          {step === "support-chat" && (
            <SupportChatScreen
              title={tr("پشتیبانی")}
              subtitle={authUser?.isAdmin && activeSupportIdentifier ? activeSupportIdentifier : null}
              messages={supportMessages}
              myRole={authUser?.isAdmin && activeSupportIdentifier ? "admin" : "user"}
              onSend={handleSendSupportMessage}
              onSendVoice={handleSendSupportVoice}
              onBack={() => {
                if (authUser?.isAdmin && activeSupportIdentifier) {
                  setStep("support-inbox");
                } else {
                  setStep("home");
                  setMenuOpen(true);
                }
              }}
            />
          )}
          {step === "curriculum-extra" && (
            <CurriculumScreen
              title={chapterTitles?.extra || DEFAULT_CHAPTER_TITLES.extra}
              items={curriculumExtraMerged}
              curriculumKey="extra"
              onBack={() => setStep("home")}
              onSelect={(item) => openLesson("extra", item)}
              hasVideo={(n) => Boolean(videos[`extra-${n}`])}
              isCompleted={(n) => Boolean(effectiveCompleted[`extra-${n}`])}
              plan={authUser?.plan || "none"}
              onLockedSelect={() => setStep("subscription")}
              isAdmin={Boolean(authUser?.isAdmin)}
              onRename={(newTitle) => handleRenameChapter("extra", newTitle)}
            />
          )}
          {step === "curriculum-basic" && (
            <CurriculumScreen
              title={chapterTitles?.basic || DEFAULT_CHAPTER_TITLES.basic}
              items={curriculumBasicMerged}
              curriculumKey="basic"
              onBack={() => setStep("home")}
              onSelect={(item) => openLesson("basic", item)}
              hasVideo={(n) => Boolean(videos[`basic-${n}`])}
              isCompleted={(n) => Boolean(effectiveCompleted[`basic-${n}`])}
              plan={authUser?.plan || "none"}
              onLockedSelect={() => setStep("subscription")}
              isAdmin={Boolean(authUser?.isAdmin)}
              onRename={(newTitle) => handleRenameChapter("basic", newTitle)}
            />
          )}
          {step === "curriculum-advanced" && (
            <CurriculumScreen
              title={chapterTitles?.advanced || DEFAULT_CHAPTER_TITLES.advanced}
              items={curriculumAdvancedMerged}
              curriculumKey="advanced"
              onBack={() => setStep("home")}
              onSelect={(item) => openLesson("advanced", item)}
              hasVideo={(n) => Boolean(videos[`advanced-${n}`])}
              isCompleted={(n) => Boolean(effectiveCompleted[`advanced-${n}`])}
              plan={authUser?.plan || "none"}
              onLockedSelect={() => setStep("subscription")}
              isAdmin={Boolean(authUser?.isAdmin)}
              onRename={(newTitle) => handleRenameChapter("advanced", newTitle)}
            />
          )}
          {step === "curriculum-fight" && (
            <CurriculumScreen
              title={chapterTitles?.fight || DEFAULT_CHAPTER_TITLES.fight}
              items={curriculumFightMerged}
              curriculumKey="fight"
              onBack={() => setStep("home")}
              onSelect={(item) => openLesson("fight", item)}
              hasVideo={(n) => Boolean(videos[`fight-${n}`])}
              isCompleted={(n) => Boolean(effectiveCompleted[`fight-${n}`])}
              plan={authUser?.plan || "none"}
              onLockedSelect={() => setStep("subscription")}
              isAdmin={Boolean(authUser?.isAdmin)}
              onRename={(newTitle) => handleRenameChapter("fight", newTitle)}
            />
          )}
          {step === "curriculum-fightb" && (
            <CurriculumScreen
              title={chapterTitles?.fightb || DEFAULT_CHAPTER_TITLES.fightb}
              items={curriculumFightbMerged}
              curriculumKey="fightb"
              onBack={() => setStep("home")}
              onSelect={(item) => openLesson("fightb", item)}
              hasVideo={(n) => Boolean(videos[`fightb-${n}`])}
              isCompleted={(n) => Boolean(effectiveCompleted[`fightb-${n}`])}
              plan={authUser?.plan || "none"}
              onLockedSelect={() => setStep("subscription")}
              isAdmin={Boolean(authUser?.isAdmin)}
              onRename={(newTitle) => handleRenameChapter("fightb", newTitle)}
            />
          )}
          {step === "curriculum-partner" && (
            <CurriculumScreen
              title={chapterTitles?.partner || DEFAULT_CHAPTER_TITLES.partner}
              items={curriculumPartnerMerged}
              curriculumKey="partner"
              onBack={() => setStep("home")}
              onSelect={(item) => openLesson("partner", item)}
              hasVideo={(n) => Boolean(videos[`partner-${n}`])}
              isCompleted={(n) => Boolean(effectiveCompleted[`partner-${n}`])}
              plan={authUser?.plan || "none"}
              onLockedSelect={() => setStep("subscription")}
              isAdmin={Boolean(authUser?.isAdmin)}
              onRename={(newTitle) => handleRenameChapter("partner", newTitle)}
            />
          )}
          {step === "curriculum-focus" && (
            <CurriculumScreen
              title={chapterTitles?.focus || DEFAULT_CHAPTER_TITLES.focus}
              items={curriculumFocusMerged}
              curriculumKey="focus"
              onBack={() => setStep("home")}
              onSelect={(item) => openLesson("focus", item)}
              hasVideo={(n) => Boolean(videos[`focus-${n}`])}
              isCompleted={(n) => Boolean(effectiveCompleted[`focus-${n}`])}
              plan={authUser?.plan || "none"}
              onLockedSelect={() => setStep("subscription")}
              isAdmin={Boolean(authUser?.isAdmin)}
              onRename={(newTitle) => handleRenameChapter("focus", newTitle)}
            />
          )}
          {step === "lesson" && activeLesson && (
            <LessonScreen
              item={activeLesson.item}
              videoSrc={videos[lessonKey]}
              curriculumKey={activeLesson.curriculumKey}
              isAdmin={Boolean(authUser?.isAdmin)}
              authToken={authToken}
              accountId={accountId}
              videosStatus={videosStatus}
              onRetryVideos={handleRetryVideos}
              onUploaded={(url) => setVideos((v) => ({ ...v, [lessonKey]: url }))}
              onRename={(newTitle) => handleRenameLesson(activeLesson.curriculumKey, activeLesson.item.n, newTitle)}
              onComplete={handleLessonComplete}
              onPracticeTick={handlePracticeTick}
              onBack={() => setStep(`curriculum-${activeLesson.curriculumKey}`)}
            />
          )}
          {step === "profile" && (
            <ProfileScreen
              sessionsCount={Object.keys(effectiveCompleted).length}
              progressPercent={computeProgressPercent(effectiveCompleted)}
              practiceMinutes={Math.floor(practiceSeconds / 60)}
              profileName={profileName}
              profileImage={profileImage}
              onNameChange={handleNameChange}
              onImageChange={handleImageChange}
              nextLesson={nextLesson}
              reminder={reminder}
              onSetReminder={handleSetReminder}
              plan={authUser?.plan || "none"}
              planExpiresAt={authUser?.planExpiresAt || null}
              accountContact={authUser?.identifier}
              authToken={authToken}
              isGuest={Boolean(authUser?.isGuest)}
              onOpenJourney={() => setStep("journey")}
              badgeUnlocked={{
                basic: CURRICULUM_BASIC.every((it) => effectiveCompleted[`basic-${it.n}`]),
                advanced: CURRICULUM_ADVANCED.every((it) => effectiveCompleted[`advanced-${it.n}`]),
                extra: CURRICULUM_EXTRA.every((it) => effectiveCompleted[`extra-${it.n}`]),
                fight: CURRICULUM_FIGHT.every((it) => effectiveCompleted[`fight-${it.n}`]),
                partner: CURRICULUM_PARTNER.every((it) => effectiveCompleted[`partner-${it.n}`]),
                focus: CURRICULUM_FOCUS.every((it) => effectiveCompleted[`focus-${it.n}`]),
              }}
            />
          )}
          {step === "subscription" && (
            <SubscriptionScreen
              plan={authUser?.plan || "none"}
              planExpiresAt={authUser?.planExpiresAt || null}
              authToken={authToken}
              isLoggedIn={Boolean(authToken)}
              onRequireLogin={authUser?.isGuest ? handleLeaveGuest : null}
              chapterVisibility={chapterVisibility}
              chapterTitles={chapterTitles}
              promoText={promoText}
              plans={plans}
              isAdmin={Boolean(authUser?.isAdmin)}
              onSavePromoText={handleSavePromoText}
              onSavePlan={handleSavePlan}
              onResetPlan={handleResetPlan}
              onPlanConfirmed={(newPlan, expiresAt) => {
                setAuthUser((u) => {
                  const next = { ...u, plan: newPlan, planExpiresAt: expiresAt || u?.planExpiresAt || null };
                  saveSession(authToken, next);
                  return next;
                });
              }}
            />
          )}
          </div>
          )}
          {bootGate === "ok" && (step === "home" || step === "profile" || step === "subscription") && (
            <BottomTabs active={step} onNavigate={setStep} />
          )}
          {exitHint && (
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: "84px",
                background: "rgba(23,22,26,0.95)",
                border: "1px solid #2a292e",
                zIndex: 50,
              }}
            >
              <p
                style={{ fontFamily: "Vazirmatn, sans-serif", color: "#F3EEE6" }}
                className="text-xs px-4 py-2 rounded-full whitespace-nowrap"
              >
                {tr("برای خروج دوباره بزنید")}</p>
            </div>
          )}
        </PhoneMock>
    </div>
  );
}

const rootEl = document.getElementById("root");
ReactDOM.createRoot(rootEl).render(<App />);
