import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { GlobalDataSummary } from 'src/app/Model/globalData';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countires',
  templateUrl: './countires.component.html',
  styleUrls: ['./countires.component.css']
})
export class CountiresComponent implements OnInit {
  
  data: GlobalDataSummary[] = [];
  totalConfirm = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  country : string[] = [];
  
  pieChart : GoogleChartInterface = {
    chartType : 'PieChart'
  }

  defaultValue = 'India'

  constructor(private dataService : DataServiceService) { }
  
  initChart(){
    let data =  [];
    data.push(["Country","Active Cases","Confirmed Cases","Death Cases","Recovered Cases"])
    this.data.forEach(cs=>{
      data.push([this.country,cs.active,cs.confirmed,cs.deaths,cs.recovered])
    })
    console.log(this.data);
    
    this.pieChart={
      chartType : 'PieChart',
      dataTable : data,
    }
  }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(result=>{
      this.data = result;
      this.data.forEach(cs=>{
        if(!Number.isNaN(cs.confirmed)){
          this.country.push(cs.country);
        }
      })
    })
    this.initChart();
  }

  updateValues( country : string){
    this.dataService.getGlobalData().subscribe(result=>{
      this.data = result;
      this.data.forEach(cs=>{
        if(country==cs.country){
          this.totalActive=cs.active;
          this.totalConfirm=cs.confirmed;
          this.totalRecovered=cs.recovered;
          this.totalDeaths=cs.deaths;
        }
      })
    })
  }
}
