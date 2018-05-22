import { Component, OnInit, Inject, ElementRef, OnDestroy } from '@angular/core';
import { UtilitiesService } from 'app/services/utilities.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as _ from 'lodash';
import * as cytoscape from 'cytoscape';
import * as edgehandles from 'cytoscape-edgehandles';
import * as contextMenus from 'cytoscape-context-menus';

@Component({
  selector: 'plant-model',
  templateUrl: './plant-model.component.html',
  styleUrls: ['./plant-model.component.scss']
})
export class PlantModelComponent implements OnInit {
  cy: any;
  dragEvent: any = null;
  updateData: any = {};
  outLine = {};
  isDisabledExport: boolean = true;
  isDrawModeOn: boolean = false;
  statusDrawModel: string = "Off";

  curCT: number = 5;
  curCDWP: number = 3;
  curCHWP: number = 3;

  // data plant model
  dataModel = {
    chillerUnit: {
      config: {
        position: {
          x: 0,
          y: 0
        }
      },
      data: [
        {
          id: 1,
          equipment: {
            cdwp: {
              id: 1,
              index: 2,
              name: 'CDWP 1',
              type: 'cdwp',
              backup: 'CDWP 3'
            },
            chiller: {
              id: 1,
              index: 1,
              name: 'Chiller 1',
              type: 'chiller'
            },
            chwp: {
              id: 1,
              index: 1,
              name: 'CHWP 1',
              type: 'chwp',
              backup: 'CHWP 3'
            }
          },
          idCCT: 1
        },
        {
          id: 2,
          equipment: {
            cdwp: {
              id: 2,
              index: 4,
              name: 'CDWP 2',
              type: 'cdwp',
              backup: null
            },
            chiller: {
              id: 2,
              index: 2,
              name: 'Chiller 2',
              type: 'chiller'
            },
            chwp: {
              id: 2,
              index: 3,
              name: 'CHWP 2',
              type: 'chwp',
              backup: null
            }
          },
          idCCT: null
        }
      ]
    },
    cct: {
      config: {
        ccts: [
          {
            idCCT: 1,
            position: {
              x: -200,
              y: 0
            }
          }
        ]
      },
      data: [
        {
          id: 1,
          index: 1,
          name: 'CCT 1',
          equipment: {
            cts: [
              {
                id: 1,
                index: 1,
                name: 'CT 1',
                type: 'ct',
                backup: 'CT 5'
              },
              {
                id: 2,
                index: 2,
                name: 'CT 2',
                type: 'ct',
                backup: null
              },
              {
                id: 3,
                index: 3,
                name: 'CT 3',
                type: 'ct',
                backup: null
              },
              {
                id: 4,
                index: 4,
                name: 'CT 4',
                type: 'ct',
                backup: null
              }
            ]
          }
        }
      ]
    },
    backup: {
      cct: {
        data: {
          id: 'backupParentCT',
          name: 'Backup for CT',
          type: 'backup'
        },
        position: {
          x: 0,
          y: 0
        },
        equipment: [
          {
            id: 'backupCT-5',
            index: 5,
            name: 'CT 5',
            type: 'ct',
          }
        ]
      },
      cdwp: {
        data: {
          id: 'backupParentCDWP',
          name: 'Backup for CDWP',
          type: 'backup'
        },
        position: {
          x: 0,
          y: 0
        },
        equipment: [
          {
            id: 'backupCDWP-3',
            index: 6,
            name: 'CDWP 3',
            type: 'cdwp'
          }
        ]
      },
      chwp: {
        data: {
          id: 'backupParentCHWP',
          name: 'Backup for CHWP',
          type: 'backup'
        },
        position: {
          x: 0,
          y: 0
        },
        equipment: [
          {
            id: 'backupCHWP-3',
            index: 5,
            name: 'CHWP 3',
            type: 'chwp'
          }
        ]
      }
    }
  };
  // tempDataModel = Object.assign({}, this.dataModel);
  tempDataModel = _.cloneDeep(this.dataModel);
  dataNodes: any[] = [];
  dataEdges: any[] = [];

  constructor(
    private _UtilitiesService: UtilitiesService,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    // console.log(contextMenus);
    // console.log(edgehandles);

    contextMenus(cytoscape, $);
    // edgehandles(cytoscape);
    cytoscape.use(edgehandles);
  }
  ngOnDestroy() {

  }

