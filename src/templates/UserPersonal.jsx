import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/Uikit";
import {
  addPersonalData,
  fetchPersonalData,
} from "../reducks/reducks/users/operations";
import { getPersonalData } from "../reducks/reducks/users/selectors";
import { useSelector } from "react-redux";

const UserPersonal = () => {
  const dispatch = useDispatch();

  const selector = useSelector((state) => state);
  const userPersonalData = getPersonalData(selector);

  useEffect(() => {
    dispatch(fetchPersonalData());
  }, []);

  useEffect(() => {
    if (userPersonalData.length > 0) {
      userPersonalData.map((data) => {
        setMyname(data.name);
      });
    }
  }, []);

  useEffect(() => {
    if (userPersonalData.length > 0) {
      userPersonalData.map((data) => {
        setAddress(data.address);
      });
    }
  }, []);

  useEffect(() => {
    if (userPersonalData.length > 0) {
      userPersonalData.map((data) => {
        setZipCode(data.zipcode);
      });
    }
  }, []);

  useEffect(() => {
    if (userPersonalData.length > 0) {
      userPersonalData.map((data) => {
        setTelePhone(data.telephone);
      });
    }
  }, []);

  const [myname, setMyname] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelePhone] = useState("");
  const [zipcode, setZipCode] = useState("");

  const inputMyName = useCallback(
    (event) => {
      setMyname(event.target.value);
    },
    [setMyname]
  );
  const inputAddress = useCallback(
    (event) => {
      setAddress(event.target.value);
    },
    [setAddress]
  );
  const inputTel = useCallback(
    (event) => {
      setTelePhone(event.target.value);
    },
    [setTelePhone]
  );
  const inputZipCode = useCallback(
    (event) => {
      setZipCode(event.target.value);
    },
    [setZipCode]
  );

  const savePersonalData = useCallback(() => {
    dispatch(
      addPersonalData(userPersonalData, {
        name: myname,
        address: address,
        telephone: telephone,
        zipcode: zipcode,
      })
    );
  });

  return (
    <div className="c-section-container">
      <h2 className="u-text_headline u-text-center">アカウント情報の変更</h2>
      <div className="module-spacer--medium">
        <TextInput
          fullWidth={true}
          label={"氏名"}
          multiline={false}
          required={true}
          minRows={1}
          value={myname}
          type={"text"}
          onChange={inputMyName}
        />
        <TextInput
          fullWidth={true}
          label={"郵便番号"}
          multiline={false}
          required={true}
          minRows={1}
          value={zipcode}
          type={"telephone"}
          onChange={inputZipCode}
        />
        <TextInput
          fullWidth={true}
          label={"住所"}
          multiline={false}
          required={true}
          minRows={1}
          value={address}
          type={"address"}
          onChange={inputAddress}
        />
        <TextInput
          fullWidth={true}
          label={"電話番号"}
          multiline={false}
          required={true}
          minRows={1}
          value={telephone}
          type={"telephone"}
          onChange={inputTel}
        />
        <div className="module-spacer--medium"></div>
        <div className="center">
          <PrimaryButton
            label={"保存"}
            onClick={savePersonalData}
            disabled={
              myname === "" ||
              address === "" ||
              telephone === "" ||
              zipcode === ""
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UserPersonal;
