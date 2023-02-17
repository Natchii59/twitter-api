import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initialisation1676639989488 implements MigrationInterface {
  name = 'Initialisation1676639989488'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "birthday" TIMESTAMP NOT NULL, "password" character varying NOT NULL, "resfresh_token" character varying, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "tweet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_6dbf0db81305f2c096871a585f6" PRIMARY KEY ("id"))`
    )
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
      `CREATE TABLE "tweets_likes" ("tweet_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_f6675c60a1a239f5f0893ffca1b" PRIMARY KEY ("tweet_id", "user_id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_f1add098cbfe2887eab7453982" ON "tweets_likes" ("tweet_id") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_b280c31e77c721cfb5bc962c19" ON "tweets_likes" ("user_id") `
    )
    await queryRunner.query(
      `CREATE TABLE "tweets_retweets" ("tweet_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_593318bec71b1c5d692b50d0515" PRIMARY KEY ("tweet_id", "user_id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_4c3db99cc5f02f97f14dafe90f" ON "tweets_retweets" ("tweet_id") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_999815e6b50ff8b144c3e1d8ad" ON "tweets_retweets" ("user_id") `
    )
    await queryRunner.query(
      `ALTER TABLE "tweet" ADD CONSTRAINT "FK_d0f0cd7238f1c93d3e78f0fcdcf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "user_followers" ADD CONSTRAINT "FK_2932edbf0d52bf214db76f9fdad" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "user_followers" ADD CONSTRAINT "FK_364ef7e866eab323d0d3c736eac" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" ADD CONSTRAINT "FK_f1add098cbfe2887eab74539827" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" ADD CONSTRAINT "FK_b280c31e77c721cfb5bc962c19b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_retweets" ADD CONSTRAINT "FK_4c3db99cc5f02f97f14dafe90f3" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_retweets" ADD CONSTRAINT "FK_999815e6b50ff8b144c3e1d8ada" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tweets_retweets" DROP CONSTRAINT "FK_999815e6b50ff8b144c3e1d8ada"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_retweets" DROP CONSTRAINT "FK_4c3db99cc5f02f97f14dafe90f3"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" DROP CONSTRAINT "FK_b280c31e77c721cfb5bc962c19b"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" DROP CONSTRAINT "FK_f1add098cbfe2887eab74539827"`
    )
    await queryRunner.query(
      `ALTER TABLE "user_followers" DROP CONSTRAINT "FK_364ef7e866eab323d0d3c736eac"`
    )
    await queryRunner.query(
      `ALTER TABLE "user_followers" DROP CONSTRAINT "FK_2932edbf0d52bf214db76f9fdad"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweet" DROP CONSTRAINT "FK_d0f0cd7238f1c93d3e78f0fcdcf"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_999815e6b50ff8b144c3e1d8ad"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4c3db99cc5f02f97f14dafe90f"`
    )
    await queryRunner.query(`DROP TABLE "tweets_retweets"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b280c31e77c721cfb5bc962c19"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f1add098cbfe2887eab7453982"`
    )
    await queryRunner.query(`DROP TABLE "tweets_likes"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_364ef7e866eab323d0d3c736ea"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2932edbf0d52bf214db76f9fda"`
    )
    await queryRunner.query(`DROP TABLE "user_followers"`)
    await queryRunner.query(`DROP TABLE "tweet"`)
    await queryRunner.query(`DROP TABLE "user"`)
  }
}
