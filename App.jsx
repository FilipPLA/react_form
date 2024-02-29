import React, { useState, useEffect } from "react";
import "./App.css";
import validateFloat from "./functions/validateFloat";
import ProgressBar from "./components/ProgressBar";
import Select from "./components/Select";
import Range from "./components/Range";
import NumImp from "./components/NumImp";
import ChbGroup from "./components/ChbGroup";
import TextArea from "./components/TextArea";
import File from "./components/File";
import Button from "./components/Button";
import saveText from "./functions/saveText";
import RbGroup from "./components/RbGroup";

function App() {
  const [firstNum, setFirstNum] = useState(0);
  const [imp2, setImp2] = useState();

  const [countDown, setCountDown] = useState(10);
  const count = 10;

  const tastes = ["smetanova", "jogurtova", "nizkotučna"];
  const [taste, setTaste] = useState("smetanova");

  const [amount, setAmount] = useState(0);
  const fullAmount = 100;

  const [kopeceky, setKopecky] = useState(1);

  const [top, setTop] = useState("");

  const [text, setText] = useState("");
  const [mainTaste, setMainTaste] = useState("");

  const [resultN, setResultN] = useState(
    "Vepište čísla a klikněte na tlačítko"
  );

  const handleEvent = (source) => {
    switch (source) {
      case "btn-download": {
        saveText(text);
        break;
      }
      default:
        break;
    }
  };

  //PROMPT

  useEffect(() => {
    let temp = prompt("Zadejte float number.");
    while (!validateFloat(temp)) {
      temp = prompt("Chybně zadane float number");
    }
    setFirstNum(parseFloat(temp));
  }, []);

  //TIMER
  useEffect(() => {
    if (countDown > 0) {
      const timer = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countDown]);
  const progress = countDown > 0 ? ((count - countDown) / count) * 100 : 100;
  const percent = parseInt(
    amount > 0 ? ((fullAmount - amount) / fullAmount) * 100 : 100
  );

  //HANDEL DATA
  useEffect(() => {}, []);
  const handleData = (data, source) => {
    switch (source) {
      case "sel-tastes": {
        setTaste(data);
        break;
      }
      case "rng-amount": {
        setAmount(data);
        break;
      }
      case "num-kopecky": {
        setKopecky(data);
        break;
      }
      case "chbg-top": {
        setTop(data);
        break;
      }
      case "txt-text": {
        setText(data);
        break;
      }
      case "file-load": {
        setText(data);
        break;
      }
      case "rbg-option": {
        setMainTaste(data);
        break;
      }
      case "num-first": {
        setFirstNum(data);
        break;
      }
      case "num-imp2": {
        setImp2(data);
        break;
      }

      default:
        break;
    }
  };
  function Clock() {
    const [currentTime, setCurrentTime] = useState(
      new Date().toLocaleTimeString()
    );
    useEffect(() => {
      const timerId = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString());
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    }, []);
    return <span>{currentTime}</span>;
  }

  const handleClick = () => {
    if (validateFloat(imp2)) {
      const result = firstNum * imp2;
      setResultN(result);
    } else {
      console.log("counting went wrong");
    }
  };
  return (
    <div className="bg-info-subtle vw-100 vh-100">
      <div className="container "></div>
      <div className="row justify-content-center bg-warning-subtle p-4">
        <div className="col-6">
          <p>
            {mainTaste} {kopeceky} kopečky {taste} {top}
          </p>
          <RbGroup
            label="Příchuť zmrzliny"
            id="rbg-option"
            dataIn={[
              { label: "vanilkova", value: "vanilkova" },
              { label: "čokoladova", value: "čokoladova" },
              { label: "míchaná", value: "míchaná" },
            ]}
            handleData={handleData}
            selectedValue={mainTaste}
          />
          <ChbGroup
            label="Něco navrch?"
            id="chbg-top"
            dataIn={[
              { label: "kousky ořišku", value: "kousky ořišku" },
              { label: "čoko hoblinky", value: "čoko hoblinky" },
              { label: "karamelové křupinky", value: "karamelové křupinky" },
            ]}
            handleData={handleData}
            selectedValue={top}
          />
          <NumImp
            id="num-kopecky"
            label="Počet kopečků"
            dataIn={kopeceky}
            handleData={handleData}
            min="1"
            max="4"
          />
          <Select
            label="Vyberte druh zmrzliny"
            id="sel-tastes"
            dataIn={tastes}
            handleData={handleData}
            selectedValue={taste}
          />
          <Range
            min="0"
            max="100"
            label="Místo na disku"
            handleData={handleData}
            dataIn={amount}
            id="rng-amount"
          />
          <p>
            {Clock()} Zbývá {percent}% místa na disku
          </p>
        </div>
        <div className="col-6">
          <ProgressBar id="pgb-progress" dataIn={progress} />
          <label htmlFor="pgb-progress">
            Instalace probíhá, čekejte {countDown} sekund.
          </label>
          <div className="row">
            <div className="col-6">
              <NumImp
                id="num-first"
                label="sčítanec 1."
                dataIn={firstNum}
                handleData={handleData}
              />
            </div>
            <div className="col-6">
              <NumImp
                id="num-imp2"
                label="sčítanec 2."
                dataIn={imp2}
                handleData={handleData}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <Button
                label="Vypočitej součet"
                handleEvent={handleClick}
                id="count-button"
              />
            </div>
            <div className="col-6">
              <p>{resultN}</p>
            </div>
          </div>
          <TextArea
            id="txt-text"
            label="Operace s textem"
            dataIn={text}
            handleData={handleData}
            height="450px"
          />
          <div className="row">
            <div className="col-6">
              <File
                id="file-load"
                handleData={handleData}
                label="Načti text ze souboru"
              />
            </div>
            <div className="col-6">
              <Button
                id="btn-download"
                label="stáhni soubor"
                handleEvent={handleEvent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
