import axiosInstance from "./axiosInstance";
import { EndPoints } from "./helpers";
import toast from "react-hot-toast";

const apiKey = import.meta.env.VITE_API_KEY;
const language = import.meta.env.VITE_API_LANGUAGE;
const createEndPoint = (url) =>
  `${url}?apikey=${apiKey}&language=${language}&details=true`;

export default {
  getLocations: async () => {
    let res = await toast.promise(
      axiosInstance.get(createEndPoint(EndPoints.TOP_CITIES)),
      {
        loading: "Fetching Locations",
        success: "Locations Fetched",
        error: "Error Fetching Locations",
      }
    );
    return res?.data;
  },
  getCurrentCity: async (key) => {
    let res = await toast.promise(
      axiosInstance.get(
        createEndPoint(`${EndPoints.CURRENT_CONDITION}/${key}`)
      ),
      {
        loading: "Fetching Current Weather",
        success: "Current Weather Fetched",
        error: "Error Fetching Current Weather",
      }
    );
    return res?.data;
  },
  getForecast: async (key) => {
    let res = await toast.promise(
      axiosInstance.get(createEndPoint(`${EndPoints.FORECAST}/${key}`)),
      {
        loading: "Fetching Current City Forecast",
        success: "Forecast Fetched",
        error: "Error Fetching Current Forecast",
      }
    );
    return res?.data;
  },
};
