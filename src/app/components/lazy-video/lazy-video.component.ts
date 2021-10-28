import { Component, OnInit, EventEmitter, Output, Input, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { VIDEO_FORMAT, IMAGE_FORMAT, AUDIO_FORMAT, invalidImageError, invalidVideoError, invalidAudioError, MAX_IMAGE_SIZE, MAX_VIDEO_SIZE, MAX_AUDIO_SIZE } from '../../constants/messages';
import { ToastService } from '../toast-notification/toast.service';

@Component({
  selector: 'lv-lazy-video',
  templateUrl: './lazy-video.component.html',
  styleUrls: ['./lazy-video.component.scss']
})
export class LazyVideoComponent implements OnInit {

  private _input: HTMLInputElement;
  @Input() addCustomCss: boolean = false;
  @Input() addLivwellVideoCss: boolean = false;
  @Input() overlayText = 'Choose Any Media File';
  private _validators: ((file: FileData) => Promise<boolean>)[] = [];
  VIDEO_FORMAT = VIDEO_FORMAT;
  IMAGE_FORMAT = IMAGE_FORMAT;
  AUDIO_FORMAT = AUDIO_FORMAT;
  IMAGE_ERROR = invalidImageError();
  VIDEO_ERROR = invalidVideoError();
  AUDIO_ERROR = invalidAudioError()
  @ViewChildren('myVideo') myVideo: QueryList<ElementRef<HTMLVideoElement>>;
  @ViewChildren('myAudio') myAudio: QueryList<ElementRef<HTMLAudioElement>>;
  subscription = new Subscription();
  // data store
  _store: FileData[] = [];

  duration = 0;

  get data(): FileData[] {
    return this._store;
  }

  get filesToUpload() {
    return this._store.filter((fileData) => !fileData.uploaded);
  }

  get uploadedUrls() {
    return this._store.filter((fileData) => fileData.uploaded).map((fileData) => fileData.url);
  }

  get files(): File[] {
    return this._store.map(fileData => fileData.file);
  }

  get isFilesExceed(): boolean {
    return this.maxFiles >= this._store.length;
  }

  get hasMultiple() {
    return this._input && this._input.multiple;
  }

  isDropActive = false;
  error: string = null;
  // event when change
  @Output() stateChange = new EventEmitter<any>();
  // label
  @Input() label;
  @Input() errorMessage = '';
  @Input() forClass = false;
  @Input() disabled = false;
  // multiple
  private _maxFiles = 10;
  _accept = 'image/jpeg,image/png,video/mp4';

  @Input()
  set accept(format: string) {
    this._accept = this[format] || format;
    this._input.accept = this[format] || format;
  }

  @Input()
  set maxFiles(count: number) {
    this._maxFiles = count;
    this._input.multiple = (count > 1);
  }

  @Input() maxImageFiles: number;
  @Input() maxVideoFiles: number;
  @Input() thumbnail: boolean;

  @Input()
  set urls(_urls: string[]) {
    console.log(_urls)
    if(_urls) {
      this._fetchImages(_urls).then((results) => {
        Promise.all(results.map(result => result.blob())).then((blobs) => {
          const store: FileData[] = [];
          blobs.forEach((blob, index: number) => {
            const file = new File([blob], 'file');
            store.push(new FileData(file, _urls[index]));
          });
          this._store = store;
          console.log(this._store)
        });
      });
    }
  }

  fileChangeHandler = this.onFileChangeHandler.bind(this);
  private _canvas: HTMLCanvasElement;

  constructor(
    renderer: Renderer2,
    private _toast: ToastService
  ) {
    this._canvas = renderer.createElement('canvas');
    this._input = renderer.createElement('input');
    this._input.type = 'file';
    this._input.addEventListener('change', this.fileChangeHandler, false);
  }

  onFileChangeHandler(event) {
    const target: HTMLInputElement = event.currentTarget;
    const files: FileList = target.files;
    console.log(files)
    this._fileHandler(files);
    target.value = '';
    // this.stateChange.emit();
  }

  async _fileHandler(files: any, isSingle?) {
    for (let i = 0; i < files.length; i++) {
      const file = isSingle ? files[i] : files.item(i);
      this.stateChange.emit(file);
      console.log("=============file=======", file)
      let maxSize;
      let _accept = this[this._accept] || this._accept;
      if (this.IMAGE_FORMAT.split(',').indexOf(file.type) >= 0) {
        maxSize = 300;
      }
      if (this.VIDEO_FORMAT.split(',').indexOf(file.type) >= 0) {
        maxSize = 300;
      }
      if (this.AUDIO_FORMAT.split(',').indexOf(file.type) >= 0) {
        maxSize = MAX_AUDIO_SIZE;
      }
      if (_accept && _accept.split(',').indexOf(file.type) === -1) {
        this.error = this[this.errorMessage] || this.errorMessage;
        this._toast.error(this.error);
        return;
      } else if (maxSize && maxSize < ((file.size / 1024))) {
        this._toast.error(`File size must be less than ${maxSize}KB.`);
        this.error = `File size must be less than ${maxSize}KB`;
        return;
      } else if (this._store.some((fileData) => fileData.file.name === file.name)) {
        this.error = `File is already added.`;
        return;
      } else {
        this.error = null;
      }
      if (this._maxFiles && this._maxFiles < (files.length + this._store.length)) {
        this._toast.error(`No. of Files must be less than or equal to ${this._maxFiles}.`);
        this.error = `No. of Files must be less than or equal to ${this._maxFiles}.`;
        return;
      }
      if (this.maxImageFiles && file.type.startsWith('image') && this._store.filter(x => x.type.startsWith('image')).length == this.maxImageFiles) {
        let error = `No. of Images must be less than or equal to ${this.maxImageFiles}.`;
        this._toast.error(error);
        this.error = error;
        return;
      }
      if (this.maxVideoFiles && file.type.startsWith('video') && this._store.filter(x => x.type.startsWith('video')).length == this.maxVideoFiles) {
        let error = `No. of Videos must be less than or equal to ${this.maxVideoFiles}.`;
        this._toast.error(error);
        this.error = error;
        return;
      }
      const fileData = new FileData(file);

      this.subscription.add(
        fileData.onload.subscribe(() => {
          Promise.all(this._validators.map(fn => fn(fileData))).then((result) => {
            if (result.every(status => status)) {
              if (this.VIDEO_FORMAT.split(',').indexOf(file.type) >= 0 && this.forClass) {
                this.checkVideoDuration(fileData);
              }
              else if (this.IMAGE_FORMAT.split(',').indexOf(file.type) >= 0 && this.forClass) {
                this.checkMaximumImages(fileData);
              }
              else if (this.AUDIO_FORMAT.split(',').indexOf(file.type) >= 0 && this.forClass) {
                this.checkAudioDuration(fileData);
              }
              else {
                this._store.push(fileData);
              }
            }
          }).catch((error) => {
            this.error = error;
          });
        })
      )
    }
  }

  checkMaximumImages(data) {
    let images = this._store.filter(file => this.IMAGE_FORMAT.split(',').indexOf(file.type) >= 0);
    if (images && images.length >= 1) {
      this._toast.error('You can add maximum 1 thumbnail');
      return;
    }
    this._store.push(data);
  }

  checkVideoDuration(data) {

    var video = document.createElement('video');
    video.preload = 'metadata';
    video.setAttribute('id', 'vid')
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      this._store.push(data);
    }
    video.src = URL.createObjectURL(data.file);
  }

  checkAudioDuration(data) {
    var audio = document.createElement('audio');
    audio.preload = 'metadata';
    audio.setAttribute('id', 'aud')
    audio.onloadedmetadata = () => {
      window.URL.revokeObjectURL(audio.src);
      this._store.push(data);
    }
    audio.src = URL.createObjectURL(data.file);
  }

  onCanPlayHandler(fileData: FileData, video: HTMLVideoElement) {
    try {
      this.createThumbnail(video, `${fileData.id}.png`).then((thumbnail: File) => {
        fileData.thumbnail = thumbnail;
      });
    } catch (err) {

    }
  }

  onCreateThumbnailHandler(fileData: FileData, container: HTMLDivElement) {
    try {
      const video: HTMLVideoElement = container.querySelector('video');
      // video.onloadend
      this.createThumbnail(video).then((thumbnail: File) => {
        fileData.thumbnail = thumbnail;
        // window.open()
      });
    } catch (err) {

    }
  }

  private _fetchImages(files: string[]) {
    const promiseAll = [];
    if(files && files.length  ) {
      files.forEach((fileUrl) => {
        const request = new Request(fileUrl);
        promiseAll.push(fetch(request, {
          method: 'GET',
          mode: 'no-cors',
          cache: 'default'
        }));
      });
      return Promise.all(promiseAll);
    }
  }

  ngOnInit(): void {

  }

  onRemoveFileHandler(file: FileData) {
    const index = this._store.indexOf(file);
    if (index !== -1) {
      this._store.splice(index, 1);
    }
    this.error = '';
    this.stateChange.emit();
  }

  onAddFileHandler() {
    if (this._maxFiles && this._store.length === this._maxFiles) {
      this._toast.error(`No. of Files must be less than or equal to ${this._maxFiles}.`);
      return;
    }
    this._input.click();
  }

  onDragEnterHandler(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.isDropActive = true;
  }

  onDragOverHandler(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.isDropActive = true;
  }

  onDragLeaveHandler(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.isDropActive = false;
  }

  onDropHandler(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.isDropActive = false;
    this._fileHandler(event.dataTransfer.files);
  }

  reset() {
    this._store = [];
  }

  validate(validator: (file: FileData) => Promise<boolean>) {
    if (validator && typeof validator === 'function') {
      this._validators.push(validator);
    }
  }

  createThumbnail(video: HTMLVideoElement, name: string = 'thumbnail.png'): Promise<File> {
    try {
      return new Promise((resolve, reject) => {
        const context = this._canvas.getContext('2d');
        this._canvas.height = video.videoHeight;
        this._canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        this._canvas.toBlob((blob) => {
          const file = new File([blob], name, { type: 'image/png' });
          resolve(file);
        });
      });
    } catch (err) {
    }

  }

  ngOnDestroy() {
    this._input.removeEventListener('change', this.fileChangeHandler, false);
  }
}


