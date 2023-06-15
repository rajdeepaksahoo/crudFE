import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowAllComponent } from './show-all/show-all.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {path:"all",component:ShowAllComponent},
  {path:"add",component:AddUserComponent},
  {path: 'update/:id', component: AddUserComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
