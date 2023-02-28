import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { AppConfig } from 'src/app/core/models/app.config';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { AppConfigService } from 'src/app/core/services/app.config.service';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  public olympics?: OlympicCountry[];
  errorMessage: string = '';
  sub! : Subscription;
  @Input() chartData: any;
  @Input() chartType: string = "";

  chartOptions: any;

  subscription?: Subscription;

  config?: AppConfig;
  label1 : string = "Number of JOs";
  label2 : string = "Number of countries";
  number1: number = 10;
  number2 : number = 10;
  countryId? : number;

  constructor(private olympicService: OlympicService,private configService: AppConfigService, private router : Router) {}

  ngOnInit(): void {
    this.drawGraphic();
  }

  drawGraphic(){
  this.config = this.configService.config;
  this.updateChartOptions();
  this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
      this.updateChartOptions();
  });
  }

  selectData(event: { element: any; }) {
    console.log(event.element.index);
    console.log(this.chartData.labels[event.element.index ]);
    console.log(event.element);
    this.getCountryId(this.chartData.labels[event.element.index ]);
}

getCountryId(countryName : string){
    this.sub = this.olympicService.getOlympics().subscribe({
        next: olympics => {
            this.olympics = olympics;
            const arr = this.olympics?.filter(ol => ol.country == countryName);
            this.countryId = arr ? arr[0].id : 0;
            this.router.navigate(['/country-stats',this.countryId]);
        },
        error: err => this.errorMessage = err
    });
}

  updateChartOptions() {
    this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
}

getLightTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    }
}

getDarkTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        }
    }
}
}
