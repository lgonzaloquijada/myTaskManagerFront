export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: string;
    created_at?: string;
    updated_at?: string;
    token?: string;
    created_by?: number;
    updated_by?: number;
}
