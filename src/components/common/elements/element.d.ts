interface IListProductBoxProps {
  data: IBaseProps;
  view?: string;
  type?: string;
}

interface IProductBoxProps {
  data:IBaseProps | ITravelProps;
  view?: string;
  type?: string;
}

export interface IExtendedProps {
  data: IBaseProps;
  grid?: IGridFilterProps;
  view?: string;
}

interface RestaurantProductsProps {
  data: IRestaurantProps; 
  view?: string;
}

interface IThumbnailSliderProps {
  images: iImgDataProps[]|undefined;
  videoData?: string;
  view?: string;
}

interface iImgDataProps {
  id?: number;
  img: string | undefined;
}
[];
export interface IImageSliderProps {
  images: iImgDataProps[] | undefined;
}

interface IHomeImgProps {
  id: number;
  img: string;
  title: string;
}


export interface Fare {
  base: number;
  gst: number;
  toll: number;
  sCharge: number;
  levyCharge: number;
  txnFee: number;
  tMarkUp: number;
  commission: number;
  totalNetFare: number;
  total: number;
}

export interface Seat {
  id: string;
  name: string;
  type: string;
  desc: string;
  status: string; 
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  fare: Fare;
}

export interface ErrorResponse {
  code: string;
  message: string;
}

export interface SeatLayoutResponse {
  traceId: string;
  error: ErrorResponse;
  tripKey: string;
  layout: string;
  seats: Seat[];
  route: Route
}

export interface Route {
  departureLocation: DepartureLocation
  arrivalLocation: ArrivalLocation
}

export interface DepartureLocation {
  name: string
  subLocations: SubLocation[]
}

export interface SubLocation {
  id: string
  name: string
  time: string
  address: string
  landmark: string
  isnextday: boolean
}

export interface ArrivalLocation {
  name: string
  subLocations: SubLocation2[]
}

export interface SubLocation2 {
  id: string
  name: string
  time: string
  address: string
  landmark: string
  isnextday: boolean

}