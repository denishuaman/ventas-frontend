import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/_model/producto';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/_service/producto.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-producto-edicion',
  templateUrl: './producto-edicion.component.html',
  styleUrls: ['./producto-edicion.component.css']
})
export class ProductoEdicionComponent implements OnInit {

  id: number;
  producto: Producto;
  formGroup: FormGroup;
  edicion: boolean = false;

  constructor(private productoService: ProductoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.producto = new Producto();
    this.formGroup = new FormGroup({
      'idProducto': new FormControl(0),
      'nombre': new FormControl(''),
      'marca': new FormControl('')
    });

    this.route.params.subscribe((parametros: Params) => {
      this.id = parametros['idProducto'],
        this.edicion = parametros['idProducto'] != null;
        this.inicializarFormulario();
    })
  }

  inicializarFormulario() {
    if (this.edicion) {
      this.productoService.buscarPorId(this.id).subscribe(producto => {
        let idProducto = producto.idProducto;
        let nombre = producto.nombre;
        let marca = producto.marca;
        this.formGroup = new FormGroup({
          'idProducto': new FormControl(idProducto),
          'nombre': new FormControl(nombre),
          'marca': new FormControl(marca)
        });
      });
    }
  }
  
  registrarOActualizar() {
    this.producto.idProducto = this.formGroup.value['idProducto'];
    this.producto.nombre = this.formGroup.value['nombre'];
    this.producto.marca = this.formGroup.value['marca'];

    if(this.producto.idProducto == null || this.producto.idProducto === 0) {
      this.productoService.registrar(this.producto).pipe(switchMap(() => {
        return this.productoService.listar();
      })).subscribe(productosRegistrados => {
        this.productoService.cambioProducto.next(productosRegistrados);
        this.productoService.mensaje.next('Se registró un(a) \"'+this.producto.nombre+'\"')
      });
    } else {
      this.productoService.modificar(this.producto).pipe(switchMap(() => {
        return this.productoService.listar();
      })).subscribe(productosRegistrados => {
        this.productoService.cambioProducto.next(productosRegistrados);
        this.productoService.mensaje.next('Se modificó el producto seleccionado');
      });
    }
    this.router.navigate(['producto']);
  }
}
