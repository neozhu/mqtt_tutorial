from PIL import Image
import zbarlight

file_path = 'p6.jpg'
with open(file_path, 'rb') as image_file:
    image = Image.open(image_file)
    image.load()

codes = zbarlight.scan_codes(['qrcode','ean13','ean8','upce','upca','CODE128','code39','PDF417','ISBN13','ISBN10','I25'], image)

for code in codes:
    print(code)