import sheet from "./profile.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);

export const profile = async () => {
  const profileElement = document.createElement("div");
  profileElement.id = "Pageprofile";
  profileElement.innerHTML = `
    profile
  `;
  return profileElement;
};
