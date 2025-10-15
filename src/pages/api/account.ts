import type { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";
import { sessions } from "./login";
import { getErrorMessage } from "@/constants/errorMessages";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const cookies = cookie.parse(req.headers.cookie || "");
        const sid = cookies.session;

        // 🔒 Missing session cookie
        if (!sid) {
            const status = 401; // Unauthorized
            return res.status(status).json({
                authenticated: false,
                errorMessage: getErrorMessage(status),
            });
        }

        // 🔒 Invalid or expired session
        const session = sessions.get(sid);
        if (!session) {
            const status = 440; // Login Timeout (custom)
            return res.status(status).json({
                authenticated: false,
                errorMessage: getErrorMessage(status),
            });
        }

        // ✅ Valid session
        return res.status(200).json({
            authenticated: true,
            username: session.username,
        });
    } catch (error) {
        console.error("Account API error:", error);
        const status = 500; // Internal Server Error
        return res.status(status).json({
            authenticated: false,
            errorMessage: getErrorMessage(status),
        });
    }
}
