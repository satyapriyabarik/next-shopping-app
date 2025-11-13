import type { NextApiRequest, NextApiResponse } from "next";
import { randomBytes } from "crypto";
import * as cookie from "cookie";
import { getErrorMessage } from "@/constants/errorMessages";
import { MockUser } from "@/lib/mockUsers";

export const sessions = new Map<string, { username: string; createdAt: number }>();

const MOCK_USERS: MockUser[] = [
    {
        id: "u001",
        username: "Satya",
        email: "satya@example.com",
        password: "india@25",
        role: "admin",
        base_location: "Bangalore, India",
        avatar: "https://media.licdn.com/dms/image/v2/D5603AQGFds5_OPnKAw/profile-displayphoto-shrink_200_200/B56ZWEvJ5wGQAg-/0/1741688709508?e=2147483647&v=beta&t=1vKJ8Mt8l9YTLBXQ_84amkd3-x9WeqxFyIvw5SS-H_w",
    },
    {
        id: "u002",
        username: "Nagarro",
        email: "demoUser@nagaroo.com",
        password: "nagarro@123",
        role: "admin",
        base_location: "Gurugram, India",
        avatar: "https://media.licdn.com/dms/image/v2/D4D0BAQHu-RIXbSi0fw/company-logo_200_200/company-logo_200_200/0/1688362226392/nagarro_logo?e=1762992000&v=beta&t=1O-rvxDHdH5lboqhUlAGPeYUNayh9z7UE22hDis64vg",

    },
    {
        id: "u003",
        username: "Amit",
        email: "amit@example.com",
        password: "secure@99",
        role: "seller",
        base_location: "Delhi, India",
        avatar: "https://media.licdn.com/dms/image/v2/D5603AQHafijTBjxSWw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728932813994?e=1762387200&v=beta&t=ZGyHwlGgUZ37rkWgPxM4hHNUVcco9kmfSXLPfrBnjRA",

    },
    {
        id: "u004",
        username: "Neha",
        email: "neha@example.com",
        password: "welcome@2025",
        role: "customer",
        base_location: "Pune, India",
        avatar: "https://media.licdn.com/dms/image/v2/D5603AQGFds5_OPnKAw/profile-displayphoto-shrink_400_400/B56ZWEvJ5wGQAo-/0/1741688709508?e=1762387200&v=beta&t=GzimUPBmv6f3HlhkgE6LI9fsK9KcDX5jEyWNg5j0VXg",

    },
    {
        id: "u005",
        username: "Ravi",
        email: "ravi@example.com",
        password: "pass@789",
        role: "seller",
        base_location: "Chennai, India",
        avatar: "https://media.licdn.com/dms/image/v2/D5603AQGFds5_OPnKAw/profile-displayphoto-shrink_400_400/B56ZWEvJ5wGQAo-/0/1741688709508?e=1762387200&v=beta&t=GzimUPBmv6f3HlhkgE6LI9fsK9KcDX5jEyWNg5j0VXg",

    },
];
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
        // Find a matching user
        const matchedUser = MOCK_USERS.find(
            (user) => user.username === username && user.password === password
        );
        if (!matchedUser) {
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
        return res.status(200).json({ ok: true, username, email: matchedUser.email, avatar: matchedUser.avatar, role: matchedUser.role, base_location: matchedUser.base_location });
    } catch (err) {
        console.error("Login API error:", err);
        const status = 500;
        return res.status(status).json({ message: getErrorMessage(status) });
    }
}
