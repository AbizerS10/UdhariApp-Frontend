import React from "react";
import AboutCard from "./AboutCard";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../Css/home.css";
import "../Css/about.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <>
      <Navbar />
      <div className="container-fluid home">
        <div className="row px-md-5 px-2">
          <div className="col-md-6 col-12 intro px-md-5">
            <h1>Udhaari Alert App</h1>
            <p>
              This is an udhaari alert app for shopkeepers. Add and manage your
              customers udhaari with our advance alerting system.
            </p>
            <a href="/">Know more</a>
          </div>
          <div className="col-md-6 col-12">
            <img
              src="https://ratnaafin.com/wp-content/uploads/2020/06/Protection.svg"
              alt=""
              className="mt-md-0 mt-3"
            />
          </div>
        </div>
      </div>
      <div className="about">
        <h1 className="text-center mt-5 fw-bold">About</h1>
        <h5 className="text-center fw-light">our team</h5>
        <div className="container">
          <div className="row px-2">
            <div className="col-md-7 col-12 mt-5">
              <p>Hii 🙋‍♂️, We hope you are doing fine.</p>
              <p>
                <span>W</span>e are a professional Web Development start-up of
                two passionate Fullstack Developers. We make our own custom
                designs instead of template driven websites. We work for the
                best customer service, client satisfaction and are proficient in
                making responsive user-friendly UI/UX designs.
              </p>
              <p>Thanks for visiting 😊 !</p>
              <a href="/">Get in touch ☎</a>
            </div>
            <div className="col-md-5 col-12 ps-5 position-relative">
              <AboutCard url="/img/murtaza.jpg" cn="card-img murtaza-card" />
              <AboutCard url="/img/abizer.jpeg" cn="card-img abizer-card" />
              <img
                src={process.env.PUBLIC_URL + "/img/bee1.png"}
                className="bee1"
                alt=""
              />
              <img
                src={process.env.PUBLIC_URL + "/img/bee2.png"}
                className="bee2"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
