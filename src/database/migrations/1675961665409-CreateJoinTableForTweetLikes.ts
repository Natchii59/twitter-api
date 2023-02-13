import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateJoinTableForTweetLikes1675961665409
  implements MigrationInterface
{
  name = 'CreateJoinTableForTweetLikes1675961665409'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tweets_likes" ("tweet" integer NOT NULL, "user" uuid NOT NULL, CONSTRAINT "PK_0b58db2bc7eeeb6ce38b9e1aff9" PRIMARY KEY ("tweet", "user"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_4ffb5bb017880c4833de5da125" ON "tweets_likes" ("tweet") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_7bf0ba0da24d625fd2dba8d040" ON "tweets_likes" ("user") `
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" ADD CONSTRAINT "FK_4ffb5bb017880c4833de5da125b" FOREIGN KEY ("tweet") REFERENCES "tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" ADD CONSTRAINT "FK_7bf0ba0da24d625fd2dba8d040e" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" DROP CONSTRAINT "FK_7bf0ba0da24d625fd2dba8d040e"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" DROP CONSTRAINT "FK_4ffb5bb017880c4833de5da125b"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7bf0ba0da24d625fd2dba8d040"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4ffb5bb017880c4833de5da125"`
    )
    await queryRunner.query(`DROP TABLE "tweets_likes"`)
  }
}
