import { MigrationInterface, QueryRunner } from "typeorm";

export class Dates1720526218358 implements MigrationInterface {
    name = 'Dates1720526218358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Todos" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Todos" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Todos" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "Todos" DROP COLUMN "created_at"`);
    }

}
