USE INFOADB;

-- INSERTS USERS ----------------------------------------------------------------------------------------------------------

INSERT INTO TB_CADASTRO_CLIENTE (NM_CLIENTE, NM_SOBRENOME, DS_CPF, DS_TELEFONE, NM_USUARIO, DS_EMAIL, DS_SENHA)
	VALUE (?, ?, ?, ?, ?, ?, ?);
    

INSERT INTO TB_CADASTRO_EMPRESA (DS_CNPJ, NM_RAZAO_SOCIAL, DS_EMAIL_EMPRESA, DS_SENHA_EMPRESA, DS_ENDERECO_EMPRESA)
	VALUE (?, ?, ?, ?, ?);
    
-- SELECTS USERS -----------------------------------------------------------------------------------------------------------------
    

SELECT * FROM TB_CADASTRO_CLIENTE;
SELECT * FROM TB_CADASTRO_EMPRESA;
SELECT * FROM TB_CADASTRO_ADM;


-- INSERTS PRODUTO--------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO TB_CATEGORIA_INGRESSO(NM_CATEGORIA_INGRESSO)
	   VALUES ("Museu");
       
INSERT INTO TB_INGRESSO(ID_CATEGORIA_INGRESSO, ID_EMPRESA, NM_EVENTO, DT_INGRESSO, DS_LOCAL, DS_EVENTO)
	   VALUES (1, 1, "Nuuuu", '2023-10-12 20:00:00', "Av. Maa", "Bebidas Dorgas bla bla sex");
       
INSERT INTO TB_TIPOS_INGRESSO (ID_INGRESSO, NM_TIPO_INGRESSO, QTD_TIPO_INGRESSO, NR_PRECO_TIPO) 
	   VALUES (2, "Front", 100, 200);	

-- SELECTS PRODUTO --------------------------------------------------------------------------------------------------------------------------------------------       

select * from TB_TIPOS_INGRESSO;
select * from TB_CATEGORIA_INGRESSO;
select * from TB_CADASTRO_EMPRESA;

select * from TB_INGRESSO;


SELECT  NM_CATEGORIA_INGRESSO,
		NM_TIPO_INGRESSO, 
        QTD_TIPO_INGRESSO, 
        NR_PRECO_TIPO, 
        NM_EVENTO, 
        DT_INGRESSO, 
        DS_LOCAL, 
        DS_EVENTO
	FROM 			TB_INGRESSO						INGRESSO
	INNER JOIN 		TB_CATEGORIA_INGRESSO 	 		CATEGORIA		ON CATEGORIA.ID_CATEGORIA_INGRESSO = INGRESSO.ID_CATEGORIA_INGRESSO
    INNER JOIN 		TB_TIPOS_INGRESSO   				TIPO 		ON TIPO.ID_INGRESSO = INGRESSO.ID_INGRESSO
      ORDER BY  	NM_CATEGORIA_INGRESSO, NM_TIPO_INGRESSO; 
      

TRUNCATE TABLE TB_TIPOS_INGRESSO;

ALTER TABLE TB_INGRESSO AUTO_INCREMENT = 1;

UPDATE TB_INGRESSO
                SET     ID_CATEGORIA_INGRESSO   = ?, 
                        ID_EMPRESA              = ?, 
                        NM_EVENTO               = ?, 
                        DT_INGRESSO             = ?, 
                        DS_LOCAL                = ?, 
                        DS_EVENTO               = ?
                WHERE 	ID_INGRESSO = ?;
