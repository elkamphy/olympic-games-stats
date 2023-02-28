import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { OlympicCountry } from "src/app/core/models/Olympic";
import { OlympicService } from "src/app/core/services/olympic.service";

@Component({
    selector:"detailled-stats",
    templateUrl: "./detailled-stats.component.html"
})
export class DetailledStatsComponent implements OnInit{
    countryName? : string ;
    countryId? : number;

    label1 : string = "Number of entries";
    label2 : string = "Total number medals";
    label3 : string = "Total number of athletes";
    count1?: number = 10;
    count2? : number = 10;
    count3? : number = 10;
    chartData: any;
    chartType: string = "line";
    chartOptions: any;
    errorMessage: string = '';
    sub! : Subscription;
    olympics?: OlympicCountry[];
    currentCountryStats?: OlympicCountry;
    defaultCountry : OlympicCountry =   {
        "id": 2,
        "country": "Spain",
        "participations": [
          {
            "id": 1,
            "year": 2012,
            "city": "Londres",
            "medalsCount": 20,
            "athleteCount": 315
          },
          {
            "id": 2,
            "year": 2016,
            "city": "Rio de Janeiro",
            "medalsCount": 17,
            "athleteCount": 312
          },
          {
            "id": 3,
            "year": 2020,
            "city": "Tokyo",
            "medalsCount": 17,
            "athleteCount": 321
          }
        ]
      };

    constructor(private olympicService : OlympicService, private activatedRoute : ActivatedRoute, private router : Router){}

    ngOnInit(): void {
        this.countryId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.sub = this.olympicService.getOlympics().subscribe({
          next: olympics => {
              this.olympics = olympics;
              const arr = this.olympics?.filter(ol => ol.id == this.countryId);
              this.currentCountryStats = arr ? arr[0] : this.defaultCountry;
              this.drawGraphic();
          },
          error: err => this.errorMessage = err
      });
    }

    drawGraphic(){
        //number of entries
        this.count1 = this.currentCountryStats?.participations.length;
        //number of of medals
        this.count2 = this.currentCountryStats?.participations.map(p => p.medalsCount).reduce((sum,current) => {
            sum = sum + current;
            return sum;
        });
        //number of athletes
        this.count3 = this.currentCountryStats?.participations.map(p => p.athleteCount).reduce((sum,current) => {
            sum = sum + current;
            return sum;
        });
        const label = this.currentCountryStats?.participations.map(v => v.year);
        const data = this.currentCountryStats?.participations.map(v => v.medalsCount);
        this.countryName = this.currentCountryStats?.country;
        console.log("label : "+label);
        console.log("data : "+data);
        this.chartType = "line";
        this.chartData = {
          labels: label,
          datasets: [
              {
                 label: 'Medals per year',
                  data: data
              }
          ]
      };
      }

      onBack() : void{
        this.router.navigate(['/']);
      }
}