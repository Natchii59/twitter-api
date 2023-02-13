import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeTypeBirthdayDate1676216080847 implements MigrationInterface {
  name = 'ChangeTypeBirthdayDate1676216080847'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthday"`)
    await queryRunner.query(`ALTER TABLE "user" ADD "birthday" date NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthday"`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD "birthday" TIMESTAMP NOT NULL`
    )
  }
}
