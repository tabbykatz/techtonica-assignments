import * as React from "react";

function Day({ key, temperature, description, icon }) {
  return (
    <li>
      <div>{key}</div>
      <div>{Math.round(temperature)}°F</div>
      <div>{description}</div>
      <img src={icon} alt="weather info" />
    </li>
  );
}

export default Day;
