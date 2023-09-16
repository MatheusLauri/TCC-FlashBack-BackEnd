USE INFOADB;



-- CADASTRO USUARIOS ---------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE TB_CADASTRO_CLIENTE (

	ID_CLIENTE 			INT PRIMARY KEY AUTO_INCREMENT,	
	NM_CLIENTE 			VARCHAR(200),
	NM_SOBRENOME 		VARCHAR(200),
	DS_CPF 				VARCHAR(14),
	DS_TELEFONE 		VARCHAR(15),
	NM_USUARIO			VARCHAR(200),
	DS_EMAIL 			VARCHAR(200),
	DS_SENHA	 		VARCHAR(200)

);

CREATE TABLE TB_CADASTRO_EMPRESA (

	ID_EMPRESA 					INT PRIMARY KEY AUTO_INCREMENT,
	DS_CNPJ 					VARCHAR(18),
	NM_RAZAO_SOCIAL 			VARCHAR(200),
	DS_EMAIL_EMPRESA 			VARCHAR(200),
	DS_SENHA_EMPRESA 			VARCHAR(200),
	DS_ENDERECO_EMPRESA 		VARCHAR(200)

);

CREATE TABLE TB_CADASTRO_ADM (

	ID_ADM 				INT PRIMARY KEY AUTO_INCREMENT,
	DS_EMAIL_ADM 		VARCHAR(200),
	DS_SENHA_ADM 		VARCHAR(200)
    
);

-- CADASTRO INGRESSO ---------------------------------------------------------------------------------------------------------------------------------



CREATE TABLE TB_CATEGORIA_INGRESSO (

	ID_CATEGORIA_INGRESSO 		INT PRIMARY KEY AUTO_INCREMENT,
	NM_CATEGORIA_INGRESSO 		VARCHAR(200)
    
);


CREATE TABLE TB_TIPOS_INGRESSO (

	ID_TIPO_INGRESSO 				INT PRIMARY KEY AUTO_INCREMENT,
    ID_INGRESSO						INT,
	NM_TIPO_INGRESSO 				VARCHAR(200),
	QTD_TIPO_INGRESSO 				INT,
	NR_PRECO_TIPO 					INT,
    
   FOREIGN KEY (ID_INGRESSO) REFERENCES TB_INGRESSO(ID_INGRESSO)
   
);


CREATE TABLE TB_INGRESSO (

	ID_INGRESSO 						INT PRIMARY KEY AUTO_INCREMENT,
    ID_CATEGORIA_INGRESSO				INT,
    ID_EMPRESA							INT,
	NM_EVENTO 							VARCHAR(300),
	DT_INGRESSO 						DATETIME,
	DS_LOCAL 							VARCHAR(300),
	DS_EVENTO 							VARCHAR(2000),
	IMAGEM_INGRESSO 					VARCHAR(1000),
    
   FOREIGN KEY (ID_CATEGORIA_INGRESSO) REFERENCES TB_CATEGORIA_INGRESSO (ID_CATEGORIA_INGRESSO),
   FOREIGN KEY (ID_EMPRESA) REFERENCES TB_CADASTRO_EMPRESA (ID_EMPRESA)
   
);

-- Cliente
{
  "Nome": "Eric",
  "Sobrenome": "Tasa",
  "CPF": "499.333.100-90",
  "Telefone": "(11) 96777-9088",
  "NomeUsuario": "Tuu",
  "Email": "epp@gmail.com",
  "Senha": "123456"
}

--Empresa

{
  "CNPJ": "33344983983",
  "RazaoSocial": "MC donalds",
  "Email": "mc@gmail.com",
  "Senha": "1234",
  "Endereco": "av. para"
}

--Categoria

{
  "Categoria" : "Museu"
}


-- Ingresso 

{
	"Categoria": 1,
	"Empresa": 1,
	"NomeEvento": "Nuce",
	"Data": "2023-11-12 10:00:00",
	"Local": "Av. Mariia",
	"Descricao": "alha bays biuu"
}

--Tipo

{
  "Ingresso": 1,
  "Tipo": "Vip",
  "Quantidade": 800,
  "Preco": 40
}

