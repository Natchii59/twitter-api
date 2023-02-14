import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePagination1676377200951 implements MigrationInterface {
  name = 'CreatePagination1676377200951'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "tweet" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" DROP CONSTRAINT "FK_4ffb5bb017880c4833de5da125b"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweet" DROP CONSTRAINT "PK_6dbf0db81305f2c096871a585f6"`
    )
    await queryRunner.query(`ALTER TABLE "tweet" DROP COLUMN "id"`)
    await queryRunner.query(
      `ALTER TABLE "tweet" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "tweet" ADD CONSTRAINT "PK_6dbf0db81305f2c096871a585f6" PRIMARY KEY ("id")`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" DROP CONSTRAINT "PK_0b58db2bc7eeeb6ce38b9e1aff9"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" ADD CONSTRAINT "PK_7bf0ba0da24d625fd2dba8d040e" PRIMARY KEY ("user")`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4ffb5bb017880c4833de5da125"`
    )
    await queryRunner.query(`ALTER TABLE "tweets_likes" DROP COLUMN "tweet"`)
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" ADD "tweet" uuid NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" DROP CONSTRAINT "PK_7bf0ba0da24d625fd2dba8d040e"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" ADD CONSTRAINT "PK_0b58db2bc7eeeb6ce38b9e1aff9" PRIMARY KEY ("user", "tweet")`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_4ffb5bb017880c4833de5da125" ON "tweets_likes" ("tweet") `
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" ADD CONSTRAINT "FK_4ffb5bb017880c4833de5da125b" FOREIGN KEY ("tweet") REFERENCES "tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" DROP CONSTRAINT "FK_4ffb5bb017880c4833de5da125b"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4ffb5bb017880c4833de5da125"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" DROP CONSTRAINT "PK_0b58db2bc7eeeb6ce38b9e1aff9"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" ADD CONSTRAINT "PK_7bf0ba0da24d625fd2dba8d040e" PRIMARY KEY ("user")`
    )
    await queryRunner.query(`ALTER TABLE "tweets_likes" DROP COLUMN "tweet"`)
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" ADD "tweet" integer NOT NULL`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_4ffb5bb017880c4833de5da125" ON "tweets_likes" ("tweet") `
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" DROP CONSTRAINT "PK_7bf0ba0da24d625fd2dba8d040e"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" ADD CONSTRAINT "PK_0b58db2bc7eeeb6ce38b9e1aff9" PRIMARY KEY ("tweet", "user")`
    )
    await queryRunner.query(
      `ALTER TABLE "tweet" DROP CONSTRAINT "PK_6dbf0db81305f2c096871a585f6"`
    )
    await queryRunner.query(`ALTER TABLE "tweet" DROP COLUMN "id"`)
    await queryRunner.query(`ALTER TABLE "tweet" ADD "id" SERIAL NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "tweet" ADD CONSTRAINT "PK_6dbf0db81305f2c096871a585f6" PRIMARY KEY ("id")`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" ADD CONSTRAINT "FK_4ffb5bb017880c4833de5da125b" FOREIGN KEY ("tweet") REFERENCES "tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(`ALTER TABLE "tweet" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`)
  }
}
