import BaseLayer from 'ol/layer/Base';
import { LayerParam } from '../dnt-layer-creator';

export class DntLayer {
    layer:BaseLayer
    type:string
    name:string
    title:string
    visible:boolean
    isPluginView:boolean
    isGroup:Boolean
    layerParamObject:LayerParam

    /**
     * si esta activo, es diferente a si esta visible activo es cuando esta disponible su cambio desde el arbol de layers
     */
    active:boolean=true;

    constructor(layerParam:LayerParam){
        this.layerParamObject=layerParam;
        this.type=layerParam.type;
        this.name=layerParam.name;
        this.title=layerParam.title;
        this.visible=("visible" in layerParam)?layerParam.visible:true;
    }

    setBasicsToLayer(){
        this.layer.setVisible(this.visible);
        this.layer.set("name",this.name);
        this.layer.setOpacity(("opacity" in this.layerParamObject)?this.layerParamObject.opacity:1);
    }

    setVisible(visible:boolean){
        this.visible=visible
        if(this.active){
            this.layer.setVisible(visible);
        }
    }

    setActive(active:boolean){
        this.active=active
        if(this.active){
            this.layer.setVisible(this.visible)
        }else{
            this.layer.setVisible(this.active)
        }
    }

    toggleVisible(){
        let nueval=!this.visible;
        this.setVisible(nueval);
    }
}
