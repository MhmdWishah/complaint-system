import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'locations',
  templateUrl: 'locations.component.html',
})
export class locationsComponent implements OnInit {
  displayAdd:boolean=false;
  displayDelete:boolean=false;
  displayEmail:boolean=false;
  displayEditLoc:boolean=false;
  displayNameLoc:boolean=false;
  constructor() { }

  ngOnInit(): void {

  }
  showModalAdd(){
    this.displayAdd=true
  }
  showModalDelete(){
   this.displayDelete=true
  }
  showModalEmail(){
    this.displayEmail=true
  }
  showModalEditLoc(){
    this.displayEditLoc=true
  }
  showModalNameLoc(){
    this.displayNameLoc=true
  }
}
