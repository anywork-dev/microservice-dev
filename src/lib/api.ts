import { goto as _goto } from "$app/navigation";
import schemas from "./schema/response";
import { z } from "zod";

const baseUrl = import.meta.env.BASE_URL || "https://anywork.dev";

const SESSION_TOKEN = import.meta.env.SESSION_TOKEN || "645ad71b-947a-4588-9c83-119b3dc54576";
const USER = import.meta.env.USER || "a0a168a3-0fa8-4ccc-82eb-7c0b5c3998a8";
const CONFIRMATION = import.meta.env.confirmation || "62107353-6b7c-46bb-81d3-e40edfa8be45";
const SURVEY_STATUS = import.meta.env.surveyStatus || "da82942d-9088-4b5d-bf88-07032b5cedbc";



// Implement custom navigation function call for
// specific framework
async function goto(...args: any){
    return await _goto(args as any)
}

export type User = {confirmation: boolean; email: string; id: number; role: string};
export type APIResponse = {message: string, user?: User, token?: string, confirmation?: {last: number, attempts: number}} 

const KeyMapping: any = {token: SESSION_TOKEN, user: USER, confirmation: CONFIRMATION, surveyStatus: SURVEY_STATUS}

interface AuthResponse {
    token?: string;
    user?: User;
    message?: string;
}

