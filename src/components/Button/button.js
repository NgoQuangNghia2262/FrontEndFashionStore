import sheet from "./button.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);
export const button = ({
  className,
  tag,
  href,
  text,
  onclick,
  data_type,
  style,
}) => {
  const wrapButton = document.createElement("div");
  wrapButton.id = "components_wrapButton";

  wrapButton.innerHTML = `<${tag} 
  class="${className}"
   href= 
   "${href ? href : ""}" 
   ${data_type ? data_type : ""}
   >
   ${text}
   </${tag}>`;
  if (onclick) {
    const tagElement = wrapButton.querySelector(tag);
    tagElement.addEventListener("click", onclick);
  }
  if (style) {
    const tagElement = wrapButton.querySelector(tag);
    tagElement.style = style;
  }
  return wrapButton;
};
