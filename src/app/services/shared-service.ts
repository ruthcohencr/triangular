import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Point } from '../models/point';

@Injectable()
export class SharedService {

    private defaultPoints: Array<Point> = null;

    private dataSource = new BehaviorSubject<Array<Point>>(this.defaultPoints);
    currentPoints = this.dataSource.asObservable();

    changeData(points: Array<Point>){
        console.log("from shared service "+ points);
        this.dataSource.next(points);
    }
}