import * as React from "react";
import Day from "./Day";

function Forecast({ weather }) {
  const days = Object.keys(weather);

  const listItems = days.forEach((key) => {
    return (
      <Day
        id={key}
        temp={weather[key].temperature}
        description={weather[key].description}
        icon={weather[key].icon}
      />
    );
  });
  return <ul>{listItems}</ul>;
}

export default Forecast;
