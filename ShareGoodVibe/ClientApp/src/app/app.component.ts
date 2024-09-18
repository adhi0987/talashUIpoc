import { Component, ViewChild} from '@angular/core';
import { ModalService } from './services/modal.service';
import { AuthService } from './services/auth.service';

import { ShareComponent } from './share/share.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    public searchword!: string ;
    public url!: string;
    public type!: string;
    isAuthenticated: boolean = false;
    public userProfile: any;
    public urlEmit!: string;
    public shareLink!: string;
    public showSharePanel: boolean = false;
    public showUploadDataPanel : boolean = false;
    public showFAQ: boolean = false;
    public showChatrooms:boolean = false;

    
    @ViewChild('modal', { read: false })
    modal!: ShareComponent;
    //public clickedEvent: Event;
    constructor(private modalService: ModalService, public auth:AuthService) {
        this.searchword = "video";
        this.type ="video";
        auth.handleAuthentication();
	}
    openModal(id: string) {
        this.modalService.open(id);
    }
	public click() {
     
	}

    childEventClicked(event: any) {
      
        this.searchword = event.searchword ;
        this.type = event.type;
        this.shareLink ="https://talash.azurewebsites.net" +"?type=" + this.type + "&searchword=" + this.searchword;
      
       
    }
    childEventClicked1(event: string) {

       
        this.url = event[2];
       
        console.log("url in parent  :" + this.url);
    }

    ShowShreLink()
    {
        this.shareLink ="https://talash.azurewebsites.net" +"?type=" + this.type + "&searchword=" + this.searchword;
    }
    

    openModal1() {
        this.modal.open();
    }
    ShowHidePanels(value:string)
    {
        if(value == 'upload')
            {
                this.showUploadDataPanel = true;
                this.showSharePanel = false;
                this.showFAQ = false;
                this.showChatrooms = false;
            } 
        if(value == 'share') 
            {
                this.showSharePanel = true;
                this.showUploadDataPanel = false;
                this.showFAQ = false;
                this.showChatrooms = false;
            }
            if(value == 'faq')
            {
                this.showFAQ = true;
                this.showSharePanel = false;
                this.showUploadDataPanel = false;
                this.showChatrooms = false;
            }
            if (value == 'chatrooms')
            {
                this.showChatrooms = true;
                this.showFAQ = false;
                this.showSharePanel = false;
                this.showUploadDataPanel = false;

            }
    }
}
