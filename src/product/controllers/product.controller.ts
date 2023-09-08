import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/utils/httpResponse';
import { ProductService } from '../services/product.service';

export class ProductController {
  constructor(
    private readonly productService: ProductService = new ProductService()
  ) {}

  getAll = async (req: Request, res: Response) => {
    const { page, records } = req.query;
    try {
      const { products, pageTotal } = await this.productService.getPagination(
        Number(page ?? 0),
        Number(records ?? 5)
      );
      if (!products.length && pageTotal === 0)
        return HttpResponse.notAceptable(
          res,
          'No hay productos',
          'No se cargaron productos aún'
        );
      if (!products.length)
        return HttpResponse.notAceptable(
          res,
          'No hay productos',
          'No se han encontrado para la página seleccionada'
        );
      HttpResponse.ok(res, { products, pageTotal });
    } catch (err) {
      console.log(err);
      HttpResponse.internalError(res);
    }
  };

  findByIds = async (req: Request, res: Response) => {
    const { ids } = req.body.product;
    try {
      const products = await this.productService.findByIds(ids);
      if (!products.length)
        return HttpResponse.notAceptable(
          res,
          'No hay productos',
          'Aún no ha agregado productos a favoritos'
        );
      HttpResponse.ok(res, { products });
    } catch {
      HttpResponse.internalError(res);
    }
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const product = await this.productService.findById(String(id));
      HttpResponse.ok(res, { product });
    } catch {
      HttpResponse.internalError(res);
    }
  };
}
