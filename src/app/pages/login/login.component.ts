import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    public auth: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.email = '';
    this.password = '';
    this.auth.afAuth.authState.subscribe(
      user => {
        if(user){
          this.router.navigate(['/home']);
        }
      }
    )
  }

}
