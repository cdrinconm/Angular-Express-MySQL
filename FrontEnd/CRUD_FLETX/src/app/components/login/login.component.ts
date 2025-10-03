import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/login/login';
import { LoginService } from 'src/app/services/login/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string = "";
  contrasena: string = "";

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {}

  ingresar(){
    if(this.usuario && this.contrasena){
      this.loginService.getLogin({
        usuario: this.usuario,
        contrasena: this.contrasena
      })
      .subscribe((data:LoginResponse) => {
        if(data.access){
          localStorage.setItem('Token', data.token);
          this.router.navigate(['/usuarios']);
        } else {
          alert("Contraseña incorrecta")
        }
      });
    } else {
      alert("Diligencie los campos")
    }
  }
}
