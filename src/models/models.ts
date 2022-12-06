export interface CategoriesResponse {
    id: number;
    slug: string;
    category_name: string;
    category_image_url?: string;
    category_icon_url?: string;
    get_absolute_url: string;
}

export interface ISubCategory {
    id: number;
    slug: string;
    sub_category_image_url?: any;
    sub_category_icon_url: string;
    sub_category_name: string;
    get_absolute_url: string;
}

export interface CategoryResponse {
    id: number;
    slug: string;
    category_name: string;
    category_image_url?: string;
    category_icon_url?: string;
    get_absolute_url: string;
    subcategories: ISubCategory[];
}

export interface IProduct {
    id: number;
    slug: string;
    name: string;
    code: string;
    price: number;
    description: string;
    dimensions: string;
    consumption: string;
    properties: string[];
    title_image_url: string;
    thumbnail_url: string;
    second_image_url?: string;
    third_image_url?: string;
    review: string;
    get_absolute_url: string;
    get_thumbnail?: any;
    sub_category_slug: string;
    category_slug: string;
    quantity: number;
}

export interface SubCategoryResponse {
    id: number;
    slug: string;
    sub_category_icon_url: string;
    sub_category_image_url?: any;
    sub_category_name: string;
    get_absolute_url: string;
    products: IProduct[];
}
