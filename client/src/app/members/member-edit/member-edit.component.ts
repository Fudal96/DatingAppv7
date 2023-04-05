import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { MembersService } from 'src/app/_services/members.service';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit{
  @ViewChild('editForm') editForm: NgForm | undefined
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event:any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member | undefined;
  user: User | null = null;


  constructor(private accountService: AccountService, private membersService: MembersService, private toastr: ToastrService ) {
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

  updateMamber() {
    console.log(this.member);
    this.toastr.success('Profile updated successfully');
    this.editForm?.reset(this.member);
  }

}
