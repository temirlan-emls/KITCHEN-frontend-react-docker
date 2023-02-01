import { Card } from "flowbite-react/lib/esm/components/Card/Card";
import { ISubCategory } from "../models/models";

export interface ICategoryCardProps {
    categoryProp: ISubCategory;
}

export default function CategoryCard({ categoryProp }: ICategoryCardProps) {
    return (
        <Card imgSrc={categoryProp.sub_category_image_url} className="p-2">
            <h5 className="sm:text-md md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
                {categoryProp.sub_category_name}
            </h5>
        </Card>
    );
}
