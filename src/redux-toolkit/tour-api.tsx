import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { ITravelProps } from "@/components/tour/listing/travel";

// Async thunk to fetch tour data
export const getTourData = createAsyncThunk<ITravelProps[], { from: string; to: string; date: string }>(
  "tour/getTourData",
  async ({ from, to, date }) => {
    const response = await axios.get("https://localhost:44370/api/My/searchtbus", {
      params: { from, to, date, _t: new Date().getTime() }, // cache buster
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    const buses = response.data.matchedBuses;

    const transformedData: ITravelProps[] = buses.map((bus: any) => ({
      id: parseInt(bus.busId.split("#")[0]),
      title: bus.busName || "Unnamed Bus",
      category: bus.busType || "",
      rate: bus.rating ? bus.rating.toString() : "0",
      price: bus.totalPrice,
      span: bus.duration ? `${Math.floor(bus.duration / 60)}h ${bus.duration % 60}m` : undefined,
      plane: `${bus.departureTime} - ${bus.arrivalTime}`,
      include: `Seats Available: ${bus.seatsAvailable}/${bus.totalSeats}`,
      offer: false,
      trip: `${bus.route?.departureLocation?.name} to ${bus.route?.arrivalLocation?.name}`,
      star: bus.rating ? bus.rating.toString() : "0",
      travel: "Bus",
      flights: "Not Applicable",
      btn: "Book Now",
      label: bus.busType,
      video: bus.videos?.[0] || "",
      offerBox: undefined,
      img: bus.photos?.[0] || undefined,
      iconImg: bus.policy?.map((policy: any, idx: number) => ({
        id: idx,
        img: "",
        title: `${policy.span}: ${policy.rate}`,
      })) || [],
      sliderImg: (bus.photos || []).map((img: string) => ({ img })),
      multipleImg: (bus.photos || []).map((img: string) => ({ img })),

      // Extra direct mappings
      busId: bus.busId,
      busName: bus.busName,
      operatorName: bus.operatorName,
      opertorNumber: bus.opertorNumber,
      seatsAvailable: bus.seatsAvailable,
      totalSeats: bus.totalSeats,
      busStartTime: bus.busStartTime,
      basePrice: bus.basePrice ?? 0,
      totalPrice: bus.totalPrice ?? 0,
      busType: bus.busType,
      departureTime: bus.departureTime,
      arrivalTime: bus.arrivalTime,
      duration: bus.duration,
      liveTracking: bus.liveTracking,
      reschedulable: bus.reschedulable,
      rating: bus.rating,
      fares: bus.fares,
      amenities: bus.amenities,
      reviews: bus.reviews,
      photos: bus.photos,
      videos: bus.videos,
      route: bus.route,
      policy: bus.policy
    }));

    return transformedData;
  }
);

// Slice state definition
interface TourState {
  data: ITravelProps[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TourState = {
  data: [],
  loading: "idle",
  error: null,
};

// Create the slice
const TourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTourData.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getTourData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getTourData.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "Error occurred";
    });
  },
});

export default TourSlice.reducer;

// Selector to get tour state
export const selectTour = (state: RootState) => state.tour;
