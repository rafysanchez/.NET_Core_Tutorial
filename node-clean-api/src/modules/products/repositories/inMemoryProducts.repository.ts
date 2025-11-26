import { v4 as uuid } from 'uuid';
import { mockDatabase } from '../../../database/mockDatabase';
import { Product } from '../product.entity';
import { IProductsRepository } from './products.repository';

export class InMemoryProductsRepository implements IProductsRepository {
  private products: Product[];

  constructor() {
    this.products = mockDatabase.products;
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: string): Promise<Product | undefined> {
    return this.products.find((product) => product.id === id);
  }

  async create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const now = new Date();
    const newProduct: Product = { ...data, id: uuid(), createdAt: now, updatedAt: now };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(
    id: string,
    data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Product | undefined> {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) return undefined;

    const current = this.products[index];
    const updated: Product = { ...current, ...data, updatedAt: new Date() };
    this.products[index] = updated;
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.products.length;
    this.products = this.products.filter((product) => product.id !== id);
    const deleted = this.products.length < initialLength;
    if (deleted) {
      mockDatabase.products.splice(0, mockDatabase.products.length, ...this.products);
    }
    return deleted;
  }
}
