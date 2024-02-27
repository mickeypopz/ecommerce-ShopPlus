import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { ProductContext } from "./index";
import { createProduct, getAllProduct } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";
import moment from "moment";

const AddProductDetail = ({ categories }) => {
  const { data, dispatch } = useContext(ProductContext);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );
  const myDivRef = useRef(null);

  const [fData, setFdata] = useState({
    pName: "",
    pImages1: "",
    pImages2: "",
    pImages3: "",
    pImages4: "",
    pDescription: "",
    pStatus: "Active",
    pImages: [], // Initial value will be null or empty array
    pCategory: "",
    pPrice: "",
    pOffer: 0,
    pQuantity: "",
    pDate: moment().format("YYYY-MM-DDTHH:mm"),
    success: false,
    error: false,
  });

  const fetchData = async () => {
    let responseData = await getAllProduct();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: responseData.Products,
        });
      }
    }, 1000);
  };

  const subt = () => {
    if (
      fData.pImages1 !== "" &&
      fData.pImages1 !== undefined &&
      fData.pImages1 !== null
    ) {
      if (
        fData.pImages2 !== "" &&
        fData.pImages2 !== undefined &&
        fData.pImages2 !== null
      ) {
        if (
          fData.pImages3 !== "" &&
          fData.pImages3 !== undefined &&
          fData.pImages3 !== null
        ) {
          if (
            fData.pImages4 !== "" &&
            fData.pImages4 !== undefined &&
            fData.pImages4 !== null
          ) {
            setPImage([
              fData.pImages1,
              fData.pImages2,
              fData.pImages3,
              fData.pImages4,
            ]);
          } else {
            setPImage([fData.pImages1, fData.pImages2, fData.pImages3]);
          }
        } else {
          setPImage([fData.pImages1, fData.pImages2]);
        }
      } else {
        setPImage([fData.pImages1]);
      }
    } else {
      console.log("upload image");
    }
  };
  function setPImage(value) {
    setFdata((prevState) => ({
      ...prevState,
      error: false,
      success: false,
      pImages: value,
    }));
  }

  const submitForm = async (e) => {
    e.preventDefault();
    e.target.reset();
    myDivRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

    if (fData.pImages === []) {
      setFdata({ ...fData, error: "Please add at least 1 image" });
      setTimeout(() => {
        setFdata({ ...fData, error: false });
      }, 3000);
    }

    try {
      let responseData = await createProduct(fData);
      if (responseData.success) {
        fetchData();
        setFdata({
          ...fData,
          pName: "",
          pDescription: "",
          pImages: "",
          pImages1: "",
          pImages2: "",
          pImages3: "",
          pImages4: "",
          pStatus: "Active",
          pCategory: "",
          pPrice: "",
          pQuantity: "",
          pOffer: 0,
          pDate: moment().format("YYYY-MM-DDTHH:mm"),
          success: responseData.success,
          error: false,
        });
        setTimeout(() => {
          setFdata({
            ...fData,
            pName: "",
            pDescription: "",
            pImages1: "",
            pImages2: "",
            pImages3: "",
            pImages4: "",
            pImages: "",
            pStatus: "Active",
            pCategory: "",
            pPrice: "",
            pQuantity: "",
            pOffer: 0,
            pDate: moment().format("YYYY-MM-DDTHH:mm"),
            success: false,
            error: false,
          });
        }, 2000);
      } else if (responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error });
        setTimeout(() => {
          return setFdata({ ...fData, error: false, success: false });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: "addProductModal", payload: false })}
        className={`${
          data.addProductModal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.addProductModal ? "" : "hidden"
        } fixed inset-0 scroll flex items-start md:top-8 z-30 justify-center overflow-auto`}
      >
        <div
          ref={myDivRef}
          id="myDiv"
          className="mt-28 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8"
        >
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Product
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={(e) =>
                dispatch({ type: "addProductModal", payload: false })
              }
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          {fData.error ? alert(fData.error, "red") : ""}
          {fData.success ? alert(fData.success, "green") : ""}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="name">Product Name *</label>
                <input
                  value={fData.pName}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pName: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="price">Product Price *</label>
                <input
                  value={fData.pPrice}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pPrice: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="price"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="description">Product Description *</label>
              <textarea
                value={fData.pDescription}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    pDescription: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
                name="description"
                id="description"
                cols={5}
                rows={2}
              />
            </div>
            {/* Most Important part for uploading multiple image */}
            <div className="flex flex-col mt-4">
              <label htmlFor="image">Product Images *</label>
              <span className="text-gray-600 text-xs mb-2">
                Must need 1 images
              </span>
              <input
                value={fData.pImages1}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    pImages1: e.target.value,
                  })
                }
                placeholder="First Image"
                type="text"
                className="px-4 py-2 border focus:outline-none mb-2"
              />
              <input
                value={fData.pImages2}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    pImages2: e.target.value,
                  })
                }
                placeholder="Second Image"
                type="text"
                className="px-4 py-2 border focus:outline-none mb-2"
              />
              <input
                value={fData.pImages3}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    pImages3: e.target.value,
                  })
                }
                placeholder="Third Image"
                type="text"
                className="px-4 py-2 border focus:outline-none mb-2"
              />
              <input
                value={fData.pImages4}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    pImages4: e.target.value,
                  })
                }
                placeholder="Fouth Image"
                type="text"
                className="px-4 py-2 border focus:outline-none mb-2"
              />
              <button
                type="button"
                className="bg-green-600 self-center hover:bg-green-900 text-white font-bold py-2 px-4 rounded "
                onClick={() => subt()}
              >
                Submit Images
              </button>
            </div>
            {/* Most Important part for uploading multiple image */}
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Product Status *</label>
                <select
                  value={fData.pStatus}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pStatus: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-2 border focus:outline-none"
                  id="status"
                >
                  <option name="status" value="Active">
                    Active
                  </option>
                  <option name="status" value="Disabled">
                    Disabled
                  </option>
                </select>
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Product Category *</label>
                <select
                  value={fData.pCategory}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pCategory: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-2 border focus:outline-none"
                  id="status"
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {categories.length > 0
                    ? categories.map(function (elem) {
                        return (
                          <option name="status" value={elem._id} key={elem._id}>
                            {elem.cName}
                          </option>
                        );
                      })
                    : ""}
                </select>
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="quantity">Product in Stock *</label>
                <input
                  value={fData.pQuantity}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pQuantity: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="quantity"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="offer">Offer Price *</label>
                <input
                  value={fData.pOffer}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pOffer: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="offer"
                />
              </div>
            </div>
            <div className="items-center flex flex-col space-y-1 space-x-1">
              <label htmlFor="date">Date</label>
              <input
                value={fData.pDate}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    pDate: e.target.value,
                  })
                }
                type="datetime-local"
                className="px-4 py-2 border focus:outline-none"
                id="date"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                style={{ background: "#303031" }}
                type="submit"
                className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
              >
                Create product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const AddProductModal = (props) => {
  useEffect(() => {
    fetchCategoryData();
  }, []);

  const [allCat, setAllCat] = useState({});

  const fetchCategoryData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      setAllCat(responseData.Categories);
    }
  };

  return (
    <Fragment>
      <AddProductDetail categories={allCat} />
    </Fragment>
  );
};

export default AddProductModal;
