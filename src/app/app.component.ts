import {Component, inject, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Button} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import {InputTextModule} from "primeng/inputtext";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {ChipsModule} from "primeng/chips";
import {DOCUMENT, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {PanelModule} from "primeng/panel";
import {DataService} from "./data/data.service";
import {CardModule} from "primeng/card";
import {ChipModule} from "primeng/chip";
import {jsonData} from "./data/dummy.data";
import {TagModule} from "primeng/tag";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Button, ToolbarModule, SplitButtonModule, InputTextModule, OverlayPanelModule, InputGroupModule, InputGroupAddonModule, ChipsModule, NgIf, PanelModule, CardModule, NgForOf, KeyValuePipe, ChipModule, TagModule],
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
  severities = ["success", "secondary", "info", "warning", "danger", "contrast"];
severityMap = new Map();
  private socials: any;
  jsonData = jsonData;
  icons= new Map([['Java','fa-brands fa-java']]);
  private isDarkMode: boolean | undefined;

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
        value: '+8801725717136', canCopy: true,
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

  // Function to get a random severity
  getRandomSeverity(s:any): any {
    const randomIndex = Math.floor(Math.random() * this.severities.length);
    if(this.severityMap.get(s)){
      this.severityMap.get(s)
    } else {
      this.severityMap.set(s,this.severities[randomIndex]) ;
          }
    return this.severityMap.get(s)
  }


  #document = inject(DOCUMENT);
  toggleDarkMode() {
    const linkElement = this.#document.getElementById(
      'app-theme',
    ) as HTMLLinkElement;
    if (linkElement.href.includes('light')) {
      linkElement.href = 'theme-dark.css';
      this.isDarkMode = true;
    } else {
      linkElement.href = 'theme-light.css';
      this.isDarkMode = false;
    }
  }
}
