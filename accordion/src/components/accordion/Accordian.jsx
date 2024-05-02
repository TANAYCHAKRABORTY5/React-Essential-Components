import { useState } from "react";
import data from "./data";
import "./styles.css";

function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMutiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMultiple = [...multiple];
    const findIndex = cpyMultiple.indexOf(getCurrentId);
    if (findIndex === -1) cpyMultiple.push(getCurrentId);
    else cpyMultiple.splice(findIndex, 1);

    setMultiple(cpyMultiple);
  }

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMutiSelection)}>
        {enableMutiSelection === true
          ? "Enable single selection"
          : "Enable Multiple Selection"}
      </button>

      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div key={dataItem.id} className="item">
              <div
                onClick={
                  enableMutiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {enableMutiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="acc-content">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="acc-content">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div> No data found !</div>
        )}
      </div>
    </div>
  );
}

export default Accordian;
