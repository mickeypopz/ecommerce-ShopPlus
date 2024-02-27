import React, { Fragment, useEffect, useContext, useState } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";
import { nextSlide, prevSlide } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const Slider = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    sliderImages(dispatch);
    // Set up a timer to automatically change the slide every 10 seconds
    const intervalId = setInterval(() => {
      if (data.sliderImages.length > 1) {
        nextSlide(data.sliderImages.length, slide, setSlide);
      }
    }, 10000);
    // Clear the interval when component is unmounted
    return () => clearInterval(intervalId);
  }, [dispatch, data.sliderImages.length, slide]);

  const handleClickScroll = () => {
    const element = document.getElementById("shop");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Fragment>
      <div className="relative md:mt-24 mt-[78px] border-2  ">
        {data.sliderImages.length > 0 ? (
          <div className="px-1">
            <img
              className="aspect-[11/5] w-full rounded-[3px_3px_20px_20px] mb-7"
              src={`${apiURL}/uploads/customize/${data.sliderImages[slide].slideImage}`}
              alt="sliderImage"
            />
          </div>
        ) : (
          ""
        )}

        {data?.sliderImages?.length > 0 ? (
          <>
            {data.sliderImages.length > 1 ? (
              <div className="absolute inset-0 flex items-center justify-between">
                <svg
                  onClick={(e) =>
                    prevSlide(data.sliderImages.length, slide, setSlide)
                  }
                  className={`z-10  flex justify-end items-center box-border w-12 h-12 text-gray-700  cursor-pointer hover:text-yellow-700`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <svg
                  onClick={(e) =>
                    nextSlide(data.sliderImages.length, slide, setSlide)
                  }
                  className={`z-10 flex justify-start items-center box-border w-12 h-12 text-gray-700 cursor-pointer hover:text-yellow-700`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            ) : (
              ""
            )}
            <div
              className="absolute inset-0 flex items-center justify-center"
              onClick={handleClickScroll}
            >
              <p
                style={{ background: "#303031" }}
                className="cursor-pointer box-border text-2xl text-white px-4 py-2 rounded-lg"
              >
                Shop Now
              </p>
            </div>
          </>
        ) : null}
      </div>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
