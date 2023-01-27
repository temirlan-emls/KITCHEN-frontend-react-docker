import { Link, useParams } from "react-router-dom";
import { ISubCategory } from "../models/models";
import { useGetSubCategoriesQuery } from "../store/kitchenApi/kitchen.api";
import SetPageName from "../hooks/setPageName.hook";

export interface ICategoryPageProps {}

export default function CategoryPage(props: ICategoryPageProps) {
    // Getting params from url and getting subCategories
    const { category } = useParams();
    const { data, isLoading, isError } = useGetSubCategoriesQuery(
        `${category}`
    );

    // Setting page name
    SetPageName(data?.category_name, "Category");

    // console.log(data);

    return (
        <div>
            {isError && <p>Error</p>}
            {isLoading && <p>Loading...</p>}
            <>
                {data && (
                    <div className="container mt-6 mb-72 flex flex-col justify-center items-center">
                        <h2 className="font-bold text-3xl mb-8">
                            {data.category_name}
                        </h2>
                        <div className="w-full grid grid-cols-4">
                            {data.subcategories?.map((item: ISubCategory) => (
                                <div className="w-full border" key={item.id}>
                                    <Link
                                        to={`/${category}/${item.slug}/`}
                                        className="w-full h-full flex flex-col items-center justify-between"
                                    >
                                        <img
                                            src={item.sub_category_image_url}
                                            alt={item.sub_category_name}
                                            className="inline-block w-11/12"
                                        />{" "}
                                        <p className="py-6 font-semibold">
                                            {item.sub_category_name}
                                        </p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </>
        </div>
    );
}
