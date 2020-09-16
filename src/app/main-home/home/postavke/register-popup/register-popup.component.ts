import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-register-popup',
  templateUrl: './register-popup.component.html',
  styleUrls: ['./register-popup.component.css']
})
export class RegisterPopupComponent implements OnInit {
  @ViewChild('btnClose') btnClose: ElementRef;
  zatvori() {
    this.btnClose.nativeElement.click();
  }

  constructor(public auth:AuthServiceService) { }

  ngOnInit(): void {
  }

  register(form){
    this.auth.createUser(form.value)
  }

}
