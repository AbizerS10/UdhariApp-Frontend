import React from "react";
import "../Css/about.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AboutCard from "./AboutCard";

function About() {
  return (
    <div className="about mb-5">
      <h1 className="text-center mt-5 fw-bold">About</h1>
      <h5 className="text-center fw-light">our team</h5>
      <div className="container">
        <div className="row">
          <div className="col-7 mt-5">
            <p>Hii 🙋‍♂️, We hope you are doing fine.</p>
            <p>
              <span>W</span>e are a professional Web Development start-up of
              two passionate Fullstack Developers. We make our own custom
              designs instead of template driven websites. We work for the best
              customer service, client satisfaction and are proficient in making
              responsive user-friendly UI/UX designs.
            </p>
            <p>Thanks for visiting 😊 !</p>
            <a href="#">Get in touch ☎</a>
          </div>
          <div className="col-5 mt-5 position-relative">
            <AboutCard url="/img/murtaza.jpg" cn="card-img murtaza-card" />
            <AboutCard url="/img/abizer.jpeg" cn="card-img abizer-card" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
