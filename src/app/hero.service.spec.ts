import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { HttpClientTestingModule, HttpTestingController} 
    from '@angular/common/http/testing';
import { MessageService } from "./message.service";

describe('testing hero service',() => {
    let mockMessageHeroServce;
    let httpTestingController : HttpTestingController;
    let service : HeroService;

    beforeEach(() => {
        mockMessageHeroServce = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports : [HttpClientTestingModule],
            providers : [HeroService, MessageService]
        })
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);
    })

describe('getHero Test ',() =>{

    // xit('shoculd call get with the correct url', 
    //     inject([
    //         HeroService,
    //         HttpTestingController
    //     ], 
    //     (service: HeroService, 
    //     controller : HttpTestingController) => {
    //     service.getHero(4).subscribe();

    // }));


    it('shoculd call get with the correct url', () => {
        
        service.getHero(4).subscribe();
        //service.getHero(3).subscribe();
        const req = httpTestingController.expectOne('api/heroes/4');
        req.flush({id:4,name: 'SuperDude', strength: 100});
        httpTestingController.verify();
    });


} )

});