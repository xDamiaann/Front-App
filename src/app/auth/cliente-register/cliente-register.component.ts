import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { of, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Validaciones } from '../../../app/utils/validaciones';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-register',
  templateUrl: './cliente-register.component.html',
  styleUrls: ['./cliente-register.component.css']
})
export class RegisterComponent implements OnInit {
  clienteForm!: FormGroup; // aseguramos que clienteForm está inicializado en ngOnInit
  barrio: any[] = [];
  validaciones = {
    cedula: true,
    correo: true,
    telefono: true,
    username: true
  };
  passwordVisible: boolean = false;
  private usernameSubject = new Subject<string>();
  private cedulaSubject = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }


  AlertaSucess(msj: string) {
    console.log("alerta", msj);
    this.toastr.success(msj, 'Éxito', { timeOut: 4000 });
  }

  AlertaFail(msj: string) {
    this.toastr.error(msj, 'Error', { timeOut: 4000 });
  }
  navigateToCliente() {
    this.router.navigate(['login-cliente']);
  }
  navigateToDistribuidor() {
    this.router.navigate(['login-distribuidor']);
  }
  navigateToAdmin() {
    this.router.navigate(['login-admin']);
  }

  navigateToAbout() {
    this.router.navigate(['about']);
  }

  navigateToShop() {
    this.router.navigate(['shop']);
  }

  navigateToContacto() {
    this.router.navigate(['contacto']);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
  }

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      cedula: ['', [Validators.required, this.validarCedula.bind(this)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, this.validarTelefono.bind(this)]],
      email: ['', [Validators.required, this.validarCorreo.bind(this)]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      id_barrio: [null, Validators.required]
    });

    if (this.clienteForm) {

      this.authService.getBarrios().subscribe(
        response => {
          this.barrio = response;
          console.log("datos", this.barrio);
        },
        error => {
          console.error('Error al obtener los barrios', error);
        }
      );

      this.usernameSubject.pipe(
        debounceTime(300),
        switchMap((username: string) => {
          if (username) {
            return this.authService.checkUsername(username).pipe(
              switchMap((isTaken: boolean) => of(isTaken))
            );
          } else {
            return of(false);
          }
        })
      ).subscribe(
        (isTaken: boolean) => {
          this.validaciones.username = !isTaken;
          if (isTaken) {
            this.clienteForm.get('username')?.setErrors({ taken: true });
          } else {
            this.clienteForm.get('username')?.setErrors(null);
          }
        },
        (error: any) => {
          console.error('Error al verificar el username', error);
          this.validaciones.username = false;
        }
      );

      this.clienteForm.get('username')?.valueChanges.subscribe(username => {
        this.usernameSubject.next(username);
      });

      // Validación de cédula ya registrada
      this.cedulaSubject.pipe(
        debounceTime(300),
        switchMap((cedula: string) => {
          if (cedula && this.validarCedula({ value: cedula }) === null) {
            return this.authService.checkCedula(cedula).pipe(
              switchMap((isTaken: boolean) => of(isTaken))
            );
          } else {
            return of(false);
          }
        })
      ).subscribe(
        (isTaken: boolean) => {
          this.validaciones.cedula = !isTaken;
          if (isTaken) {
            this.clienteForm.get('cedula')?.setErrors({ taken: true });
          } else {
            this.clienteForm.get('cedula')?.setErrors(null);
          }
        },
        (error: any) => {
          console.error('Error al verificar la cédula', error);
          this.validaciones.cedula = false;
        }
      );

      this.clienteForm.get('cedula')?.valueChanges.subscribe(cedula => {
        this.clienteForm.get('cedula')?.updateValueAndValidity();
        this.cedulaSubject.next(cedula);

      });




    }
  }

  validarCedula(control: any) {
    const valid = Validaciones.cedulaEcuatoriana(control.value);
    if (!valid) {
      return { invalidCedula: true };
    }
    return null;
  }

  validarCorreo(control: any) {
    const valid = Validaciones.correoValido(control.value);
    if (!valid) {
      return { invalidCorreo: true };
    }
    return null;
  }

  validarTelefono(control: any) {
    const valid = Validaciones.telefonoValido(control.value);
    if (!valid) {
      return { invalidTelefono: true };
    }
    return null;
  }

  onCedulaInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10);
      this.clienteForm.get('cedula')?.setValue(input.value, { emitEvent: false });
    }
    this.clienteForm.get('cedula')?.updateValueAndValidity();
  }

  formularioValido(): boolean {
    return this.clienteForm.valid && Object.values(this.validaciones).every(value => value);
  }



  onSubmit() {
    if (this.formularioValido()) {
      this.authService.registerClient(this.clienteForm.value).subscribe(
        response => {
          const msj = 'Cliente registrado correctamente';
          this.AlertaSucess(msj);
          setTimeout(() => {
            this.router.navigate(['/login-cliente']);
          }, 2000);

        },
        error => {
          console.error('Error al registrar el cliente', error);
        }
      );
    }
  }
}