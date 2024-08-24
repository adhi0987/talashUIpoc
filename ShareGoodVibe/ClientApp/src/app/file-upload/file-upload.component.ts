import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-fileupload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileuploadComponent {
    public progress!: number;
    public message!: string;
    @Output() showHideFiles = new EventEmitter < { ShowFileExplorer: boolean}>();

    constructor(private http: HttpClient) { }
    ShowHideFiles(e: Event)
    {        
        this.showHideFiles.emit({ ShowFileExplorer: true });
    }

    upload(files : any) {
        if (files.length === 0)
            return;

        const formData = new FormData();

        for (let file of files)
            formData.append(file.name, file);

        const uploadReq = new HttpRequest('POST', `https://sharegoodthings.azurewebsites.net/weatherforecast/UploadFile`, formData, {
            reportProgress: true,
        });

        this.http.request(uploadReq).subscribe(event => {
            console.log("updload is progress")
            // if (event.type === HttpEventType.UploadProgress)
            //     this.progress = Math.round(100 * event.loaded / event.total);
            // else if (event.type === HttpEventType.Response)
            //     this.message = event.body.toString();
        });
    }
}  
