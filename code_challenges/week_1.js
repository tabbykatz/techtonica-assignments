// write a function that prints the name of the day following the day given.

function nextDay(dayName) {
    const days = ["Monday",  "Tuesday",  "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    if (!days.some(day => day === dayName)) {
        console.log("Invalid day");
        return;
    }
    console.log(dayName === "Sunday" ? days[0] : days[days.indexOf(dayName) + 1]);
}

// write a function that returns the number of days in a month based on the month number passed.

function numDaysInMonth(monthNum) {
    if (monthNum < 1 || monthNum > 12) {
        return 0;
    }
    const daysInMonths = {1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31};
    
    return daysInMonths[monthNum];
}
