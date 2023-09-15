USE INFOADB;

-- INSERTS ----------------------------------------------------------------------------------------------------------

INSERT INTO TB_CADASTRO_CLIENTE (NM_CLIENTE, NM_SOBRENOME, DS_CPF, DS_TELEFONE, NM_USUARIO, DS_EMAIL, DS_SENHA)
	VALUE (?, ?, ?, ?, ?, ?, ?);
    

INSERT INTO TB_CADASTRO_EMPRESA (DS_CNPJ, NM_RAZAO_SOCIAL, DS_EMAIL_EMPRESA, DS_SENHA_EMPRESA, DS_ENDERECO_EMPRESA)
	VALUE (?, ?, ?, ?, ?);
    
-- -----------------------------------------------------------------------------------------------------------------
    

SELECT * FROM TB_CADASTRO_CLIENTE;
SELECT * FROM TB_CADASTRO_EMPRESA;
SELECT * FROM TB_CADASTRO_ADM;