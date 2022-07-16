import { db } from "./config"
import { getRandomInt } from "../utils/common"

const getProducts = () => {

    if (localStorage.getItem('products')) {
        return JSON.parse(localStorage.getItem('products'))
    }
    localStorage.setItem('products', JSON.stringify(db.products));
    return db.products
}

const productApi = {
    getAll(query) {
        let products = getProducts()
        const categories = db.categories
        const { page, per_page, product } = query;

        if (product) {
            products = products.filter(c => c.name.toLowerCase().includes(product.toLowerCase()))
        }

        const skip = (page - 1) * per_page
        return {
            data: products.slice(skip, skip + per_page).map(product => {
                return {
                    ...product,
                    category: categories.find(category => category.id == product.categoryId).name
                }
            }),
            pagination: {
                currentPage: page,
                perPage: per_page,
                totalRow: products.length
            }
        }
    },
    getOne(id) {
        let products = getProducts()
        let categories = db.categories
        let oneProduct = []
        if (id) oneProduct = products.find(c => c.id == id)
        return {
            product: oneProduct,
            categories
        }
    },
    create(data) {
        let products = getProducts()
        const id = getRandomInt(1000);
        products.unshift({
            id,
            name: data?.name,
            categoryId: Number(data?.category),
            numInStock: data?.numInStock,
            unitPrice: data?.unitPrice,
        })
        localStorage.setItem('products', JSON.stringify(products));
    },
    update(data) {
        let products = getProducts();
        products = products.map(c => {
            if (c.id == data.id) {
                return {
                    id: data?.id,
                    name: data?.name,
                    categoryId: Number(data?.category) || Number(data?.categoryId),
                    numInStock: data?.numInStock,
                    unitPrice: data?.unitPrice,
                }
            }
            return c
        })
        localStorage.setItem('products', JSON.stringify(products));
    },
    remove(id) {
        let products = getProducts();
        products = products.filter(c => c.id != id)
        localStorage.setItem('products', JSON.stringify(products));
        return id
    }
}

export default productApi;