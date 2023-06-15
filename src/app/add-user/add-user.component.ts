import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { UserServiceService } from '../service/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  addUserForm: FormGroup= this.formBuilder.group({});
  id:number | undefined
  isUpdate:boolean=false
  constructor(private formBuilder: FormBuilder, private http: UserServiceService,private route: ActivatedRoute,private router:Router) {
    
  }
  
  ngOnInit(){
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      place: ['', Validators.required]
    });
    this.route.params.subscribe(user=>{
        this.id=user['id'];
    })
    if(this.id!=null){
      this.isUpdate=true;
      this.http.oneUser(this.id).subscribe(user=>{
        this.fillFormToUpdate(user)
      })
    }
  }
  get name(){
    return this.addUserForm.get('name')
  }
  get place(){
    return this.addUserForm.get('place')
  }
  addUser() {
    if (this.addUserForm.valid) {
      const userData = this.addUserForm.value;
      this.http.addUser(this.addUserForm.value).subscribe(
        response => {
          this.router.navigate(["/all"])
        },
        error => {
        }
      );
    }
  }
  fillFormToUpdate(user: User) {
    this.addUserForm.setValue({
      name: user.name,
      place: user.place
    })
  }
 updateHtml() {
  this.http.updateUser(this.id,this.addUserForm.value).subscribe(user=>{
    this.router.navigate(["/all"])
  })
  }
}


