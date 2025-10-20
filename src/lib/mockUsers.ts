export interface MockUser {
    id: string;
    username: string;
    email: string;
    password: string;
    role: "admin" | "seller" | "customer";
    base_location: string;
    avatar: string;

}

