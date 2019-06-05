import { Component } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

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
    console.log("iniciando2")
    this.mapa = new Map({
      target: 'mapa1',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 3
      })
    });
    console.log(this.mapa)
  }
}
