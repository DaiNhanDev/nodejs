import { BadRequestError } from "utils/error.response";
import { discountRepository } from "../repositories";
import { ProductFactory } from "./product";
import { convertToObjectId } from "utils";

/**
 * Discount service
 *
 */
const { findDiscountByCode, create } = discountRepository;
class DiscountService {
  static async createDiscountCode(payload) {
    const foundDisccount = await findDiscountByCode(
      payload.code,
      payload.shopId
    );

    if (foundDisccount && foundDisccount.is_active) {
      throw new BadRequestError();
    }
    // if start_date > end_date || date < start_date || date > end_date
    const newDiscount = await create(payload);

    return newDiscount;
  }

  static async updateDiscountCode() {}

  static async getAllDiscountCodeWithProduct({
    code,
    shopId,
    userId,
    limit,
    page,
  }) {
    const foundDisccount = await findDiscountByCode(code, shopId);
    if (!foundDisccount || !foundDisccount.is_active) {
      throw new BadRequestError();
    }
    let products = [];
    if (foundDisccount.applies_to === "all") {
      products = await ProductFactory.findAllProducts({
        filter: {
          product_shop: convertToObjectId(shopId),
          is_published: true,
        },
        limit: +limit,
        page: +page,
        sort: "ctime",
        select: ["product_name"],
      });
    }

    if (foundDisccount.applies_to === "specific") {
      products = await ProductFactory.findAllProducts({
        filter: {
          _id: { $in: foundDisccount.product_ids },
          is_published: true,
        },
        limit: +limit,
        page: +page,
        sort: "ctime",
        select: ["product_name"],
      });
    }

    return products;
  }

  static async getAllDiscountCodeByShop(payload) {
    // const discounts =
  }
}

export { DiscountService };
