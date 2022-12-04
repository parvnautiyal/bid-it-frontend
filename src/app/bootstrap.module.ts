import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AccordionModule} from "ngx-bootstrap/accordion";
import {AlertModule} from "ngx-bootstrap/alert";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {TabsModule} from "ngx-bootstrap/tabs";
import {TooltipModule} from "ngx-bootstrap/tooltip";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CarouselModule,
    TooltipModule,
    TabsModule,
    AlertModule,
    ButtonsModule,
    AccordionModule,
    BsDropdownModule,
    ProgressbarModule
  ],
  exports: [
    CarouselModule,
    TooltipModule,
    TabsModule,
    AlertModule,
    ButtonsModule,
    AccordionModule,
    BsDropdownModule,
    ProgressbarModule
  ]
})
export class BootstrapModule {}
