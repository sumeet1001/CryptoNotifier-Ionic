import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
 @Input() lines: number;
 @Input() rows: number;
 linesArr = [];
 rowsArr = [];
  constructor() { }

  ngOnInit() {
    this.rowsArr = new Array(this.rows);
    this.linesArr = new Array(this.lines);
  }

}
