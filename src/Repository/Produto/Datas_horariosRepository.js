import { con } from "../connection.js";


export async function InserirData (dataIngresso) {

    const comando = 
    `
    INSERT INTO TB_DATAS_INGRESSO(ID_INGRESSO, DT_INGRESSO)
	        VALUES (?, ?)
    `

    const [resposta] = await con.query (comando, 
        
        [
            dataIngresso.Ingresso,
            dataIngresso.Data
        ] 
    )

    dataIngresso.ID = resposta.insertId;

    return dataIngresso;

}


export async function InserirHorario (HorarioIngresso) {

    const comando = 
    `
    INSERT INTO  TB_HORARIOS_DATAS_INGRESSO(ID_DATA_INGRESSO, DS_HORARIO)
	        VALUES (?, ?)
    `

    const [resposta] = await con.query (comando, 
        
        [
            HorarioIngresso.Data,
            HorarioIngresso.Horario
        ] 
    )

    HorarioIngresso.ID = resposta.insertId;

    return HorarioIngresso;

}


export async function BuscarData_Compra (idIngresso) {

    const comando = 
    `
    SELECT 	ID_DATA_INGRESSO,
            DATE(DT_INGRESSO) AS DT_INGRESSO
        
        FROM 			TB_INGRESSO						INGRESSO
        INNER JOIN		TB_DATAS_INGRESSO				DATAS			ON DATAS.ID_INGRESSO = INGRESSO.ID_INGRESSO
        
        WHERE INGRESSO.ID_INGRESSO = ?
    `

    const [resposta] = await con.query (comando, [idIngresso])

    return resposta;

}


export async function BuscarData_CompraId (idData) {

    const comando = 
    `
    SELECT 	ID_HORARIO_INGRESSO,
		    DS_HORARIO
        
        FROM 			TB_INGRESSO						INGRESSO
        INNER JOIN		TB_DATAS_INGRESSO				DATAS			ON DATAS.ID_INGRESSO = INGRESSO.ID_INGRESSO
        INNER JOIN		TB_HORARIOS_DATAS_INGRESSO		HORARIOS		ON HORARIOS.ID_DATA_INGRESSO = DATAS.ID_DATA_INGRESSO
        
        WHERE DATAS.ID_DATA_INGRESSO = ?    
    `

    const [resposta] = await con.query (comando, [idData])

    return resposta;

}


export async function BuscarHorario_Compra (idData) {

    const comando = 
    `
    SELECT 	ID_HORARIO_INGRESSO,
		    DS_HORARIO
        
        FROM 			TB_INGRESSO						INGRESSO
        INNER JOIN		TB_DATAS_INGRESSO				DATAS			ON DATAS.ID_INGRESSO = INGRESSO.ID_INGRESSO
        INNER JOIN		TB_HORARIOS_DATAS_INGRESSO		HORARIOS		ON HORARIOS.ID_DATA_INGRESSO = DATAS.ID_DATA_INGRESSO
        
        WHERE   DATAS.ID_DATA_INGRESSO = ?
    `

    const [resposta] = await con.query (comando, [idData])

    return resposta;

}


export async function DeletarData(id) {

    const comando1 = 
    `
    DELETE FROM TB_HORARIOS_DATAS_INGRESSO
        WHERE   ID_DATA_INGRESSO = ?
    `

    const comando2 = 
    `
    DELETE FROM TB_DATAS_INGRESSO
        WHERE   ID_DATA_INGRESSO = ?
    `

    const [resposta] = await con.query (comando1, [id])
    const [resposta2] = await con.query (comando2, [id])

    return resposta2.affectedRows;
}


export async function DeletarHorario(id) {

    const comando = 
    `
    DELETE FROM TB_HORARIOS_DATAS_INGRESSO
        WHERE   ID_DATA_INGRESSO = ?
    `

    const [resposta] = await con.query (comando, [id])

    return resposta.affectedRows;
}