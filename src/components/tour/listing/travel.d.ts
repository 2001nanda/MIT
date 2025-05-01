interface ITravelProps {
  id?: number;
  img?: string;
  title?: string;
  span?: string | undefined;
  category?: string;
  rate?: string;
  plane?: string;
  include: string;
  offer?: boolean;
  trip?: string;
  star?: string;
  travel?: string;
  flights?: string;
  price?: number | undefined;
  btn?: string;
  label?: string;
  sliderImg?: { img: string }[];
  multipleImg?: { img: string }[];
  video?: string;
  offerBox?: string;
  iconImg?: { id: number; img: string; title: string }[];
  busId: string;
  busName: string;
  operatorName: string | null;
  opertorNumber: string | null;
  seatsAvailable: number;
  totalSeats: number;
  busStartTime: string;
  basePrice: number;
  totalPrice: number;
  busType: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  liveTracking: boolean;
  reschedulable: boolean;
  rating: number | null;
  fares: IBusFare;
  amenities: any; // Could be typed more specifically
  reviews: any;
  photos: string[] | null;
  videos: string[] | null;
  route: IRoute;
  policy: IPolicy[];
}


export interface IBusFare {
  base: number;
  gst: number;
  toll: number;
  sCharge: number;
  levyCharge: number;
  txnFee: number;
  commission: number;
  totalNetFare: number;
  total: number;
}

export interface ISubLocation {
  id: string;
  name: string;
  time: string;
  address: string;
  landmark: string;
}

export interface ILocation {
  name: string;
  date: string;
  time: string;
  subLocations: ISubLocation[];
}

export interface IRoute {
  departureLocation: ILocation;
  arrivalLocation: ILocation;
}

export interface IPolicy {
  span: string;
  unit: string;
  rate: string;
}

export interface IBus {
  busId: string;
  busName: string;
  operatorName: string | null;
  opertorNumber: string | null;
  seatsAvailable: number;
  totalSeats: number;
  busStartTime: string;
  basePrice: number;
  totalPrice: number;
  busType: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  liveTracking: boolean;
  reschedulable: boolean;
  rating: number | null;
  fares: IBusFare[];
  amenities: any; // Could be typed more specifically
  reviews: any;
  photos: string[] | null;
  videos: string[] | null;
  route: IRoute;
  policy: IPolicy[];
}

export interface IFilters {
  buses: number;
  seaters: number;
  sleeper: number;
  ac: number;
  nonAc: number;
  priceRange: [number, number];
  ratingRange: [number, number];
}

export interface ITourApiResponse {
  traceId: string;
  matchedBuses: IBus[];
  filters: IFilters;
}


interface ITripDurationFilterProps {
  tripDurationFilterCallback?: Function | undefined;
}
