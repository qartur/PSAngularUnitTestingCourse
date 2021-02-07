import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroDetailComponent } from "../hero-detail/hero-detail.component";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "../heroes/heroes.component"

describe('Shallow Testing', () =>{
    let fixture : ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HERROS;
    
@Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    //@Output() delete = new EventEmitter();
  }

    beforeEach(()=>{
        HERROS = [
            {id : 1, name : 'Testowy', strength : 8},
            {id : 2, name : 'Testowy2', strength : 3},
            {id : 3, name : 'Testowy3', strength : 5}
         ];
         TestBed.configureTestingModule({
            declarations : [HeroesComponent, FakeHeroComponent],
            providers : [
                {provide : HeroService, useValue : mockHeroService}
            ],
            //schemas : [NO_ERRORS_SCHEMA]
        });    
        fixture = TestBed.createComponent(HeroesComponent);
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);

    })    
        

        it('should work',() =>{
            expect(true).toBe(true);
        })


        xit('checking getHeroes',() =>{
            mockHeroService.getHeroes().add.returnValue(of(HERROS));
            fixture.detectChanges();
            expect(fixture.componentInstance.heroes.length).toBe(3);
        })
    
})