import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { TableRowComponent } from './table-row/table-row.component';
import {  TableRowMixedComponent} from './table-row-mixed/table-row-mixed.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AdventureTimeService } from './services/adventure-time.service';
import { TableRowIncorrectComponent } from './table-row-incorrect/table-row-incorrect.component';
import { FileuploadComponent } from './file-upload/file-upload.component';
import { SearchWordComponent } from './search-word/search-word.component';
import { HomeComponent } from './home/home.component';

import { NguiInViewComponent } from './ngui-in-view/ngui-in-view.component';
import { VideoplayerComponent } from './video-viewer/videoplayer.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component'
import { PreviewComponent } from './preview/preview.component';
import { ShareComponent } from './share/share.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';


@NgModule({
    declarations: [
        AppComponent,        
        TableComponent,
        TableRowComponent,
        TableRowIncorrectComponent,
        TableRowMixedComponent,
        FileuploadComponent,
        SearchWordComponent,
        HomeComponent,        
        NguiInViewComponent,
        VideoplayerComponent,
        ImageViewerComponent,
        PreviewComponent,
        ShareComponent,
        NavMenuComponent,
        
        

    ],
    imports: [
        BrowserModule,
      
        HttpClientModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forRoot([{
            path: 'mysite/:id',component: AppComponent
        },
            
        ]),    
    ],
	providers: [AdventureTimeService],
    bootstrap: [AppComponent]
})
export class AppModule { }
