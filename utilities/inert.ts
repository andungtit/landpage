// Set/unset thuộc tính `inert` (React 18.1 chưa hỗ trợ prop này)
export const setInert = (element: HTMLElement | null, inert: boolean) => {
  if (!element) return;
  element.inert = inert;
  if (inert) element.setAttribute("inert", "");
  else element.removeAttribute("inert");
};
