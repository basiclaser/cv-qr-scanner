function stf(input){
	uriContent = "data:application/octet-stream," + encodeURIComponent(input);
	newWindow = window.open(uriContent, 'output.txt');
}

function go(){

	// static test image things
	const img = document.querySelector('img');
	const testCanvasElement = document.getElementById('testCanvas');
	const staticCanvasElement = document.getElementById('staticCanvas');
	const testCanvas = testCanvasElement.getContext('2d');
	const staticCanvas = staticCanvasElement.getContext('2d');

	// grab image tag, put its data onto the static canvas

	staticCanvasElement.width = img.width / 8;
	staticCanvasElement.height = img.height / 8;

	testCanvasElement.width = img.width / 8;
	testCanvasElement.height = img.height / 8;

	staticCanvas.drawImage(
		img,
		0,
		0,
		img.width,
		img.height,
		0,
		0,
		img.width / 8,
		img.height / 8
	);
	// you can use this staticTestImage variable to give to your model
	const staticTestImageData = staticCanvas.getImageData(
		0,
		0,
		staticCanvasElement.width,
		staticCanvasElement.height
	);

	const results = fakeModelThing(staticCanvasElement);
	// and draw contours for example

	function fakeModelThing(imageData) {
		let src = cv.imread(imageData);
		let dst = cv.Mat.zeros(src.cols, src.rows, cv.CV_8UC3);

		cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

		cv.medianBlur(src, src, 1);
		cv.threshold(src, src, 100, 255, cv.THRESH_BINARY);
		let contours = new cv.MatVector();
		let hierarchy = new cv.Mat();
		cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
    
		// Draw contours on destination image
		for (let i = 0; i < contours.size(); ++i) {
		  let color = new cv.Scalar(0, 255, 0);
		  cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
		}
		
		// Show result and clean up
		cv.imshow('canvasOutput', dst);
		src.delete(); dst.delete(); contours.delete(); hierarchy.delete();
		// You can try more different parameters
		// cv.findContours(
		// 	src,
		// 	contours,
		// 	hierarchy,
		// 	cv.RETR_CCOMP,
		// 	cv.CHAIN_APPROX_SIMPLE
		// );
		// console.log(contours)
		// stf(JSON.stringify(contours))
		// // draw contours with random Scalar
		// for (let i = 0; i < contours.size(); ++i) {
		// 	let color = new cv.Scalar(
		// 		Math.round(Math.random() * 255),
		// 		Math.round(Math.random() * 255),
		// 		Math.round(Math.random() * 255)
		// 	);
		// 	cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
		// }
		// cv.imshow('canvasOutput', dst);
		// src.delete();
		// dst.delete();
		// contours.delete();
		// hierarchy.delete();
	}
}
