import { AfterViewInit, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'front';
  public langList: Array<string> = ['en', 'es', 'eu', 'ca', 'fr']


  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
  }

  ngAfterViewInit(): void {
    document.getElementById('language_' + this.translate.defaultLang)?.classList.add('selectedlang');
  }


  useLanguage(language: string): void {
    this.translate.use(language);
    for(let lang in this.langList){
      if (this.langList[lang] == language) {
        document.getElementById('language_' + language)?.classList.add('selectedlang')
      } else {
        document.getElementById('language_' + this.langList[lang])?.classList.remove('selectedlang')
      }
    }
  }
}
