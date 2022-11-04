import performSQL from '../utils/performSQL';

// Types
export type Product = {
    id?: number;
    name: string;
    description: string;
    price: number;
    images: string;

    quantity?: number;
    category?: string;
    discount_name?: string;
};

//Model
export class ProductModel {
    // Get
    async getAllProducts() {
        const sql = 'SELECT * from "product" ORDER BY id ASC;';
        return performSQL(sql);
    }
    async getProduct(id: number) {
        const sql = `SELECT * from "product" WHERE id=${id} ORDER BY id ASC;`;
        return performSQL(sql, undefined, true);
    }

    // Create
    async createProduct(u: Product) {
        let inventory_id = null;
        let category_id = null;
        let discount_id = null;

        // First we store in inverntory
        if (u.quantity) {
            const sql =
                'INSERT INTO "product_inventory" (quantity) VALUES ($1) RETURNING *;';
            const result = await performSQL(sql, [u.quantity], true);
            inventory_id = result?.id;
        }

        // Then we check the category
        if (u.category) {
            // Find the category first
            const sql1 = 'SELECT * from "product_category" WHERE name=$1';
            const result = await performSQL(sql1, [u.category], true);
            if (result) {
                // The category already exists
                category_id = result?.id;
            } else {
                // Create the category first
                const sql2 =
                    'INSERT INTO "product_category" (name) VALUES ($1) RETURNING *;';
                const result2 = await performSQL(sql2, [u.category], true);
                category_id = result2?.id;
            }
        }

        // Then we check the if it will be created with existing discount
        if (u.discount_name) {
            const sql1 = 'SELECT * from "product_discount" WHERE name=$1';
            const result = await performSQL(sql1, [u.category], true);
            if (result) discount_id = result?.id;
        }

        const sql = `INSERT INTO "product"(name,description,price,images,inventory_id,category_id,discount_id) 
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *;`;
        return performSQL(
            sql,
            [
                u.name,
                u.description,
                u.price,
                u.images,
                inventory_id,
                category_id,
                discount_id,
            ],
            true
        );
    }

    // Modify
    async modifyProduct(
        u: Product,
        inventory_id: number,
        category_id: number,
        discount_id: number
    ) {
        if (u?.quantity) {
            const sql =
                'UPDATE "product_inventory" SET quantity = $1 WHERE id = $2';
            await performSQL(sql, [u.quantity, inventory_id], true);
        }
        const sql =
            'UPDATE "product" SET name = $2, description = $3, price = $4, images = $5, category_id = $6, discount_id = $7 WHERE id = $1 RETURNING *';
        return performSQL(
            sql,
            [
                u.id,
                u.name,
                u.description,
                u.price,
                u.images,
                category_id,
                discount_id,
            ],
            true
        );
    }

    // Delete
    async deleteProduct(id: number) {
        // delete the inventory
        const p = await this.getProduct(id);
        if (p) {
            const sql1 = `DELETE FROM "product_inventory" WHERE id = ${p?.inventory_id}`;
            await performSQL(sql1);
            // delete the product
            const sql2 = `DELETE FROM "product" WHERE id=${id} RETURNING *;`;
            return performSQL(sql2, undefined, true);
        } else {
            return undefined;
        }
    }
}
