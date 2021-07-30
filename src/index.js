function stf(input) {
	uriContent = "data:application/octet-stream," + encodeURIComponent(input);
	newWindow = window.open(uriContent, 'output.txt');
}

let detectedCodes = []

function go() {

	// static test image things
	const img = document.querySelector('img');
	const testCanvasElement = document.getElementById('testCanvas');
	const staticCanvasElement = document.getElementById('staticCanvas');
	const testCanvas = testCanvasElement.getContext('2d');
	const staticCanvas = staticCanvasElement.getContext('2d');

	// detect bounding rect, regardless of rotation
	// rotate the image
	// get imageData with getImageData
	// give to jsQR
	
	function qrCodeDetection(x, y, width, height) {
		const imageData = staticCanvas.getImageData(x-10, y-10, width+10, height+10)
		const code = jsQR(imageData.data, width+10, height+10, {});
		console.log({code})
		if (code) {
			detectedCodes.push(code)
			console.log(detectedCodes.length, code);
		} else {
			console.log("nothing found in image")
		}
	}

	// grab image tag, put its data onto the static canvas

	staticCanvasElement.width = img.width / 2;
	staticCanvasElement.height = img.height / 2;

	testCanvasElement.width = img.width / 2;
	testCanvasElement.height = img.height / 2;

	staticCanvas.drawImage(
		img,
		0,
		0,
		img.width,
		img.height,
		0,
		0,
		img.width / 2,
		img.height / 2
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


		let sharpern_kernel = cv.matFromArray(3, 3, cv.CV_32FC1, [-1, -1, -1, -1, 9, -1, -1, -1, -1]);

		// You can try more different parameters
		// contrast
		cv.filter2D(src, src, -1, sharpern_kernel);

		cv.threshold(src, src, 20, 255, cv.THRESH_BINARY);
		let kernel = new cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(3, 3))
		let anchor = new cv.Point(-1, -1);
		cv.morphologyEx(src, src, cv.MORPH_OPEN, kernel, anchor, 2)


		let contours = new cv.MatVector();
		let hierarchy = new cv.Mat();
		cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
		// Draw contours on destination image
		console.log(contours.size())
		for (let i = 0; i < contours.size(); ++i) {
			let cnt = contours.get(i)
			let area = cv.contourArea(cnt, false)
			if(area > staticCanvasElement.height * staticCanvasElement.width/100){
				// cv.drawContours(src1, contours, i, [255, 0, 0, 255], 1, cv.LINE_8, hierarchy, 200);
				// let rect = cv.boundingRect(cnt);
				let rect = cv.minAreaRect(cnt);
				let vertices = cv.RotatedRect.points(rect);
				console.log({rect, vertices})

				let rectangleColor = new cv.Scalar(0, 255, 255, 255);
				let point1 = new cv.Point(rect.x, rect.y);
				let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
				
				qrCodeDetection(rect.x, rect.y, rect.width, rect.height)
				
				cv.rectangle(src1, point1, point2, rectangleColor, 2, cv.LINE_AA, 0);
				cv.imshow('canvasOutput', dst);
				// src.delete(); dst.delete(); contours.delete(); hierarchy.delete(); cnt.delete();
			}
		}

		// Show result and clean up
		cv.imshow('canvasOutput', src1);
		src.delete();
		src1.delete();
		dst.delete();
		contours.delete(); 
		hierarchy.delete();

	}
}