import performSQL from '../utils/performSQL';

export type PaymentType = {
    id?: number;
    type: string;
};

export class EnumModel {
    async createPaymentType(u: PaymentType) {
        const sql = `INSERT INTO "payment_type" (type)VALUES ($1) RETURNING *;`;
        return performSQL(sql, [u.type], true);
    }
}
