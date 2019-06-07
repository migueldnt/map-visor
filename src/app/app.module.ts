import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayerlistComponent } from './layerlist/layerlist.component';
import { SimpleRequestService } from './simple-request.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LayerlistComponent
  ],
  imports: [
    BrowserModule,HttpClientModule
  ],
  providers: [SimpleRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
