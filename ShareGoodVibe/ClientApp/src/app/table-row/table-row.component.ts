import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdventureTimeService } from '../services/adventure-time.service';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {

  @Input() character: any;
  @Input()
  columns: string[] = [];
    @Input()
  value!: string;
    @Input() url: string="";
    @Output() url1 = new EventEmitter<string>();
    @Input() searchword1: string ="";
    @Output() searchword = new EventEmitter<{ url: string, type: string }>();

  constructor(private atService: AdventureTimeService) { }

  ngOnInit() {
  }

    toggle(str: string)
    {
        this.atService.Updateclicks(str);
       this.url = str;
        //this.url1.emit(str);
        this.searchword.emit({ url: str, type: 'image' });
        
    }
    
}
