import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { AppConfig } from 'src/app/core/models/app.config';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { AppConfigService } from 'src/app/core/services/app.config.service';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}

