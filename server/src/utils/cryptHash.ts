import bcrypt from 'bcrypt';

const pepper: string = String(process.env.BCRYPT_PW);
const saltRounds = parseInt(String(process.env.BCRYPT_ROUNDS));

export function cryptHash(password: string): string {
    return bcrypt.hashSync(password + pepper, saltRounds);
}

export function cryptCompare(
    password: string,
    hashedPassword: string
): boolean {
    return bcrypt.compareSync(password + pepper, hashedPassword);
}
