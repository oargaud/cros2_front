import { Component, Input, OnInit } from '@angular/core';
import { MqttService } from 'ngx-mqtt';
import { Control } from 'src/app/model/Control';

@Component({
  selector: 'app-control-card',
  templateUrl: './control-card.component.html',
  styleUrls: ['./control-card.component.scss']
})
export class ControlCardComponent implements OnInit {

  @Input() control: Control;

  couleur:string = "rgba(0, 255, 250, 0.5)" ;

  constructor(private _mqttService: MqttService) { }

  ngOnInit(): void {
    this.couleur = this.control.state ? "rgba(0, 128, 128, .5)":"rgba(255, 0, 128, .5)";
  }


  toggleState(){
    this.control.state = !this.control.state;
    // this.ngOnInit();
    this._mqttService.unsafePublish("test", JSON.stringify(this.control), { qos: 1, retain: true });
  }



}

