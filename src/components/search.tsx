import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../models/models";
import { useSearchProductMutation } from "../store/kitchenApi/kitchen.api";
import { HiSearch } from "react-icons/hi";

export interface ISearchProps {}

export default function Search(props: ISearchProps) {
    const [searchProduct, { data }] = useSearchProductMutation();
    const [dropDown, setDropDown] = useState(false);
    const [searchData, setSearchData] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleChange = (searchData: string) => {
        if (searchData) {
            setDropDown(true);
        } else {
            setDropDown(false);
        }
        setSearchData(searchData);
    };
    const handleSubmit = () => {
        searchProduct(JSON.stringify({ query: searchData }));
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutsideDropdown, true);
        return () => {
            document.removeEventListener(
                "click",
                handleClickOutsideDropdown,
                true
            );
        };
    }, []);

    const handleClickOutsideDropdown = (e: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropDown(false);
        }
    };

    return (
        <div
            className="relative flex flex-row items-center h-full"
            ref={dropdownRef}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className="flex flex-col items-end"
            >
                <label htmlFor="query">Поиск</label>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Пицца печь"
                        name="query"
                        onChange={(e) => {
                            handleChange(e.target.value);
                        }}
                        className="border border-slate-800 rounded-sm outline-none px-2"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="border border-slate-800 rounded-sm ml-2 p-2 bg-kitchenYellow"
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <HiSearch />
                    </button>
                </div>

                {dropDown && data && (
                    <ul className="z-50 absolute top-[120px] left-0 right-0 max-h-64 px-4 py-2 shadow-dm border border-red-200 rounded-md bg-white opacity-90 overflow-auto">
                        {data.map((item: IProduct) => (
                            <li className="w-full" key={item.id}>
                                {" "}
                                <Link
                                    to={`/${item.category_slug}/${item.sub_category_slug}/${item.slug}/`}
                                >
                                    <img
                                        src={item.thumbnail_url}
                                        alt={item.name}
                                        width="50px"
                                        className="inline-block"
                                    />{" "}
                                    {item.name}{" "}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
}
