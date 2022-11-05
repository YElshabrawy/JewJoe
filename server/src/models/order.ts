import performSQL from '../utils/performSQL';

export type ShopOrder = {
    id?: number;
    user_id: number;
    payment_id: number;
    shipping_address_id: number;
    order_date: string;
    total: number;
    order_status: number;
};

export type OrderLine = {
    id?: number;
    order_id: number;
    product_item_id: number;
    quantity: number;
    price: number;
};

export class OrderModel {
    // Get
    async getAllShopOrders() {
        const sql = 'SELECT * from "shop_order" ORDER BY id ASC;';
        return performSQL(sql);
    }
    async getShopOrder(id: number) {
        const sql = `SELECT * from "shop_order" WHERE id=${id} ORDER BY id ASC;`;
        return performSQL(sql, undefined, true);
    }
    async getAllOrderLines(orderID: number) {
        const sql = `SELECT * from "order_line" WHERE order_id=${orderID} ORDER BY id ASC;`;
        return performSQL(sql);
    }
    async getOrderLine(id: number) {
        const sql = `SELECT * from "order_line" WHERE id=${id} ORDER BY id ASC;`;
        return performSQL(sql, undefined, true);
    }

    // Create
    async createShopOrder(u: ShopOrder) {
        const sql = `INSERT INTO "shop_order"(user_id,order_date,payment_id,shipping_address_id,total,order_status) 
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *;`;
        return performSQL(
            sql,
            [
                u.user_id,
                u.order_date,
                u.payment_id,
                u.shipping_address_id,
                u.total,
                u.order_status,
            ],
            true
        );
    }
    async createOrderLine(u: OrderLine) {
        const sql = `INSERT INTO "order_line"(order_id,product_item_id,quantity,price) 
        VALUES ($1,$2,$3,$4)
        RETURNING *;`;
        return performSQL(
            sql,
            [u.order_id, u.product_item_id, u.quantity, u.price],
            true
        );
    }

    // Modify
    async modifyShopOrder(u: ShopOrder) {
        const sql =
            'UPDATE "shop_order" SET user_id=$1, order_date=$2, payment_id=$3, shipping_address_id=$4, total=$5, order_status=$6 WHERE id = $7 RETURNING *';
        return performSQL(
            sql,
            [
                u.user_id,
                u.order_date,
                u.payment_id,
                u.shipping_address_id,
                u.total,
                u.order_status,
                u.id,
            ],
            true
        );
    }
    async modifyOrderLine(u: OrderLine) {
        const sql =
            'UPDATE "order_line" SET order_id=$1, product_item_id=$2, quantity=$3, price=$4 WHERE id = $5 RETURNING *';
        return performSQL(
            sql,
            [u.order_id, u.product_item_id, u.quantity, u.price, u.id],
            true
        );
    }

    // Delete
    async deleteShopOrder(id: number) {
        const sql = `DELETE FROM "shop_order" WHERE id=${id} RETURNING *;`;
        return performSQL(sql, undefined, true);
    }
    async deleteOrderLine(id: number) {
        const sql = `DELETE FROM "order_line" WHERE id=${id} RETURNING *;`;
        return performSQL(sql, undefined, true);
    }
}
