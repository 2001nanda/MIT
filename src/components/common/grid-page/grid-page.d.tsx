import { ITravelProps } from "@/components/tour/listing/travel";

export interface ITablistProps {
  callbackFun: Function;
}

export interface IGridReducerProps {
  gridSize: number;
  gridStyle: string;
  toPage: number;
  totalPages: string;
  productCount: string;
}

export interface IGridLayoutProps {
  value: IBaseProps[] | any;
  grid: IGridReducerProps | any;
  type?: string;
  view?: string;
  trip?: string;
  loading?: "idle" | "pending" | "succeeded" | "failed";
}

export interface IGridListProps {
  grid: IGridReducerProps;
  gridStyle: string | undefined;
  topFilter: boolean | undefined;
  value: IHotelProps[] | ITravelProps[] | IFlightProps[] | undefined;
  mapModal?: boolean;
  grid4Img?: boolean;
  side?: string;
  setMapModal?: Function | any;
  type?: string;
  view?: string;
  callTourModal?: (isOpen: boolean) => void;
  tourModalOpen?: boolean;
  gridSelect?: boolean;
}

export interface IPaginationProps {
  totalPages1: number;
}
