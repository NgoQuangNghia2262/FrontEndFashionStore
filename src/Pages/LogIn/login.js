import { Authentication } from "../../fetchData/authentication.js";
import { button } from "../../components/Button/button.js";
import sheet from "./login.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);
async function fetchData(coursAPI, data) {
  try {
    const response = await fetch(coursAPI, data);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const login = () => {
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
    const accessToken = await Authentication.Login({ username, password });
    if (accessToken) {
      location.href = "/";
      localStorage.setItem("accessToken", accessToken);
      alert("Success");
    } else {
      alert("Wrong password");
    }
  });

  loginElement.appendChild(buttonLogin);
  return loginElement;
};
