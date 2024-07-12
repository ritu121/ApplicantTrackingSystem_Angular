import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SVGIcon, userIcon, gearIcon, editToolsIcon, gearsIcon, logoutIcon } from '@progress/kendo-svg-icons';
import { ListItemModel } from '@progress/kendo-angular-buttons';
@Component({
  selector: 'app-header',
  // standalone: true,
  // imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {


  showMenu = true;
  public username="Ritu";
  public loginName="RR"
  selectedOption: string = '';
  public svgSetting: SVGIcon = gearIcon;

  public shareData: ListItemModel[] = [
    
    {
        text: 'Post Configuration',
        svgIcon: editToolsIcon,
    },
    {
        text: 'Skill Configuration',
        svgIcon: gearsIcon,
    },
    {
      text: 'Register',
      svgIcon: editToolsIcon,
  },
    {
        text: 'Logout',
        svgIcon: logoutIcon,
        
    }
];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showMenu = !(event.url === '/' || event.url === '/login');
      }
    });
  }


  onOptionSelect(option: string) {
    this.selectedOption = option;
    console.log('Selected option:', this.selectedOption);
    // Add your custom logic here
  }



  // logout() {
  //   console.log('User logged out');
  //   this.router.navigate(['/login']);
  // }

  ngOnInit(): void {
  }

  onItemClick(event: any) {
    switch (event.text) {
      case 'Post Configuration':
        this.onPostAppliedClick();
        break;
      case 'Skill Configuration':
          this.onSkillsClick();
          break;
      case 'Register':
          this.onRegisterClick();
          break;
     
      case 'Logout':
        this.onLogoutClick();
        break;
      default:
        break;
    }
  }

  onConfigurationClick() {
    console.log('Profile clicked');
    // Add your logic here
  }

  onRegisterClick() {
    this.router.navigate(['/register']);
    console.log('Register clicked');
    // Add your logic here
  }

  onSkillsClick() {
    this.router.navigate(['/skills']);
  }

  onPostAppliedClick() {
    
    this.router.navigate(['/postdetails']);
  }

  onLogoutClick() {
    localStorage.removeItem("userID");
    localStorage.removeItem("name");
    
    this.router.navigate(['/login']);
  }

}