import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import { AuthRoutes } from './auth/auth.routes';
import { CartRoutes } from './cart/cart.routes';
import { ProductRoutes } from './product/product.routes';
import { Settings } from './settings';

class App extends Settings {
  private _app: Application;
  private _baseUrl: string;

  constructor() {
    super();
    this.app = express();
    this.baseUrl = '/rest-api/fake-store';
    this.initMiddleware();
    this.initRoutes();
    this.initServer();
  }

  private initMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors({ origin: '*' }));
    this.app.use(morgan('dev'));
  }

  private initRoutes(): void {
    const routers = [new ProductRoutes(), new AuthRoutes(), new CartRoutes()];
    routers.map(({ router, path }) =>
      this.app.use(this.baseUrl + path, router)
    );
  }

  private initServer(): void {
    this.app.listen(this.port, this.host, () =>
      console.log(`[ Ready ] http://${this.host}:${this.port}`)
    );
  }

  get app() {
    return this._app;
  }

  set app(value: Application) {
    this._app = value;
  }

  get baseUrl() {
    return this._baseUrl;
  }

  set baseUrl(value: string) {
    this._baseUrl = value;
  }
}

new App();
