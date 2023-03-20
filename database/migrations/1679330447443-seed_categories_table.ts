import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedCategoriesTable1679330447443 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "categories" ("name", "slug") VALUES ('To do', 'todo'),('Doing', 'doing'),('Done', 'done')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "categories" WHERE name='To do' OR name='Doing' OR name='Done'`,
    );
  }
}
