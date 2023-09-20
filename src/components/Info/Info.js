import React from "react";
import "./Info.css";
function Info({ office, role, date }) {
  // if (!office || !role) {
  //   office = "Not Specified";
  //   role = "Not Specified";
  // }
  return (
    <div className="infoCard d-flex flex-wrap column-gap-3 justify-content-start m-0 p-0 ">
      <p>
        Office
        <br />
        <span>{office ? office : "Not Specified"}</span>
      </p>
      <p>
        Role
        <br />
        <span>{role ? role : "Not Specified"}</span>
      </p>
      <p>
        Copied Manager
        <br />
        <span>Mohamed Tarek</span>
      </p>
      <p>
        Joined Date
        <br />
        <span>
          {date[2]}/{date[1]}/{date[0]}
        </span>
      </p>
      <p>
        Manager
        <br />
        <span>Mohamed Tarek</span>
      </p>
    </div>
  );
}

export default Info;
