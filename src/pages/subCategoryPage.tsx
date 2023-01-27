import { Link, useParams } from "react-router-dom";
import { IProduct } from "../models/models";
import { useGetProductsQuery } from "../store/kitchenApi/kitchen.api";
import SetPageName from "../hooks/setPageName.hook";

export interface ISubCategoryPageProps {}

export default function SubCategoryPage(props: ISubCategoryPageProps) {
    // Getting params from url and getting subCategories
    const { category, subcategory } = useParams();
    const { data, isLoading, isError } = useGetProductsQuery({
        category: `${category}`,
        subcategory: `${subcategory}`,
    });

    // Setting page name
    SetPageName(data?.sub_category_name, "Sub Category");
    return (
        <div>
            {isError && <p>Error</p>}
            {isLoading && <p>Loading...</p>}
            <>
                {data && (
                    <div className="container mt-6 mb-72 flex flex-col justify-center items-center">
                        <h2 className="font-bold text-3xl mb-8">
                            {data.sub_category_name}
                        </h2>
                        <div className="w-full grid grid-cols-4">
                            {data.products?.map((item: IProduct) => (
                                <div className="w-full border" key={item.id}>
                                    <Link
                                        to={`/${category}/${subcategory}/${item.slug}/`}
                                        className="w-full h-full flex flex-col items-center justify-between"
                                    >
                                        <img
                                            src={item.title_image_url}
                                            alt={item.name}
                                            className="inline-block w-11/12"
                                        />{" "}
                                        <p className="py-6 font-semibold">
                                            {item.name}
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
