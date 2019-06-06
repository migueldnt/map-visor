import { Component } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { DntLayerCreator } from './dnt-layer-creator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'map-visor';
  mapa=null;
  constructor() {
    
  }

  ngOnInit(){
    console.log("iniciando esto")
    this.mapa = new Map({
      target: 'mapa1',
      layers: [
      ],
      view: new View({
        center: [0, 0],
        zoom: 3
      })
    });
    console.log(this.mapa)
    let mapCreator=new DntLayerCreator(this.mapa,{})
  }


  irPorJson1(){
    
  }
}
