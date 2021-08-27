const Forecast = ({ forecast }) => (
  <ul>
    {Object.entries(forecast).map(
      ([date, { temperature, description, icon }]) => (
        <li key={date}>
          <div className="date">{date}</div>
          <div className="temp">{Math.round(temperature)}°F</div>
          <div className="description">{description}</div>
          <img src={icon} alt="weather icon" className="icon" />
        </li>
      )
    )}
  </ul>
);

export default Forecast;
