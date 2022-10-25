import React from "react";
import Calendar from "rc-year-calendar";

/*
function SeasonsCalendar(props) {
    return (
        <Calendar />
    );
}*/

const seasonal_food = new Map();
seasonal_food.set('Winter', ["Chestnuts", "Grapefruit", "Lemons", "Oranges", "Tangerines", "Kale", "Leeks", "Radicchio", "Radishes", "Rutabaga", "Turnips"]);
seasonal_food.set('Spring', ["Apricots", "Avocado", "Mango", "Pineapple", "Rhubarb", "Strawberries", "Artichoke", "Asparagus", "Carrots", "Celeriac", "Chives", "Collards", "Fava Beans", "Fennel", "Fiddlehead Ferns", "Morels", "Mustard Greens"]);
seasonal_food.set('Summer', ["Blackberries", "Blueberries", "Nectarines", "Peaches", "Plums", "Raspberries", "Tomatoes", "Watermelon", "Broccoli", "Cucumber", "Green Beans", "Zucchini"]);
seasonal_food.set('Fall', ["Apples", "Cranberries", "Figs", "Grapes", "Pears", "Pomegranate", "Quince", "Butternut Squash", "Cauliflower", "Garlic", "Ginger", "Mushrooms", "Potatoes", "Pumpkin", "Sweet Potatoes", "Swiss Chard"]);

const seasons = new Map();
for (const x of Array(12).keys()) {
  if (x < 2 || x === 11) {
    seasons.set(x, "Winter");
  } else if (x < 5) {
    seasons.set(x, "Spring");
  } else if (x < 8) {
    seasons.set(x, "Summer");
  } else {
    seasons.set(x, "Fall");
  }
}
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

class SeasonsCalendar extends React.Component {
  constructor() {
    super();
    this.state = {
      // logs: [],
      value: [],
    };
  }

  // {this.state.logs.map(log => <div key={log}>{log}</div>)}
  addLog(date) {
    // this.setState({ logs: this.state.logs.concat([message]) });
    this.setState({ value: seasonal_food.get(seasons.get(date)) });
  }

  render() {
    function redirectToInsertions(event) {
      const name = event.target.id
      window.location.replace(`../insertions?search=${name}`);
    }

    const seasonal_items = this.state.value.map((item) => {
      return (
        <div>
          <div className="col" key={item}>
            <button className="btn btn-outline-primary" id={item} onClick={redirectToInsertions}>{item}</button>
          </div>
        </div>
        
      );
    });

    return (
      <div>
        <div id="events-log">
          <h3>The calendar of seasonal food</h3>
        </div>
        <Calendar
          minDate={new Date()}
          enableRangeSelection={true}
          onDayClick={(e) => this.addLog(e.date.getMonth())}
        />
        <div className="my-5 row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 text-center">
          {seasonal_items}
        </div>
      </div>
    );
  }
}

export default SeasonsCalendar;
