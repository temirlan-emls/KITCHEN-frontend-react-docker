import { Link, useParams } from "react-router-dom";
import { IProduct } from "../models/models";
import { useGetProductsQuery } from "../store/kitchenApi/kitchen.api";
import SetPageName from "../hooks/setPageName.hook";
import ProductCard from "../components/productCard";

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
                    <div className="container my-6 px-4 flex flex-col justify-center items-center">
                        <h2 className="font-bold text-3xl mb-8">
                            {data.sub_category_name}
                        </h2>
                        <div className="w-full grid grid-flow-row auto-rows-max sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {data.products?.map((item: IProduct) => (
                                <ProductCard
                                    productProp={item}
                                    key={item.id * item.price}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </>
        </div>
    );
}
