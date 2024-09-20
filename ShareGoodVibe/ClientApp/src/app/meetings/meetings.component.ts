import { Component, Input, ViewChild } from '@angular/core';
import { AdventureTimeService } from '../services/adventure-time.service';
import { forkJoin, of } from 'rxjs';
import { AuthService } from './../services/auth.service';
import DyteClient from '@dytesdk/web-core';
import { DyteMeeting, DyteMenu } from '@dytesdk/angular-ui-kit';

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
  @Input()  roomname: string = "physics";
  public token : string ="";

  title = 'MyProject';
  @ViewChild('myid') meetingComponent: DyteMeeting | undefined;
  dyteMeeting: DyteClient | undefined;

  constructor(public service: AdventureTimeService, public auth: AuthService) {   

  }
  async ngAfterViewInit() {
    console.log("roomname: "+this.roomname);
    
    switch (this.roomname) {
      case "physics":
        this.token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6IjY2MjRjMGU0LTg4ZTktNDZkMi04OWYyLTc0N2M5MzVmOTI3ZCIsIm1lZXRpbmdJZCI6ImJiYjUyMzQ1LWM2MmEtNDFhYy1hZTQxLTM1NTU0ZTEzNDI4OCIsInBhcnRpY2lwYW50SWQiOiJhYWEyN2YxNC0wNjRiLTQxOTYtOTQ4NC1kMjQ3ZjYyZjgzNzEiLCJwcmVzZXRJZCI6ImZkM2VkYWQwLTYyYmMtNGJjMS1iZDdjLTkwNmQ0Y2NkNTg0ZCIsImlhdCI6MTcyNjc5MDkzMiwiZXhwIjoxNzM1NDMwOTMyfQ.o3ezwv6vJVJefEvNMu0aNl_9HrWxNYF0WtDd0caHX9A6XKK3a7DMP4cVEW8z-i7EoQz0ZY3OVxHfJC24mr9ZrbsxsPUva6Ehc8G1AvC038tXaA5wDE_EcHWs4r8JWfSP5Ue48Pa-QsnbgyWWGWBlZO7RzErYMAaBgQGIymJNZVujI0zbS1o2DRyOA3iNfmUgD8a1owWykRxpKJs-GWLAa67PlPmGiK5go99K1R2Q-nu1_d_OxBf4fEmuCHLWt25oktzngdfz2f-9poueCw2btHcUC7Tg_yXjLD_8mLX2n-P6BMqp6kv05UwsFAYyJRgJRd4RCSRxOZsEza1bOomgcw'
        break;
        case "maths":
          this.token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6IjY2MjRjMGU0LTg4ZTktNDZkMi04OWYyLTc0N2M5MzVmOTI3ZCIsIm1lZXRpbmdJZCI6ImJiYmI2YTAwLTVlMGYtNGE5Ny1iNTI1LTUyNDJiYTE2N2RkYiIsInBhcnRpY2lwYW50SWQiOiJhYWE3MjFiYi01NWYxLTQ5MmMtYmFhZi0xNWY1ZGEzYzQ5ZDkiLCJwcmVzZXRJZCI6ImYzYjBjZTMxLTZmNjAtNDY4Yy04MjkzLTMyM2M1M2Y2MjkzZiIsImlhdCI6MTcyNTg4MTAwMCwiZXhwIjoxNzM0NTIxMDAwfQ.FGCNNjz9By1hDS8r3oXK2N-3WsW-eiR1QbfZ6aNUTh1ghYGjL-udJ-jSDMIXA8ypWbrNPchtTyGdXeXIAgKrQ3u9lmLXyiVnsoOzItoRatWRFLhP8o4xgTAATG_iN3KEoC576v5vSvOnyuuP9wRwhg7b_OQf9-WyrPy0FXumiK_CyLuRY9F637SfUBSk1WHlJE4LpFmubq81rM_BJzn3qUz21wrQUgyXvSzxS92wyCRUVt5V6d5CCNZygAUPku0wuYLkZu4IexEbk7o3LedIqdfHG550UDuKYk-Nik2spHvSJHJM-6QspbJ2WfsYXCQkuZ-hMXDHRGSF0Gwd5oCpdw'
        
        break;
        case "computers":
          this.token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6IjY2MjRjMGU0LTg4ZTktNDZkMi04OWYyLTc0N2M5MzVmOTI3ZCIsIm1lZXRpbmdJZCI6ImJiYmNkNmM5LTc4ZGEtNGEzYS1hMGIzLWI4OGI4NzM4Njk2ZiIsInBhcnRpY2lwYW50SWQiOiJhYWFmMTA2MC0yMTQwLTQyZDYtOGNkZS03MjAwM2RiODQwMmIiLCJwcmVzZXRJZCI6IjY2OTllNDI1LTBkZDQtNDBhOS04ZTE2LWViMTY2NzBjNTM0NCIsImlhdCI6MTcyNjc5MDgxNSwiZXhwIjoxNzM1NDMwODE1fQ.ge9ygOJTA6PyK1oCBqWcBp66vRqksZ_xiRBvN80jAHgbCbm0yoS9Riosv2SSm-3-JzLxxmdx2qcGU-ni_A76LlsukmMK1Yebc9YjON2Va8uLorHcwqoaJG7OD145BkjnDL5WbvGpEZKgFKgFGuBTXmujj060OCqTbUArNL0LrI9f-i0lJ0RmWI2GAHJl4lz_IJK0WJriWzsvIaLG54hLjcHxwLoVpLjF0vJBVIoieusBn7LiRHKpmV3rjRT7idtHwxFcsYFECIBgr8FJhgUJlmID7gpAvvOK8NqdTpe79qow_ACQbWHmNi_ztYLk5eotTTO7_j_d5emUykGt0I2RHQ'        
        break;
    
      default:
        break;
    }
    const meeting = await DyteClient.init({
      authToken:this.token
   
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