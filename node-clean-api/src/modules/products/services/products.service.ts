import { IProductsRepository } from '../repositories/products.repository';
import { CreateProductInput, UpdateProductInput } from '../dtos/productSchemas';
import { Product } from '../product.entity';

export class ProductsService {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async list(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async create(data: CreateProductInput): Promise<Product> {
    return this.productsRepository.create(data);
  }

  async update(id: string, data: UpdateProductInput): Promise<Product> {
    const updated = await this.productsRepository.update(id, data);
    if (!updated) {
      throw new Error('Product not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.productsRepository.delete(id);
    if (!deleted) {
      throw new Error('Product not found');
    }
  }
}
