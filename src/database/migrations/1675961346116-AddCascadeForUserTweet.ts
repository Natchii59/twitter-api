import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCascadeForUserTweet1675961346116 implements MigrationInterface {
  name = 'AddCascadeForUserTweet1675961346116'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tweet" DROP CONSTRAINT "FK_d0f0cd7238f1c93d3e78f0fcdcf"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweet" ADD CONSTRAINT "FK_d0f0cd7238f1c93d3e78f0fcdcf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tweet" DROP CONSTRAINT "FK_d0f0cd7238f1c93d3e78f0fcdcf"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweet" ADD CONSTRAINT "FK_d0f0cd7238f1c93d3e78f0fcdcf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
