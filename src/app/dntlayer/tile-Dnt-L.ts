import { DntLayer } from './dnt-layer';
import { LayerParam } from '../dnt-layer-creator';
import TileLayer  from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export class TileDntL extends DntLayer{
    
    /**
     *
     */
    constructor(layerParam:LayerParam) {
        super(layerParam);
        //se construye con la capa como tal
        this.layer=new TileLayer({
            source:new OSM()
        });
        this.setBasicsToLayer();
    }

    detectarSourceOArmar(){
         if("ol_source_accesor" in this.layerParamObject.settings){
             console.log("se detecto el accesor")
         }
    }
}
