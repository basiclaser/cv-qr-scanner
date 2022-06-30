function tick() {
    const virtualInputCanvas = document.querySelector('a-scene').components.screenshot.canvas
    const img = document.querySelector('a-scene').components.screenshot.getCanvas()
    console.log(virtualInputCanvas)
    const imgCtx = virtualInputCanvas.getContext("2d");

    // grab image tag, put its data onto the static canvas
    virtualInputCanvas.width = img.width;
    virtualInputCanvas.height = img.height;
    imgCtx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        img.width,
        img.height
    );
    process(virtualInputCanvas, "virtualOutputCanvas")
    setTimeout(tick, 1000)
}
setTimeout(tick, 2000)
