import React from "react";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const PaymentList = (props) => {
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();

  return (
    <div>
      {/* クレジットカード画面 */}
      {props.paymentOptions === "credit" && (
        <>
          <div className="module-spacer--medium" />
          <div className="module-spacer--medium" />
          <PaymentInputsWrapper {...wrapperProps}>
            <svg {...getCardImageProps({ images })} />
            <input {...getCardNumberProps()} />
            <input {...getExpiryDateProps()} />
            <input {...getCVCProps()} />
          </PaymentInputsWrapper>
        </>
      )}
      {/* コンビニ決済画面 */}
      {props.paymentOptions === "convenience" && (
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            コンビニ決済
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="seven_eleven"
              control={<Radio />}
              label="セブンイレブン"
            />
            <FormControlLabel
              value="lawson"
              control={<Radio />}
              label="ローソン"
            />
            <FormControlLabel
              value="family_mart"
              control={<Radio />}
              label="ファミリーマート"
            />
          </RadioGroup>
        </FormControl>
      )}
    </div>
  );
};

export default PaymentList;
