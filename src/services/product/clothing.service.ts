import { BadRequestError } from "../../utils/error.response";
import { clothingRepository } from "../../repositories";
import { ProductBase } from "./product.service";

export class Clothing extends ProductBase {
  async createProduct() {
    const newClothing = await clothingRepository.create({
      ...this.product_attibutes,
      product_shop: this.product_shop,
    });
    console.log("=======> newClothing", newClothing);
    if (!newClothing) throw new BadRequestError();

    const newProduct = await super.createProduct(newClothing._id);

    if (!newProduct) throw new BadRequestError();

    return newProduct;
  }
}
