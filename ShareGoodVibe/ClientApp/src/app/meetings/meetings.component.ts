import { Component } from '@angular/core';
import { AdventureTimeService } from '../services/adventure-time.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent {
  public url:string ="";
  public username: string = "";
  public meetingTime: Date | undefined ;

  constructor( public service: AdventureTimeService)
  {

  }


}
