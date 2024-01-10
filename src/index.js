import express from "express";
import { ProductManager } from "./productManager.js";
import { productsRouter } from "./routes/products.router.js";
import { CartManager } from "./cartManager.js";
import { cartsRouter } from "./routes/cart.router.js";
const app = express();

const PORT = 8080;

export const productManager = new ProductManager;
export const cartManager = new CartManager;
app.use(express.json())

app.use ('/api/products', productsRouter)
app.use ('/api/carts',cartsRouter)
app.listen (PORT, (res,req) => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})