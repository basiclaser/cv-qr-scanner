
const video = document.querySelector("video");
const videoInputCanvas = document.getElementById("videoInputCanvas");
const vidCtx = videoInputCanvas.getContext("2d");
const videoOutputCanvas = document.getElementById("videoOutputCanvas");
const outCtx = videoInputCanvas.getContext("2d");

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
        videoInputCanvas.width = video.videoWidth;
        videoInputCanvas.height = video.videoHeight;

        vidCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        const foundShapes = process(videoInputCanvas, "videoOutputCanvas")

        // foundShapes.forEach(s => drawPolygon(s, outCtx))
    }
    requestAnimationFrame(tick);
}
