// Cho phép set thuộc tính `inert` trên HTMLElement (TS 4.6 chưa có trong lib.dom)
interface HTMLElement {
  inert: boolean;
}
