import type { NextApiRequest, NextApiResponse } from "next";
import { randomBytes } from "crypto";
import * as cookie from "cookie";
import { getErrorMessage } from "@/constants/errorMessages";

export const sessions = new Map<string, { username: string; createdAt: number }>();

const MOCK_USER = { username: "Satya", password: "india@25" };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // ✅ Allow only POST
        if (req.method !== "POST") {
            const status = 405;
            res.setHeader("Allow", "POST");
            return res.status(status).json({ message: getErrorMessage(status) });
        }

        // ✅ Validate CSRF token
        const csrfHeader = req.headers["x-csrf-token"];
        const cookies = cookie.parse(req.headers.cookie || "");
        const csrfCookie = cookies.csrfToken;

        if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
            const status = 403;
            return res.status(status).json({ message: getErrorMessage(status) });
        }

        // ✅ Validate credentials
        const { username, password } = req.body ?? {};
        if (username !== MOCK_USER.username || password !== MOCK_USER.password) {
            const status = 401;
            return res.status(status).json({ message: getErrorMessage(status) });
        }

        // ✅ Create session
        const sessionId = randomBytes(16).toString("hex");
        sessions.set(sessionId, { username, createdAt: Date.now() });

        // ✅ Set cookie
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("session", sessionId, {
                httpOnly: true,
                path: "/",
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7, // 7 days
            })
        );

        // ✅ Success response
        return res.status(200).json({ ok: true, username });
    } catch (err) {
        console.error("Login API error:", err);
        const status = 500;
        return res.status(status).json({ message: getErrorMessage(status) });
    }
}
