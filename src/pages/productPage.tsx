import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useGetProductQuery } from "../store/kitchenApi/kitchen.api";

export interface IProductPageProps {}

export default function ProductPage(props: IProductPageProps) {
    const { category, subcategory, product } = useParams();
    const { data, isLoading, isError } = useGetProductQuery({
        category: `${category}`,
        subcategory: `${subcategory}`,
        product: `${product}`,
    });

    useEffect(() => {
        document.title = `${data?.name}` || "Product";
    }, [data]);

    const { addItem } = useActions();
    const { cart } = useTypedSelector((state) => state);
    const isExistsInCart = cart.some((p) => p.id === data?.id);
    const productCountInCart = cart.filter((p)=> p === data).length

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
            {data && (
                <p>
                    {new Intl.NumberFormat("kz-KZ", {
                        style: "currency",
                        currency: "KZT",
                        maximumSignificantDigits: 1,
                    }).format(data.price)}
                </p>
            )}
            <button onClick={() => addItem(data!)}>add to cart</button>
            {isExistsInCart ? (
                <p>in cart {productCountInCart}</p>
            ) : (
                <p>no in cart</p>
            )}
        </div>
    );
}
