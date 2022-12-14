import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducks/reducks/products/operations";
import { TextInput, SelectBox, PrimaryButton } from "../components/Uikit";
import { ImageArea, SetSizesArea } from "../components/Uikit/Products";
import { db } from "../firebase";

const ProductEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split("/product/edit")[1];

  if (id !== "") {
    id = id.split("/")[1];
  }

  const [order, setOrder] = useState(0),
    [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState(""),
    [price, setPrice] = useState(""),
    [gender, setGender] = useState(""),
    [images, setImages] = useState(""),
    [sizes, setSizes] = useState([]),
    [categories, setCategories] = useState([]);

  const inputName = useCallback((event) => {
    setName(event.target.value);
  });
  const inputDescription = useCallback((event) => {
    setDescription(event.target.value);
  });
  const inputPrice = useCallback((event) => {
    setPrice(event.target.value);
  });

  const handleCountOrder = async () => {
    const lastOrder = await db
      .collection("products")
      .orderBy("order", "desc")
      .get();
    if (lastOrder.docs[0].data().order) {
      const newNum = lastOrder.docs[0].data().order;
      setOrder(newNum + 1);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleCountOrder();
  });

  useEffect(() => {
    db.collection("categories")
      .orderBy("order", "asc")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name,
          });
        });
        setCategories(list);
      });
  }, []);

  const genderes = [
    { id: "male", name: "男" },
    { id: "female", name: "女" },
  ];

  // すでにある商品を編集するとき
  useEffect(() => {
    if (id !== "") {
      db.collection("products")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setName(data.name);
          setImages(data.images);
          setGender(data.gender);
          setCategory(data.category);
          setPrice(data.price);
          setDescription(data.description);
          setSizes(data.sizes);
        });
    }
  }, [id]);

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
        <SetSizesArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--medium"></div>
        <div className="center">
          <PrimaryButton
            label={"商品情報を保存"}
            onClick={() =>
              dispatch(
                saveProduct(
                  order,
                  id,
                  name,
                  description,
                  category,
                  gender,
                  price,
                  images,
                  sizes
                )
              )
            }
          ></PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
