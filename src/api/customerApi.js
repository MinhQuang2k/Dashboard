import { db } from "./config"
import { getRandomInt } from "../utils/common"

const getCustomers = () => {

    if (localStorage.getItem('customers')) {
        return JSON.parse(localStorage.getItem('customers'))
    }
    localStorage.setItem('customers', JSON.stringify(db.customers));
    return db.customers
}

const customerApi = {
    getAll(query) {
        let customers = getCustomers()
        const { page, lastname, firstname, per_page } = query;

        if (lastname && firstname) {
            customers = customers.filter(c => c.firstname.toLowerCase().includes(firstname.toLowerCase()) || c.lastname.toLowerCase().includes(lastname.toLowerCase()))
        }
        else if (lastname || firstname) {
            customers = customers.filter(c => c.firstname.toLowerCase().includes(firstname.toLowerCase()) && c.lastname.toLowerCase().includes(lastname.toLowerCase()))
        }

        const skip = (page - 1) * per_page
        return {
            data: customers.slice(skip, skip + per_page),
            pagination: {
                currentPage: page,
                perPage: per_page,
                totalRow: customers.length
            }
        }
    },
    getOne(id) {
        let customers = getCustomers()
        return customers.find(c => Number(c.id) === Number(id))
    },
    create(data) {
        let customers = getCustomers()
        const id = getRandomInt(1000);
        customers.unshift({ id, ...data })
        localStorage.setItem('customers', JSON.stringify(customers));
    },
    update(data) {
        let customers = getCustomers();
        customers = customers.map(c => {
            if (Number(c.id) === (data.id)) {
                return data
            }
            return c
        })
        localStorage.setItem('customers', JSON.stringify(customers));
    },
    remove(id) {
        let customers = getCustomers();
        customers = customers.filter(c => Number(c.id) !== Number(id))
        localStorage.setItem('customers', JSON.stringify(customers));
        return id
    }
}

export default customerApi;