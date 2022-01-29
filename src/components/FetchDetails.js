import axios from "axios";
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

let maxLimit = 125;

const getEndPointForPlayList = (id) =>
  `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=${maxLimit}&playlistId=${id}&key=${API_KEY}`;
const getEndPointForVideoDetails = (ids) =>
  `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${ids}&key=${API_KEY}`;

const getPlayListDetails = async (id) => {
  let data = [];
  try {
    if (localStorage.getItem(id) === null) {
      const response = await axios.get(getEndPointForPlayList(id));
      data = response.data;
      localStorage.setItem(id, JSON.stringify(data));
      return { data, error: false };
    }

    data = localStorage.getItem(id);
    data = JSON.parse(data);

    return { data, error: false };
  } catch (error) {
    return { data, error };
  }
};

const convertYoutubeDuration = (duration) => {
  const getTime = /([0-9]*H)?([0-9]*M)?([0-9]*S)?$/;
  const parsedTime = getTime.exec(duration);
  const hours = parseInt(parsedTime[1], 10) || 0;
  const minutes = parseInt(parsedTime[2], 10) || 0;
  const seconds = parseInt(parsedTime[3], 10) || 0;
  return hours * 3600 + minutes * 60 + seconds;
};

const parseVideoDetails = (data) => {
  const result = data.items.map((item) => ({
    duration: convertYoutubeDuration(item.contentDetails.duration),
    title: item.snippet.title,
    id: item.id
  }));

  return result;
};

const getVideoDetails = async (data) => {
  let videos = [];
  const idsOfVideos = data.items.map((item) => item.contentDetails.videoId);
  const { data: videosList, error } = await getAllVideoDetails(idsOfVideos);

  if (!error) {
    videos = parseVideoDetails(videosList);
  }

  return { videos, error };
};

const findTime = (videos) => {
  let videosDurationList = videos.map((item) => Math.round(item.duration));
  const titleList = videos.map((item) => item.title);
  const totalSeconds = videosDurationList.reduce((acc, total) => acc + total);

  const timeData = updateAtSpeed(totalSeconds);
  videosDurationList = videos.map((item) => (item.duration / 60).toFixed(2));
  return { videosDurationList, titleList, timeData };
};

const getAllVideoDetails = async (ids) => {
  const videoIds = ids.join();
  let data = null;
  try {
    if (localStorage.getItem(videoIds) === null) {
      const res = await axios.get(getEndPointForVideoDetails(videoIds));
      data = res.data;
      localStorage.setItem(videoIds, JSON.stringify(data));
      return { data, error: false };
    }

    data = localStorage.getItem(videoIds);
    data = JSON.parse(data);
    return { data, error: false };
  } catch (error) {
    return { data, error };
  }
};

const updateAtSpeed = (totalSeconds) => {
  const totalDurationAt100x = enteredRateDuration(totalSeconds);
  const totalDurationAt125x = enteredRateDuration(totalSeconds, 1.25);
  const totalDurationAt150x = enteredRateDuration(totalSeconds, 1.5);
  const totalDurationAt175x = enteredRateDuration(totalSeconds, 1.75);
  const totalDurationAt200x = enteredRateDuration(totalSeconds, 2.0);

  return {
    totalDurationAt100x,
    totalDurationAt125x,
    totalDurationAt150x,
    totalDurationAt175x,
    totalDurationAt200x
  };
};

const enteredRateDuration = (seconds, rate = 1) => {
  const time = seconds / rate;
  const hour = Math.floor(time / 3600);
  const min = Math.floor((time - hour * 3600) / 60);
  const sec = Math.floor(time - hour * 3600 - min * 60);
  return hour + " Hour(s), " + min + " Minute(s), " + sec + " Second(s)";
};

export { getPlayListDetails, getVideoDetails, findTime };
