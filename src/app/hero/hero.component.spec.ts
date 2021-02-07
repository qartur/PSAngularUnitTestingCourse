import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroComponent } from "./hero.component"

describe ('Test HeroComponent',() => {
    let fixture : ComponentFixture<HeroComponent>;

    beforeEach(()=> {
        TestBed.configureTestingModule({
           declarations: [HeroComponent],
           schemas: [NO_ERRORS_SCHEMA]     
        });

        fixture = TestBed.createComponent(HeroComponent);
        
    })

    it ('should have property Name', ()=>{
        fixture.componentInstance.hero = {id: 1, name: 'superHero', strength: 5};
    
        expect(fixture.componentInstance.hero.name).toEqual('superHero');

    })

    it ('should have property Name on the screen ', ()=>{
        fixture.componentInstance.hero = {id: 1, name: 'superHero', strength: 5};
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('superHero');

    })
})