import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroDetailComponent } from "../hero-detail/hero-detail.component";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "../heroes/heroes.component"


@Directive({
    selector : '[routerLink]',
    host : { '(click)' : 'onClick()' }

})
export class RouterLinkDirectibeSub {
    @Input('routerLink') linkParams: any;
    navigateTo : any = null;

    onClick(){

        this.navigateTo = this.linkParams;
    }
}

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
            declarations : [HeroesComponent, HeroComponent, RouterLinkDirectibeSub],
            providers : [
                {provide : HeroService, useValue : mockHeroService}
            ],
            //schemas : [NO_ERRORS_SCHEMA]
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


    it(`should call Heroservice.deleteHero when HeroComponent delete button was cliked version2 `, ()=>{
        mockHeroService.getHeroes.and.returnValue(of(HERROS));
        spyOn(fixture.componentInstance,'delete');
        fixture.detectChanges();
        
        const herocomponentsD = fixture.debugElement.queryAll(By.directive(HeroComponent));
        (<HeroComponent>herocomponentsD[0].componentInstance).delete.emit(undefined);
        //herocomponentsD[0].triggerEventHandler('delete', null);
        
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HERROS[0]);

    });


    it(`should add new hero when clicked add button on page `, ()=>{
        mockHeroService.getHeroes.and.returnValue(of(HERROS));
        fixture.detectChanges();
        const name = "Mr. Ice";
        mockHeroService.addHero.and.returnValue(of({id : 4, name : name, strength : 5}));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement ;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0] ;

        inputElement.name = name;
        addButton.triggerEventHandler('click',null);
        fixture.detectChanges();

        const heroText = fixture.debugElement.nativeElement.query(By.css("ul")).textContent;
        expect(heroText).toContain(name);
    });


    it('Should corect router for the first hero', () => {
        const heroComponent  = fixture.debugElement.queryAll(By.directive(HeroesComponent));
        
        let routerlink = heroComponent[0].query(By.directive(RouterLinkDirectibeSub)).
            injector.get(RouterLinkDirectibeSub);


        heroComponent[0].query(By.css('a')).triggerEventHandler('click',null);

         expect(routerlink.linkParams).toBe('/detal/1');

    })
    
})