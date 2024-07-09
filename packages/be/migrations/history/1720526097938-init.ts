import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1720526097938 implements MigrationInterface {
    name = 'Init1720526097938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Todos" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_649ae54c6a080fbd34f1a9e53f9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Todos"`);
    }

}
