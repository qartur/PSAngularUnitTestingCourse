import { async, ComponentFixture, fakeAsync, flush, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { Location } from '@angular/common';
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";
import { tick } from "@angular/core/src/render3";

describe('testing hero service',() => {
    let fixture : ComponentFixture<HeroDetailComponent>;
    let mockHeroService, mockActivatedRoute, mockLocation;
    let service : HeroService;

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);
        mockActivatedRoute = {
            snapshot: {paramMap : {get: () => {return '3';}}}
        }
        TestBed.configureTestingModule({
            imports : [FormsModule],
            declarations : [HeroDetailComponent],
            providers : [
             {provide : ActivatedRoute, useValue: mockActivatedRoute},
             {provide : HeroService, useValue: mockHeroService},
             {provide : Location, useValue: mockLocation}
            ]
        })
        
        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({id : 3, name: "Super Dude", strenght : 3}))
    })

    it('should render hero name in h2 tag', () => {
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.querySelector("h2").textContent).toContain('SUPER DUDE')

    })

    xit('shuld update hero when save is called', (done) => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        setTimeout(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled();
            done();
        },300);
 

    });
    // use fake async function 
    // it('shuld update hero when save is called',fakeAsync (() => {
    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();

    //     fixture.componentInstance.save();
    //     tick(250);
    //     //use flush() when we don't know how much we must wait

    //     expect(mockHeroService.updateHero).toHaveBeenCalled();
        

    // }));


     // use fake async function 
     it('shuld update hero when save is called',async (() => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        fixture.whenStable().then(() => {

            expect(mockHeroService.updateHero).toHaveBeenCalled();
        });
        
    }));
})