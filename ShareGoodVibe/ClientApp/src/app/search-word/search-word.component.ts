import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdventureTimeService } from '../services/adventure-time.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-events',
  templateUrl: './search-word.component.html',
  styleUrls: ['./search-word.component.css']
})
export class SearchWordComponent implements OnInit {

  constructor(srv : AdventureTimeService,  private route: ActivatedRoute) {     
    
  }

    
    public Events1: Array<string> = ["live", "fastsearch", "fastsearch"];
    @Output() searchword = new EventEmitter < { searchword: string, type: string }>();
    typeId!: string;
    placeId!: string;
   
    
    
    sendNotification(placeId: any,type: any) {
      
        this.searchword.emit({ searchword: placeId, type: this.typeId });
    }
    onClick(event: Event): void {
      

        this.searchword.emit({ searchword: 'rise', type: 'image' });
       
    }
    ngOnInit() {     


      var contenttype= new URLSearchParams(window.location.search).get('type');
      var searchword= new URLSearchParams(window.location.search).get('searchword');
    
      if(contenttype == null )  contenttype ="image";
      if (searchword == null ) searchword = "rise"; 

        this.searchword.emit({ searchword: searchword, type: contenttype });
        console.log(this.Events1);
  }

}
