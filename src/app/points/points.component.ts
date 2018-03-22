import { Component, OnInit } from '@angular/core';
import { Point } from '../models/point';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared-service';

@Component({
  selector: 'points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  tringularPoints: Point[] = [];
  constructor(private sharedService: SharedService,
    private router: Router) { }

  submitPoints(form: NgForm) {

    if (form.valid) {
      debugger;
      let newPoint: Point = { x: form.value.x1, y: form.value.y1 };
      this.tringularPoints.push(newPoint);

      newPoint = { x: form.value.x2, y: form.value.y2 };
      this.tringularPoints.push(newPoint);

      newPoint = { x: form.value.x3, y: form.value.y3 };
      this.tringularPoints.push(newPoint);

      console.log("from sumbitPoints " + this.tringularPoints);

      // subscribe to serice - set tringular points
      this.sharedService.changeData(this.tringularPoints);

      // go to tringular page display
      this.router.navigateByUrl('/tringular-display');
    }
    else console.log("no input for triangular");
  }

  ngOnInit() {
  }

}
