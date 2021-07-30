function stf(input) {
	uriContent = "data:application/octet-stream," + encodeURIComponent(input);
	newWindow = window.open(uriContent, 'output.txt');
}
console.log("Hello")
function go() {

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
		let src1 = cv.imread(imageData);
		let dst = cv.Mat.zeros(src.cols, src.rows, cv.CV_8UC3);

		cv.cvtColor(src, src, cv.COLOR_BGR2GRAY);
		cv.medianBlur(src, src, 1);



		// let M = cv.Mat.eye(3, 3, cv.CV_32FC1);
		let sharpern_kernel = cv.matFromArray(3, 3, cv.CV_32FC1, [-1, -1, -1, -1, 9, -1, -1, -1, -1]);

		// You can try more different parameters
		// contrast
		cv.filter2D(src, src, -1, sharpern_kernel);
		// cv.imshow('canvasOutput', src);

		cv.threshold(src, src, 20, 255, cv.THRESH_BINARY);
		// cv.imshow('canvasOutput', src);
		console.log("Hello2")
		let kernel = new cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(3, 3))
		// let kernel = cv.Mat.ones(5, 5, cv.CV_8U);
		let anchor = new cv.Point(-1, -1);
		console.log("Hello3")
		// kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
		// cv.morphologyEx(src, src, cv.MORPH_CLOSE, kernel, iterations = 2)
		cv.morphologyEx(src, src, cv.MORPH_OPEN, kernel, anchor, 2)
		// close = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations = 2)
		console.log("Hello4")
		// cv.imshow('canvasOutput', src);
		console.log("Hello5")


		let contours = new cv.MatVector();
		let hierarchy = new cv.Mat();
		cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
		// cv.RETR_CCOMP   cv.RETR_EXTERNAL   cv.RETR_LIST
		// Draw contours on destination image
		console.log(hierarchy.size())
		console.log(contours.size())
		for (let i = 0; i < contours.size(); ++i) {
			let cnt = contours.get(i)
			console.log("CNT", cnt)
			let area = cv.contourArea(cnt, false)
			console.log("AREA",area)
			// let color = new cv.Scalar(50, 255, 0);
			if(area > 2000 && area < 3000){
				cv.drawContours(src1, contours, i, [255, 0, 0, 255], 1, cv.LINE_8, hierarchy, 200);
			}
		}

		// const contoursToDraw = new cv.MatVector();
		// for (let i = 0; i < contours.size(); ++i) {
		// 	const cnt = contours.get(i);

		// 	const cntSize = cnt.size().width * cnt.size().height;
		// 	for (let j = 0; j < cntSize; j++) {
		// 		const [x, y] = cnt.intPtr(j); //cnt[j] -> ?
		// 		const vertex = { x, y };
		// 		console.log('vertex', vertex);
		// 		cv.putText(cnt, 'some text', vertex, cv.FONT_HERSHEY_SIMPLEX, 1, [255, 0, 255, 255]);
		// 		cv.circle(cnt, vertex, 3, [0, 255, 0, 255], cv.FILLED);

		// 	}
		// 	contoursToDraw.push_back(cnt);
		// }

		// Show result and clean up
		cv.imshow('canvasOutput', src1);
		src.delete(); src1.delete();dst.delete(); contours.delete(); hierarchy.delete();



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
