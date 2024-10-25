import jwt from "jsonwebtoken";

export const createAccessToken = (user, expiresIn) => {
    const secret = process.env.JWT_SECRET;

    return jwt.sign (
        {
            id: user.id,
            email: user.email,
            profile: user.profile
        },
        secret, 
        { expiresIn: expiresIn || '2h' }
    );
};