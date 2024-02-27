import React from "react";
import Layout from "../layout";

const Aboutus = () => {
  return (
    <div className="mt-[19vh] px-8 mb-14">
      <h2 className="text-4xl font-semibold mb-8">About Us</h2>
      <h3 className="text-2xl font-semibold mt-4 my-1">Our Story</h3>
      <p className="pl-1 px-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
        viverra maecenas accumsan lacus vel facilisis.
      </p>
      <h3 className="text-2xl font-semibold mt-4 my-1">Our Mission</h3>
      <p className="pl-1 px-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
        viverra maecenas accumsan lacus vel facilisis.
      </p>
      <h3 className="text-2xl font-semibold mt-4 my-1">Our Vision</h3>
      <p className="pl-1 px-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
        viverra maecenas accumsan lacus vel facilisis.
      </p>
    </div>
  );
};

const About = () => {
  return <Layout children={<Aboutus />} />;
};

export default About;
