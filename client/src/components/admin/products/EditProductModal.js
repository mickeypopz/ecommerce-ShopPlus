import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { ProductContext } from "./index";
import { editProduct, getAllProduct } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";
import moment from "moment";

const EditProductModal = (props) => {
  const { data, dispatch } = useContext(ProductContext);

  const [categories, setCategories] = useState(null);
  const myDivRef = useRef(null);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [editformData, setEditformdata] = useState({
    pId: "",
    pName: "",
    pDescription: "",
    pImages: [],
    pEditImages: "",
    pImages1: "",
    pImages2: "",
    pImages3: "",
    pImages4: "",
    pStatus: "",
    pCategory: "",
    pQuantity: "",
    pPrice: "",
    pOffer: "",
    pDate: moment().format("YYYY-MM-DDTHH:mm"),
    error: false,
    success: false,
  });

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      setCategories(responseData.Categories);
    }
  };

  useEffect(() => {
    let newprice = 0;
    let oldprice = 0;

    if (
      data.editProductModal.pOffer !== "0" &&
      data.editProductModal.pOffer !== 0 &&
      data.editProductModal.pOffer !== undefined
    ) {
      newprice = data.editProductModal.pPrice;
      oldprice = data.editProductModal.pOffer;
    } else {
      newprice = data.editProductModal.pOffer;
      oldprice = data.editProductModal.pPrice;
    }
    setEditformdata({
      pId: data.editProductModal.pId,
      pName: data.editProductModal.pName,
      pDescription: data.editProductModal.pDescription,
      pImages: data.editProductModal.pImages,
      pStatus: data.editProductModal.pStatus,
      pCategory: data.editProductModal.pCategory,
      pQuantity: data.editProductModal.pQuantity,
      pPrice: oldprice,
      pOffer: newprice,
      pDate: moment().format("YYYY-MM-DDTHH:mm"),
    });
  }, [data.editProductModal]);

  const fetchData = async () => {
    let responseData = await getAllProduct();
    if (responseData && responseData.Products) {
      dispatch({
        type: "fetchProductsAndChangeState",
        payload: responseData.Products,
      });
    }
  };
  const DeleteValue = () => {
    document.getElementById("img1").value = "";
    document.getElementById("img2").value = "";
    document.getElementById("img3").value = "";
    document.getElementById("img4").value = "";
  };
  const subt = () => {
    if (
      editformData.pImages1 !== "" &&
      editformData.pImages1 !== undefined &&
      editformData.pImages1 !== null
    ) {
      if (
        editformData.pImages2 !== "" &&
        editformData.pImages2 !== undefined &&
        editformData.pImages2 !== null
      ) {
        if (
          editformData.pImages3 !== "" &&
          editformData.pImages3 !== undefined &&
          editformData.pImages3 !== null
        ) {
          if (
            editformData.pImages4 !== "" &&
            editformData.pImages4 !== undefined &&
            editformData.pImages4 !== null
          ) {
            setPImage([
              editformData.pImages1,
              editformData.pImages2,
              editformData.pImages3,
              editformData.pImages4,
            ]);
          } else {
            setPImage([
              editformData.pImages1,
              editformData.pImages2,
              editformData.pImages3,
            ]);
          }
        } else {
          setPImage([editformData.pImages1, editformData.pImages2]);
        }
      } else {
        setPImage([editformData.pImages1]);
      }
    } else {
      console.log("upload image");
    }
    setTimeout(() => {
      setEditformdata((prevState) => ({
        ...prevState,
        pImages1: "",
        pImages2: "",
        pImages3: "",
        pImages4: "",
      }));
      DeleteValue();
    }, 1000);
  };
  function setPImage(value) {
    setEditformdata((prevState) => ({
      ...prevState,
      error: false,
      success: false,
      pImages: value,
    }));
  }
  const submitForm = async (e) => {
    e.preventDefault();
    myDivRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

    try {
      let responseData = await editProduct(editformData);
      if (responseData.success) {
        fetchData();
        setEditformdata({ ...editformData, success: responseData.success });
        setTimeout(() => {
          return setEditformdata({
            ...editformData,
            success: responseData.success,
          });
        }, 2000);
      } else if (responseData.error) {
        setEditformdata({ ...editformData, error: responseData.error });
        setTimeout(() => {
          return setEditformdata({
            ...editformData,
            error: responseData.error,
          });
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
        onClick={(e) =>
          dispatch({ type: "editProductModalClose", payload: false })
        }
        className={`${
          data.editProductModal.modal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.editProductModal.modal ? "" : "hidden"
        } fixed inset-0 flex items-start md:top-8 scroll z-30 justify-center overflow-auto`}
      >
        <div
          ref={myDivRef}
          id="myDiv"
          className="mt-28 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8"
        >
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Edit Product
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={(e) =>
                dispatch({ type: "editProductModalClose", payload: false })
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
          {editformData.error ? alert(editformData.error, "red") : ""}
          {editformData.success ? alert(editformData.success, "green") : ""}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="name">Product Name *</label>
                <input
                  value={editformData.pName}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
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
                  value={editformData.pPrice}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
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
                value={editformData.pDescription}
                onChange={(e) =>
                  setEditformdata({
                    ...editformData,
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
                value={editformData.pImages1}
                onChange={(e) =>
                  setEditformdata({
                    ...editformData,
                    error: false,
                    success: false,
                    pImages1: e.target.value,
                  })
                }
                placeholder="First Image"
                type="text"
                // accept=".jpg, .jpeg, .png"
                className="px-4 py-2 border focus:outline-none mb-2"
                id="img1"
              />
              <input
                value={editformData.pImages2}
                onChange={(e) =>
                  setEditformdata({
                    ...editformData,
                    error: false,
                    success: false,
                    pImages2: e.target.value,
                  })
                }
                id="img2"
                placeholder="Second Image"
                type="text"
                // accept=".jpg, .jpeg, .png"
                className="px-4 py-2 border focus:outline-none mb-2"
              />
              <input
                value={editformData.pImages3}
                onChange={(e) =>
                  setEditformdata({
                    ...editformData,
                    error: false,
                    success: false,
                    pImages3: e.target.value,
                  })
                }
                id="img3"
                placeholder="Third Image"
                type="text"
                // accept=".jpg, .jpeg, .png"
                className="px-4 py-2 border focus:outline-none mb-2"
              />
              <input
                value={editformData.pImages4}
                onChange={(e) =>
                  setEditformdata({
                    ...editformData,
                    error: false,
                    success: false,
                    pImages4: e.target.value,
                  })
                }
                id="img4"
                placeholder="Fouth Image"
                type="text"
                // accept=".jpg, .jpeg, .png"
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
                  value={editformData.pStatus}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
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
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
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
                  {categories && categories.length > 0
                    ? categories.map((elem) => {
                        return (
                          <Fragment key={elem._id}>
                            {editformData.pCategory._id &&
                            editformData.pCategory._id === elem._id ? (
                              <option
                                name="status"
                                value={elem._id}
                                key={elem._id}
                                selected
                              >
                                {elem.cName}
                              </option>
                            ) : (
                              <option
                                name="status"
                                value={elem._id}
                                key={elem._id}
                              >
                                {elem.cName}
                              </option>
                            )}
                          </Fragment>
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
                  value={editformData.pQuantity}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
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
                  value={editformData.pOffer}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
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
                value={editformData.pDate}
                onChange={(e) =>
                  setEditformdata({
                    ...editformData,
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
                Update product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProductModal;
