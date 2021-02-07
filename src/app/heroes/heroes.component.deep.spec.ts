import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroDetailComponent } from "../hero-detail/hero-detail.component";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "../heroes/heroes.component"

describe('Deep Testing', () =>{
    let fixture : ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HERROS;
    

    beforeEach(()=>{
        HERROS = [
            {id : 1, name : 'Testowy', strength : 8},
            {id : 2, name : 'Testowy2', strength : 3},
            {id : 3, name : 'Testowy3', strength : 5}
         ];
         mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
         TestBed.configureTestingModule({
            declarations : [HeroesComponent, HeroComponent],
            providers : [
                {provide : HeroService, useValue : mockHeroService}
            ],
            schemas : [NO_ERRORS_SCHEMA]
        });  
        fixture = TestBed.createComponent(HeroesComponent);


    })    

    it('should render each hero as a HeroComponent', ()=>{
        mockHeroService.getHeroes.and.returnValue(of(HERROS));

        fixture.detectChanges();

        const herocomponentsD = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(herocomponentsD.length).toBe(3);
    } )
       
    
    it('should be the same element true table ', ()=>{
        mockHeroService.getHeroes.and.returnValue(of(HERROS));

        fixture.detectChanges();
        
        const herocomponentsD = fixture.debugElement.queryAll(By.directive(HeroComponent));
        
        for(let i=0; i < herocomponentsD.length; i++){
           expect(herocomponentsD[i].componentInstance.hero).toEqual(HERROS[i]);
        };
    });


    it(`should call Heroservice.deleteHero when HeroComponent delete button was cliked`, ()=>{
        mockHeroService.getHeroes.and.returnValue(of(HERROS));
        spyOn(fixture.componentInstance,'delete');
        fixture.detectChanges();
        
        const herocomponentsD = fixture.debugElement.queryAll(By.directive(HeroComponent));
        herocomponentsD[0].query(By.css('button'))
        .triggerEventHandler('click', {stopPropagation: () => {}})
        
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HERROS[0]);

    });
    
})