import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdventureTimeService } from '../services/adventure-time.service';

@Component({
  selector: 'app-table-row-mixed',
  templateUrl: './table-row-mixed.component.html',
  styleUrls: ['./table-row-mixed.component.css']
})
export class TableRowMixedComponent implements OnInit{

  constructor(private atService: AdventureTimeService) { }
  
  @Input() bookmark: any;
  @Input()
  columns: string[] = [];
    @Input()
  value!: string;
    @Input() url: string="";
    @Output() url1 = new EventEmitter<string>();
    @Input() searchword1: string ="";
    @Output() searchword = new EventEmitter<{ url: string, type: string }>();
  
  ngOnInit() {
    console.log("here in init for row mixed");
  }

    toggle(str: string)
    {
        this.atService.Updateclicks(str);
       
        this.url = str;
        
        this.searchword.emit({ url: str, type: 'image' });
        
    }
    
}
