import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SellerapiService } from '../../services/sellerapi.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userGroup: FormGroup;
  userInformationArray: any;
  currentEditInfo: any;
  roleData: any;
  pageItem: any;
  totalPages1: any;
  userDataArray: any;
  pages: any[] = [];
  // demo: any = 0;
  userToken: any;
  query: any;

  constructor(
    private apiService: SellerapiService,
    private routerObject: Router
  ) {
    this.apiService.page = 1;
    this.userInfo();
  }

  ngOnInit(): void {
    this.userGroup = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),
      role: new FormControl(),
    });
  }

  userSearch(event: any) {
    this.apiService.name = event.target.value;
    this.userInfo();
  }

  userInfo() {
    this.query = `?limit=${this.apiService.limit}&page=${this.apiService.page}`;

    if (this.apiService.name == '') {
      this.query = `?limit=${this.apiService.limit}&page=${this.apiService.page}`;
    } else {
      this.query = `${this.query}&name=${this.apiService.name}`;
    }

    this.apiService.get(`/users${this.query}`).subscribe((data: any) => {
      this.userDataArray = data['results'];
      this.userInformationArray = data;
      console.log(this.userInformationArray);

      this.pages.length = this.userInformationArray['totalPages'];
      this.pages.fill(0);
      console.log(this.pages);
    });
  }

  submitUserForm(userFormData: any) {
    this.apiService.post('/users', userFormData.value).subscribe(
      (data) => {
        this.userInfo();
      },
      (err) => {
        alert(err['error']['message']);
      }
    );
  }

  submitEditUserForm(editUserFormInfo: any) {
    delete this.userGroup.value.role;

    console.log(editUserFormInfo);
    this.apiService
      .patch(`/users/${this.userToken}`, editUserFormInfo)
      .subscribe((data) => {
        console.log(data);
        this.userInfo();

        this.userDataArray = data;
      });
  }

  userId(idInfo: any) {
    this.userToken = idInfo['_id'];
  }

  sendRoleData(roleValue: any, userIdInfo: any) {
    this.apiService
      .patch(`/users/role/${userIdInfo}`, { role: roleValue.target.value })
      .subscribe(
        (data: any) => {
          this.userDataArray = data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  deleteUser(userIdInfo1: number) {
    this.apiService.delete(`/users/${userIdInfo1}`).subscribe(
      (data) => {
        this.userDataArray = data;
        this.userInfo();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  pageChange(event: any) {
    if (this.apiService.page == this.pages.length) {
      if (event.target.value > this.apiService.limit) {
        this.apiService.page--;
      }
    }
    this.apiService.limit = event.target.value;
    this.userInfo();
  }

  pageClick(pageNoInfo: any) {
    console.log(pageNoInfo);
    this.apiService.page = pageNoInfo;
    this.userInfo();
  }

  nextData() {
    console.log(this.pages.length);

    if (this.apiService.page < this.userInformationArray['totalPages']) {
      this.apiService.page++;
      this.userInfo();
    }
  }

  previousData() {
    if (this.apiService.page != 1) {
      this.apiService.page--;
      this.userInfo();
    }
  }
}
