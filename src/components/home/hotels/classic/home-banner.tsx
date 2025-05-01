"use client";
import Slider from "react-slick";
import React from "react";
import { slide1 } from "@/components/common/slider-options";
import { banners } from "@/data/home/hotel/hotel-data";
import Link from "next/link";
import Img from "@/utils/BackgroundImageRatio";

const HomeBanner: React.FC = () => {
    
  return (
    <section className="home_section hotel_layout slide-1 p-0">
      <Slider {...slide1}>
        {banners.map((banner: IBannerProps,index) => (
          <div key={index}>
            <div className="home">
              <Img src={banner.img} className="img-fluid d-none bg-img" alt="" />
              <div className="home-content">
                <div>
                  <h1>{banner.title}</h1>
                  <h5>{banner.subTitle}</h5>
                  <h2>{banner.description}</h2>
                  <Link href={`/hotel/booking/booking-page`} className="btn btn-solid">{banner.btn}</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};
export default HomeBanner;