  // prepare data for cytocape
  prepareData() {
    let prepareData = [];
    // prepare data ccts
    for (let i = 0; i < this.dataModel.cct.data.length; i++) {
      this.dataNodes.push({
        group: 'nodes',
        data: {
          id: 'cct-' + this.dataModel.cct.data[i].id,
          index: this.dataModel.cct.data[i].index,
          name: this.dataModel.cct.data[i].name,
          type: 'cct'
        },
        position: {
          x: this.dataModel.cct.config.ccts[i].position.x,
          y: this.dataModel.cct.config.ccts[i].position.y,
        },
        classes: 'show-remove'
      });
      // positon of cooling tower
      let positionCT = {
        x: this.dataModel.cct.config.ccts[i].position.x,
        y: this.dataModel.cct.config.ccts[i].position.y
      };
      for (let j = 0; j < this.dataModel.cct.data[i].equipment.cts.length; j++) {
        // config position of cooling tower
        if (j == 0) {
          // y -= 150;
        } else {
          if (j % 2 == 0) {
            positionCT.x -= 100;
            positionCT.y += 100;
          } else {
            positionCT.x += 100;
          }
        }
        this.dataNodes.push({
          group: 'nodes',
          data: {
            id: 'ct-' + this.dataModel.cct.data[i].equipment.cts[j].id,
            index: this.dataModel.cct.data[i].equipment.cts[j].index,
            name: this.dataModel.cct.data[i].equipment.cts[j].name,
            parent: 'cct-' + this.dataModel.cct.data[i].id,
            type: this.dataModel.cct.data[i].equipment.cts[j].type,
            backup: this.dataModel.cct.data[i].equipment.cts[j].backup,
            label: this.dataModel.cct.data[i].equipment.cts[j].name + '/' + this.dataModel.cct.data[i].equipment.cts[j].backup
          },
          position: {
            x: positionCT.x,
            y: positionCT.y
          },
          classes: 'show-remove'
        });
      }
    }
    // prepare data unitParent
    this.dataNodes.push(
      {
        data: {
          id: 'unitParent',
          name: '',
          type: 'unitParent'
          // position: { x: 100, y: 0 }
        },
        position: {
          x: this.dataModel.chillerUnit.config.position.x - 100,
          y: this.dataModel.chillerUnit.config.position.y - 55
        }
      }
    );
    // prepare data chiller Unit
    let positionUit = {
      x: this.dataModel.chillerUnit.config.position.x - 100,
      y: this.dataModel.chillerUnit.config.position.y
    }
    _.forEach(this.dataModel.chillerUnit.data, (unit, index) => {
      if (index == 0) {
      } else {
        positionUit.y = this.dataModel.chillerUnit.config.position.y + (120 * index);
      }
      // prepare data cdwp
      this.dataNodes.push(
        {
          group: 'nodes',
          data: {
            id: 'cdwp-' + unit.equipment.cdwp.id,
            index: unit.equipment.cdwp.index,
            name: unit.equipment.cdwp.name,
            parent: 'unitParent',
            type: unit.equipment.cdwp.type,
            backup: unit.equipment.cdwp.backup,
            label: unit.equipment.cdwp.name + '/' + unit.equipment.cdwp.backup
          },
          position: {
            x: positionUit.x + 300,
            y: positionUit.y
          },
          classes: 'show-remove'
        }
      );
      // prepare data chiller
      this.dataNodes.push(
        {
          data: {
            id: 'chiller-' + unit.equipment.chiller.id,
            index: unit.equipment.chiller.index,
            name: unit.equipment.chiller.name,
            parent: 'unitParent',
            type: unit.equipment.chiller.type,
          },
          position: {
            x: positionUit.x + 500,
            y: positionUit.y
          },
          classes: 'show-remove'
        }
      );
      // prepare data chwp
      this.dataNodes.push(
        {
          data: {
            id: 'chwp-' + unit.equipment.chwp.id,
            index: unit.equipment.chwp.index,
            name: unit.equipment.chwp.name,
            parent: 'unitParent',
            type: unit.equipment.chwp.type,
            backup: unit.equipment.chwp.backup,
            label: unit.equipment.chwp.name + '/' + unit.equipment.chwp.backup
          },
          position: {
            x: positionUit.x + 700,
            y: positionUit.y
          },
          classes: 'show-remove'
        }
      );
      // prepare data free node
      this.dataNodes.push(
        {
          data: {
            id: 'none' + (index + 1),
            name: '',
            parent: 'unitParent',
            type: 'free',
          },
          position: {
            x: positionUit.x + 900,
            y: positionUit.y
          }
        }
      );
      // prepare data for edge
      this.dataEdges.push(
        {
          data: {
            id: 'hotEdge' + (index + 1),
            source: 'cdwp-' + unit.equipment.cdwp.id,
            target: 'chiller-' + unit.equipment.chiller.id,
            type: 'hot-edge'
          }
        }
      );
      this.dataEdges.push(
        {
          data: {
            id: 'coldEdge' + (index + 1),
            source: 'chiller-' + unit.equipment.chiller.id,
            target: 'chwp-' + unit.equipment.chwp.id,
            type: 'cold-edge'
          }
        }
      );
      this.dataEdges.push(
        {
          data: {
            id: 'freeEdge' + (index + 1),
            source: 'chwp-' + unit.equipment.chwp.id,
            target: 'none' + (index + 1),
            type: 'free-edge'
          }
        }
      );
      // prepare verticalEdge edge
      if (this.dataModel.chillerUnit.data.length > 1) {
        this.dataEdges.push(
          {
            data: {
              id: 'verticalEdge' + index,
              source: 'none1',
              target: 'none' + (this.dataModel.chillerUnit.data.length),
              type: 'free-edge'
            }
          }
        );
      }
      // prepare red-edge
      if (unit.idCCT) {
        this.dataEdges.push(
          {
            data: {
              id: 'connect-edge' + index,
              source: 'cct-' + unit.idCCT,
              target: 'cdwp-' + unit.equipment.cdwp.id,
              type: 'red-edge'
            }
          }
        );
      }
    });

    this.drawBackup();
    this.drawOutLine();
    prepareData = _.concat(this.dataNodes, this.dataEdges);
    return prepareData;
  }
  // prepare style for cytocape
  parepareStyle() {
    let prepareStyle = [
      // node
      {
        selector: 'node',
        style: {
          shape: 'ellipse',
          'background-color': 'white',
          'width': 50,
          'height': 50,
          // 'content': 'data(id)',
          'content': function (e) {
            let content;
            if (e.data('backup')) {
              content = e.data('label');
            } else {
              content = e.data('name');
            }
            return content;
          },
          'border-color': 'white',
          'border-width': 1,
          'padding': 10
        }
      },
      // edge
      {
        selector: 'edge',
        style: {
          'width': 10,
          'line-color': '#cc0000',
        }
      },

      {
        selector: '.node_other',
        style: {
          'width': 30,
          'height': 30,
          'background-width': 30,
          'background-height': 30,
        }
      },

      {
        selector: 'node[type = "ct"]',
        style: {
          'background-image': 'url("assets/img/cct.png")',
          'background-width': 50,
          'background-height': 50,
          'width': 30,
          'height': 30,
        }
      },
      {
        selector: 'node[type = "cdwp"]',
        style: {
          'background-image': 'url("assets/img/cdwp.png")',
          'background-width': 30,
          'background-height': 30,
          'width': 30,
          'height': 30,
        }
      },
      {
        selector: 'node[type = "chwp"]',
        style: {
          'background-image': 'url("assets/img/chwp.png")',
          'background-width': 30,
          'background-height': 30,
          'width': 30,
          'height': 30,
        }
      },
      {
        selector: 'node[type = "chiller"]',
        style: {
          'background-image': 'url("assets/img/chiller.png")',
          'background-width': 50,
          'background-height': 30,
          'width': 50,
          'height': 30,
        }
      },

      {
        selector: '.node_hover',
        style: {
          'background-color': 'white',
          'border-width': 4,
          'border-color': 'blue',
        }
      },
      // node parent + cct
      {
        selector: 'node[type = "cct"], node[type = "backup"]',
        style: {
          'background-color': 'white',
          'border-color': 'red',
          'shape': 'rectangle'
        }
      },
      {
        selector: '.cct-hover',
        style: {
          'border-color': 'aqua',
        }
      },
      // node-free
      {
        selector: 'node[type="free"]',
        style: {
          'width': 1,
          'height': 1,
          'visibility': 'hidden'
        }
      },

      {
        // hot-edge',
        selector: 'edge[type="hot-edge"]',
        style: {
          'line-color': '#ff8000',
        }
      },
      {
        // selector: 'blue-edge',
        selector: 'edge[type="cold-edge"], edge[type="free-edge"]',
        style: {
          'line-color': '#0055cc',
        }
      },
      {
        selector: '.edge-red, edge[type="red-edge"]',
        style: {
          'line-color': '#cc0000',
        }
      },
      {
        selector: '.node-cdwp-hover',
        style: {
          'border-color': '#cc0000',
          'background-color': '#cc0000',
        }
      },
      {
        selector: 'node[id="unitParent"]',
        style: {
          'width': 400,
          'height': 100,
        }
      }
    ]
    return prepareStyle;
  }
  reloadPlantModel() {
    this.dataNodes = [];
    this.dataEdges = [];
    // update index for equipment
    this.onDataChange();
    this.cy = cytoscape({
      container: document.getElementById('cy'),
      elements: this.prepareData(),
      style: this.parepareStyle(),
      layout: {
        name: 'preset'
      },
      'wheelSensitivity': 0.2,
      'minZoom': 0.17,
      'maxZoom': 1.75
    });
    this.iniEdgehandles();
    this.onClickOnNode();
    this.fitModel();
    this.hoverNode();
    this.blockMoveNode();
    this.initRightClickMenu();
    this.updatePosition();
  }

