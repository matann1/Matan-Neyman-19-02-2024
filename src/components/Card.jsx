import { useEffect } from "react";

const Card = ({
  isFavorite,
  setIsFavorite,
  favorites,
  setFavorites,
  day,
  date,
  city,
  temp,
  icon,
  cityKey,
  iconPhrase,
  current,
  onClick,
}) => {
  useEffect(() => {
    setIsFavorite(isFavorite);
  }, [isFavorite, setIsFavorite]);

  return (
    <div
      className="text-white h-[400px] font-mont"
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <div className="weather-side relative rounded-[25px] h-full w-full bg-[url('/photo-bg.avif')] shadow-cardInnerShadow float-left">
        <div className="absolute w-full h-full top-0 left-0 opacity-80 rounded-[25px] bg-myGrad"></div>
        <div className="absolute top-[25px] left-[25px] flex flex-col">
          <h2 className="m-0">
            <p className="text-2xl font-bold">{day}</p>
          </h2>
          <p className="block">{date || ""}</p>
          <p className="inline-block mt-2.5">{city || ""}</p>
          <div
            className="inline-block h-[0.8em] w-auto mr-[5px] mt-10 -ml-5"
            data-feather="map-pin"
          >
            <img
              src={icon || "/50n.png"}
              alt={iconPhrase || "Weather Icon"}
              className="h-[120px] w-auto"
            />
          </div>
        </div>
        <div className="absolute bottom-[25px] left-[25px]">
          <h1 className="m-0 font-bold text-[4em]">{temp || ""}</h1>
          <h3 className="m-0 text-lg leading-none font-bold">
            {iconPhrase || ""}
          </h3>
        </div>
        <div className="absolute top-6 right-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (favorites?.hasOwnProperty(cityKey)) {
                const updatedFavorites = {
                  ...favorites,
                };
                delete updatedFavorites[cityKey];
                setFavorites(updatedFavorites);
              } else {
                const updatedFavorites = {
                  ...favorites,
                  [cityKey]: current,
                };
                setFavorites(updatedFavorites);
              }
              setIsFavorite((prev) => !prev);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={isFavorite ? "red" : "white"}
              className="w-8 h-8 transition-all ease-in-out duration-300"
            >
              <path
                fill={isFavorite ? "red" : "none"}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
