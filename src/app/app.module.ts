import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ReadDataService } from './services/read-data.service';
import { HttpClientModule } from "@angular/common/http";

// import { FusionChartsModule } from "angular-fusioncharts";

// // Import FusionCharts library and chart modules
// import * as FusionCharts from "fusioncharts";
// import * as charts from "fusioncharts/charts";
// import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";


// Pass the fusioncharts library and chart modules
// FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule, 
    // FusionChartsModule
  ],
  providers: [
    ReadDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
