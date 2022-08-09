import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/Uikit";
import { signIn } from "../reducks/reducks/users/operations";

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text_headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium">
        <TextInput
          fullWidth={true}
          label={"メールアドレス"}
          multiline={false}
          required={true}
          rows={1}
          value={email}
          type={"text"}
          onChange={inputEmail}
        />
        <TextInput
          fullWidth={true}
          label={"パスワード"}
          multiline={false}
          required={true}
          rows={1}
          value={password}
          type={"text"}
          onChange={inputPassword}
        />
        <div className="module-spacer--medium"></div>
        <div className="center">
          <PrimaryButton
            label={"サインイン"}
            onClick={() => dispatch(signIn(email, password))}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
