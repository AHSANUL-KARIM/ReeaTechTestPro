import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SuccessModule } from './success/success.module';


const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
        { path: 'home', component: HomeComponent } ,     
        { path: 'success', loadChildren: () => SuccessModule },
        { path: '', redirectTo: 'home', pathMatch: 'full' }      

          
        //{ path: '**', redirectTo: ''}
    ]
},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
