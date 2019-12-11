import { DntLayer } from './dnt-layer';
import { LayerParam } from '../dnt-layer-creator';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { LegendItem } from '../layerlist/legend-item';

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
    
    getlegend():LegendItem{
        let leyenda:LegendItem=new LegendItem(this.title,this.name);
        leyenda.use_singleColorOrLabel=false;
        leyenda.use_img=true;
        let params:string="?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER="+this.settings.request_body.LAYERS;
        leyenda.img_url=this.settings.url+params;
        return leyenda
    }

}

export interface WMSSettingsParam{
    request_body:any,
    url:string,
    extent?:number[]
}
