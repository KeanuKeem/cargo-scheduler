import { useState, useEffect } from "react";

import "./Loading.css";

const Loading = () => {
  const [active, setActive] = useState(0);
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [third, setThird] = useState();
  const [fourth, setFourth] = useState();
  const [fifth, setFifth] = useState();
  const [sixth, setSixth] = useState();
  const [seventh, setSeventh] = useState();
  const [eighth, setEighth] = useState();
  const [ninth, setNinth] = useState();
  const [tenth, setTenth] = useState();

  useEffect(() => {
    const nextLoading = () => {
      if (active === 10) {
        setActive(1);
      } else {
        setActive(active + 1);
      }
    };
    setTimeout(() => {
      nextLoading();
    }, 300);
  }, [active]);

  useEffect(() => {
    if (active === 1) {
      setTenth();
      setFirst("loading__selected");
    } else if (active === 2) {
      setFirst();
      setSecond("loading__selected");
    } else if (active === 3) {
      setSecond();
      setThird("loading__selected");
    } else if (active === 4) {
      setThird();
      setFourth("loading__selected");
    } else if (active === 5) {
      setFourth();
      setFifth("loading__selected");
    } else if (active === 6) {
      setFifth();
      setSixth("loading__selected");
    } else if (active === 7) {
      setSixth();
      setSeventh("loading__selected");
    } else if (active === 8) {
      setSeventh();
      setEighth("loading__selected");
    } else if (active === 9) {
      setEighth();
      setNinth("loading__selected");
    } else if (active === 10) {
      setNinth();
      setTenth("loading__selected");
    }
  }, [active]);

  return (
    <div className="loading">
      <p>
        <span className={first}>L</span>
        <span className={second}>o</span>
        <span className={third}>a</span>
        <span className={fourth}>d</span>
        <span className={fifth}>i</span>
        <span className={sixth}>n</span>
        <span className={seventh}>g</span>
        <span className={eighth}>.</span>
        <span className={ninth}>.</span>
        <span className={tenth}>.</span>
      </p>
    </div>
  );
};

export default Loading;
