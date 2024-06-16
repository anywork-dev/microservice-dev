import crypton from "cryptonite";
import UserResource from "auth-model";
import EmailClient from "email-client";
import { Response } from "net-tools";

// Event Driven Architecture for direct service calls.
// These method applies when the service discovered in the same service

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.BASE_URL + "/api/auth/google/callback";
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const USERINFO_ENDPOINT = "https://www.googleapis.com/oauth2/v2/userinfo";

class AuthService {
  static async googleCallback(req, res) {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send("Authorization code not provided");
    }

    try {
      // Exchange authorization code for access token
      const tokenParams = new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      });

      const tokenResponse = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: tokenParams.toString(),
      });

      if (!tokenResponse.ok) {
        throw new Error(
          "Failed to exchange authorization code for access token"
        );
      }

      const tokenData = await tokenResponse.json();
      const { access_token } = tokenData;

      // Fetch user info using access token
      const userInfoResponse = await fetch(USERINFO_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!userInfoResponse.ok) {
        throw new Error("Failed to fetch user info");
      }

      const userInfo = await userInfoResponse.json();

      const { email, name } = userInfo;

      // Check if user already exists in the database
      let user = await User.findOne({ email });

      if (!user) {
        // Register new user
        user = new User({
          email,
          username: name,
          // You can add more fields as needed
        });
        await user.save();
      }

      // Create a session or JWT for the user
      // For example:
      // req.session.user = user;
      // or generate JWT and send as a cookie or in response body

      // Redirect to the appropriate page
      return new Response({status: 302,}); // Change this to your desired redirect URL
    } catch (error) {
      console.error("Error during Google OAuth callback:", error);
      return new Response({status: 500, error: {reason: "Internal Server Error"}})
    }
  }

  static async login(data) {
    const { username, password } = data;
    const [user] = await UserResource.find({ username });

    if (user && (await crypton.compare(password, user.password))) {
      const token = crypton.token({ userId: user.id });
      return new Response({ ok: true, status: 200, data: { token } });
    } else {
      return new Response({
        ok: false,
        status: 401,
        error: { reason: "Invalid credentials" },
      });
    }
  }

  static async session(req) {
    const token = req.headers.authorization.split(" ")[1];
    const verified = crypton.verify(token);

    if (verified) {
      return new Response({
        ok: true,
        status: 200,
        data: { userId: verified.userId },
      });
    } else {
      return new Response({
        ok: false,
        status: 401,
        reason: "Invalid or expired session",
        error: "Unauthorized",
      });
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
      return new Response({
        ok: true,
        status: 200,
        data: { message: "Recovery email sent" },
      });
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
      return new Response({
        ok: true,
        status: 200,
        data: { message: "Recovery email sent" },
      });
    } else {
      return new Response({ ok: false, status: 404, error: "User not found" });
    }
  }
}

// Exporting AuthService for external use
export default AuthService;
