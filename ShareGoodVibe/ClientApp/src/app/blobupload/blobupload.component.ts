import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-blobupload',
  templateUrl: './blobupload.component.html',
  styleUrls: ['./blobupload.component.css']
})
export class BlobuploadComponent implements OnInit {
  files: string[] = [];
  publicFiles: string[] = [];
  filteredFiles: string[] = [];
  fileToUpload: FormData | undefined;
  fileUpload: any;
  fileUpoadInitiated: boolean = false;
  fileDownloadInitiated: boolean = false;
  value: string = "";
  profile: any;
  private baseUrl = 'https://talashfileuploadapi-ctapfke2bwcwdghx.australiasoutheast-01.azurewebsites.net/api/blobstorage';
  public application: string = "";
  public isDisabled: boolean = true;
  showAdvancedUpload :boolean = false;

  constructor(private http: HttpClient, public auth: AuthService) { }

  ngOnInit(): void {
    this.showBlobs();
  }

  showBlobs() {

    //API: http://localhost:4000/api/BlobStorage/ListFilesByApplication?userid=ananymous&applicaiton=videosearch

    let userid = "Ananymous";
    if (this.auth.isAuthenticated()) {
      this.auth.getProfile((err: any, profile: any) => {
        this.profile = profile;
        if (profile)
          userid = profile.name;
        //userid="dasradh";
        console.log("Userid" + userid);
        this.http.get<string[]>(this.baseUrl + '/ListFilesByApplication??userid=' + userid +"&application="+ this.application).subscribe(result => {
          this.files = result;
        }, error => console.error(error));
      });
    }
    userid = "Ananymous";
    this.http.get<string[]>(this.baseUrl + '/ListFilesByApplication??userid=' + userid +"&application="+ this.application).subscribe(result => {
      this.publicFiles = result;
    }, error => console.error(error));


  }

  addFile() {
    if (!this.fileUpoadInitiated) {
      let documentid = document.getElementById('fileUpload');
      if (documentid)
        documentid.click();
    }
  }
  handleFileInput(e: any) {
    let files: any = e.target?.files[0];
    let formData: FormData = new FormData();
    formData.append(files[0].name, files[0]);
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
            console.log("hrehrehrerherherh");
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
          //let savAs = require('file-saver');  
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
  upload(files: any) {
    if (files.length === 0)
      return;

    const formData = new FormData();
    let fname = "";

    for (let file of files) {
      formData.append("asset", file, file.name,);
      fname = file.name;
    }
    this.fileToUpload = formData;

    this.http.post(this.baseUrl + '/insertfile', this.fileToUpload)
      .subscribe((response: any) => {
        this.fileUpoadInitiated = false;
        this.fileUpload = '';
        if (response == true) {
          console.log("berofe http get ")
          //SetFileAttrib?filename=english.txt&userid=dasaradh&application=dyte-videoxxmas
          let foldername = "";
          if (this.application == 'Video Search') foldername = "talash-videosearch";
          if (this.application == 'Image Search') foldername = "talash-imagesearch";

          if (this.application == 'Video based Exam') foldername = "dyte-videoxxmas";         


          this.http.get(this.baseUrl + '/SetFileAttrib?filename=' + fname + "&userid=" + "Ananymous" + "&application=" + foldername)
            .subscribe((response: any) => {
              console.log("uploaded file to directory" + foldername)

            });

          this.http.get(this.baseUrl + '/SetTags?filename=' + fname + "&userid=" + this.profile?.name + "&type=video")
            .subscribe((response: any) => {
              this.showBlobs();
              alert('Uploaded  file sucessfully!');

            });
        }
        else {
          alert('Error occured!');
          this.fileUpoadInitiated = false;
        }
      },
        err => console.log(err),
      );

  }
  FilterFiles(searchText: any) {

    this.files = this.files.filter((element) => {

      element.indexOf('ads') !== -1;
    });



  }
  EnableUpload() {
    if (this.application.length > 0)
      this.isDisabled = false;
  }
  
}
  
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}