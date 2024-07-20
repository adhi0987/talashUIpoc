import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdventureTimeService } from '../services/adventure-time.service';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-modal',
    template: `
    <div #myModal class="container">
    <div class="content">
      <table>
      
     
      <tr class="component-style table-row-component" *ngFor="let ch of characters1 | async"  >
        <td *ngFor="let col of columns; last as isLast">
              <img alt="" src="{{ch[col]}}"
                 width="60" />
          </td>
      </tr>

     
      <!-- <app-table-row-incorrect *ngFor="let ch of characters1 | async" [ch]="ch" [keys]="columns"></app-table-row-incorrect> -->
  </table>
      <button (click)="close()">Close</button>
    </div>
    </div>
  `,
    styleUrls: ['./share.component.css']
})
export class ShareComponent {
    characters1!: Observable<any[]>;
    columns: string[] = [];
constructor(private atService: AdventureTimeService) { }

    @ViewChild('myModal', { read: false })
    modal!: ElementRef;

    open() {
        
        this.columns = this.atService.getColumns();
        this.characters1 = this.atService.GetFavourites("str");
        this.modal.nativeElement.style.display = 'block';
    }

    close() {
        this.modal.nativeElement.style.display = 'none';
    }
}