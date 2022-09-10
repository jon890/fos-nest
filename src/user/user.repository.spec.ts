import { Sequelize } from 'sequelize-typescript';
import { TestDbUtils } from '../test/db.utils';
import { User } from './user.model';
import { UserRepository } from './user.repository';

/**
 * 유저 레포지터리 테스트
 * tests the data access layer => ROM queries and models are not evicted
 * remain simple => easily maintainable.
 *
 * 참고 : https://pleymor.medium.com/sqlite-based-tests-with-nestjs-and-sequelize-dddc05556bbc
 *
 */
describe('UserRepository', () => {
  let userRepository: UserRepository;
  let testDB: Sequelize;

  beforeAll(async () => {
    // Initialize Sequelize with SQLite and our models
    testDB = await TestDbUtils.create(User);
    userRepository = new UserRepository(User);
  });

  afterAll(() => testDB.close());

  describe('create and findByEmail', () => {
    let bifos: User;

    beforeEach(async () => {
      bifos = await userRepository.create({
        email: 'jon89071@gmail.com',
        password: '1234',
        nickname: 'BIFOS',
      });
    });

    afterEach(() => {
      // clean out the database after every test
      testDB.truncate();
    });

    it('사용자를 생성하고 이메일로 부터 사용자를 반환한다', async () => {
      const testBifos = await userRepository.findByEmail(bifos.email);
      expect(testBifos.email).toEqual(bifos.email);
      expect(testBifos.password).toEqual(bifos.password);
      expect(testBifos.nickname).toEqual(bifos.nickname);
    });
  });
});
