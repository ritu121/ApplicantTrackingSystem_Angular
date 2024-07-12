import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';// Adjust the import based on your actual service path

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;
  public message:string='';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("userID"));
  }


  onSubmit() {

    if (this.username == "" || null || this.password == "" || null) {
      this.message = "Please Enter UserName and Password."
      this.loginFailed = true;
      return
    }
    else {
      this.loginFailed = false;

      this.loginService.login(this.username, this.password).subscribe((data: LoginResponse) => {
    
        if (data) {
          this.loginFailed = false;
          let userName = data.userName;
          let userID = data.userID;
          localStorage.setItem("name", userName);
          localStorage.setItem("userID", userID);
          this.router.navigate(['/dashboard']);
        }
        else{
          this.loginFailed = true;
          this.message = "Login failed. Please check your username and password.";
        }
      },
        (error) => {
          this.loginFailed = true;
          this.message = "Login failed. Please check your username and password.";
          
          console.error("Login failed", error);
          // Display appropriate error message to the user
          if (error.status === 401) {
            // Unauthorized error (Invalid credentials)
            console.error("Invalid username or password");
          } else {
            // Other types of errors
            console.error("An unexpected error occurred", error);
          }
        }
  
  
      );
    }

    // If User Name and Password not entered ..Show msg "Please enter Username and Password"

   
  }
}

interface LoginResponse {
  userID: string;
  userName: string;
}
