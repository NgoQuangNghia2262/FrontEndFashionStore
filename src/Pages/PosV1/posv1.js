import sheet from "./posv1.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);

export const posv1 = async () => {
  const posv1Element = document.createElement("div");
  posv1Element.id = "Pageposv1";
  posv1Element.innerHTML = `
  <div class="bills"></div>
  <div class="billing_Details"></div>
  <div class="categorys"></div>
  <div class="products"></div>
  `;
  return posv1Element;
};
