import React, { useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import { storage } from "../../../firebase";
import ImagePreview from "./imagePreview";

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

const ImageArea = (props) => {
  const classes = useStyles();
  const deleteImage = useCallback(
    (id) => {
      const ret = window.confirm("この画像を削除しますか？");

      if (!ret) {
        return false;
      } else {
        const newImages = props.images.filter((image) => image.id !== id);
        props.setImages(newImages);
        return storage
          .ref("images")
          .child(id)
          .delete();
      }
    },
    [props.images]
  );

  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files;
      let blob = new Blob(file, { type: "image/jpeg" });

      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      const uploadRef = storage.ref("images").child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };
          props.setImages((prevState) => [...prevState, newImage]);
        });
      });
    },
    // 変化があったときのみ、propsからわたってきたsetImagesが再度呼び出される
    [props.setImages]
  );

  return (
    <div>
      <div className="p-grid_list-images">
        {props.images.length > 0 &&
          props.images.map((image) => (
            <ImagePreview
              id={image.id}
              path={image.path}
              key={image.id}
              delete={deleteImage}
            />
          ))}
      </div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <IconButton className="classes.icon">
          <label>
            <AddPhotoAlternateIcon />
            <input
              type="file"
              className="u-display-none"
              id="image"
              onChange={(event) => uploadImage(event)}
            />
          </label>
        </IconButton>
      </div>
    </div>
  );
};

export default ImageArea;
