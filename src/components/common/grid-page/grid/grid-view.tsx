"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";

import GridList from "@/components/common/grid-page/grid-list";
import GridLayout from "@/components/common/grid-page/grid-layout";
import Filters from "../../../hotels/filters/page";
import FilterTags from "../../../hotels/filters/filter-tags";
import FormOne from "@/components/common/booking-form/form1";
import TopFilter from "@/components/flight/sidebar/filters/top-filter";
import FlightTopSchedule from "@/components/flight/sidebar/common/flight-top-schedule";
import CategoryPage from "@/components/common/filters/category";

import { IGridReducerProps } from "../grid-page.d";
import { ITravelProps } from "@/components/tour/listing/travel";
import SortByFilter from "@/components/hotels/filters/SortByFilter";

const GridView: FC<IGridViewProps> = ({
  gridSelect,
  topFilter,
  size,
  gridOption,
  trip,
  gridType,
  side,
  value,
  schedule,
  mapModal,
  grid4Img,
  setMapModal,
  children,
  type,
  view,
  latestFilter,
}) => {
  const dispatch = useDispatch();
  const grid = useSelector((state: RootState) => state.gridReducer);

  const [filteredMenu, setFilteredMenu] = useState<
    (IHotelProps | ITravelProps | IFlightProps)[] | undefined
  >(value);

  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [sortBy, setSortBy] = useState<string>("");
  const [showMobileFilterDropdown, setShowMobileFilterDropdown] = useState(false);

  const getCategories = useCallback((data: []) => {
    setFilteredMenu(data);
  }, []);

  const callTourModal = useCallback((tour: boolean) => {
    setTourModalOpen(tour);
  }, []);

  useEffect(() => {
    setFilteredMenu(value);
  }, [value]);

  useEffect(() => {
    dispatch({ type: "gridSize", payload: size });
    dispatch({ type: "gridStyle", payload: gridType });
  }, [dispatch, size, gridType]);

  return (
    <section className="xs-section bg-inner">
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row">
          {/* Top Filter for Flights */}
          {topFilter && type === "flight" && (
            <div className="col-12">
              <TopFilter
                value={filteredMenu}
                setShowFilter={setShowFilterSidebar}
                showFilter={showFilterSidebar}
              />
            </div>
          )}

          {/* Grid Option Placeholder (optional future feature) */}
          {gridOption && (
            <div className="col-12">
              {/* Optionally render CategoryPage inside a responsive dropdown */}
              {/* Uncomment if needed */}
              {/* <div className="filter-panel">
                <div className="left-filter">
                  <div className="respon-filter-btn">
                    <h6
                      role="button"
                      aria-expanded={showMobileFilterDropdown}
                      onClick={() => setShowMobileFilterDropdown(!showMobileFilterDropdown)}
                    >
                      Filter <i className="fas fa-sort-down"></i>
                    </h6>
                  </div>
                  <div className={`filters respon-filter-content filter-button-group ${showMobileFilterDropdown ? "show" : ""}`}>
                    <CategoryPage value={value} getCategories={getCategories} />
                  </div>
                </div>
                <GridList
                  callTourModal={callTourModal}
                  gridSelect={gridSelect}
                  tourModalOpen={tourModalOpen}
                  view={view}
                  grid={grid as IGridReducerProps}
                  gridStyle={gridType}
                  topFilter={topFilter}
                  value={value}
                  side={side}
                  grid4Img={grid4Img}
                  mapModal={mapModal}
                  setMapModal={setMapModal}
                  type={type}
                />
              </div> */}
            </div>
          )}

          {/* Booking Form (FormOne) */}
          <div className="book-table single-table bg-inner">
            <div className="table-form classic-form">
              <FormOne />
            </div>
          </div>

          {/* Sidebar Filters (if applicable) */}
          {!topFilter && side !== "no" && (
            <div className={`col-lg-3 ${side === "right" ? "order-1" : ""}`}>
              <Filters
                value={value}
                type={type}
                setShowFilter={setShowFilterSidebar}
                showFilter={showFilterSidebar}
              />
            </div>
          )}

          {/* Main Grid Section */}
          <div className={`${topFilter || side === "no" ? "col-lg-12" : "col-lg-9"} ratio3_2`}>
            {!latestFilter && (
              <a
                href="#javascript"
                className="mobile-filter border-top-0"
                onClick={() => setShowFilterSidebar(!showFilterSidebar)}
              >
                <h5>Latest Filter</h5>
                <img
                  src="/assets/images/icon/adjust.png"
                  className="img-fluid blur-up lazyloaded"
                  alt="Adjust Filters"
                />
              </a>
            )}

            {/* <FilterTags /> */}

            {schedule && (
              <FlightTopSchedule
                setShowFilter={setShowFilterSidebar}
                showFilter={showFilterSidebar}
              />
            )}
<SortByFilter totalCount={filteredMenu?.length || 0} />

            <GridLayout
              grid={grid}
              value={filteredMenu}
              type={type}
              view={view}
              trip={trip}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GridView;
