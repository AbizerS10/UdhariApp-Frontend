import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function AboutCard(props) {
  return (
    <div>
      <div className={props.cn}>
        <img
          src={process.env.PUBLIC_URL + props.url}
          alt=""
        />
      </div>
    </div>
  );
}

export default AboutCard;
