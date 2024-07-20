import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {Observable, forkJoin, merge, reduce } from 'rxjs';
import { Router, ActivatedRoute, Params, ParamMap, RouterStateSnapshot, NavigationEnd  } from '@angular/router';
import { AdventureTimeService } from '../services/adventure-time.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
    public id!: string;
    param1: string ="";
    param2: string ="";
    @Input() searchword: string="";
    @Input() type: string="";
    @Input() url: string ="";
    @Input() searchword1: string="";
    @Output() urlEmit = new EventEmitter<{ url: string, type: string }>();
  characters!: Observable<any[]>;
  
  BookMarks!: Observable<any[]>;
  characters2!: Observable<any[]> ;
  columns: string[] = [];
  public activatedRoute: ActivatedRoute = new ActivatedRoute;
    constructor(private atService: AdventureTimeService, route: ActivatedRoute, router: Router) {
       // const snapshot: RouterStateSnapshot = route.routerState.snapshot;
        console.log(route.queryParams); 
        route.queryParams.subscribe(params => {
            let date = params['id'];
            
        });
 router.events.subscribe((val) => {
        // see also
        console.log(val instanceof NavigationEnd)
    });
    }
    childEventClicked(event: string) {

      
        this.url = event[1];
        this.urlEmit.emit({ url: this.url, type: "" });
       
    }
    ngOnChanges(changes: SimpleChanges) {
     
        this.columns = this.atService.getColumns();
        var data  = this.atService.getCharacters(this.searchword);
        console.log("starting search");
        this.BookMarks = this.atService.getBookmakrs();
       console.log("bookmarks %%%%%%%%%%"+JSON.stringify(this.BookMarks));

        this.characters2 = data;
     console.log("Completed request.");
       

    

    }

    ngOnInit() {
        this.columns = this.atService.getColumns();
        this.characters = this.atService.getCharacters("rise");
      
       //get book marks.
       this.BookMarks = this.atService.getBookmakrs();
       console.log("bookmarks %%%%%%%%%%"+JSON.stringify(this.BookMarks));
  }

}
