import { Database } from '../../shared/database.service';
import { IProduct } from '../models/interfaces/product.interface';

export class FavoritesService {
  constructor(private readonly database: Database = new Database()) {}

  private async getAll() {
    const favorites = await this.database.get('favorites');
    return favorites as { products: IProduct[] };
  }
}
