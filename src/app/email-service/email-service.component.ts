import { ActivatedRoute, Params} from '@angular/router';
import { Input, Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { UtilitiesService } from 'app/services/utilities.service';

@Component({
  selector: 'email-service',
  templateUrl: './email-service.component.html',
  styleUrls: ['./email-service.component.scss']
})
export class EmailServiceComponent implements OnInit {

  providers = ['GCS Hitachi', 'HCC JP'];
  selectedProvider;
  protocol;

  constructor(private _UtilitiesService: UtilitiesService) { 
  }

  ngOnInit() {

  }
  showSuccess() {
    this._UtilitiesService.showSuccess('Success');
  }

}

