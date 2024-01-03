import sheet from "./loader1.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);
export const loader1 = () => {
  const loader1Element = document.createElement("div");
  loader1Element.className = "loader";
  return loader1Element;
};
