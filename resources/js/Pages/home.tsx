import { HomeSlider } from "@/components/landing-pages/home-slider";
import HomeLayout from "@/layouts/home-layout";
import { memo } from "react";

const MemoizedHomeSlider = memo(HomeSlider);

const Home = memo(function Home() {
    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 pt-16">
                <MemoizedHomeSlider />
                <div className="flex flex-col gap-4 px-6">
                    <h1 className="text-2xl font-bold">Pilih Kategori Favoritmu</h1>
                    <p>ini adalah kontainer</p>
                </div>
            </div>
        </HomeLayout>
    );
});

export default Home;
