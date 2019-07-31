import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Producto } from 'src/app/_model/producto';
import { ProductoService } from 'src/app/_service/producto.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  nombresColumnas = ['idProducto', 'nombre', 'marca', 'acciones'];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  constructor(private productoService: ProductoService, private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit() {

    this.productoService.cambioProducto.subscribe(productosRegistrados => {
      this.dataSource = new MatTableDataSource(productosRegistrados);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.productoService.mensaje.subscribe(detalle => {
      this.snackBar.open(detalle, 'Aviso', {
        duration: 4000,
      });
    });

    this.productoService.listar().subscribe(productosRegistrados => {
      this.dataSource = new MatTableDataSource(productosRegistrados);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLocaleLowerCase();
  }

  eliminar(producto: Producto) {
    this.productoService.eliminar(producto.idProducto).pipe(switchMap(() => {
      return this.productoService.listar();
    })).subscribe(productosRegistrados => {
      this.productoService.cambioProducto.next(productosRegistrados);
      this.productoService.mensaje.next('\"' + producto.nombre + '\" de marca \"' + producto.marca + '\" fue eliminado');
    });
  }
}
