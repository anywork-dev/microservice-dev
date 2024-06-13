const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const AuthService = require('./AuthService'); // Import the AuthService
const router = express.Router();

// Google OAuth Configuration
const CLIENT_ID = 'your-google-client-id';
const CLIENT_SECRET = 'your-google-client-secret';
const REDIRECT_URI = 'http://yourdomain.com/auth/google/callback';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const USERINFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v2/userinfo';
const ID_TOKEN_ISSUER = 'https://accounts.google.com';

// Middleware to generate and validate state parameter
function generateState() {
    return crypto.randomBytes(16).toString('hex');
}

function validateState(req, res, next) {
    const state = req.query.state;
    if (state && state === req.session.oauthState) {
        next();
    } else {
        res.status(403).json({ ok: false, error: 'Invalid state parameter' });
    }
}

// Route to start OAuth process
router.get('/google', (req, res) => {
    const state = generateState();
    req.session.oauthState = state;

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=profile email&state=${state}`;
    res.redirect(authUrl);
});

// Route for Google to redirect back to after successful authentication
router.get('/google/callback', validateState, async (req, res) => {
    const { code } = req.query;

    try {
        // Exchange authorization code for access token
        const tokenResponse = await axios.post(TOKEN_ENDPOINT, null, {
            params: {
                code,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code',
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token, id_token } = tokenResponse.data;

        // Verify the ID token
        const decodedToken = jwt.decode(id_token, { complete: true });
        if (decodedToken.payload.iss !== ID_TOKEN_ISSUER || decodedToken.payload.aud !== CLIENT_ID) {
            return res.status(403).json({ ok: false, error: 'Invalid ID token' });
        }

        // Get user info
        const userResponse = await axios.get(USERINFO_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const user = userResponse.data;

        // Handle user login/registration
        const token = await AuthService.handleGoogleLogin(user);

        res.status(200).json({ ok: true, token });
    } catch (error) {
        res.status(500).json({ ok: false, error: 'Authentication failed' });
    }
});

// Route to handle user login
router.post('/login', async (req, res) => {
    try {
        const response = await AuthService.login(req);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({ ok: false, error: 'Login failed' });
    }
});

// Other routes for registration, session management, etc.
// router.post('/register', AuthService.register);
// router.post('/session', AuthService.session);

module.exports = router;
