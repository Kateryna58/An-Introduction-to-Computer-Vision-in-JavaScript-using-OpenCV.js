document.body.classList.add("loading");

function onOpenCvReady() {
  document.body.classList.remove("loading");
}

let imgElement = document.getElementById("imageSrc");
let inputElement = document.getElementById("fileInput");

inputElement.onchange = function () {
  imgElement.src = URL.createObjectURL(event.target.files[0]);
};

imgElement.onload = function () {
  let image = cv.imread(imgElement);
  cv.imshow("imageCanvas", image);
  image.delete();
};
/*---------------------------------------------------------------------------------------------*/
document.getElementById("histogramButton").onclick = function () {
  let srcMat = cv.imread("imageCanvas");
  cv.cvtColor(srcMat, srcMat, cv.COLOR_RGBA2GRAY, 0);
  let srcVec = new cv.MatVector();
  srcVec.push_back(srcMat);
  let accumulate = false;
  let channels = [0];
  let histSize = [256];
  let ranges = [0, 255];
  let hist = new cv.Mat();
  let mask = new cv.Mat();
  let color = new cv.Scalar(255, 255, 255);
  let scale = 2;
  // You can try more different parameters
  cv.calcHist(srcVec, channels, mask, hist, histSize, ranges, accumulate);
  let result = cv.minMaxLoc(hist, mask);
  let max = result.maxVal;
  let dst = new cv.Mat.zeros(srcMat.rows, histSize[0] * scale, cv.CV_8UC3);
  // draw histogram
  for (let i = 0; i < histSize[0]; i++) {
    let binVal = (hist.data32F[i] * srcMat.rows) / max;
    let point1 = new cv.Point(i * scale, srcMat.rows - 1);
    let point2 = new cv.Point((i + 1) * scale - 1, srcMat.rows - binVal);
    cv.rectangle(dst, point1, point2, color, cv.FILLED);
  }
  cv.imshow("imageCanvas", dst);
  srcMat.delete();
  dst.delete();
  srcVec.delete();
  mask.delete();
  hist.delete();
};
