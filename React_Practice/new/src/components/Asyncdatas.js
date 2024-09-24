import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const pincodes = [
  { label: "10001" },
  { label: "10002" },
  { label: "10003" },
  { label: "20001" },
  { label: "20002" },
];

const App = () => {
  let aray = [1, 2, 3];
  console.log("djjkvb",aray.some((x)=>x.valueOf === 0));
  console.log("tyo", aray);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      pincode: null, // Set initial value to null
    },
  });

  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const onSubmit = (formData) => {
    if (formData.pincode) {
      if (editingIndex !== null) {
        // Edit existing pincode
        const updatedData = data.map((pincode, index) =>
          index === editingIndex ? formData.pincode.label : pincode
        );
        setData(updatedData);
        setEditingIndex(null);
        reset();
      } else {
        // Add new pincode
        setData((prevData) => [...prevData, formData.pincode.label]);
        reset();
      }
      reset();
    }
  };

  const handleDelete = (pincodeToDelete) => {
    setData(data.filter((pincode) => pincode !== pincodeToDelete));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const pincodeToEdit = data[index];
    // Set the selected pincode in the form
    reset({ pincode: { label: pincodeToEdit } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pincode CRUD with MUI Autocomplete</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="pincode"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={pincodes}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Pincode" variant="outlined" />
              )}
              onChange={(_, value) => field.onChange(value)} // Pass the entire object
              value={field.value} // Set the current value of the Autocomplete
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          style={{ marginLeft: "10px" }}
        >
          {editingIndex !== null ? "Update" : "Add"}
        </Button>
      </form>

      <h2>Stored Pincodes</h2>
      <ul>
        {data.map((pincode, index) => (
          <li key={index}>
            {pincode}
            <Button
              onClick={() => handleEdit(index)}
              color="primary"
              size="small"
              style={{ marginLeft: "10px" }}
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(pincode)}
              color="secondary"
              size="small"
              style={{ marginLeft: "10px" }}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
