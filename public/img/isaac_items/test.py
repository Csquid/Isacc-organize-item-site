import os
import glob
import shutil

files = glob.glob('F:/D-Programming/2020/Study Language/Node/node-js-web/2020-09/Isacc-organize-item-site/public/img/isaac_items/accessory/*.png')

src = 'F:/D-Programming/2020/Study Language/Node/node-js-web/2020-09/Isacc-organize-item-site/public/img/isaac_items/test/test2/'
dir = 'f:/D-Programming/2020/Study Language/Node/node-js-web/2020-09/Isacc-organize-item-site/public/img/isaac_items/test/test2/accessory/'

print("len: ", len(files))
# print("m_len: ", len(m_files))

list_a = []

for file in files:
    base = os.path.basename(file)
    data = os.path.splitext(base)[0]
    aData = data + '.png'

    shutil.move(src + aData, dir + aData)