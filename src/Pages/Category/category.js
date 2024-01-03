import sheet from "./category.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);

export const category = async () => {
  const page_Category_Element = document.createElement("div");
  page_Category_Element.id = "page_Category_Element";
  page_Category_Element.innerHTML = `
  
  `;
  return page_Category_Element;
};
