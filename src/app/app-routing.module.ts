import { PersonaComponent } from './pages/persona/persona.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';


const routes: Routes = [
  {path: 'producto', component: ProductoComponent, children: [
    {path: 'nuevo', component: ProductoEdicionComponent},
    {path: 'edicion/:idProducto', component: ProductoEdicionComponent}
  ]},
  {path: 'persona', component: PersonaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
