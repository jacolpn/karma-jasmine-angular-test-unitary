import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ActionDirective } from './action.directive';
import { ActionDirectiveModule } from './action.module';

describe(ActionDirective.name, () => {
    let fixture: ComponentFixture<ActionDirectiveTesteComponent> = null;
    let component: ActionDirectiveTesteComponent = null;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ActionDirectiveTesteComponent],
            imports: [ActionDirectiveModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ActionDirectiveTesteComponent);
        component = fixture.componentInstance;
    });

    it(`(D) (@Output appAction) should emit with payload when ENTER key is pressed`, () => {
        // const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
        const divEl = fixture.debugElement.query(By.directive(ActionDirective)).nativeElement;
        const event = new KeyboardEvent('keyup', { key: 'Enter' });
        divEl.dispatchEvent(event);
        expect(component.hasEvent()).toBeTrue();
    });

    it(`(D) (@Output appAction) should emit with payload when clicked`, () => {
        const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
        const event = new Event('click');
        divEl.dispatchEvent(event);
        expect(component.hasEvent()).toBeTrue();
    });

    it(`(D) (@Output appAction) should emit event with payload when clicked or ENTER key pressed`, () => {
        const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
        const clickEvent = new Event('click');
        const keyboardEvent = new KeyboardEvent('keyup', { key: 'Enter' });

        divEl.dispatchEvent(clickEvent);
        expect(component.hasEvent()).withContext('Click event').toBeTrue();
        component.clearEvent();

        divEl.dispatchEvent(keyboardEvent);
        expect(component.hasEvent()).withContext('Keyboard event "keyup"').toBeTrue();
    });
});

@Component({
    template: `<div class="dummy-component" (appAction)="actionHandler($event)"></div>`
})
class ActionDirectiveTesteComponent {
    private event: Event = null;

    public actionHandler(event: Event): void {
        this.event = event;
    }

    public hasEvent(): boolean {
        return !!this.event;
    }

    public clearEvent(): void {
        this.event = null;
    }
}