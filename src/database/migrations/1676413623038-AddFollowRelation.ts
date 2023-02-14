import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddFollowRelation1676413623038 implements MigrationInterface {
  name = 'AddFollowRelation1676413623038'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_followers" ("userId_1" uuid NOT NULL, "userId_2" uuid NOT NULL, CONSTRAINT "PK_0cae5ac1a86744e8172bb1b63d1" PRIMARY KEY ("userId_1", "userId_2"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_2932edbf0d52bf214db76f9fda" ON "user_followers" ("userId_1") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_364ef7e866eab323d0d3c736ea" ON "user_followers" ("userId_2") `
    )
    await queryRunner.query(
      `ALTER TABLE "user_followers" ADD CONSTRAINT "FK_2932edbf0d52bf214db76f9fdad" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "user_followers" ADD CONSTRAINT "FK_364ef7e866eab323d0d3c736eac" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_followers" DROP CONSTRAINT "FK_364ef7e866eab323d0d3c736eac"`
    )
    await queryRunner.query(
      `ALTER TABLE "user_followers" DROP CONSTRAINT "FK_2932edbf0d52bf214db76f9fdad"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_364ef7e866eab323d0d3c736ea"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2932edbf0d52bf214db76f9fda"`
    )
    await queryRunner.query(`DROP TABLE "user_followers"`)
  }
}