export class RestService {
    private static BASE_URL = baseUrl;

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
            const response = await fetch(`${RestService.BASE_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data: z.infer<typeof schemas.loginSchema> = await response.json() || {};

            schemas.loginSchema.parse(data)

            if (!response.ok) {
                throw new Error(data.message || 'Login failed')
            }

            RestService.store(data.store)


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
    handleApiRequest<T>(apiCall: (params: any) => Promise<T>): (data?: any) => Promise<T> {
        return async function(data?: any): Promise<T | any> {
            try {
                // Execute the provided API call function
                const response = await apiCall(arguments);
                return response;
            } catch (error: Error | any) {
                if (error.message === 'Unauthorized') {
                    // Handle token expiration, automatically refresh
                    // Handle 403 Unauthorized, e.g., redirect to login
                    // For example:
                    RestService.dispose([SESSION_TOKEN, USER])
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

    static store(data: {[index: string]: any}) {
        const keys = Object.keys(data|| {})
        for (const key of keys) {
            if (data[key]) {
                localStorage.setItem((KeyMapping[key] || key) as string, typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key]);
            }
        }
    }

    static dispose(data: string[]){
        for (const key of data) {
            localStorage.removeItem(KeyMapping[key] || key)
        }
    }
    

    /**
     * Retrieves the session token from localStorage.
     *
     * @returns {Promise<object|null>} A promise that resolves with an object containing the session token if it exists, otherwise null.
     */
    static session(): {[index: string]: any} {
        // Check if the session token exists in localStorage
        const store: {[index: string]: any} = {}
        const maps = Object.entries(KeyMapping)
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i) as string;
            const value = localStorage.getItem(key);
            const standard = (maps.find(([k, v]) => v == key) || [])[0]
            store[standard || key] = typeof value === "object" ? JSON.stringify(value) : value
        }
    
        return store
    }

    /**
     * Refreshes the user session by sending a request to the server to obtain a new session token and user data.
     * It checks for an existing session token in local storage, and if found, it makes a POST request to the 
     * '/api/refresh-session' endpoint with the token in the Authorization header. If successful, the new 
     * session information is stored in local storage.
     * 
     * @returns {Promise<{ user: User, token: string } | null>} 
     * A promise that resolves to an object containing the refreshed user data and token if the session is 
     * successfully refreshed, or null if the session token does not exist or an error occurs during the 
     * refresh process.
     * 
     * @throws {Error} Throws an error if the server response is not okay.
     */
    private async _refreshSession(): Promise<any> {
        // Check if the session token exists in localStorage
        const existingToken = localStorage.getItem(SESSION_TOKEN);
    
        if (!existingToken) {
            return null; // If no token exists, return null
        }
    
        try {
            // 1. Fetch the new session
            const response = await fetch(RestService.BASE_URL + '/api/refresh-session', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${existingToken}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            
            schemas.refreshSessionSchema.parse(data)
    
            if (!response.ok) {
                throw {status: response.status || null, message: data.message || "Error refreshing session"}
            }

            console.log(data.store)
    
            // 2. Set dynamic token saving
            RestService.store(data.store)
    
            return data.store
            
        } catch (error) {
            throw error
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
            const response = await fetch(`${RestService.BASE_URL}/api/logout`, {
                method: 'POST',
                credentials: 'include',
            });

        } catch (error) {
            console.error('Logout error:', error);
        }

        RestService.dispose([SESSION_TOKEN, USER, CONFIRMATION, SURVEY_STATUS])

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
         // Check if survey status is in localStorage
         const storedStatus = localStorage.getItem('surveyStatus');
         if (storedStatus) {
             return JSON.parse(storedStatus);
         }

         // If not in localStorage, fetch from API
         const response = await fetch(`${RestService.BASE_URL}/api/survey-status`, {
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
    }

    private async _cancelRegistration(token: string){
        try {
            // const headers: any = {'Content-Type': 'application/json'}
            // if (token || this.session()?.token) headers.Authorization = "Bearer " + token || this.session()?.token

            // const response = await fetch(`${RestService.BASE_URL}/api/cancel_registration`, 
            //     {
            //         method: 'POST',
            //         headers
            //     });

            // const result = await response.json();

            // if (!response.ok) {
            //     throw {message: result.message, status: response.status}
            // }

            RestService.dispose(Object.keys(KeyMapping))

            await goto("/signup")
    
        } catch (error: any) {
            if(error.status !== 401) {
                console.error(error.message)
                // handle other status beside 401
            }
            
            // Remove token from localstorage if invalid handled by handleAPI
            throw error;
        }
    }

    private async _requestEmailConfirmation({token}: {token: string}){
        try {
            const headers: any = {'Content-Type': 'application/json'}
            if (token || RestService.session()?.token) headers.Authorization = "Bearer " + token || RestService.session()?.token

            // const response = await fetch(`${RestService.BASE_URL}/api/request_confirmation`, 
            //     {
            //         method: 'POST',
            //         headers
            //     });

            const response = {json: async function(){ return {data: {store: {}, message: "sukses"}} }, ok: true, status: 200}

            const {data}: {data: {store: any, message: string}} = (await response.json()) || {data: {}};

            if (!response.ok) {
                throw {message: data.message, status: response.status}
            }

            RestService.store(data.store)

            return {message: data.message, ...data.store}
    
        } catch (error: any) {
            if(error.status !== 401) {
                if (error.status == 400) {
                    localStorage.removeItem(SESSION_TOKEN)
                    localStorage.removeItem("user")
                }
                console.error(error.message)
            }
            
            // Remove token from localstorage if invalid handled by handleAPI
            throw error;
        }
    }


    async register(details: { email: string; password: string; role: number }): Promise<any> {
        try {
            // const response = await fetch(`${RestService.BASE_URL}/api/register`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(details)
            // });

            // const data: AuthResponse = await response.json() || {}
            // if (!response.ok) {
            //     throw {data.message || 'Registration failed'}
            // }

            const data: {store: AuthResponse} = {
                store: {
                    token: "707cfb4a-17b3-48c9-a8e6-fe1ed6ffa00f",
                    user: {confirmation: false, email: "fathnakbar@gmail.com", id: 101, role: "INVESTOR"}
                }
            }

            await (new Promise((res => setTimeout(res, 3000))))

            RestService.store(data.store)

            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    // Protected API
    refreshSession = this.handleApiRequest(this._refreshSession)
    logout = this.handleApiRequest(this._logout)
    surveyStatus = this.handleApiRequest(this._surveyStatus)
    cancelRegistration = this.handleApiRequest(this._cancelRegistration)
    requestEmailConfirmation = this.handleApiRequest(this._requestEmailConfirmation)
}

export const api = new RestService();
