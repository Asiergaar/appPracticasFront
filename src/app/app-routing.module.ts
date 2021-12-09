import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNoEncontradaComponent } from './views/pagina-no-encontrada/pagina-no-encontrada.component';
import { ClientsListComponent } from './views/client/clients-list/clients-list.component';
import { ClientsCapitalsComponent } from './views/client/clients-capitals/clients-capitals.component';
import { ClientAddComponent } from './views/client/client-add/client-add.component';
import { ClientModComponent } from './views/client/client-mod/client-mod.component';
import { ClientDetComponent } from './views/client/client-det/client-det.component';
import { TokensListComponent } from './views/token/tokens-list/tokens-list.component';
import { TokenAddComponent } from './views/token/token-add/token-add.component';
import { TokenModComponent } from './views/token/token-mod/token-mod.component';
import { ExchangesListComponent } from './views/exchange/exchanges-list/exchanges-list.component';
import { ExchangeAddComponent } from './views/exchange/exchange-add/exchange-add.component';
import { ExchangeModComponent } from './views/exchange/exchange-mod/exchange-mod.component';
import { PairsListComponent } from './views/pair/pairs-list/pairs-list.component';
import { PairAddComponent } from './views/pair/pair-add/pair-add.component';
import { PairModComponent } from './views/pair/pair-mod/pair-mod.component';
import { PoolsListComponent } from './views/pool/pools-list/pools-list.component';
import { PoolAddComponent } from './views/pool/pool-add/pool-add.component';
import { PoolUpdateComponent } from './views/pool/pool-update/pool-update.component';
import { PoolDailyComponent } from './views/pool/pool-daily/pool-daily.component';
import { PoolVariationComponent } from './views/pool/pool-variation/pool-variation.component';
import { HomeComponent } from './views/home/home.component';
import { CapitalAddComponent } from './views/capital/capital-add/capital-add.component';
import { ServerErrorComponent } from './views/server-error/server-error.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'clientsList', component: ClientsListComponent },
  { path: 'addClient', component: ClientAddComponent },
  { path: 'modClient/:id', component: ClientModComponent },
  { path: 'clientDetail/:id', component: ClientDetComponent },
  { path: 'clientsCapitals', component: ClientsCapitalsComponent },

  { path: 'tokensList', component: TokensListComponent},
  { path: 'addToken', component: TokenAddComponent },
  { path: 'modToken/:id', component: TokenModComponent },

  { path: 'exchangesList', component: ExchangesListComponent},
  { path: 'addExchange', component: ExchangeAddComponent },
  { path: 'modExchange/:id', component: ExchangeModComponent },

  { path: 'pairsList', component: PairsListComponent},
  { path: 'addPair', component: PairAddComponent},
  { path: 'modPair/:id', component: PairModComponent},

  { path: 'poolsList', component: PoolsListComponent},
  { path: 'addPool', component: PoolAddComponent},
  { path: 'poolsByDay', component: PoolDailyComponent},
  { path: 'updatePools', component: PoolUpdateComponent},
  { path: 'poolVariation', component: PoolVariationComponent},

  { path: 'addCapital', component: CapitalAddComponent},

  { path: 'serverError', component: ServerErrorComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: PaginaNoEncontradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
