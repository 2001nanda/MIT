"use client";
import { FC } from "react";
import SeachVector from "../../hotels/vector/SearchVector";
import Img from "@/utils/BackgroundImageRatio";

interface HomeBannerProps {
  searchType: string;
}

const HomeBanner: FC<HomeBannerProps> = ({ searchType }) => {
  return (
    <section className="home_section p-0">
     <div className="home home-padding home-content h-full pb-[180px]">

        <Img src="/assets/images/flights/banner.jpg" className="bg-img img-fluid" alt="" />
        <div className="animation-bg">
          <div className="container custom-container mix-layout-section">
            <div className="row">
             <div className="col-lg-10 m-auto">
                <SeachVector searchType={searchType} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
