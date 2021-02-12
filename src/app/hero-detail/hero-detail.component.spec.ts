import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { Location } from '@angular/common';
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

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
})