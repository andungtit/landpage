export const APP_STORE_URL =
  "https://apps.apple.com/us/app/oneplan-travel/id6761648165";

export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.oneplan.android";

export const APPLE_ITUNES_APP_ID = "6761648165";

// Các trang con (journal, brand, privacy, terms) nằm trên site gốc
export const EXTERNAL_SITE = (
  process.env.NEXT_PUBLIC_EXTERNAL_SITE || "https://www.oneplan.space"
).replace(/\/$/, "");

export const ONEPLAN_API_BASE = (
  process.env.NEXT_PUBLIC_ONEPLAN_API_BASE || "https://api.oneplan.space"
).replace(/\/$/, "");

export const PUBLIC_PLAN_PATH =
  process.env.NEXT_PUBLIC_ONEPLAN_PUBLIC_PLAN_PATH ||
  "/trip-generator/public-preview";

export const API_TIMEOUT_MS = 20000;
export const GENERATE_TIMEOUT_MS = 4 * 60 * 1000;

// Site gốc chỉ bật modal "Make your next plan" ở bản tiếng Anh.
// Ở bản tiếng Việt, nút CTA dẫn về #download.
export const PLAN_DEMO_LOCALES = ["en"];

export const PRODUCT_HUNT_URL =
  "https://www.producthunt.com/products/oneplan-travel?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-oneplan-travel";
export const PRODUCT_HUNT_BADGE =
  "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1175104&theme=light&t=1781778492280";
export const UNIKORN_URL =
  "https://unikorn.vn/p/oneplan-travel?ref=embed-oneplan-travel";
export const UNIKORN_BADGE =
  "https://unikorn.vn/api/widgets/badge/oneplan-travel/rank?theme=light&type=daily";
