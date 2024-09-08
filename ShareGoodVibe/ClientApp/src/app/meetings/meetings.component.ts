import { Component } from '@angular/core';
import { AdventureTimeService } from '../services/adventure-time.service';
import { forkJoin, of } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent {
  public url: string = "";
  public username: string = "";
  public meetingTime: Date | undefined;
  public meetingid: string | undefined;
  public isdisabled: boolean = false;

  constructor(public service: AdventureTimeService, public auth: AuthService) {
    

  }

  createMeeting() {
    if (!this.auth.isAuthenticated)
      return;

    let k = this.service.createMeeting(this.username, "today");
    forkJoin({
      k
    }).subscribe((result) => {
      //  this.meetingid  = result.k;
      let kk = JSON.parse(result.k);
      let kkk: meetingdata = JSON.parse(kk);
      console.log("kk" + JSON.stringify(kkk));
      console.log("kk" + JSON.stringify(kkk.data.id));
      this.meetingid = kkk.data.id;

    });
    // var k = JSON.parse(this.meetingid);
    //console.log( "finally" + this.meetingid.data.id)


  }


}
interface meetingdata {
  status: string;
  data: any;
}