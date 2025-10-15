import type { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";
import { sessions } from "./login";
import { getErrorMessage } from "@/constants/errorMessages";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // ✅ Allow only POST
        if (req.method !== "POST") {
            const status = 405;
            res.setHeader("Allow", "POST");
            return res.status(status).json({ message: getErrorMessage(status) });
        }

        const cookies = cookie.parse(req.headers.cookie || "");
        const sid = cookies.session;

        if (sid) {
            // ✅ Remove session from memory
            sessions.delete(sid);
        } else {
            const status = 401;
            return res.status(status).json({ message: getErrorMessage(status) });
        }

        // ✅ Clear session cookie
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("session", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 0,
            })
        );

        // ✅ Success
        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("Logout API error:", err);
        const status = 500;
        return res.status(status).json({ message: getErrorMessage(status) });
    }
}
