// React
import { useEffect, useContext, useState } from "react";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faAnglesDown,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import SelectContext from "../../store/select-context";

// CSS
import "./Sidebar.css";

// -----Sidebar-Components----- //
const Sidebar = (props) => {
  const ctx = useContext(SelectContext);
  const [fav, setFav] = useState([]);
  const [showFav, setShowFav] = useState(false);
  const [favClass, setFavClass] = useState("sidebar__list__header__arrow");
  const [itemClass, setItemClass] = useState("sidebar__list__items");
  const [sidebarClass, setSidebarClass] = useState("sidebar-show");

  useEffect(() => {
    const fetchFav = async () => {
      try {
        const favRes = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/user/fav",
          {
            headers: { Authorization: "Bearer " + ctx.token },
          }
        );
        setFav(favRes.data);
      } catch {}
    };
    fetchFav();
    props.setDataEdited(false);
  }, [props.dataEdited]);

  const favClickHandler = () => {
    if (favClass === "sidebar__list__header__arrow") {
      setFavClass("sidebar__list__header__arrow-active");
      setItemClass("sidebar__list__items");
      setShowFav(true);
    } else {
      setFavClass("sidebar__list__header__arrow-inactive");
      setItemClass("sidebar__list__hideItems");
      setTimeout(() => {
        setFavClass("sidebar__list__header__arrow");
        setShowFav(false);
      }, 300);
    }
  };

  const sidebarCloseHandler = () => {
    setSidebarClass("sidebar-show__closing");
    setTimeout(() => {
      setSidebarClass("sidebar-show");
      ctx.setIsSidebar(false);
    }, 400);
  };

  return (
    <div className={ctx.isSidebar ? sidebarClass : "sidebar"}>
      <div className={ctx.isSidebar ? "sidebar-show__top" : "sidebar-hide__top"}>
        {ctx.isSidebar && (
          <FontAwesomeIcon onClick={sidebarCloseHandler} icon={faCircleXmark} />
        )}
      </div>
      <div className="sidebar__list">
        <div className="sidebar__list__header" onClick={favClickHandler}>
          <FontAwesomeIcon style={{ color: "#000000" }} icon={faStar} />
          <h2>Favourites</h2>
          {!showFav ? (
            <FontAwesomeIcon
              className={favClass}
              style={{ color: "#000000" }}
              icon={faAnglesDown}
            />
          ) : (
            <FontAwesomeIcon
              className={favClass}
              style={{ color: "#000000" }}
              icon={faAnglesDown}
            />
          )}
        </div>
        {showFav && (
          <div className={itemClass}>
            {fav.map((shipment) => {
              return (
                <p
                  key={shipment.ref}
                  id={shipment.ref}
                  onClick={(event) => {
                    ctx.setSearchValue(event.target.id);
                    ctx.setIsSearch(true);
                    setSidebarClass("sidebar-show");
                    ctx.setIsSidebar(false);
                  }}
                >
                  {shipment.ref}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
