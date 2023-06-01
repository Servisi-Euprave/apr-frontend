import { Component, Input, OnInit } from '@angular/core';
import { Procurement } from 'src/app/model/procurement';

@Component({
  selector: 'app-procurement-overview',
  templateUrl: './procurement-overview.component.html',
  styleUrls: ['./procurement-overview.component.css']
})
export class ProcurementOverviewComponent implements OnInit {
  @Input()
  procurement: Procurement | undefined;

  ngOnInit(): void {
    console.log(this.procurement)
  }
}
