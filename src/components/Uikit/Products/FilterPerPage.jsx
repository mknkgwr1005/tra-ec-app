import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../reducks/reducks/products/operations";

const FilterPerPage = (props) => {
  const filterOfPerPage = [
    { label: "5件", value: 5 },
    { label: "10件", value: 10 },
    { label: "15件", value: 15 },
    { label: "20件", value: 20 },
  ];

  return (
    <section className="c-section-wrapin">
      <Autocomplete
        disablePortal
        className="classes.filter"
        id="combo-box-demo"
        options={filterOfPerPage}
        sx={{ width: 300, marginLeft: "auto" }}
        renderInput={(params) => <TextField {...params} label="表示件数" />}
        isOptionEqualToValue={(option, v) => option.id === v.id}
        onChange={(event, filterOfPerPage) => {
          props.changeProductsPerPage(filterOfPerPage.value);
        }}
      />
    </section>
  );
};

export default FilterPerPage;
