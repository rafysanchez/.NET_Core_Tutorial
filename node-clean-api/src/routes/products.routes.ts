import { Router } from 'express';
import { ProductsController } from '../modules/products/controllers/products.controller';
import { ProductsService } from '../modules/products/services/products.service';
import { InMemoryProductsRepository } from '../modules/products/repositories/inMemoryProducts.repository';
import { ensureAuthenticated, authorizeRoles } from '../middlewares/authMiddleware';

const productsRouter = Router();
const productsRepository = new InMemoryProductsRepository();
const productsService = new ProductsService(productsRepository);
const productsController = new ProductsController(productsService);

productsRouter.use(ensureAuthenticated);

/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: List all products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productsRouter.get('/', productsController.list);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
productsRouter.get('/:id', productsController.getById);

/**
 * @openapi
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *           example:
 *             name: Keyboard
 *             description: Mechanical keyboard
 *             price: 120
 *             stock: 20
 *             active: true
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productsRouter.post('/', productsController.create);

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productsRouter.put('/:id', productsController.update);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted
 *       403:
 *         description: Forbidden
 */
productsRouter.delete('/:id', authorizeRoles(['admin']), productsController.delete);

export { productsRouter };
