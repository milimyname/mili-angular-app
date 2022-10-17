import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newMemberName = '';
  members: string[] = [];
  errorMessage = '';
  numberOfTeams: number | "" = "";
  teams: string[][] = [];

  // Change newMemberName to input value
  onInput(member: string){
    this.newMemberName = member;
  }

  // Add newMemberName to members array
  addMember() {

    // return if the member name is empty
    if(!this.newMemberName) {
      this.errorMessage = 'Add a member name';
      return;
    };   

    this.errorMessage = '';
    this.members.push(this.newMemberName);
    this.newMemberName = '';
  }

  // Get number of teams
  onNumberOfTeamsInput(value: string){
    this.numberOfTeams = Number(value);
  }

  // Generate teams
  generateTeams() {
  
    // return if the conditions are not met
    if(!this.numberOfTeams || this.numberOfTeams < 2 ) {
      this.errorMessage = 'Invalid number of teams';
      return
    };

    if(this.members.length < this.numberOfTeams) {
      this.errorMessage = 'Add more members';
      return;
    }

    this.errorMessage = '';
    const allMembers = [...this.members];

    while(allMembers.length) {
      for(let i = 0; i < this.numberOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(randomIndex, 1)[0];
        
        if(!member)break;

        if(this.teams[i]) {
          this.teams[i].push(member);
        }
        else{
          this.teams[i] = [member];
        }
      }
    }

    this.members = [];
    this.numberOfTeams = "";
  }

}

