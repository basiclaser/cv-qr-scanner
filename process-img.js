function processImage() {
    // if processing a static image...
    const img = document.querySelector("img");
    const imageInputCanvas = document.getElementById("imageInputCanvas");
    const imgCtx = imageInputCanvas.getContext("2d");

    // grab image tag, put its data onto the static canvas
    imageInputCanvas.width = img.width / 8;
    imageInputCanvas.height = img.height / 8;
    imgCtx.drawImage(
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
    process(imageInputCanvas, "imageOutputCanvas")
}
