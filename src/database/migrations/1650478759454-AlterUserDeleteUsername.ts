import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";
import { QueryExpressionMap } from "typeorm/query-builder/QueryExpressionMap";

export class AlterUserDeleteUsername1650478759454 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "username");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "username",
            type: "varchar"
        }));
    }

}
