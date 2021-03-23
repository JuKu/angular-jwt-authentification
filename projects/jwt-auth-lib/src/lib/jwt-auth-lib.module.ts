import { NgModule } from '@angular/core';
import { JwtAuthLibComponent } from './jwt-auth-lib.component';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [JwtAuthLibComponent],
  imports: [
    HttpClientModule
  ],
  exports: [JwtAuthLibComponent]
})
export class JwtAuthLibModule { }
