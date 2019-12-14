import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LayerlistComponent } from './layerlist/layerlist.component';
import { SimpleRequestService } from './simple-request.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTree, MatTreeNode,MatTreeModule } from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule, MatCheckboxModule, MatDialog, MatDialogModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import { LayerRefreshService } from './layerlist/layer-refresh.service';
import { LegendItemComponent } from './layerlist/legend-item/legend-item.component';
import { ToolbarContainerComponent } from './toolbar/toolbar-container/toolbar-container.component';
import { DialogDownloadComponent } from './toolbar/dialog-download/dialog-download.component';
import { DntAlertaComponent } from './dnt-alerta/dnt-alerta.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayerlistComponent,
    LegendItemComponent,
    ToolbarContainerComponent,
    DialogDownloadComponent,
    DntAlertaComponent,
    
  ],
  imports: [
    BrowserModule,HttpClientModule,BrowserAnimationsModule,MatTreeModule,MatIconModule,MatButtonModule,
    MatCheckboxModule,MatDialogModule,MatFormFieldModule,MatSelectModule,FormsModule
  ],
  providers: [SimpleRequestService,LayerRefreshService],
  bootstrap: [AppComponent],
  entryComponents:[ DntAlertaComponent, DialogDownloadComponent ]
})
export class AppModule { }
