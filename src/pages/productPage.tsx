import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../store/kitchenApi/kitchen.api";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import SetPageName from "../hooks/setPageName.hook";
import { IProduct } from "../models/models";
import CartControl from "../components/cartControl";
import ToCurrentForm from "../components/toCurrentForm";
import { BsCartPlusFill } from "react-icons/bs";
import { useSnackbar } from "notistack";


export interface IProductPageProps {}

export default function ProductPage(props: IProductPageProps) {
    const { enqueueSnackbar } = useSnackbar();

    // Getting params from url and getting products
    const { category, subcategory, product } = useParams();
    const { data, isLoading, isError } = useGetProductQuery({
        category: `${category}`,
        subcategory: `${subcategory}`,
        product: `${product}`,
    });
    // Setting page name
    SetPageName(data?.name, "Product");

    // Getting cart
    const { cart } = useTypedSelector((state) => state.cart);

    // Product actions
    const { addProduct } = useActions();
    const addProductHandler = (data: any) => {
        enqueueSnackbar("Добавлено в корзину!", {
            autoHideDuration: 3000,
            variant: "success",
        });
        addProduct(data!);
    };
    return (
        <div>
            {isError && <p>Error</p>}
            {isLoading && <p>Loading...</p>}
            {data && (
                <div className="container mt-14 mb-72 flex justify-center items-center">
                    <div className="w-7/12">
                        <div className="mb-10">
                            <p className="text-4xl font-bold">{data.name}</p>
                            {data.code && (
                                <p className="font-light">{data.code}</p>
                            )}
                        </div>

                        <img
                            src={data.title_image_url}
                            alt={data.name}
                            className="w-6/12 inline-block"
                        />
                    </div>
                    <div className="w-5/12 flex flex-col">
                        <div className="mb-10">
                            <p className="font-semibold text-4xl">
                                <ToCurrentForm price={data.price} />
                            </p>
                        </div>
                        <div className="w-full mb-10">
                            {!cart.some((p) => p.id === data?.id) ? (
                                <div className="w-4/5">
                                    <button
                                        onClick={() => addProductHandler(data!)}
                                        className="border bg-slate-400 px-10 py-4 rounded-lg"
                                    >
                                        <BsCartPlusFill className="h-6 w-6" />
                                    </button>
                                </div>
                            ) : (
                                cart
                                    .filter((p) => p.id === data!.id)
                                    .map((item: IProduct) => (
                                        <div
                                            key={item.id * item.price}
                                            className="w-2/5"
                                        >
                                            <CartControl
                                                item={item}
                                                key={item.id * item.price}
                                            />
                                        </div>
                                    ))
                            )}
                        </div>
                        <div className="w-full">
                            {data.description && (
                                <p className="mb-4">{data.description}</p>
                            )}
                            {data.dimensions && (
                                <p>
                                    <span className="font-semibold">
                                        Габариты:
                                    </span>{" "}
                                    {data.dimensions}
                                </p>
                            )}
                            {data.consumption && (
                                <p>
                                    <span className="font-semibold">
                                        Мощность:
                                    </span>{" "}
                                    {data.consumption}
                                </p>
                            )}
                            {data.properties &&
                                data.properties.map((item) => (
                                    <p key={item}>
                                        <span className="font-semibold">
                                            {item.split(":")[0]}
                                        </span>
                                        : {item.split(":")[1]}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
