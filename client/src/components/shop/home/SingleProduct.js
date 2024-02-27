import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAllProduct } from "../../admin/products/FetchApi";
import { HomeContext } from "./index";
import { isWishReq, unWishReq, isWish } from "./Mixins";

const SingleProduct = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12 
  const [totalPages, setTotalPages] = useState(0);

  const { data, dispatch } = useContext(HomeContext);
  const { products } = data;
  const history = useHistory();

  /* WhisList State */
  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getAllProduct();
      setTimeout(() => {
        if (responseData && responseData.Products) {
          let fproducts = responseData.Products.filter(
            (produc) => produc.pStatus === "Active"
          );
          
          let pProducts = fproducts.slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage
          );
          const products = pProducts.sort((a, b) => {
            return new Date(b.pDate) - new Date(a.pDate);
          });
          let produ = responseData.Products.filter(
            (produc) => produc.pStatus === "Active"
          );
          setTotalPages(Math.ceil(produ.length / (productsPerPage)))
          dispatch({ type: "setProducts", payload: products });
          dispatch({ type: "loading", payload: false });
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  if (data.loading) {
    return (
      <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
      <div id="shop"></div>
      <div className="m-4 md:mx-8 md:my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products && products.length > 0 ? (
        products.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className="relative col-span-1 my-3 mx-[0.9rem] ">
                <div className=" hover:scale-105">
                  <img
                    onClick={(e) => history.push(`/products/${item._id}`)}
                    className="w-full object-cover object-center cursor-pointer rounded-[15px_15px_5px_5px] shadow-[4px_-4px_14px_3px] shadow-[rgb(161_98_7/44%)] aspect-[4/5]"
                    src={item.pImages[0]}
                    alt=""
                  />
                  {/* WhisList Logic  */}
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
                {/* WhisList Logic End */}
                <div className="flex items-center justify-between mt-2  md:text-lg text-base">
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
                        className="md:w-5 md:h-5 w-4 h-4 fill-current  text-yellow-700"
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
                    ${item.pPrice}
                    <span className="md:text-[15px] text-[13px] relative top-[1px] right-1 sm:right-[0px] line-through p-1 text-black">
                      ${item.pOffer}
                    </span>{" "}
                  </div>
                ) : (
                  <div className="md:text-[19px] font-semibold text-[#a1510c] text-base">
                    {" "}
                    ${item.pPrice}
                  </div>
                )}
              </div>
            </Fragment>
          );
        })
      ) : (
        <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">
          No product found
        </div>
      )}
      </div>
      {data.searchDropdown ? "" :
      totalPages <= 1 ? "" : 
      <div className="text-center mb-12 mt-16 md:mt-20 lg:mt-24">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? 'cursor-not-allowed bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded': "cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded"}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            currentPage === totalPages
          }
          className={currentPage === totalPages ? 'cursor-not-allowed bg-gray-300 ml-3 text-gray-800 font-medium py-2 px-4 rounded': "cursor-pointer bg-gray-300 ml-3 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded"} 
        >
          Next
        </button>
      </div>
      }
    </Fragment>
  );
};

export default SingleProduct;
