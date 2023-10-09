USE INFOADB;

-- CADASTRO USUARIOS ---------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE TB_CADASTRO_CLIENTE (

	ID_CLIENTE 			INT PRIMARY KEY AUTO_INCREMENT,	
	NM_CLIENTE 			VARCHAR(200),
	NM_SOBRENOME 		VARCHAR(200),
	DS_CPF 				  VARCHAR(14)   UNIQUE,
	DS_TELEFONE 		VARCHAR(15)   UNIQUE,
	NM_USUARIO			VARCHAR(200),
	DS_EMAIL 			  VARCHAR(200)  UNIQUE,
	DS_SENHA	 		  VARCHAR(200)

);


CREATE TABLE TB_CADASTRO_EMPRESA (

	ID_EMPRESA 					  INT PRIMARY KEY AUTO_INCREMENT,
	DS_CNPJ 					    VARCHAR(18),
	NM_RAZAO_SOCIAL 			VARCHAR(200),
	DS_EMAIL_EMPRESA 			VARCHAR(200),
	DS_SENHA_EMPRESA 			VARCHAR(200)

);

CREATE TABLE TB_CADASTRO_ADM (

	ID_ADM 				  INT PRIMARY KEY AUTO_INCREMENT,
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
  ID_INGRESSO						  INT,
	NM_TIPO_INGRESSO 				VARCHAR(200),
	QTD_TIPO_INGRESSO 			INT,
	VL_PRECO_TIPO 					DECIMAL(15,2),
    
   FOREIGN KEY (ID_INGRESSO) REFERENCES TB_INGRESSO(ID_INGRESSO)
   
);


CREATE TABLE TB_LOCAL_EVENTO (

	ID_LOCAL_EVENTO 		INT PRIMARY KEY AUTO_INCREMENT,
	DS_CEP 					    VARCHAR(15),
	DS_LOGRADOURO 			VARCHAR(300),
	DS_BAIRRO 				  VARCHAR(200),
	DS_LOCALIDADE 			VARCHAR(150),
	DS_UF 					    VARCHAR(3)
    
);



CREATE TABLE TB_INGRESSO (

	  ID_INGRESSO 					INT PRIMARY KEY AUTO_INCREMENT,
    ID_CATEGORIA_INGRESSO	INT,
    ID_EMPRESA						INT,
    ID_LOCAL_EVENTO 			INT,
	  NM_EVENTO 						VARCHAR(300),
	  DS_EVENTO 						VARCHAR(2000),
    DT_COMECO							DATETIME,
	  DT_FIM 								DATETIME,
    IMAGEM_INGRESSO 			VARCHAR(1000),
    DT_CADASTRO						DATETIME,
    BT_DESTAQUE						BOOL,
    
   FOREIGN KEY (ID_CATEGORIA_INGRESSO) REFERENCES TB_CATEGORIA_INGRESSO (ID_CATEGORIA_INGRESSO),
   FOREIGN KEY (ID_EMPRESA) REFERENCES TB_CADASTRO_EMPRESA (ID_EMPRESA),
   FOREIGN KEY (ID_LOCAL_EVENTO) REFERENCES TB_LOCAL_EVENTO (ID_LOCAL_EVENTO)
   
);


-- TABELAS PEDIDO ---------------------------------------------------------------------------------------------------------------------------------


CREATE TABLE TB_CARTAO (

	ID_CARTAO 			INT PRIMARY KEY AUTO_INCREMENT,
	NR_CARTAO 			INT,
	DT_VALIDADE 		DATE,
	NR_CVV 				  INT
    
);


CREATE TABLE TB_FORMA_PAGAMENTO (
	ID_FORMA_PAGAMENTO 		INT PRIMARY KEY AUTO_INCREMENT,	
	ID_CARTAO 				    INT,
	
	FOREIGN KEY (ID_CARTAO) REFERENCES TB_CARTAO (ID_CARTAO)
);


CREATE TABLE TB_PEDIDO_INGRESSO (

	ID_PEDIDO_INGRESSO 		INT PRIMARY KEY AUTO_INCREMENT,
	ID_CLIENTE 				    INT, 
	ID_INGRESSO 			    INT,
  ID_TIPO_INGRESSO		  INT,
  QTD_ITENS				      INT,
    
	FOREIGN KEY (ID_CLIENTE) REFERENCES TB_CADASTRO_CLIENTE (ID_CLIENTE),
  FOREIGN KEY (ID_INGRESSO) REFERENCES TB_INGRESSO (ID_INGRESSO),
  FOREIGN KEY (ID_TIPO_INGRESSO) REFERENCES TB_TIPOS_INGRESSO (ID_TIPO_INGRESSO)
);


CREATE TABLE TB_PEDIDO (

	ID_PEDIDO 				    INT PRIMARY KEY AUTO_INCREMENT,
	ID_PEDIDO_INGRESSO 		INT,
	ID_FORMA_PAGAMENTO 		INT,
	DT_PEDIDO 				    DATETIME,
	BT_SITUACAO 			    BOOL,
	
  FOREIGN KEY (ID_PEDIDO_INGRESSO) REFERENCES TB_PEDIDO_INGRESSO (ID_PEDIDO_INGRESSO),
  FOREIGN KEY (ID_FORMA_PAGAMENTO) REFERENCES TB_FORMA_PAGAMENTO (ID_FORMA_PAGAMENTO)
);


DROP TABLE TB_TIPOS_INGRESSO;
DROP TABLE TB_INGRESSO;
DROP TABLE TB_PEDIDO_INGRESSO;
DROP TABLE TB_PEDIDO;
DROP TABLE TB_CATEGORIA_INGRESSO;


-- CADASTROS E ALTERAÇÕES ----------------------------------------------------------------------------------------------


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
}

--Categoria

{
  "Categoria" : "Museu"
}


-- Ingresso 

{
  "Categoria": 1,
  "Empresa": 1,
  "NomeEvento": "Siu",
  "Descricao": "ssdsd",
  "DataComeco": "2023-11-12 20:00:00",
  "DataFim": "2024-11-12 21:00:00",
  "Destaque": false
}

--Tipo

{
  "Ingresso": 1,
  "Tipo": "Vip",
  "Quantidade": 800,
  "Preco": 40
}



-- LOGINS ----------------------------------------------------------------------------------------------


--Adm

{
  "email": "OIII",
  "senha": 1234
}

-- Empresa

{
  "cnpj": "33344983983",
  "senha": "1234"
}

{
  "email": "mc@gmail.com",
  "senha": "1234"
}

-- Cliente

{
  "email": "epp@gmail.com",
  "senha": "123456"
}

{
  "NomeUsuario": "Tuu",
  "senha": "123456"
}

{
  "cpf": "499.333.100-90",
  "senha": "123456"
}
