import { ITravelProps } from "@/components/tour/listing/travel";
import { categoryData } from "@/data/inner-page/page-data";
import { FC, useState } from "react";

interface ICategoryPageProps {
  value: IHotelProps[] | ITravelProps[] | IFlightProps[] |   undefined;
  getCategories: Function;
}
const CategoryPage: FC<ICategoryPageProps> = ({ value, getCategories }) => {
  const [category, setCategory] = useState("all");
  const filterClick = (type: string) => {
    setCategory(type);
    if (type === "all") {
      getCategories(value);
    } else {
      const filtered: (IHotelProps | ITravelProps | IFlightProps | ITravelProps)[] = (value as (IHotelProps | ITravelProps | IFlightProps  | ITravelProps)[]).filter((item: IHotelProps | ITravelProps | IFlightProps  | ITravelProps) => item.category === type);
      getCategories(filtered);
    }
  };

  return (
    <ul>
      {categoryData.map((item: IFacilityProps,index) => (
        <li key={index} onClick={() => filterClick(item.type)} className={category === item.type ? "active" : ""}>
          {item.type}
        </li>
      ))}
    </ul>
  );
};

export default CategoryPage;
