import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { PointsComponent } from './points/points.component';
import { TringularDisplayComponent } from './tringular-display/tringular-display.component';
import { SharedService } from './services/shared-service';


@NgModule({
  declarations: [
    AppComponent,
    PointsComponent,
    TringularDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/points', pathMatch: 'full' },
      { path: 'points', component: PointsComponent },
      { path: 'tringular-display', component: TringularDisplayComponent },
    ])
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
