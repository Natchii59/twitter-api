import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddFieldsForUser1676209906625 implements MigrationInterface {
  name = 'AddFieldsForUser1676209906625'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "name" character varying NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "birthday" TIMESTAMP NOT NULL`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthday"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`)
  }
}
