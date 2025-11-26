import { v4 as uuid } from 'uuid';
import { User } from '../modules/users/user.entity';
import { Product } from '../modules/products/product.entity';

const now = new Date();

const users: User[] = [
  {
    id: uuid(),
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$1DLuE6BoRuJqfkNPIWvM0e0jmD6mQx2DE63kFeyb3ITJ3l8GBQcbC', // Password: Admin@123
    role: 'admin',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: uuid(),
    name: 'Regular User',
    email: 'user@example.com',
    password: '$2a$10$1DLuE6BoRuJqfkNPIWvM0e0jmD6mQx2DE63kFeyb3ITJ3l8GBQcbC', // Password: Admin@123
    role: 'user',
    createdAt: now,
    updatedAt: now,
  },
];

const products: Product[] = [
  {
    id: uuid(),
    name: 'Laptop',
    description: '15 inch laptop',
    price: 1500,
    stock: 10,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: uuid(),
    name: 'Mouse',
    description: 'Wireless mouse',
    price: 25,
    stock: 100,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
];

export const mockDatabase = {
  users,
  products,
};
