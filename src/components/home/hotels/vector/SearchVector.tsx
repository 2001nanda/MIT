import SearchBox from "@/components/common/search-box/page";
import { BookRoomsHomesApts } from "@/constant/constant";

interface SearchVectorProps {
  searchType: string;
}

const SearchVector: React.FC<SearchVectorProps> = ({ searchType }) => {
  return (
    <div className="home-content mix-layout smaller-content">
      <div className="bg-transparent">
        <div id="sticky_cls">
          <div className="search-panel">
            <h2 className="title-top text-white">
              {searchType === "bus" ? "Book Your Bus" : BookRoomsHomesApts}
            </h2>
            <div className="search-section">
              <SearchBox classRound="rounded10" searchType={searchType} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchVector;
