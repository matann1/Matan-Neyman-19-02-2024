import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, SearchBar } from "../components";
import WeatherIcons from "../assets/constants.js";
import { HelperFunctions } from "../utils/helpers.js";
import FetchLocations from "../hooks/fetchLocation.js";
import apiFunctions from "../utils/apiFunctions.js";

const defaultCity = {
  key: "215854",
  name: "Tel Aviv",
  rank: 15,
};

const Home = () => {
  const locations = FetchLocations();
  const queryClient = useQueryClient();
  const [forecasts, setForecasts] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState(
    (Object.keys(localStorage).includes("favorites") &&
      JSON.parse(localStorage.getItem("favorites"))) ||
      {}
  );

  const [search, setSearch] = useState(
    (localStorage.getItem("search") &&
      JSON.parse(localStorage.getItem("search"))) ||
      defaultCity
  );
  const [current, setCurrent] = useState(
    (Object.keys(localStorage).includes(search?.key) &&
      JSON.parse(localStorage.getItem(search?.key))) ||
      []
  );
  const [unit, setUnit] = useState("C");
  const setSearchState = (obj) => {
    localStorage.setItem("search", JSON.stringify(obj));
    setSearch(obj);
  };
  const { mutate } = useMutation({
    mutationFn: apiFunctions.getCurrentCity,
    mutationKey: [search?.key],
    onSuccess: (data) => {
      queryClient.setQueryData([search?.key], data);
      localStorage.setItem(search?.key, JSON.stringify(data));
      setCurrent(data);
    },
    onError: (error) => {
      setSearch(defaultCity);
      console.error("error==>", error);
    },
    retry: 0,
  });

  const { mutate: forecast } = useMutation({
    mutationFn: apiFunctions.getForecast,
    mutationKey: [`forecast${search?.key}`],
    onSuccess: (data) => {
      queryClient.setQueryData([`forecast${search?.key}`], data);
      setForecasts(data);
    },
    onError: (error) => {
      console.error("error==>", error);
    },
    retry: 0,
  });

  useEffect(() => {
    Object.keys(favorites).length > 0
      ? localStorage.setItem("favorites", JSON.stringify(favorites))
      : localStorage.removeItem("favorites");
  }, [favorites]);

  useEffect(() => {
    const allKeys = Object.keys(localStorage);
    const currentKey = search?.key;

    if (search && !allKeys.includes(currentKey)) {
      mutate(search.key);
    } else if (allKeys.includes(currentKey)) {
      setCurrent(JSON.parse(localStorage.getItem(currentKey)));
    }
    search?.key && forecast(search?.key);
  }, [search]);

  return (
    <div>
      <SearchBar setSearch={setSearchState} locations={locations} />
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="flex flex-col  min-[955px]:gap-6 lg:gap-10  min-[955px]:items-center min-[955px]:flex-row">
          <div className="min-[955px]:w-1/2">
            <div className="max-w-xs mx-auto">
              <Card
                isFavorite={favorites?.hasOwnProperty(search?.key)}
                setIsFavorite={setIsFavorite}
                favorites={favorites}
                setFavorites={setFavorites}
                day={HelperFunctions.getDayName(
                  new Date(current[0]?.LocalObservationDateTime)
                )}
                date={new Date(
                  current[0]?.LocalObservationDateTime
                ).toLocaleDateString()}
                city={locations?.find((loc) => loc.key === search?.key)?.name}
                temp={`${
                  unit === "C"
                    ? HelperFunctions.fahrenheitToCelsius(
                        current[0]?.Temperature.Imperial.Value
                      )
                    : current[0]?.Temperature.Imperial.Value
                } °${unit || current[0]?.Temperature.Imperial.Unit}`}
                icon={
                  WeatherIcons.find(
                    (item) => item.icon_no === current[0]?.WeatherIcon
                  )?.icon
                }
                cityKey={search.key}
                iconPhrase={current[0]?.WeatherText}
                current={current}
              />
            </div>
          </div>
          <div className="mt-12  min-[955px]:mt-0  min-[955px]:w-1/2">
            <div className="">
              <div className="flex items-center space-x-1.5 pb-6 font-mont text-black dark:text-white">
                <button
                  className={`${
                    unit === "C"
                      ? "bg-[#83D7EE] border-transparent"
                      : "bg-transparent border-black/20 dark:border-white/10"
                  } w-10 h-10 rounded-full text-lg border`}
                  onClick={() => setUnit("C")}
                >
                  °C
                </button>
                <span className="h-6 w-[1px] dark:bg-white/20 bg-black/30 block"></span>
                <button
                  className={`${
                    unit === null
                      ? "bg-[#83D7EE] border-transparent"
                      : "bg-transparent border-black/20 dark:border-white/10"
                  } w-10 h-10 rounded-full text-lg border`}
                  onClick={() => setUnit(null)}
                >
                  °F
                </button>
              </div>
              <div className="grid grid-cols-2 min-[460px]:grid-cols-3 min-[540px]:grid-cols-4 gap-4">
                {forecasts &&
                  forecasts?.DailyForecasts?.map((forecast) => {
                    let convertFunction = null;
                    if (unit) {
                      unit === "C" &&
                        (convertFunction = HelperFunctions.fahrenheitToCelsius);
                    }
                    const tempRange = `${
                      convertFunction
                        ? convertFunction(forecast.Temperature.Minimum.Value)
                        : forecast.Temperature.Minimum.Value
                    } - ${
                      convertFunction
                        ? convertFunction(forecast.Temperature.Maximum.Value)
                        : forecast.Temperature.Maximum.Value
                    } °${unit || forecast.Temperature.Maximum.Unit}`;
                    return (
                      <div
                        key={forecast.EpochDate}
                        className="col-span-1 border-black/10 dark:border-white/10 border py-2 rounded-md"
                      >
                        <div>
                          <p className="font-bold text-md dark:text-white text-black font-mont text-center">
                            {HelperFunctions.getDayName(
                              new Date(forecast.Date)
                            )}
                          </p>
                          <div className="flex items-center justify-center py-3">
                            <img
                              src={
                                WeatherIcons.find(
                                  (item) => item.icon_no === forecast.Day.Icon
                                )?.icon
                              }
                              alt={forecast.Day.IconPhrase}
                            />
                          </div>
                          <p className="font-medium text-sm dark:text-white text-black font-mont text-center">
                            {tempRange}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
