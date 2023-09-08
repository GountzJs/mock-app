import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/utils/httpResponse';
import { CartService } from '../services/cart.service';

export class CartController {
  constructor(private readonly cartService: CartService = new CartService()) {}

  findCart = async (req: Request, res: Response) => {
    const { ids } = req.body.cart;
    try {
      const cart = await this.cartService.getCart(ids);
      if (!cart.length)
        return HttpResponse.notAceptable(
          res,
          'No hay produtos',
          'No ha agregado productos al carrito'
        );
      HttpResponse.ok(res, { cart });
    } catch {
      HttpResponse.internalError(res);
    }
  };
}
