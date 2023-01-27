import * as React from "react";
import { IProduct } from "../models/models";
import { useActions } from "../hooks/useActions";
import { FaTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi";

export interface ICartControlProps {
    item: IProduct;
}

export default function CartControl({ item }: ICartControlProps) {
    const { removeProduct, incrementQuantity, decrementQuantity } =
        useActions();

    return ( 
        <div className="flex flex-row w-full" key={item.id}>
            <div className="w-2/5 flex flex-col justify-around items-center">
                <button
                    onClick={() => incrementQuantity(item)}
                    className="w-full flex justify-center items-center p-1.5 border rounded-tl-md hover:bg-amber-200"
                >
                    <GoPlus />
                </button>

                <button
                    onClick={() => decrementQuantity(item)}
                    className="w-full flex justify-center items-center p-1.5 border rounded-bl-md hover:bg-amber-200"
                >
                    <HiMinus />
                </button>
            </div>
            <div className="w-2/5 ">
                <p className="font-bold flex justify-center items-center border select-none	 h-full w-full">
                    {" "}
                    {item.quantity}
                </p>
            </div>
            <div
                className="w-1/5 bg-red-300 flex flex-col justify-center items-center hover:bg-red-600 rounded-r-md"
                onClick={() => removeProduct(item)}
            >
                <button>
                    <FaTrashAlt color="white" />
                </button>
            </div>
        </div>
    );
}
