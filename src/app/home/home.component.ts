import { PlayerOfTheWeek } from './../shared/classes/player-of-the-week';
import { Game } from './../shared/classes/game';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SeasonStats } from './../shared/classes/season-stats';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public seasonStats?: SeasonStats;
  public allUpcomingGames: Game[] = [];
  public upcomingGames: Game[] = [];
  public gameGroup: string = 'all';
  public potw?: PlayerOfTheWeek;

  constructor(firestore: AngularFirestore) {
    firestore.collection<SeasonStats>(`season_totals`,ref => ref.where('season', '==', environment.CURRENT_SEASON).where('varsity', '==', true)).valueChanges().subscribe({
      next: (stats: SeasonStats[]) => {
        // const test: string = (stats[0] as SeasonStats).getGoalDiff();
        const s:SeasonStats = stats[0] as SeasonStats;
        const diff = SeasonStats.getGoalDiff(s.goals_for,s.goals_against);
        s.goalDiff = diff;
        this.seasonStats = s;
      }
    });
    firestore.collection<Game>('games',ref => ref.orderBy('date','asc')).valueChanges().subscribe({
      next: (g: Game[]) => {
        let games = g.filter((game)=>game.complete===false && game.year === environment.CURRENT_SEASON);
        games.forEach((g:Game)=>{
          if(g.varsity){
            g.groups = "['all','varsity']";
          } else {
            g.groups = "['all','jv']";
          }
        })
        games = games.slice(0,6);
        this.allUpcomingGames = games;
        this.gameGroupChanged('all');
      }
    });
    firestore.doc('potw/jomtax9WWuD6DyNCg2nr').valueChanges({idField:'id'}).subscribe({
      next: (potw: any) => {
        this.potw = potw;
      }
    })
  }

  ngOnInit(): void {
  }

  gameGroupChanged(group:string){
    this.gameGroup = group;
    this.upcomingGames = this.allUpcomingGames.filter((g:Game) => {
      if(this.gameGroup === 'all')return true;
      if(this.gameGroup === 'varsity')return g.varsity===true;
      if(this.gameGroup === 'jv')return g.varsity===false;
      return true
    })
  }
}
