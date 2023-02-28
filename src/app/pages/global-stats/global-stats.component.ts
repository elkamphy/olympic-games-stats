import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { AppConfig } from 'src/app/core/models/app.config';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { AppConfigService } from 'src/app/core/services/app.config.service';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'global-stats',
  templateUrl: './global-stats.component.html',
  styleUrls: ['./global-stats.component.scss'],
})
export class GlobalStatsComponent implements OnInit {
  public olympics?: OlympicCountry[];
  errorMessage: string = '';
  sub! : Subscription;
  chartData: any;
  chartType: string = "";

  chartOptions: any;

  subscription?: Subscription;

  config?: AppConfig;
  label1 : string = "Number of JOs";
  label2 : string = "Number of countries";
  count1?: number = 10;
  count2? : number = 10;

  constructor(private olympicService: OlympicService,private configService: AppConfigService) {}

  ngOnInit(): void {
    this.sub = this.olympicService.getOlympics().subscribe({
      next: olympics => {
          this.olympics = olympics;
          this.drawGraphic();
      },
      error: err => this.errorMessage = err
  });
  }

  drawGraphic(){
    const label = this.olympics?.map( olympic => olympic.country);
    const data = this.olympics?.map(val => {
      //number of JOs
      this.count1 = val.participations.length;
      return val.participations.map(p => p.medalsCount).reduce((sum,current) => {
        sum = sum + current;
        return sum;
      })
    });
    //number of countries
    this.count2 = this.olympics?.length;
    console.log("label : "+label);
    console.log("data : "+data);
    this.chartType = "pie";
    this.chartData = {
      labels: label,
      datasets: [
          {
              data: data
          }
      ]
  };
  }
}
