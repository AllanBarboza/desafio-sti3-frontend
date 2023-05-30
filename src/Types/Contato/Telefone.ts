export type Telefone = {
    id: string,
    descricao: TelefoneEnum
    numero: string
    clienteId: string
}


export enum TelefoneEnum {
    CASA = 'CASA',
    TRABALHO = 'TRABALHO',
    CELULAR = 'CELULAR'
}; 