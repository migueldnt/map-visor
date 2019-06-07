import { Component } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { DntLayerCreator } from './dnt-layer-creator';
import { SimpleRequestService } from './simple-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'map-visor';
  mapa=null;
  mapCreator:DntLayerCreator;
  constructor(public simpleRequestService:SimpleRequestService){

  }
  ngOnInit(){
    this.mapa = new Map({
      target: 'mapa1',
      layers: [
      ],
      view: new View({
        center: [0, 0],
        zoom: 3,
        projection:"EPSG:4326"
      })
    });
    //console.log(this.mapa)
    this.simpleRequestService.getJson("assets/map_p.json").subscribe((data)=>{
      this.mapCreator=new DntLayerCreator(this.mapa,data)
      this.mapCreator.setupMap()
    })
    
  }


}
