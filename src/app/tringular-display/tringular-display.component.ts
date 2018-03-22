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

  angle1: number = 50;
  angle2: number = 60;
  angle3: number = 70;

  point1: Point;
  point2: Point;
  point3: Point;

  triangularPoints: Point[] = null;
  constructor(private sharedService: SharedService) { }


  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");

    // init points
    this.initPointsFromArray();
    
    this.drawTriangular();

    this.setAngles();

    this.writeTriangularAngles();

  }

  initPointsFromArray() {
    this.point1 = this.triangularPoints[0];
    this.point2 = this.triangularPoints[1];
    this.point3 = this.triangularPoints[2];
  }

  // draw all lines - become triangular
  drawTriangular() {
    this.drawLine(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
    this.drawLine(this.point2.x, this.point2.y, this.point3.x, this.point3.y);
    this.drawLine(this.point3.x, this.point3.y, this.point1.x, this.point1.y);
  }

  drawLine(x1, y1, x2, y2) {
    var ctx = this.context;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // each angle calculated and set
  setAngles() {
    this.angle1 = this.calculateAngle(this.point1, this.point2, this.point3);
    this.angle2 = this.calculateAngle(this.point2, this.point3, this.point1);
    this.angle3 = this.calculateAngle(this.point3, this.point1, this.point2);
  }

  calculateAngle(p1: Point, p2: Point, p3: Point) {
    var p12 = Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
    var p13 = Math.sqrt(Math.pow((p1.x - p3.x), 2) + Math.pow((p1.y - p3.y), 2));
    var p23 = Math.sqrt(Math.pow((p2.x - p3.x), 2) + Math.pow((p2.y - p3.y), 2));
    //angle in degrees
    var result =  Math.acos(((Math.pow(p12, 2)) + (Math.pow(p13, 2)) - (Math.pow(p23, 2))) / (2 * p12 * p13)) * 180 / Math.PI;
    return Math.round(result); 
  }

  // now writing on canvas the angles
  writeTriangularAngles() {
    this.writeAnglesOnCanvas(this.angle1, this.point1, this.point2);
    this.writeAnglesOnCanvas(this.angle2, this.point2, this.point3);
    this.writeAnglesOnCanvas(this.angle3, this.point3, this.point1);
  }

  writeAnglesOnCanvas(angle: number, point1: Point, point2: Point) {
    var ctx = this.context;
    ctx.font = "30px Arial";
    ctx.fillText(angle.toString(), point1.x, point1.y);
  }

  ngOnInit() {
    console.log("from ngOnInit");
    this.sharedService.currentPoints
      .subscribe(points => {
        if (this.triangularPoints == null) {
          if (points != null) { this.triangularPoints = points }
        }
      });

    if (this.triangularPoints != null)
      console.log("got the array " + this.triangularPoints);
  }

}
