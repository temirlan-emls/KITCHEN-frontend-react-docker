import * as React from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../store/kitchenApi/kitchen.api";

export interface IProductPageProps {}

export default function ProductPage(props: IProductPageProps) {
    console.log(useParams());
    

    const { category, subcategory, product } = useParams();
    const { data, isLoading, isError } = useGetProductQuery({
        category: `${category}`,
        subcategory: `${subcategory}`,
        product: `${product}`,
    });

    console.log(data);
    return (
        <div>
            {isError && <p>Error</p>}
            {isLoading && <p>Loading...</p>}
            {data && (
                <img
                    src={data.title_image_url}
                    alt={data.name}
                    width="50px"
                    className="inline-block"
                />
            )}
            {data && <p>{data.name}</p>}
            {data && <p>{data.price}</p>}
        </div>
    );
}
