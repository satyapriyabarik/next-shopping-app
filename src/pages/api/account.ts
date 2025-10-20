import type { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";
import { sessions } from "./login";
import { getErrorMessage } from "@/constants/errorMessages";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const cookies = cookie.parse(req.headers.cookie || "");
        const sid = cookies.session;

        // 🔒 No session cookie present
        if (!sid) {
            const status = 401;
            return res.status(status).json({
                authenticated: false,
                errorMessage: getErrorMessage(status),
            });
        }

        // 🔍 Check if session exists in memory
        const session = sessions.get(sid);

        // ✅ If session exists → refresh its expiry (optional: to keep session alive)
        if (session) {
            // You can "refresh" expiry if you have one (here we just keep it alive forever)
            sessions.set(sid, session); // re-store session (keeps it in memory)
            return res.status(200).json({
                authenticated: true,
                username: session.username,
            });
        }

        // ❌ Only if logout.ts removed session
        const status = 440; // Login Timeout (custom)
        return res.status(status).json({
            authenticated: false,
            errorMessage: getErrorMessage(status),
        });

    } catch (error) {
        console.error("Account API error:", error);
        const status = 500;
        return res.status(status).json({
            authenticated: false,
            errorMessage: getErrorMessage(status),
        });
    }
}
