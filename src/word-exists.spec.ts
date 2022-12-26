import { fileWordExistsChecker } from "./word-exists";

describe('wordExistsChecker function', () => {
    it('Works on empty strings', async () => {
        const res = fileWordExistsChecker('');
        expect(res).toBeFalsy();
    });
    it('Works on other types', async () => {
        // @ts-ignore
        const res = fileWordExistsChecker(NaN);
        expect(res).toBeFalsy();
    });
    it('Too short', async () => {
        const res = fileWordExistsChecker('as');
        expect(res).toBeFalsy();
    });
    it('Too long', async () => {
        const res = fileWordExistsChecker('oijwefa');
        expect(res).toBeFalsy();
    });
    it('Bad word', async () => {
        const res = fileWordExistsChecker('qwert');
        expect(res).toBeFalsy();
    });
    it('Good word', async () => {
        const res = fileWordExistsChecker('hello');
        expect(res).toBeTruthy();
    });
});
