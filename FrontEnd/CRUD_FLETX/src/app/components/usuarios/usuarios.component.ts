import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[] = [];
  usuario: Usuario = { usuario: '', contrasena: '', email: ''};
  editar: Boolean = false;
  isEditar: number | null = null;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios():void{
    this.usuarioService.getUsuarios()
    .subscribe(data => {
      this.usuarios = data;
    });
  }

  guardarUsuario():void{
    if(this.editar && this.isEditar !== null){
      this.usuarioService.updateUsuario(this.isEditar, this.usuario)
      .subscribe(() => {
        this.getUsuarios();
        this.reiniciarFormulario();
      });
    } else {
      this.usuarioService.addUsuario(this.usuario)
      .subscribe(()=>{
        this.getUsuarios();
        this.reiniciarFormulario();
      })
    }
  }

  editarUsuario(usuario: Usuario): void{
    this.usuario = {...usuario};
    this.editar = true;
    this.isEditar = usuario.id!;
  }

  eliminarUsuario(id:number):void{
    this.usuarioService.deleteUsuario(id)
    .subscribe(() => {
      this.getUsuarios();
      this.reiniciarFormulario();
    });
  }

  reiniciarFormulario():void{
    this.usuario = { usuario: '', contrasena: '', email: ''};
    this.editar = false;
    this.isEditar = null;
  }

}
