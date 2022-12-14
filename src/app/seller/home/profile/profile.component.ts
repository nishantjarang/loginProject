import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerapiService } from '../../services/sellerapi.service';
import { SellerlocalstorageapiService } from '../../services/sellerlocalstorageapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUserEmail: any;
  data1: any;
  companyForm: FormGroup;
  verifyToken: any;
  verify: any;

  constructor(
    private routerforlogin: Router,
    private apiObject: SellerapiService,
    private localstorageObject: SellerlocalstorageapiService,
    private activeObject: ActivatedRoute
  ) {
    activeObject.queryParams.subscribe((data) => {
      this.verifyToken = data;
    });

    console.log('hello nishant');

    this.getLoginInfo();
  }

  ngOnInit(): void {
    this.companyForm = new FormGroup({
      email: new FormControl(),
      name: new FormControl(),
      old_password: new FormControl(),
      new_password: new FormControl(),
    });
    console.log(this.verifyToken);
  }

  deleteLocal() {
    this.localstorageObject.removeToken();
    this.routerforlogin.navigateByUrl('/seller/auth');
  }

  getLoginInfo() {
    this.apiObject.get(`/auth/self`).subscribe({
     next:(data) => {
        this.data1 = data;
        console.log(this.data1);
        this.verify = this.data1['isEmailVerified'];
      },
      error:(error) => {
        console.log(error);
      }
  });
  }

  fillEmail() {
    this.companyForm.controls['email'].setValue(this.data1['email']);
  }

  editCompany(formData: any) {
    delete this.companyForm.value.old_password;
    delete this.companyForm.value.new_password;

    console.log(formData);

    this.apiObject.patch('/users/org', formData).subscribe(
      (data) => {
        this.getLoginInfo();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sendPasswordData(passwordData: any) {
    delete this.companyForm.value.email;
    delete this.companyForm.value.name;

    console.log(passwordData);
    this.apiObject.post(`/users/auth/change-password`, passwordData).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  verifyEmail() {
    this.apiObject.post(`/auth/send-verification-email`, {}).subscribe(
      (data) => {
        console.log('success');

        this.routerforlogin.navigateByUrl('/auth/verify-email');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
