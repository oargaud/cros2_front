import { Component, OnInit } from '@angular/core';
import { MqttService } from 'ngx-mqtt';
import { ControlService } from './control.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {



  controls = [];

  constructor(
    private controlService: ControlService,
    private _mqttService: MqttService
  ) {}

  ngOnInit(): void {
    this.getControls();
    this.subscribe();
  }


  getControls(){
    this.controlService.getControls().subscribe(
      (response)=>{
        this.controls = response;
      }
    );
  }

  subscribe(){
    this._mqttService.observe("test").subscribe(
      ()=>{
        this.getControls();
      }
    )
  }

}
