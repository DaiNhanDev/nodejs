import { BadRequestError } from "../../utils/error.response";
import { electronicRepository } from "../../repositories";
import { ProductBase } from "./product.service";

export class Electronic extends ProductBase {
  async createProduct() {
    const newElectronic = await electronicRepository.create({
      ...this.product_attibutes,
      product_shop: this.product_shop,
    });
    if (!newElectronic) throw new BadRequestError();

    const newProduct = await super.createProduct(newElectronic._id);

    if (!newProduct) throw new BadRequestError();

    return newProduct;
  }
}