  // handle connect cct with cdwp
  iniEdgehandles() {
    this.cy.edgehandles({
      // toggleOffOnLeave: true,
      toggleOffOnLeave: true,
      handleColor: '#ff0000',
      // handleHitThreshold: 6,
      // handleSize: '#ff0000',
      // handleOutlineColor: '#000000',
      // handleOutlineWidth: 2, 
      // handleNodes: "node",
      handleNodes: 'node[type="cct"]',
      // handlePosition: 'left top',
      handlePosition: 'right middle',
      handleSize: 10,
      // handleSize: 2,
      edgeType: (sourceNode, targetNode) => {
        if ((sourceNode.data().type === 'cct') && (targetNode.data().type === 'cdwp')) {
          if (targetNode.connectedEdges().length == 1) {
            return 'flat';
          }
        }
        return null;
      },
      edgeParams: (sourceNode, targetNode, i) => {
        return {};
      },
      // add class after complete
      complete: (sourceNode, targetNodes, addedEntities) => {
        // this.cy.$('#' + addedEntities.data().id).addClass('edge-red');
        addedEntities.data().type = 'red-edge';
        addedEntities.addClass('edge-red show-remove');
        targetNodes.removeClass('node-cdwp-hover');
      },
      hoverover: function (targetNode) {
        targetNode.addClass('node-cdwp-hover');
        // console.log(targetNode.data().id);
        // return null;
      },
      hoverout: function (targetNode) {
        targetNode.removeClass('node-cdwp-hover');
        // console.log(targetNode.data().id);
      },
    });
    if (this.isDrawModeOn) {
      this.cy.edgehandles('drawon');
    } else {
      this.cy.edgehandles('drawoff');
    }
  }

  // handle click on node
  onClickOnNode() {
    this.cy.nodes().on("click", (e) => {
      const data = e.target.data();
      // console.log('event', e.target.data());
      if (data.id != 'unitParent') {
        this.showUpdateDialog(data);
      }
      e.stopPropagation();
    });
  }

  // drag event
  fitModel() {
    this.cy.nodes().on('drag', (e) => {
      // clearTimeout(this.dragEvent);
      clearInterval(this.dragEvent);
      this.dragEvent = setInterval(() => {
        // this.cy.fit(20);
        this.cy.center(20);
        clearInterval(this.dragEvent);
      }, 500);
    });
  }

  // update positon when an element's data changes position.
  updatePosition() {
    this.cy.nodes().on('position ', (e) => {
      let target = e.target, index = -1, idTarget,
        typeTarget = _.split(target.data().id, '-', 2)[0];
      if (typeTarget === 'cct') {
        idTarget = Number(_.split(target.data().id, '-', 2)[1]);
        index = _.findIndex(this.dataModel.cct.config.ccts, function (o) {
          return o.idCCT == idTarget;
        });
        // action update position
        this.dataModel.cct.config.ccts[index].position.x = target.position().x;
        this.dataModel.cct.config.ccts[index].position.y = target.position().y;
        // console.log('change position cct', this.dataModel.cct.config.ccts[index].position);
      } else if (target.data().id === 'unitParent') {
        let newPosition = {
          x: target.position().x - 550,
          y: target.position().y - 150
        }
        this.dataModel.chillerUnit.config.position.x = newPosition.x;
        this.dataModel.chillerUnit.config.position.y = newPosition.y;
        // console.log('change position unit', this.dataModel.chillerUnit.config.position);
      }
    });
  }
  onDataChange() {
    // add systemIndex for equipment
    let lengthCt = 0, index_Old = 0;
    // cct & ct
    _.forEach(this.dataModel.cct.data, (cct, j) => {
      cct.index = (j + 1);
      _.forEach(cct.equipment.cts, (ct, i) => {
        ct.index = (i + 1 + lengthCt);
      });
      lengthCt = lengthCt + cct.equipment.cts.length;
    });
    // cct backup
    _.forEach(this.dataModel.backup.cct.equipment, (ct, j) => {
      ct.index = (j + 1 + lengthCt);
    });
    // chiller unit
    _.forEach(this.dataModel.chillerUnit.data, (item, index) => {
      item.equipment.chiller.index = index + 1;
      item.equipment.chwp.index = (1 + index_Old);
      item.equipment.cdwp.index = (item.equipment.chwp.index + 1);
      index_Old = item.equipment.cdwp.index;
    });
    // chwp backup
    _.forEach(this.dataModel.backup.chwp.equipment, (item, index) => {
      item.index = (1 + index_Old);
      index_Old = item.index;
    });
    // cdwp backup
    _.forEach(this.dataModel.backup.cdwp.equipment, (item, index) => {
      item.index = (1 + index_Old);
      index_Old = item.index;
    });
  }

