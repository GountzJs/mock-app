import { Router } from 'express';
import { CartController } from './controllers/cart.controller';

export class CartRoutes {
  _controller: CartController;
  _router: Router;
  _path: string;

  constructor() {
    this.controller = new CartController();
    this.router = Router();
    this.path = '/v1/cart';
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post('', (req, res) => this.controller.findCart(req, res));
  }

  get controller() {
    return this._controller;
  }

  set controller(value: CartController) {
    this._controller = value;
  }

  get router() {
    return this._router;
  }

  set router(value: Router) {
    this._router = value;
  }

  get path() {
    return this._path;
  }

  set path(value: string) {
    this._path = value;
  }
}
