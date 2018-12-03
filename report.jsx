var React = require("react");
var ReactPivot = require("react-pivot");
var createReactClass = require("create-react-class");

var rows = require("./data.json");

var dimensions = [
  { title: "Date", value: "date" },
  { title: "Host", value: "host" }
];

var reduce = function(row, memo) {
  switch (row.type) {
    case "impression":
      memo.impression = (memo.impression || 0) + 1;
      break;
    case "load":
      memo.load = (memo.load || 0) + 1;
      break;
    case "display":
      memo.displaycount = (memo.displaycount || 0) + 1;
      break;
    default:
  }
  return memo;
};
var calculations = [
  {
    title: "Impression",
    value: "impression"
  },
  {
    title: "Loads",
    value: "load"
  },
  {
    title: "Display",
    value: "displaycount"
  },
  {
    title: "Load Rate",
    value: function(memo) {
      return (memo.load / memo.impression) * 100;
    },
    template: function(val, row) {
      return val.toFixed(1) + " %";
    }
  },
  {
    title: "Display Rate",
    value: function(memo) {
      return (memo.displaycount / memo.load) * 100;
    },
    template: function(val, row) {
      return val.toFixed(1) + " %";
    }
  }
];
module.exports = createReactClass({
  render() {
    return (
      <div>
        <ReactPivot
          rows={rows}
          dimensions={dimensions}
          reduce={reduce}
          calculations={calculations}
        />
      </div>
    );
  }
});
