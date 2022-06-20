// import { Component, OnInit } from '@angular/core';

// import { HttpClient  } from '@angular/common/http';

// @Component({

//   selector: 'app-blog',

//   templateUrl: './blog.component.html',

//   styleUrls: ['./blog.component.css']

// })

// export class BlogComponent implements OnInit {

//   ipAddress = '';

  

//   constructor(private http:HttpClient) { }

  

//   ngOnInit() {

//       this.getIPAddress();

//   }

  

//   getIPAddress()

//   {

//     this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{

//       this.ipAddress = res.ip;

//     });

//   }

  

// }