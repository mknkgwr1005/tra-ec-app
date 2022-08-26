import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    height: 48,
    width: 48,
  },
});

const SizeTable = (props) => {
  const classes = useStyles();

  const sizes = props.sizes;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {props.sizes.length > 0 &&
            props.sizes.map((item, index) => (
              <TableRow key={item.size}>
                <TableCell component="th" scope="row">
                  {item.size}
                </TableCell>
                <TableCell>残り{item.quantity}点</TableCell>
                {item.quantity > 0 ? (
                  <IconButton
                    className={classes.iconCell}
                    onClick={() => props.addProduct(item.size)}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                ) : (
                  <div>売り切れ</div>
                )}
                <TableCell className={classes.iconCell}></TableCell>
                <TableCell className={classes.iconCell}>
                  <IconButton>
                    <FavoriteBorderIcon
                      onClick={() =>
                        props.addFavourite(props.product, item.size)
                      }
                    ></FavoriteBorderIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;
