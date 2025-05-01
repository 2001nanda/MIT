interface sliderImg { img: string }

interface IBaseProps {
  filter(arg0: (product: IBaseProps) => boolean): unknown;
  id?: number;
  img?: string;
  offer?: boolean;
  label?: string;
  category?: string;
  district?: string;
  facility?: string;
  language?: string;
  rate: string; 
  flights: string[];
  travel: string; 
  trip: string;
  price?: number;
  iconImg?: [{ id: number; img: string; title: string }];
  title?: string;
  btn?: string;
  deliverTime?:dtring |string
  offerBox?: string;
  hotelImg?: [{ id: number; img: string; title: string }];
  place?: string;
  type?: string;
  sliderImg?: sliderImg[];
  multipleImg?: [{id:number, img: string }];
  desc?: string;
  video?: string;
  span?: string | undefined;
  plane?: string;
  include: string;
  star?: string;
  airline?: string;
  dxb?: string;
  departureTime?: string;
  stop?: string;
  stopTime?: string;
  cdg?: string;
  arriveTime?: string;
  priceTag?: string;
  gridImg?: string;
  name?: string;
  cabType?: string;
  capacity?: number;
  luggage?: string;
  option?: string[];
  fare?: string;
  item?: string;
  time?: string;
  cost?: string;
  cuisines?: string;
  popular?: string;
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
interface IBusFare {
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

 interface ILocation {
  name: string;
  date: string;
  time: string;
  subLocations: ISubLocation[];
}

 interface IRoute {
  departureLocation: ILocation;
  arrivalLocation: ILocation;
}