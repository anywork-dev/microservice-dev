import crypton from "cryptonite"
import UserResource from "auth-model"
import EmailClient from "email-client"
import { Response } from "net-tools";

// Event Driven Architecture for direct service calls.
// These method applies when the service discovered in the same service

const CLIENT_ID = 'your-google-client-id';
const CLIENT_SECRET = 'your-google-client-secret';
const REDIRECT_URI = 'http://yourdomain.com/auth/google/callback';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const USERINFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v2/userinfo';



class AuthService {
    static async googleCallback() {
        // Check if it's from google
        // get token
        // get user info (email, username)
        // insert user info to database
    }

    static async google(req) {
        // Implement Google login logic
        // Redirect to 
        return new Response({ ok: true, status: 200, data: { message: "Google login successful" } });
    }

    static async login(data) {
        const { username, password } = data;
        const [user] = await UserResource.find({ username });

        if (user && await crypton.compare(password, user.password)) {
            const token = crypton.token({ userId: user.id });
            return new Response({ ok: true, status: 200, data: { token } });
        } else {
            return new Response({ ok: false, status: 401, error: {reason: "Invalid credentials" } });
        }
    }

    static async session(req) {
        const token = req.headers.authorization.split(' ')[1];
        const verified = crypton.verify(token);

        if (verified) {
            return new Response({ ok: true, status: 200, data: { userId: verified.userId } });
        } else {
            return new Response({ ok: false, status: 401, reason: "Invalid or expired session", error: "Unauthorized" });
        }
    }

    static async officeRegistration(req) {
        const { email, officeId } = req.body;
        const user = await UserResource.upsert({ email, officeId });

        const token = crypton.token({ userId: user.id });
        await this.emailClient.sendInvitation({ email, token });

        return new Response({ ok: true, status: 200, data: { user } });
    }

    static async basicRegistration(req) {
        const { email, password } = req.body;
        const hashedPassword = await crypton.hashPassword(password);
        const user = await UserResource.upsert({ email, password: hashedPassword });

        return new Response({ ok: true, status: 200, data: { user } });
    }

    static async basicRecovery(req) {
        const { email } = req.body;
        const user = await UserResource.find({ email });

        if (user) {
            const token = crypton.token({ userId: user.id });
            await this.emailClient.sendRecovery({ email, token });
            return new Response({ ok: true, status: 200, data: { message: "Recovery email sent" } });
        } else {
            return new Response({ ok: false, status: 404, error: "User not found" });
        }
    }

    static async officeRecovery(req) {
        const { email, officeId } = req.body;
        const user = await UserResource.find({ email, officeId });

        if (user) {
            const token = crypton.token({ userId: user.id });
            await this.emailClient.sendRecovery({ email, token });
            return new Response({ ok: true, status: 200, data: { message: "Recovery email sent" } });
        } else {
            return new Response({ ok: false, status: 404, error: "User not found" });
        }
    }
}


// Exporting AuthService for external use
export default AuthService
