import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useSelect } from "./SelectContext";

const WheatherContext = createContext();

export const WheatherContextProvider = ({ children }) => {
  const { select } = useSelect();

  const initialValue = [
    {
      dt_txt: "",
      weather: [{ icon: "" }],
      main: { temp_max: 0, temp_min: 0 },
    },
    {
      dt_txt: "",
      weather: [{ icon: "" }],
      main: { temp_max: 0, temp_min: 0 },
    },
    {
      dt_txt: "",
      weather: [{ icon: "" }],
      main: { temp_max: 0, temp_min: 0 },
    },
    {
      dt_txt: "",
      weather: [{ icon: "" }],
      main: { temp_max: 0, temp_min: 0 },
    },
    {
      dt_txt: "",
      weather: [{ icon: "" }],
      main: { temp_max: 0, temp_min: 0 },
    },
  ];

  const [wheathers, setWheathers] = useState(initialValue);

  useEffect(() => {
    let array = [];
    axios(
      `https://api.openweathermap.org/data/2.5/forecast?q=${select}&appid=d4eba4bb3a2cd6ed0bb563ded94832da&cnt=40`
    ).then((res) => {
      let todayHour = res.data.list[0].dt_txt;
      todayHour = todayHour.substring(11, 19);
      res.data.list.map((item) => {
        if (item.dt_txt.substring(11, 19) === todayHour) {
          array.push(item);
        }
        setWheathers(array);
        return "";
      });
    });
  }, [select]);

  let daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hour = wheathers[0].dt_txt.substring(11, 16);
  let days = [];
  let icons = [];
  let temps = [];

  for (let item of wheathers) {
    let date = new Date(item.dt_txt);
    date = date.getDay();
    days.push(daysInWeek[date]);
    icons.push(item.weather[0].icon);
    temps.push({
      temp_max: (item.main.temp_max - 273).toFixed(),
      temp_min: (item.main.temp_min - 273).toFixed(),
    });
  }

  const values = {
    hour,
    days,
    icons,
    temps,
  };

  return (
    <WheatherContext.Provider value={values}>
      {children}
    </WheatherContext.Provider>
  );
};

export const useWheather = () => {
  const context = useContext(WheatherContext);

  return context;
};