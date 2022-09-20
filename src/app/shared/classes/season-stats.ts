export class SeasonStats {

    public goals_against?: number;
    public goals_for: number = 0;
    public assists_for: number = 0;
    public points_for: number = 0;
    public losses?: number
    public ties?: number
    public season?: string;
    public shots_against?: number;
    public shots_for?: number
    public wins?: number
    public goalDiff?: string;
    public varsity!: boolean;

    static getGoalDiff(goals_for?: number, goals_against?: number): string {
        let diff: string;
        if(goals_for && goals_against){
            diff = (goals_for - goals_against).toString();
            if(goals_for > goals_against){
                diff = '+ ' + diff;
            } else {
                diff = '- ' + diff;
            }
        } else {
            diff = '--';
        }
        return diff;
    }
}

