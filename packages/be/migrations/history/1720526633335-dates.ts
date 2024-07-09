import { MigrationInterface, QueryRunner } from "typeorm";

export class Dates1720526633335 implements MigrationInterface {
    name = 'Dates1720526633335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Todos" ALTER COLUMN "completed" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Todos" ALTER COLUMN "completed" SET DEFAULT true`);
    }

}
