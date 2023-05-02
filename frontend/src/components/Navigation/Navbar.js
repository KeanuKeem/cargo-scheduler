// React
import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import SelectContext from "../../store/select-context";

import ShipmentPopup from "../Shipment/ShipmentPopup";
import Profile from "./Profile";

// CSS
import "./Navbar.css";

// -----Navbar-Components----- //
const Navbar = (props) => {
  const ctx = useContext(SelectContext);

  const [onProfile, setOnProfile] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [isPopup, setIsPopup] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [profileClass, setProfileClass] = useState("profile");

  const searchRef = useRef();

  const selectSearchHandler = (event) => {
    ctx.setSearchValue(event.target.id);
    ctx.setIsSearch(true);
    setIsSearch(false);
  };

  const profileClickHandler = () => {
    if (onProfile) {
      setProfileClass("hideProfile");
      setTimeout(() => {
        setOnProfile(false);
      }, 500);
    } else {
      setOnProfile(true);
      setProfileClass("profile");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearch(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const searchHandler = async (event) => {
    event.preventDefault();

    await axios
      .get(
        `https://cargo-scheduler.onrender.com/api/shipment/search?id=${event.target.search.value}`,
        { headers: { Authorization: "Bearer " + ctx.token } }
      )
      .then((result) => {
        setIsSearch(true);
        setSearchResult(result.data);
      })
      .catch((err) => {
        setSearchMessage(err.response.data);
        setIsPopup(true);
      });
  };

  return (
    <>
      <div className="navbar">
        <h1 className="navbar__logo">Cargo Scheduler</h1>
        <div className="navbar__menu">
          <Link className="navbar__menu__item" to="/calendar">
            Calendar
          </Link>
          <Link className="navbar__menu__item" to="/todo">
            ToDo
          </Link>
        </div>
        {isPopup && (
          <ShipmentPopup
            className="navbar__popup"
            type="notification"
            text={searchMessage}
            button="Okay!"
            onClick={() => {
              setIsPopup(false);
            }}
          />
        )}
        <div className="navbar__search">
          <form onSubmit={searchHandler}>
            <div className="navbar__search-area">
              <input type="text" id="search" placeholder="Ref#" />
              <button type="submit">
                <FontAwesomeIcon
                  className="navbar__search__btn"
                  icon={faMagnifyingGlass}
                />
              </button>
              {isSearch && (
                <div
                  ref={searchRef}
                  className="navbar__search-result"
                  tabIndex={0}
                >
                  {searchResult.map((result) => {
                    return (
                      <p
                        key={result.ref}
                        id={result.ref}
                        onClick={selectSearchHandler}
                      >
                        {result.ref}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="navbar__profile" onClick={profileClickHandler}>
          <FontAwesomeIcon
            icon={faUser}
            size="lg"
            style={{ color: "#7868E6" }}
          />
        </div>
        {onProfile && (
          <Profile
            onLogOut={props.onLogOut}
            profileClickHandler={profileClickHandler}
            profileClass={profileClass}
          />
        )}
      </div>
    </>
  );
};

export default Navbar;
