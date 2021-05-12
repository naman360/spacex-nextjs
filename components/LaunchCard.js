import Image from "next/image";
import React from "react";
import cardStyle from "../styles/Card.module.css";
export const config = { amp: 'hybrid' };

export const LaunchCard = ({ info }) => {
  return (
    <div className={cardStyle.main}>
      <Image
        className={cardStyle.image}
        src={info.links.mission_patch}
        alt={info.mission_name}
        width={300}
        height={300}
      />
      <h3 className={cardStyle.name}>
        {info.mission_name} #{info.flight_number}
      </h3>
      <div className={cardStyle.flight_info}>
        <h3>Mission Ids:</h3>
        {info.mission_id.length > 0 ? (
          <ul style={{ margin: "0px" }}>
            {info.mission_id.map((id) => (
              <li>{id}</li>
            ))}
          </ul>
        ) : (
          <span style={{ padding: "0 0 0 40px" }}>No IDs present</span>
        )}
        <div className={cardStyle.entry}>
          {" "}
          <h3>Launch Year:</h3>{" "}
          <span className={cardStyle.entry_value}>{info.launch_year}</span>
        </div>
        <div className={cardStyle.entry}>
          {" "}
          <h3>Successful Launch:</h3>{" "}
          <span className={cardStyle.entry_value}>
            {info.launch_success ? "true" : "false"}
          </span>
        </div>
        <div className={cardStyle.entry}>
          <h3>Successful Landing:</h3>
          <span className={cardStyle.entry_value}>
            {" "}
            {info.rocket.first_stage.cores[0].land_success === null
              ? "No data available"
              : info.rocket.first_stage.cores[0].land_success
              ? "true"
              : "false"}
          </span>
        </div>
      </div>
    </div>
  );
};
