import { Carousel } from "flowbite-react/lib/esm/components/Carousel/Carousel";
import { useGetSlideImagesQuery } from "../store/kitchenApi/kitchen.api";
import { ISlideImages } from "../models/models";

export interface ICarouselProps {}

export default function CarouselWrapper(props: ICarouselProps) {
    const { data, isLoading, isError } = useGetSlideImagesQuery();

    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel slideInterval={5000}>
                {data &&
                    data.map((item: ISlideImages) => (
                        <img
                            key={item.id}
                            src={item.slide_image_url}
                            alt={item.slideName}
                        />
                    ))}
            </Carousel>
        </div>
    );
}
