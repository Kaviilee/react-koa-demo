import jwt from "jsonwebtoken";

export const token2User = (token: string, key: string): string | any => {
    if (token) {
        token = token.slice(7);
        return jwt.verify(token, key);
    }
    return "";
};