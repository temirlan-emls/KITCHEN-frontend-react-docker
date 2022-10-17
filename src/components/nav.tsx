import React from "react";
import { Link } from "react-router-dom";
import Search from "./search";
import CategoryDropdown from "./categoryDropdown";



export interface INavProps {}

export default function Nav(props: INavProps) {
    
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
                    </ul>
                </div>
                <Search />
            </div>

            <div className="h-1 w-full bg-kitchenYellow absolute bottom-0"></div>
        </div>
    );
}
