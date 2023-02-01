
import { Footer } from "flowbite-react/lib/esm/components/Footer/Footer";
import {
    BsWhatsapp,
    BsInstagram,
} from "react-icons/bs";

export interface IFooterProps {}

export default function FooterWrapper(props: IFooterProps) {
    return (
        <Footer container={true} className="shadow-transparent">
            <div className="w-full">
                <div className="grid w-full sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <Footer.LinkGroup>
                        <Footer.Link href="#" className="sm:ml-4">
                            Главная
                        </Footer.Link>
                        <Footer.Link href="#" className="sm:ml-4">
                            Кредит
                        </Footer.Link>
                        <Footer.Link href="#" className="sm:ml-4">
                            Рассрочка
                        </Footer.Link>
                        <Footer.Link href="#" className="sm:ml-4">
                            Доставка
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="Kitchen.kz" year={2023} />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Footer.Icon
                            href="https://www.instagram.com/kitchen.kz_/"
                            icon={BsInstagram}
                        />
                        <Footer.Icon
                            href="https://www.instagram.com/kitchen.kz_/"
                            icon={BsWhatsapp}
                        />
                    </div>
                </div>
            </div>
        </Footer>
    );
}
