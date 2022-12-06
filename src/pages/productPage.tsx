import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../store/kitchenApi/kitchen.api";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

export interface IProductPageProps {}

export default function ProductPage(props: IProductPageProps) {
    const { category, subcategory, product } = useParams();
    const { data, isLoading, isError } = useGetProductQuery({
        category: `${category}`,
        subcategory: `${subcategory}`,
        product: `${product}`,
    });

    const [productCountInCart, setProductCountInCart] = useState(0);
    const [isProductInCart, setIsProductInCart] = useState(false);

    const { addProduct } = useActions();
    const { cart } = useTypedSelector((state) => state.cart);
    useEffect(() => {
        document.title = `${data?.name}` || "Product";
        setIsProductInCart(cart.some((p) => p.id === data?.id));

        if (isProductInCart) {
            setProductCountInCart(
                cart.filter((p) => p.id === data!.id)[0].quantity
            );
        }
    }, [cart, isProductInCart, data]);
    
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
                <div>
                    <p>
                        {new Intl.NumberFormat("kz-KZ", {
                            style: "currency",
                            currency: "KZT",
                            maximumSignificantDigits: 1,
                        }).format(data.price)}
                    </p>
                    <p>{}</p>
                </div>
            )}
            <button onClick={() => addProduct(data!)} className="border bg-slate-400">add to cart</button>
            {isProductInCart ? `in cart ${productCountInCart}` : "no in cart"}
        </div>
    );
}
