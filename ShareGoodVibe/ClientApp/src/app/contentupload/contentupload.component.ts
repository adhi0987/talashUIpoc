import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { resourceLimits } from 'worker_threads';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser'


@Component({
  selector: 'app-contentupload',
  templateUrl: './contentupload.component.html',
  styleUrls: ['./contentupload.component.css']
})
export class ContentuploadComponent {
  topics: string[] = [];
  newTopic: string = "";
  deleteTopic:string ="";
  private baseUrlBlobApi = 'https://talashfileuploadapi-ctapfke2bwcwdghx.australiasoutheast-01.azurewebsites.net/api/blobstorage';
  private baseUrlVideoApi = "https://talashvideo.azurewebsites.net/dyte/v2";
  private baseUrlVideoApi2 = "https://talashvideo.azurewebsites.net/ueercategory/v2";


  publicFiles: string[] = [];
  answerFiles: string[] = [];
  topicSlected: string = "";
  files: string[] = [];
  fileToUpload: FormData | undefined;
  fileUpload: any;
  fileUpoadInitiated: boolean = false;
  fileDownloadInitiated: boolean = false;
  profile: any;
  userid: string="Ananymous";
  private baseUrl = 'https://talashfileuploadapi-ctapfke2bwcwdghx.australiasoutheast-01.azurewebsites.net/api/blobstorage';
  public application: string = "";
  public selectedTopic: string = "";
  public ToEmailAddress: string= "" ;

  constructor(private http: HttpClient,public auth: AuthService) {
    //https://localhost:7142/dyte/v2/GetlistOfTopics?userid=test

    
    if (this.auth.isAuthenticated()) {
      this.auth.getProfile((err: any, profile: any) => {
        this.profile = profile;
        if (profile)
          this.userid = profile.name;
        //userid="dasradh";
        console.log("Userid" + this.userid);
        this.refreshListOfTopics();
      });
    }
      
    
  }
  getuserName()
  {
    if (this.auth.isAuthenticated()) {
      this.auth.getProfile((err: any, profile: any) => {
        this.profile = profile;
        if (profile)
          this.userid = profile.name;
        //userid="dasradh";
        console.log("Userid" + this.userid);
      });
    }

  }
  refreshListOfTopics()
  {
    this.getuserName();

    this.http.post(this.baseUrlVideoApi + '/GetlistOfTopics?userid='+this.userid, null)
      .subscribe((response: any) => {

        var json = JSON.parse(JSON.stringify(response));
         this.topics = [];
        for (var i = 0; i < json.length; i++) {
          this.topics.push(json[i]);
        }

      });
   

  }

  CreateNewTopic() {
    this.getuserName()
    this.http.post(this.baseUrlVideoApi + '/CreateInterviewTopic?topic='+this.newTopic +"&userid="+this.userid , null)
    .subscribe((response: any) => {

    console.log("new topic created: " + this.newTopic);
    });
    this.refreshListOfTopics(); 
  }

  DeleteTopic() {
    this.getuserName()
    this.http.post(this.baseUrlVideoApi + '/DeleteTopic?userid=dasaradh&topic='+this.deleteTopic +"&userid"+this.userid , null)
    .subscribe((response: any) => {

    console.log("Deleted topic : " + this.deleteTopic);
    });
    this.refreshListOfTopics(); 

  }
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_9pbybee',
        'template_jvio0hx',
        e.target as HTMLFormElement,
        'eE6TlxLSd36jnzO8P'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
  SendInvite(){
    let params = "{ \"emaili_d\": " + this.ToEmailAddress+ "}";
    emailjs
      .sendForm('service_9pbybee', 'template_jvio0hx', params, {
        publicKey: 'eE6TlxLSd36jnzO8P',
      })
      .then(
        () => {
          console.log(' &&&&&&&&&&&&&&&&&&&&&&&&   SUCCESS!');

        },
        (error) => {
          console.log('&&&&&&&&&&&&&&&&&&&&&  FAILED...', (error as EmailJSResponseStatus).text);
        },
      );

  }
  
  topicSelected() {
    this.getuserName()
    this.showFiles();
    this.refreshListOfTopics(); 

  }
  showFiles()
  {
    this.getuserName()
    this.http.get<string[]>(this.baseUrl + '/ListFilesByApplicationv2?userid=' + "dasaradh" +"&applicaiton="+ "videoexams" +"&topic="+this.selectedTopic).subscribe(result => {
      this.publicFiles = result;
    }, error => console.error(error));

    // get reording files.
    this.http.post<string[]>(this.baseUrlVideoApi2 + '/GetAnswerFiles?topic=HowAreYou' ,null).subscribe(result => {
      this.answerFiles = result;
    }, error => console.error(error));


  }
  deleteFile(fileName: string) {
    this.getuserName()
    var del = confirm('Are you sure want to delete this file');
    if (!del) return;
    let filedetails = fileName.slice(fileName.lastIndexOf('/') + 1);
    this.http.get(this.baseUrl + '/deletefilev2/' + filedetails +'/'+"video exam"+'/' +this.selectedTopic).subscribe(result => {
      if (result != null) {
        this.showFiles();
      }
      if(this.userid == null || this.userid =="Ananymous")
      {
      this.http.post(this.baseUrlVideoApi + '/DeleteQuestionFromTopic?topic=' +this.selectedTopic + '&filenae=' +filedetails,null) 
      .subscribe(result=>{
        console.log("catelogUpdate: Question Deleted");
      });
    }
    else{
      this.http.post(this.baseUrlVideoApi2 + '/DeleteQuestionFromTopic?topic=' +this.selectedTopic +"&userid="+this.userid + '&filenae=' +filedetails,null) 
      .subscribe(result=>{
        console.log("catelogUpdate: Question Deleted");
      });
    }      
    }, error => console.error(error));
  }
  upload(files: any) {
    this.getuserName()
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
            let questionurl = "https://talashlogs.blob.core.windows.net/dyte-videoxxmas/"+ this.selectedTopic +"/" +fname;
         
            console.log("Userid ****** " + this.userid );

            if(this.userid == null || this.userid =="Ananymous")
            {
            this.http.post(this.baseUrlVideoApi + '/UpdateCatelog?userid=' + "Ananymous" + "&password=" + "Ananymous" +
                 "&topic=" + this.selectedTopic +"&question=" + questionurl, null)
            .subscribe((response: any) => {
              console.log("uploaded catelog")
           

            });
          }
          else
          {
         
            this.http.post(this.baseUrlVideoApi2 + '/UpdateCatelog?userid=' + this.userid + "&password=" + this.userid +
              "&topic=" + this.selectedTopic +"&question=" + questionurl, null)
         .subscribe((response: any) => {
           console.log("uploaded catelog")
        

         });
      
          }

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
    this.getuserName()
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
