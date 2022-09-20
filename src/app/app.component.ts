import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SeasonStats } from './shared/classes/season-stats';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public today: Date = new Date('2022-09-01');

  public seasonStats?: SeasonStats;
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
  }
}
