const virtualInputCanvas = document.getElementsByClassName("a-canvas")[0];
function tick() {
    process(virtualInputCanvas, "virtualOutputCanvas")
    setTimeout(tick, 1000)
}
tick()
