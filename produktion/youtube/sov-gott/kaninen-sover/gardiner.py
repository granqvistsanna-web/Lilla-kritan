# rosa rutiga gardiner på sovrummets platta (röda gardiner -> rosa gingham, behåller vecken via ljusheten)
from PIL import Image, ImageFilter
import numpy as np, sys
src=Image.open(sys.argv[1]); a=np.array(src).astype(float); im=a[...,:3]
H,W,_=im.shape; r,g,b=im[...,0],im[...,1],im[...,2]
mx=im.max(-1); mn=im.min(-1); sat=(mx-mn)/np.maximum(mx,1)
yy,xx=np.mgrid[0:H,0:W]
hard=(r>120)&(r-g>60)&(np.abs(g-b)<45)&(sat>0.35)&(xx<1400)
H8=Image.fromarray((hard*255).astype('uint8'))
red=np.clip((r-np.maximum(g,b)-15)/70,0,1)*(xx<1400)*(yy<1000)
soft=np.array(H8.filter(ImageFilter.MaxFilter(15)).filter(ImageFilter.GaussianBlur(4))).astype(float)/255
hm=np.array(H8.filter(ImageFilter.GaussianBlur(1.5))).astype(float)[...,None]/255
w=np.maximum(red*soft,hm[...,0])
lum=0.3*r+0.59*g+0.11*b; shade=np.clip(lum/np.median(lum[hard]),0.5,1.2)[...,None]
C=44; u=(xx+3*np.sin(yy/37+1))%C; v=(yy+3*np.sin(xx/41+2))%C
sv=(u<C*0.46).astype(float); sh=(v<C*0.46).astype(float)
light=np.array([198,158,172]); mid=np.array([176,104,130]); dark=np.array([152,74,104])
col=light*(1-np.maximum(sv,sh))[...,None]+mid*np.abs(sv-sh)[...,None]+dark*(sv*sh)[...,None]
rng=np.random.default_rng(3); gr=rng.normal(0,1,(H,W))
gr=np.array(Image.fromarray((gr*30+128).clip(0,255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.8))).astype(float)/128-1
col=col*(1+0.07*gr[...,None])*shade
halo=np.array([172,100,126])*shade
newc=col*hm+halo*(1-hm)
a[...,:3]=(im*(1-w[...,None])+newc*w[...,None]).clip(0,255)
Image.fromarray(a.astype('uint8')).save(sys.argv[2])
