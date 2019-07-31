import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Producto } from '../_model/producto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  cambioProducto = new Subject<Producto[]>();
  mensaje = new Subject<string>();

  urlWS: string = `${environment.HOST}/productos`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Producto[]>(this.urlWS);
  }

  buscarPorId(idProducto: number) {
    return this.http.get<Producto>(`${this.urlWS}/${idProducto}`);
  }

  registrar(producto: Producto) {
    return this.http.post(this.urlWS, producto);
  }

  modificar(producto: Producto) {
    return this.http.put(this.urlWS, producto);
  }

  eliminar(idProducto: number) {
    return this.http.delete(`${this.urlWS}/${idProducto}`);
  }
}
