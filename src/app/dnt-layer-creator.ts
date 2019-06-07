import Map from 'ol/Map'
import BaseLayer from 'ol/layer/Base';
import { TileDntL } from './dntlayer/tile-Dnt-L';
import { DntLayer } from './dntlayer/dnt-layer';
import { GroupDntL } from './dntlayer/group-dnt-l';

export class DntLayerCreator {
    map:Map;
    jsonLoaded:any;

    /**
     * La lista de objetos que son parametros en el json
     *
     * @type {LayerParam[]}
     * @memberof DntLayerCreator
     */
    layersParams:LayerParam[];

    /**
     * lOS layers (Dntlayer) que sirven de mapa base en el mapa
     *
     * @type {DntLayer[]}
     * @memberof DntLayerCreator
     */
    layers_base:DntLayer[]=[];

    /**
     * lOS layers (DntLayer) que se desglozaran en forma de arbol para apagar y prender
     *
     * @type {DntLayer[]}
     * @memberof DntLayerCreator
     */
    layers_main:DntLayer[]=[];

    groupLayersBase:GroupDntL;

    groupLayersMain:GroupDntL;

    constructor(map:Map,jsonLoaded:any){
        this.map=map;
        this.jsonLoaded=jsonLoaded;
        this.layersParams=<LayerParam[]>this.jsonLoaded.layers;
    }

    setupMap(){
        //de las configuraciones necesarias aplicarselas al mapa
        //primero las de el centro y zoom y todo eso, ver si es necesario hacer interfaces

        //despues lo de los layers, construirlos
        let layersTodos:DntLayer[]=[];
        this.layersParams.forEach(layerParam => {
            // console.log(layerParam);
            let unDntLayer:DntLayer=DntLayerCreator.construirDntLayer(layerParam);
            layersTodos.push(unDntLayer);
        });
        //debemos ordenarlos en los grupos de capas base y por fin agregarlos al mapa
        this.ordenarlayersEnArbol(layersTodos);
        //ya ordenados hay que agregarlos al mapa para que se vean chidos
        this.addLayersToMap();
       
    }

    private addLayersToMap(){
        //creare dos grupos de layers para tener todo en 2 grandes ordenes base y main
        this.groupLayersBase=new GroupDntL({name:"_DNT_BASE_",title:"",type:"group",settings:{},visible:true,opacity:1})
        this.groupLayersBase.setHijos(this.layers_base);
        //agregarlos y hacer que solo sea visible uno
        this.map.addLayer(this.groupLayersBase.layer);
        //console.log(this.map.getLayers())

        this.groupLayersMain=new GroupDntL({name:"_DNT_MAIN_",title:"",type:"group",settings:{},visible:true,opacity:1})
        //this.groupLayersMain.setHijos(this.layers_main);
    }

    private ordenarlayersEnArbol(todosLayers:DntLayer[]){
        console.log(todosLayers);   
        let arbol:any=this.jsonLoaded.skeleton;
        if("base" in arbol){
            //llenar todos los que perteneceran al grupo base
            let capas:any[]=arbol.base;
            capas.forEach(capa_name => {
                //buscar capa en todos los layers y agregarla a su grupo
                let capa_toadd=todosLayers.find((element)=> element.name==capa_name );
                //console.log(capa_toadd,capa_name)
                this.layers_base.push(capa_toadd)
            });
        }

        if("main" in arbol){
            //lenar todos los que pertenecen al main
            //hasta 3 niveles podra tener el arbol de capas
            let capas:any[]=arbol.main;
            capas.forEach(capa=>{
                //si capa es string --- es un layer
                //si capa es object --- es un grupo 
                if(typeof capa == "string"){
                    let capa_toadd=todosLayers.find((element)=> element.name==capa )
                    this.layers_main.push(capa_toadd)

                }
                if(typeof capa == "object"){
                    //es un grupo y hay que verificar niveles ... pensarlo bien
                    //REGRESA A ESTE CACHO DE CODIGO
                }
            });

        }

    }

    public static construirDntLayer(layerParam:LayerParam):DntLayer{
        let tipo=layerParam.type;
        switch (tipo) {
            case "tile":
                return new TileDntL(layerParam)
                break;
            default:
                return new DntLayer(layerParam)
                break;
        }
    }
    

}



export interface LayerParam{
    type:string,
    name:string,
    title:string,
    description?:string
    visible?:boolean,
    opacity?:number,
    settings:any,
    plugin_view?:any
}