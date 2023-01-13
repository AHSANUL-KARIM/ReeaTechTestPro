import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription, timer } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})

export class SuccessComponent implements OnInit {
  subscription: Subscription;
  data:any;
  initialTime = 0;
  totalPassedTime = '';

   constructor(private share : AppService, private router : Router){
    console.log("Success");
    let data = this.router.getCurrentNavigation()?.extras.state;
    this.initialTime = data?.['totalPassedTime'];
    console.log(this.initialTime);
    this.subscription =  share.subj$.subscribe(value=>{
        console.log("received");
        this.data=value;
    });
  }

  ngOnInit(){

    console.log("comp")

  }
  startTime = Date.now();
  elapsedTime = timer(0, 1000).pipe(map(() => Date.now() - this.startTime)).subscribe(time => 
    { 
      this.totalPassedTime = (this.initialTime + time)/1000 + "s"
    });
}
