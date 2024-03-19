import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	username: string = '';
  password: string = '';
	id:string = ''
  constructor(
		public router: Router,
		private authService: AuthService
	) { }

  iniciarSesion(username: string, password: string, id:string): void {
    this.authService.verificarCredenciales(username, password, id).subscribe(
      autenticado => {
        if (autenticado) {
          // Redirigir o realizar acciones después de la autenticación
					localStorage.setItem('userId', this.id);
					this.router.navigate(["/dashboard"]);
          console.log('Usuario autenticado');
        } else {
          console.log('Credenciales inválidas');
        }
      }
    );
  }

}
