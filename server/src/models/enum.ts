import performSQL from '../utils/performSQL';

export type PaymentType = {
    id?: number;
    type: string;
};

export type ProductCategory = {
    id?: number;
    name: string;
};

export type OrderStatus = {
    id?: number;
    status: string;
};

export class EnumModel {
    // PaymentType
    async getAllPaymentTypes() {
        const sql = `SELECT * FROM "payment_type" ORDER BY id ASC;`;
        return performSQL(sql);
    }
    async createPaymentType(u: PaymentType) {
        const sql = `INSERT INTO "payment_type" (type) VALUES ($1) RETURNING *;`;
        return performSQL(sql, [u.type], true);
    }
    async updatePaymentType(u: PaymentType) {
        const sql = `UPDATE "payment_type" SET type=$1 WHERE id=$2 RETURNING *;`;
        return performSQL(sql, [u.type, u.id], true);
    }
    async deletePaymentType(id: number) {
        const sql = `DELETE FROM "payment_type" WHERE id=${id} RETURNING *;`;
        return performSQL(sql, undefined, true);
    }

    // Category
    async getAllCategories() {
        const sql = `SELECT * FROM "product_category" ORDER BY id ASC;`;
        return performSQL(sql);
    }
    async createProductCategory(u: ProductCategory) {
        const sql = `INSERT INTO "product_category" (name) VALUES ($1) RETURNING *;`;
        return performSQL(sql, [u.name], true);
    }
    async updateProductCategory(u: ProductCategory) {
        const sql = `UPDATE "product_category" SET name=$1 WHERE id=$2 RETURNING *;`;
        return performSQL(sql, [u.name, u.id], true);
    }
    async deleteProductCategory(id: number) {
        const sql = `DELETE FROM "product_category" WHERE id=${id} RETURNING *;`;
        return performSQL(sql, undefined, true);
    }

    // OrderStatus
    async getAllOrderStats() {
        const sql = `SELECT * FROM "order_status" ORDER BY id ASC;`;
        return performSQL(sql);
    }
    async getOrderStat(id: number) {
        const sql = `SELECT * FROM "order_status" WHERE id=${id} ORDER BY id ASC;`;
        return performSQL(sql, undefined, true);
    }
    async createOrderStat(u: OrderStatus) {
        const sql = `INSERT INTO "order_status" (status) VALUES ($1) RETURNING *;`;
        return performSQL(sql, [u.status], true);
    }
    async updateOrderStat(u: OrderStatus) {
        const sql = `UPDATE "order_status" SET status=$1 WHERE id=$2 RETURNING *;`;
        return performSQL(sql, [u.status, u.id], true);
    }
    async deleteOrderStat(id: number) {
        const sql = `DELETE FROM "order_status" WHERE id=${id} RETURNING *;`;
        return performSQL(sql, undefined, true);
    }
}
