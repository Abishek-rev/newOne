import React, { useState, useMemo, useRef } from "react";
import "./InputField.css";
import { countries } from "./Data/IndiasData";

export default function InputField() {
  const reRender= useRef(0);
  reRender.current+=1
  const [state, setState] = useState([]);
  const [cities, setCities] = useState([]);

  // Memoize the countries data to avoid recalculating it on every render
  const memoizedCountries = useMemo(() => countries, []);

  function gtState(countryName) {
    if (countryName) {
      const singleCountryData = memoizedCountries.find(
        (x) => x.name === countryName
      );
      return singleCountryData ? singleCountryData.states : [];
    } else {
      console.log("There are no states. Please try again.");
      return [];
    }
  }

  function handleChangeStateName(e) {
    if (e) {
      const stateName = e.target.getAttribute("value");
      const singleStateData = state.find((y) => y.name === stateName);
      if (singleStateData) {
        console.log(singleStateData.cities);
        setCities(singleStateData.cities);
      }
    } else {
      setCities([]);
    }
  }

  function gtValue(event) {
    const countryName = event.target.value;
    setState(gtState(countryName));
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div style={{ gap: 10 }}>
        <h1>Filter Data</h1>
        <select onClick={gtValue}>
          <option value="">Select Region</option>
          <option value="India">India</option>
          <option value="Pakistan">Pakistan</option>
        </select>
      </div>
      <div
        style={{
          backgroundColor: "lightblue",
          borderRadius: 10,
          width: "30%",
          display: "flex",
          flexDirection: "row",
          gap: 20,
        }}
      >
        {state.length > 0 && (
          <div style={{ textAlign: "start", paddingLeft: 20 }}>
            <h4>List Of States</h4>
            {state.map((st, index) => (
              <li
                onClick={handleChangeStateName}
                style={{ cursor: "pointer", padding: 5 }}
                value={st.name}
                key={index}
              >
                {st.name}
              </li>
            ))}
          </div>
        )}
        {cities.length > 0 && (
          <div style={{ textAlign: "start", paddingLeft: 20 }}>
            <h4>List Of Cities</h4>
            {cities.map((ct, index) => (
              <li
                style={{ cursor: "pointer", padding: 5 }}
                value={ct}
                key={index}
              >
                {ct}
              </li>
            ))}
          </div>
        )}
      </div>
      <div>RerenderCount:{reRender.current}</div>
    </div>
  );
}
