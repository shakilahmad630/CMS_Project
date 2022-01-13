import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import Chart from "chart.js";
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppStore } from 'src/app/store/app.store';
import { Store } from 'redux';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: "app-landingpage",
  templateUrl: "landingpage.component.html"
})
export class LandingpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;

  contentdata = [];
  createdstats = [];
  createdstatslabels = [];
  expiredstats = [];
  expiredstatslabels = [];

  constructor(private service: AppService, @Inject(AppStore) public store : Store<AppState>) { 
    try {
      this.store.subscribe(() => this.updateState());      
      
    } catch (error) {
      throw new Error("Authguard::contructor Exception :" + error);
      
    }
}

updateState()
{
  try {
    //  this.contentdata = this.store.getState().contentsreport;
     if(this.contentdata.length === 0)
     {
       this.updateContentsReport();  
     }
     if(this.createdstats.length === 0)
     {
       this.updateCreatedStats();  
     }
     if(this.expiredstats.length === 0)
     {
       this.updateExpiredStats();  
     }
    
  } catch (error) {
   throw new Error("LandingpageComponent::updateState Exception :" + error);
  }
}

updateExpiredStats()
{
  let userid = this.store.getState().currentuserdetail.id;
  if(userid !== undefined)
  {
    this.service.getcontentExpiredStats((result) => {

      if(result !== undefined)
      {
        this.expiredstats = result.map( res =>{
          return res.count;

        });
        this.expiredstatslabels = result.map( res =>{
          return res.date;

        });
        this.setCanvas("lineChartExamplePublished");
      } 

     }); 
    }
}

updateCreatedStats()
{
  let userid = this.store.getState().currentuserdetail.id;
  if(userid !== undefined)
  {
    this.service.getcontentCreatedStats((result) => {

      if(result !== undefined)
      {
        this.createdstats = result.map( res =>{
          return res.count;

        });
        this.createdstatslabels = result.map( res =>{
          return res.date;

        });
        this.setCanvas("lineChartExample");
      } 

     }); 
    }
}

updateContentsReport()
{
  let userid = this.store.getState().currentuserdetail.id;
  if(userid !== undefined)
  { 

    this.service.getcontentReport((result) => {

      if(result !== undefined)
      {
        this.contentdata = [result.readycount, result.publishcount , result.rejectcount , result.expirecount ];
        this.createbarchart("lineChartExample1");
        this.creatPieChart("lineChartExample2", this.contentdata);
      }
      

     });      
  }
}

  ngOnInit() {
    //this.setCanvas("lineChartExample");
    //this.setCanvas("lineChartExamplePublished");
    //this.createbarchart("lineChartExample1");
    //this.creatPieChart("lineChartExample2");
    //this.creatPieChart("lineChartExample3", this.contentdata);

    this.updateContentsReport();
    this.updateCreatedStats();
    this.updateExpiredStats();
  }


  setCanvas(id: string) {
    var canvas: any = document.getElementById(id);
    var ctx = canvas.getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 350, 0, 50);
    var labels = [];
    var data = []
    if(id === "lineChartExample")
    {
      gradientFill.addColorStop(0, "rgba(255, 99, 132, 0.0)");
      gradientFill.addColorStop(1, "rgba(255, 99, 132, 0.2)");
      data = this.createdstats;
      labels = this.createdstatslabels;
    }
    else{
      gradientFill.addColorStop(0, "rgba(54, 162, 235, 0.0)");
      gradientFill.addColorStop(1, "rgba(54, 162, 235, 0.2)");
      data = this.expiredstats;
      labels = this.expiredstatslabels;
    }

    let datalabel = (id === "lineChartExample") ? "Ready" : "Expire";



    var chartBig = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        labels: labels,
        datasets: [{
          label: datalabel,
          fill: true,
          backgroundColor: gradientFill,
          borderColor: '#e44cc4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#e44cc4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#be55ed',
          //pointHoverBorderColor:'rgba(35,46,55,1)',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: data
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },

        tooltips: {
          backgroundColor: '#fff',
          titleFontColor: '#ccc',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(0,0,0,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              display: false,
              suggestedMin: 0,
              suggestedMax: 20,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(0,0,0,0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }]
        }
      }
    });
  }

  createbarchart(id: string) {
    var canvas: any = document.getElementById(id);
    var ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ready', 'Published', 'Rejected', 'Expired'],
        datasets: [{
          label: '# of Contents',
          data: this.contentdata,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            // 'rgba(153, 102, 255, 1)',
            // 'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  creatPieChart(id:string, indata)
  {
    var canvas: any = document.getElementById(id);
    var ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Ready', 'Published', 'Rejected', 'Expired'],
        datasets: [{
          label: '# of Contents',
          data: indata,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            // 'rgba(153, 102, 255, 1)',
            // 'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }
}
