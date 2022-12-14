import React from "react";

const ImagePreview = (props) => {
  return (
    <div className="p-media_thumb">
      <img
        src={props.path}
        alt="プレビュー画像"
        onClick={() => props.delete(props.id)}
      />
    </div>
  );
};

export default ImagePreview;
