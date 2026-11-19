# OnePlan Landing Page

Landing page OnePlan (`https://www.oneplan.space/`) được xây dựng theo đúng pattern của repo `customer` (Next.js 12 + TypeScript + Redux Toolkit + TailwindCSS + i18n `en`/`vi`).

## Cấu trúc thư mục

- `pages/` — `_app.tsx`, `_document.tsx`, `index.tsx`
- `components/` — chia theo từng section (`header`, `hero`, `intro`, `moments`, `features`, `process`, `payments`, `story`, `journal`, `faq`, `download`, `planDemo`, `footer`, `layout`, `UI`)
- `hooks/` — `useLanguage`, `useReveal`, `useScrollScenes`
- `locales/` — `en.ts`, `vi.ts` (đầy đủ 100% nội dung gốc cho `/` và `/vi`)
- `mock/` — dữ liệu tĩnh cho từng section
- `store/` — Redux slices (`feature-slice`, `mobileMenu-slice`, `navigation-slice`, `planDemo-slice`)
- `services/` — `planApi.ts` (gọi API preview hành trình của OnePlan)
- `lib/` — `config.ts`, `smoothScroll.ts` (Lenis), `types/`
- `utilities/` — các hàm tiện ích (`math`, `inert`, `renderLines`, `externalHref`)
- `styles/` — `globals.css`, `oneplan.css`, `lenis.css`
- `public/assets/` — toàn bộ hình ảnh, icon và font `neue-montreal.woff2` từ site gốc

## Chạy dự án

```bash
npm install
npm run dev
```

- Tiếng Anh: `http://localhost:3000/`
- Tiếng Việt: `http://localhost:3000/vi`
