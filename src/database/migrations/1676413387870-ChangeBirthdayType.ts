import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeBirthdayType1676413387870 implements MigrationInterface {
  name = 'AddFollowFields1676413387870'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthday"`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD "birthday" TIMESTAMP NOT NULL`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthday"`)
    await queryRunner.query(`ALTER TABLE "user" ADD "birthday" date NOT NULL`)
  }
}
