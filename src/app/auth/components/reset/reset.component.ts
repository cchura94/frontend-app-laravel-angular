import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  reset: any = {
    token: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.reset.token = this.route.snapshot.paramMap.get("token")
  }


  resetP(){
    this.authService.resetPass(this.reset).subscribe(
      (res) => {
        console.log(res);
      }
    )
  }
}
