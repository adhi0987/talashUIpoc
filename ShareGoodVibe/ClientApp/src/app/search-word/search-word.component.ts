import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdventureTimeService } from '../services/adventure-time.service';


@Component({
    selector: 'app-events',
  templateUrl: './search-word.component.html',
  styleUrls: ['./search-word.component.css']
})
export class SearchWordComponent implements OnInit {

  constructor(srv : AdventureTimeService) { }

    
    public Events1: Array<string> = ["live", "fastsearch", "fastsearch"];
    @Output() searchword = new EventEmitter < { searchword: string, type: string }>();
    typeId!: string;
    placeId!: string;
    //More app code
    //onSearch  
    sendNotification(placeId: any,type: any) {
      
        this.searchword.emit({ searchword: placeId, type: this.typeId });
    }
    onClick(event: Event): void {
      

        this.searchword.emit({ searchword: 'rise', type: 'image' });
       
    }
    ngOnInit() {

        this.searchword.emit({ searchword: 'rise', type: 'image' });
        console.log(this.Events1);
  }

}
