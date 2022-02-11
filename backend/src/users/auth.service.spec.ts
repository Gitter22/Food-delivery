import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service'

describe('AuthService', () => {
    let service;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService]
        }).compile();

        service = module.get(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(service.signUp).toBeDefined();
        expect(service.signIn).toBeDefined();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(service.signUp).toBeDefined();
        expect(service.signIn).toBeDefined();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(service.signUp).toBeDefined();
        expect(service.signIn).toBeDefined();
    });
});
