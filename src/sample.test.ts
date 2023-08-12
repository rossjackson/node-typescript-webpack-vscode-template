import sampleFunc from './sample'

describe('sample', () => {
    it('should write on console.log', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn())
        sampleFunc()

        expect(logSpy).toHaveBeenCalledTimes(1)
    })
})
