import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "./search";
import CategoryDropdown from "./categoryDropdown";
import Dropdown from "./dropdown";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { BsCartPlusFill } from "react-icons/bs";

export interface INavProps {}

export default function Nav(props: INavProps) {
    const [inCartCount, setInCartCount] = useState(0);
    const { cart } = useTypedSelector((state) => state.cart);
    useEffect(() => {
        let count = 0;
        cart.forEach((item) => (count += item.quantity));
        setInCartCount(count);
    }, [cart]);

    const servicesDropdown = {
        Услуги: {
            credit: {
                url: "/credit",
                name: "Кредит",
            },
            installmentPlan: {
                url: "/installment-plan",
                name: "Рассрочка",
            },
            delivery: {
                url: "/delivery",
                name: "Доставка",
            },
        },
    };

    return (
        <div className="relative">
            <div className="container h-40 flex flex-row justify-between items-end ">
                <div className="flex flex-row items-center h-full">
                    <Link to={`/`}>
                        {" "}
                        <img
                            src="/images/logo_full_512.png"
                            alt="logo"
                            width="256px"
                        />
                    </Link>
                </div>
                <div>
                    <ul className="mb-2 flex flex-row">
                        <CategoryDropdown />
                        <Dropdown data={servicesDropdown} />
                    </ul>
                </div>

                <div className="flex flex-col items-end justify-center h-full">
                    <Link to={`/cart`}>
                        <div className="relative mb-4 border rounded-md flex justify-center items-center hover:bg-amber-200">
                            <p className="my-2 mr-2 ml-4 py-1 px-3 rounded-full bg-amber-200 font-bold">
                                {inCartCount}
                            </p>
                            <BsCartPlusFill className="h-6 w-6 mr-4" />
                        </div>
                    </Link>
                    <Search />
                </div>
            </div>

            <div className="h-1 w-full bg-kitchenYellow absolute bottom-0"></div>
        </div>
    );
}
