import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import APIFunctions from "../utils/apiFunctions";

const FetchLocations = () => {
  const queryClient = useQueryClient();
  const [locations, setLocations] = useState(
    queryClient.getQueryData(["locations"]) ||
      (localStorage.getItem("locations") &&
        JSON.parse(localStorage.getItem("locations")))
  );
  const { mutate } = useMutation({
    mutationFn: APIFunctions.getLocations,
    mutationKey: ["locations"],
    onSuccess: (data) => {
      const toStore = data.map((item) => ({
        rank: item.Rank,
        key: item.Key,
        name: item.LocalizedName,
      }));
      queryClient.setQueryData(["locations"], toStore);
      localStorage.setItem("locations", JSON.stringify(toStore));
      setLocations(toStore);
    },
    onError: (error) => {
      console.error("error==>", error);
    },
    retry: 0,
  });
  useEffect(() => {
    if (!(localStorage.getItem("locations") || locations)) mutate();
  }, [locations, mutate]);
  return locations;
};
export default FetchLocations;
