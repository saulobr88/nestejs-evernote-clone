import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedTagsTable1679330709462 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "tags" ("name", "slug") VALUES 
      ('C/C++', 'c_cplusplus'),
      ('Java', 'java'),
      ('JavaScript', 'javascript'),
      ('Make', 'make'),
      ('Gcc', 'gcc'),
      ('Javac', 'javac'),
      ('Maven', 'maven'),
      ('Gradle', 'gradle'),
      ('NodeJs', 'nodejs'),
      ('Npm', 'npm'),
      ('Yarn', 'yarn'),
      ('TypeScript', 'typescript')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "tags" WHERE id>0`);
  }
}
