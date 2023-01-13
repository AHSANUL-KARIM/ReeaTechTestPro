import { Component, OnInit } from '@angular/core';
import { map, timer, Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Employee } from '../employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLargeScreen = false;
  private destroyed$ = new Subject();
  screenWidth: number;
  data: Employee;

  constructor(private appService: AppService, private router : Router){
    this.screenWidth = window.innerWidth;
  }


  title = 'ReeaTechTest';
  totalTime = 0;
  totalPassedTime = '';
  jobExperienceFieldVisible = false;


  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    job: new FormControl('', Validators.required),
    jobExperience: new FormControl('')
  });

  ngOnInit(){
    this.form.get('job')?.valueChanges.subscribe(value => {
      if (value === 'Programmer') {
        this.jobExperienceFieldVisible = true;
        this.form.get('jobExperience')?.setValidators([Validators.required]);
      } else {
        this.jobExperienceFieldVisible = false;
        this.form.get('jobExperience')?.clearValidators();
      }
      this.form.get('jobExperience')?.updateValueAndValidity();
    });
  }

  
  jobOptions = [  { value: 'Programmer', display: 'Programmer' },  { value: 'Designer', display: 'Designer' },  { value: 'Product Manager', display: 'Product Manager' }]; 
   startTime = Date.now();
  elapsedTime = timer(0, 1000).pipe(map(() => Date.now() - this.startTime)).subscribe(time => 
    { 
      this.totalTime = time;
      this.totalPassedTime = time/1000 + "s"
    });

  submit() {
    console.log("submit called");
    console.log(this.form.value);
    this.data = this.form.getRawValue();
    this.appService.send(this.data);
    this.router.navigateByUrl('success', { state: {"totalPassedTime": this.totalTime} }) ;
  }

 

}
