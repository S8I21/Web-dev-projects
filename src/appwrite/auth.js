import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

        console.log("Appwrite client initialized with project ID:", conf.appwriteProjectId);
    }

    async createAccount({ email, password, name }) {
        console.log("Attempting to create account with email:", email);
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log("Account creation response:", userAccount);
            if (userAccount) {
                console.log("Account created successfully, logging in...");
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Error during account creation:", error);
            throw error;
        }
    }

    async login({ email, password }) {
        console.log("Attempting login with email:", email);
        try {
            // Correct the method name to createEmailPasswordSession
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Login successful:", session);
            return session;
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        console.log("Fetching current user...");
        try {
            const user = await this.account.get();
            console.log("Current user fetched:", user);
            return user;
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        console.log("Attempting to logout...");
        try {
            await this.account.deleteSessions();
            console.log("Logout successful.");
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;
