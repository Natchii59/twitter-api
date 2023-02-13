import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTweet1675898873310 implements MigrationInterface {
  name = 'CreateTweet1675898873310'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tweet" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_6dbf0db81305f2c096871a585f6" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "tweet" ADD CONSTRAINT "FK_d0f0cd7238f1c93d3e78f0fcdcf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tweet" DROP CONSTRAINT "FK_d0f0cd7238f1c93d3e78f0fcdcf"`
    )
    await queryRunner.query(`DROP TABLE "tweet"`)
  }
}
