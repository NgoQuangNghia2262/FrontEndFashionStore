import { Authentication } from "../../fetchData/authentication.js";
import { button } from "../../components/Button/button.js";
import sheet from "./login.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);

export const login = async () => {
  const loginElement = document.createElement("div");
  loginElement.id = "loginPage";
  loginElement.innerHTML = `
    <h1>Đăng nhập</h1>
    <label for="username">Tên người dùng:</label>
    <input type="text" id="username" name="username" required />
    <br />
    <label for="password">Mật khẩu:</label>
    <input type="password" id="password" name="password" required />
    <br />
    <a href="/register" data-link>Bạn chưa có tài khoản ?</a>
  `;
  const buttonLogin = button({
    text: "Đăng nhập",
    tag: "button",
  });
  buttonLogin.addEventListener("click", async () => {
    const username = loginElement.querySelector("#username").value;
    const password = loginElement.querySelector("#password").value;
    await Authentication.Login({ username, password })
      .then((data) => {
        location.href = "/";
        localStorage.setItem("accessToken", username);
        alert(data);
      })
      .catch((err) => {
        alert("Lỗi");
      });
  });

  loginElement.appendChild(buttonLogin);
  return loginElement;
};
