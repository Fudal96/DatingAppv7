import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { MembersService } from 'src/app/_services/members.service';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit{
  member: Member | undefined;
  user: User | null = null;


  constructor(private accountService: AccountService, private membersService: MembersService ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }


  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
   if (!this.user) return;
   this.membersService.getMember(this.user.username).subscribe({
    next: member => this.member = member
   })
  }

}
