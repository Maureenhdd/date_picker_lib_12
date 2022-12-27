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
  const onClickDate = props.onClick;

  const handleAcitveFalse = () => {
    setActive(false);
    onClickDate(new Date(dateYear, dateMonth - 1, dateDay));
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

  console.log(
    DateTime.local(dateYear, months.indexOf(pickedMonth) + 1).endOf("month").c
      .day
  );

  const ref = useDetectClickOutside({ onTriggered: handleAcitveFalse });

  useEffect(() => {
    active && yearActive && scrollRef.current.scrollIntoView();
  }, [yearActive, active]);
  return (
    <div ref={ref} className="input_date_block" style={{ width: props.width }}>
      <input
        className="input_date"
        type="text"
        onClick={() => setActive(true)}
        value={`${dateDay.toString().padStart(2, "0")}/${dateMonth
          .toString()
          .padStart(2, "0")}/${dateYear}`}
        onChange={() =>
          `${dateDay.toString().padStart(2, "0")}/${dateMonth
            .toString()
            .padStart(2, "0")}/${dateYear}`
        }
      />
      {active && (
        <div className="input_date_open">
          <div className="input_date_btn">
            <button
              type="button"
              onClick={() => {
                setDateMonth(dateMonth - 1);
              }}
              disabled={dateMonth === 1 ? true : false}
              className="input_date_btn--previous"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              type="button"
              onClick={() => setYearActive(!yearActive)}
              className="input_date_btn--current"
            >
              {dateYear} {pickedMonth}
            </button>
            <button
              type="button"
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
                }}
              >
                {day}
              </p>
            ))}
          </div>
          <ul
            className={
              yearActive ? "input_date_year_open" : "input_date_year--closed"
            }
          >
            {years.map((li, i) =>
              li === dateYear ? (
                <li
                  key={i}
                  className="input_date_year_open--years"
                  ref={scrollRef}
                >
                  {li}
                  <ul className="input_date_year_open__months--ul">
                    {months.map((month, i) => (
                      <li
                        className="input_date_year_open__months--li"
                        key={i}
                        onClick={() => {
                          handleMonth(i);
                        }}
                      >
                        {month}
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li
                  className="input_date_year_open--years"
                  key={i}
                  onClick={() => {
                    setDateYear(li);
                  }}
                >
                  {li}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InputDate;
