import { Database } from '../../shared/database.service';
import { IProduct } from '../models/interfaces/product.interface';
import { CartSerializer } from '../models/serializers/cart.serializer';

export class CartService {
  constructor(private readonly database: Database = new Database()) {}

  private async getAll() {
    const products = await this.database.get('products');
    return products as { products: IProduct[] };
  }

  async getCart(ids: string[]): Promise<CartSerializer[]> {
    const { products } = await this.getAll();
    const cart = products.filter((product) => ids.includes(product.id));
    return cart.map((cart) => new CartSerializer(cart));
  }
}
