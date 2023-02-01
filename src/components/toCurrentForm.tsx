export interface IToCurrentFormProps {
    price: number;
}

export default function ToCurrentForm({ price }: IToCurrentFormProps) {
    return (
        <span className="text-center w-full">
            {new Intl.NumberFormat("kz-KZ", {
                style: "currency",
                currency: "KZT",
                maximumSignificantDigits: 1,
            }).format(price)}
        </span>
    );
}
