export interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image?: string;
    published_at: string;
    created_at: string;
    updated_at: string;
    likes?: Like[];
    comments?: Comment[];
}

export interface Comment {
    id: number;
    post_id: number;
    name: string;
    email: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export interface Like {
    id: number;
    post_id: number;
    ip_address: string;
    created_at: string;
    updated_at: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags?: string[];
    demo_url?: string;
    github_url?: string;
    featured: boolean;
    created_at: string;
    updated_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}
