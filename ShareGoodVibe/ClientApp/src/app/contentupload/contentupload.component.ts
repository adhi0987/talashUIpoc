import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { resourceLimits } from 'worker_threads';

@Component({
  selector: 'app-contentupload',
  templateUrl: './contentupload.component.html',
  styleUrls: ['./contentupload.component.css']
})
export class ContentuploadComponent {
  topics: string[] = [];
  newTopic: string = "";
  private baseUrlBlobApi = 'https://talashfileuploadapi-ctapfke2bwcwdghx.australiasoutheast-01.azurewebsites.net/api/blobstorage';
  private baseUrlVideoApi = "https://talashvideo.azurewebsites.net/dyte/v2";

  topicSlected: string = "";
  files: string[] = [];
  fileToUpload: FormData | undefined;
  fileUpload: any;
  fileUpoadInitiated: boolean = false;
  fileDownloadInitiated: boolean = false;
  profile: any;
  private baseUrl = 'https://talashfileuploadapi-ctapfke2bwcwdghx.australiasoutheast-01.azurewebsites.net/api/blobstorage';
  public application: string = "";
  public selectedTopic: string = "";

  constructor(private http: HttpClient) {
    //https://localhost:7142/dyte/v2/GetlistOfTopics?userid=test

    this.http.post(this.baseUrlVideoApi + '/GetlistOfTopics?userid=test', null)
      .subscribe((response: any) => {

        var json = JSON.parse(JSON.stringify(response));

        for (var i = 0; i < json.length; i++) {
          this.topics.push(json[i]);
        }

      });

  }

  CreateNewTopic() {
    console.log("new topic value: " + this.newTopic);

  }

  topicSelected() {

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

          this.http.get(this.baseUrl + '/SetFileAttribV2?filename=' + fname + "&userid=" + "Ananymous" + "&topic=" + this.selectedTopic)
            .subscribe((response: any) => {
              console.log("uploaded file to directory" + foldername)

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
            //this.showBlobs();
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

} 
