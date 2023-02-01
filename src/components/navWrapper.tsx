import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "./search";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { BsCartPlusFill } from "react-icons/bs";
import { Navbar } from "flowbite-react/lib/esm/components/Navbar/Navbar";
import { Dropdown } from "flowbite-react/lib/esm/components/Dropdown/Dropdown";
import { useGetCategoriesQuery } from "../store/kitchenApi/kitchen.api";

export interface INavWrapperProps {}

export default function NavWrapper(props: INavWrapperProps) {
    const [inCartCount, setInCartCount] = useState(0);
    const { data, isLoading, isError } = useGetCategoriesQuery();
    const { cart } = useTypedSelector((state) => state.cart);
    useEffect(() => {
        let count = 0;
        cart.forEach((item) => (count += item.quantity));
        setInCartCount(count);
    }, [cart]);

    return (
        <div className="py-6 relative">
            <Navbar fluid={true}>
                <Navbar.Brand href="/">
                    <img
                        src="/images/logo_full_512.png"
                        className="mr-3 h-6 sm:h-9 scale-125"
                        alt="Flowbite Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <div className="flex justify-center items-center">
                        <Dropdown
                            label="Категорий"
                            dismissOnClick={true}
                            inline={true}
                            size="sm"
                        >
                            {isError && <Dropdown.Item>Error</Dropdown.Item>}
                            {isLoading && (
                                <Dropdown.Item>Loading...</Dropdown.Item>
                            )}
                            {data &&
                                data.map((category: any) => (
                                    <Link
                                        to={`/${category.slug}`}
                                        key={category.id}
                                    >
                                        <Dropdown.Item>
                                            <div className="flex justify-between items-center w-full px-4 py-2 text-md">
                                                <img
                                                    src={
                                                        category.category_icon_url
                                                    }
                                                    alt={category.category_name}
                                                    className="inline-block w-12"
                                                />{" "}
                                                <p className="text-right w-4/6">
                                                    {category.category_name}
                                                </p>
                                            </div>
                                        </Dropdown.Item>
                                    </Link>
                                ))}
                        </Dropdown>
                    </div>
                    <div className="flex justify-center items-center md:m-0 sm:my-6">
                        <Dropdown
                            label="Услуги"
                            dismissOnClick={true}
                            inline={true}
                            size="sm"
                            className="inline"
                        >
                            <Dropdown.Item>
                                {" "}
                                <Link to="/">Кредит</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                {" "}
                                <Link to="/">Рассрочка</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                {" "}
                                <Link to="/">Доставка</Link>
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                    <Search />
                    <div className="flex flex-col items-end justify-center">
                        <Link to={`/cart`}>
                            <div className="relative border rounded-md flex justify-center items-center hover:bg-amber-200">
                                <p className="my-2 mr-2 ml-4 py-1 px-3 rounded-full bg-amber-200 font-bold">
                                    {inCartCount}
                                </p>
                                <BsCartPlusFill className="h-6 w-6 mr-4" />
                            </div>
                        </Link>
                    </div>
                </Navbar.Collapse>
            </Navbar>
            <div className="h-1 w-full bg-kitchenYellow absolute bottom-0 "></div>
        </div>
    );
}

// <div className="relative">
//     <div className="container h-40 flex flex-row justify-between items-end ">
//         <div className="flex flex-row items-center h-full">
//             <Link to={`/`}>
//                 {" "}
//                 <img
//                     src="/images/logo_full_512.png"
//                     alt="logo"
//                     width="256px"
//                 />
//             </Link>
//         </div>
//         <div>
//             <ul className="mb-2 flex flex-row">
//                 <CategoryDropdown />
//                 <Dropdown data={servicesDropdown} />
//             </ul>
//         </div>

//         <div className="flex flex-col items-end justify-center h-full">
//             <Link to={`/cart`}>
//                 <div className="relative mb-4 border rounded-md flex justify-center items-center hover:bg-amber-200">
//                     <p className="my-2 mr-2 ml-4 py-1 px-3 rounded-full bg-amber-200 font-bold">
//                         {inCartCount}
//                     </p>
//                     <BsCartPlusFill className="h-6 w-6 mr-4" />
//                 </div>
//             </Link>
//             <Search />
//         </div>
//     </div>

//
// </div>
