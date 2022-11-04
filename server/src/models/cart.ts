import performSQL from '../utils/performSQL';

export type CartItem = {
    id?: number;
    cart_id: number;
    product_id: number;
    quantity: number;
};

export type Cart = {
    id?: number;
    user_id: number;
};

export class CartModel {
    // Get
    async getAllCarts() {
        const sql = 'SELECT * from "cart" ORDER BY id ASC;';
        return performSQL(sql);
    }
    async getCart(id: number) {
        const sql = `SELECT * from "cart" WHERE id=${id} ORDER BY id ASC;`;
        return performSQL(sql, undefined, true);
    }
    async getCartItems(cartID: number) {
        const sql = `SELECT * from "cart_item" WHERE cart_id=${cartID} ORDER BY id ASC;`;
        return performSQL(sql);
    }
    async getUserCarts(userID: number) {
        const sql = `SELECT * from "cart" WHERE user_id=${userID} ORDER BY id ASC;`;
        return performSQL(sql);
    }

    // Create
    async createCart(u: Cart) {
        const sql = `INSERT INTO "cart"(user_id) 
        VALUES ($1)
        RETURNING *;`;
        return performSQL(sql, [u.user_id], true);
    }
    async createCartItem(u: CartItem) {
        const sql = `INSERT INTO "cart_item"(cart_id, product_id, quantity) 
        VALUES ($1, $2, $3)
        RETURNING *;`;
        return performSQL(sql, [u.cart_id, u.product_id, u.quantity], true);
    }

    // Modify
    async modifyCartItemQuantity(id: number, quantity: number) {
        const sql =
            'UPDATE "cart_item" SET quantity=$2 WHERE id = $1 RETURNING *';
        return performSQL(sql, [id, quantity], true);
    }

    // Delete
    async deleteCart(id: number) {
        const sql = `DELETE FROM "cart" WHERE id=${id} RETURNING *;`;
        return performSQL(sql, undefined, true);
    }
    async deleteCartItem(id: number) {
        const sql = `DELETE FROM "cart_item" WHERE id=${id} RETURNING *;`;
        return performSQL(sql, undefined, true);
    }
}
