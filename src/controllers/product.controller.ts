import { Response } from "express";
import { ProductFactory } from "../services/product";
import {
  CREATED,
  NO_CONTENT,
  SuccessResponse,
} from "../utils/success.response";
import { IProduct } from "types";
import { CustomRequest } from "types/customDefinition";
import { get } from "lodash";
import { ProductService } from "../services/product.service";

class ProductController {
  create = async (req: CustomRequest, res: Response) => {
    const metadata = await ProductFactory.createProduct(req.body.product_type, {
      ...req.body,
      product_shop: req.user.userId,
    });
    return new CREATED<IProduct>({
      metadata,
      message: "Created Success",
    }).send(res);
  };

  getAllDraftForShop = async (req: CustomRequest, res: Response) => {
    const metadata = await ProductFactory.findAllDraftForShop({
      product_shop: req.user.userId,
    });
    return new SuccessResponse<IProduct[]>({
      metadata,
      message: "Success",
    }).send(res);
  };

  getAllPublishedForShop = async (req: CustomRequest, res: Response) => {
    const metadata = await ProductFactory.findAllPublishedForShop({
      product_shop: req.user.userId,
    });
    return new SuccessResponse<IProduct[]>({
      metadata,
      message: "Success",
    }).send(res);
  };

  publishProductByShop = async (req: CustomRequest, res: Response) => {
    await ProductFactory.publishProductByShop({
      product_shop: req.user.userId,
      product_id: req.params.id,
    });
    return new NO_CONTENT<null>({
      message: "Success",
    }).send(res);
  };

  unPublishProductByShop = async (req: CustomRequest, res: Response) => {
    await ProductFactory.unPublishProductByShop({
      product_shop: req.user.userId,
      product_id: req.params.id,
    });
    return new NO_CONTENT<null>({
      message: "Success",
    }).send(res);
  };

  searchProductBuUser = async (req: CustomRequest, res: Response) => {
    const query = get(req, "query");
    const metadata = await ProductFactory.searchProduct({
      search: query?.search || "",
    });
    return new SuccessResponse<IProduct[]>({
      metadata,
      message: "Success",
    }).send(res);
  };

  getAllProduct = async (req: CustomRequest, res: Response) => {
    const query = get(req, "query");
    const { filter, limit, sort, select, page } = query;
    const metadata = await ProductFactory.findAllProducts({
      filter,
      limit,
      sort,
      select,
      page,
    });
    return new SuccessResponse<IProduct[]>({
      metadata,
      message: "Success",
    }).send(res);
  };

  getProductById = async (req: CustomRequest, res: Response) => {
    const metadata = await ProductFactory.findProduct({
      product_id: req.params.product_id,
      unSelect: [],
    });
    return new SuccessResponse<IProduct>({
      metadata,
      message: "Success",
    }).send(res);
  };

  updateProductById = async (req: CustomRequest, res: Response) => {
    const metadata = await ProductFactory.updateProductById({
      product_id: req.params.product_id,
      payload: {
        ...req.body,
        product_shop: req.user.userId,
      },
      type: req.body.product_type,
    });
    return new SuccessResponse<IProduct>({
      metadata,
      message: "Success",
    }).send(res);
  };

  getProduct = async (req: CustomRequest, res: Response) => {
    const query = get(req, "query");
    const { filter, limit, sort, select, page } = query;
    const metadata = await ProductService.findProducts({
      filter,
      limit,
      sort,
      select,
      page,
    });
    console.log('metadata: ', metadata);
    return new SuccessResponse<IProduct[]>({
      metadata,
      message: "Success",
    }).send(res);
  };
}

export default new ProductController();
