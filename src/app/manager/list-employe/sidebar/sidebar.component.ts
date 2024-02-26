import { Component, Input } from '@angular/core';
import { sidebarConfig } from 'src/app/util/data';

const sidebarconfig= sidebarConfig;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() role: string = '';
  roleLinks: { name: string; href: string }[] = [];
  selectedLink: string = '';

  ngOnInit(): void {
    this.loadRoleLinks();
  }

  private loadRoleLinks(): void {
    const roleConfig = sidebarconfig.find(config => config.role === this.role);

    if (roleConfig) {
      this.roleLinks = roleConfig.links;
    } else {
      console.error(`Aucune configuration de barre latérale trouvée pour le rôle ${this.role}`);
    }
  }
  selectLink(link: string): void {
    this.selectedLink = link;
  }

}
