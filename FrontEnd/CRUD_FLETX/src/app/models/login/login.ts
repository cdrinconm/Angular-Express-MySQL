export class Login {
    usuario: string = "";
    contrasena: string = "";
}

export class LoginResponse {
    access: boolean = false;
    token: string = "";
}
