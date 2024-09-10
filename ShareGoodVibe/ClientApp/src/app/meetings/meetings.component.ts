import { Component, ViewChild } from '@angular/core';
import { AdventureTimeService } from '../services/adventure-time.service';
import { forkJoin, of } from 'rxjs';
import { AuthService } from './../services/auth.service';
import DyteClient from '@dytesdk/web-core';
import { DyteMeeting } from '@dytesdk/angular-ui-kit';

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

  title = 'MyProject';
  @ViewChild('myid') meetingComponent: DyteMeeting | undefined;
  dyteMeeting: DyteClient | undefined;

  constructor(public service: AdventureTimeService, public auth: AuthService) {
    

  }
  async ngAfterViewInit() {
    const meeting = await DyteClient.init({
      authToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6IjY2MjRjMGU0LTg4ZTktNDZkMi04OWYyLTc0N2M5MzVmOTI3ZCIsIm1lZXRpbmdJZCI6ImJiYmI2YTAwLTVlMGYtNGE5Ny1iNTI1LTUyNDJiYTE2N2RkYiIsInBhcnRpY2lwYW50SWQiOiJhYWE3MjFiYi01NWYxLTQ5MmMtYmFhZi0xNWY1ZGEzYzQ5ZDkiLCJwcmVzZXRJZCI6ImYzYjBjZTMxLTZmNjAtNDY4Yy04MjkzLTMyM2M1M2Y2MjkzZiIsImlhdCI6MTcyNTg4MTAwMCwiZXhwIjoxNzM0NTIxMDAwfQ.FGCNNjz9By1hDS8r3oXK2N-3WsW-eiR1QbfZ6aNUTh1ghYGjL-udJ-jSDMIXA8ypWbrNPchtTyGdXeXIAgKrQ3u9lmLXyiVnsoOzItoRatWRFLhP8o4xgTAATG_iN3KEoC576v5vSvOnyuuP9wRwhg7b_OQf9-WyrPy0FXumiK_CyLuRY9F637SfUBSk1WHlJE4LpFmubq81rM_BJzn3qUz21wrQUgyXvSzxS92wyCRUVt5V6d5CCNZygAUPku0wuYLkZu4IexEbk7o3LedIqdfHG550UDuKYk-Nik2spHvSJHJM-6QspbJ2WfsYXCQkuZ-hMXDHRGSF0Gwd5oCpdw',
    });
    meeting.join();
    this.dyteMeeting = meeting;
    if (this.meetingComponent) this.meetingComponent.meeting = meeting;
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