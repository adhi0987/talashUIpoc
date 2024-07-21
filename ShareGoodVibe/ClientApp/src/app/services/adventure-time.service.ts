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
    constructor(http: HttpClient , @Inject('BASE_URL') baseUrl: string) {
       this.http = http;
      //https://sharegoodvibes.azurewebsites.net/v1/users/rise
      //https://sharegoodthings.azurewebsites.net/weatherforecast/GetUserData?input=party
       http.get < WeatherForecast[]>('https://sharegoodthings.azurewebsites.net/v1/users/rise').subscribe
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

    getCharacters(input : string ): Observable<WeatherForecast[]>{
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
  getBookmakrs():Observable<BookMarkData[]> {
    var url = "https://sharegoodthings.azurewebsites.net/v1/trending/" ;

        this.http.get<BookMarkData[]>(url).subscribe
            (
            result => {
              //console.log("result @@@@@"+JSON.stringify( result));

              this.BookMarks = <BookMarkData[]>result;
               
            //   this.videoids1 = this.videoids[0];

            //     this.bookmarkdata = result;
            //     result.forEach(function (element) {
            //       BookMarks.push(element);
            //     });

                BookMarks.push(this.bookmarkdata[0]);
                console.log("BOOKMAKRS" + JSON.stringify(this.BookMarks))
            }, error => console.error(error));

       
        return of(this.BookMarks);
  }

  getColumns(): string[]{
    return ["name", "age", "species", "occupation","info1","info2"]
  }
   //delete content 

   Updateclicks(str: string)
   {
    console.log("on bookmark "+str);
       var url = "/data/Updateclicks?input=" + str;
            this.http.get(url).subscribe
            ( result => {
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
                    console.log(this.data);
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
       var url = "https://sharegoodthings.azurewebsites.net/weatherforecast/GetVideolist?input=" + "searchword";

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


