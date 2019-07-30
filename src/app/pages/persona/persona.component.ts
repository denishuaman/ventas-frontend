import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Persona } from 'src/app/_model/persona';
import { PersonaService } from 'src/app/_service/persona.service';
import { PersonaDialogoComponent } from './persona-dialogo/persona-dialogo.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  nombresColumnas = ['idPersona', 'nombres', 'apellidos'];
  dataSource: MatTableDataSource<Persona>;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  constructor(private personaService: PersonaService, private dialogo: MatDialog, 
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.personaService.cambioPersona.subscribe(personas => {
      this.dataSource = new MatTableDataSource(personas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.personaService.mensaje.subscribe(detalle => {
      this.snackBar.open(detalle, 'Aviso', {duration: 2000});
    });

    //listando las personas
    this.personaService.listar().subscribe(personas => {
      this.dataSource = new MatTableDataSource(personas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(persona?: Persona) {
    let p = persona != null ? persona : new Persona();
    console.log('data de persona', p);
    this.dialogo.open(PersonaDialogoComponent, {
      width: '300px',
      data: p
    });
  }

}
