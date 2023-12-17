import React from "react";
import "./main.css";

import { TollCalculator } from "../Components/TollCalculator";
import { MapComponent } from "../Components/MapComponent";

export const Main = () => {
  return (
    <div className="main-page-container">
      <div className="p-8 font-bold text-6xl text-left">
        US Toll Calculator – Google Maps with Tolls & Gas Costs{" "}
      </div>
      <p className="p-8 text-left">
        {" "}
        Looking to calculate toll costs between cities across Jamaica? Use the
        Jamaica Toll Calculator App! See trip cost breakdown - tolls, fuel and
        other applicable charges, toll plazas, discounts, etc. Travel on the
        cheapest or the fastest routes to your destination. For all vehicles -
        car, truck (2 axle to 9 axle), EV, RV, bus, motorcycle - across all
        Latin American and North American countries. Business? Integrate Toll
        API for pre-trip, on-trip and post-trip toll and route information.
        Still not convinced? Just enter your origin, destination, and Submit to
        see tolls in seconds. Fill the optional fields - mileage, toll tags etc.
        - to get more accurate results.
      </p>

      <TollCalculator />
    </div>
  );
};
