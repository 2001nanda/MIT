
import MemoizedAirlinesFilter from "@/components/flight/sidebar/filters/airlines-filter";
import MemoizedArriveFilterContent from "@/components/flight/sidebar/filters/arrive-filter";
import MemoizedDepartureFilter from "@/components/flight/sidebar/filters/departure-filter";
import MemoizedStopFilter from "@/components/flight/sidebar/filters/stop-filter";
import MemoizedDistrictFilter from "@/components/hotels/filters/district-filter";
import MemoizedFacilityFilter from "@/components/hotels/filters/facility-filter";
import HostLanguageFilter from "@/components/hotels/filters/host-language";
import PriceRange from "@/components/hotels/filters/price-range";
import MemoizedStarCategoryFilter from "@/components/hotels/filters/star-category";
import MemoizedFlightFilter from "@/components/tour/listing/filters/flights";
import MemoizedTravelFilter from "@/components/tour/listing/filters/travel";
import MemoizedTripDurationFilter from "@/components/tour/listing/filters/trip-duration";
import SubRouteFilter from "../../components/hotels/filters/SubRouteFilter"; // ✅ import
import TimeRangeFilter from "@/components/hotels/filters/TimeRangeFilter";
import BusNameFilter from "@/components/hotels/filters/BusNameFilter";
import BusTypeFilter from "@/components/hotels/filters/BusTypeFilter";

export function renderFiltersByType(type: string | undefined, minPrice: IPriceProps | null, maxPrice: IPriceProps | null ,boardingOptions: string[] | undefined,droppingOptions: string[] | undefined,busnames: string[]) {
  switch (type) {
    case "hotel":
      return (
        <>
          <MemoizedDistrictFilter />
          <MemoizedFacilityFilter />
          <MemoizedStarCategoryFilter />
          <PriceRange min={minPrice?.price} max={maxPrice?.price} />
          <HostLanguageFilter />
        </>
      );
    case "tour":
      return (
        <>
          <PriceRange min={minPrice?.price} max={maxPrice?.price} />
          <BusTypeFilter />
          {/* <MemoizedStarCategoryFilter /> */}
          {/* <MemoizedFlightFilter /> */}
          {/* <MemoizedTravelFilter /> */}
          <TimeRangeFilter filterType="departureTime" />
<TimeRangeFilter filterType="arrivalTime" />
<BusNameFilter options={busnames} />

          <SubRouteFilter
  boardingOptions={boardingOptions || []}
  droppingOptions={droppingOptions || []}
/>


          {/* <MemoizedTripDurationFilter /> */}
        </>
      );
    case "flight":
      return (
        <>
          <MemoizedStopFilter />
          <PriceRange min={minPrice?.price} max={maxPrice?.price} />
          <MemoizedAirlinesFilter />
          <MemoizedDepartureFilter />
          <MemoizedArriveFilterContent />
        </>
      );
    default:
      return null;
  }
}
