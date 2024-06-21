import crypton from "cryptonite";
import UserResource from "auth-model";
import EmailClient from "email-client";
import { randomString } from "helper";
import { Response } from "net-tools";

class Registration {
  static attempts = new Map()
  static insert(id, data){
    this.attempts.set(id, data);
  }

  static confirm(id){
    if (!this.attempts.has(id)) {
      return
    }
    
    const data = this.attempts.get(id)
    return data;
  }
  
  static dispose(id){
    this.attempts.delete(id)
  }
}

// Event Driven Architecture for direct service calls.
// These method applies when the service discovered in the same service

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.BASE_URL + "/api/auth/google/callback";
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const USERINFO_ENDPOINT = "https://www.googleapis.com/oauth2/v2/userinfo";

class AuthService {

  static async signInGoogle(){
    let Location = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${CLIENT_ID}&` +
      `redirect_uri=${REDIRECT_URI}&` +
      `response_type=code&` +
      `scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&` +
      `access_type=offline`;

      Location = "https://google.com/"

    return new Response({status: 302, headers: { Location }})
  }

  static async googleCallback(req, res) {
    const { code } = req.query;

    if (!code) {
      // return res.status(400).send("Authorization code not provided");
      return new Response({
        status: 400,
        body: "Authorization code not provided",
      });
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

      // Redirect to the appropriate page
      return new Response({
        status: 302,
        headers: { Location: "https://google.com" }
      }); // Change this to your desired redirect URL
    } catch (error) {
      console.error("Error during Google OAuth callback:", error);
      return new Response({
        status: 500,
        error: { name: "GoogleAuth", reason: "Internal Server Error" },
      });
    }
  }

  static async login(data) {
    const { email, password } = data;
    const result = await UserResource.findAll({ email });
    
    const [user] = result.data ?? [{}]

    if (user.password && (await crypton.compare(password, user.password))) {
      const token = crypton.token({ userId: user.id });
      return new Response({
        ok: true,
        status: 200,
        data: { token },
        session: { user }
      });
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

  /**
   * @param {object} req - The Express request object.
   * @param {object} req.body - The body of the request.
   * @param {string} req.body.username - The username of the new user.
   * @param {string} req.body.email - The email of the new user.
   * @param {string} req.body.contact - The contact information of the new user.
   * @param {string} req.body.address - The address of the new user.
   * @param {string} req.body.name - The name of the new user.
   * @param {string} req.body.password - The password of the new user.
   * @returns {Promise<Response>} - A promise that resolves to an HTTP response object.
   *
   * @throws {Error} - Throws an error if there is an issue with database access or password hashing.
   */
  static async basicRegistration(req) {
    // Security Consideration: Need to be guarded from DDOS attacks
    const { email, contact, address, name, password } = req.body;

    // Helper functions
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

    const userExists = async (email) => {
      // Replace with actual database check logic
      // Separate username and email search
      const { data } = (await UserResource.findAll({email})) || {};
      return data?.length > 0;
    };

    // Validation logic
    if (!email || !contact || !address || !name || !password) {
      return new Response({
        ok: false,
        status: 400,
        error: "All fields are required."
      });
    }

    if (!validateEmail(email)) {
      return new Response({
        ok: false,
        status: 400,
        error: "Invalid email format."
      });
    }

    if (password.length < 8) {
      return new Response({
        ok: false,
        status: 400,
        error: "Password must be at least 8 characters long."
      });
    }

    try {
      if (await userExists(email)) {
        return new Response({
          ok: false,
          status: 400,
          error: "Email already exists."
        });
      }
    } catch (error) {
      return new Response({
        ok: false,
        status: 500,
        error: "Internal error"
      });
    }

    // Hash the password
    const hashedPassword = await crypton.hashPassword(password);

    // Create the user object
    const user = {
      email,
      contact,
      address,
      name,
      password: hashedPassword
    };

    const id = randomString(25);
    Registration.insert(id, user)

    // Implement email confirmation
    console.log(id)

    // Return successful response
    return new Response({ ok: true, status: 200, data: { message: "Waiting for confirmation" } });
  }

  static async confirmBasicRegistration(req){

    const { confirm_id } = req.query;

    if (!confirm_id) {
      return new Response({
        ok: false,
        status: 500,
        error: "Confirm ID is not found!",
      });
    }
    
    const data = Registration.confirm(confirm_id)

    // Save the user to the database
    const savedUser = data && await UserResource.insert(data);

    if (!savedUser) {
      return new Response({
        ok: false,
        status: 500,
        error: "Registration failed. Please try again.",
      });
    }

    Registration.dispose(confirm_id);

    return new Response({ ok: true, status: 200, data: { ...savedUser } })
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
