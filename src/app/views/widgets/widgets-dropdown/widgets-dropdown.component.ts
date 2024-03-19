import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { getStyle } from '@coreui/utils';
import { ChartjsComponent } from '@coreui/angular-chartjs';

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsDropdownComponent implements OnInit, AfterContentInit {

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}
userId:any=''
  data: any[] = [];
  options: any[] = [];
 labels:any[]=[]
 datasets:any[]=[]
  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        min: 30,
        max: 89,
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };

  ngOnInit(): void {
    this.setData();
		this.userId = localStorage.getItem('userId')
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();

  }

  setData() {
		this.userId = localStorage.getItem('userId')
		if(this.userId == 'b2b'){
			this.labels = [
				"2020 - Q2",
		"2021 - Q1",
		"2021 - Q2",
		"2022 - Q1",
		"2022 - Q2",
		"2023 - Q1",
		
			];
			this.datasets = [
				[{
					label: 'My First dataset',
					backgroundColor: 'transparent',
					borderColor: 'rgba(255,255,255,.55)',
					pointBackgroundColor: getStyle('--cui-primary'),
					pointHoverBorderColor: getStyle('--cui-primary'),
					data: [55, 53, 57, 44, 52, 49]
				}], [{
					label: 'My Second dataset',
					backgroundColor: 'transparent',
					borderColor: 'rgba(255,255,255,.55)',
					pointBackgroundColor: getStyle('--cui-info'),
					pointHoverBorderColor: getStyle('--cui-info'),
					data: [11, 13, 13, 7, 10,8]
				}], [{
					label: 'My Third dataset',
					backgroundColor: 'rgba(255,255,255,.2)',
					borderColor: 'rgba(255,255,255,.55)',
					pointBackgroundColor: getStyle('--cui-warning'),
					pointHoverBorderColor: getStyle('--cui-warning'),
					data: [97, 153, 147, 87, 92, 134],
					fill: true
				}], [{
					label: 'My Fourth dataset',
					backgroundColor: 'rgba(255,255,255,.2)',
					borderColor: 'rgba(255,255,255,.55)',
					data: [23, 17, 18, 14, 14, 13],
					barPercentage: 0.7
				}]
			];
		}else{
			this.labels = [
				"2015",
				"2016",
				"2017",
				"2018",
				"2019",
		"2020",
		"2021"
			];
			this.datasets = [
				[{
					label: 'My First dataset',
					backgroundColor: 'transparent',
					borderColor: 'rgba(255,255,255,.55)',
					pointBackgroundColor: getStyle('--cui-primary'),
					pointHoverBorderColor: getStyle('--cui-primary'),
					data: [84,87,86,94,93,95,98]
				}], [{
					label: 'My Second dataset',
					backgroundColor: 'transparent',
					borderColor: 'rgba(255,255,255,.55)',
					pointBackgroundColor: getStyle('--cui-info'),
					pointHoverBorderColor: getStyle('--cui-info'),
					data: [3.39, 3.50, 3.45, 3.79, 3.74, 3.83, 3.93]
				}], [{
					label: 'My Third dataset',
					backgroundColor: 'rgba(255,255,255,.2)',
					borderColor: 'rgba(255,255,255,.55)',
					pointBackgroundColor: getStyle('--cui-warning'),
					pointHoverBorderColor: getStyle('--cui-warning'),
					data: [3.39, 3.50, 3.45, 3.79, 3.74, 3.83, 3.93],
					fill: true
				}], [{
					label: 'My Fourth dataset',
					backgroundColor: 'rgba(255,255,255,.2)',
					borderColor: 'rgba(255,255,255,.55)',
					data: [7.8, 10.4, 9.89, 9.52, 1.93, 0.818, 1.97],
					barPercentage: 0.7
				}]
			];
		}
	


    for (let idx = 0; idx < 4; idx++) {
      this.data[idx] = {
        labels: idx < 3 ? this.labels.slice(0, 7) : this.labels,
        datasets: this.datasets[idx]
      };
    }
    this.setOptions();
  }

  setOptions() {
    for (let idx = 0; idx < 4; idx++) {
      const options = JSON.parse(JSON.stringify(this.optionsDefault));
      switch (idx) {
        case 0: {
          this.options.push(options);
          break;
        }
        case 1: {
          options.scales.y.min = -9;
          options.scales.y.max = 39;
          this.options.push(options);
          break;
        }
        case 2: {
          options.scales.x = { display: false };
          options.scales.y = { display: false };
          options.elements.line.borderWidth = 2;
          options.elements.point.radius = 0;
          this.options.push(options);
          break;
        }
        case 3: {
          options.scales.x.grid = { display: false, drawTicks: false };
          options.scales.x.grid = { display: false, drawTicks: false, drawBorder: false };
          options.scales.y.min = undefined;
          options.scales.y.max = undefined;
          options.elements = {};
          this.options.push(options);
          break;
        }
      }
    }
  }
}

@Component({
  selector: 'app-chart-sample',
  template: '<c-chart type="line" [data]="data" [options]="options" width="300" #chart></c-chart>'
})
export class ChartSample implements AfterViewInit {

  constructor() {}

  @ViewChild('chart') chartComponent!: ChartjsComponent;

  colors = {
    label: 'My dataset',
    backgroundColor: 'rgba(77,189,116,.2)',
    borderColor: '#4dbd74',
    pointHoverBackgroundColor: '#fff'
  };

  labels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  data = {
    labels: this.labels,
    datasets: [{
      data: [65, 59, 84, 84, 51, 55, 40],
      ...this.colors,
      fill: { value: 65 }
    }]
  };

  options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      const data = () => {
        return {
          ...this.data,
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            ...this.data.datasets[0],
            data: [42, 88, 42, 66, 77],
            fill: { value: 55 }
          }, { ...this.data.datasets[0], borderColor: '#ffbd47', data: [88, 42, 66, 77, 42] }]
        };
      };
      const newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const newData = [42, 88, 42, 66, 77];
      let { datasets, labels } = { ...this.data };
      // @ts-ignore
      const before = this.chartComponent?.chart?.data.datasets.length;
      console.log('before', before);
      // console.log('datasets, labels', datasets, labels)
      // @ts-ignore
      // this.data = data()
      this.data = {
        ...this.data,
        datasets: [{ ...this.data.datasets[0], data: newData }, {
          ...this.data.datasets[0],
          borderColor: '#ffbd47',
          data: [88, 42, 66, 77, 42]
        }],
        labels: newLabels
      };
      // console.log('datasets, labels', { datasets, labels } = {...this.data})
      // @ts-ignore
      setTimeout(() => {
        const after = this.chartComponent?.chart?.data.datasets.length;
        console.log('after', after);
      });
    }, 5000);
  }
}
