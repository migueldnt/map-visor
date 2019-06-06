import Map from 'ol/Map'
export class DntLayerCreator {
    map:Map;
    jsonLoaded:any;
    constructor(map:Map,jsonLoaded:any){
        this.map=map;
        this.jsonLoaded=jsonLoaded;
    }

    setupMap(){
        console.log("se empieza el mapa")
    }

    

}
