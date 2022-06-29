function tick() {
    const virtualInputCanvas = document.querySelector('a-scene').components.screenshot.canvas
    const imgCtx = virtualInputCanvas.getContext("2d");

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
    // process(x, "virtualOutputCanvas")
    setTimeout(tick, 1000)
}
tick()
