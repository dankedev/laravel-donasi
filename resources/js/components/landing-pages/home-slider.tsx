import { CampaignProps } from "@/types/campaign";
import { Link, usePage } from "@inertiajs/react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { memo, useMemo, useRef } from "react";

const MemoizedCarouselSlide = memo(function CarouselSlide({ item }: { item: CampaignProps }) {
    return (
        <Carousel.Slide key={item.slug} className="h-full w-full">
            <Link
                href={route("campaign.show", { slug: item.slug })}
                className="relative h-full w-full"
            >
                <img src={item.featured_image?.url} alt={item.title} className="h-auto w-full" />
            </Link>
        </Carousel.Slide>
    );
});

export const HomeSlider = memo(function HomeSlider() {
    const props = usePage().props;
    const campaigns = useMemo(() => getRandomElements(props.campaigns, 3), [props.campaigns]);
    const autoplay = useRef(Autoplay({ delay: 2000 }));
    return (
        <Carousel
            withIndicators
            loop
            dragFree
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
        >
            {campaigns?.map((item) => <MemoizedCarouselSlide key={item.slug} item={item} />)}
        </Carousel>
    );
});

function getRandomElements<T>(array: T[], count: number): T[] {
    // Pastikan count tidak lebih besar dari panjang array

    if (count > array.length) {
        throw new Error("Count cannot be greater than the length of the array.");
    }

    // Buat salinan dari array untuk menghindari modifikasi pada array asli

    const shuffledArray = array.slice();

    // Acak array

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Tukar elemen
    }

    // Ambil elemen yang diacak

    return shuffledArray.slice(0, count);
}
