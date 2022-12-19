import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/Uikit";
import { resetPassword } from "../reducks/reducks/users/operations";

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text_headline u-text-center">パスワードのリセット</h2>
      <div className="module-spacer--medium">
        <TextInput
          fullWidth={true}
          label={"メールアドレス"}
          multiline={false}
          required={true}
          minRows={1}
          value={email}
          type={"email"}
          onChange={inputEmail}
        />

        <div className="module-spacer--medium"></div>
        <div className="center">
          <PrimaryButton
            label={"リセットパスワード"}
            onClick={() => dispatch(resetPassword(email))}
          />
        </div>
      </div>
    </div>
  );
};

export default Reset;