  // hove node
  hoverNode() {
    this.cy.nodes().on("mouseover", (e) => {
      this.cy.$('#' + e.target.id()).addClass('cct-hover');
    });
    this.cy.nodes().on("mouseout", (e) => {
      this.cy.$('#' + e.target.id()).removeClass('cct-hover');
    });
  }

  // block move node (ct, chiller, cdwp...)
  blockMoveNode() {
    this.cy.nodes().nonorphans()
      .on('grab', function () {
        this.ungrabify();
      })
      .on('free', function () {
        this.grabify();
      });
  }
  initRightClickMenu() {
    var options = {
      menuItems: [
        {
          id: 'add-backup-ct',
          content: 'Add Backup CT',
          tooltipText: 'remove',
          openMenuEvents: 'tap',
          image: {
            src: 'assets/img/add.svg',
            width: 12,
            height: 12,
            x: 5,
            y: 6.5
          },
          selector: 'node[id="backupParentCT"]',
          onClickFunction: (event) => {
            // let target = event.target || event.cyTarget;
            this.dataModel.backup.cct.equipment.push({
              id: 'backupCT-' + (++this.curCT),
              index: null,
              name: 'CT ' + (this.curCT),
              type: 'ct',
            });
            this.reloadPlantModel();
          },
          hasTrailingDivider: true
        },
        {
          id: 'add-backup-cdwp',
          content: 'Add Backup CDWP',
          tooltipText: 'remove',
          openMenuEvents: 'tap',
          image: {
            src: 'assets/img/add.svg',
            width: 12,
            height: 12,
            x: 5,
            y: 6.5
          },
          selector: 'node[id="backupParentCDWP"]',
          onClickFunction: (event) => {
            let idCreate = ++this.curCDWP;
            this.dataModel.backup.cdwp.equipment.push({
              id: 'backupCDWP-' + idCreate,
              index: null,
              name: 'CDWP ' + idCreate,
              type: 'cdwp'
            });
            this.reloadPlantModel();
          },
          hasTrailingDivider: true
        },
        {
          id: 'add-backup-chwp',
          content: 'Add Backup CHWP',
          tooltipText: 'remove',
          openMenuEvents: 'tap',
          image: {
            src: 'assets/img/add.svg',
            width: 12,
            height: 12,
            x: 5,
            y: 6.5
          },
          selector: 'node[id="backupParentCHWP"]',
          onClickFunction: (event) => {
            let idCreate = ++this.curCHWP;
            this.dataModel.backup.chwp.equipment.push({
              id: 'backupCHWP-' + idCreate,
              index: null,
              name: 'CHWP ' + idCreate,
              type: 'chwp'
            });
            this.reloadPlantModel();
          },
          hasTrailingDivider: true
        },
        {
          id: 'remove',
          content: 'Remove',
          tooltipText: 'remove',
          openMenuEvents: 'tap',
          image: {
            src: 'assets/img/remove.svg',
            width: 12,
            height: 12,
            x: 5,
            y: 6.5
          },
          selector: 'node.show-remove, edge[type = "red-edge"]',
          onClickFunction: (event) => {
            let target = event.target || event.cyTarget, index = -1,
              idTarget = Number(_.split(target.data().id, '-', 2)[1]);
            // if (target.data().id == 'backupParentCT' || target.data().parent == 'backupParentCT' ||
            //   target.data().id == 'backupParentCDWP' || target.data().parent == 'backupParentCDWP' ||
            //   target.data().id == 'backupParentCHWP' || target.data().parent == 'backupParentCHWP') {
            //   return;
            // }
            // if (target.data().id == 'backupParentCT' ||
            //   target.data().id == 'backupParentCDWP' ||
            //   target.data().id == 'backupParentCHWP') {
            //   return;
            // }

            let foundID = target.data().id;
            let foundIndex = null;
            if (target.data().parent == 'backupParentCT') {
              this.dataModel.backup.cct.equipment.forEach((item, index) => {
                if (item.id == foundID) {
                  foundIndex = index;
                  return true;
                }
              });
              this.dataModel.backup.cct.equipment.splice(foundIndex, 1);
              this.reloadPlantModel();
            } else if (target.data().parent == 'backupParentCDWP') {
              this.dataModel.backup.cdwp.equipment.forEach((item, index) => {
                if (item.id == foundID) {
                  foundIndex = index;
                  return true;
                }
              });
              this.dataModel.backup.cdwp.equipment.splice(foundIndex, 1);
              this.reloadPlantModel();
            } else if (target.data().parent == 'backupParentCHWP') {
              this.dataModel.backup.chwp.equipment.forEach((item, index) => {
                if (item.id == foundID) {
                  foundIndex = index;
                  return true;
                }
              });
              this.dataModel.backup.chwp.equipment.splice(foundIndex, 1);
              this.reloadPlantModel();
            } else if (target.data().type === 'cct') {
              if (this.dataModel.cct.data.length > 1) {
                index = _.findIndex(this.dataModel.cct.data, function (o) {
                  return o.id == idTarget;
                });
                // find index of idCCT remove on chillerUnit
                const indexUnit = _.findIndex(this.dataModel.chillerUnit.data, function (o) {
                  return o.idCCT == idTarget;
                });
                // update idCCT = null
                if (indexUnit >= 0) {
                  this.dataModel.chillerUnit.data[indexUnit].idCCT = null;
                }
                this.dataModel.cct.data.splice(index, 1);
                this.reloadPlantModel();
              }
            } else if (target.data().type === 'ct') {
              _.forEach(this.dataModel.cct.data, (cct) => {
                if (cct.equipment.cts.length > 1) {
                  index = _.findIndex(cct.equipment.cts, function (o) {
                    return o.id == idTarget
                  });
                  cct.equipment.cts.splice(index, 1);
                  this.reloadPlantModel();
                } else {
                  return true;
                }
              })
            } else if (target.data().parent === 'unitParent') {
              if (this.dataModel.chillerUnit.data.length > 1) {
                if (target.data().type === 'cdwp') {
                  index = _.findIndex(this.dataModel.chillerUnit.data, function (o) {
                    return o.equipment.cdwp.id == idTarget;
                  });
                } else if (target.data().type === 'chiller') {
                  index = _.findIndex(this.dataModel.chillerUnit.data, function (o) {
                    return o.equipment.chiller.id == idTarget
                  });
                } else if (target.data().type === 'chwp') {
                  index = _.findIndex(this.dataModel.chillerUnit.data, function (o) {
                    return o.equipment.chwp.id == idTarget
                  });
                }
                this.dataModel.chillerUnit.data.splice(index, 1);
                this.reloadPlantModel();
              }
            } else if (target.data().type == "red-edge") {
              //remove red edge
              target.remove();
            }
          },
          hasTrailingDivider: true
        },
        {
          id: 'add-node',
          content: 'Add CCT',
          tooltipText: 'add cct',
          openMenuEvents: 'cxttap',
          image: {
            src: 'assets/img/add.svg',
            width: 12,
            height: 12,
            x: 5,
            y: 6.5
          },
          coreAsWell: true,
          onClickFunction: (event) => {
            this.dataModel.cct.data.push(
              {
                id: ++this.curCT,
                index: null,
                name: 'CCT ' + this.curCT,
                equipment: {
                  cts: [
                    {
                      id: this.curCT,
                      index: null,
                      name: 'CT ' + this.curCT,
                      type: 'ct',
                      backup: null
                    }
                  ]
                }
              }
            )
            this.dataModel.cct.config.ccts.push(
              {
                idCCT: this.curCT,
                position: {
                  x: event.position.x,
                  y: event.position.y
                }
              }
            );
            this.reloadPlantModel();
          }
        },
        {
          id: 'add-node',
          content: 'Add Chiller Unit',
          tooltipText: 'add chiller unit',
          openMenuEvents: 'cxttap',
          image: {
            src: 'assets/img/add.svg',
            width: 12,
            height: 12,
            x: 5,
            y: 6.5
          },
          coreAsWell: true,
          onClickFunction: (event) => {
            let idCreate = Math.max(++this.curCDWP, ++this.curCHWP);
            this.curCDWP = this.curCHWP = idCreate;
            this.dataModel.chillerUnit.data.push(
              {
                id: idCreate,
                equipment: {
                  cdwp: {
                    id: idCreate,
                    index: null,
                    name: 'CDWP ' + idCreate,
                    type: 'cdwp',
                    backup: null
                  },
                  chiller: {
                    id: idCreate,
                    index: null,
                    name: 'Chiller ' + idCreate,
                    type: 'chiller'
                  },
                  chwp: {
                    id: idCreate,
                    index: null,
                    name: 'CHWP ' + idCreate,
                    type: 'chwp',
                    backup: null
                  }
                },
                idCCT: null
              }
            )
            this.reloadPlantModel();
          }
        },
        {
          id: 'remove-all',
          content: 'Remove All',
          tooltipText: 'Remove All',
          image: { src: "assets/img/remove.svg", width: 12, height: 12, x: 6, y: 4 },
          selector: 'node[id="unitParent"]',
          // coreAsWell: true,
          hasTrailingDivider: true,
          openMenuEvents: 'cxttap',
          onClickFunction: (event) => {
            let target = event.target || event.cyTarget;
            let numOfRemove = this.dataModel.chillerUnit.data.length - 1;
            if (target.data().type === 'unitParent' && numOfRemove > 0) {
              this.dataModel.chillerUnit.data.splice(1, numOfRemove);
              this.reloadPlantModel();
            }
          }
        },
      ],
      // css classes that menu items will have
      menuItemClasses: [
        // add class names to this list
      ],
      // css classes that context menu will have
      contextMenuClasses: ['setPosContextMenu']
    };
    this.cy.contextMenus(options);
  }

