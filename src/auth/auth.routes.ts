import { Router } from 'express';
import { AuthController } from './controllers/auth.controller';

export class AuthRoutes {
  _router: Router;
  _controller: AuthController;
  _path: string;

  constructor() {
    this.controller = new AuthController();
    this.router = Router();
    this.path = '/v1/auth';
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post('/sign-in', (req, res) => this.controller.login(req, res));
    this.router.post('/sign-up', (req, res) =>
      this.controller.register(req, res)
    );
  }

  get controller() {
    return this._controller;
  }

  set controller(value: AuthController) {
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
