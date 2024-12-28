import { CampaignLists, CategoryList } from "@/components/landing-pages";
import { HomeSlider } from "@/components/landing-pages/home-slider";
import HomeLayout from "@/layouts/home-layout";
import { CampaignProps } from "@/types/campaign";
import { memo } from "react";

const MemoizedHomeSlider = memo(HomeSlider);
const CategoryListSlider = memo(CategoryList);
const CampaignListsItems = memo(CampaignLists);

const Home = memo(function Home({ data }: { data?: CampaignProps[] }) {
    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 pt-16">
                <MemoizedHomeSlider />
                <CategoryListSlider />
            </div>
            <CampaignListsItems className="py-16" campaigns={data} />
        </HomeLayout>
    );
});

export default Home;
