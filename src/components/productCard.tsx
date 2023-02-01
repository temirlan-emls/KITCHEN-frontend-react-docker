import { Card } from "flowbite-react/lib/esm/components/Card/Card";
import { IProduct } from "../models/models";
import ToCurrentForm from "./toCurrentForm";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import CartControl from "./cartControl";
import { BsCartPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

export interface IProductCardProps {
    productProp: IProduct;
}

export default function ProductCard({ productProp }: IProductCardProps) {
    const { cart } = useTypedSelector((state) => state.cart);
    const { enqueueSnackbar } = useSnackbar();

    const { addProduct } = useActions();
    const addProductHandler = (data: any) => {
        enqueueSnackbar("Добавлено в корзину!", {
            autoHideDuration: 3000,
            variant: "success",
        });
        addProduct(data!);
    };
    return (
        <Card imgSrc={productProp.title_image_url}>
            {" "}
            <Link
                to={`/${productProp.category_slug}/${productProp.sub_category_slug}/${productProp.slug}/`}
            >
                {" "}
                <h5 className="sm:text-sm md:text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                    {productProp.name}
                </h5>
            </Link>
            <div className="flex flex-col  flex-wrap items-center justify-center">
                <span className="md:text-md lg:text-xl text-gray-900 dark:text-white">
                    <ToCurrentForm price={productProp.price} />
                </span>
                {!cart.some((p) => p.id === productProp?.id) ? (
                    <div className="sm:mt-2">
                        <button
                            onClick={() => addProductHandler(productProp!)}
                            className="border bg-slate-400 px-8 py-4 rounded-lg"
                        >
                            <BsCartPlusFill className="h-4 w-4" />
                        </button>
                    </div>
                ) : (
                    cart
                        .filter((p) => p.id === productProp!.id)
                        .map((item: IProduct) => (
                            <div
                                key={item.id * item.price}
                                className="w-2/5 sm:w-full sm:mt-2"
                            >
                                <CartControl
                                    item={item}
                                    key={item.id * item.price}
                                />
                            </div>
                        ))
                )}
            </div>
        </Card>
    );
}
function enqueueSnackbar(
    arg0: string,
    arg1: { autoHideDuration: number; variant: string }
) {
    throw new Error("Function not implemented.");
}
