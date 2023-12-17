import React, { useState } from "react";
import { FaExchangeAlt, FaRotate } from "react-icons/fa"; 
import "./tollCalculator.css";

import { calculateToll } from "../utils/tollApi";
import { MapComponent } from "./MapComponent";

export const TollCalculator = function () {
	const [selectedCategory, setSelectedCategory] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [tollResult, setTollResult] = useState(null);
  const [response,setResponse]=useState(null)

  const vehicleCategories = [
    {
      label: "Taxi",
      subcategories: ["2AxlesTaxi"],
    },
    {
      label: "Truck",
      subcategories: ["2AxlesTruck", "3AxlesTruck", "4AxlesTruck"],
    },
    "Motorcycle",
    "Bicycle",
    // Add more categories as needed
  ];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setVehicleType(event.target.value);
    // console.log(event.target.value)
  };

    const handleReverseAddresses = () => {
    // Swap the values of origin and destination
    setOrigin(destination);
    setDestination(origin);
  };

   const handleSubcategoryChange = (event) => {
    setVehicleType(event.target.value);
  };

    const renderOptions = () => {
    return vehicleCategories.map((category, index) => (
      <optgroup key={index} label={typeof category === "object" ? category.label : category}>
        {typeof category === "object" &&
          category.subcategories.map((subcategory, subIndex) => (
            <option key={subIndex} value={subcategory}>
              {subcategory}
            </option>
          ))}
      </optgroup>
    ));
  };

  const handleCalculateToll = async () => {
    try {
      const tollRequest = {
        from: { address: origin },
        to: { address: destination },
        waypoints: waypoints.map((waypoint) => ({ address: waypoint })),
        serviceProvider: "here",
        vehicle: {
          type: vehicleType,
          // Add other vehicle parameters as needed (weight, height, length, axles, emissionClass)
        },
      };

      const result = await calculateToll(tollRequest);
      console.log("@@@@@",result.routes)
      setTollResult(result.routes);
      setResponse(result)
      
    } catch (error) {
      console.error("Error calculating toll:", error);
      // Handle error, e.g., display an error message to the user
    }
  };
  return (
    <div className="toll-container w-full h-96 flex justify-around">
    <div className="toll-calculator-container w-[25%] flex flex-col text-center">
      <div className="location relative">
        <input
          type="text"
          placeholder="Enter Address"
          id="origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="border border-[#c5c5c5] bg-[#f1efef]"
        />
        <input
          type="text"
          placeholder="Enter Address"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border border-[#c5c5c5] bg-[#f1efef]"
        />
        <button onClick={handleReverseAddresses} className="text-sm bg-[#1DA1F2] mt-2 cursor-pointer absolute text-white border border-[#9d9a9a] p-2 rounded-md left-[22rem] top-6">
          <FaExchangeAlt size={20}   />
        </button>
      </div>

      <label htmlFor="vehicleCategory">
        <div className="py-4 font-bold text-left text-[#1DA1F2]">Select Your Vehicle</div>
      </label>
      <select
        id="vehicleCategory"
        onChange={handleCategoryChange}
        value={selectedCategory}
        className="border border-[#c5c5c5]"
      >
        <option value="">Select a category</option>
        {renderOptions()}
      </select>
      {selectedCategory === "Truck" && (
        <select onChange={handleSubcategoryChange} value={vehicleType}>
          <option value="">Select a truck type</option>
          {vehicleCategories
            .find((category) => typeof category === "object" && category.label === "Truck")
            .subcategories.map((subcategory, index) => (
              <option key={index} value={subcategory}>
                {subcategory}
              </option>
            ))}
        </select>
      )}
      <button onClick={handleCalculateToll} className="border border-black py-2 rounded-md my-8 bg-[#1da1f2] text-white" >Submit</button>
      {tollResult && tollResult.length > 0 (
        <div className="toll-calculator-container">
          {tollResult?.map((route,index)=>{
            <li key={index} className="list-none border border-black bg-blue-200">Fuel-{route.costs.fuel}, {route.summary.duration.text},{route.summary.distance.text}</li>
          })}
        </div>
      )}
    </div>
    <MapComponent tollResult={tollResult}/>
    </div>
  );
};
