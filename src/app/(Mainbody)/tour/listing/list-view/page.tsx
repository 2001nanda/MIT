"use client";
import { FC, useEffect } from "react";
import CustomLayout from "@/layouts/layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-toolkit/store";
import GridView from "@/components/common/grid-page/grid/grid-view";
import { getTourData } from "@/redux-toolkit/tour-api";
import { useSearchParams } from "next/navigation";


const ListView: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.tour);
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";

  useEffect(() => {
    if (from && to && date) {
      dispatch(getTourData({ from, to, date }));
    }
  }, [dispatch, from, to, date]);

  return (
    <CustomLayout title="inner-page overlay-black" userBgClass="user user-light">
      <div className="right-filter-items">
        <GridView
          size={3}
          gridType={"list-view"}
          side={"left"}
          value={data}
          topFilter={false}
          gridOption={true}
          grid4Img={false}
          type="tour"
          filter={false}
          gridSelect={true}
        />
      </div>
    </CustomLayout>
  );
};

export default ListView;