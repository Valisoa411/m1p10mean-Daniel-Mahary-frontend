import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { TesthtmlComponent } from './testhtml/testhtml.component';
import { SignUpComponent } from './client/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'test', component: TesthtmlComponent } // Redirection pour les URL non définies
];

@NgModule({
  declarations: [
    AppComponent,
    TesthtmlComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Ajoutez le module de routage à la liste des imports
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
