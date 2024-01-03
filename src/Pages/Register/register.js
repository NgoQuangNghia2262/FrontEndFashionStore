import { button } from "../../components/Button/button.js";
import { Authentication } from "../../fetchData/authentication.js";
import sheet from "./register.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);

export const register = async () => {
  const registerElement = document.createElement("div");
  registerElement.id = "PageRegister";
  registerElement.innerHTML = `
    <div class="container_header">
      <h1>Sign Up</h1>
      <p>It's quick and easy.</p>
    </div>
    <div class="container_center">
      <input id="username" type="text" name="username" placeholder="Full name" />
      <input type="tel" placeholder="Mobile number" />
      <input id="password" type="password" placeholder="New password" />
      <input type="date" />
      <input type="text" placeholder="Address" />
    </div>
    <div class="container_fotter">
      <p>
        By clicking Sign Up, you agree to our Terms, Privacy Policy and
        Cookies Policy. You may receive SMS notifications from us and can opt
        out at any time.
      </p>
    </div>
    <div class="container_button">
    </div>
  `;
  let buttonSignUp = button({
    text: "Sign Up",
    tag: "button",
    className: "activate",
    style: "background-color: #1877F2;",
  });

  buttonSignUp.addEventListener("click", async () => {
    let username = registerElement.querySelector("#username").value;
    let password = registerElement.querySelector("#password").value;
    const res = await Authentication.Register({
      username,
      password,
      permissions: "Customer",
    });
    if (res) {
      alert("Thanh cong");
    } else {
      alert("that bai");
    }
  });
  registerElement.querySelector(".container_button").appendChild(buttonSignUp);
  return registerElement;
};
