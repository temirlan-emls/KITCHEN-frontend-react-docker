import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function GoBack(step: number = -1) {
    const navigate = useNavigate();

    const goBack = () => navigate(step);

    return goBack;
}
