import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Product } from '@product/entities/product.entity';

export const ProductExists = createParamDecorator(
  async (idParamName: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const productId = +request.params[idParamName];
    const productExists =
      !isNaN(productId) && !!(await Product.findOneBy({ id: productId }));
    if (!productExists) {
      throw new BadRequestException("Product doesn't exist");
    }
    return productId;
  },
);
