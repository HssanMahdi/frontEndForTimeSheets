import React, { useState } from "react";

const Show = (props) => {
  const [valueSearch, setValueSearch] = useState("");

  return (
    <div className="show11">
      <div className="show11__info">
        {props.info ? `Total results: ${props.info.totalResults}` : ""}
      </div>
      {props.results.length > 0
        ? props.results.map((result, i) => (
            <div className="show11__details" key={i}>
              <div className="show11__link">
                <a href={result.displayLink}>{result.displayLink}</a>
              </div>
              <div className="show11__title">
                <i
                  className="bi bi-link mx-1"
                  style={{ color: "0706d2", fontSize: "16px" }}
                ></i>
                <a href={result.link}>{result.title}</a>
              </div>
              <div className="show11__description">
                <p>{result.snippet}</p>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Show;
