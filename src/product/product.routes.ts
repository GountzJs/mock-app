import { Router } from 'express';
import { ProductController } from './controllers/product.controller';

export class ProductRoutes {
  _controller: ProductController;
  _router: Router;
  _path: string;

  constructor() {
    this.controller = new ProductController();
    this.router = Router();
    this.path = '/v1/product';
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get('', (req, res) => this.controller.getAll(req, res));
    this.router.get('/:id', (req, res) => this.controller.findOne(req, res));
    this.router.post('/favorites', (req, res) =>
      this.controller.findByIds(req, res)
    );
  }

  get controller() {
    return this._controller;
  }

  set controller(value: ProductController) {
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
