import { getRandomInt } from "../utils/common";
import { db } from "./config";

const getOrders = () => {

    if (localStorage.getItem('orders')) {
        return JSON.parse(localStorage.getItem('orders'))
    }
    localStorage.setItem('orders', JSON.stringify(db.orders));
    return db.orders
}

const orderApi = {
    getAll(query) {
        let orders = getOrders()
        let customers = db.customers;
        const { page, lastname, per_page } = query;

        let orderFormat = orders.map((order => {
            return {
                id: order.id,
                reference: order.reference,
                quantity: order.products.length,
                amount: order.amount,
                customer: customers.find(c => Number(c.id) === Number(order.customerId)).lastname,
                orderDate: order.orderDate,
                shippedDate: order.shippedDate,

            }
        }))

        if (lastname !== "") {
            orderFormat = orderFormat.filter(c => c.customer.toLowerCase().includes(lastname.toLowerCase()))
        }

        const skip = (page - 1) * per_page
        return {
            data: orderFormat.slice(skip, skip + per_page),
            pagination: {
                currentPage: page,
                perPage: per_page,
                totalRow: orderFormat.length
            }
        }
    },
    getOne(id) {
        let orders = getOrders()
        let customers = db.customers;
        let categories = db.categories;
        let products = db.products;
        let orderOne = []
        if (id) {
            orderOne = orders.find(c => Number(c.id) === Number(id))
        }
        return {
            order: orderOne,
            categories,
            products,
            customers,
        }
    },
    create(data) {
        let orders = getOrders()
        const id = getRandomInt(1000);
        orders.unshift({
            id,
            reference: data?.reference,
            customerId: Number(data?.customer),
            products: data?.products,
            amount: Number(data?.amount),
            orderDate: data?.orderDate,
            shippedDate: data?.shippedDate,
            shipAddress: {
                address: data?.address,
                city: data?.city,
                zipcode: data?.zipcode,
                country: data?.country,
            },
        })
        localStorage.setItem('orders', JSON.stringify(orders));
    },
    update(data) {
        let orders = getOrders();
        orders = orders.map(order => {
            if (Number(order.id) === Number(data.id)) {
                return {
                    id: Number(data?.id),
                    reference: data?.reference,
                    customerId: Number(data?.customerId),
                    products: data?.products,
                    amount: Number(data?.amount),
                    orderDate: data?.orderDate,
                    shippedDate: data?.shippedDate,
                    shipAddress: {
                        address: data?.address,
                        city: data?.city,
                        zipcode: data?.zipcode,
                        country: data?.country,
                    },
                }
            }
            return order
        })
        localStorage.setItem('orders', JSON.stringify(orders));
    },
    remove(id) {
        let orders = getOrders();
        orders = orders.filter(c => Number(c.id) !== Number(id))
        localStorage.setItem('orders', JSON.stringify(orders));
        return id
    }
}

export default orderApi;