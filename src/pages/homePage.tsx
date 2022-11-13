import React, { useEffect } from "react";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
    useEffect(() => {
        document.title = 'Kitchen.kz';
    }, []);

    return <div className="h-screen"></div>;
}
