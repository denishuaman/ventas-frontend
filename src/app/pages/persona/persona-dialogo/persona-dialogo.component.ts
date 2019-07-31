import { Component, OnInit, Inject } from '@angular/core';
import { Persona } from 'src/app/_model/persona';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PersonaService } from 'src/app/_service/persona.service';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-persona-dialogo',
  templateUrl: './persona-dialogo.component.html',
  styleUrls: ['./persona-dialogo.component.css']
})
export class PersonaDialogoComponent implements OnInit {

  persona: Persona;

  constructor(private refDialogo: MatDialogRef<PersonaDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Persona,
    private personaService: PersonaService) { }

  ngOnInit() {
    // inicializando la data de la persona
    this.persona = new Persona();
    this.persona.idPersona = this.data.idPersona;
    this.persona.nombres = this.data.nombres;
    this.persona.apellidos = this.data.apellidos;
  }

  registrarOActualizar() {
    if (this.persona.idPersona == null || this.persona.idPersona === 0) {
      // registrar la persona.
      this.personaService.registrar(this.persona).pipe(switchMap(() => {
        return this.personaService.listar();
      })).subscribe(personasRegistradas => {
        this.personaService.cambioPersona.next(personasRegistradas);
        this.personaService.mensaje.next('Se registró la persona');
      }, error => {
        this.personaService.mensaje.next('Ocurrió un error al registrar a la persona. Debe ingresar todos los campos');
      });
    } else {
      // modificando a la persona.
      this.personaService.modificar(this.persona).pipe(switchMap(() => {
        return this.personaService.listar();
      })).subscribe(personasRegistradas => {
        this.personaService.cambioPersona.next(personasRegistradas);
        this.personaService.mensaje.next('Se modificó a la persona seleccionada');
      }, error => {
        this.personaService.mensaje.next('Ocurrió un error al modificar a la persona. Debe ingresar todos los campos');
      });
    }
    this.refDialogo.close();
  }

  cancelar() {
    this.refDialogo.close();
  }
}
