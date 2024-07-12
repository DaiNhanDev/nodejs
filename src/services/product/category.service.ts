import { BadRequestError } from "../../utils/error.response";
import { ElectronicRepository, ClothingRepository } from "../../repositories";
import { ProductBase } from "./product.service";
import { removeUndefinedObject, updateNestedObjectParser } from "../../utils";
import { omit } from "lodash";
import { Model } from "mongoose";
import { IClothing, IElectronic } from "../../types";

type IRepository = ElectronicRepository | ClothingRepository;
export class Category extends ProductBase {
  repository: IRepository;
  model: Model<IClothing | IElectronic>;

  constructor(params, repository, model) {
    super(params);
    this.repository = repository;
    this.model = model;
  }
  async createProduct() {
    const newCategory = await this.repository.create({
      ...this.product_attibutes,
      product_shop: this.product_shop,
    });
    if (!newCategory) throw new BadRequestError();

    const newProduct = await super.createProduct(newCategory._id);

    if (!newProduct) throw new BadRequestError();

    return newProduct;
  }

  async updateProductById(product_id) {
    const objectParams = removeUndefinedObject(
      omit(this, "repository", "model"),
    );
    if (objectParams && objectParams.product_attibutes) {
      // update child
      await this.repository.updateProductById({
        product_id,
        payload: updateNestedObjectParser(objectParams.product_attibutes),
        model: this.model,
      });
    }

    const updateProduct = await super.updateProductById(
      product_id,
      updateNestedObjectParser(objectParams),
    );

    if (!updateProduct) throw new BadRequestError();

    return updateProduct;
  }
}
