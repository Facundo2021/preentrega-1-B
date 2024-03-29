import { Router } from "express";
import { productManager } from "../index.js";
const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;

        const products = await productManager.getProduct();

        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit));
            return res.json(limitedProducts);
        }
        return res.json(products);
    } catch (error) {
        console.log(error);
        res.send('ERROR AL INTENTAR RECIBIR LOS PRODUCTOS');
    }
});

productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const products = await productManager.getProductById(pid);
        res.json(products);
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR RECIBIR EL PRODUCTO por ID ${pid}`);
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;

        const response = await productManager.addProducts(title, description, price, thumbnail, code, stock, status, category);

        res.json(response);
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR AGREGAR UN PRODUCTO`);
    }
});

productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;

        const response = await productManager.updateProduct(pid, { title, description, price, thumbnail, code, stock, status, category });

        res.json(response);
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR EDITAR UN PRODUCTO CON ID ${pid}`);
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await productManager.deleteProduct(pid);
        res.send('PRODUCTO ELIMINADO EXITOSAMENTE');
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR ELIMINAR UN PRODUCTO CON ID ${pid}`);
    }
});

export { productsRouter };
