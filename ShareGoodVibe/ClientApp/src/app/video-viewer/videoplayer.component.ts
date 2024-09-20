
import { Component, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AdventureTimeService } from '../services/adventure-time.service';

@Component({
    selector: 'my-video',
    templateUrl: './videoplayer.component.html',
    styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent {
    name = 'Angular 6';
    safeSrc: SafeResourceUrl;
    safeSrc2: SafeResourceUrl[] = [];
    videoids: WeatherForecast1[] = [];
    @Input() searchword: string="";
    
    items: Array<string>;
    //searchword: string = "";
    data: any[] = [];

    constructor(private sanitizer: DomSanitizer, private atService: AdventureTimeService) {
        this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/c9F5kMUfFKk");

        this.items = this.atService.getVideodata(this.searchword);
       this.safeSrc2.push(this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/c9F5kMUfFKk"));

        // this.atService.getvideodata1(this.searchword)
        //     .subscribe((res: any) => {
        //         this.data = res;
        //         this.data.forEach(x => console.log(x.name));
        //         this.data.forEach(x =>this.safeSrc2.push(this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + x.name)));
               
        //     }, (err: any) => {
        //         console.log(err);
        //     });
    }
    ngOnChanges(changes: SimpleChanges) {

        this.atService.getvideodata1(this.searchword)
        .subscribe((res: any) => {
            this.data = res;
            this.data.forEach(x => console.log(x.name));
            this.data.forEach(x =>this.safeSrc2.push(this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + x.name)));
           
        }, (err: any) => {
            console.log(err);
        });
    }

}
interface WeatherForecast1 {
    name: string;

}
