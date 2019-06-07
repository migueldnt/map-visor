import BaseLayer from 'ol/layer/Base';
import { LayerParam } from '../dnt-layer-creator';

export class DntLayer {
    layer:BaseLayer
    type:string
    name:string
    visible:boolean
    isPluginView:boolean
    isGroup:Boolean
    layerParamObject:LayerParam

    constructor(layerParam:LayerParam){
        this.layerParamObject=layerParam;
        this.type=layerParam.type;
        this.name=layerParam.name;
        this.visible=("visible" in layerParam)?layerParam.visible:true;
    }

    setBasicsToLayer(){
        this.layer.setVisible(this.visible);
        this.layer.set("name",this.name);
        this.layer.setOpacity(("opacity" in this.layerParamObject)?this.layerParamObject.opacity:1);
    }
}
