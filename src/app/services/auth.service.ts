import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private usuariosUrl = '../../assets/users.json'
  constructor(
		private http: HttpClient
	) { }

	verificarCredenciales(username:string, password:string, id:string): Observable<boolean>{
		return this.http.get<any[]>(this.usuariosUrl).pipe(
      map((usuarios: any[]) => usuarios.find(usuario =>  usuario.id === id && usuario.username === username && usuario.password === password) !== undefined)
    );
	}
}
