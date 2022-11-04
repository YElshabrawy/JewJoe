import { Response } from 'express';

import client from '../database';

const performSQL = async (
    sql: string,
    payload?: Array<any>,
    isOneVal?: boolean
) => {
    if (!isOneVal) isOneVal = false;
    try {
        const conn = await client.connect();
        const result = !payload
            ? await conn.query(sql)
            : await conn.query(sql, payload);
        conn.release();
        if (!isOneVal) return result.rows;
        else return result.rows[0];
    } catch (err) {
        throw new Error(`[Database] Error: ${err}`);
    }
};

// export function checkResult(res: Response, result: any, message: string) {
//     if (!result || result?.length === 0) {
//         return res.status(404).json({ message });
//     }
// }

export default performSQL;
