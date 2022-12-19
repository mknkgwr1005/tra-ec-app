import React, { useCallback } from "react";
import List from "@material-ui/core/List";
import { useSelector, useDispatch } from "react-redux";
import { getUsersFavourite } from "../reducks/reducks/users/selectors";
import { FavouriteListItem } from "../components/Uikit/User";
import { PrimaryButton, GreyButton } from "../components/Uikit";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    maxWidth: 512,
    width: "100%",
  },
});

const FavouriteList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const usersFavourite = getUsersFavourite(selector);

  const backToHome = useCallback(() => {
    dispatch(push("/"));
  }, []);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text_headline">お気に入り</h2>
      <List className={classes.root}>
        {usersFavourite.length > 0 &&
          usersFavourite.map((favourite) => (
            <FavouriteListItem
              key={favourite.favouriteId}
              favourite={favourite}
            />
          ))}
      </List>
      <div className="module-spacer--medium">
        <div className="p-grid_column">
          <div className="module-spacer--extra-extra-small" />
          <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
        </div>
      </div>
    </section>
  );
};

export default FavouriteList;
