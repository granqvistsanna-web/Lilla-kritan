import numpy as np, sys
from PIL import Image
from scipy import ndimage as nd
im=np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(float)
mx=im.max(-1); mn=im.min(-1); sat=(mx-mn)/np.maximum(mx,1); L=im.mean(-1)
inset=float(sys.argv[3]); sig=float(sys.argv[4])
nonwhite=(mn<242)|(sat>0.05)
lab,n=nd.label(nd.binary_closing(nonwhite,iterations=6))
sizes=nd.sum(np.ones_like(L),lab,range(1,n+1)); reg=nd.binary_fill_holes(lab==(np.argmax(sizes)+1))
d=nd.distance_transform_edt(reg)
col=nd.gaussian_filter((d>inset).astype(float),sig)>0.5
lav=(sat>0.15)&(im[...,2]>im[...,0]-5)&(im[...,0]>im[...,1])&(im[...,2]>150)
yel=(im[...,1]>140)&(im[...,2]<130); brn=(L<185)&(im[...,2]<im[...,0]+10)&~lav; other=nd.binary_dilation(nd.binary_opening(yel|brn,iterations=2),iterations=6)
keep=nd.binary_dilation(other,iterations=3)  # body/antennae: untouched geometry
wing=col&~other
w=(lav&wing).astype(float)
fill=np.stack([nd.gaussian_filter(im[...,c]*w,12) for c in range(3)],-1)/np.maximum(nd.gaussian_filter(w,12),1e-3)[...,None]
Lf=fill.mean(-1)
grain=np.clip(L-nd.gaussian_filter(L,1.5),-7,7)[...,None]
out=im.copy()
pale=wing&(L>Lf+10)
out[pale]=(fill+grain*0.5)[pale]
# shape = smoothed wings + original body/antennae area
shape=col|(reg&keep)
dc=nd.distance_transform_edt(~shape)   # distance outside shape
di=nd.distance_transform_edt(shape)
a=np.clip(di-dc+0.5,0,1)  # crude AA
a=nd.gaussian_filter(shape.astype(float),0.8)
out=out*a[...,None]+255*(1-a[...,None])
# fresh rim + faint outline like original
rimw=20
ring=np.clip(1-np.abs(dc-rimw)/1.2,0,1)*0.3
out=out*(1-ring[...,None])+200*ring[...,None]
Image.fromarray(np.clip(out,0,255).astype(np.uint8)).save(sys.argv[2])
