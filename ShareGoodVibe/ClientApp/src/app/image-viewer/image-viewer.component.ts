import { Component ,SimpleChanges,Input } from '@angular/core';
import { AdventureTimeService } from '../services/adventure-time.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent {

  data: any[] = [];
  //searchword: string = "";
  @Input() searchword: string="";
  imageList: any[] = [];

  constructor( private atService: AdventureTimeService) {
    this.searchword ="nature";

    this.atService.getImagedata(this.searchword)
    .subscribe((res: any) => {
        this.data = res;
        this.data.forEach(x => console.log(x.url));
        this.data.forEach(x =>this.imageList.push(x.url));
       
    }, (err: any) => {
        console.log(err);
    });

  }
  ngOnChanges(changes: SimpleChanges) {

    this.atService.getImagedata(this.searchword)
      .subscribe((res: any) => {
        this.data = res;
        this.data.forEach(x => console.log(x.url));
        this.data.forEach(x => this.imageList.push(x.url));

      }, (err: any) => {
        console.log(err);
      });
  }
  ngInit()
  {
   
  }
}
