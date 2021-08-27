export const responseParser = (data) => {
  const api = {
    base: "http://openweathermap.org/img/wn/",
  };
  let newState = {
    location: "",
    forecast: {},
  };
  newState.location = `${data.city.name}, ${data.city.country}`;

  let tempsByDate = {};
  let dataByDate = {};

  for (let i = 0; i < data.list.length; i++) {
    let day = data.list[i].dt_txt.substring(0, 10);
    if (!tempsByDate[day]) {
      tempsByDate[day] = [data.list[i].main.temp];
    } else {
      tempsByDate[day].push(data.list[i].main.temp);
    }
    if (!dataByDate[day]) {
      dataByDate[day] = [
        data.list[i].weather[0].main,
        `${api.base}data.list[i].weather[0].icon}.png`,
      ];
    }
  }

  const keys = Object.keys(tempsByDate);

  keys.forEach((key, index) => {
    newState.forecast[key] = {
      temperature:
        tempsByDate[key].reduce((temp, sum) => temp + sum, 0) /
        tempsByDate[key].length,
      description: dataByDate[key][0],
      icon: dataByDate[key][1],
    };
  });
  return newState;
};
