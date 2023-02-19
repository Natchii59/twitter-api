import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRepliesToTweet1676716231531 implements MigrationInterface {
  name = 'AddRepliesToTweet1676716231531'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tweet" ADD "reply_to" uuid`)
    await queryRunner.query(
      `ALTER TABLE "tweet" ADD CONSTRAINT "FK_e5cc7f5b5fd21de00a3b41dede3" FOREIGN KEY ("reply_to") REFERENCES "tweet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tweet" DROP CONSTRAINT "FK_e5cc7f5b5fd21de00a3b41dede3"`
    )
    await queryRunner.query(`ALTER TABLE "tweet" DROP COLUMN "reply_to"`)
  }
}
