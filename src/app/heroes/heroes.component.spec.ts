import { Observable, of } from "rxjs";
import { Hero } from "../hero"
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe('Testing Hero component', () => {
let heroesComponent : HeroesComponent;
let herros;
let mockHerroService;

 beforeEach( () => {
   herros = [
      {id : 1, name : 'Testowy', strength : 8},
      {id : 2, name : 'Testowy2', strength : 3},
      {id : 3, name : 'Testowy3', strength : 5}

   ];

   //mockHerroService = new mockHerroService();
   
   //jasmine.createSpy('deleteHero').and.callThrough();
   mockHerroService = jasmine.createSpyObj(['addHero','getHeroes','deleteHero'])
   //spyOn(mockHerroService, 'deleteHero');
   //spyOn(mockHerroService, 'deleteHero').and.returnValue(new Observable<Hero>());

   heroesComponent = new HeroesComponent(mockHerroService);
 })


 it('should something', () => {
    expect(herros[0].id).toBe(1);
 })


 describe ('Test delete Hero', () => {

   it('It should delete after delete action', () => {
      //mockHerroService.deleteHero.add.after.return(of(true));
      //mockHerroService.deleteHero.add.returnValue(of(true));
      mockHerroService.deleteHero.and.returnValue(of(true));
      heroesComponent.heroes = herros;

      heroesComponent.delete(herros[1]);

      expect(heroesComponent.heroes.length).toBe(2);
   })


   it('delete with integration test - delet service was called ', () => {
      //mockHerroService.deleteHero.add.after.return(of(true));
      mockHerroService.deleteHero.and.returnValue(of(true));
      heroesComponent.heroes = herros;

      heroesComponent.delete(herros[2]);
      expect(mockHerroService.deleteHero).toHaveBeenCalledWith(herros[2]);
   })

 })

})