export interface IToCurrentFormProps {
    price: number;
}

export default function ToCurrentForm({ price }: IToCurrentFormProps) {
    return (
        <span className="text-center">
            {new Intl.NumberFormat("kz-KZ", {
                style: "currency",
                currency: "KZT",
                maximumSignificantDigits: 1,
            })
                .format(price)
                .replace("KZT", " KZT")}
        </span>
    );
}
