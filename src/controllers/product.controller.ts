import { Response } from "express";
import { ProductFactory } from "../services/product";
import { CREATED, SuccessResponse } from "../utils/success.response";
import { IClothing, IElectronic, IProduct } from "types";
import { CustomRequest } from "types/customDefinition";

class ProductController {
  create = async (req: CustomRequest, res: Response) => {
    const metadata = await ProductFactory.createProduct(req.body.product_type, {
      ...req.body,
      product_shop: req.user.userId,
    });
    return new SuccessResponse<IProduct<IClothing | IElectronic>>({
      metadata,
      message: "Created Success",
    }).send(res);
  };

  getAllDraftForShop = async (req: CustomRequest, res: Response) => {
    const metadata = await ProductFactory.findAllDraftForShop({
      product_shop: req.user.userId,
    });
    return new SuccessResponse<IProduct<IClothing | IElectronic>[]>({
      metadata,
      message: "Success",
    }).send(res);
  };

  getAllPublishedForShop = async (req: CustomRequest, res: Response) => {
    const metadata = await ProductFactory.findAllPublishedForShop({
      product_shop: req.user.userId,
    });
    return new SuccessResponse<IProduct<IClothing | IElectronic>[]>({
      metadata,
      message: "Success",
    }).send(res);
  };

  publishProductByShop = async (req: CustomRequest, res: Response) => {
    const metadata = await ProductFactory.publishProductByShop({
      product_shop: req.user.userId,
      product_id: req.params.id,
    });
    return new SuccessResponse<IProduct<IClothing | IElectronic>[]>({
      metadata,
      message: "Success",
    }).send(res);
  };
}

export default new ProductController();
