window.VIDEO_INFO = {
  status: 0,
  vid: "0e2d434c-8579-469e-8259-624e017b4b85",
  poster:
    "https://cn-videos.dji.net/video_trans/eb34868a33664ba38bca1b31aeaf70e9/2.jpg",
  duration: 250,
  historyStart: 0,
  title: "",
  formats: "mp4",
  defaultTrack: null,
  definitions: [],
  defaultDefinition: "1",
  tracks: [],
};

let videoDefinitions = JSON.parse(
  '[{"type":"SD","text":"480p","src":"https://cn-videos.dji.net/video_trans/eb34868a33664ba38bca1b31aeaf70e9/sd.mp4"},{"type":"HD","text":"720p","src":"https://cn-videos.dji.net/video_trans/eb34868a33664ba38bca1b31aeaf70e9/720.mp4"},{"type":"FHD","text":"1080p","src":"https://cn-videos.dji.net/video_trans/eb34868a33664ba38bca1b31aeaf70e9/1080.mp4"}]'
);

console.log(videoDefinitions[2].src);

for (di in videoDefinitions) {
  if (videoDefinitions[di]["src"]) {
    videoDefinitions[di]["src"] = videoDefinitions[di]["src"].replace(
      "http://",
      "//"
    );
    videoDefinitions[di]["src"] = videoDefinitions[di]["src"].replace(
      "https://",
      "//"
    );
  }
}
var videoTracks = JSON.parse("[]");
for (ci in videoTracks) {
  if (videoTracks[ci]["src"]) {
    videoTracks[ci]["src"] = videoTracks[ci]["src"].replace("http://", "//");
    videoTracks[ci]["src"] = videoTracks[ci]["src"].replace("https://", "//");
  }
}
window.VIDEO_INFO.definitions = videoDefinitions;
window.VIDEO_INFO.tracks = videoTracks;

function getUrlParam(p, u) {
  u = u || document.location.toString();
  var reg = new RegExp("(^|&|\\\\?)" + p + "=([^&]*)(&|$|#)");
  var r = u.match(reg);
  return r ? r[2] : "";
}
window.onerror = function (message, source, lineno, colno, error) {
  console.log(message, source, lineno, colno, error);
};
function initPlayer() {
  window.VIDEO_INFO = window.VIDEO_INFO || {};
  window.VIDEO_INFO.vid = window.VIDEO_INFO.vid;
  window.VIDEO_INFO.poster = getUrlParam("poster") || window.VIDEO_INFO.poster;
  window.VIDEO_INFO.title = getUrlParam("title") || window.VIDEO_INFO.title;
  // window.VIDEO_INFO.defaultTrack = getUrlParam('language') || window.VIDEO_INFO.defaultTrack;
  window.VIDEO_INFO.activeTrack =
    getUrlParam("language") || window.VIDEO_INFO.activeTrack;
  try {
    window.localStorage.setItem(
      "definition",
      getUrlParam("definition") || window.VIDEO_INFO.defaultDefinition
    );
  } catch (e) {
    console.error(e);
  }

  var autoplay = getUrlParam("autoplay");
  autoplay = autoplay === "0" || autoplay === "false" ? 0 : 1;
  var muted = getUrlParam("muted");
  muted = muted === "1" || muted === "true" ? 1 : 0;
  var params = {
    autoplay: autoplay,
    loop: getUrlParam("loop"),
    source: window.VIDEO_INFO,
    disabledChildren: ["rightClick"],
    muted: muted,
  };
  var disableControls = getUrlParam("disctrl");
  disableControls = disableControls == 1 || disableControls === "true" ? 1 : 0;
  if (disableControls) {
    params.disabledChildren = ["controls", "rightClick"];
  }
  //设置播放器
  const video = document.createElement("video");
  video.setAttribute(
    "src",
    "https://cn-videos.dji.net/video_trans/eb34868a33664ba38bca1b31aeaf70e9/1080.mp4"
  );
  video.setAttribute("loop", getUrlParam("loop"));
  video.setAttribute("autoplay", autoplay);
  video.setAttribute("disabledChildren", ["rightClick"]);
  video.setAttribute("muted", muted);

  const container = document.querySelector("#js_video");
  container.appendChild(video);
}
document.addEventListener("DOMContentLoaded", initPlayer);
/*]]>*/
