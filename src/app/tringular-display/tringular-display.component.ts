import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SharedService } from '../services/shared-service';
import { Point } from '../models/point';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'tringular-display',
  templateUrl: './tringular-display.component.html',
  styleUrls: ['./tringular-display.component.css']
})
export class TringularDisplayComponent implements OnInit {

  // rectW: number = 100;
  // rectH: number = 100;
  // rectColor: string = "#FF0000";
  context: CanvasRenderingContext2D;
  // for display angles
  @ViewChild("myCanvas") myCanvas;
  @ViewChild("angle1Div") angle1Div;
  @ViewChild("angle2Div") angle2Div;
  @ViewChild("angle3Div") angle3Div;

  angle1: number;
  angle2: number;
  angle3: number;

  tringularPoints: Point[] = null;
  constructor(private sharedService: SharedService) { }


  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");


    // Itarate tringular array and draw each line
    let point1: Point = this.tringularPoints[0];
    let point2 = this.tringularPoints[1];
    let point3 = this.tringularPoints[2];

   this.drawLine(point1.x,point1.y,point2.x,point2.y);
   this.drawLine(point2.x,point2.y,point3.x,point3.y);
   this.drawLine(point3.x,point3.y,point1.x,point1.y);

   var angle1 = this.calculateAngle(point1,point2);
   var angle2 = this.calculateAngle(point2,point3);
   var angle3 = this.calculateAngle(point3,point1);
  }


  drawLine(x1,y1,x2,y2) {
    var ctx = this.context;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    // ctx.clearRect(0, 0, 400, 400);
    // ctx.fillStyle = this.rectColor;
    // ctx.fillRect(0, 0, this.rectW, this.rectH);
  }

 calculateAngle(p1: Point, p2: Point){
  var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
 }

  ngOnInit() {
    console.log("from ngOnInit");
    this.sharedService.currentPoints
      .subscribe(points => {
        if (this.tringularPoints == null) {
          if (points != null) { this.tringularPoints = points }
        }
      });

    if (this.tringularPoints != null)
      console.log("got the array " + this.tringularPoints);
  }

}
