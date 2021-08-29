import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{map} from 'rxjs/operators'
import { GlobalDataSummary } from '../Model/globalData';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private globalDataUrl="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/02-06-2021.csv";
  constructor(private http : HttpClient) { }

  getGlobalData(){
    return this.http.get(this.globalDataUrl,{responseType : 'text'}).pipe(
      map(result=>{
        let data: GlobalDataSummary[] = [];
        let raw = {};
        let rawData = Object.create(raw);
        let row = result.split('\n');
        row.splice(0,1);
        let i=0,k=0;
        row.forEach(row => {
          let col = row.split(/,(?=\S)/);
          let cs = {
            country : col[3],
            confirmed : +col[7],
            deaths : +col[8],
            recovered : +col[9],
            active : +col[10]
          };
          let temp : GlobalDataSummary = rawData[cs.country];
          if(temp){
            temp.active = cs.active + temp.active;
            temp.confirmed = cs.confirmed + temp.confirmed;
            temp.deaths = cs.deaths + temp.deaths;
            temp.recovered = cs.recovered + temp.recovered;

            rawData[cs.country]=temp;
          }else{
            rawData[cs.country]=cs;
            i++;
          }
        });
        return <GlobalDataSummary[]>Object.values(rawData);
      })
    )
  }
}
