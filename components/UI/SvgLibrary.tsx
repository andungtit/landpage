import React from "react";

// Thư viện symbol SVG dùng chung (giống site gốc) — tham chiếu bằng <Icon name="arrow" />
const SvgLibrary = () => (
  <svg className="svg-library" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <symbol id="i-arrow" viewBox="0 0 24 24">
        <path d="M5 12h14m-6-6 6 6-6 6" />
      </symbol>
      <symbol id="i-plus" viewBox="0 0 24 24">
        <path d="M12 5v14M5 12h14" />
      </symbol>
      <symbol id="i-scan" viewBox="0 0 24 24">
        <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M3 12h18" />
      </symbol>
      <symbol id="i-check" viewBox="0 0 24 24">
        <path d="m5 12 4 4L19 6" />
      </symbol>
      <symbol id="i-globe" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </symbol>
      <symbol id="i-pin" viewBox="0 0 24 24">
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </symbol>
      <symbol id="i-people" viewBox="0 0 24 24">
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-3a6 6 0 0 1 12 0v3m0-17a3 3 0 0 1 0 6m3 3a5 5 0 0 1 3 5v3" />
      </symbol>
      <symbol id="i-wallet" viewBox="0 0 24 24">
        <path d="M20 8V5H5a2 2 0 0 0 0 4h16v12H5a3 3 0 0 1-3-3V7m19 6h-6v4h6" />
      </symbol>
    </defs>
  </svg>
);

export default SvgLibrary;
