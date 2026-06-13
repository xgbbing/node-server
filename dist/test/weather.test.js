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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci50ZXN0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGljZS9EZXNrdG9wL290aGVyY29kZS9ub2RlLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJ0ZXN0L3dlYXRoZXIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUFxRTtBQUdyRSxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO0lBRXBDLElBQUksR0FBZ0IsQ0FBQztJQUNyQixTQUFTLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDbkIsYUFBYTtRQUNiLEdBQUcsR0FBRyxNQUFNLElBQUEsZ0JBQVMsR0FBYSxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ2xCLFlBQVk7UUFDWixNQUFNLElBQUEsWUFBSyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3pELGVBQWU7UUFDZixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsd0JBQWlCLEVBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRXpGLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3RELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSx3QkFBaUIsRUFBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN2RCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=