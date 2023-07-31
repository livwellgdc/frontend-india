(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"E69+":function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));var n=i("mrSG"),o=i("8Y7J");class r{constructor(t,e,i){this.dialogRef=t,this.data=e,this.toast=i,this.myEvent=new o.p,this.aspectRatio=1,this.resizeToWidth=350,this.realImage="",this.cropperarea=!1,this.imageChangedEvent="",this.croppedImage=""}ngOnInit(){this.data&&null!==this.data.inputRatio&&(this.aspectRatio=this.data.inputRatio,this.resizeToWidth=this.data.inputWidth)}fileChangeEvent(t){return n.__awaiter(this,void 0,void 0,(function*(){if(t.target.files.length<=0)return;if(t.target.files[0].size>5e5)return void this.toast.info("Please select image of less than 500 KB.");if(!(yield this.getImageDimension(t.target.files[0])))return void this.toast.info(`Image Dimension should be atleast: ${this.getErrorOnType(this.data.type)} px`);let e=[];""!==t.target.files[0].type&&(e=t.target.files[0].type.split("/")),0===e.length||"png"!==e[1].toLowerCase()&&"jpg"!==e[1].toLowerCase()&&"jpeg"!==e[1].toLowerCase()?this.toast.info("Uploaded file is not a valid image. Only JPG, PNG & JPEG files are allowed"):(this.realImage=t.target.files[0],this.imageChangedEvent=t)}))}getImageDimension(t){return new Promise((e,i)=>{let n=URL.createObjectURL(t),o=new Image;o.onload=()=>{switch(this.data.type){case"CLASS":case"CHALLENGE":case"EVENT":case"REWARD":e(o.width>=400&&o.height>=300);break;case"BANNER":e(o.width>=1080&&o.height>=720);break;case"STORIES":e(o.width>=1080&&o.height>=1920);break;case"QUICKLINKS":e(!0);break;default:e(o.width>=300&&o.height>=300)}},o.src=n})}imageCropped(t){this.croppedImage=t.base64,this.croppedImageFile=t.file}dataURLtoFile(t,e=(new Date).getTime()+".png"){let i=t.split(","),n=i[0].match(/:(.*?);/)[1],o=atob(i[1]),r=o.length,s=new Uint8Array(r);for(;r--;)s[r]=o.charCodeAt(r);return new File([s],e,{type:n})}cropped(){this.croppedImage?(this.croppedImageFile=this.dataURLtoFile(this.croppedImage,this.realImage.name),this.dialogRef.close({cropFile:this.croppedImageFile,cropBase64:this.croppedImage,real:this.realImage})):this.toast.info("Please select image (Only JPG, PNG & JPEG)")}cancel(){this.dialogRef.close(!1)}getErrorOnType(t){switch(t){case"CLASS":case"CHALLENGE":case"EVENT":case"REWARD":return"400 X 300";case"BANNER":return"1080 X 720";case"STORIES":return"1080 X 1920";default:return"300 X 300"}}}},G9P8:function(t,e,i){"use strict";var n=i("8Y7J"),o=i("bujt"),r=i("Fwaw"),s=i("5GAg"),a=i("omvX"),l=i("Mr+X"),h=i("Gi4r"),p=i("SVse"),c=i("s6ns");class u{constructor(t,e,i){this.sanitizer=t,this.cd=e,this.zone=i,this.setImageMaxSizeRetries=0,this.cropperScaledMinWidth=20,this.cropperScaledMinHeight=20,this.marginLeft="0px",this.imageVisible=!1,this.format="png",this.outputType="base64",this.maintainAspectRatio=!0,this.aspectRatio=1,this.resizeToWidth=0,this.resizeToHeight=0,this.cropperMinWidth=0,this.cropperMinHeight=0,this.roundCropper=!1,this.onlyScaleDown=!1,this.imageQuality=92,this.autoCrop=!0,this.containWithinAspectRatio=!1,this.cropper={x1:-100,y1:-100,x2:1e4,y2:1e4},this.alignImage="center",this.imageCropped=new n.p,this.startCropImage=new n.p,this.imageLoaded=new n.p,this.cropperReady=new n.p,this.loadImageFailed=new n.p,this.initCropper()}set imageChangedEvent(t){this.initCropper(),t&&t.target&&t.target.files&&t.target.files.length>0&&this.loadImageFile(t.target.files[0])}set imageBase64(t){this.initCropper(),this.checkExifAndLoadBase64Image(t)}set imageFile(t){this.initCropper(),t&&this.loadImageFile(t)}ngOnChanges(t){this.originalImage&&this.originalImage.complete&&t.containWithinAspectRatio&&this.transformOriginalImage(),t.cropper&&(this.setMaxSize(),this.setCropperScaledMinSize(),this.checkCropperPosition(!1),this.doAutoCrop(),this.cd.markForCheck()),t.aspectRatio&&this.imageVisible&&this.resetCropperPosition()}initCropper(){this.imageVisible=!1,this.transformedImage=null,this.safeImgDataUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=",this.moveStart={active:!1,type:null,position:null,x1:0,y1:0,x2:0,y2:0,clientX:0,clientY:0},this.maxSize={width:0,height:0},this.originalSize={width:0,height:0},this.transformedSize={width:0,height:0},this.transformations={rotation:0,flipH:!1,flipV:!1},this.cropper.x1=-100,this.cropper.y1=-100,this.cropper.x2=1e4,this.cropper.y2=1e4}loadImageFile(t){const e=new FileReader;e.onload=e=>{this.isValidImageType(t.type)?this.checkExifAndLoadBase64Image(e.target.result):this.loadImageFailed.emit()},e.readAsDataURL(t)}isValidImageType(t){return/image\/(png|jpg|jpeg|bmp|gif|tiff)/.test(t)}checkExifAndLoadBase64Image(t){return new Promise((e,i)=>{const n=t=>{this.originalImage=null,this.originalBase64=null,i(t)};this.originalImage=new Image,this.originalImage.onload=()=>{this.originalBase64=t,this.transformations=function(t){switch("string"==typeof t&&(t=function(t){const e=new DataView(function(t){t=t.replace(/^data\:([^\;]+)\;base64,/gim,"");const e=atob(t),i=e.length,n=new Uint8Array(i);for(let o=0;o<i;o++)n[o]=e.charCodeAt(o);return n.buffer}(t));if(65496!=e.getUint16(0,!1))return-2;const i=e.byteLength;let n=2;for(;n<i;){if(e.getUint16(n+2,!1)<=8)return-1;const t=e.getUint16(n,!1);if(n+=2,65505==t){if(1165519206!=e.getUint32(n+=2,!1))return-1;const t=18761==e.getUint16(n+=6,!1);n+=e.getUint32(n+4,t);const i=e.getUint16(n,t);n+=2;for(let o=0;o<i;o++)if(274==e.getUint16(n+12*o,t))return e.getUint16(n+12*o+8,t)}else{if(65280!=(65280&t))break;n+=e.getUint16(n,!1)}}return-1}(t)),t){case 1:return{rotation:0,flipH:!1,flipV:!1};case 2:return{rotation:0,flipH:!0,flipV:!1};case 3:return{rotation:2,flipH:!1,flipV:!1};case 4:return{rotation:2,flipH:!0,flipV:!1};case 5:return{rotation:1,flipH:!1,flipV:!1};case 6:return{rotation:1,flipH:!0,flipV:!1};case 7:return{rotation:3,flipH:!1,flipV:!1};case 8:return{rotation:3,flipH:!0,flipV:!1}}return{rotation:0,flipH:!1,flipV:!1}}(t),this.originalSize.width=this.originalImage.naturalWidth,this.originalSize.height=this.originalImage.naturalHeight,this.transformOriginalImage().then(()=>e()).catch(n)},this.originalImage.onerror=n,this.originalImage.src=t})}checkRotation(){this.transformations.rotation=this.transformations.rotation%4,this.transformations.rotation<0&&(this.transformations.rotation+=4)}getTransformedSize(){if(this.containWithinAspectRatio){if(this.transformations.rotation%2){const t=this.originalSize.height/this.aspectRatio;return{width:Math.max(this.originalSize.height,this.originalSize.width*this.aspectRatio),height:Math.max(this.originalSize.width,t)}}{const t=this.originalSize.width/this.aspectRatio;return{width:Math.max(this.originalSize.width,this.originalSize.height*this.aspectRatio),height:Math.max(this.originalSize.height,t)}}}return this.transformations.rotation%2?{height:this.originalSize.width,width:this.originalSize.height}:{width:this.originalSize.width,height:this.originalSize.height}}transformImageBase64(){this.checkRotation();const t=this.getTransformedSize(),e=document.createElement("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");return i.setTransform(this.transformations.flipH?-1:1,0,0,this.transformations.flipV?-1:1,e.width/2,e.height/2),i.rotate(Math.PI*(this.transformations.rotation/2)),i.drawImage(this.originalImage,-this.originalSize.width/2,-this.originalSize.height/2),Promise.resolve(e.toDataURL())}setTransformedImage(t){return new Promise((e,i)=>{this.transformedBase64=t,this.safeImgDataUrl=this.sanitizer.bypassSecurityTrustResourceUrl(t),this.transformedImage=new Image,this.transformedImage.onload=()=>{this.transformedSize.width=this.transformedImage.naturalWidth,this.transformedSize.height=this.transformedImage.naturalHeight,e(),this.cd.markForCheck()},this.transformedImage.onerror=()=>{this.transformedImage=null,i()},this.transformedImage.src=this.transformedBase64})}transformOriginalImage(){return this.originalImage&&this.originalImage.complete?this.transformImageBase64().then(t=>this.setTransformedImage(t)):Promise.reject(new Error("No Image Loaded"))}imageLoadedInView(){null!=this.transformedImage&&(this.imageLoaded.emit(),this.setImageMaxSizeRetries=0,setTimeout(()=>this.checkImageMaxSizeRecursively()))}checkImageMaxSizeRecursively(){this.setImageMaxSizeRetries>40?this.loadImageFailed.emit():this.sourceImage&&this.sourceImage.nativeElement&&this.sourceImage.nativeElement.offsetWidth>0?(this.setMaxSize(),this.setCropperScaledMinSize(),this.resetCropperPosition(),this.cropperReady.emit(),this.cd.markForCheck()):(this.setImageMaxSizeRetries++,setTimeout(()=>{this.checkImageMaxSizeRecursively()},50))}onResize(){this.resizeCropperPosition(),this.setMaxSize(),this.setCropperScaledMinSize()}rotateLeft(){return this.transformations.rotation--,this.transformOriginalImage()}rotateRight(){return this.transformations.rotation++,this.transformOriginalImage()}flipHorizontal(){return this.transformations.flipH=!this.transformations.flipH,this.transformOriginalImage()}flipVertical(){return this.transformations.flipV=!this.transformations.flipV,this.transformOriginalImage()}resetImage(){this.imageBase64=this.originalBase64}resizeCropperPosition(){const t=this.sourceImage.nativeElement;this.maxSize.width===t.offsetWidth&&this.maxSize.height===t.offsetHeight||(this.cropper.x1=this.cropper.x1*t.offsetWidth/this.maxSize.width,this.cropper.x2=this.cropper.x2*t.offsetWidth/this.maxSize.width,this.cropper.y1=this.cropper.y1*t.offsetHeight/this.maxSize.height,this.cropper.y2=this.cropper.y2*t.offsetHeight/this.maxSize.height)}resetCropperPosition(){const t=this.sourceImage.nativeElement;if(this.maintainAspectRatio)if(t.offsetWidth/this.aspectRatio<t.offsetHeight){this.cropper.x1=0,this.cropper.x2=t.offsetWidth;const e=t.offsetWidth/this.aspectRatio;this.cropper.y1=(t.offsetHeight-e)/2,this.cropper.y2=this.cropper.y1+e}else{this.cropper.y1=0,this.cropper.y2=t.offsetHeight;const e=t.offsetHeight*this.aspectRatio;this.cropper.x1=(t.offsetWidth-e)/2,this.cropper.x2=this.cropper.x1+e}else this.cropper.x1=0,this.cropper.x2=t.offsetWidth,this.cropper.y1=0,this.cropper.y2=t.offsetHeight;this.doAutoCrop(),this.imageVisible=!0}startMove(t,e,i=null){t.preventDefault(),this.moveStart=Object.assign({active:!0,type:e,position:i,clientX:this.getClientX(t),clientY:this.getClientY(t)},this.cropper)}moveImg(t){this.moveStart.active&&(t.stopPropagation(),t.preventDefault(),"move"===this.moveStart.type?(this.move(t),this.checkCropperPosition(!0)):"resize"===this.moveStart.type&&(this.resize(t),this.checkCropperPosition(!1)),this.cd.detectChanges())}setMaxSize(){if(this.sourceImage){const t=this.sourceImage.nativeElement;this.maxSize.width=t.offsetWidth,this.maxSize.height=t.offsetHeight,this.marginLeft=this.sanitizer.bypassSecurityTrustStyle("calc(50% - "+this.maxSize.width/2+"px)")}}setCropperScaledMinSize(){this.transformedImage?(this.setCropperScaledMinWidth(),this.setCropperScaledMinHeight()):(this.cropperScaledMinWidth=20,this.cropperScaledMinHeight=20)}setCropperScaledMinWidth(){this.cropperScaledMinWidth=this.cropperMinWidth>0?Math.max(20,this.cropperMinWidth/this.transformedImage.width*this.maxSize.width):20}setCropperScaledMinHeight(){this.cropperScaledMinHeight=this.maintainAspectRatio?Math.max(20,this.cropperScaledMinWidth/this.aspectRatio):this.cropperMinHeight>0?Math.max(20,this.cropperMinHeight/this.transformedImage.height*this.maxSize.height):20}checkCropperPosition(t=!1){this.cropper.x1<0&&(this.cropper.x2-=t?this.cropper.x1:0,this.cropper.x1=0),this.cropper.y1<0&&(this.cropper.y2-=t?this.cropper.y1:0,this.cropper.y1=0),this.cropper.x2>this.maxSize.width&&(this.cropper.x1-=t?this.cropper.x2-this.maxSize.width:0,this.cropper.x2=this.maxSize.width),this.cropper.y2>this.maxSize.height&&(this.cropper.y1-=t?this.cropper.y2-this.maxSize.height:0,this.cropper.y2=this.maxSize.height)}moveStop(){this.moveStart.active&&(this.moveStart.active=!1,this.doAutoCrop())}move(t){const e=this.getClientX(t)-this.moveStart.clientX,i=this.getClientY(t)-this.moveStart.clientY;this.cropper.x1=this.moveStart.x1+e,this.cropper.y1=this.moveStart.y1+i,this.cropper.x2=this.moveStart.x2+e,this.cropper.y2=this.moveStart.y2+i}resize(t){const e=this.getClientX(t)-this.moveStart.clientX,i=this.getClientY(t)-this.moveStart.clientY;switch(this.moveStart.position){case"left":this.cropper.x1=Math.min(this.moveStart.x1+e,this.cropper.x2-this.cropperScaledMinWidth);break;case"topleft":this.cropper.x1=Math.min(this.moveStart.x1+e,this.cropper.x2-this.cropperScaledMinWidth),this.cropper.y1=Math.min(this.moveStart.y1+i,this.cropper.y2-this.cropperScaledMinHeight);break;case"top":this.cropper.y1=Math.min(this.moveStart.y1+i,this.cropper.y2-this.cropperScaledMinHeight);break;case"topright":this.cropper.x2=Math.max(this.moveStart.x2+e,this.cropper.x1+this.cropperScaledMinWidth),this.cropper.y1=Math.min(this.moveStart.y1+i,this.cropper.y2-this.cropperScaledMinHeight);break;case"right":this.cropper.x2=Math.max(this.moveStart.x2+e,this.cropper.x1+this.cropperScaledMinWidth);break;case"bottomright":this.cropper.x2=Math.max(this.moveStart.x2+e,this.cropper.x1+this.cropperScaledMinWidth),this.cropper.y2=Math.max(this.moveStart.y2+i,this.cropper.y1+this.cropperScaledMinHeight);break;case"bottom":this.cropper.y2=Math.max(this.moveStart.y2+i,this.cropper.y1+this.cropperScaledMinHeight);break;case"bottomleft":this.cropper.x1=Math.min(this.moveStart.x1+e,this.cropper.x2-this.cropperScaledMinWidth),this.cropper.y2=Math.max(this.moveStart.y2+i,this.cropper.y1+this.cropperScaledMinHeight)}this.maintainAspectRatio&&this.checkAspectRatio()}checkAspectRatio(){let t=0,e=0;switch(this.moveStart.position){case"top":this.cropper.x2=this.cropper.x1+(this.cropper.y2-this.cropper.y1)*this.aspectRatio,t=Math.max(this.cropper.x2-this.maxSize.width,0),e=Math.max(0-this.cropper.y1,0),(t>0||e>0)&&(this.cropper.x2-=e*this.aspectRatio>t?e*this.aspectRatio:t,this.cropper.y1+=e*this.aspectRatio>t?e:t/this.aspectRatio);break;case"bottom":this.cropper.x2=this.cropper.x1+(this.cropper.y2-this.cropper.y1)*this.aspectRatio,t=Math.max(this.cropper.x2-this.maxSize.width,0),e=Math.max(this.cropper.y2-this.maxSize.height,0),(t>0||e>0)&&(this.cropper.x2-=e*this.aspectRatio>t?e*this.aspectRatio:t,this.cropper.y2-=e*this.aspectRatio>t?e:t/this.aspectRatio);break;case"topleft":this.cropper.y1=this.cropper.y2-(this.cropper.x2-this.cropper.x1)/this.aspectRatio,t=Math.max(0-this.cropper.x1,0),e=Math.max(0-this.cropper.y1,0),(t>0||e>0)&&(this.cropper.x1+=e*this.aspectRatio>t?e*this.aspectRatio:t,this.cropper.y1+=e*this.aspectRatio>t?e:t/this.aspectRatio);break;case"topright":this.cropper.y1=this.cropper.y2-(this.cropper.x2-this.cropper.x1)/this.aspectRatio,t=Math.max(this.cropper.x2-this.maxSize.width,0),e=Math.max(0-this.cropper.y1,0),(t>0||e>0)&&(this.cropper.x2-=e*this.aspectRatio>t?e*this.aspectRatio:t,this.cropper.y1+=e*this.aspectRatio>t?e:t/this.aspectRatio);break;case"right":case"bottomright":this.cropper.y2=this.cropper.y1+(this.cropper.x2-this.cropper.x1)/this.aspectRatio,t=Math.max(this.cropper.x2-this.maxSize.width,0),e=Math.max(this.cropper.y2-this.maxSize.height,0),(t>0||e>0)&&(this.cropper.x2-=e*this.aspectRatio>t?e*this.aspectRatio:t,this.cropper.y2-=e*this.aspectRatio>t?e:t/this.aspectRatio);break;case"left":case"bottomleft":this.cropper.y2=this.cropper.y1+(this.cropper.x2-this.cropper.x1)/this.aspectRatio,t=Math.max(0-this.cropper.x1,0),e=Math.max(this.cropper.y2-this.maxSize.height,0),(t>0||e>0)&&(this.cropper.x1+=e*this.aspectRatio>t?e*this.aspectRatio:t,this.cropper.y2-=e*this.aspectRatio>t?e:t/this.aspectRatio)}}doAutoCrop(){this.autoCrop&&this.crop()}crop(t=this.outputType){if(this.sourceImage.nativeElement&&null!=this.transformedImage){this.startCropImage.emit();const e=this.getImagePosition(),i=e.x2-e.x1,n=e.y2-e.y1,o=document.createElement("canvas");o.width=i,o.height=n;const r=o.getContext("2d");if(r){null!=this.backgroundColor&&(r.fillStyle=this.backgroundColor,r.fillRect(0,0,i,n)),r.drawImage(this.transformedImage,e.x1,e.y1,i,n,0,0,i,n);const s={width:i,height:n,imagePosition:e,cropperPosition:Object.assign({},this.cropper),transform:Object.assign({},this.transformations)};this.containWithinAspectRatio&&(s.offsetImagePosition=this.getOffsetImagePosition());const a=this.getResizeRatio(i,n);return 1!==a&&(s.width=Math.round(i*a),s.height=this.maintainAspectRatio?Math.round(s.width/this.aspectRatio):Math.round(n*a),function(t,e,i,n=!0){const o=t.width,r=t.height,s=o/(e=Math.round(e)),a=r/(i=Math.round(i)),l=Math.ceil(s/2),h=Math.ceil(a/2),p=t.getContext("2d");if(p){const c=p.getImageData(0,0,o,r),u=p.createImageData(e,i),g=c.data,m=u.data;for(let t=0;t<i;t++)for(let i=0;i<e;i++){const n=4*(i+t*e),p=t*a;let c=0,u=0,d=0,f=0,b=0,x=0,M=0;const w=Math.floor(i*s),C=Math.floor(t*a);let y=Math.ceil((i+1)*s),v=Math.ceil((t+1)*a);y=Math.min(y,o),v=Math.min(v,r);for(let t=C;t<v;t++){const e=Math.abs(p-t)/h,n=i*s,r=e*e;for(let i=w;i<y;i++){const e=Math.abs(n-i)/l,s=Math.sqrt(r+e*e);if(s>=1)continue;c=2*s*s*s-3*s*s+1;const a=4*(i+t*o);M+=c*g[a+3],d+=c,g[a+3]<255&&(c=c*g[a+3]/250),f+=c*g[a],b+=c*g[a+1],x+=c*g[a+2],u+=c}}m[n]=f/u,m[n+1]=b/u,m[n+2]=x/u,m[n+3]=M/d}n?(t.width=e,t.height=i):p.clearRect(0,0,o,r),p.putImageData(u,0,0)}}(o,s.width,s.height)),this.cropToOutputType(t,o,s)}}return null}getImagePosition(){const t=this.transformedSize.width/this.sourceImage.nativeElement.offsetWidth,e={x1:Math.round(this.cropper.x1*t),y1:Math.round(this.cropper.y1*t),x2:Math.round(this.cropper.x2*t),y2:Math.round(this.cropper.y2*t)};return this.containWithinAspectRatio||(e.x1=Math.max(e.x1,0),e.y1=Math.max(e.y1,0),e.x2=Math.min(e.x2,this.transformedSize.width),e.y2=Math.min(e.y2,this.transformedSize.height)),e}getOffsetImagePosition(){const t=this.transformedSize.width/this.sourceImage.nativeElement.offsetWidth;let e,i;this.transformations.rotation%2?(e=(this.transformedSize.width-this.originalSize.height)/2,i=(this.transformedSize.height-this.originalSize.width)/2):(e=(this.transformedSize.width-this.originalSize.width)/2,i=(this.transformedSize.height-this.originalSize.height)/2);const n={x1:Math.round(this.cropper.x1*t)-e,y1:Math.round(this.cropper.y1*t)-i,x2:Math.round(this.cropper.x2*t)-e,y2:Math.round(this.cropper.y2*t)-i};return this.containWithinAspectRatio||(n.x1=Math.max(n.x1,0),n.y1=Math.max(n.y1,0),n.x2=Math.min(n.x2,this.transformedSize.width),n.y2=Math.min(n.y2,this.transformedSize.height)),n}cropToOutputType(t,e,i){switch(t){case"file":return this.cropToFile(e).then(t=>(i.file=t,this.imageCropped.emit(i),i));case"both":return i.base64=this.cropToBase64(e),this.cropToFile(e).then(t=>(i.file=t,this.imageCropped.emit(i),i));default:return i.base64=this.cropToBase64(e),this.imageCropped.emit(i),i}}cropToBase64(t){return t.toDataURL("image/"+this.format,this.getQuality())}cropToFile(t){return new Promise(e=>{t.toBlob(t=>this.zone.run(()=>e(t)),"image/"+this.format,this.getQuality())})}getQuality(){return Math.min(1,Math.max(0,this.imageQuality/100))}getResizeRatio(t,e){if(this.resizeToWidth>0){if(!this.onlyScaleDown||t>this.resizeToWidth)return this.resizeToWidth/t}else if(this.resizeToHeight>0&&(!this.onlyScaleDown||e>this.resizeToHeight))return this.resizeToHeight/e;return 1}getClientX(t){return t.touches&&t.touches[0]&&t.touches[0].clientX||t.clientX}getClientY(t){return t.touches&&t.touches[0]&&t.touches[0].clientY||t.clientY}}var g=i("cUpR"),m=n.Cb({encapsulation:0,styles:[['[_nghost-%COMP%]{display:-webkit-box;display:flex;position:relative;width:100%;max-width:100%;max-height:100%;overflow:hidden;padding:5px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[_nghost-%COMP%] > div[_ngcontent-%COMP%]{position:relative;width:100%}[_nghost-%COMP%] > div[_ngcontent-%COMP%]   img.source-image[_ngcontent-%COMP%]{max-width:100%;max-height:100%}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]{position:absolute;display:-webkit-box;display:flex;color:#53535c;background:0 0;touch-action:none;outline:rgba(255,255,255,.3) solid 100vw}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]:after{position:absolute;content:"";top:0;bottom:0;left:0;right:0;pointer-events:none;border:1px dashed;opacity:.75;color:inherit;z-index:1}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .move[_ngcontent-%COMP%]{width:100%;cursor:move;border:1px solid rgba(255,255,255,.5)}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize[_ngcontent-%COMP%]{position:absolute;display:inline-block;line-height:6px;padding:8px;opacity:.85;z-index:1}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize[_ngcontent-%COMP%]   .square[_ngcontent-%COMP%]{display:inline-block;background:#53535c;width:6px;height:6px;border:1px solid rgba(255,255,255,.5);box-sizing:content-box}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.topleft[_ngcontent-%COMP%]{top:-12px;left:-12px;cursor:nwse-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.top[_ngcontent-%COMP%]{top:-12px;left:calc(50% - 12px);cursor:ns-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.topright[_ngcontent-%COMP%]{top:-12px;right:-12px;cursor:nesw-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.right[_ngcontent-%COMP%]{top:calc(50% - 12px);right:-12px;cursor:ew-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.bottomright[_ngcontent-%COMP%]{bottom:-12px;right:-12px;cursor:nwse-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.bottom[_ngcontent-%COMP%]{bottom:-12px;left:calc(50% - 12px);cursor:ns-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.bottomleft[_ngcontent-%COMP%]{bottom:-12px;left:-12px;cursor:nesw-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.left[_ngcontent-%COMP%]{top:calc(50% - 12px);left:-12px;cursor:ew-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar[_ngcontent-%COMP%]{position:absolute;z-index:1}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar.top[_ngcontent-%COMP%]{top:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:ns-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar.right[_ngcontent-%COMP%]{top:11px;right:-11px;height:calc(100% - 22px);width:22px;cursor:ew-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar.bottom[_ngcontent-%COMP%]{bottom:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:ns-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar.left[_ngcontent-%COMP%]{top:11px;left:-11px;height:calc(100% - 22px);width:22px;cursor:ew-resize}[_nghost-%COMP%]   .cropper.rounded[_ngcontent-%COMP%]{outline-color:transparent}[_nghost-%COMP%]   .cropper.rounded[_ngcontent-%COMP%]:after{border-radius:100%;box-shadow:0 0 0 100vw rgba(255,255,255,.3)}@media (orientation:portrait){[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]{outline-width:100vh}[_nghost-%COMP%]   .cropper.rounded[_ngcontent-%COMP%]:after{box-shadow:0 0 0 100vh rgba(255,255,255,.3)}}[_nghost-%COMP%]   .cropper.rounded[_ngcontent-%COMP%]   .move[_ngcontent-%COMP%]{border-radius:100%}']],data:{}});function d(t){return n.ac(0,[(t()(),n.Eb(0,0,null,null,22,"div",[["class","cropper"]],[[2,"rounded",null],[4,"top","px"],[4,"left","px"],[4,"width","px"],[4,"height","px"],[4,"margin-left",null],[4,"visibility",null]],null,null,null,null)),(t()(),n.Eb(1,0,null,null,1,"div",[["class","move"]],null,[[null,"mousedown"],[null,"touchstart"]],(function(t,e,i){var n=!0,o=t.component;return"mousedown"===e&&(n=!1!==o.startMove(i,"move")&&n),"touchstart"===e&&(n=!1!==o.startMove(i,"move")&&n),n}),null,null)),(t()(),n.Yb(-1,null,["\xa0"])),(t()(),n.Eb(3,0,null,null,1,"span",[["class","resize topleft"]],null,[[null,"mousedown"],[null,"touchstart"]],(function(t,e,i){var n=!0,o=t.component;return"mousedown"===e&&(n=!1!==o.startMove(i,"resize","topleft")&&n),"touchstart"===e&&(n=!1!==o.startMove(i,"resize","topleft")&&n),n}),null,null)),(t()(),n.Eb(4,0,null,null,0,"span",[["class","square"]],null,null,null,null,null)),(t()(),n.Eb(5,0,null,null,1,"span",[["class","resize top"]],null,null,null,null,null)),(t()(),n.Eb(6,0,null,null,0,"span",[["class","square"]],null,null,null,null,null)),(t()(),n.Eb(7,0,null,null,1,"span",[["class","resize topright"]],null,[[null,"mousedown"],[null,"touchstart"]],(function(t,e,i){var n=!0,o=t.component;return"mousedown"===e&&(n=!1!==o.startMove(i,"resize","topright")&&n),"touchstart"===e&&(n=!1!==o.startMove(i,"resize","topright")&&n),n}),null,null)),(t()(),n.Eb(8,0,null,null,0,"span",[["class","square"]],null,null,null,null,null)),(t()(),n.Eb(9,0,null,null,1,"span",[["class","resize right"]],null,null,null,null,null)),(t()(),n.Eb(10,0,null,null,0,"span",[["class","square"]],null,null,null,null,null)),(t()(),n.Eb(11,0,null,null,1,"span",[["class","resize bottomright"]],null,[[null,"mousedown"],[null,"touchstart"]],(function(t,e,i){var n=!0,o=t.component;return"mousedown"===e&&(n=!1!==o.startMove(i,"resize","bottomright")&&n),"touchstart"===e&&(n=!1!==o.startMove(i,"resize","bottomright")&&n),n}),null,null)),(t()(),n.Eb(12,0,null,null,0,"span",[["class","square"]],null,null,null,null,null)),(t()(),n.Eb(13,0,null,null,1,"span",[["class","resize bottom"]],null,null,null,null,null)),(t()(),n.Eb(14,0,null,null,0,"span",[["class","square"]],null,null,null,null,null)),(t()(),n.Eb(15,0,null,null,1,"span",[["class","resize bottomleft"]],null,[[null,"mousedown"],[null,"touchstart"]],(function(t,e,i){var n=!0,o=t.component;return"mousedown"===e&&(n=!1!==o.startMove(i,"resize","bottomleft")&&n),"touchstart"===e&&(n=!1!==o.startMove(i,"resize","bottomleft")&&n),n}),null,null)),(t()(),n.Eb(16,0,null,null,0,"span",[["class","square"]],null,null,null,null,null)),(t()(),n.Eb(17,0,null,null,1,"span",[["class","resize left"]],null,null,null,null,null)),(t()(),n.Eb(18,0,null,null,0,"span",[["class","square"]],null,null,null,null,null)),(t()(),n.Eb(19,0,null,null,0,"span",[["class","resize-bar top"]],null,[[null,"mousedown"],[null,"touchstart"]],(function(t,e,i){var n=!0,o=t.component;return"mousedown"===e&&(n=!1!==o.startMove(i,"resize","top")&&n),"touchstart"===e&&(n=!1!==o.startMove(i,"resize","top")&&n),n}),null,null)),(t()(),n.Eb(20,0,null,null,0,"span",[["class","resize-bar right"]],null,[[null,"mousedown"],[null,"touchstart"]],(function(t,e,i){var n=!0,o=t.component;return"mousedown"===e&&(n=!1!==o.startMove(i,"resize","right")&&n),"touchstart"===e&&(n=!1!==o.startMove(i,"resize","right")&&n),n}),null,null)),(t()(),n.Eb(21,0,null,null,0,"span",[["class","resize-bar bottom"]],null,[[null,"mousedown"],[null,"touchstart"]],(function(t,e,i){var n=!0,o=t.component;return"mousedown"===e&&(n=!1!==o.startMove(i,"resize","bottom")&&n),"touchstart"===e&&(n=!1!==o.startMove(i,"resize","bottom")&&n),n}),null,null)),(t()(),n.Eb(22,0,null,null,0,"span",[["class","resize-bar left"]],null,[[null,"mousedown"],[null,"touchstart"]],(function(t,e,i){var n=!0,o=t.component;return"mousedown"===e&&(n=!1!==o.startMove(i,"resize","left")&&n),"touchstart"===e&&(n=!1!==o.startMove(i,"resize","left")&&n),n}),null,null))],null,(function(t,e){var i=e.component;t(e,0,0,i.roundCropper,i.cropper.y1,i.cropper.x1,i.cropper.x2-i.cropper.x1,i.cropper.y2-i.cropper.y1,"center"===i.alignImage?i.marginLeft:null,i.imageVisible?"visible":"hidden")}))}function f(t){return n.ac(2,[n.Wb(402653184,1,{sourceImage:0}),(t()(),n.Eb(1,0,null,null,3,"div",[],[[4,"background",null]],null,null,null,null)),(t()(),n.Eb(2,0,[[1,0],["sourceImage",1]],null,0,"img",[["class","source-image"]],[[8,"src",4],[4,"visibility",null]],[[null,"load"]],(function(t,e,i){var n=!0;return"load"===e&&(n=!1!==t.component.imageLoadedInView()&&n),n}),null,null)),(t()(),n.tb(16777216,null,null,1,null,d)),n.Db(4,16384,null,0,p.m,[n.Z,n.V],{ngIf:[0,"ngIf"]},null)],(function(t,e){t(e,4,0,e.component.imageVisible)}),(function(t,e){var i=e.component;t(e,1,0,i.imageVisible&&i.backgroundColor),t(e,2,0,i.safeImgDataUrl,i.imageVisible?"visible":"hidden")}))}var b=i("E69+"),x=i("dfTd");i.d(e,"a",(function(){return _}));var M=n.Cb({encapsulation:0,styles:[['@media (max-width:767px){  .cdk-global-scrollblock .cropper_dialog{max-width:100%!important;height:100%}  .cdk-global-scrollblock .cropper_dialog .mat-dialog-container{border-radius:0;max-height:100vh;padding:10px}  .cdk-global-scrollblock .cropper_dialog button[mat-dialog-close].mat-icon-button{top:10px;right:10px}}  .mat-dialog-container{display:block;padding:24px;border-radius:4px;box-sizing:border-box;outline:0;width:100%;height:100%;overflow:initial}.image-croper[_ngcontent-%COMP%]{position:relative}.close[_ngcontent-%COMP%]{position:absolute;top:-42px;right:-43px;background:#cbcbcb}.modal_message[_ngcontent-%COMP%]{padding:20px 0;min-height:300px;min-width:320px;position:relative}.form-btn[_ngcontent-%COMP%]{padding:10px 0 0;-webkit-box-pack:start;justify-content:flex-start}.form-btn[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] ~ button[_ngcontent-%COMP%]{margin-left:10px}.upload_btn[_ngcontent-%COMP%]{position:relative;margin-bottom:10px;display:inline-block}.upload_btn[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{opacity:0;position:absolute;top:0;left:0;width:100%;height:100%;z-index:999}.cropper_area[_ngcontent-%COMP%]{border:1px solid rgba(0,33,206,.3);min-height:200px;padding:2px;min-width:100px;max-width:100%}.image_preview[_ngcontent-%COMP%]{border:1px dotted #282226;padding:2px;display:inline-block;width:100%;height:200px;background-color:rgba(110,142,192,.1);position:relative}.image_preview[_ngcontent-%COMP%]:before{content:"Preview Image";position:absolute;top:50%;left:50%;line-height:normal;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.image_preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;display:block;position:relative;max-height:100%;margin:0 auto;background-color:#f1f1f1}.crop_wrap[_ngcontent-%COMP%]{display:-webkit-box;display:flex;flex-wrap:wrap;margin:5px 0}.crop_wrap[_ngcontent-%COMP%]   .cropper_area[_ngcontent-%COMP%]{-webkit-box-flex:1;flex:1}.crop_wrap[_ngcontent-%COMP%]   .image_preview[_ngcontent-%COMP%]{width:161px;height:199px;margin-right:10px}.crop_wrap[_ngcontent-%COMP%]   .image_preview[_ngcontent-%COMP%]:before{font-size:12px}.crop_wrap[_ngcontent-%COMP%]   .image_preview.banner[_ngcontent-%COMP%]{height:128px;width:250px}.crop_wrap[_ngcontent-%COMP%]   .image_preview.logo[_ngcontent-%COMP%]{width:200px;height:150px}@media (max-width:576px){.crop_wrap[_ngcontent-%COMP%]   .cropper_area[_ngcontent-%COMP%]{-webkit-box-flex:100%;flex:100%}.crop_wrap[_ngcontent-%COMP%]   .image_preview[_ngcontent-%COMP%]{margin-bottom:10px;position:relative;width:100%}}']],data:{}});function w(t){return n.ac(0,[(t()(),n.Eb(0,0,null,null,1,null,null,null,null,null,null,null)),(t()(),n.Yb(-1,null,[" 400 X 300"]))],null,null)}function C(t){return n.ac(0,[(t()(),n.Eb(0,0,null,null,1,null,null,null,null,null,null,null)),(t()(),n.Yb(-1,null,["1080 X 720"]))],null,null)}function y(t){return n.ac(0,[(t()(),n.Eb(0,0,null,null,1,null,null,null,null,null,null,null)),(t()(),n.Yb(-1,null,["1080 X 1920"]))],null,null)}function v(t){return n.ac(0,[(t()(),n.Eb(0,0,null,null,1,null,null,null,null,null,null,null)),(t()(),n.Yb(-1,null,["300 X 300"]))],null,null)}function z(t){return n.ac(0,[(t()(),n.Eb(0,0,null,null,40,"div",[["class","image-croper"]],null,null,null,null,null)),(t()(),n.Eb(1,0,null,null,4,"button",[["class","close"],["mat-icon-button",""]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],(function(t,e,i){var n=!0;return"click"===e&&(n=!1!==t.component.cancel()&&n),n}),o.b,o.a)),n.Db(2,180224,null,0,r.b,[n.n,s.h,[2,a.a]],null,null),(t()(),n.Eb(3,0,null,0,2,"mat-icon",[["class","mat-icon notranslate"],["role","img"]],[[2,"mat-icon-inline",null],[2,"mat-icon-no-color",null]],null,null,l.b,l.a)),n.Db(4,9158656,null,0,h.b,[n.n,h.d,[8,null],[2,h.a],[2,n.o]],null,null),(t()(),n.Yb(-1,0,["clear"])),(t()(),n.Eb(6,0,null,null,3,"button",[["class","upload_btn "],["color","primary"],["mat-flat-button",""],["type","button"]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],null,null,o.b,o.a)),n.Db(7,180224,null,0,r.b,[n.n,s.h,[2,a.a]],{color:[0,"color"]},null),(t()(),n.Yb(-1,0,[" Select Image "])),(t()(),n.Eb(9,0,null,0,0,"input",[["accept","image/*"],["type","file"]],null,[[null,"change"]],(function(t,e,i){var n=!0;return"change"===e&&(n=!1!==t.component.fileChangeEvent(i)&&n),n}),null,null)),(t()(),n.Yb(-1,null,[" (Image Dimension should be atleast: "])),(t()(),n.Eb(11,0,null,null,9,null,null,null,null,null,null,null)),n.Db(12,16384,null,0,p.q,[],{ngSwitch:[0,"ngSwitch"]},null),(t()(),n.tb(16777216,null,null,1,null,w)),n.Db(14,278528,null,0,p.r,[n.Z,n.V,p.q],{ngSwitchCase:[0,"ngSwitchCase"]},null),(t()(),n.tb(16777216,null,null,1,null,C)),n.Db(16,278528,null,0,p.r,[n.Z,n.V,p.q],{ngSwitchCase:[0,"ngSwitchCase"]},null),(t()(),n.tb(16777216,null,null,1,null,y)),n.Db(18,278528,null,0,p.r,[n.Z,n.V,p.q],{ngSwitchCase:[0,"ngSwitchCase"]},null),(t()(),n.tb(16777216,null,null,1,null,v)),n.Db(20,16384,null,0,p.s,[n.Z,n.V,p.q],null,null),(t()(),n.Yb(-1,null,[" px) "])),(t()(),n.Eb(22,0,null,null,11,"mat-dialog-content",[["class","mat-dialog-content"]],null,null,null,null,null)),n.Db(23,16384,null,0,c.j,[],null,null),(t()(),n.Eb(24,0,null,null,9,"div",[["class","modal_body"]],null,null,null,null,null)),(t()(),n.Eb(25,0,null,null,8,"div",[["class","crop_wrap"]],null,null,null,null,null)),(t()(),n.Eb(26,0,null,null,4,"div",[["class","image_preview"]],null,null,null,null,null)),n.Vb(512,null,p.z,p.A,[n.y,n.z,n.n,n.N]),n.Db(28,278528,null,0,p.k,[p.z],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(t()(),n.Eb(29,0,null,null,1,null,null,null,null,null,null,null)),(t()(),n.Eb(30,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null)),(t()(),n.Eb(31,0,null,null,2,"div",[["class","cropper_area"]],null,null,null,null,null)),(t()(),n.Eb(32,0,null,null,1,"image-cropper",[["format","png"]],[[4,"text-align",null]],[[null,"imageCropped"],["window","resize"],["document","mousemove"],["document","touchmove"],["document","mouseup"],["document","touchend"]],(function(t,e,i){var o=!0,r=t.component;return"window:resize"===e&&(o=!1!==n.Qb(t,33).onResize()&&o),"document:mousemove"===e&&(o=!1!==n.Qb(t,33).moveImg(i)&&o),"document:touchmove"===e&&(o=!1!==n.Qb(t,33).moveImg(i)&&o),"document:mouseup"===e&&(o=!1!==n.Qb(t,33).moveStop()&&o),"document:touchend"===e&&(o=!1!==n.Qb(t,33).moveStop()&&o),"imageCropped"===e&&(o=!1!==r.imageCropped(i)&&o),o}),f,m)),n.Db(33,573440,null,0,u,[g.b,n.i,n.G],{imageChangedEvent:[0,"imageChangedEvent"],format:[1,"format"],maintainAspectRatio:[2,"maintainAspectRatio"],aspectRatio:[3,"aspectRatio"],resizeToWidth:[4,"resizeToWidth"],cropperMinWidth:[5,"cropperMinWidth"]},{imageCropped:"imageCropped"}),(t()(),n.Eb(34,0,null,null,6,"div",[["class","form-btn"]],null,null,null,null,null)),(t()(),n.Eb(35,0,null,null,2,"button",[["color","default"],["mat-stroked-button",""],["type","submit"]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],(function(t,e,i){var n=!0;return"click"===e&&(n=!1!==t.component.cancel()&&n),n}),o.b,o.a)),n.Db(36,180224,null,0,r.b,[n.n,s.h,[2,a.a]],{color:[0,"color"]},null),(t()(),n.Yb(-1,0,["Cancel"])),(t()(),n.Eb(38,0,null,null,2,"button",[["color","primary"],["mat-flat-button",""],["type","submit"]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],(function(t,e,i){var n=!0;return"click"===e&&(n=!1!==t.component.cropped()&&n),n}),o.b,o.a)),n.Db(39,180224,null,0,r.b,[n.n,s.h,[2,a.a]],{color:[0,"color"]},null),(t()(),n.Yb(-1,0,["Crop"]))],(function(t,e){var i=e.component;t(e,4,0),t(e,7,0,"primary"),t(e,12,0,!0),t(e,14,0,"CLASS"==(null==i.data?null:i.data.type)||"CHALLENGE"==(null==i.data?null:i.data.type)||"EVENT"==(null==i.data?null:i.data.type)||"REWARD"==(null==i.data?null:i.data.type)),t(e,16,0,"BANNER"==(null==i.data?null:i.data.type)),t(e,18,0,"STORIES"==(null==i.data?null:i.data.type)),t(e,28,0,"image_preview",i.data.class?i.data.class:""),t(e,33,0,i.imageChangedEvent,"png",!0,i.aspectRatio,i.resizeToWidth,i.resizeToWidth),t(e,36,0,"default"),t(e,39,0,"primary")}),(function(t,e){var i=e.component;t(e,1,0,n.Qb(e,2).disabled||null,"NoopAnimations"===n.Qb(e,2)._animationMode),t(e,3,0,n.Qb(e,4).inline,"primary"!==n.Qb(e,4).color&&"accent"!==n.Qb(e,4).color&&"warn"!==n.Qb(e,4).color),t(e,6,0,n.Qb(e,7).disabled||null,"NoopAnimations"===n.Qb(e,7)._animationMode),t(e,30,0,i.croppedImage),t(e,32,0,n.Qb(e,33).alignImage),t(e,35,0,n.Qb(e,36).disabled||null,"NoopAnimations"===n.Qb(e,36)._animationMode),t(e,38,0,n.Qb(e,39).disabled||null,"NoopAnimations"===n.Qb(e,39)._animationMode)}))}function S(t){return n.ac(0,[(t()(),n.Eb(0,0,null,null,1,"lv-upload-popup",[],null,null,null,z,M)),n.Db(1,114688,null,0,b.a,[c.l,c.a,x.a],null,null)],(function(t,e){t(e,1,0)}),null)}var _=n.Ab("lv-upload-popup",b.a,S,{},{myEvent:"myEvent"},[])},QxTp:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));class n{}},"vA/O":function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));class n{}}}]);