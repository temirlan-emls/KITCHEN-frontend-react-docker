import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { ISubCategory } from "../models/models";
import { useGetSubCategoriesQuery } from "../store/kitchenApi/kitchen.api";

export interface ICategoryPageProps {}

export default function CategoryPage(props: ICategoryPageProps) {
    const { category } = useParams();
    const { data, isLoading, isError } = useGetSubCategoriesQuery(
        `${category}`
    );

    console.log(data);
    
    return (
        <div>
            {isError && <p>Error</p>}
            {isLoading && <p>Loading...</p>}
            <>
                {" "}
                {data?.subcategories?.map((item: ISubCategory) => (
                    <Link to={`/${category}/${item.slug}/`} key={item.id}>
                        <img
                            src={item.sub_category_icon_url}
                            alt={item.sub_category_name}
                            width="50px"
                            className="inline-block"
                        />{" "}
                        {item.sub_category_name}{" "}
                    </Link>
                ))}
            </>
        </div>
    );
}
