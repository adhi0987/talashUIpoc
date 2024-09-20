import { Inject, Injectable } from '@angular/core';
import { Observable, of  } from 'rxjs';


import { HttpClient } from '@angular/common/http'
import { CHARACTERS } from './mock-data';
import { CHARACTERS1 } from './mock-data';
import { BookMarks } from './mock-data';
import { concat } from 'rxjs';


@Injectable()
export class AdventureTimeService {

    public http: HttpClient;
    public data: WeatherForecast[] = [];
    public bookmarkdata: BookMarkData[] = [];
    
    public videoids: any[] = [];
    public videoids3!: Observable<any[]>;

    public videoids1: string[]=[];
    public CHARACTERS: any[] = [];
    public BookMarks: any[] = [];
    public CHARACTERS1: any[] = [];
    public meetinginfo: any = "";
    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.http = http;
         http.get<WeatherForecast[]>('https://sharegoodthings.azurewebsites.net/v1/users/rise').subscribe
            (
                result => {
                    this.data = result;
                    console.log(this.data);
                    this.data.forEach(function (element) {
                        CHARACTERS.push(element);
                    });

                    CHARACTERS.push(this.data[0]);
                }, error => console.error(error));

    }

    getCharacters(input: string): Observable<WeatherForecast[]> {
        //https://sharegoodvibes.azurewebsites.net/v1/users/rise
        // var url = "https://sharegoodthings.azurewebsites.net/weatherforecast/GetUserData?input=" + input;

        var url = "https://sharegoodthings.azurewebsites.net/v1/users/" + input;

        this.http.get<WeatherForecast[]>(url).subscribe
            (
                result => {

                    this.data = result;
                    // return this.data;

                    this.data.forEach(function (element) {
                        CHARACTERS.push(element);
                    });

                    CHARACTERS.push(this.data[0]);
                    // console.log("charactors" + JSON.stringify(this.data));
                }, error => console.error(error));


        return of(CHARACTERS);
    }
    getBookmakrs(): Observable<BookMarkData[]> {
        var url = "https://sharegoodthings.azurewebsites.net/v1/trending/";

        this.http.get<BookMarkData[]>(url).subscribe
            (
                result => {
                    this.BookMarks = <BookMarkData[]>result;
                    BookMarks.push(this.bookmarkdata[0]);
                     }, error => console.error(error));


        return of(this.BookMarks);
    }

    getColumns(): string[] {
        return ["name", "age", "species", "occupation", "info1", "info2"]
    }
    //delete content 

    Updateclicks(str: string) {
        var url = "/data/Updateclicks?input=" + str;
        this.http.get(url).subscribe
            (result => {
                console.log("deleted content");
            });
    }
    GetFavourites(str: string): Observable<WeatherForecast[]> {
        var url = "/data/GetFavourites?userid=" + str;
        while (CHARACTERS1.length > 0) {
            CHARACTERS1.pop();
        }
        this.http.get<WeatherForecast[]>(url).subscribe
            (
                result => {
                    this.data = result;
                   this.data.forEach(function (element) {
                        CHARACTERS1.push(element);
                    });

                    CHARACTERS1.push(this.data[0]);
                }, error => console.error(error));
        return of(CHARACTERS1);

    }

    //video data ..

    getVideodata(searchword: string): string[] {
        // var url = "https://sharegoodthings.azurewebsites.net/weatherforecast/GetVideolist?input=" + "searchword";

        var url = "https://talashvideo.azurewebsites.net/v1/VIDEO/rise";
        this.http.get<WeatherForecast1[]>(url).subscribe
            (
                result => {
                    this.videoids = <WeatherForecast1[]>result;

                    this.videoids1 = this.videoids[0];


                }, error => console.error(error));

        return this.videoids1;
    }
    getvideodata1(searchword: string): Observable<any[]> {
        //var url = "https://sharegoodthings.azurewebsites.net/weatherforecast/GetVideolist?input=" + "searchword";
        var url = "https://talashvideo.azurewebsites.net/v1/VIDEO/" + searchword;


        return this.http.get<any[]>(url)
            .pipe(
                product => this.videoids3 = product
            );
    }


    createMeeting(userid: string, time : string) :Observable<string> {
        //var url = "https://sharegoodthings.azurewebsites.net/weatherforecast/GetVideolist?input=" + "searchword";
       // var url = "https://talashvideo.azurewebsites.net/v1/createmeeting/?userid=dasradh&schedule=today" ;
        var url = "https://talashvideo.azurewebsites.net/v1/createmeetingandsaveinfo/?userid=" + userid +"&schedule="+time;


         this.http.post<Observable<any>>(url,{"userid":userid,"schedule":time}) .subscribe(

            result => {
              // console.log("service"+ result);
               var k = JSON.parse(JSON.stringify(result));
               var kkk:meetingdata = JSON.parse(k)       
               this.meetinginfo = kkk;    
            }
         )             
            
          //  console.log("test" + JSON.stringify(this.meetinginfo));
            return of(JSON.stringify(this.meetinginfo));
           
            
    }


    getImagedata(searchword: string): Observable<any[]> {
    
        var url = "https://talashimages-c6bzfxfzezbzhwdv.australiasoutheast-01.azurewebsites.net/v1/image/" + searchword ;


        return this.http.get<any[]>(url)
            .pipe(
                product => this.videoids3 = product
            );
    }
}

interface WeatherForecast {
    age: string ;
    name: string;
    species: number;
    occupation: string;
   
    
}
interface BookMarkData {
    url: string ;
    type: string;
    info1:string;
    info2:string;
    name:string;
    age: string;
    species:string;
    occupation:string;   
   
    
}

interface WeatherForecast1 {
    name: string;
   
}

interface meetingdata {
    UserNme: string;
    rooms: any;
  }
