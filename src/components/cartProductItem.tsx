import { IProduct } from "../models/models";
import CartControl from "./cartControl";
import ToCurrentForm from "../components/toCurrentForm";
import { Link } from "react-router-dom";

export interface ICartProductItemProps {
    item: IProduct;
}

export default function CartProductItem({ item }: ICartProductItemProps) {
    return (
        <div key={item.id} className="w-full flex flex-row ">
            <div className="w-1/12 flex flex-col justify-center items-center border border-solid border-inherit border-slate-400">
                <CartControl item={item} />
            </div>
            <div className="w-2/12 flex justify-center items-center border border-solid border-inherit border-slate-400">
                <img
                    src={item.title_image_url}
                    alt={item.name}
                    className="inline-block w-48"
                />
            </div>
            <Link
                to={`/${item.category_slug}/${item.sub_category_slug}/${item.slug}/`}
                key={item.id}
                className="w-2/12 flex justify-center items-center border border-solid border-inherit border-slate-400"
            >
                <p className="underline underline-offset-2">{item.name}</p>
            </Link>
            <div className="w-2/12 flex flex-col justify-center border border-solid border-inherit border-slate-400 text-sm">
                {item.properties &&
                    item.properties.map((item) => (
                        <p key={item} className="mb-4 pl-2">
                            <span className="font-semibold">
                                {item.split(":")[0]}
                            </span>
                            : {item.split(":")[1]}
                        </p>
                    ))}
            </div>
            <div className="w-1/12 flex justify-center items-center border border-solid border-inherit border-slate-400">
                {item.consumption && item.consumption}
            </div>
            <div className="w-2/12 flex justify-center items-center border border-solid border-inherit border-slate-400">
                {item.dimensions && item.dimensions}
            </div>
            <div className="w-1/12 flex justify-center items-center border border-solid border-inherit border-slate-400">
                <ToCurrentForm price={item.price} />
            </div>
            <div className="w-1/12 flex justify-center items-center border border-solid border-inherit border-slate-400">
                <ToCurrentForm price={item.price * item.quantity} />
            </div>
        </div>
    );
}
