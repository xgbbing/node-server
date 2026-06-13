"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_1 = require("@midwayjs/mock");
describe('test/weather.test.ts', () => {
    let app;
    beforeAll(async () => {
        // create app
        app = await (0, mock_1.createApp)();
    });
    afterAll(async () => {
        // close app
        await (0, mock_1.close)(app);
    });
    it('should test /weather with success request', async () => {
        // make request
        const result = await (0, mock_1.createHttpRequest)(app).get('/weather').query({ cityId: 101010100 });
        expect(result.status).toBe(200);
        expect(result.text).toMatch(/北京/);
    });
    it('should test /weather with fail request', async () => {
        const result = await (0, mock_1.createHttpRequest)(app).get('/weather');
        expect(result.status).toBe(200);
        expect(result.text).toMatch(/weather data is empty/);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rlc3Qvd2VhdGhlci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQXFFO0FBR3JFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFFcEMsSUFBSSxHQUFnQixDQUFDO0lBQ3JCLFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNuQixhQUFhO1FBQ2IsR0FBRyxHQUFHLE1BQU0sSUFBQSxnQkFBUyxHQUFhLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDbEIsWUFBWTtRQUNaLE1BQU0sSUFBQSxZQUFLLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMkNBQTJDLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDekQsZUFBZTtRQUNmLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSx3QkFBaUIsRUFBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFFekYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsd0NBQXdDLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDdEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLHdCQUFpQixFQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU1RCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==