  // run after view show
  ngAfterViewInit() {
    if (!document.getElementById('cy')) {
      setTimeout(() => {
        // console.log('zz', document.getElementById('cy'));
        this.reloadPlantModel();
      }, 100);
    } else {
      this.reloadPlantModel();
    }
    // event
    // this.cy.on("context-menus", (e) => {
    //   // console.log(e);
    // });
    // this.cy.edges().on("cxttap", (e) => {
    // });

    // // edge
    // this.cy.edges().on("click", (e) => {
    //   // console.log(e);
    // });
    // this.cy.edges().on("cxttap", (e) => {
    //   // console.log(e);
    // });
    // this.cy.edges().on("mouseover", (e) => {
    //   // console.log(e);
    // });
  }
  // show dialog
  showUpdateDialog(data) {
    let configDialog: any = {
      width: '500px',
      disableClose: true,
      data: data,
    };
    // let dialogRef: any;
    let dialogRef = null;

    if (data.type == 'ct') {
      if (data.parent == "backupParentCT") {
        let listBackup = [];
        this.dataModel.cct.data.forEach(item => {
          listBackup = _.concat(listBackup, item.equipment.cts.filter(item2 => {
            return item2.backup == data.name
          }).map(item => {
            return item.name;
          }));
        });
        configDialog.data['list_backup'] = listBackup;
        dialogRef = this.dialog.open(BackupCCTDialog, configDialog);
      } else {
        configDialog.data['list_backup'] = this.dataModel.backup.cct.equipment;
        dialogRef = this.dialog.open(UpdateCoolingDialog, configDialog);
      }
    } else if (data.type == 'chiller') {
      dialogRef = this.dialog.open(UpdateChillerDialog, configDialog);
    }
    else if (data.type == 'cdwp') {
      if (data.parent == "backupParentCDWP") {
        configDialog.data['list_backup'] = this.dataModel.chillerUnit.data.filter(item => {
          return item.equipment.cdwp.backup != null && item.equipment.cdwp.backup == data.name;
        }).map(item => {
          return item.equipment.cdwp.name;
        });
        dialogRef = this.dialog.open(BackupCDWPDialog, configDialog);
      } else {
        configDialog.data['list_backup'] = this.dataModel.backup.cdwp.equipment;
        dialogRef = this.dialog.open(UpdateCDWPDialog, configDialog);
      }
    } else if (data.type == 'chwp') {
      if (data.parent == "backupParentCHWP") {
        configDialog.data['list_backup'] = this.dataModel.chillerUnit.data.filter(item => {
          return item.equipment.chwp.backup != null && item.equipment.chwp.backup == data.name;
        }).map(item => {
          return item.equipment.chwp.name;
        });
        dialogRef = this.dialog.open(BackupCHWPDialog, configDialog);
      } else {
        configDialog.data['list_backup'] = this.dataModel.backup.chwp.equipment;
        dialogRef = this.dialog.open(UpdateCHWPDialog, configDialog);
      }
    }
    else if (data.type == 'cct') {
      // configDialog.data.numOfNewCCT = 1;
      // let foundCCT=this.dataModel.cct.data.filter(item => {
      //   return item.id == data.id.split('-')[1];
      // })[0];
      configDialog.data.numOfNewCCT = this.dataModel.cct.data.filter(item => {
        return item.id == data.id.split('-')[1];
      })[0].equipment.cts.length;
      dialogRef = this.dialog.open(AddCctDialog, configDialog);
    }

    if (dialogRef != null) {
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // this.updateData = {
          //   // nameCooling: result.nameCooling,
          // };
          let found = null;
          switch (result.type) {
            case 'ct':
              // found = this.dataModel.cct.data[0].equipment.cts.filter(item => {
              //   return item.name == result.name;
              // });
              // found[0].backup = result.backup;

              this.dataModel.cct.data.some(item => {
                found = item.equipment.cts.filter(item => {
                  return item.name == result.name;
                });
                return found[0] != null;
              });
              found[0].backup = result.backup;
              break;
            case 'cdwp':
              found = this.dataModel.chillerUnit.data.filter(item => {
                return item.equipment.cdwp.name == result.name;
              });
              found[0].equipment.cdwp.backup = result.backup;
              break;
            case 'chwp':
              found = this.dataModel.chillerUnit.data.filter(item => {
                return item.equipment.chwp.name == result.name;
              });
              found[0].equipment.chwp.backup = result.backup;
              break;
          }

          this.createCoolingTower(result);
        }
      });
    }
  }

  // create Cooling tower
  // createCoolingTower(item) {
  createCoolingTower(data) {
    // let maxIdCTCurent = 0;
    // _.forEach(this.dataModel.cct.data, (cct) => {
    //   let maxID = _.maxBy(cct.equipment.cts, (o) => {
    //     return o.id;
    //   }).id;
    //   if (maxID > maxIdCTCurent) {
    //     maxIdCTCurent = maxID;
    //   }
    // });
    // const indexCCT = _.findIndex(this.dataModel.cct.data, (o) => { return o.name == item.name });
    // for (var i = 0; i < item.numOfNewCCT; i++) {
    //   this.dataModel.cct.data[indexCCT].equipment.cts.push(
    //     {
    //       id: (maxIdCTCurent + 1 + i),
    //       index: null,
    //       name: 'CT ' + (maxIdCTCurent + 1 + i),
    //       type: 'ct',
    //       backup: null
    //     }
    //   );
    // }
    // this.reloadPlantModel();

    let curCTIndex = 0;
    let curCTs = this.dataModel.cct.data.filter((item, index) => {
      if (item.id == data.id.split('-')[1]) {
        curCTIndex = index;
        return true;
      }
    })[0].equipment.cts;
    if (curCTs.length > data.numOfNewCCT) {
      let diff = curCTs.length - data.numOfNewCCT;
      this.dataModel.cct.data[curCTIndex].equipment.cts.splice(data.numOfNewCCT, diff);
    } else if (curCTs.length < data.numOfNewCCT) {
      let add = data.numOfNewCCT - curCTs.length;
      for (let i = 0; i < add; i++) {
        this.dataModel.cct.data[curCTIndex].equipment.cts.push({
          id: ++this.curCT,
          index: null,
          name: 'CT ' + this.curCT,
          type: 'ct',
          backup: null
        });
      }
    }
    this.reloadPlantModel();
  }

  drawOutLine() {
    let arrCDWP = this.dataNodes.filter(item => {//find free node
      return item.data.type == "free";
    });
    let firstItem = arrCDWP[0];
    let lastItem = arrCDWP.splice(-1)[0];
    let pos = {
      x: firstItem.position.x,
      y: firstItem.position.y + (lastItem.position.y - firstItem.position.y) / 2,
    }
    let distanceOutLine = 150;

    if (this.outLine['node'] != undefined) {
      this.outLine['node'][0].position.x = pos.x;
      this.outLine['node'][0].position.y = pos.y;
      this.outLine['node'][1].position.x = pos.x + distanceOutLine;
      this.outLine['node'][1].position.y = pos.y;
    } else {//initial outline
      this.outLine['node'] = [
        {
          data: {
            id: 'noneSource',
            name: '',
            parent: 'unitParent',
            type: 'free',
          },
          position: {
            x: pos.x,
            y: pos.y
          },
        },
        {
          data: {
            id: 'noneDes',
            name: '',
            parent: 'unitParent',
            type: 'free',
          },
          position: {
            x: pos.x + distanceOutLine,
            y: pos.y
          },
        }
      ];
      this.outLine['edge'] = {
        data: {
          id: 'coldEdgeOutline',
          source: 'noneSource',
          target: 'noneDes',
          type: 'cold-edge'
        }
      };
    }

    //add outline
    this.dataNodes.push(this.outLine['node'][0]);
    this.dataNodes.push(this.outLine['node'][1]);
    this.dataNodes.push(this.outLine['edge']);
  }
  drawBackup() {
    const lengthUnit = this.dataModel.chillerUnit.data.length;
    this.dataNodes.push({
      data: {
        id: 'backupParentCT',
        name: 'Backup for CT',
        type: 'backup'
      },
      locked: true,
      position: {
        x: this.dataModel.chillerUnit.config.position.x + (-150),
        y: this.dataModel.chillerUnit.config.position.y + 200 + (120 * lengthUnit),
      },
    });

    let positionbackUpCT = {
      x: this.dataModel.chillerUnit.config.position.x + (-150),
      y: this.dataModel.chillerUnit.config.position.y + 200 + (120 * lengthUnit)
    };

    for (let j = 0; j < this.dataModel.backup.cct.equipment.length; j++) {
      // config position of cooling tower
      if (j == 0) {
        // y -= 150;
      } else {
        if (j % 2 == 0) {
          positionbackUpCT.x -= 100;
          positionbackUpCT.y += 100;
        } else {
          positionbackUpCT.x += 100;
        }
      }
      this.dataNodes.push({
        group: 'nodes',
        data: {
          id: 'ct-' + this.dataModel.backup.cct.equipment[j].id,
          index: this.dataModel.backup.cct.equipment[j].index,
          name: this.dataModel.backup.cct.equipment[j].name,
          parent: 'backupParentCT',
          type: this.dataModel.backup.cct.equipment[j].type
        },
        position: {
          x: positionbackUpCT.x,
          y: positionbackUpCT.y
        },
        classes: 'show-remove'
      });
    }

    // prepare node backup CDWP
    this.dataNodes.push({
      data: {
        id: 'backupParentCDWP',
        name: 'Backup for CDWP',
        type: 'backup'
      },
      locked: true,
      position: {
        x: this.dataModel.chillerUnit.config.position.x + (300),
        y: this.dataModel.chillerUnit.config.position.y + 200 + (120 * lengthUnit),
      },
    });
    let positionbackUpCDWP = {
      x: this.dataModel.chillerUnit.config.position.x + (300),
      y: this.dataModel.chillerUnit.config.position.y + 200 + (120 * lengthUnit)
    };

    for (let j = 0; j < this.dataModel.backup.cdwp.equipment.length; j++) {
      // config position of cooling tower
      if (j == 0) {
        // y -= 150;
      } else {
        if (j % 2 == 0) {
          positionbackUpCDWP.x -= 100;
          positionbackUpCDWP.y += 100;
        } else {
          positionbackUpCDWP.x += 100;
        }
      }
      this.dataNodes.push({
        group: 'nodes',
        data: {
          id: 'cdwp-' + this.dataModel.backup.cdwp.equipment[j].id,
          index: this.dataModel.backup.cdwp.equipment[j].index,
          name: this.dataModel.backup.cdwp.equipment[j].name,
          parent: 'backupParentCDWP',
          type: this.dataModel.backup.cdwp.equipment[j].type
        },
        position: {
          x: positionbackUpCDWP.x,
          y: positionbackUpCDWP.y
        },
        classes: 'show-remove'
      });
    }

    // prepare node backup CHWP
    this.dataNodes.push({
      group: 'nodes',
      data: {
        id: 'backupParentCHWP',
        name: 'Backup for CHWP',
        type: 'backup'
      },
      locked: true,
      position: {
        x: this.dataModel.chillerUnit.config.position.x + (710),
        y: this.dataModel.chillerUnit.config.position.y + 200 + (120 * lengthUnit),
      },
    });
    let positionbackUpCHWP = {
      x: this.dataModel.chillerUnit.config.position.x + (710),
      y: this.dataModel.chillerUnit.config.position.y + 200 + (120 * lengthUnit)
    };

    for (let j = 0; j < this.dataModel.backup.chwp.equipment.length; j++) {
      // config position of cooling tower
      if (j == 0) {
        // y -= 150;
      } else {
        if (j % 2 == 0) {
          positionbackUpCHWP.x -= 100;
          positionbackUpCHWP.y += 100;
        } else {
          positionbackUpCHWP.x += 100;
        }
      }
      this.dataNodes.push({
        group: 'nodes',
        data: {
          id: 'chwp-' + this.dataModel.backup.chwp.equipment[j].id,
          index: this.dataModel.backup.chwp.equipment[j].index,
          name: this.dataModel.backup.chwp.equipment[j].name,
          parent: 'backupParentCHWP',
          type: this.dataModel.backup.chwp.equipment[j].type
        },
        position: {
          x: positionbackUpCHWP.x,
          y: positionbackUpCHWP.y
        },
        classes: 'show-remove'
      });
    }
  }


  //view
  drawModel() {
    this.isDrawModeOn = !this.isDrawModeOn;
    if (this.isDrawModeOn) {
      this.cy.edgehandles('drawon');
      this.statusDrawModel = 'On'
    } else {
      this.cy.edgehandles('drawoff');
      this.statusDrawModel = 'Off'
    }
  }
  save() {
    this.isDisabledExport = false;
  }
  export() {
    this._UtilitiesService.showConfirmDialog('Do you want export data?',
      (result) => {
        if (result) {
          this.isDisabledExport = true;
        }
      });
  }
  reload() {
    this.dataModel = _.cloneDeep(this.tempDataModel);
    this.reloadPlantModel();
  }
}

