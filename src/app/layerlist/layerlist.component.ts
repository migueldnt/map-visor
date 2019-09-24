import { Component, OnInit, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { LayerRefreshService } from './layer-refresh.service';
import { DntLayer } from '../dntlayer/dnt-layer';
import { GroupDntL } from '../dntlayer/group-dnt-l';



/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface LayerNode {
  title: string;
  layers?: LayerNode[];
}

const TREE_DATA: DntLayer[] = [];

/** Flat node with expandable and level information */
interface LayerFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  dntLayer:DntLayer;
  checked:boolean
}


@Component({
  selector: 'app-layerlist',
  templateUrl: './layerlist.component.html',
  styleUrls: ['./layerlist.component.css']
})
export class LayerlistComponent implements OnInit {
  @Input() json1:DntLayer[]=[]
  private _transformer = (node: DntLayer, level: number):LayerFlatNode => {
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
      dntLayer:node,
      checked:node.visible
    };
  }

  treeControl = new FlatTreeControl<LayerFlatNode>(node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => (node as GroupDntL).hijos );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<LayerFlatNode, LayerNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<LayerNode, LayerFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: LayerFlatNode | null = null;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<LayerFlatNode>(true /* multiple */);

  constructor(private _layerRefreshService:LayerRefreshService) {
    this.dataSource.data = TREE_DATA
    this._layerRefreshService.listen().subscribe((m:any)=>{
      console.log(m)
      setTimeout(()=>{
        this.dataSource.data=this.json1;
      },100)
    })
    //console.log(this.dataSource);
    this.checklistSelection.onChange.subscribe((node)=>{
      console.log(node)
    })
  }

  hasChild = (_: number, node: LayerFlatNode) => node.expandable;

  getLevel = (node: LayerFlatNode) => node.level;

  isExpandable = (node: LayerFlatNode) => node.expandable;

  getChildren = (node: LayerNode): LayerNode[] => (node as GroupDntL).hijos;

  hasNoContent = (_: number, _nodeData: LayerFlatNode) => _nodeData.name === '';

  ngOnInit() {
    console.log(this.json1)
    //this.dataSource.data = this.json1;
  }


    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: LayerFlatNode): boolean {
      
      const descendants = this.treeControl.getDescendants(node);
      //console.log(descendants.length)
      const descAllSelected = descendants.every(child =>
        this.checklistSelection.isSelected(child)
      );
      return descAllSelected;
    }
  
    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: LayerFlatNode): boolean {
      const descendants = this.treeControl.getDescendants(node);
      const result = descendants.some(child => this.checklistSelection.isSelected(child));
      return result && !this.descendantsAllSelected(node);
    }
  
    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: LayerFlatNode): void {
      //console.log("click en es papa: "+ node.name+"...")
      this.checklistSelection.toggle(node);
      const descendants = this.treeControl.getDescendants(node);

      //aqui se deseleccionan todos ...jajjajaaj
      if(this.checklistSelection.isSelected(node)){
        this.checklistSelection.select(...descendants)
      }else{
        this.checklistSelection.deselect(...descendants)
      }
  
      // Force update for the parent
      descendants.every(child =>
        this.checklistSelection.isSelected(child)
      );
      this.checkAllParentsSelection(node);

      let checado=this.checklistSelection.isSelected(node);
      node.dntLayer.setVisible(checado);
    }
  
    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    todoLeafItemSelectionToggle(node: LayerFlatNode): void {
      //console.log("click en "+ node.name+"...")
      this.checklistSelection.toggle(node);
      this.checkAllParentsSelection(node); //manda a check o indeterminate sus parents
      let checado=this.checklistSelection.isSelected(node);
      node.dntLayer.setVisible(checado);
    }
  
    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node: LayerFlatNode): void {
      let parent: LayerFlatNode | null = this.getParentNode(node);
      while (parent) {
        this.checkRootNodeSelection(parent);
        parent = this.getParentNode(parent);
      }
    }
  
    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node: LayerFlatNode): void {
      
      const nodeSelected = this.checklistSelection.isSelected(node);
      node.dntLayer.setVisible(nodeSelected);
      const descendants = this.treeControl.getDescendants(node);
      const descAllSelected = descendants.every(child =>
        this.checklistSelection.isSelected(child)
      );
      console.log(nodeSelected,descAllSelected)
      if (nodeSelected && !descAllSelected) {
        console.log("deselect indeterminate")
        this.checklistSelection.deselect(node);
        node.dntLayer.setVisible(true);
      } else if (!nodeSelected && descAllSelected) {
        console.log("select")
        this.checklistSelection.select(node);
        node.dntLayer.setVisible(true);
      }else{
        console.log("deselect")
        node.dntLayer.setVisible(true);
      }
    }
  
    /* Get the parent node of a node */
    getParentNode(node: LayerFlatNode): LayerFlatNode | null {
      const currentLevel = this.getLevel(node);
  
      if (currentLevel < 1) {
        return null;
      }
  
      const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
  
      for (let i = startIndex; i >= 0; i--) {
        const currentNode = this.treeControl.dataNodes[i];
  
        if (this.getLevel(currentNode) < currentLevel) {
          return currentNode;
        }
      }
      return null;
    }


  mensaje1(){
    
    console.log(this.json1)    
  }

}
