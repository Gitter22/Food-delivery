import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service'
import { BadRequestException, NotFoundException } from '@nestjs/common'

describe('AuthService', () => {
    let service: AuthService;
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

    it('throws if user tries to signup with existing email id', async () => {
        try {
            await service.signUp("John Doe", "test@test.com", "password", "Tandalja, Vadodara")
        } catch (err) {
            expect(err).toBeInstanceOf(BadRequestException);
            expect(err.message).toBe('email is in use');
        }
    });

    it('creates a new user with the salted and hashed password', async () => {
        const user = await service.signUp("John Doe", "test@test.com", "password", "Tandalja, Vadodara")
        expect(user.password).not.toEqual('asdf')
        const [salt, hash] = user.password.split('.')
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    });

    it('throws if user signs in with unused email', async () => {
        try {
            await service.signIn("test@test.com", "password")
        } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toBe('user does not exist');
        }
    })
    it('throws if an invalid password is provided', async () => {
        try {
            await service.signIn('asdf@test.com', 'password')
        } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toBe('user not found signin');
        }
    })
});
