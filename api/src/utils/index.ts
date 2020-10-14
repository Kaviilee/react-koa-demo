import jwt from "jsonwebtoken";
export const token2User = (token: string, key: string) => {
    if (token) {
        token = token.slice(7);
        return jwt.verify(token, key);
    }
    return "";
};