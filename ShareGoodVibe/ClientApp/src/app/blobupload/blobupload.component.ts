import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blobupload',
  templateUrl: './blobupload.component.html',
  styleUrls: ['./blobupload.component.css']
})
export class BlobuploadComponent  implements OnInit{
  files: string[] = [];  
  fileToUpload: FormData | undefined;  
  fileUpload: any;  
  fileUpoadInitiated: boolean = false;  
  fileDownloadInitiated: boolean = false;  
  private baseUrl = 'https://talashfileuploadapi-ctapfke2bwcwdghx.australiasoutheast-01.azurewebsites.net/api/blobstorage';  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {  
    this.showBlobs();  
  }  
  
  showBlobs() {  
    this.http.get<string[]>(this.baseUrl + '/listfiles').subscribe(result => {  
      this.files = result;  
    }, error => console.error(error));  
  }  
  
  addFile() {  
    if (!this.fileUpoadInitiated) {  
      let documentid = document.getElementById('fileUpload');
      if(documentid)
          documentid.click();  
    }  
  }  
  handleFileInput(e: any) { 
    let files: any = e.target?.files[0];
    let formData: FormData = new FormData();  
   formData.append( files[0].name ,files[0] );  
    this.fileToUpload = formData;  
    this.onUploadFiles();  
  }  
  
  onUploadFiles() {  
    if (this.fileUpoadInitiated) {  
      return;  
    }  
    this.fileUpoadInitiated = true;  
    if (this.fileToUpload == undefined) {  
      this.fileUpoadInitiated = false;  
      return false;  
    }  
    else {  
      return this.http.post(this.baseUrl + '/insertfile', this.fileToUpload)  
        .subscribe((response: any) => {  
          this.fileUpoadInitiated = false;  
          this.fileUpload = '';  
          if (response == true) {  
            this.showBlobs();  
          }  
          else {  
            alert('Error occured!');  
            this.fileUpoadInitiated = false;  
          }  
        },  
          err => console.log(err),  
        );  
  
    }  
  }  
  downloadFile(fileName: string) {  
    this.fileDownloadInitiated = true;  
    return this.http.get(this.baseUrl + '/downloadfile/' + fileName, { responseType: "blob" })  
      .subscribe((result: any) => {  
        if (result.type != 'text/plain') {  
          var blob = new Blob([result]);  
          //let saveAs = require('file-saver');  
          let file = fileName;  
          //saveAs(blob, file);  
          this.fileDownloadInitiated = false;  
        }  
        else {  
          this.fileDownloadInitiated = false;  
          alert('File not found in Blob!');  
        }  
      }  
      );  
  }  
  deleteFile(fileName: string) {  
    var del = confirm('Are you sure want to delete this file');  
    if (!del) return;  
    this.http.get(this.baseUrl + '/deletefile/' + fileName).subscribe(result => {  
      if (result != null) {  
        this.showBlobs();  
      }  
    }, error => console.error(error));  
  }
  upload(files : any) {
    if (files.length === 0)
        return;

    const formData = new FormData();

    for (let file of files)
        formData.append("asset",file,file.name, );
    this.fileToUpload = formData;       
    
    this.http.post( this.baseUrl + '/insertfile', this.fileToUpload) 
      .subscribe((response: any) => {  
      this.fileUpoadInitiated = false;  
      this.fileUpload = '';  
      if (response == true) {  
        this.showBlobs();  
      }  
      else {  
        alert('Error occured!');  
        this.fileUpoadInitiated = false;  
      }  
    },  
      err => console.log(err),  
    );  
    // const uploadReq = new HttpRequest('POST', "http://localhost:4000/api/insertfile", formData, {
    //     reportProgress: true,
    // });

    // this.http.request(uploadReq).subscribe(event => {
    //     console.log("updload is progress")
    //     // if (event.type === HttpEventType.UploadProgress)
    //     //     this.progress = Math.round(100 * event.loaded / event.total);
    //     // else if (event.type === HttpEventType.Response)
    //     //     this.message = event.body.toString();
    // });
}  
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
