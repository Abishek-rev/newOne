import React, { useCallback, useEffect } from "react";
import { set, useForm, useWatch } from "react-hook-form";
import "../ShoppingCart/ShoppingCart.css";
import "./AddressAddEdit.css";
import { useState } from "react";
import { useMemo, useRef } from "react";
import Chip from "@mui/material/Chip";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "../../Data/CountryData";
import { Autocomplete, TextField } from "@mui/material";
import Input from "react-phone-number-input/input";
import { addAddressData } from "../../Api/Address";
import { userDataGet } from "../../Api/Local";
import { CountryDatas } from "../../Data/Malasiya";
import { hideLoader, showLoader } from "../../Features/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "../Toast/ShowToast";
import { EditedAddress } from "../../Api/Address";
import { zipcode } from "../../Data/zipcodes.my";
import { haversine } from "../../Features/GeoFench/GeoFench";
import { COMPANY_lat, COMPANY_lan } from "../../App/GlobalEnv";

function AddressAdd({ OnSave, editableData ,closeDrawerrr}) {
  const dispatch = useDispatch();
  //  console.log("sbhs",data)
  // const renderRef = useRef(0);
  // renderRef.current += 1;
  // const [onSuccess, setonSuccess] = useState();
  const [receiverNumberrrr, setReceiverNumberrrr] = useState("");
  const countrysm = useMemo(() => countries, []);
  const [someC, setSomeC] = useState();
  const [countrys, setCountrys] = useState(countrysm);
  const [states, setStates] = useState([]);
  const storedState = useMemo(() => states, [states]);
  console.log("statesgkhbhgj", states);
  const [cities, setCities] = useState({});

  const storedCities = useMemo(() => cities, [cities]);
  // const pincodes = useMemo(() => zipcode, [zipcode]);

  console.log("cofgffmmon", cities);

  const CountryData = useCallback(
    (name) => {
      return countrys.find((x) => x.name === name);
    },
    [countrys]
  );

  // const Singapore = CountryData("Singapore").name;
  // console.log('Singapore',Singapore);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    trigger,
    control,
    watch,
  } = useForm();

  const [selectedOption, setSelectedOption] = useState("");
  const [resetuuuu, setReset] = useState(false);
  const [othersInput, setOthersInput] = useState("");
  const { isLoading, isSuccess, error, mutate } = useMutation({
    mutationFn: addAddressData,
    onMutate: () => {
      // showToast("Login Process Started", 'success');
      dispatch(showLoader());
    },
    onSuccess: (ddata) => {
      // console.log('dataasda',ddata)
      if (ddata.message) {
        showToast("addressSave", "success");
      } else {
        showToast(" Faild Try again later", "error");
      }
      reset(); // Reset form after submission
      setOthersInput(""); // Reset "Others" input field
      setSelectedOption(""); // Reset the selected chip
      dispatch(hideLoader());
      OnSave(Math.random());
    },
    onError: (err) => {
      var message = "Shome Thing Went WRONG contact Admin";

      if (err.response.data) {
        message = err.response.data;
      }
      console.error(message);

      // console.log('error',err.response.data);
      showToast(message, "errror");
    },
  });

  // const {mutate:address,}=CustomerAddressData()
  const onSubmit = (data) => {
    const saveAsOther =
      selectedOption === "Others" ? othersInput : selectedOption;
    const formData = { ...data, saveAsOther };

    let addressdata = {
      shipment_Customer_Id: userDataGet("user_id"),
      shipment_AddressLine1: formData.address1,
      shipment_AddressLine2: formData.address2,
      shipment_Landmark: formData.landmark,
      shipment_Country: formData.country,
      shipment_State: formData.state,
      shipment_City: formData.city,
      shipment_Pincode: formData.pinCode,
      shipment_Address_Name: formData.saveAsOther,
      shipment_Notes: formData.Notes,
      shipment_default_address: formData.defaultAddress,
      shipment_Receiver_No: formData.receiverNumber,
      shipment_Receiver_Name: formData.receiverName,
      shipment_Status: false,
      shipment_CreatedBy: "admin",
      shipment_UpdatedBy: "admin",
    };

    console.log("juuu", addressdata);

    mutate(addressdata);
    reset(); // Reset form after submission
    setOthersInput(""); // Reset "Others" input field
    setSelectedOption(""); // Reset the selected chip
    dispatch(hideLoader());
    OnSave(Math.random());
    setReset(true);
    // setValue("receiverName","")
    setReceiverNumberrrr("");
    closeDrawerrr();
  };

  const handleChipClick = (option) => {
    setSelectedOption(option);
    if (option !== "Others") {
      setOthersInput(""); // Clear the "Others" input field when switching between options
    }
  };
  const handleCountryChange = (event) => {
    setSomeC(event.target.value);
    setReset(false);
  };
  const handleStateChange = (event, value) => {
    // setCities(value.cities)

    console.log("kvbfvbf", value);
    console.log("utututut", value.cities);
    setCities(value.cities);
    setReset(false);
  };

  // const PincodeHandler=(pincod)=>{

  //   let radioudKM = haversine(
  //     pincod.latitude,
  //     pincod.longitude,
  //     COMPANY_lat,
  //     COMPANY_lan
  //   );

  //   alert(JSON.stringify(pincod));
  // }

  // const country = useWatch({ control, name: "country" });
  const state = useWatch({ control, name: "state" });
  // const number = useWatch({ control, name: "receiverNumber" });
  // const country=watch('country');
  // const state=watch('state');
  // const country = watch('country');
  // console.log("country:", country);
  console.log("djfgdhsf:", state);
  // console.log("number", number);

  useEffect(() => {
    // console.log("jchhv", Malaysia);
    if (someC) {
      const selectedState = CountryDatas.find((x) => x.id == someC);
      setStates(selectedState.states);

      console.log("statesaf", countrys);
      console.log("statesaf", someC);
      console.log("statesaf", selectedState);
    }
  }, [someC, countrys]);

  return (
    <div>
      <div className="checkoutDetailsSection">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Add-Address Details  </h4>
          {/* <p> renderCount: {(renderRef.current += 1)}</p> */}
        </div>
        <div className="checkoutDetailsForm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="checkoutDetailsFormRow">
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Name"
                // onChange={()=>{
                //   trigger("pinCode")
                // }}
              />
              {errors.name && (
                <p className="is-error-text">{errors.name.message}</p>
              )}
            </div>
            <div className="checkoutDetailsFormRow_number">
              <Autocomplete
                options={zipcode}
                getOptionLabel={(option) => option.zipcode || ""}
                onChange={(_, value) => {
                  setTimeout(() => {
                    trigger("pinCode");
                  }, 300);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Pin Code"
                    {...register("pinCode", {
                      required: "Pin Code is required",
                      validate: {
                        pincodeVerfication: (value) => {
                          let radioudKM = haversine(
                            value.latitude,
                            value.longitude,
                            COMPANY_lat,
                            COMPANY_lan
                          );

                          if (!radioudKM) {
                            return "Unfortunately, we do not currently offer delivery to this area";
                          }
                        },
                      },
                    })}
                    InputProps={{
                      ...params.InputProps,
                      style: { fontSize: ".8em" }, // Adjust the font size as needed
                    }}
                    sx={{
                      " .MuiOutlinedInput-root": {
                        paddingRight: "0px !important",
                        textIndent: "10px",
                      },

                      ".MuiSvgIcon-root": {
                        display: "none",
                      },
                      "& .MuiOutlinedInput-root": {
                        padding: "0px",

                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          border: "none",
                        },
                        "&.Mui-focused fieldset": {
                          border: "none",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "1px !important",
                      },
                    }}
                  />
                )}
              />
              {errors.pinCode && (
                <p className="is-error-text">{errors.pinCode.message}</p>
              )}
            </div>
            {/* <div className="checkoutDetailsFormRow">
              <input
                {...register("pinCode", {
                  required: "Pin Code is required",
                  pattern: {
                    value: /^[0-9]{6}$/, // Ensures exactly 6 digits
                    message:
                      "Pin Code must be 6 digits long and contain only numbers",
                  },
                })}
                type="number"
                placeholder="Pin Code"
                // value={editableData.Shipment_Pincode}
              />
              {errors.pinCode && (
                <p className="is-error-text">{errors.pinCode.message}</p>
              )}
            </div> */}
            {/* 
            <div className="checkoutDetailsFormRow">
              <input
                {...register("buildingName", {
                  required: "Building/Apartment is required",
                })}
                type="text"
                placeholder="Building/Apartment"
              />
              {errors.buildingName && (
                <p className="is-error-text">{errors.buildingName.message}</p>
              )}
            </div> */}

            <div className="checkoutDetailsFormRow">
              <input
                {...register("address1", { required: "Address is required" })}
                type="text"
                placeholder="Flat, House no., Building, Company, Apartment"
                // value={editableData.Shipment_AddressLine1}
              />
              {errors.address1 && (
                <p className="is-error-text">{errors.address1.message}</p>
              )}
            </div>

            <div className="checkoutDetailsFormRow">
              <input
                {...register("address2")}
                type="text"
                placeholder="Area, Street, Sector, Village"
                // value={editableData.Shipment_AddressLine2}
              />
            </div>

            <div className="checkoutDetailsFormRow">
              <input
                {...register("landmark")}
                type="text"
                placeholder="Landmark (Optional)"
                // value={editableData.Shipment_Landmark}
              />
            </div>

            <div className="checkoutDetailsFormRow">
              <select
                {...register("country", { required: "Country is required" })}
                onChange={(event) => {
                  handleCountryChange(event);
                }}
                // onChange={handleCountryChange}
              >
                <option value="">Country / Region</option>
                {CountryDatas.filter((x) => x.name == "Malaysia").map(
                  (item) => (
                    <option value={item.id}>{item.name}</option>
                  )
                )}

                {/* <option value="Malaysia">{Malaysia}</option> */}
              </select>
              {errors.country && (
                <p className="is-error-text">{errors.country.message}</p>
              )}
            </div>

            <div className="checkoutDetailsFormRow_twoInput">
              {/* {states.length  ? 
              (<> */}
              {/* <div  className="checkoutDetailsFormRow">
              <input
                {...register("state")}
                type="text"
                placeholder="state"
                onChange={(e)=>{console.log("event",e.target.value)}}
                // value={editableData.Shipment_AddressLine2}
              />
            </div> */}
              <div className="checkoutDetailsFormRow_number">
                <Autocomplete
                  options={storedState}
                  getOptionLabel={(option) => (resetuuuu ? "" : option.name)}
                  onChange={handleStateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="State"
                      {...register("state", {
                        required: "State is required",
                      })}
                      InputProps={{
                        ...params.InputProps,
                        style: { fontSize: ".8em" }, // Adjust the font size as needed
                      }}
                      sx={{
                        " .MuiOutlinedInput-root": {
                          paddingRight: "0px !important",
                          textIndent: "10px",
                        },

                        ".MuiSvgIcon-root": {
                          display: "none",
                        },
                        "& .MuiOutlinedInput-root": {
                          padding: "0px",

                          "& fieldset": {
                            border: "none",
                          },
                          "&:hover fieldset": {
                            border: "none",
                          },
                          "&.Mui-focused fieldset": {
                            border: "none",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "1px !important",
                        },
                      }}
                    />
                  )}
                />
                {errors.state && (
                  <p className="is-error-text">{errors.state.message}</p>
                )}
              </div>

              {/* </> ): ' sdgsdgsgd'} */}
              {/* <div  className="checkoutDetailsFormRow">
              <input
                {...register("city")}
                type="text"
                placeholder="city"
                // value={editableData.Shipment_AddressLine2}
              />
            </div> */}

              <div className="checkoutDetailsFormRow_number">
                <Autocomplete
                  options={storedCities}
                  getOptionLabel={(option) => (resetuuuu ? "" : option.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="city"
                      {...register("city", {
                        required: "city is required",
                      })}
                      InputProps={{
                        ...params.InputProps,
                        style: { fontSize: ".8em" }, // Adjust the font size as needed
                      }}
                      sx={{
                        ".MuiSvgIcon-root": {
                          display: "none",
                        },
                        " .MuiOutlinedInput-root": {
                          paddingRight: "0px !important",
                        },
                        "& .MuiInputBase-root": {
                          paddingRight: "0px",
                        },

                        "& .MuiOutlinedInput-root": {
                          padding: "0px",
                          "& fieldset": {
                            border: "none",
                          },
                          "&:hover fieldset": {
                            border: "none",
                          },
                          "&.Mui-focused fieldset": {
                            border: "none",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "1px !important",
                        },
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <div className="checkoutDetailsFormRow">
              <input
                {...register("receiverName", {
                  required: "Receiver Name is required",
                })}
                type="text"
                placeholder="Receiver Name"
              />
              {errors.receiverName && (
                <p className="is-error-text">{errors.receiverName.message}</p>
              )}
            </div>

            <div className="checkoutDetailsFormRow">
              <Input
                countries={["MY"]}
                value={receiverNumberrrr}
                defaultCountry="MY" // Default to Singapore; change to "MY" for Malaysia
                {...register("receiverNumber", {
                  required: "Receiver Number is required",
                })}
                placeholder="Receiver Number"
                onChange={(value) => {
                  setReceiverNumberrrr(value); // Update state
                  setValue("receiverNumber", value, { shouldValidate: true }); // Update React Hook Form
                }}
              />
              {errors.receiverNumber && (
                <p className="is-error-text">{errors.receiverNumber.message}</p>
              )}
            </div>

            <div className="checkoutDetailsFormRow">
              <textarea
                {...register("Notes")}
                type="text"
                placeholder="Provide details such as building description, a nearby landmark, or other navigation instructions."
              />
            </div>

            <h3>Save as</h3>
            <div className="checkoutDetailsFormCheck">
              <Chip
                label="Home"
                clickable
                color={selectedOption === "Home" ? "primary" : "default"}
                onClick={() => handleChipClick("Home")}
              />
              <Chip
                label="Office"
                clickable
                color={selectedOption === "Office" ? "primary" : "default"}
                onClick={() => handleChipClick("Office")}
              />
              <Chip
                label="Others"
                clickable
                color={selectedOption === "Others" ? "primary" : "default"}
                onClick={() => handleChipClick("Others")}
              />
            </div>

            {selectedOption === "Others" && (
              <div className="checkoutDetailsFormRow">
                <input
                  {...register("saveAsothers", {
                    required: "Please specify the type",
                  })}
                  type="text"
                  placeholder="Specify type"
                  value={othersInput}
                  onChange={(e) => setOthersInput(e.target.value)}
                />
                {errors.others && (
                  <p className="is-error-text">{errors.others.message}</p>
                )}
              </div>
            )}

            <div className="checkoutDetailsFormCheck">
              <label>
                <input {...register("defaultAddress")} type="checkbox" />
                <p>Set as Default Address</p>
              </label>
            </div>

            <button
              style={{
                backgroundColor: "black",
                color: "white",
                border: "none",
                padding: 10,
                cursor: "pointer",
              }}
              type="submit"
            >
              Save & Proceed
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddressAdd;