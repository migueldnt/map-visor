import { Component, OnInit, Input } from '@angular/core';

import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { LayerRefreshService } from './layer-refresh.service';
import { DntLayer } from '../dntlayer/dnt-layer';
import { GroupDntL } from '../dntlayer/group-dnt-l';



/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  title: string;
  layers?: FoodNode[];
}

const TREE_DATA: DntLayer[] = [];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-layerlist',
  templateUrl: './layerlist.component.html',
  styleUrls: ['./layerlist.component.css']
})
export class LayerlistComponent implements OnInit {
  @Input() json1:DntLayer[]=[]
  private _transformer = (node: DntLayer, level: number) => {
    let expandable1=false
    if(node instanceof GroupDntL){
      if((node as GroupDntL).hijos.length>0){
        expandable1=true
      }
    }
    return {
      expandable: expandable1,
      name: node.title,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => (node as GroupDntL).hijos );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private _layerRefreshService:LayerRefreshService) {
    this.dataSource.data = TREE_DATA
    this._layerRefreshService.listen().subscribe((m:any)=>{
      console.log(m)
      setTimeout(()=>{
        this.dataSource.data=this.json1;
      },100)
    })
    //console.log(this.dataSource);
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
    console.log(this.json1)
    //this.dataSource.data = this.json1;
  }

  mensaje1(){
    
    console.log(this.json1)    
  }

}
