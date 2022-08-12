import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducks/reducks/products/operations";
import { TextInput, SelectBox, PrimaryButton } from "../components/Uikit";
import ImageArea from "../components/Uikit/Products/imageArea";

const ProductEdit = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState(""),
    [price, setPrice] = useState(""),
    [gender, setGender] = useState(""),
    [images, setImages] = useState("");

  const inputName = useCallback((event) => {
    setName(event.target.value);
  });
  const inputDescription = useCallback((event) => {
    setDescription(event.target.value);
  });
  const inputPrice = useCallback((event) => {
    setPrice(event.target.value);
  });

  const categories = [
    { id: "tops", name: "トップス" },
    { id: "shirts", name: "シャツ" },
    { id: "pants", name: "パンツ" },
  ];

  const genderes = [
    { id: "male", name: "男" },
    { id: "female", name: "女" },
  ];

  return (
    <section>
      <h2 className="u-text_headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages}></ImageArea>
        <TextInput
          fullWidth={true}
          label={"商品名"}
          multiline={false}
          required={true}
          onChange={inputName}
          rows={1}
          value={name}
          type={"text"}
        />
        <TextInput
          fullWidth={true}
          label={"商品説明"}
          multiline={true}
          required={true}
          onChange={inputDescription}
          rows={1}
          value={description}
          type={"text"}
        />
        <SelectBox
          label={"カテゴリ"}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        ></SelectBox>
        <SelectBox
          label={"性別"}
          required={true}
          options={genderes}
          select={setGender}
          value={gender}
        ></SelectBox>
        <TextInput
          fullWidth={true}
          label={"価格"}
          multiline={false}
          required={true}
          onChange={inputPrice}
          rows={1}
          value={price}
          type={"number"}
        />
        <div className="module-spacer--medium"></div>
        <div className="center">
          <PrimaryButton
            label={"商品情報を保存"}
            onClick={() =>
              dispatch(
                saveProduct(name, description, category, gender, price, images)
              )
            }
          ></PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
