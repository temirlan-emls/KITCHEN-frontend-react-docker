import { Link, useParams } from "react-router-dom";
import { ISubCategory } from "../models/models";
import { useGetSubCategoriesQuery } from "../store/kitchenApi/kitchen.api";
import SetPageName from "../hooks/setPageName.hook";
import CategoryCard from "../components/categoryCard";

export interface ICategoryPageProps {}

export default function CategoryPage(props: ICategoryPageProps) {
    // Getting params from url and getting subCategories
    const { category } = useParams();
    const { data, isLoading, isError } = useGetSubCategoriesQuery(
        `${category}`
    );

    // Setting page name
    SetPageName(data?.category_name, "Category");
    return (
        <div>
            {isError && <p>Error</p>}
            {isLoading && <p>Loading...</p>}
            {data && (
                <div className="container my-6 px-4 flex flex-col justify-center items-center">
                    <h2 className="font-bold text-3xl mb-8">
                        {data.category_name}
                    </h2>
                    <div className="w-full grid auto-rows-max sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {data.subcategories &&
                            data.subcategories.map(
                                (subCategory: ISubCategory) => (
                                    <Link
                                        to={`/${category}/${subCategory.slug}/`}
                                        className="w-full h-full flex flex-col items-center justify-between"
                                        key={subCategory.id}
                                    >
                                        <CategoryCard
                                            categoryProp={subCategory}
                                        />
                                    </Link>
                                )
                            )}
                    </div>
                </div>
            )}
        </div>
    );
}
