import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../layout";
import { productByCategory } from "../../admin/products/FetchApi";
import { isWishReq, unWishReq, isWish } from "./Mixins";

const Submenu = ({ category }) => {
  const history = useHistory();
  return (
    <Fragment>
      {/* Submenu Section */}
      <section className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24">
        <div className="flex justify-between items-center">
          <div className="text-base flex font-medium">
            <span
              className="hover:text-yellow-700 cursor-pointer"
              onClick={(e) => history.push("/")}
            >
              Shop
            </span>
            <span className="mx-1 font-semibold">/</span>
            <span className="text-yellow-700 cursor-default">{category}</span>
          </div>
        </div>
      </section>
      {/* Submenu Section */}
    </Fragment>
  );
};

const AllProduct = ({ products }) => {
  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );
  const history = useHistory();
  const category =
    products && products.length > 0 ? products[0].pCategory.cName : "";
  return (
    <Fragment>
      <Submenu category={category} />
      <section className="m-4 md:mx-8 md:my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products && products.length > 0 && products[0].pStatus === "Active" ? (
          products.map((item, index) => {
            return (
              <Fragment key={index}>
                {item.pStatus !== "Active" ? (
                  ""
                ) : (
                  <div className="relative col-span-1 my-2 mx-[0.9rem] sm:mx-[0.65rem]">
                    <div className=" hover:scale-105">
                      <img
                        onClick={(e) => history.push(`/products/${item._id}`)}
                        className="w-full object-cover object-center cursor-pointer rounded-[15px_15px_5px_5px] shadow-[4px_-4px_14px_3px] shadow-[rgb(161_98_7/44%)] aspect-[4/5]"
                        src={item.pImages[0]}
                        alt=""
                      />
                      <div className="absolute top-0 right-0 mx-2 my-2 md:mx-4">
                        <svg
                          onClick={(e) => isWishReq(e, item._id, setWlist)}
                          className={`${
                            isWish(item._id, wList) && "hidden"
                          } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700 transition-all duration-300 ease-in`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <svg
                          onClick={(e) => unWishReq(e, item._id, setWlist)}
                          className={`${
                            !isWish(item._id, wList) && "hidden"
                          } w-6 h-6 md:w-7 md:h-7 cursor-pointer text-yellow-700 transition-all duration-300 ease-in`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 md:text-lg text-base">
                      <div
                        className="text-gray-600 font-medium leading-tight break-words cursor-pointer hover:scale-110"
                        onClick={(e) => history.push(`/products/${item._id}`)}
                      >
                        {item.pName}
                      </div>
                      <div
                        className="flex items-center space-x-1 ml-4"
                        title="All review"
                      >
                        <span>
                          <svg
                            className="w-4 h-4 fill-current text-yellow-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        </span>
                        <span className="text-gray-700">
                          {item.pRatingsReviews.length}
                        </span>
                      </div>
                    </div>
                    {item.pOffer !== 0 && item.pOffer !== "0" ? (
                      <div className="md:text-[19px] font-semibold text-[#a1510c] text-base">
                        ${item.pOffer}
                        <span className="md:text-[15px] text-[13px] relative top-[1px] right-1 sm:right-[0px] line-through p-1 text-black">
                          ${item.pPrice}
                        </span>{" "}
                      </div>
                    ) : (
                      <div className="md:text-[19px] font-semibold text-[#a1510c] text-base">
                        {" "}
                        ${item.pPrice}
                      </div>
                    )}
                  </div>
                )}
              </Fragment>
            );
          })
        ) : (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">
            No product found
          </div>
        )}
      </section>
    </Fragment>
  );
};

const PageComponent = () => {
  const [products, setProducts] = useState(null);
  const { catId } = useParams();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await productByCategory(catId);
      if (responseData && responseData.Products) {
        setProducts(responseData.Products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <AllProduct products={products} />
    </Fragment>
  );
};

const ProductByCategory = (props) => {
  return (
    <Fragment>
      <Layout children={<PageComponent />} />
    </Fragment>
  );
};

export default ProductByCategory;
