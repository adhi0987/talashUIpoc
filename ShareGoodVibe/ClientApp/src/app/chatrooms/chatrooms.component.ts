import { Component } from '@angular/core';
import { AdventureTimeService } from '../services/adventure-time.service';
import { forkJoin } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { Console } from 'console';

@Component({
  selector: 'app-chatrooms',
  templateUrl: './chatrooms.component.html',
  styleUrls: ['./chatrooms.component.css']
})
export class ChatroomsComponent {
  userid: string = "";
  roomname: string = "";

  mathsApiKey: string = "";
  physicsApiKey: string = "";
  computersApiKey: string = "";
  showMeetingroom: boolean = false;

  constructor(public service: AdventureTimeService) {
    // let k = this.service.createMeeting("test","test");

  }

  createMeeting() {

    let k = this.service.createMeeting(this.userid, this.roomname);
    forkJoin({
      k
    }).subscribe((result: any) => {
      //let dat :meetingdata = JSON.parse(result.k);

      console.log("Chat room" + result.k);
      var k = JSON.parse((result.k));

      //console.log("chat room" + dat.UserName)

    });

  }
  JoinMeetingroom(room: string) {
    this.roomname = room;
    // this.updateUrl();
    console.log("Joinmeetingruom");
    this.showMeetingroom = true;
  }
  updateUrl() {
    // this._location.href = "http://localhost:4200/?" + "searchparm =" + this.mathsApiKey 
  }
}
interface meetingdata {
  UserName: string;
  rooms: any;
}