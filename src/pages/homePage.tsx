import CarouselWrapper from "../components/carouselWrapper";
import SetPageName from "../hooks/setPageName.hook";
import { useGetRandomProductsQuery } from "../store/kitchenApi/kitchen.api";
import { GiPositionMarker } from "react-icons/gi";
import { BsFillTelephoneFill } from "react-icons/bs";
import ProductCard from "../components/productCard";
import { IProduct } from "../models/models";
import { Link } from "react-router-dom";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
    SetPageName(null, "Kitchen.kz");

    const { data, isLoading, isError } = useGetRandomProductsQuery();
    return (
        <section className="container mt-14 mb-48 flex flex-col justify-center items-center">
            <div className="w-full flex sm:flex-col lg:flex-row justify-center items-center">
                <div className="sm:w-full sm:m-0 mr-2">
                    <CarouselWrapper />
                </div>
                <div className="sm:w-full lg:w-5/12 p-4 ">
                    <div className="flex justify-center items-center ">
                        <GiPositionMarker className="h-12 w-12" />
                        <p className="sm:text-sm md:text-md lg:text-lg font-bold">
                            Бц САТ, ул. Кунаева, 21Б, офис №7{" "}
                        </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:flex-row lg:flex-col sm:text-sm  md:text-md lg:text-xl">
                        <div className="flex justify-center items-center ">
                            <BsFillTelephoneFill className="h-6 w-6" />
                            <p className="ml-2 font-semibold">
                                <a href="tel:+77780997744">+7 778 099 77 44</a>
                            </p>
                        </div>
                        <div className="flex justify-center items-center ">
                            <BsFillTelephoneFill className="h-6 w-6" />
                            <p className="ml-2 font-semibold">
                                <a href="tel:+77780997774">+7 778 099 77 74</a>
                            </p>
                        </div>
                        <div className="flex justify-center items-center ">
                            <BsFillTelephoneFill className="h-6 w-6" />
                            <p className="ml-2 font-semibold">
                                <a href="tel:+77780994477">+7 778 099 44 77</a>
                            </p>
                        </div>
                        <div className="flex justify-center items-center ">
                            <BsFillTelephoneFill className="h-6 w-6" />
                            <p className="ml-2 font-semibold">
                                <a href="tel:+77780997747">+7 778 099 77 47</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 w-full grid grid-flow-row auto-rows-max sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {isError && <p>Error</p>}
                {isLoading && <p>Loading...</p>}
                {data &&
                    data.map((item: IProduct) => (
                        <ProductCard
                            productProp={item}
                            key={item.id * item.price}
                        />
                    ))}
            </div>
        </section>
    );
}
