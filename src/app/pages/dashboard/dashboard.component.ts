import { Component, OnInit } from '@angular/core';
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
export class DashboardComponent implements OnInit {
  chart1:any;
  chart2:any;
  chart3:any;

  constructor(
    private dashboardService: DashboardService,
    private http:HttpClient) {
    dashboardService.getDashboardDigraphes();
  }

  ngOnInit() {
    this.dashboardService.Configs$.subscribe(
      (res:any) => {
        console.log(res);
        if(!!res){
          this.initGraph1(res!.config!);
          this.initGraph2(res!.config2!);
          this.initGraph3(res!.config3!);


        }
      }
    )

    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{

      console.log("ipify:",res.ip);

    });
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
    const colors = config.data.map(item => item.Color);
    const title = config.name;
    const Data = {
      labels: [...names], 
      'datasets': [{
        label: title,
        data: [...values],
        backgroundColor: [...colors],
        hoverOffset: 4
      }]
    };

    const Config :any = {
      type: 'pie',
      data: Data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
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
    const colors = config.data.map(item => item.Color);
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
        borderWidth: 1
      }]
    };

    const Config :any = {
      type: 'bar',
      data: Data,
      fill: false,
      options: {
        scales: {
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
          y: {
            offset: true,
            beginAtZero: true,
            stacked: true
          }
        },
        // responsive: true,
      }
    };

    return Config;
  }
}