// component dialog update
@Component({
  selector: 'update-chiller-dialog',
  templateUrl: 'update-chiller-dialog.html',
  styleUrls: ['./plant-model.component.scss']
})
export class UpdateChillerDialog implements OnInit {
  dataOld: any = {};
  constructor(
    public dialogRef: MatDialogRef<UpdateChillerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    // this.data = {
    //   id: this.data.id,
    //   index: this.data.index,
    //   name: this.data.name,
    //   type: '0',
    //   capacityChiller: '1',
    //   enteringCHTChiller: '12.2',
    //   leavingCHTChiller: '6.7',
    //   enteringCWTChiller: '29.4',
    //   leavingCWTChiller: '35.5',
    //   inputPowerChiller: '1',
    //   loadRatioChiller: '100',
    //   enteringCDWChiller: '29'
    // };
    this.data = {
      id: this.data.id,
      index: this.data.index,
      name: this.data.name,
      type: '0',
      coolingCapacity: 22,
      inputPower: 1,
      enteringChDT: 12.2,
      enteringCoDT: 12.2,
      leavingChWT: 6.7,
      leavingCoWT: 34.5,
    };
    this.dataOld = _.cloneDeep(this.data);
  }

  // handle disable button 'save'
  compareData() {
    if (_.isEqual(this.data, this.dataOld)) {
      return true;
    }
    return false;
  }
  // convertName(name: string) {
  //   return 'CH-' + name.split(' ')[1];
  // }
}

