import React from "react";

export const DateSelection = (props) => (
  <div className="container datestyle">
    <h5>Filter result with date</h5>

    <div className="col-md-3">
      <div className="form-group">
        <div className="input-group date" id="datetimepicker6">
          <span className="input-group-addon">
            <span>From</span>
          </span>
          <input
            type="date"
            className="form-control"
            onChange={props.inputChange1}
            name="fromDate"
          />
          <span className="input-group-addon">
            <span className="glyphicon glyphicon-calendar" />
          </span>
        </div>
      </div>
    </div>

    <div className="col-md-3">
      <div className="form-group">
        <div className="input-group date" id="datetimepicker6">
          <span className="input-group-addon">
            <span>To</span>
          </span>
          <input
            type="date"
            className="form-control"
            onChange={props.inputChange2}
            name="toDate"
          />
          <span className="input-group-addon">
            <span className="glyphicon glyphicon-calendar" />
          </span>
        </div>
      </div>
    </div>

  </div>
);

export default DateSelection;
