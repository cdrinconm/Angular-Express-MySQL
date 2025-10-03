import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../models/usuario/usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/usuarios'
  
  constructor(private http:HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl, this.cargarHeaders());
  }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario, this.cargarHeaders());
  }

  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.apiUrl+"/"+id, usuario, this.cargarHeaders());
  }

  deleteUsuario(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(this.apiUrl+"/"+id, this.cargarHeaders());
  }

  cargarHeaders(){
    //localStorage.setItem('Token', data.token);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+localStorage.getItem('Token'),
      'Content-Type': 'application/json'
    });
    return { headers };
  }
}
