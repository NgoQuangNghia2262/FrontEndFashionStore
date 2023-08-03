import sheet from "./payment.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);

export const payment = async () => {
  const paymentElement = document.createElement("div");
  paymentElement.id = "Pagepayment";
  paymentElement.innerHTML = `
    payment
  `;
  return paymentElement;
};
