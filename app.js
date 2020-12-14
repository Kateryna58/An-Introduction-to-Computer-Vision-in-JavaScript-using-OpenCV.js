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
  /*------------------------Canny----------------------------*/
  let src = cv.imread(imgElement);
  let dst = new cv.Mat();
  cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
  // You can try more different parameters
  cv.Canny(src, dst, 50, 100, 3, false);
  cv.imshow("imageCanvas", dst);
  src.delete();
  dst.delete();
    /*------------------------findContours----------------------------*/
    let src2 = cv.imread(imgElement);
    let dst2 = cv.Mat.zeros(src2.cols, src2.rows, cv.CV_8UC3);
    cv.cvtColor(src2, src2, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(src2, src2, 120, 200, cv.THRESH_BINARY);
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    // You can try more different parameters
    cv.findContours(src2, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
    // draw contours with random Scalar
    for (let i = 0; i < contours.size(); ++i) {
        let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
                                  Math.round(Math.random() * 255));
        cv.drawContours(dst2, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
    }
    cv.imshow('findContours', dst2);
    src2.delete(); dst2.delete(); contours.delete(); hierarchy.delete();
};