export class FileData {
  uploaded = false;
  url: string = null;
  type: string = null;
  id = `${btoa(Date.now().toString())}.${Date.now()}`;
  thumbnail: File;
  private _readComplete: Subject<void> = new Subject();
  readonly onload: Observable<void> = this._readComplete.asObservable();
  private _imageElement: HTMLImageElement = document.createElement('img');
  private _canvasElement: HTMLCanvasElement = document.createElement('canvas');
  constructor(public file: File, url: string = null) {
    // create thumnail
    if (!url) {
      this.type = file.type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.url = e.target.result;
        this._readComplete.next();
        this._readComplete.complete();
        this.createImageThumnail(this.url, 50, 50);
      };
      reader.readAsDataURL(file);
    } else {
      // this.type
      const ext = url.substr(url.lastIndexOf('.') + 1);
      if (['jpg', 'jpeg', 'png'].indexOf(ext) !== -1) {
        this.type = `image/${ext}`;
      }
      if (['mp4', '3gp', 'flv', 'mov'].indexOf(ext) !== -1) {
        this.type = `video/${ext}`;
      }
      if (['mp3', 'mpeg', 'wav'].indexOf(ext) !== -1) {
        this.type = `audio/${ext}`;
      }
      this.url = url;
      this.uploaded = true;
    }
  }
  createImageThumnail(url: string, height: number, width: number): Promise<File> {
    return new Promise((resolve, reject) => {
      const context = this._canvasElement.getContext('2d');
      this._canvasElement.height = height;
      this._canvasElement.width = width;
      this._imageElement.src = url;
      context.drawImage(this._imageElement, 0, 0, height, width);
      this._canvasElement.toBlob((blob) => {
        const file = new File([blob], name, { type: 'image/png' });
        this.thumbnail = file;
      });
    });
  }

}
