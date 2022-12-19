import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/Uikit/Products";
import {
  fetchProducts,
  fetchSomeProducts,
} from "../reducks/reducks/products/operations";
import { getProducts } from "../reducks/reducks/products/selectors";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { db } from "../firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);

  // pathの確認
  const query = selector.router.location.search;
  const gender = /^\?gender=/.test(query) ? query.split("?gender=")[1] : "";
  const category = /^\?category=/.test(query)
    ? query.split("?category=")[1]
    : "";

  useEffect(() => {
    dispatch(fetchProducts(gender, category, productsPerPage, currentPage));
  }, [query]);

  const [productsPerPage, setProductsPerPage] = useState(5);
  const [allProductsLength, setAllProductsLength] = useState(
    parseInt(products.length)
  );
  const [currentPage, setcurrentPage] = useState(1);

  /**すべての商品を取得 */
  const getAllProduct = () => {
    db.collection("products")
      .get()
      .then((snapshot) => {
        setAllProductsLength(snapshot.size);
      });
  };

  const handleChangePage = (event, value) => {
    setcurrentPage(value);
    changeCurrentPage(value);
  };

  useEffect(() => {
    if (category === "") {
      getAllProduct();
    } else {
      resetPage(1);
      changeProductsLength(products.length);
    }
  });

  const resetPage = (num) => {
    setcurrentPage(num);
  };

  const changeProductsLength = (productsList) => {
    setAllProductsLength(productsList);
    dispatch(
      fetchProducts(
        gender,
        category,
        productsPerPage,
        currentPage,
        productsList
      )
    );
  };

  const changeCurrentPage = (nextPage) => {
    dispatch(fetchProducts(gender, category, productsPerPage, nextPage));
  };

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              images={product.images}
              price={product.price}
            />
          ))}
      </div>
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(allProductsLength / productsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
          color="primary"
        />
      </Stack>
    </section>
  );
};

export default ProductList;
