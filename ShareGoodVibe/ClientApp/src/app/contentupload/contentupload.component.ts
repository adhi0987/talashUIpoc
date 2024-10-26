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

  constructor(private http: HttpClient) {
    //https://localhost:7142/dyte/v2/GetlistOfTopics?userid=test

    this.http.post(this.baseUrlVideoApi + '/GetlistOfTopics?userid=test', null)
      .subscribe((response: any) => {

        var json = JSON.parse(JSON.stringify(response));
       
        for(var i=0 ; i < json.length ; i++)
        {
          this.topics.push(json[i]);
        }       
        
      });

  }

  CreateNewTopic() {
    console.log("new topic value: "+this.newTopic);

  }
} 
