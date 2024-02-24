import { Card } from "../components";
import { HelperFunctions } from "../utils/helpers";
import WeatherIcons from "../assets/constants.js";
import FetchLocations from "../hooks/fetchLocation.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const locations = FetchLocations();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState(
    (Object.keys(localStorage).includes("favorites") &&
      JSON.parse(localStorage.getItem("favorites"))) ??
      {}
  );

  useEffect(() => {
    favorites && Object.keys(favorites).length > 0
      ? localStorage.setItem("favorites", JSON.stringify(favorites))
      : localStorage.removeItem("favorites");
  }, [favorites]);
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="max-w-xs mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 md:max-w-3xl lg:max-w-full">
        {Object.keys(favorites).length > 0 ? (
          Object.keys(favorites)?.map((item) => {
            const obj = locations?.find((loc) => loc.key === item);
            return (
              <div key={item} className="col-span-1">
                <Card
                  isFavorite={true}
                  setIsFavorite={setIsFavorite}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  day={HelperFunctions.getDayName(
                    new Date(favorites[item][0].LocalObservationDateTime)
                  )}
                  date={new Date(
                    favorites[item][0].LocalObservationDateTime
                  ).toLocaleDateString()}
                  city={obj?.name}
                  temp={`${Math.round(
                    favorites[item][0].Temperature.Metric.Value
                  )} °${favorites[item][0].Temperature.Metric.Unit}`}
                  icon={
                    WeatherIcons.find(
                      (icon) => icon.icon_no === favorites[item][0].WeatherIcon
                    )?.icon
                  }
                  cityKey={obj?.key}
                  iconPhrase={favorites[item][0].WeatherText}
                  current={item}
                  onClick={() =>
                    navigate(`/`, {
                      state: {
                        key: item,
                        name: obj?.name,
                        rank: obj?.rank,
                      },
                    })
                  }
                />
              </div>
            );
          })
        ) : (
          <div>
            <p className="text-black dark:text-white lg:text-2xl text-center font-mont">
              No Favorites Available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
