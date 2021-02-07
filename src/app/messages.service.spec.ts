import { MessageService } from "./message.service"

describe('Testing message service', () => {
    let messageSrv : MessageService;

beforeEach( () => {
    messageSrv = new MessageService();
})


it('at begining should no value at all', () =>{
    expect(messageSrv.messages.length).toBe(0);
})

it('after added 1 message shoul have 1 value', () =>{
    messageSrv.add('Test');
    expect(messageSrv.messages.length).toBe(1); 
})

it('after clear it should no value at all ', () =>{
    messageSrv.add('Test');
    messageSrv.clear();
    expect(messageSrv.messages.length).toBe(0); 
})

})