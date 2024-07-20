import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

    @Input()
    url!: string;
    constructor(private sanitizer: DomSanitizer) { }

     ngOnInit() {
     }
    ngOnChanges(changes: SimpleChanges) {
       
        console.log("Preview" + this.url);
        

    }
    photoURL() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }

}
