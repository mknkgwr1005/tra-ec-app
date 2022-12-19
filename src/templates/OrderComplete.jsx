import { createStyles, makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton, GreyButton } from "../components/Uikit";
import { push } from "connected-react-router";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      fontSize: 30,
    },
  })
);

const OrderComplete = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const backToHome = useCallback(() => {
    dispatch(push("/"));
  }, []);

  return (
    <section className="c-section-wrapin">
      <div className={classes.title}>注文完了しました！</div>
      <PrimaryButton label={"TOPへ戻る"} onClick={backToHome} />
    </section>
  );
};

export default OrderComplete;
