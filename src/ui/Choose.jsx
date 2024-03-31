import { useState } from "react";
import Select from "./Select";
import { useBookings } from "../features/bookings/useBookings";
import { useSearchParams } from "react-router-dom";

export default function Choose() {
  const [searchParams, setSearchParams] = useSearchParams();
  const curValue = searchParams.get("show") | "all";
  function handleChange(e) {
    searchParams.set("show", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      onChange={handleChange}
      value={curValue}
      options={[
        { value: "all", label: "All" },
        { value: 5, label: "5" },
        { value: 10, label: "10" },
      ]}
    />
  );
}
