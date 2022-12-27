import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterPerPage, ProductCard } from "../components/Uikit/Products";
import { fetchProducts } from "../reducks/reducks/products/operations";
import { getProducts } from "../reducks/reducks/products/selectors";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { db } from "../firebase";

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

  const [productsPerPage, setProductsPerPage] = useState(5);
  const [allProductsLength, setAllProductsLength] = useState(
    parseInt(products.length)
  );
  const [currentPage, setcurrentPage] = useState(1);
  // useRefを使って、前の値を保持する
  const usePrevious = (value) => {
    const ref = useRef(value);
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  let beforeValue = usePrevious(currentPage);
  const firstProduct = products[0];
  const productsLength = products.length;
  const lastProduct = products[productsLength - 1];

  /**すべての商品を取得 */
  const getAllProduct = () => {
    db.collection("products")
      .get()
      .then((snapshot) => {
        setAllProductsLength(snapshot.size);
      });
  };

  const handleChangePage = (event, value) => {
    changeCurrentPage(value);
  };

  useEffect(() => {
    dispatch(
      fetchProducts(
        gender,
        category,
        productsPerPage,
        currentPage,
        lastProduct,
        beforeValue,
        firstProduct
      )
    );
  }, [query]);

  useEffect(() => {
    if (category === "") {
      getAllProduct();
    } else if (category !== "" && currentPage > 1) {
      /**フィルタリングしたとき、ページの総数を変更して、ページを1ページ目に戻す */
      resetPage(1);
      changePageTotalNum(products.length);
    }
  });

  const resetPage = (num) => {
    setcurrentPage(num);
  };

  const changePageTotalNum = (allProductNum) => {
    setAllProductsLength(allProductNum);
    // dispatch(fetchProducts());
  };

  const changeCurrentPage = (nextPage) => {
    setcurrentPage(nextPage);
    dispatch(
      fetchProducts(
        gender,
        category,
        productsPerPage,
        nextPage,
        lastProduct,
        beforeValue,
        firstProduct
      )
    );
  };

  const changeProductsPerPage = (value) => {
    setProductsPerPage(value);
    dispatch(
      fetchProducts(
        gender,
        category,
        value,
        currentPage,
        lastProduct,
        beforeValue,
        firstProduct
      )
    );
  };

  return (
    <section className="c-section-wrapin">
      <FilterPerPage
        changeProductsPerPage={changeProductsPerPage}
      ></FilterPerPage>
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
