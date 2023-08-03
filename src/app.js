import { header } from "./DefaultLayouts/Header/header.js";
import { headermenu } from "./DefaultLayouts/Header/headermenu.js";
import { sidebar } from "./DefaultLayouts/Sidebar/sidebar.js";
import { footer } from "./DefaultLayouts/Footer/footer.js";
import { home } from "./Pages/Home/home.js";
import { product } from "./Pages/Product/product.js";
import { NotFound } from "./Pages/NotFound/notfound.js";
import { login } from "./Pages/LogIn/login.js";
import { register } from "./Pages/Register/register.js";
import { cart } from "./Pages/Cart/cart.js";
import { payment } from "./Pages/Payment/payment.js";
import { category } from "./Pages/Category/category.js";
import { profile } from "./Pages/Profile/profile.js";
import { dashboard } from "./Pages/Dashboard/dashboard.js";
import { listproduct } from "./Pages/Dashboard/ListProduct/listproduct.js";
import { posv1 } from "./Pages/PosV1/posv1.js";

const routes = [
  { path: "/", view: home, SPA: 1 },
  { path: "/product", view: product, SPA: 1 },
  { path: "/register", view: register, SPA: 1 },
  { path: "/login", view: login, SPA: 0 },
  { path: "/cart", view: cart, SPA: 1 },
  { path: "/profile", view: profile, SPA: 1 },
  { path: "/product/category", view: category, SPA: 1 },
  { path: "/payment", view: payment, SPA: 1 },
  { path: "/dashboard", view: dashboard, SPA: 1 },
  { path: "/dashboard/listproduct", view: listproduct, SPA: 1 },
  { path: "/pos_v1", view: posv1, SPA: 1 },
];
const router = () => {
  const router = routes.find((router) => {
    return router.path === location.pathname;
  });
  if (!router) {
    return NotFound();
  }
  return router.view();
};

document.addEventListener("DOMContentLoaded", async () => {
  document.body.addEventListener("click", async (e) => {
    let href = e.target.href;
    if (!href) {
      return;
    }
    const hrefsplit = href.split("http://localhost:8001/");
    const router = routes.find((router) => {
      return router.path === "/" + hrefsplit[hrefsplit.length - 1];
    });
    if (router.SPA === 1) {
      e.preventDefault();
      history.pushState(null, null, e.target.href);
      const html = await router.view();
      document.querySelector("#page").innerHTML = "";
      document.querySelector("#page").appendChild(html);
    }
  });
  const html = await router();
  document.querySelector("#page").appendChild(html);
});
function main() {
  const page = document.createElement("div");
  page.id = "page";
  const root = document.querySelector("#root");
  if (location.pathname.startsWith("/dashboard")) {
    root.appendChild(sidebar());
    page.style.marginLeft = "230px";
    page.style.padding = "85px 35px";
    page.style.backgroundColor = "#f0f1f1";
    root.appendChild(page);
  } else if (location.pathname.startsWith("/pos")) {
    root.appendChild(page);
  } else {
    root.appendChild(header());
    root.appendChild(headermenu());
    root.appendChild(page);
    root.appendChild(footer());
  }
}
main();
