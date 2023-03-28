import { MigrationInterface, QueryRunner } from 'typeorm';

export class createNoteTagTable1680035223837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "note_tag" (
          "id" SERIAL NOT NULL,
          "note_id" integer REFERENCES notes (id) NOT NULL,
          "tag_id" integer REFERENCES tags (id) NOT NULL,
          CONSTRAINT "PK_note_tag_table" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "note_tag"`);
  }
}
