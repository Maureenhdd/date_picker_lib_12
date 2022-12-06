import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { DateTime } from "luxon";
import { getYears, getMonths } from "./utils";
import { useRef } from "react";
import { useEffect } from "react";
import "./InputDate.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const InputDate = (props) => {
  const now = props.date;
  const [active, setActive] = useState(false);
  const [yearActive, setYearActive] = useState(false);
  const [dateYear, setDateYear] = useState(now.getFullYear());
  const [dateMonth, setDateMonth] = useState(now.getMonth() + 1);
  const [dateDay, setDateDay] = useState(now.getDate());
  const years = getYears();
  const scrollRef = useRef();
  const months = getMonths();
  const onClick = props.onClick;

  const handleAcitveFalse = () => {
    setActive(false);
  };

  const handleMonth = (i) => {
    setDateMonth(i + 1);
    setYearActive(false);
    // setActive(true);
  };

  let pickedMonth = months.find((m, i) => i + 1 === dateMonth);
  let countDay = [];
  for (
    let i = 1;
    i <=
    DateTime.local(dateYear, months.indexOf(pickedMonth) + 1).endOf("month").c
      .day;
    i++
  ) {
    countDay.push(i);
  }

  const ref = useDetectClickOutside({ onTriggered: handleAcitveFalse });

  useEffect(() => {
    yearActive && scrollRef.current.scrollIntoView();
  }, [yearActive]);
  return (
    <div ref={ref} style={{ margin: 20 }}>
      <input
        className="input_date"
        type="text"
        onClick={() => setActive(true)}
        value={`${dateDay.toString().padStart(2, "0")}/${dateMonth
          .toString()
          .padStart(2, "0")}/${dateYear}`}
        onChange={() => console.log("toto")}
      />
      {active && (
        <div className="input_date_open">
          <div>
            <button
              onClick={() => {
                setDateMonth(dateMonth - 1);
              }}
              disabled={dateMonth === 1 ? true : false}
              className="input_date_btn--previous"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={() => {
                setYearActive(!yearActive);
              }}
              className="input_date_current_date--btn"
            >
              {dateYear} {pickedMonth}
            </button>
            <button
              onClick={() => {
                setDateMonth(dateMonth + 1);
              }}
              disabled={dateMonth === 12 ? true : false}
              className="input_date_btn--next"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="input_date_open__days">
            {countDay.map((day, i) => (
              <p
                key={i}
                className={`  ${
                  day === dateDay
                    ? "input_date_open__days--picked"
                    : "input_date_open__days--p"
                }`}
                onClick={() => {
                  setDateDay(day);
                  onClick(
                    new Date(dateYear, dateMonth - 1, day).toDateString()
                  );
                }}
              >
                {day}
              </p>
            ))}
          </div>
          {yearActive && (
            <ul
              style={{
                height: 200,
                width: 200,
                backgroundColor: "white",
                overflow: "auto",
                position: "absolute",
                zIndex: 1,
                top: "50%",
                left: "50%",
                // right: 0,
                transform: "translate(-50%, -50%)",
              }}
            >
              {years.map((li, i) =>
                li === dateYear ? (
                  <>
                    <li key={i} style={{ color: "pink" }} ref={scrollRef}>
                      {li}
                    </li>
                    <ul>
                      {months.map((month, i) => (
                        <li key={i} onClick={() => handleMonth(i)}>
                          {month}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <li key={i} onClick={() => setDateYear(li)}>
                    {li}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default InputDate;
