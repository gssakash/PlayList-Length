import React, { useState } from "react";
import {
  getPlayListDetails,
  getVideoDetails,
  findTime
} from "./FetchDetails.js";
import PlaylistDetailsContainer from "./PlaylistDetailsContainer.js";
import "./css/SearchComponent.css";

function SearchComponent() {
  const [url, setUrl] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  let [allTime, setallTime] = useState("");
  const [len, setLen] = useState("");

  const handleHit = async (e) => {
    e.preventDefault();
    const urlRegex = /^([\S]+list=)?([\w_-]+)[\S]*$/;
    let playlistId;
    let match = url.match(urlRegex);

    if (match) {
      playlistId = match[2];
    }

    if (!playlistId) {
      setErrorMessage("Invalid ID, Please check your PlayList ID Again.");
      e.target.reset();
      return;
    }

    const { data, error } = await getPlayListDetails(playlistId);

    setErrorMessage("");
    setallTime("");

    if (!error) {
      const parsedVideoDetails = await getVideoDetails(data);
      const allTime = findTime(parsedVideoDetails.videos);
      const len = parsedVideoDetails.videos.length;
      setLen(len);

      setallTime(allTime);
      console.log("allTime", allTime);
    } else {
      setErrorMessage("Invalid Link, Please check your Link Again");
    }
  };

  const handleLink = (e) => {
    setUrl(
      e.target.value
        .trim()
        .split("  ")
        .filter((word) => word !== "")
        .join(" ")
    );
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleHit}>
        <div className="card card--accent">
          <h2>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-coffee" href="#icon-coffee" />
            </svg>
          </h2>
          <label className="input">
            <input
              className="input__field"
              type="text"
              placeholder=" "
              name="playlistUrl"
              onChange={handleLink}
              value={url}
              required
            />
            <span className="input__label">Enter PlayList Link / ID</span>
          </label>
          <div className="button-group">
            <button id="send-button-id">Send</button>
          </div>

          <br />
          <strong>
            <p>
              P.S. The App works right now only with Playlists containing a
              maximum of 50 videos.{" "}
            </p>
          </strong>
        </div>
      </form>

      <br />

      {allTime && (
        <PlaylistDetailsContainer
          len={len}
          allTime={allTime}
          errorMessage={errorMessage}
        />
      )}

      <br />

      {(errorMessage || !allTime) && (
        <div role="alert" id="error-div">
          Enter a Link which is Valid. You can try the app out using the below
          sample playlist link
          <br />
          <strong>
            <a
              href="https://youtube.com/playlist?list=PL16649CCE7EFA8B2F"
              target="__blank"
            >
              https://youtube.com/playlist?list=PL16649CCE7EFA8B2F
            </a>
          </strong>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
