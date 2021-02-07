import { StrengthPipe } from "./strength.pipe"

describe('Strenght test', () => {
it('should seen week when strenght is 5', () => {
    let pipe = new StrengthPipe();
    expect(pipe.transform(5)).toEqual('5 (weak)');
})


it('should seen strong when strenght is 10', () => {
    let pipe = new StrengthPipe();
    expect(pipe.transform(10)).toEqual('10 (strong)');
})

})