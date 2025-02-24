import { LucideIcon } from 'lucide-react';
import { RouteList } from 'vendor/tightenco/ziggy/src/js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: ROLE;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: string | number | undefined | null | ROLE; // This allows for additional properties...
}

export enum ROLE {
    BUYER = 'buyer',
    AGENT = 'agent',
}
