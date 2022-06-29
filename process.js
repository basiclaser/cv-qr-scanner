function process(canvasElement, outputCanvasId) {
    // console.log(canvasElement, outputCanvasId)
    try {
        //TODO: get 35/35 squares detected ( its only missing the metadata codes, which are a bit chunkier )
        let src = cv.imread(canvasElement);
        let src1 = cv.imread(canvasElement);
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
        // console.log(contours.size())

        for (let i = 0; i < contours.size(); ++i) {
            let cnt = contours.get(i)
            let area = cv.contourArea(cnt, false)
            if (area > canvasElement.height * canvasElement.width / 100) {
                cv.drawContours(src1, contours, i, [255, 0, 0, 255], 1, cv.LINE_8, hierarchy, 200);
                // let rect = cv.boundingRect(cnt);
                let rect = cv.minAreaRect(cnt);
                let vertices = cv.RotatedRect.points(rect);

                let rectangleColor = new cv.Scalar(0, 255, 255, 255);
                for (let i = 0; i < 4; i++) {
                    // console.log(vertices[i])
                    cv.line(src1, vertices[i], vertices[(i + 1) % 4], rectangleColor, 2, cv.LINE_AA, 0);
                }
                // console.log(canvasElement.id, { rect, vertices })
            }
        }
        // Show result and clean up
        cv.imshow(outputCanvasId, src1);
        src.delete();
        src1.delete();
        dst.delete();
        contours.delete();
        hierarchy.delete();
    } catch (error) {
        console.log(error)
    }
}