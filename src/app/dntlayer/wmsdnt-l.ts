import { DntLayer } from './dnt-layer';
import { LayerParam } from '../dnt-layer-creator';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';

export class WMSDntL extends DntLayer {
    settings:WMSSettingsParam;

    constructor(layerParam:LayerParam){
        super(layerParam);
        this.settings=this.layerParamObject.settings;
        
        this.layer=new TileLayer({
            source:new TileWMS({
                url:this.settings.url,
                params:this.settings.request_body,
                serverType: "geoserver",
                transition: 0
            })
        });
        if("extent" in this.settings){
            this.layer.setExtent(this.settings.extent);
        }
        this.setBasicsToLayer();
        
    }

}

export interface WMSSettingsParam{
    request_body:any,
    url:string,
    extent?:number[]
}
