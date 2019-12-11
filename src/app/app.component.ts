import { Component, Output } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { DntLayerCreator } from './dnt-layer-creator';
import { SimpleRequestService } from './simple-request.service';
import { LayerRefreshService } from './layerlist/layer-refresh.service';
import { EventEmitter } from 'events';
import { DntLayer } from './dntlayer/dnt-layer';
import { LegendItem } from './layerlist/legend-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'map-visor';
  mapa = null;
  eljson1:DntLayer[] = []; //borrar, solo es para probar
  mapCreator: DntLayerCreator;
  legends:LegendItem[]=[];
  constructor(public simpleRequestService: SimpleRequestService,private _layerRefreshService:LayerRefreshService) {

  }
  @Output() OnLoadParams:EventEmitter=new EventEmitter()
  ngOnInit() {
    this.mapa = new Map({
      target: 'mapa1',
      layers: [
      ],
      view: new View({
        center: [0, 0],
        zoom: 3,
        projection: "EPSG:4326"
      })
    });
    //console.log(this.mapa)
    this.simpleRequestService.getJson("assets/map_p.json").subscribe((data) => {
      this.mapCreator = new DntLayerCreator(this.mapa, data)
      this.mapCreator.setupMap()
      this.eljson1 = this.mapCreator.groupLayersMain.hijos;
      this._layerRefreshService.refresh("refrescando capas en arbol..")
      this.legends=this.mapCreator.legends;
    })

  }


}
