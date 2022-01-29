import React from "react";
import "./css/PlaylistContainer.css";

function PlaylistDetailsContainer({ len, allTime, errorMessage }) {
  return (
    <div id="playlist-details" className="card card--accent">
      <p>
        <strong>
          <b>Total Number of Videos in the PlayList : </b> {len}{" "}
        </strong>
      </p>
      <strong>
      <p>
        <b> Total duration : </b>
        {allTime.timeData.totalDurationAt100x}{" "}
      </p>
      </strong>
      <strong>
      <p>
        <b>At 1.25x : </b> {allTime.timeData.totalDurationAt125x}{" "}
      </p>
      </strong>
      <strong>
      <p>
        <b>At 1.50x : </b> {allTime.timeData.totalDurationAt150x}{" "}
      </p>
      </strong>
      <strong>
      <p>
        <b>At 1.75x : </b> {allTime.timeData.totalDurationAt175x}{" "}
      </p>
      </strong>
      <strong>
      <p>
        <b>At 2.00x : </b> {allTime.timeData.totalDurationAt200x}{" "}
      </p>
      </strong>
    </div>
  );
}

export default PlaylistDetailsContainer;
