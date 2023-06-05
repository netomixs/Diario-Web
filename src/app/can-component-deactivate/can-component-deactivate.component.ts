import { Component } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-can-component-deactivate',
  templateUrl: './can-component-deactivate.component.html',
  styleUrls: ['./can-component-deactivate.component.css']
})
export class CanComponentDeactivateComponent {
  canDeactivate: (() => Observable<boolean> | Promise<boolean> | boolean) | undefined;

}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivateComponent> {
  canDeactivate(component: CanComponentDeactivateComponent): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}