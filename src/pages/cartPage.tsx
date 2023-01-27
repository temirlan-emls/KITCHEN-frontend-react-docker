import React, { useEffect, useState } from "react";
import { IProduct } from "../models/models";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useGenXLSXMutation } from "../store/kitchenApi/kitchen.api";
import SetPageName from "../hooks/setPageName.hook";
import CartProductItem from "../components/cartProductItem";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export interface ICartPageProps {}

export default function CartPage(props: ICartPageProps) {
    const MySwal = withReactContent(Swal);

    // Getting cart
    const { cart } = useTypedSelector((state) => state.cart);

    // Setting page name
    SetPageName(null, "Cart");

    // Creating query data (depends on cart)
    const [query, setQuery] = useState("");
    useEffect(() => {
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
    }, [cart]);

    // Handler for genXLSX
    const [genXLSX, { data, isError, isLoading }] = useGenXLSXMutation();
    console.log(!isLoading);

    const genXLSXHandler = async (e: any) => {
        e.preventDefault();
        // if (query) {
        //     await genXLSX({ XLSXdata: query });
        // }

        MySwal.fire({
            title: <p>Выгрузка в Xlsx</p>,
            didOpen: async () => {
                if (!query) {
                    return MySwal.fire({
                        title: <p>Корзина пустая</p>,
                        icon: "error",
                    });
                } else {
                    await genXLSX({ XLSXdata: query });
                }
            },
        }).then(async () => {
            if (isLoading) {
                return MySwal.showLoading();
            }
            if (isError) {
                return MySwal.fire({
                    title: <p>Произошла ошибка</p>,
                    icon: "error",
                });
            }
            return MySwal.fire({
                title: <p>Все прошло отлично!</p>,
                icon: "success",
            });
        });
    };

    return (
        <div className=" min-h-screen ">
            <div className="w-full mx-4 my-10">
                {" "}
                <button
                    type="submit"
                    className="rounded-md ml-2 p-2 bg-kitchenYellow"
                    onClick={(e) => genXLSXHandler(e)}
                >
                    Сделать XLSX
                </button>
            </div>
            <div className="w-full flex h-12 border-slate-400 bg-slate-100 font-semibold">
                <div className="w-1/12 h-full flex justify-center items-center border border-solid border-inherit border-slate-400 ">
                    Кол
                </div>
                <div className="w-2/12 h-full flex justify-center items-center border border-solid border-inherit border-slate-400 ">
                    Внешний вид
                </div>
                <div className="w-2/12 h-full flex justify-center items-center border border-solid border-inherit border-slate-400 ">
                    Модель
                </div>
                <div className="w-2/12 h-full flex justify-center items-center border border-solid border-inherit border-slate-400 ">
                    Описание
                </div>
                <div className="w-1/12 h-full flex justify-center items-center border border-solid border-inherit border-slate-400 ">
                    кВт
                </div>
                <div className="w-2/12 h-full flex justify-center items-center border border-solid border-inherit border-slate-400 ">
                    Габариты, мм.
                </div>
                <div className="w-1/12 h-full flex justify-center items-center border border-solid border-inherit border-slate-400 ">
                    Цена
                    <br />
                    тг/шт.
                </div>
                <div className="w-1/12 h-full flex justify-center items-center border border-solid border-inherit border-slate-400 ">
                    Итог
                </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                {cart.map((item: IProduct) => (
                    <CartProductItem item={item} key={item.id} />
                ))}
            </div>
        </div>
    );
}
