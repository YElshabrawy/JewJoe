import performSQL from '../utils/performSQL';

export type Review = {
    id?: number;
    user_id: number;
    product_id: number;
    rating: number;
    comment: string;
};

export class ReviewModel {
    // Get
    async getAllReviews() {
        const sql = `SELECT * from "review" ORDER BY id ASC;`;
        return performSQL(sql);
    }
    async getReview(id: number) {
        const sql = `SELECT * from "review" WHERE id=${id} ORDER BY id ASC;`;
        return performSQL(sql, undefined, true);
    }
    async getAllUserReviews(uid: number) {
        const sql = `SELECT * from "review" WHERE user_id=${uid} ORDER BY id ASC;`;
        return performSQL(sql);
    }
    async getAllProductReviews(pid: number) {
        const sql = `SELECT * from "review" WHERE product_id=${pid} ORDER BY id ASC;`;
        return performSQL(sql);
    }

    // Create
    async createReview(u: Review) {
        const sql = `INSERT INTO "review"(user_id,product_id,rating,comment) 
        VALUES ($1,$2,$3,$4)
        RETURNING *;`;
        return performSQL(
            sql,
            [u.user_id, u.product_id, u.rating, u.comment],
            true
        );
    }

    // Modify
    async modifyReview(u: Review) {
        const sql =
            'UPDATE "review" SET user_id=$1, product_id=$2, rating=$3, comment=$4 WHERE id = $5 RETURNING *';
        return performSQL(
            sql,
            [u.user_id, u.product_id, u.rating, u.comment, u.id],
            true
        );
    }

    // Delete
    async deleteReview(id: number) {
        const sql = `DELETE FROM "review" WHERE id=${id} RETURNING *;`;
        return performSQL(sql, undefined, true);
    }
}
