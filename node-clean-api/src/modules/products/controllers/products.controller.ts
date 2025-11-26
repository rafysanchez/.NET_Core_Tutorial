import { Request, Response } from 'express';
import { ProductsService } from '../services/products.service';
import { createProductSchema, updateProductSchema } from '../dtos/productSchemas';

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  list = async (_req: Request, res: Response) => {
    const products = await this.productsService.list();
    return res.json(products);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await this.productsService.getById(id);
    return res.json(product);
  };

  create = async (req: Request, res: Response) => {
    const parsed = createProductSchema.parse(req.body);
    const product = await this.productsService.create(parsed);
    return res.status(201).json(product);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsed = updateProductSchema.parse(req.body);
    const product = await this.productsService.update(id, parsed);
    return res.json(product);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.productsService.delete(id);
    return res.status(204).send();
  };
}
