import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRetweetOnTweetsUser1676475302315 implements MigrationInterface {
  name = 'AddRetweetOnTweetsUser1676475302315'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tweets_retweets" ("tweet" uuid NOT NULL, "user" uuid NOT NULL, CONSTRAINT "PK_02e02e0e33096e4efabc2ea52c0" PRIMARY KEY ("tweet", "user"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_477acc38006cff3776e3b66f29" ON "tweets_retweets" ("tweet") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_2a47d93540a075af0720a776f9" ON "tweets_retweets" ("user") `
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_retweets" ADD CONSTRAINT "FK_477acc38006cff3776e3b66f293" FOREIGN KEY ("tweet") REFERENCES "tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_retweets" ADD CONSTRAINT "FK_2a47d93540a075af0720a776f99" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tweets_retweets" DROP CONSTRAINT "FK_2a47d93540a075af0720a776f99"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_retweets" DROP CONSTRAINT "FK_477acc38006cff3776e3b66f293"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2a47d93540a075af0720a776f9"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_477acc38006cff3776e3b66f29"`
    )
    await queryRunner.query(`DROP TABLE "tweets_retweets"`)
  }
}
