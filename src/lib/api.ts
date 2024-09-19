import { goto as _goto } from "$app/navigation";

const baseUrl = import.meta.env.BASE_URL;

const SESISON_TOKEN = "645ad71b-947a-4588-9c83-119b3dc54576";


// Implement custom navigation function call for
// specific framework
async function goto(...args: any){
    return await _goto(args as any)
}

interface AuthResponse {
    token?: string;
    user?: {confirmation: boolean; email: string; id: number; role: number};
    message?: string;
}

class RestService {
    private BASE_URL = baseUrl;

    /**
     * Logs in a user with the provided credentials.
     *
     * @param {object} credentials - The user's login credentials.
     * @param {string} credentials.email - The user's email address.
     * @param {string} credentials.password - The user's password.
     * @returns {Promise<any>} A promise that resolves with the login response data if successful, otherwise throws an error.
     * @throws {Error} If the login request fails or the response status is not ok. The error message will contain details from the response or a generic "Login failed" message.
     */
    async login(credentials: { email: string; password: string }): Promise<any> {
        try {
            const response = await fetch(`${this.BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data: AuthResponse = await response.json() || {};
            if (!response.ok) {
                throw new Error(data.message || 'Login failed')
            }

            data.token && localStorage.setItem(SESISON_TOKEN, data.token);
            data.user && localStorage.setItem('user', JSON.stringify(data.user));


            return data;
        } catch (error: Error | any) {
            console.error('Login error:', error);
            throw {message: error.message || 'Login failed'};
        }
    }

    /**
     * Executes the provided API call function and handles 403 Unauthorized responses.
     *
     * @param {Function} apiCall - The API call function to execute.
     * @returns {Promise<any>} A promise that resolves with the response data from the API call if successful.
     * @throws {Error} If the API call throws an error or the response status is 403 Unauthorized.
     */
    handleApiRequest(apiCall: (params: any) => Promise<any>): (data?: any) => Promise<any> {
        return async function(data?: any) {
            try {
                // Execute the provided API call function
                const response = await apiCall(arguments);
                return response;
            } catch (error: Error | any) {
                if (error.message === 'Unauthorized') {
                    // Handle 403 Unauthorized, e.g., redirect to login
                    // For example:
                    localStorage.removeItem(SESISON_TOKEN)
                    localStorage.removeItem("user")
                    await goto('/login');
                    // throw new Error('You are not authorized to access this resource.');
                } else {
                    // Re-throw other errors
                    console.error('API request error:', error);
                    throw error;
                }
            }
        }
    }
    

    /**
     * Retrieves the session token from localStorage.
     *
     * @returns {Promise<object|null>} A promise that resolves with an object containing the session token if it exists, otherwise null.
     */
    async session(): Promise<any> {
        // Check if the session token exists in localStorage
        const token = localStorage.getItem(SESISON_TOKEN);
    
        // If the token exists, return it
        if (token) {
            return { token };
        } else {
            // If no token exists, return null or a custom message
            return null; // or { message: 'No session token found' }
        }
    }
    
    

    /**
     * Logs the user out by making a POST request to the /logout endpoint.
     * 
     * @returns {Promise<any>} A promise that resolves when the logout request is complete.
     * @throws {Error} If the logout request fails.
     */
    private async _logout(): Promise<any> {
        try {
            const response = await fetch(`${this.BASE_URL}/logout`, {
                method: 'POST',
                credentials: 'include',
            });

        } catch (error) {
            console.error('Logout error:', error);
        }

        localStorage.removeItem(SESISON_TOKEN)
        localStorage.removeItem("user")

        await goto('/')
    }
    

    /**
     * Checks if the user has already taken the survey.
     * 
     * First, checks localStorage for a stored survey status. 
     * If not found, fetches the status from the API and stores it in localStorage.
     *
     * @returns {Promise<boolean>} A promise that resolves with true if the user has taken the survey, otherwise false.
     * @throws {Error} If there's an error fetching the survey status from the API.
     */
    private async _surveyStatus(): Promise<boolean> {
        try {
            // Check if survey status is in localStorage
            const storedStatus = localStorage.getItem('surveyStatus');
            if (storedStatus) {
                return JSON.parse(storedStatus);
            }

            // If not in localStorage, fetch from API
            const response = await fetch(`${this.BASE_URL}/survey-status`, {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to fetch survey status');
            }
            const data = await response.json();
            const status = data.status || false;

            // Store the fetched status in localStorage
            localStorage.setItem('surveyStatus', JSON.stringify(status));
            return status;
        } catch (error) {
            console.error('Survey status error:', error);
            throw error;
        }
    }


    async register(details: { email: string; password: string; role: number }): Promise<any> {
        try {
            const response = await fetch(`${this.BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(details)
            });

            const data: AuthResponse = await response.json() || {}
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed')
            }

            data.token && localStorage.setItem(SESISON_TOKEN, data.token)
            data.user && localStorage.setItem('user', JSON.stringify(data.user))

            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    // Protected API
    logout = this.handleApiRequest(this._logout)
    surveyStatus = this.handleApiRequest(this._surveyStatus)
}

export const api = new RestService();
