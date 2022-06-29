// this will draw some sort of rectangle based on 4 xy points
function drawPolygon(shape, thisCanvas) {
    const { a, b, c, d } = shape;
    thisCanvas.strokeStyle = "lime";
    thisCanvas.beginPath();
    thisCanvas.moveTo(a.x, a.y);
    thisCanvas.lineTo(b.x, b.y);
    thisCanvas.lineTo(c.x, c.y);
    thisCanvas.lineTo(d.x, d.y);
    thisCanvas.closePath();
    thisCanvas.stroke();
}