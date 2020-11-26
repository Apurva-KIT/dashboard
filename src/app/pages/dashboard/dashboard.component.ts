import { Component, OnInit } from '@angular/core';
import { Salesman } from 'app/models/salesman.model';
import { ReadDataService } from 'app/services/read-data.service';
import {Chart} from 'chart.js'


@Component({
    selector: 'dashboard',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./chart-scroll.css']
})

export class DashboardComponent implements OnInit{

  dataLoaded: boolean;

  salesmen: Salesman[]=[];
  canvas : any;
  ctx: any;
  chartColor: string;
  chartEmail: any;
  SalesmenEffort: any;
  labels : string[] = [];
  dataset : any[] = [];

  constructor(private readDataService : ReadDataService) { }

  ngOnInit(){

    this.topFiveSalesman();;
    this.renderChartData();

  
  }

  getSalemanData() : void{
    this.readDataService.getSalesmen().subscribe(data => {
      
      this.salesmen = data; 
      

    });
  }


  renderChartData() : void{
    ///this.chartColor = "#FFFFFF";
    this.salesCountPerSalesman();
    
      

      // var speedCanvas = document.getElementById("speedChart");

      // var dataFirst = {
      //   data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
      //   fill: false,
      //   borderColor: '#fbc658',
      //   backgroundColor: 'transparent',
      //   pointBorderColor: '#fbc658',
      //   pointRadius: 4,
      //   pointHoverRadius: 4,
      //   pointBorderWidth: 8,
      // };

      // var dataSecond = {
      //   data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
      //   fill: false,
      //   borderColor: '#51CACF',
      //   backgroundColor: 'transparent',
      //   pointBorderColor: '#51CACF',
      //   pointRadius: 4,
      //   pointHoverRadius: 4,
      //   pointBorderWidth: 8
      // };

      // var speedData = {
      //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      //   datasets: [dataFirst, dataSecond]
      // };

      // var chartOptions = {
      //   legend: {
      //     display: false,
      //     position: 'top'
      //   }
      // };

      // var lineChart = new Chart(speedCanvas, {
      //   type: 'line',
      //   hover: false,
      //   data: speedData,
      //   options: chartOptions
      // });
  }


  salesCountPerSalesman() : void{

    this.readDataService.renderSalesPerSalesmenChartData().subscribe(res=>{
      this.labels = res.map(res => res.Salesman);
      this.dataset = res.map(res => res.Sales);

      // const top5 = this.topFiveSalesman(res);       // code for highlighting top 5 sales

      this.canvas = document.getElementById("SalesmenEffort");
      this.ctx = this.canvas.getContext("2d");
      this.SalesmenEffort = new Chart(this.ctx, {
        type: 'bar',

        data: {
          labels: this.labels,
          datasets: [{
              // borderColor: "#51adcf",
              backgroundColor: "#51adcf",
              minBarLength: 5,
              // this.dataset.map(function(data,i) {  // code for highlighting top 5 sales
                
              //   for (var sm of top5) {
              //     if(data == sm){
              //       return "#b83b5e";
              //       }
              //   }
                
              //   return "#51adcf";
              // }),

              // pointRadius: 0,
              // pointHoverRadius: 0,
              // borderWidth: 3,
              data: this.dataset
            }
          ]
        },
        options: {
         responsive: true,
         maintainAspectRatio: false,
          legend: {
            display: false,
          },

          tooltips: {
            enabled: true,
            mode: 'single',
              callbacks: {
                  label: function(tooltipItems, data) { 
                      return 'Sales : '+tooltipItems.yLabel;
                  }
                }
          },

          scales: {
            yAxes: [{
              stacked: true,
              ticks: {
                // fontColor: "#9f9f9f",
                // beginAtZero: false,
                // maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: 'rgba(255,255,255,0.05)',
              }

            }],

            xAxes: [{
              
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                // padding: 10,
                // fontColor: "#9f9f9f"
              }
            }]
          },
          // animation: {
          //   onComplete: function() {
          //     var sourceCanvas = this.chart.ctx.canvas;
          //     var copyWidth = this.chart.controller.chartArea.left - 5;
          //     // the +5 is so that the bottommost y axis label is not clipped off
          //     // we could factor this in using measureText if we wanted to be generic
          //     var copyHeight = this.chart.controller.chartArea.bottom + 5; // 282 //this.scale.endPoint + 5;
      
          //     var targetCanvas = document.getElementById("myChartAxis");
          //     var targetCtx = this.canvas.getContext("2d");
          //     targetCtx.canvas.width = copyWidth;
          //     targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);
      
          //   },
          // }
        }
      });
    });
    


  }

  topFiveSalesman(/*res : any*/) : void/*any*/ {  //code for highlighting

    // const top5 = res.map(res => res.Sales).sort().reverse().slice(0, 5);
    // return top5;

    this.readDataService.getSalesmen().subscribe(res =>{

      this.salesmen=res.sort((a, b) => (a.Sales < b.Sales) ? 1 : -1).slice(0,5);
      this.dataLoaded=true; 
      // $(function(){
      //   //alert('test');  
      //   $('#top5saleman').DataTable( {
      //     dom: 'Bfrtip',
      //     buttons: [
      //         'copy', 'csv', 'excel', 'pdf', 'print'
      //     ]
      //     } );
      // })
 
      // this.labels = top5.map(top5 => top5.Salesman);
      
      // this.canvas = document.getElementById("top5saleman");
      // this.ctx = this.canvas.getContext("2d");
      // this.chartEmail = new Chart(this.ctx, {
      //   type: 'pie',
      //   data: {
      //     labels: this.labels,
      //     datasets: [{
      //       label: "Emails",
      //       pointRadius: 0,
      //       pointHoverRadius: 0,
      //       backgroundColor: [
      //         '#e3e3e3',
      //         '#4acccd',
      //         '#fcc468',
      //         '#ef8157'
      //       ],
      //       borderWidth: 0,
      //       data: this.dataset
      //     }]
      //   },

      //   options: {

      //     legend: {
      //       display: false
      //     },

      //     pieceLabel: {
      //       render: 'percentage',
      //       fontColor: ['white'],
      //       precision: 2
      //     },

      //     tooltips: {
      //       enabled: false
      //     },

      //     scales: {
      //       yAxes: [{

      //         ticks: {
      //           display: false
      //         },
      //         gridLines: {
      //           drawBorder: false,
      //           zeroLineColor: "transparent",
      //           color: 'rgba(255,255,255,0.05)'
      //         }

      //       }],

      //       xAxes: [{
      //         barPercentage: 1.6,
      //         gridLines: {
      //           drawBorder: false,
      //           color: 'rgba(255,255,255,0.1)',
      //           zeroLineColor: "transparent"
      //         },
      //         ticks: {
      //           display: false,
      //         }
      //       }]
      //     },
      //   }
      // });

    });
    
  }

}