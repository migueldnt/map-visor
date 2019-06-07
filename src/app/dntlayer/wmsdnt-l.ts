import { DntLayer } from './dnt-layer';
import { LayerParam } from '../dnt-layer-creator';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';

export class WMSDntL extends DntLayer {

    constructor(layerParam:LayerParam){
        super(layerParam);
        let settings1:WMSSettingsParam=this.layerParamObject.settings;
        this.layer=new TileLayer({
            source:new TileWMS({
                url:settings1.url,
                params:settings1.request_body,
                serverType: "geoserver",
                transition: 0
            })
        });
        this.setBasicsToLayer();
        
    }

}

export interface WMSSettingsParam{
    request_body:any,
    url:string
}
