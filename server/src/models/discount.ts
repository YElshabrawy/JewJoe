import performSQL from '../utils/performSQL';

export type Discount = {
    id?: number;
    name: string;
    description: string;
    percentage: number;
    active: boolean;
};

export class DiscountModel {
    // Get
    async getAllDiscounts() {
        const sql = 'SELECT * from "product_discount" ORDER BY id ASC;';
        return performSQL(sql);
    }
    async getDiscount(id: number) {
        const sql = `SELECT * from "product_discount" WHERE id=${id} ORDER BY id ASC;`;
        return performSQL(sql, undefined, true);
    }

    // Create
    async createDiscount(u: Discount) {
        const sql = `INSERT INTO "product_discount"(name,description,percentage,active) 
        VALUES ($1,$2,$3,$4)
        RETURNING *;`;
        return performSQL(
            sql,
            [u.name, u.description, u.percentage, u.active],
            true
        );
    }

    // Modify
    async modifyDiscount(u: Discount) {
        const sql =
            'UPDATE "product_discount" SET name=$1, description=$2, percentage=$3, active=$4 WHERE id = $5 RETURNING *';
        return performSQL(
            sql,
            [u.name, u.description, u.percentage, u.active, u.id],
            true
        );
    }
    async applyProductDiscount(discountID: number, productID: number) {
        const sql = `UPDATE "product" SET discount_id = ${discountID} WHERE id = ${productID} RETURNING *`;
        return performSQL(sql, undefined, true);
    }
    async removeProductDiscount(productID: number) {
        const sql = `UPDATE "product" SET discount_id = NULL WHERE id = ${productID} RETURNING *`;
        return performSQL(sql, undefined, true);
    }

    // Delete
    async deleteDiscount(id: number) {
        const sql = `DELETE FROM "product_discount" WHERE id=${id} RETURNING *;`;
        return performSQL(sql, undefined, true);
    }
}
