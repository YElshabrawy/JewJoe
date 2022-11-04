import performSQL from '../utils/performSQL';
import { cryptHash } from '../utils/cryptHash';

// Types
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

// Model
export class UserModel {
    // Get
    async getAllUsers() {
        const sql = 'SELECT * from "user" ORDER BY id ASC;';
        return performSQL(sql);
    }
    async getUser(id: number) {
        const sql = `SELECT * from "user" WHERE id=${id} ORDER BY id ASC;`;
        return performSQL(sql, undefined, true);
    }

    async getUserPayments(id: number) {
        const sql = `SELECT * from "user_payment" WHERE user_id = ${id} ORDER BY id ASC;`;
        return performSQL(sql);
    }
    async getPayment(id: number) {
        const sql = `SELECT * from "user_payment" WHERE id = ${id} ORDER BY id ASC`;
        return performSQL(sql, undefined, true);
    }

    async getUserAddresses(id: number) {
        const sql = `SELECT * from "user_address" WHERE user_id = ${id} ORDER BY id ASC`;
        return performSQL(sql);
    }
    async getAddress(id: number) {
        const sql = `SELECT * from "user_address" WHERE id = ${id} ORDER BY id ASC`;
        return performSQL(sql, undefined, true);
    }

    // Create
    async createUser(u: User) {
        const sql = `INSERT INTO "user"(username,email,password,firstname,lastname,phone,is_admin) 
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *;`;
        return performSQL(
            sql,
            [
                u.username,
                u.email,
                cryptHash(u.password),
                u.firstname,
                u.lastname,
                u.phone,
                u.is_admin,
            ],
            true
        );
    }
    async createUserPayment(u: UserPayment) {
        const sql = `INSERT INTO "user_payment"(user_id,payment_type,provider,account_number,expiry_date) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
        return performSQL(
            sql,
            [
                u.user_id,
                u.payment_type,
                u.provider,
                u.account_number,
                u.expiry_date,
            ],
            true
        );
    }
    async createUserAddress(u: UserAddress) {
        const sql =
            'INSERT INTO "user_address"(user_id,adress_line1,adress_line2,city,postal_code,country) VALUES($1,$2,$3,$4,$5,$6) RETURNING *;';
        return performSQL(
            sql,
            [
                u.user_id,
                u.adress_line1,
                u.adress_line2,
                u.city,
                u.postal_code,
                u.country,
            ],
            true
        );
    }

    // Modify
    async modifyUser(u: User) {
        const sql =
            'UPDATE "user" SET username=$1, email=$2, password=$3, firstname=$4, lastname=$5, phone=$6, is_admin=$7 WHERE id = $8 RETURNING *';
        return performSQL(
            sql,
            [
                u.username,
                u.email,
                u.password,
                u.firstname,
                u.lastname,
                u.phone,
                u.is_admin,
                u.id,
            ],
            true
        );
    }
    async modifyUserPayment(u: UserPayment) {
        const sql =
            'UPDATE "user_payment" SET user_id=$1, payment_type=$2, provider=$3, account_number=$4, expiry_date=$5 WHERE id = $6 RETURNING *';
        return performSQL(
            sql,
            [
                u.user_id,
                u.payment_type,
                u.provider,
                u.account_number,
                u.expiry_date,
                u.id,
            ],
            true
        );
    }
    async modifyUserAddress(u: UserAddress) {
        const sql =
            'UPDATE "user_address" SET user_id=$1, adress_line1=$2, adress_line2=$3, city=$4, postal_code=$5, country=$6 WHERE id = $7 RETURNING *';
        return performSQL(
            sql,
            [
                u.user_id,
                u.adress_line1,
                u.adress_line2,
                u.city,
                u.postal_code,
                u.country,
                u.id,
            ],
            true
        );
    }

    // Delete
    async deleteUser(id: number) {
        const sql = `DELETE FROM "user" WHERE id=${id} RETURNING *;`;
        return performSQL(sql, undefined, true);
    }
    async deleteUserPayment(id: number) {
        const sql = `DELETE FROM "user_payment" WHERE id=${id} RETURNING *;`;
        return performSQL(sql, undefined, true);
    }
    async deleteUserAddress(id: number) {
        const sql = `DELETE FROM "user_address" WHERE id=${id} RETURNING *;`;
        return performSQL(sql, undefined, true);
    }
}