@Component({
  selector: 'update-cooling-dialog',
  templateUrl: 'update-cooling-dialog.html',
  styleUrls: ['./plant-model.component.scss']
})
export class UpdateCoolingDialog implements OnInit {
  dataOld: any = {};
  backups: any = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateCoolingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.backups = this.data.list_backup.map(item => {
      return {
        id: item.id,
        name: item.name,
      }
    });
    // this.backups.unshift({
    //   // id: 0,
    //   name: null,
    // });
    this.data = {
      id: this.data.id,
      index: this.data.index,
      name: this.data.name,
      waterFlow: 3.402,
      outdoorTemperature: 26.7,
      airVolume: 1957.106,
      maxAir: 100,
      minAir: 50,
      ratedFrequency: 50,
      ratedInput: 11,
      type: this.data.type,
      defaultValue: 50,
      backup: this.data.backup
    }

    this.dataOld = _.cloneDeep(this.data);
  }

  //view
  compareData() {
    if (_.isEqual(this.data, this.dataOld)) {
      return true;
    }
    return false;
  }
}

@Component({
  selector: 'update-cdwp-dialog',
  templateUrl: 'update-cdwp-dialog.html',
  styleUrls: ['./plant-model.component.scss']
})
export class UpdateCDWPDialog implements OnInit {
  dataOld: any = {};
  backups = null;

