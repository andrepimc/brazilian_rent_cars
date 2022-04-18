import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategories1650282826713 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "categories",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "name",
                            type: "varchar", //é o string para o banco de dados
                        },
                        {
                            name: "description",
                            type: "varchar", //é o string para o banco de dados
                        },
                        {
                            name: "created_at",
                            type: "timestamp", //é o string para o banco de dados
                            default: "now()"
                        }
                    ]  
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories"); //cancela toda a tabela sendo criada caso houver erro
    }


}
