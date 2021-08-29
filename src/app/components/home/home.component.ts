import { Component, OnInit} from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ChartHTMLTooltip,
  GoogleChartComponent,
  GoogleChartEditorOptions,
  ChartReadyEvent,
  ChartErrorEvent,
  ChartSelectEvent,
  ChartMouseOverEvent,
  ChartMouseOutEvent,
  RegionClickEvent,
  GoogleChartsControlInterface,
  GoogleChartsDashboardInterface,
  GoogleChartEditor,
  GoogleChartWrapper, GoogleChartInterface } from 'ng2-google-charts';
import {ViewChild} from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {    
  totalConfirm = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0; 

  pieChart : GoogleChartInterface = {
    chartType : 'PieChart'
  }
  
  columnChart : GoogleChartInterface = {
    chartType : 'ColumnChart'
  }

  constructor(private dataService : DataServiceService) { }

  updateChart(input : HTMLInputElement){
    this.initChart(input.value);
  }
    
  initChart(input : string){
    let datatable: (string | number)[][] = [];
    datatable.push(["Country","Cases"]);
    this.dataService.getGlobalData().subscribe({
      next : (result)=>{
        result.forEach(cs => {
          let value !: number;
          if(!Number.isNaN(cs.confirmed)){
            if(input=='c'){
              if(cs.confirmed>5000 && !Number.isNaN(cs.confirmed) && !(cs.confirmed==undefined)) value=cs.confirmed
                //console.log(input + cs.country + " " + value);
            }else if(input=='d'){
              if(cs.deaths>2000 && !Number.isNaN(cs.deaths) && !(cs.deaths==undefined)) value=cs.deaths
              // console.log(input +  cs.country + " " + value);
            }else if(input=='r'){
              if(cs.recovered>5000 && !Number.isNaN(cs.recovered) && !(cs.recovered==undefined)) value=cs.recovered
              // console.log(input +  cs.country + " " + value);
            }else if(input=='a' && !Number.isNaN(cs.active) && !(cs.active==undefined)){
              if(cs.active>5000) value=cs.active
              // console.log(input +  cs.country + " " + value);
            }
            datatable.push([
              cs.country , value
            ])
            if((value==undefined)){
              datatable.pop();
            }
          }
        });
      }
    })
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      options: {
        title : input,
        height : 500
      },
    };

    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      options:{
        height : 500
      }
    };
  }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next : (result)=>{
        result.forEach(cs => {
          if(!Number.isNaN(cs.confirmed)){
            this.totalConfirm += cs.confirmed;
            this.totalActive += cs.active;
            this.totalDeaths += cs.deaths;
            this.totalRecovered += cs.recovered;
          }
        });
      }
    })
    this.initChart('c')
  }
}
