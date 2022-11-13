import React from "react";
import { Routes, Route } from "react-router-dom";
import CartPage from "./pages/cartPage";
import CategoryPage from "./pages/categoryPage";
import HomePage from "./pages/homePage";
import LayoutPage from "./pages/layoutPage";
import ProductPage from "./pages/productPage";
import SubCategoryPage from "./pages/subCategoryPage";
import TestPage from "./pages/testPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LayoutPage />}>
                <Route index element={<HomePage />}></Route>
                <Route path="/:category" element={<CategoryPage />}></Route>
                <Route
                    path="/:category/:subcategory"
                    element={<SubCategoryPage />}
                ></Route>
                <Route
                    path="/:category/:subcategory/:product"
                    element={<ProductPage />}
                ></Route>
                <Route path="/cart" element={<CartPage />}></Route>
                <Route path="/test" element={<TestPage />}></Route>
            </Route>
        </Routes>
    );
}

export default App;
