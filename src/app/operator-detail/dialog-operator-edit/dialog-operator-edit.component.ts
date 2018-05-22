import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'operator-detail',
  templateUrl: './operator-detail.component.html',
  styleUrls: ['./operator-detail.component.scss']
})
export class OperatorDetailComponent implements OnInit {
  public isActive: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
