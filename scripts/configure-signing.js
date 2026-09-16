const fs = require("fs");

const gradlePath = "android/app/build.gradle";
let content = fs.readFileSync(gradlePath, "utf8");

// ۱- اضافه کردن signingConfigs (فقط اگه قبلاً اضافه نشده باشه)
if (!content.includes("signingConfigs {")) {
  content = content.replace(
    /android\s*\{/,
    `android {
    signingConfigs {
        release {
            storeFile file(System.getenv("KEYSTORE_PATH") ?: "release.keystore")
            storePassword System.getenv("SIGNING_PASSWORD")
            keyAlias System.getenv("KEY_ALIAS")
            keyPassword System.getenv("SIGNING_PASSWORD")
        }
    }
`
  );
}

// ۲- وصل کردن همون امضا به بیلد release
if (!content.includes("signingConfig signingConfigs.release")) {
  content = content.replace(
    /(buildTypes\s*\{\s*release\s*\{)/,
    `$1
            signingConfig signingConfigs.release`
  );
}

// ۳- شماره‌ی نسخه رو خودکار از شماره‌ی اجرای GitHub Actions می‌گیریم
// (هر بار که Actions اجرا بشه، این عدد خودکار افزایش پیدا می‌کنه - دقیقاً چیزی که برای آپدیت لازمه)
const versionCode = process.env.BUILD_VERSION_CODE || "1";
const versionName = process.env.BUILD_VERSION_NAME || "1.0.0";
content = content.replace(/versionCode\s+\d+/, `versionCode ${versionCode}`);
content = content.replace(/versionName\s+"[^"]*"/, `versionName "${versionName}"`);

fs.writeFileSync(gradlePath, content);
console.log(`build.gradle patched — versionCode=${versionCode} versionName=${versionName}`);