  constructor(
    public dialogRef: MatDialogRef<UpdateCDWPDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.backups = this.data.list_backup.map(item => {
      return {
        id: item.id,
        name: item.name,
      }
    });
    // this.backups.unshift({
    //   // id: 0,
    //   name: null,
    // });

    this.data = {
      id: this.data.id,
      index: this.data.index,
      name: this.data.name,
      flowRateCDWP: '1',
      maxFlowCDWP: '12.2',
      minFlowCDWP: '6.7',
      type: this.data.type,
      defaultValue: 50,
      backup: this.data.backup
    };
    this.dataOld = _.cloneDeep(this.data);
  }

  // handle disable button 'save'
  compareData() {
    if (_.isEqual(this.data, this.dataOld)) {
      return true;
    }
    return false;
  }
}

@Component({
  selector: 'update-chwp-dialog',
  templateUrl: 'update-chwp-dialog.html',
  styleUrls: ['./plant-model.component.scss']
})
export class UpdateCHWPDialog implements OnInit {
  dataOld: any = {};
  backups = null;

  constructor(
    public dialogRef: MatDialogRef<UpdateCHWPDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.backups = this.data.list_backup.map(item => {
      return {
        id: item.id,
        name: item.name,
      }
    });
    // this.backups.unshift({
    //   // id: 0,
    //   name: null,
    // });

    this.data = {
      id: this.data.id,
      index: this.data.index,
      name: this.data.name,
      flowRateCHWP: '1',
      maxFlowCHWP: '12.2',
      minFlowCHWP: '6.7',
      type: this.data.type,
      backup: this.data.backup
    };
    this.dataOld = _.cloneDeep(this.data);
  }

  // handle disable button 'save'
  compareData() {
    if (_.isEqual(this.data, this.dataOld)) {
      return true;
    }
    return false;
  }
}

// component dialog add
@Component({
  selector: 'add-cct-dialog',
  templateUrl: 'add-cct-dialog.html',
  styleUrls: ['./plant-model.component.scss']
})
export class AddCctDialog {

  constructor(
    public dialogRef: MatDialogRef<AddCctDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}

@Component({
  selector: 'backup-cct-dialog',
  templateUrl: 'backup-cct-dialog.html',
  styleUrls: ['./plant-model.component.scss']
})
export class BackupCCTDialog implements OnInit {
  dataOld: any = {};
  constructor(
    public dialogRef: MatDialogRef<UpdateCHWPDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.data = {
      id: this.data.id,
      index: this.data.index,
      name: this.data.name,
      integratedCTList: [1, 2],
      inputPower: 1,
      waterFlowRate: '1',
      outdoorWetBuilb: '26.7',
      airVolume: 1,
      maxAir: 100,
      minAir: 50,
      ratedFrequency: 50,
      defaultValue: 50,
      relatedCTS: this.data.list_backup
    };
    this.dataOld = _.cloneDeep(this.data);
  }

  //view
  compareData() {
    if (_.isEqual(this.data, this.dataOld)) {
      return true;
    }
    return false;
  }
}

@Component({
  selector: 'backup-cdwp-dialog',
  templateUrl: 'backup-cdwp-dialog.html',
  styleUrls: ['./plant-model.component.scss']
})
export class BackupCDWPDialog implements OnInit {
  dataOld: any = {};
  constructor(
    public dialogRef: MatDialogRef<UpdateCHWPDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.data = {
      id: this.data.id,
      index: this.data.index,
      name: this.data.name,
      flowRateCHWP: '1',
      maxFlowCHWP: '12.2',
      minFlowCHWP: '6.7',
      backupCHWP: '3',
      defaultValue: 50,
      relatedPump: this.data.list_backup
    };
    this.dataOld = _.cloneDeep(this.data);
  }

  // handle disable button 'save'
  compareData() {
    if (_.isEqual(this.data, this.dataOld)) {
      return true;
    }
    return false;
  }
}

@Component({
  selector: 'backup-chwp-dialog',
  templateUrl: 'backup-chwp-dialog.html',
  styleUrls: ['./plant-model.component.scss']
})
export class BackupCHWPDialog implements OnInit {
  dataOld: any = {};
  constructor(
    public dialogRef: MatDialogRef<UpdateCHWPDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.data = {
      id: this.data.id,
      index: this.data.index,
      name: this.data.name,
      flowRateCHWP: '1',
      maxFlowCHWP: '12.2',
      minFlowCHWP: '6.7',
      backupCHWP: '3',
      relatedPump: this.data.list_backup
    };
    this.dataOld = _.cloneDeep(this.data);
  }

  // handle disable button 'save'
  compareData() {
    if (_.isEqual(this.data, this.dataOld)) {
      return true;
    }
    return false;
  }
}