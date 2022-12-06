import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TypedRootSelector } from "../store/store";

export const useTypedSelector: TypedUseSelectorHook<TypedRootSelector> = useSelector;
