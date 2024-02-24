import { useMemo, useState } from "react";

const SearchBar = ({ setSearch, locations }) => {
  const tempLocations = useMemo(() => structuredClone(locations), [locations]);
  const [city, setCity] = useState("");
  const [autoComplete, setAutoComplete] = useState(false);
  const [filterData, setFilterData] = useState(tempLocations || []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cityObj = locations?.find(
      (item) => item.name.toLowerCase() === city.toLowerCase()
    );
    if (cityObj) {
      setSearch(cityObj);
      setCity("");
      setAutoComplete(false);
    }
  };

  const handleAutoComplete = (e) => {
    const valueSearch = e.target.value;
    setCity(valueSearch);
    if (valueSearch.length >= 1) {
      const result = tempLocations.filter((item) =>
        item.name.toLowerCase().startsWith(valueSearch.toLowerCase())
      );
      if (result.length > 0) {
        setAutoComplete(true);
        setFilterData(result);
      }
    } else setAutoComplete(false);
  };
  const handleCityWeather = (name) => {
    setCity(name);
    setAutoComplete(false);
  };

  return (
    <div className="max-w-md mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-0">
      <div className="relative">
        <div className="border dark:border-white/10 border-black/10 rounded-full p-[6px] overflow-hidden">
          <form onSubmit={handleSubmit} className="flex items-center">
            <div className="flex-grow">
              <input
                required
                pattern="[A-Za-z]+( [A-Za-z]+)*"
                onChange={handleAutoComplete}
                type="city"
                id="city"
                value={city}
                placeholder="Enter city name"
                className="placeholder:text-sm sm:placeholder:text-base w-full sm:py-2 rounded-tl-full rounded-bl-full bg-transparent font-mont border-none outline-none text-lg text-black dark:text-white px-2.5"
              />
            </div>
            <button
              type="submit"
              className="text-sm sm:text-base cursor-pointer bg-[#83D7EE] outline-none border-none rounded-full text-black py-2 px-5 md:text-lg capitalize transition-all duration-300 font-mont font-medium"
            >
              Search
            </button>
          </form>
        </div>
        <div className="px-4 py-2 absolute w-full z-50">
          {autoComplete && (
            <div className="max-h-80 scrollbar overflow-y-auto border rounded-xl dark:border-white/10 border-black/10 p-2 bg-white dark:bg-[#141414] shadow-2xl dark:shadow-zinc-500/30">
              {filterData.map((item) => {
                return (
                  <div key={item.key}>
                    <span
                      onClick={() => handleCityWeather(item.name)}
                      className="block text-black dark:text-white py-2 px-2 cursor-pointer font-mont hover:bg-blue-300/10 rounded-xl"
                    >
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
