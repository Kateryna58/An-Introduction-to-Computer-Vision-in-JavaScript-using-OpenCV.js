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
  
  let src = cv.imread(imgElement);
  let dst = new cv.Mat();
  let dsize = new cv.Size(src.rows, src.cols);
  // (data32F[0], data32F[1]) is the first point
  // (data32F[2], data32F[3]) is the sescond point
  // (data32F[4], data32F[5]) is the third point
  // (data32F[6], data32F[7]) is the fourth point
  let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [56, 65, 368, 52, 28, 387, 389, 390]);
  let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [100,100, 200, 0, 100, 600, 500, 500]);
  let M = cv.getPerspectiveTransform(srcTri, dstTri);
  // You can try more different parameters
  cv.warpPerspective(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
  cv.imshow('Perspective', dst);
  src.delete(); dst.delete(); M.delete(); srcTri.delete(); dstTri.delete();
};


document.getElementById("Perspective").onclick = function () {
  this.disabled = true;
  document.body.classList.add("loading");

  
  



  
  this.disabled = false;
  document.body.classList.remove("loading");
};