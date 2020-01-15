import cv2
import numpy as np
import argparse
import pyzbar.pyzbar as pyzbar
import imutils

def decodeDisplay(image):
    barcodes = pyzbar.decode(image)
    # print('Decoded:', barcodes)
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
        #ret, frame = camera.read()
        image = cv2.imread('python/p6.jpg')
        # 转为灰度图像
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # compute the Scharr gradient magnitude representation of the images
        # in both the x and y direction using OpenCV 2.4
        ddepth = cv2.cv.CV_32F if imutils.is_cv2() else cv2.CV_32F
        gradX = cv2.Sobel(gray, ddepth=ddepth, dx=1, dy=0, ksize=-1)
        gradY = cv2.Sobel(gray, ddepth=ddepth, dx=0, dy=1, ksize=-1)
 
        # subtract the y-gradient from the x-gradient
        gradient = cv2.subtract(gradX, gradY)
        gradient = cv2.convertScaleAbs(gradient)
        
        # blur and threshold the image
        blurred = cv2.blur(gradient, (9, 9))
        (_, thresh) = cv2.threshold(blurred, 225, 255, cv2.THRESH_BINARY)
        # construct a closing kernel and apply it to the thresholded image
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (21, 7))
        closed = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
        # perform a series of erosions and dilations
        closed = cv2.erode(closed, None, iterations = 4)
        closed = cv2.dilate(closed, None, iterations = 4)
        # find the contours in the thresholded image, then sort the contours
        # by their area, keeping only the largest one
        cnts = cv2.findContours(closed.copy(), cv2.RETR_EXTERNAL,
	      cv2.CHAIN_APPROX_SIMPLE)
        cnts = imutils.grab_contours(cnts)
        sortlist = sorted(cnts, key = cv2.contourArea, reverse = True)
        for cnt in sortlist:
          # compute the rotated bounding box of the largest contour
          rect = cv2.minAreaRect(cnt)
          box = cv2.cv.BoxPoints(rect) if imutils.is_cv2() else cv2.boxPoints(rect)
          box = np.int0(box)
 
          # draw a bounding box arounded the detected barcode and display the
          # image
          cv2.drawContours(image, [box], -1, (0, 255, 0), 3)
        #im = decodeDisplay(gray)

        cv2.waitKey(5)
        cv2.imshow("camera", image)

    camera.release()
    cv2.destroyAllWindows()


if __name__ == '__main__':
    # construct the argument parser and parse the arguments
    detect()
