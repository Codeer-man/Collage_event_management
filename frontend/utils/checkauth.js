import { getUrl } from "./getUrl.js";

export async function checkAuth() {
    try {
        const response = await fetch(`${getUrl()}/auth/checkauth`, {
            method: "GET",
            credentials: "include"
        });

        console.log("Auth response:", response);

        return response;
    } catch (error) {
        console.error("Authentication check failed:", error);
        throw error;
    }
} 