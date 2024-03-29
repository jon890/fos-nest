import { ModelCtor, Sequelize } from 'sequelize-typescript';

// TODO: test db provider로 변경해보기
// 싱글톤이면서, 다른데에서 모두 주입 가능하면 편할 듯하다!
export class TestDbUtils {
  static async create(...models: ModelCtor[]): Promise<Sequelize> {
    // NOTE: Sequelize DB는 메모리에서 동작할 수 없음
    // 그래서 도커 컨테이너로 테스트용 데이터베이스 컨테이너를 띄운후 사용
    // https://stackoverflow.com/questions/7872693/running-postgresql-in-memory-only
    const testDB = new Sequelize({
      dialect: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'fos_test',
      password: 'fos_test',
      database: 'fos_test_db',
      logging: console.log,
    });

    if (models && models.length) {
      testDB.addModels(models);
    }

    // Creates the database Structure
    await testDB.sync({
      force: true,
    });

    return testDB;
  }
}
