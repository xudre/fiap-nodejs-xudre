const cryptoPassword = require('../cryptoPassword');

describe('cryptoPassword', () => {
    const mockPassword = '123456';
    const mockEncryptation = '03705af8be73751929b6c05fef5167dea7cb7908b04473d426aefd5854180dc39a9ec39413876b94face0f8f48b456ba053a4ee4b035bd71a3ddebfce3f392d0';

    it('should return password with encryptation', () => {
        expect(cryptoPassword(mockPassword)).not.toBeNull();
    });

    it('should return password not equal to entered password', () => {
        expect(cryptoPassword(mockPassword)).not.toBe(mockPassword);
    });

    it('should return password equal to encrypted password', () => {
        expect(cryptoPassword(mockPassword)).toBe(mockEncryptation);
    });
});
