import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNoEncontradaComponent } from './views/pagina-no-encontrada/pagina-no-encontrada.component';
import { ClientsListComponent } from './views/client/clients-list/clients-list.component';
import { ClientAddComponent } from './views/client/client-add/client-add.component';
import { ClientModComponent } from './views/client/client-mod/client-mod.component'
import { TokensListComponent } from './views/token/tokens-list/tokens-list.component';;
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
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },

  { path: 'ClientsList', component: ClientsListComponent },
  { path: 'AddClient', component: ClientAddComponent },
  { path: 'ModClient/:id', component: ClientModComponent },

  { path: 'TokensList', component: TokensListComponent},
  { path: 'AddToken', component: TokenAddComponent },
  { path: 'ModToken/:id', component: TokenModComponent },

  { path: 'ExchangesList', component: ExchangesListComponent},
  { path: 'AddExchange', component: ExchangeAddComponent },
  { path: 'ModExchange/:id', component: ExchangeModComponent },

  { path: 'PairsList', component: PairsListComponent},
  { path: 'AddPair', component: PairAddComponent},
  { path: 'ModPair/:id', component: PairModComponent},

  { path: 'PoolsList', component: PoolsListComponent},
  { path: 'AddPool', component: PoolAddComponent},
  { path: 'PoolsByDay', component: PoolDailyComponent},
  { path: 'UpdatePools', component: PoolUpdateComponent},

  { path: '', redirectTo: '/Home', pathMatch: 'full'},
  { path: '**', component: PaginaNoEncontradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
