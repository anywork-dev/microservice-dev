import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const SESSION_SECRET = process.env.SESSION_SECRET; // Replace with your actual secret key
const MAX_DATE = 1000 * 60 * 60 * 24 * 7; // Seven days max date
const SALT_ROUNDS = 10;

class Cryptonite {
    // Session format "secretkey|{user_id, date}"
    // Decrypt the token and compare the session date with the current date by MAX_DATE
    static verify(token) {
        try {
            const decoded = jwt.verify(token, SESSION_SECRET);
            const { userId, date } = decoded;

            // Check if the session date is within the MAX_DATE limit
            if (Date.now() - date > MAX_DATE) {
                return { valid: false, message: 'Session expired' };
            }

            return { valid: true, userId };
        } catch (error) {
            return { valid: false, message: 'Invalid token' };
        }
    }

    // Generate encrypted token session based on the format
    static token(payload) {
        const date = Date.now();
        const token = jwt.sign({ ...payload, date }, SESSION_SECRET, { expiresIn: MAX_DATE / 1000 });
        return token;
    }

    // Use to compare password hash
    static async compare(password, hash) {
        const match = await bcrypt.compare(password, hash)
        return match;
    }

    static async hashPassword(password) {
        try {
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        } catch (error) {
            throw new Error('Error hashing password');
        }
    }
}

export default Cryptonite;
