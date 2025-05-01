import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IFilterProductsProps {
  value: IBaseProps[];
}

const useFilterTour = ({ value }: IFilterProductsProps) => {
  const [showProduct, setShowProduct] = useState<IBaseProps[]>(value);

  const {
    rateStatus,
    priceStatus,
  } = useSelector((state: RootState) => state.hotelFilterReducer);

  const {
    flightStatus,
    travelStatus,
    tripDurationStatus,
    boardingStatus = [],
    droppingStatus = [],
    departureTimeStatus,
    arrivalTimeStatus,
    busNameStatus = [],
    busTypeTags = [],
    sortBy,sortOrder,
  } = useSelector((state: RootState) => state.tourFilterReducer);

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() as unknown as URLSearchParams;

  const parseTimeToHour = (timeStr: string): number => {
    const [time, modifier] = timeStr.trim().split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours;
  };

  const sortProducts = (products: IBaseProps[] = []): IBaseProps[] => {
    let sorted: IBaseProps[] = [];
  
    switch (sortBy) {
      case "price":
      case "priceLowHigh":
        sorted = [...products].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "priceHighLow":
        sorted = [...products].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "duration":
        sorted = [...products].sort((a, b) => (a.duration ?? 0) - (b.duration ?? 0));
        break;
      case "arrival":
        sorted = [...products].sort(
          (a, b) =>
            parseTimeToHour(a.route?.arrivalLocation?.time || "0:00 AM") -
            parseTimeToHour(b.route?.arrivalLocation?.time || "0:00 AM")
        );
        break;
      case "departure":
        sorted = [...products].sort(
          (a, b) =>
            parseTimeToHour(a.route?.departureLocation?.time || "0:00 AM") -
            parseTimeToHour(b.route?.departureLocation?.time || "0:00 AM")
        );
        break;
      case "seats":
        sorted = [...products].sort((a, b) => (b.seatsAvailable ?? 0) - (a.seatsAvailable ?? 0));
        break;
      default:
        sorted = [...products];
        break;
    }
  
    // 🔁 Handle ascending/descending order
    if (sortOrder === "desc") {
      sorted.reverse();
    }
  
    return sorted;
  };
  

  useEffect(() => {
    const filteredProducts = value?.filter((product: IBaseProps) => {
      const filteredRate =
        rateStatus.length === 0 || product.rate === undefined || rateStatus.includes(product.rate);

      const filteredPrice =
        product.price !== undefined &&
        product.price >= priceStatus.min &&
        product.price <= priceStatus.max;

      const filterFlight =
        flightStatus.length === 0 ||
        product.flights !== undefined ||
        flightStatus.includes(product.flights) ||
        flightStatus.includes("all");

      const filterTravel =
        travelStatus.length === 0 ||
        travelStatus.includes(product.travel) ||
        travelStatus.includes("all");

      const filterTrip =
        tripDurationStatus.length === 0 ||
        tripDurationStatus.includes(product.trip) ||
        tripDurationStatus.includes("all");

      const filterBoarding =
        boardingStatus.length === 0 ||
        product.route?.departureLocation?.subLocations?.some((sub) =>
          boardingStatus.includes(sub.name)
        );

      const filterDropping =
        droppingStatus.length === 0 ||
        product.route?.arrivalLocation?.subLocations?.some((sub) =>
          droppingStatus.includes(sub.name)
        );

      const filterBusName =
        busNameStatus.length === 0 || (product.busName && busNameStatus.includes(product.busName));

      const filterBusType =
        busTypeTags.length === 0 ||
        (() => {
          const lowerType = (product.busType || "").toLowerCase();
          return (
            (busTypeTags.includes("ac") && lowerType.includes("a/c")) ||
            (busTypeTags.includes("non-ac") && !lowerType.includes("a/c")) ||
            (busTypeTags.includes("seater") && lowerType.includes("seater")) ||
            (busTypeTags.includes("sleeper") && lowerType.includes("sleeper"))
          );
        })();

      const filterDepartureTime =
        departureTimeStatus.length === 0 ||
        (product.route?.departureLocation.time &&
          departureTimeStatus.some((range: string) => {
            const hour = parseTimeToHour(product.route.departureLocation.time);
            switch (range) {
              case "before-10am":
                return hour < 10;
              case "10am-5pm":
                return hour >= 10 && hour < 17;
              case "5pm-11pm":
                return hour >= 17 && hour < 23;
              case "after-11pm":
                return hour >= 23 || hour < 5;
              default:
                return true;
            }
          }));

      const filterArrivalTime =
        arrivalTimeStatus.length === 0 ||
        (product.route?.arrivalLocation.time &&
          arrivalTimeStatus.some((range: string) => {
            const hour = parseTimeToHour(product.route.arrivalLocation.time);
            switch (range) {
              case "before-10am":
                return hour < 10;
              case "10am-5pm":
                return hour >= 10 && hour < 17;
              case "5pm-11pm":
                return hour >= 17 && hour < 23;
              case "after-11pm":
                return hour >= 23 || hour < 5;
              default:
                return true;
            }
          }));

      return (
        filteredRate &&
        filteredPrice &&
        filterFlight &&
        filterTravel &&
        filterTrip &&
        filterBoarding &&
        filterDropping &&
        filterDepartureTime &&
        filterArrivalTime &&
        filterBusName &&
        filterBusType
      );
    });

    const sortedProducts = sortProducts(filteredProducts);
    setShowProduct(sortedProducts);
    dispatch({ type: "allBuses", payload: value });
    dispatch({ type: "filteredBuses", payload: sortedProducts });
    const params = new URLSearchParams(searchParams);
    ["rate", "price", "trip", "flights", "travel"].forEach((name) => params.delete(name));

    rateStatus.forEach((rate: string) => {
      params.append("rate", rate);
    });

    if (!isNaN(priceStatus.min) && !isNaN(priceStatus.max)) {
      params.set("min", `${priceStatus.min}`);
      params.set("max", `${priceStatus.max}`);
    }

    flightStatus.forEach((f: string) => {
      params.append("flights", f);
    });

    travelStatus.forEach((t: string) => {
      params.append("travel", t);
    });

    tripDurationStatus.forEach((trip: string) => {
      params.append("trip", trip);
    });

    router.push(pathname + "?" + params.toString());
  }, [
    rateStatus,
    priceStatus,
    value,
    router,
    tripDurationStatus,
    travelStatus,
    flightStatus,
    boardingStatus,
    droppingStatus,
    departureTimeStatus,
    arrivalTimeStatus,
    busNameStatus,
    busTypeTags,
    sortBy,
    sortOrder,
    pathname,
  ]);

  return showProduct;
};

export default useFilterTour;
