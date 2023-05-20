import crypto from "node:crypto";

const SECRET = "devsapi";
// const SECRETHASH= "$2y$12$vjh8QSKWi2PPQGMw538OyOXN1tVcKz5qHHWVLeeQPhNkrZjrgDsly";

export const randomHash = () => crypto.randomBytes(128).toString('base64');

export const authenticationSignature = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}  