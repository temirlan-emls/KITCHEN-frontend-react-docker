import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IProduct } from "../models/models";
import { useGetProductsQuery } from "../store/kitchenApi/kitchen.api";

export interface ISubCategoryPageProps {}

export default function SubCategoryPage(props: ISubCategoryPageProps) {
    const { category, subcategory } = useParams();
    const { data, isLoading, isError } = useGetProductsQuery({
        category: `${category}`,
        subcategory: `${subcategory}`,
    });

    useEffect(() => {
        document.title = `${data?.sub_category_name}` || "Sub Category";
    }, [data]);
    return (
        <div>
            {isError && <p>Error</p>}
            {isLoading && <p>Loading...</p>}
            <>
                {" "}
                {data?.products?.map((item: IProduct) => (
                    <Link
                        to={`/${category}/${subcategory}/${item.slug}/`}
                        key={item.id}
                    >
                        <img
                            src={item.thumbnail_url}
                            alt={item.name}
                            width="50px"
                            className="inline-block"
                        />{" "}
                        {item.name}{" "}
                    </Link>
                ))}
            </>
        </div>
    );
}
