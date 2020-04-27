const createToken = require('../createToken');

describe('createToken', () => {
    const mockData = { id: 1 };

    it('should return token with different secret', () => {
        expect(createToken(mockData, '24h', null))
            .toThrowError('No secret was found');
    });

    it('should return token with default expires', () => {
        expect(createToken(mockData))
            .not.toBeNull();
    });

    it('should return token with param expires', () => {
        expect(createToken(mockData, '24h'))
            .not.toBeNull();
    });
});
