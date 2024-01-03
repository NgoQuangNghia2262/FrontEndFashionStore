import sheet from "./spinner1.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);
export const spinner1 = () => {
  const spinner1Element = document.createElement("div");
  spinner1Element.className = "spinner";
  spinner1Element.innerHTML = `
  <div class="loader l1"></div>
  <div class="loader l2"></div>`;
  return spinner1Element;
};
