
import type { NextApiRequest, NextApiResponse } from "next";
import { randomBytes } from "crypto";
import * as cookie from "cookie";
import { getErrorMessage } from "@/constants/errorMessages";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Only allow GET
        if (req.method !== "GET") {
            const status = 405;
            res.setHeader("Allow", "GET");
            return res.status(status).json({
                csrfToken: null,
                errorMessage: getErrorMessage(status),
            });
        }

        // Generate secure random CSRF token
        const csrfToken = randomBytes(16).toString("hex");

        // Set CSRF cookie for the client
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("csrfToken", csrfToken, {
                httpOnly: false, // must be readable by browser
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60, // 1 hour
            })
        );

        // ✅ Successful response
        return res.status(200).json({ csrfToken });
    } catch (err) {
        console.error("CSRF API error:", err);
        const status = 500;
        return res.status(status).json({
            csrfToken: null,
            errorMessage: getErrorMessage(status),
        });
    }
}

