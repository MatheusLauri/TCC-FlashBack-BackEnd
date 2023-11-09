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
