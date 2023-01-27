import { useEffect } from "react";

export default function SetPageName(
    pageName: string | undefined | null,
    defaultPageName: string
) {
    useEffect(() => {
        document.title = pageName || defaultPageName;
    }, [pageName, defaultPageName]);
}
