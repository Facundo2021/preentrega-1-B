import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {
    
    constructor() {
        this.path = './src/routes/products.json';
        this.products = [];
    }

    addProducts = async ({ title, description, price, thumbnail, code, stock, status, category }) => {

        const id = uuidv4();

        let newProduct = { id, title, description, price, thumbnail, code, stock, status, category };

        this.products = await this.getProduct();

        this.products.push(newProduct);

        await fs.writeFile(this.path, JSON.stringify(this.products,null,2));

        return newProduct;
    }

    getProduct = async () => {
        const response = await fs.readFile(this.path, 'utf8');
        const responseJSON = JSON.parse(response);
        return responseJSON;
    }

    getProductById = async (id) => {
        const response = await this.getProduct();
        const product = response.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.log("Producto no encontrado");
        }
    }

    updateProduct = async (id, { ...data }) => {
        const products = await this.getProduct();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { id, ...data };
            await fs.writeFile(this.path, JSON.stringify(this.products,null,2));
            return products[index];
        } else {
            console.log("Producto no encontrado");
        }
    }

    deleteProduct = async (id) => {
        const products = await this.getProduct();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(this.products,null,2));
            return;
        } else {
            console.log("Producto no encontrado");
        }
    }
}
