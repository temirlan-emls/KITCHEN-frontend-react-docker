import React, { useEffect, useState } from "react";
import { IProduct } from "../models/models";
import { Link } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useGenXLSXMutation } from "../store/kitchenApi/kitchen.api";

export interface ICartPageProps {}

export default function CartPage(props: ICartPageProps) {
    const { cart } = useTypedSelector((state) => state.cart);
    const { removeProduct, incrementQuantity, decrementQuantity } =
        useActions();
    const [query, setQuery] = useState("");
    useEffect(() => {
        document.title = "Cart";
        let query = "";
        cart.forEach((item) => {
            for (let i = 0; i < item.quantity; i++) {
                query += item.slug + ",";
            }
        });
        if (query[query.length - 1] === ",") {
            query = query.slice(0, -1).trim();
        }
        setQuery(query);
        console.log(query);
    }, [cart]);

    const [genXLSX] = useGenXLSXMutation();
    const getXLSXHandler = async (e: any) => {
        e.preventDefault();
        if (query) {
            await genXLSX({ XLSXdata: query });
        }
    };

    return (
        <div>
            <>
                <button
                    type="submit"
                    className="border border-slate-800 rounded-sm ml-2 p-2 bg-kitchenYellow"
                    onClick={(e) => getXLSXHandler(e)}
                >
                    Press
                </button>
                {cart.map((item: IProduct) => (
                    <div key={item.id}>
                        <Link
                            to={`/${item.category_slug}/${item.sub_category_slug}/${item.slug}/`}
                            key={item.id}
                        >
                            <img
                                src={item.title_image_url}
                                alt={item.name}
                                width="50px"
                                className="inline-block"
                            />{" "}
                            {item.name} {item.price * item.quantity}{" "}
                        </Link>
                        <div className="flex flex-col">
                            <button
                                onClick={() => removeProduct(item)}
                                className="border"
                            >
                                remove products
                            </button>
                            <p>{item.quantity}</p>
                            <button
                                onClick={() => incrementQuantity(item)}
                                className="border"
                            >
                                incr
                            </button>
                            <button
                                onClick={() => decrementQuantity(item)}
                                className="border"
                            >
                                decr
                            </button>
                        </div>
                    </div>
                ))}
            </>
        </div>
    );
}
