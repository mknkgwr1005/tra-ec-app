import React from "react";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { useSelector } from "react-redux";
import { getUserId } from "../../../reducks/reducks/users/selectors";
import { db } from "../../../firebase";

const useStyles = makeStyles({
  list: {
    height: 128,
  },
  image: {
    objectFit: "cover",
    margin: 16,
    height: 96,
    width: 96,
  },
  text: {
    width: "100%",
  },
});

const FavouriteListItem = (props) => {
  const classes = useStyles();
  const selector = useSelector((state) => state);

  const image = props.favourite.images[0].path;
  const price = props.favourite.price.toLocaleString();
  const name = props.favourite.name;
  const size = props.favourite.size;

  const uid = getUserId(selector);

  const removeProductFromFavourite = (id) => {
    return db
      .collection("users")
      .doc(uid)
      .collection("favourite")
      .doc(id)
      .delete();
  };

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt="商品画像" />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={"サイズ" + size}></ListItemText>
        <ListItemText primary={"/" + price}></ListItemText>
        <IconButton
          onClick={() =>
            removeProductFromFavourite(props.favourite.favouriteId)
          }
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default FavouriteListItem;
