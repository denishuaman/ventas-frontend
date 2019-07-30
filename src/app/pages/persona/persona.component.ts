import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Persona } from 'src/app/_model/persona';
import { PersonaService } from 'src/app/_service/persona.service';

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

  constructor(private personaService: PersonaService) { }

  ngOnInit() {
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

}
