import { Component, OnInit } from '@angular/core';
import { Salesman } from 'app/models/salesman.model';
import { ReadDataService } from 'app/services/read-data.service';
import Chart from 'chart.js';


@Component({
    selector: 'dashboard',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  salesmen: Salesman[]=[];
  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public SalesmenEffort;
  labels : String[] = [];
  dataset : any[] = [];

  constructor(private readDataService : ReadDataService) { }

  ngOnInit(){

    this.getSalemanData();
    this.renderChartData();
  
  }

  getSalemanData() : void{
    this.readDataService.getJSON().subscribe(data => {
      
      this.salesmen = data; 

    });
  }


  renderChartData() : void{
    this.chartColor = "#FFFFFF";

      this.readDataService.renderSalesPerSalesmenChartData().subscribe(res=>{
        console.log(res);
        this.labels = res.map(res => res.Salesman);
        this.dataset = res.map(res => res.Sales);
        console.log(this.dataset);
        this.canvas = document.getElementById("SalesmenEffort");
        this.ctx = this.canvas.getContext("2d");
        this.SalesmenEffort = new Chart(this.ctx, {
          type: 'bar',
  
          data: {
            labels: this.labels,
            datasets: [{
                borderColor: "#6bd098",
                backgroundColor: "#6bd098",
                pointRadius: 0,
                pointHoverRadius: 0,
                borderWidth: 3,
                data: this.dataset
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
  
            tooltips: {
              enabled: false
            },
  
            scales: {
              yAxes: [{
  
                ticks: {
                  fontColor: "#9f9f9f",
                  beginAtZero: false,
                  maxTicksLimit: 5,
                  //padding: 20
                },
                gridLines: {
                  drawBorder: false,
                  zeroLineColor: "#ccc",
                  color: 'rgba(255,255,255,0.05)'
                }
  
              }],
  
              xAxes: [{
                // barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: 'rgba(255,255,255,0.1)',
                  zeroLineColor: "transparent",
                  display: false,
                },
                ticks: {
                  padding: 10,
                  fontColor: "#9f9f9f"
                }
              }]
            },
          }
        });
  

      });
      

      this.canvas = document.getElementById("chartEmail");
      this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: [1, 2, 3],
          datasets: [{
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#e3e3e3',
              '#4acccd',
              '#fcc468',
              '#ef8157'
            ],
            borderWidth: 0,
            data: [342, 480, 530, 120]
          }]
        },

        options: {

          legend: {
            display: false
          },

          pieceLabel: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
      });

      var speedCanvas = document.getElementById("speedChart");

      var dataFirst = {
        data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      var dataSecond = {
        data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
        fill: false,
        borderColor: '#51CACF',
        backgroundColor: 'transparent',
        pointBorderColor: '#51CACF',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var speedData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [dataFirst, dataSecond]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });

     
  //     this.readDataService.renderSalesPerSalesmenChartData().subscribe(res=>{
  //       //   console.log(res);
  //         this.dataSource =   {
  //               "chart": {
  //                     //Set the chart caption
  //                     caption: "Countries With Most Oil Reserves [2017-18]",
  //                     //Set the chart subcaption
  //                     subCaption: "In MMbbl = One Million barrels",
  //                     //Set the x-axis name
  //                     xAxisName: "Country",
  //                     //Set the y-axis name
  //                     yAxisName: "Reserves (MMbbl)",
  //                     numberSuffix: "K",
  //                     //Set the theme for your chart
  //                     theme: "fusion"
  //                   },
  //               "data": res["Salesmen"]
  //           }
  //       console.log(this.dataSource);
    
  //       },err=>{
  //         console.log(err);
  //      }) 
     

  }


}