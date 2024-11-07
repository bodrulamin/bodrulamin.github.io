import {Component, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Button} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import {InputTextModule} from "primeng/inputtext";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {ChipsModule} from "primeng/chips";
import {NgIf} from "@angular/common";
import {PanelModule} from "primeng/panel";
import {DataService} from "./data.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Button, ToolbarModule, SplitButtonModule, InputTextModule, OverlayPanelModule, InputGroupModule, InputGroupAddonModule, ChipsModule, NgIf, PanelModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bodrulamin';
  social = {
    title: '',
    value: '', canCopy: true,

    onClick: () => {
    }
  };
  private socials: any;
  jsonData: any;

  constructor(private dataService: DataService) {
    this.socials = {
      'linkedin': {
        title: 'LinkedIn',
        value: 'https://linkedin.com/in/bodrulamin', canCopy: true,
        onClick: () => {
          window.open(this.social.value);
        }
      },
      'github': {
        title: 'Github',
        value: 'https://github.com/in/bodrulamin', canCopy: true,
        onClick: () => {
          window.open(this.social.value);
        }
      },
      'email': {
        title: 'Email',
        value: 'bodrulaminiu@gmail.com', canCopy: true,
        onClick: () => {
          window.open('mailto:' + this.social.value);
        }
      },
      'phone': {
        title: 'Phone Number',
        value: 'bodrulaminiu@gmail.com', canCopy: true,
        onClick: () => {
          window.open('tel:' + this.social.value);
        }
      },


    }


    this.dataService.getJsonData().subscribe({
        next: data => {
          this.jsonData = data;
        },
        error: err => {
        },
        complete: () => {
        }
      }
    );

  }

  onSocialClicked(selectedSocial: string) {
    this.social = this.socials[selectedSocial];
  }

  copyValue() {

  }
}
