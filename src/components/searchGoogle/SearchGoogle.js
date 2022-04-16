import React, { useEffect, useState } from "react";
import Show from "./ShowRes";
import { key, cx } from "../../API/APISearch";
import axios from "axios";
import "./SearchGoogle.css";

import small from "../../assets/small.png";

const Search = (props) => {
  const goBack = () => {
    props.history.push("/home/dashboard");
  };
  const [valueSearch, setValueSearch] = useState(
    props.location.state.valueSearch ? props.location.state.valueSearch : ""
  );
  const [results, setResults] = useState([]);
  const [info, setInfo] = useState("");
  const searchGoogle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${valueSearch}`
      );
      if (response) {
        setResults(response.data.items);
        setInfo(response.data.searchInformation);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getPosts() {
      if (props.location.state.valueSearch) {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${valueSearch}`
          );
          if (response) {
            setResults(response.data.items);
            setInfo(response.data.searchInformation);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    getPosts();
  }, []);
  console.log(props.location.state.valueSearch);
  return (
    <main id="idMMA">
      <div className="main__container">
        <div className="search11">
          <div className="search11__form">
            <div className="search__form-logo">
              <img src={small} onClick={goBack} />
            </div>
            <div className="search__form-input">
              <form className="home11__form" onSubmit={searchGoogle}>
                <input
                  type="text"
                  className="home11__input"
                  value={valueSearch}
                  onChange={(e) => setValueSearch(e.target.value)}
                  required
                />
              </form>
            </div>
          </div>
          <Show results={results} info={info} />
        </div>
      </div>
    </main>
  );
};

export default Search;
