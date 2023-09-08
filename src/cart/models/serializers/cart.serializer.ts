import { IProduct } from '../interfaces/product.interface';

export class CartSerializer {
  id: string;
  title: string;
  price: number;
  thumbnail: string;

  constructor(product: IProduct) {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.thumbnail = product.images[0];
  }
}
