import { createReducer } from "@reduxjs/toolkit";

interface ITourReducerProps {
  [key: string]: any;
  flightStatus: string[];
  travelStatus: string[];
  tripDurationStatus: string[];
  filterTourTags: string[];
  boardingStatus: string[];
  droppingStatus: string[];
  departureTimeStatus: string[];
  arrivalTimeStatus: string[];
  busNameStatus: string[]; // ✅ New field
  sortBy: string; // ✅ NEW
  busTypeTags: string[];
  allBuses: IBaseProps[];       // ✅ NEW
  filteredBuses: IBaseProps[];  // ✅ NEW
  
}

const initialState: ITourReducerProps = {
  flightStatus: [],
  travelStatus: [],
  tripDurationStatus: [],
  filterTourTags: [],
  boardingStatus: [],
  droppingStatus: [],
  departureTimeStatus: [],
  arrivalTimeStatus: [],
  busNameStatus: [], // ✅ Initial state
  sortBy: "", // ✅ NEW
  busTypeTags: [],
  sortOrder: "asc", // ✅ Added
  allBuses: [],            // ✅ NEW
  filteredBuses: [],       // ✅ NEW
  
};

export const tourFilterReducer = createReducer(initialState, {
  flightStatus: (state, action) => {
    state.flightStatus = action.payload;
  },
  travelStatus: (state, action) => {
    state.travelStatus = action.payload;
  },
  tripDurationStatus: (state, action) => {
    state.tripDurationStatus = action.payload;
  },
  filterTourTags: (state, action) => {
    state.filterTourTags = action.payload;
  },
  boardingStatus: (state, action) => {
    state.boardingStatus = action.payload;
  },
  droppingStatus: (state, action) => {
    state.droppingStatus = action.payload;
  },
  departureTimeStatus: (state, action) => {
    state.departureTimeStatus = action.payload;
  },
  arrivalTimeStatus: (state, action) => {
    state.arrivalTimeStatus = action.payload;
  },
  busNameStatus: (state, action) => {
    state.busNameStatus = action.payload;
  }, // ✅ New reducer case
  busTypeTags: (state, action) => {
    state.busTypeTags = action.payload;
  },
  setSort: (state, action) => {
    const { sortBy } = action.payload;
    if (state.sortBy === sortBy) {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    } else {
      state.sortBy = sortBy;
      state.sortOrder = "asc";
    }
  },
  allBuses: (state, action) => {
    state.allBuses = action.payload;
  },
  filteredBuses: (state, action) => {
    state.filteredBuses = action.payload;
  },
  
});
