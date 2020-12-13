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
  /*------------------perspective---------------*/
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
  src.delete();
  dst.delete(); 
  M.delete(); 
  srcTri.delete(); 
  dstTri.delete();
  /*----------------------erode----------------------*/
  let src2 = cv.imread(imgElement);
  let dst2 = new cv.Mat();
  let M2 = cv.Mat.ones(5, 5, cv.CV_8U);
  let anchor = new cv.Point(-1, -1);
  // You can try more different parameters
  cv.erode(src2, dst2, M2, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
  cv.imshow('erod', dst2);
  src2.delete(); dst2.delete(); M2.delete();
  /*-------------------dilate--------------------------*/
  let src3 = cv.imread(imgElement);
  let dst3 = new cv.Mat();
  let M3 = cv.Mat.ones(5, 5, cv.CV_8U);
  let anchor3 = new cv.Point(-1, -1);
  // You can try more different parameters
  cv.dilate(src3, dst3, M3, anchor3, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
  cv.imshow('dilate', dst3);
  src3.delete(); dst3.delete(); M3.delete();
  /*---------------------------Opening ------------------*/
  let src4 = cv.imread(imgElement);
  let dst4 = new cv.Mat();
  let M4 = cv.Mat.ones(5, 5, cv.CV_8U);
  let anchor4 = new cv.Point(-1, -1);
// You can try more different parameters
  cv.morphologyEx(src4, dst4, cv.MORPH_OPEN, M4, anchor4, 1,
  cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
  cv.imshow('open', dst4);
  src4.delete(); dst4.delete(); M4.delete();
  /*-------------------------Closing----------------------------*/
  let src5 = cv.imread(imgElement);
  let dst5 = new cv.Mat();
  let M5 = cv.Mat.ones(5, 5, cv.CV_8U);
// You can try more different parameters
  cv.morphologyEx(src5, dst5, cv.MORPH_CLOSE, M5);
  cv.imshow('close', dst5);
  src5.delete(); dst5.delete(); M5.delete();
  /*--------------------------------median blur-------------------*/
  let src6 = cv.imread(imgElement);
  let dst6 = new cv.Mat();
  // You can try more different parameters
  cv.medianBlur(src6, dst6, 5);
  cv.imshow('median', dst6);
  src6.delete(); dst6.delete();
    /*--------------------------------gaussian blur-------------------*/
    let src7 = cv.imread(imgElement);
    let dst7 = new cv.Mat();
    let ksize = new cv.Size(3, 3);
    // You can try more different parameters
    cv.GaussianBlur(src7, dst7, ksize, 0, 0, cv.BORDER_DEFAULT);
    cv.imshow('gaus', dst7);
    src7.delete(); dst7.delete();
    
};

