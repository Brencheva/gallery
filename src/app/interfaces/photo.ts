export interface Photo {
    alt_description: string;
    height: number;
    urls: Url[];
    width: number;
    updated_at: string;
}

export interface Url {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
}