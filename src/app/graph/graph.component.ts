import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

	chart = [];
	height:any;
	coefficient:any;
	bounces:any;
	constructor (private _data: DataService) {}

	ngOnInit(): void {
		//
	}

  	onSubmit() {
    // console.log('submit');
    // alert(this.coefficient);
    	if(this.height && this.coefficient){
            this._data.getPoints(this.height,this.coefficient)
            .subscribe(res => {
				console.log(res);
				this.bounces = res['bounces'];
              this.chart = new Chart('canvas', {
                type: 'line',
                data: {
                  labels: res['x'],
                  datasets: [{
                    data: res['y'],
                  }]
                },
                options: {
                  legend: {
                    display: false
                  },
                  scales: {
                    xAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Time',
						}
                    }],
                    yAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Height',
						}
                    }],
                  }
                }
              })
            });
    	}
  	}
}
