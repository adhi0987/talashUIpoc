import { Component } from '@angular/core';
import { AdventureTimeService } from '../services/adventure-time.service';
import { forkJoin } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-chatrooms',
  templateUrl: './chatrooms.component.html',
  styleUrls: ['./chatrooms.component.css']
})
export class ChatroomsComponent {

  constructor(public service: AdventureTimeService) {
  }

  createMeeting() {

    let k = this.service.createMeeting("this.username", "today");
    forkJoin({
      k
    }).subscribe((result) => {

    });

  }
}
