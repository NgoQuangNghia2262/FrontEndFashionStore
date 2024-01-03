export class BillingDetails {
  constructor({
    id,
    idBill,
    sizeProduct,
    price,
    nameProduct,
    colorProduct,
    quantity,
  }) {
    this.id = id;
    this.idBill = idBill ? idBill.trim() : "";
    this.sizeProduct = sizeProduct.trim();
    this.price = price ? price : 0;
    this.nameProduct = nameProduct.trim();
    this.colorProduct = colorProduct.trim();
    this.quantity = quantity;
  }
}
