import { QueryResult } from 'pg';
import client from '../database';

export type User = {
    id?: number;
    username: string;
    password: string;
    firstname: string;
    email: string;
    lastname: string;
    phone: string;
    is_admin: boolean;
};

export type UserAddress = {
    id?: number;
    user_id: number;
    adress_line1: string;
    adress_line2: string;
    city: string;
    postal_code: string;
    country: string;
};

export type UserPayment = {
    id?: number;
    user_id: number;
    payment_type: number;
    provider: string;
    account_number: string;
    expiry_date: string;
};

export class UserModel {
    // Get
    async getAllUsers() {
        const sql = 'SELECT * from "user" ORDER BY id ASC;';
        return performSQL(sql);
    }
    async getUser(id: number) {}
    async getUserPayment(id: number) {}
    async getUserAddress(id: number) {}

    // Create
    async createUser(u: User) {
        const sql = `INSERT INTO "user"(username,email,password,firstname,lastname,phone,is_admin) 
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *;`;
        return performSQL(sql, [
            u.username,
            u.email,
            u.password,
            u.firstname,
            u.lastname,
            u.phone,
            u.is_admin,
        ]);
    }
    async createUserPayment(u: UserPayment) {}
    async createUserAddress(u: UserAddress) {}

    // Modify
    async modifyUser(u: User) {}
    async modifyUserPayment(u: UserPayment) {}
    async modifyUserAddress(u: UserAddress) {}

    // Delete
    async deleteUser(id: number) {}
    async deleteUserPayment(id: number) {}
    async deleteUserAddress(id: number) {}
}

const performSQL = async (sql: string, payload?: Array<any>) => {
    try {
        const conn = await client.connect();
        const result = !payload
            ? await conn.query(sql)
            : await conn.query(sql, payload);
        conn.release();
        console.log(result.rows);
        return result.rows;
    } catch (err) {
        throw new Error(`[Database] Error: ${err}`);
    }
};
