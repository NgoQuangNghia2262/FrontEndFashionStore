import { header } from "../HeaderDashboard/header.js";
import { User } from "../../../fetchData/user.js";

import sheet from "./listproduct.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);

export const listproduct = async () => {
  let refultt = await Promise.all([User.getLoggedInUser()]);
  let loggedInUser = refultt[0];
  const listproductElement = document.createElement("div");
  listproductElement.innerHTML = `
    listproduct
    `;
  listproductElement.appendChild(
    header({
      user: loggedInUser,
      title: "Danh sách sản phẩm",
    })
  );

  return listproductElement;
};
