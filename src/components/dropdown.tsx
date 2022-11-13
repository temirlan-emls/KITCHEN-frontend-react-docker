import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export interface IDropdownProps {
    data: object;
}

export default function Dropdown({ data }: IDropdownProps) {
    const [dropDown, setDropDown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const dropdownName = Object.keys(data)[0];
    const dropdownValues = Object.values(data)[0];

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
        <li className="mx-2">
            <div className="relative inline-block text-left" ref={dropdownRef}>
                <div>
                    <button
                        type="button"
                        className="inline-flex w-full justify-center border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                        onClick={() => {
                            setDropDown(!dropDown);
                        }}
                    >
                        {dropdownName}
                        <svg
                            className="-mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                {dropDown && (
                    <div
                        className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex={-1}
                    >
                        <div className="py-1" role="none">
                            {Object.entries(dropdownValues).map(
                                ([key, value]: [string, any], index) => (
                                    <Link
                                        to={value.url}
                                        key={index}
                                        className="text-gray-700 px-4 py-2 text-md flex justify-between"
                                        tabIndex={-1}
                                        id="menu-item-0"
                                    >
                                        <p className="text-right">{value.name}</p>
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </li>
    );
}
