
// if processing a video...
const video = document.querySelector("video");
const videoInputCanvas = document.getElementById("videoInputCanvas");
const vidCtx = videoInputCanvas.getContext("2d");
const videoOutputCanvas = document.getElementById("videoOutputCanvas");
const outCtx = videoInputCanvas.getContext("2d");


// getting the camera feed
navigator.mediaDevices
    .getUserMedia({
        video: {
            facingMode: "environment"
        }
    })
    .then(function (stream) {
        video.srcObject = stream;
        video.play();
        requestAnimationFrame(tick);
    });

function tick() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // this function runs every time the video updates
        videoInputCanvas.width = video.videoWidth;
        videoInputCanvas.height = video.videoHeight;

        vidCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        const foundShapes = process(videoInputCanvas, "videoOutputCanvas")
        foundShapes.forEach(s => drawPolygon(s, outCtx))
    }
    requestAnimationFrame(tick);
    // this runs the tick function again and again (like 50 times a second)
}
