interface MockUser {
    id: string;
    username: string;
    email: string;
    password: string;
    role: "admin" | "seller" | "customer";
    base_location: string;
}

const MOCK_USERS: MockUser[] = [
    {
        id: "u001",
        username: "Satya",
        email: "satya@example.com",
        password: "india@25",
        role: "admin",
        base_location: "Bangalore, India",
    },
    {
        id: "u002",
        username: "Priya",
        email: "priya@example.com",
        password: "hello@123",
        role: "customer",
        base_location: "Hyderabad, India",
    },
    {
        id: "u003",
        username: "Amit",
        email: "amit@example.com",
        password: "secure@99",
        role: "seller",
        base_location: "Delhi, India",
    },
    {
        id: "u004",
        username: "Neha",
        email: "neha@example.com",
        password: "welcome@2025",
        role: "customer",
        base_location: "Pune, India",
    },
    {
        id: "u005",
        username: "Ravi",
        email: "ravi@example.com",
        password: "pass@789",
        role: "seller",
        base_location: "Chennai, India",
    },
];

export default MOCK_USERS;
