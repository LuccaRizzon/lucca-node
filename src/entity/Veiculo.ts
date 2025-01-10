import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("veiculos")
export class Veiculo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 7, nullable: false })
    placa: string;

    @Column({ type: "varchar", length: 30, nullable: true })
    renavam: string;

    @Column({ type: "varchar", length: 20, nullable: false })
    modelo: string;

    @Column({ type: "varchar", length: 20, nullable: false })
    marca: string;

    @Column({ type: "int", nullable: false })
    ano: number;

    @Column({ type: "varchar", length: 20, nullable: false })
    cor: string;

    constructor(placa: string, renavam: string, modelo: string, marca: string, ano: number, cor: string) {
        this.placa = placa;
        this.renavam = renavam;
        this.modelo = modelo;
        this.marca = marca;
        this.ano = ano;
        this.cor = cor;
    }
}
