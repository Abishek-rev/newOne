import React, { useCallback, useEffect } from "react";
import { set, useForm, useWatch } from "react-hook-form";
import "../ShoppingCart/ShoppingCart.css";
import "./AddressAddEdit.css";
import { useState } from "react";
import { useMemo, useRef } from "react";
import Chip from "@mui/material/Chip";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "../Data/IndiasData";
import { Autocomplete, TextField } from "@mui/material";
import Input from "react-phone-number-input/input";
import { addAddressData } from "../../Api/Address";
import { userDataGet } from "../../Api/Local";
import { hideLoader, showLoader } from "../../Features/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "../Toast/ShowToast";
import { EditedAddress } from "../../Api/Address";
import { zipcode } from "../../Data/zipcodes.my";
import { haversine } from "../../Features/GeoFench/GeoFench";
import { COMPANY_lat, COMPANY_lan } from "../../App/GlobalEnv";

function options() {
    
  return (
    <div>
      <div className="checkoutDetailsFormRow">
        <select
          {...register("country", { required: "Country is required" })}
          onChange={(event) => {
            handleCountryChange(event);
          }}
          // onChange={handleCountryChange}
        >
          <option value="">Country / Region</option>
          {countries.filter((x) => x.name == "India").map((item) => (
            <option value={item.name}>{item.name}</option>
          ))}

          {/* <option value="Malaysia">{Malaysia}</option> */}
        </select>
        {errors.country && (
          <p className="is-error-text">{errors.country.message}</p>
        )}
      </div>
    </div>
  );
}

export default options;
