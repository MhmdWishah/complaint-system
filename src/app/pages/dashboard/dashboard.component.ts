import { Component, OnInit, OnDestroy, Inject, NgZone, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from './dashboard.service';
import { Config } from './dashbord.model';
import { HttpClient } from '@angular/common/http';
Chart.register(...registerables)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  chart1:any;
  chart2:any;
  chart3:any;
  colors = ['#0000ff', '#090360', '#2475db', '#1d9fc7', '#25d9bf', '#1f1ff1', '#094693',  '#1580a1', '#189583',]

  constructor(
    private dashboardService: DashboardService,
    private http:HttpClient,
    ) {
      dashboardService.getDashboardDigraphes();
  }
  ngAfterViewInit(): void {
    
  }

  // comment(){
  //   this.browserOnly(() => {
  //     let root = am5.Root.new("chartdiv");

  //     root.setThemes([am5themes_Animated.new(root)]);

  //     let chart = root.container.children.push(
  //       am5xy.XYChart.new(root, {
  //         panY: false,
  //         layout: root.verticalLayout
  //       })
  //     );

  //     // Define data
  //     let data = [
  //       {
  //         category: "Research",
  //         value1: 1000,
  //         value2: 588
  //       },
  //       {
  //         category: "Marketing",
  //         value1: 1200,
  //         value2: 1800
  //       },
  //       {
  //         category: "Sales",
  //         value1: 850,
  //         value2: 1230
  //       }
  //     ];

  //     // Create Y-axis
  //     let yAxis = chart.yAxes.push(
  //       am5xy.ValueAxis.new(root, {
  //         renderer: am5xy.AxisRendererY.new(root, {})
  //       })
  //     );

  //     // Create X-Axis
  //     let xAxis = chart.xAxes.push(
  //       am5xy.CategoryAxis.new(root, {
  //         renderer: am5xy.AxisRendererX.new(root, {}),
  //         categoryField: "category"
  //       })
  //     );
  //     xAxis.data.setAll(data);

  //     // Create series
  //     let series1 = chart.series.push(
  //       am5xy.ColumnSeries.new(root, {
  //         name: "Series",
  //         xAxis: xAxis,
  //         yAxis: yAxis,
  //         valueYField: "value1",
  //         categoryXField: "category"
  //       })
  //     );
  //     series1.data.setAll(data);

  //     let series2 = chart.series.push(
  //       am5xy.ColumnSeries.new(root, {
  //         name: "Series",
  //         xAxis: xAxis,
  //         yAxis: yAxis,
  //         valueYField: "value2",
  //         categoryXField: "category"
  //       })
  //     );
  //     series2.data.setAll(data);

  //     // Add legend
  //     let legend = chart.children.push(am5.Legend.new(root, {}));
  //     legend.data.setAll(chart.series.values);

  //     // Add cursor
  //     chart.set("cursor", am5xy.XYCursor.new(root, {}));

  //     this.root = root;
  //   });
  // }

  // comment2(){
  //   let root = am5.Root.new("chartdiv");
  //   root.setThemes([am5themes_Animated.new(root)])

  //   let chart = root.container.children.push( 
  //     am5percent.PieChart.new(root, {
  //       layout: root.verticalLayout
  //     }) 
  //   );

  //   // Define data
  //   // let data = [{
  //   //   country: "France",
  //   //   sales: 100000
  //   // }, {
  //   //   country: "Spain",
  //   //   sales: 160000
  //   // }, {
  //   //   country: "United Kingdom",
  //   //   sales: 80000
  //   // }];
  //   const data = {
  //     name: "احصائيات الشكاوي بناءً على درجة الخطورة",
  //     show: true,
  //     type: "piechart",
  //     value: "value",
  //     category: "name",
  //     data: [
  //         {
  //             name: "درجة أولى",
  //             value: 3,
  //             Color: "#dc3545"
  //         },
  //         {
  //             name: "درجة ثانية",
  //             value: 4,
  //             Color: "#007bff"
  //         },
  //         {
  //             name: "درجة ثالثة",
  //             value: 5,
  //             Color: "#28a745"
  //         },
  //         {
  //             name: "درجة رابعة",
  //             value: 1,
  //             Color: "#ffc107"
  //         }
  //     ]
  //   };

  //   let yAxis = chart.yAxes.push(
  //     am5xy.ValueAxis.new(root, {
  //       renderer: am5xy.AxisRendererY.new(root, {})
  //     })
  //   );

  //   // Create series
  //   let series = chart.series.push(
  //     am5percent.PieSeries.new(root, {
  //       name: "Series",
  //       valueField: data.value,
  //       categoryField: data.category,
  //       fillField: "Color",
  //     })
  //   );
  //   series.data.setAll(data.data);

  //   // Add legend
  //   let legend = chart.children.push(am5.Legend.new(root, {
  //     centerX: am5.percent(50),
  //     x: am5.percent(50),
  //     layout: root.horizontalLayout
  //   }));

  //   legend.data.setAll(series.dataItems);
  // }

  ngOnDestroy(): void {
    this.destroy();
  }

  ngOnInit() {
    this.dashboardService.Configs$.subscribe(
      (res:any) => {
        if(!!res){
          this.initGraph1(res!.config!);
          this.initGraph2(res!.config2!);
          this.initGraph3(res!.config3!);
          // this.initChart(res);
        }
      }
    )

    // this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{

    //   console.log("ipify:",res.ip);

    // });
  }


  createGraph(id:string, config:any) {
    var ele: any;
    ele = document.getElementById(id)!;
    return new Chart(
      ele,
      config
    );
  }

  initGraph1(config: Config){
    const Config = this.initConfigPieChart(config)
    this.chart1 = this.createGraph('myChart', Config);
  }

  initGraph2(config: Config){
    const Config = this.initConfigPieChart(config)
    this.chart2 = this.createGraph('myChart2', Config);
  }

  initGraph3(config: Config){
    const Config = this.initConfigBarChart(config)
    this.chart3 = this.createGraph('myChart3', Config);
  }

  initConfigPieChart(config: Config){

    const names = config.data.map(item => item.name);
    const values = config.data.map(item => item.value);
    const colors = [...this.colors];
    const title = config.name;
    const Data = {
      labels: [...names], 
      'datasets': [{
        label: title,
        data: [...values],
        backgroundColor: [...colors],
        hoverOffset: 30,
        borderRadius: 5,
        // borderColor: '#cadeea'
      }]
    };

    let delayed: boolean;
    const Config :any = {
      type: 'pie',
      data: Data,
      options: {
        spanGaps: false,
        layout: {
            padding: {
              top: 35,
              // bottom: 50
            }
        },
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context:any) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                  size: 20,
                  weight: 500
              }
            }
          },
          title: {
            display: false,
            text: title
          }
        }
      }
    };

    return Config;
  }


  initConfigBarChart(config: Config){

    const names = config.data.map(item => item.name);
    const values = config.data.map(item => item.value);
    const colors = [...this.colors];
    const title = config.name;
    const Data = {
      labels: [...names], 
      'datasets': [{
        label: title,
        data: [...values],
        backgroundColor: [...colors],
        // borderColor: [
        //   'rgb(255, 99, 132)',
        //   'rgb(255, 159, 64)',
        //   'rgb(255, 205, 86)',
        //   'rgb(75, 192, 192)',
        //   'rgb(54, 162, 235)',
        //   'rgb(153, 102, 255)',
        //   'rgb(201, 203, 207)'
        // ],
        borderWidth: 1,
        hoverOffset: 30,
        borderRadius: 5,
      }]
    };

    let delayed: boolean;
    const Config :any = {
      type: 'bar',
      data: Data,
      fill: true,
      options: {
        tooltip: "kdslfkksd",
        // scales: {
          // myScale: {
          //   type: 'logarithmic',
          //   position: 'right', // `axis` is determined by the position as `'y'`
          // },
          // x: {
          //     grid: {
          //       offset: true,
          //       stacked: true
          //     }
          // },
        //   y: {
        //     offset: true,
        //     beginAtZero: true,
        //     stacked: true
        //   },

        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                  size: 20,
                  weight: 500
              }
            }
          },
          title: {
            display: false,
            text: title
          }
        },
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context:any) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        responsive: true,
        scales: {
          // x: {
          //   display: true,
          //   title: {
          //     display: true,
          //     text: 'حالة الشكوى',
          //     color: '#96c6f6',
          //     font: {
          //       family: 'Comic Sans MS',
          //       size: 20,
          //       weight: 'normal',
          //       lineHeight: 1.2,
          //     },
          //     padding: {top: 20, left: 0, right: 0, bottom: 0}
          //   }
          // },
          // y: {
          //   display: true,
          //   title: {
          //     display: true,
          //     text: 'العدد',
          //     color: '#a3c6da',
          //     font: {
          //       family: 'Times',
          //       size: 20,
          //       style: 'normal',
          //       lineHeight: 1.2
          //     },
          //     padding: {top: 30, left: 0, right: 0, bottom: 0}
          //   }
          // }
        }
      }
    };

    return Config;
  }

  destroy(){
    this.chart3 = undefined;
    this.chart2 = undefined;
    this.chart1 = undefined;
    this.dashboardService.destroy();
  }


}
