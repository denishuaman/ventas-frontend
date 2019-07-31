import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonaDialogoComponent } from './pages/persona/persona-dialogo/persona-dialogo.component';
import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    ProductoComponent,
    PersonaDialogoComponent,
    ProductoEdicionComponent
  ],
  entryComponents: [
    PersonaDialogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
