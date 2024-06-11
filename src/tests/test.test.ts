import { httpTest } from '../controllers/test';
import { mockRequest, mockResponse } from '../utils/testUtils';

describe('httpTest controller', () => {
  it('should respond with a success message', () => {
    const req = mockRequest();
    const res = mockResponse();

    httpTest(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Test successful' });
  });
});
