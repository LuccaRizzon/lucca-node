import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Veiculo } from "./Veiculo";

@Entity("motoristas")
export class Motorista {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 200, nullable: false })
    nome: string;

    @Column({ type: "varchar", length: 20, nullable: false })
    rg: string;

    @Column({ type: "varchar", length: 11, nullable: false })
    cpf: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    telefone: string;

    @OneToOne(() => Veiculo, { nullable: false })
    @JoinColumn()
    veiculo: Veiculo;

    constructor(nome: string, rg: string, cpf: string, telefone: string, veiculo: Veiculo) {
        this.nome = nome;
        this.rg = rg;
        this.cpf = cpf;
        this.telefone = telefone;
        this.veiculo = veiculo;
    }
}
