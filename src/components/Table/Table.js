import { Typography } from "@material-ui/core";
import React from "react";
import "./Table.css";

const Table = ({ data }) => {
  //console.log(data);
  return (
    <div className="table shadow">
      <table>
        {data.map((val) => (
          <tr >
            <td key={val.country} 
            >{val.country}</td>
            <td key={val.cases}>{val.cases}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Table;
