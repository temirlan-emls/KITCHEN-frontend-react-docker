import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IProduct } from "../models/models";

export interface ICartPageProps {}

export default function CartPage(props: ICartPageProps) {
    const { cart } = useTypedSelector((state) => state);
    const { removeItem } = useActions();

    const [items, setItems] = useState([]);

    useEffect(() => {
         document.title = "Cart";
        const items = JSON.parse(localStorage.getItem("persist:root") || "");
        if (items) {
            setItems(items);
        }
       
    }, []);


    console.log(items);
    
    return (
        <div>
            <>
                {" "}
                {cart
                    .filter((item: IProduct, index: number) => {
                        return cart.indexOf(item) === index;
                    })
                    .map((item: IProduct) => (
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
                                {item.name}{" "}
                            </Link>
                            <p>
                                <button
                                    onClick={() => removeItem({ id: item.id })}
                                >
                                    remove products
                                </button>
                            </p>
                        </div>
                    ))}
            </>
        </div>
    );
}
