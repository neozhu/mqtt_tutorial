import cv2
import numpy as np
import pyzbar.pyzbar as pyzbar
from pyzbar.pyzbar import ZBarSymbol
from pylibdmtx import pylibdmtx
sorted(ZBarSymbol.__members__.keys())


def decodeDisplay(image):
  # barcodes = pyzbar.decode(image,symbols=[ZBarSymbol.QRCODE,ZBarSymbol.CODE128,ZBarSymbol.PDF417,ZBarSymbol.CODE39])
  # ret,thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
  # barcodes = pylibdmtx.decode(image)
  barcodes = pyzbar.decode(image)
  # print("barcodes" , barcodes)
  for barcode in barcodes:
    # 提取条形码的边界框的位置
    # 画出图像中条形码的边界框
    (x, y, w, h) = barcode.rect
    cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)

    # 条形码数据为字节对象，所以如果我们想在输出图像上
    # 画出来，就需要先将它转换成字符串
    barcodeData = barcode.data.decode("utf-8")
    barcodeType = barcode.type

    # 绘出图像上条形码的数据和条形码类型
    text = "{} ({})".format(barcodeData, barcodeType)
    cv2.putText(image, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX,
                .5, (0, 0, 125), 2)

    # 向终端打印条形码数据和条形码类型
    print("[INFO] Found {} barcode: {}".format(barcodeType, barcodeData))
  return image


def detect():

  camera = cv2.VideoCapture(0)

  while True:
    # 读取当前帧
    # ret, frame = camera.read()
    # 转为灰度图像
    # gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    image = cv2.imread('python/p22.jpg')
    # gray = cv2.resize(gray,None,fx=0.5,fy=0.5,interpolation=cv2.INTER_CUBIC)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurImage = cv2.GaussianBlur(gray,(3,3),0);
    # laplacian = cv2.Laplacian(blurImage,cv2.CV_64F)
    # binary=cv2.adaptiveThreshold(blurImage,255,cv2.THRESH_TOZERO,cv2.THRESH_BINARY,10,2)
    ret , thresh1 = cv2.threshold(blurImage,120,255,cv2.THRESH_BINARY)
    kernel = np.ones((1,1),np.uint8)
    erosion = cv2.erode(thresh1,kernel,iterations=1)
 
    im = decodeDisplay(erosion)

    cv2.waitKey(5)
    #cv2.namedWindow('camera',cv2.WINDOW_NORMAL)
    #cv2.resizeWindow('image',1024,768)#定义frame的大小
    cv2.imshow("camera", im)

  camera.release()
  cv2.destroyAllWindows()


if __name__ == '__main__':
  detect()
