import { MigrationInterface, QueryRunner } from 'typeorm';

export class createNotesTable1680034571958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notes" (
        "id" SERIAL NOT NULL,
        "title" character varying NOT NULL,
        "body" text NOT NULL,
        "category_id" integer REFERENCES categories (id) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_notes_table" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "notes"`);
  }
}
