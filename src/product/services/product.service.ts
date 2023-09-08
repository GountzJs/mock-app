import { Database } from '../../shared/database.service';
import { pagination } from '../../shared/utils/pagination';
import { IProduct } from '../models/interfaces/product.interface';

export class ProductService {
  constructor(private readonly database: Database = new Database()) {}

  private async getAll() {
    const products = await this.database.get('products');
    return products as { products: IProduct[] };
  }

  async getPagination(
    page: number,
    records: number
  ): Promise<{ products: IProduct[]; pageTotal: number }> {
    const { products } = await this.getAll();
    const elements = pagination(products, page, records);
    return {
      products: elements,
      pageTotal: Math.ceil(products.length / records),
    };
  }

  async findById(id: string): Promise<IProduct> {
    const { products } = await this.getAll();
    return products.find((product) => product.id === id);
  }

  async findByIds(ids: string[]): Promise<IProduct[]> {
    const { products } = await this.getAll();
    return products.filter((product) => ids.includes(product.id));
  }
}
