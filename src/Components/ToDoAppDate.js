import React, { useState, useEffect } from "react";
import cover from "../assets/Rectangle 2.png";
import "./ToDoAppDate.css";

function ToDoAppDate() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const showTimeDate = () => {
    return (
      <>
        <div className="dateString">
          {date.toDateString().substring(3, 10)} <br />
        </div>
        <div className="timeString">
          {date.toLocaleTimeString().length > 10
            ? date.toLocaleTimeString().substring(0, 5)
            : 0 + date.toLocaleTimeString().substring(0, 4)}
          {date.toLocaleTimeString().substr(-3, 3)}
        </div>
      </>
    );
  };

  // console.log("sigrdze: ", date.toLocaleTimeString().length);

  return (
    <div>
      <div className="container">
        <img className="coverPhoto" alt="flower" src={cover} />
        <div className="dateContainer">
          <div className="">{showTimeDate()}</div>
        </div>
      </div>
    </div>
  );
}

export default ToDoAppDate;
