// video things
const video = document.querySelector('video');
const canvasElement = document.getElementById('canvas');
const canvas = canvasElement.getContext('2d');

results.forEach((result) => drawPolygon(result, staticCanvas));

canvasElement.width = video.videoWidth;
canvasElement.height = video.videoHeight;

// getting the camera feed
navigator.mediaDevices
	.getUserMedia({
		video: {
			facingMode: 'environment',
		},
	})
	.then(function (stream) {
		video.srcObject = stream;
		video.play();
		requestAnimationFrame(tick);
	});

function tick() {
	if (video.readyState === video.HAVE_ENOUGH_DATA) {
		// this function runs every time the video updates
		canvasElement.width = video.videoWidth / 2;
		canvasElement.height = video.videoHeight / 2;

		// canvases are just environments for drawing on
		// im getting the video data and putting it on the canvas
		canvas.drawImage(video, 0, 0, video.videoWidth / 2, video.videoHeight / 2);

		// this variable is basically an image you can
		// give to your model
		const canvasImageData = canvas.getImageData(
			0,
			0,
			canvasElement.width,
			canvasElement.height
		);

		// your AI code stuff here i guess
		// here you can pass the canvasImageData to your AI model
		const results = fakeModelThing(canvasImageData);
		// and draw contours for example
		results.forEach((result) => drawPolygon(result, canvas));
	}
	requestAnimationFrame(tick);
	// this runs the tick function again and again (like 50 times a second)
}

// this will draw some sort of rectangle based on 4 xy points
function drawPolygon(shape, thisCanvas) {
	const { a, b, c, d } = shape;
	thisCanvas.strokeStyle = 'lime';
	thisCanvas.beginPath();
	thisCanvas.moveTo(a.x, a.y);
	thisCanvas.lineTo(b.x, b.y);
	thisCanvas.lineTo(c.x, c.y);
	thisCanvas.lineTo(d.x, d.y);
	thisCanvas.closePath();
	thisCanvas.stroke();
}
let counter = 0;

function fakeModelThing(imageData) {
	/*  return [
    {
      // fake contours of a fake result
      a: { x: 10, y: 10 },
      b: { x: 20, y: 10 },
      c: { x: 20, y: 20 },
      d: { x: 10, y: 20 }
    },
    {
      // fake contours of a fake result
      a: { x: 100, y: 100 },
      b: { x: 200, y: 100 },
      c: { x: 200, y: 200 },
      d: { x: 100, y: 200 }
    }
  ]; */
}
