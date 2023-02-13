import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCascadeForTweetLikes1675962994920
  implements MigrationInterface
{
  name = 'AddCascadeForTweetLikes1675962994920'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" DROP CONSTRAINT "FK_7bf0ba0da24d625fd2dba8d040e"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" ADD CONSTRAINT "FK_7bf0ba0da24d625fd2dba8d040e" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" DROP CONSTRAINT "FK_7bf0ba0da24d625fd2dba8d040e"`
    )
    await queryRunner.query(
      `ALTER TABLE "tweets_likes" ADD CONSTRAINT "FK_7bf0ba0da24d625fd2dba8d040e" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
