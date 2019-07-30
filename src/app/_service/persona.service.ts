import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Persona } from '../_model/persona';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  cambioPersona = new Subject<Persona>();
  mensaje = new Subject<string>();

  urlWS: string = `${environment.HOST}/personas`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Persona[]>(this.urlWS);
  }

  registrar(persona: Persona) {
    return this.http.post(this.urlWS, persona);
  }

  modificar(persona: Persona) {
    return this.http.put(this.urlWS, persona);
  }
}
