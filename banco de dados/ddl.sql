CREATE DATABASE INFOADB;
USE INFOADB;

-- CADASTRO USUARIOS ---------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE TB_CADASTRO_CLIENTE (

ID_CLIENTE 			INT PRIMARY KEY AUTO_INCREMENT,	
NM_CLIENTE 			VARCHAR(200),
NM_SOBRENOME 		VARCHAR(200),
DS_CPF 				VARCHAR(14)   UNIQUE,
DT_NASCIMENTO   	DATE,
DS_TELEFONE 		VARCHAR(15)   UNIQUE,
NM_USUARIO			VARCHAR(200),
DS_EMAIL 			VARCHAR(200)  UNIQUE,
DS_SENHA	 		VARCHAR(200),
DT_CADASTRO  		DATE
);


CREATE TABLE TB_FORMULARIO_EMPRESA (

ID_EMPRESA 					INT PRIMARY KEY AUTO_INCREMENT,
DS_CNPJ 					  VARCHAR(18),
NM_RAZAO_SOCIAL 		VARCHAR(200),
DS_EMAIL_EMPRESA 		VARCHAR(200),
DS_SENHA_EMPRESA 		VARCHAR(200)

);


CREATE TABLE TB_CADASTRO_EMPRESA (

ID_EMPRESA 					INT PRIMARY KEY AUTO_INCREMENT,
DS_CNPJ 					VARCHAR(18),
NM_RAZAO_SOCIAL 			VARCHAR(200),
DS_EMAIL_EMPRESA 			VARCHAR(200),
DS_SENHA_EMPRESA 			VARCHAR(200)

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


CREATE TABLE TB_LOCAL_EVENTO (

ID_LOCAL_EVENTO 		INT PRIMARY KEY AUTO_INCREMENT,
DS_CEP 					VARCHAR(15),
DS_LOGRADOURO 			VARCHAR(300),
DS_BAIRRO 				VARCHAR(200),
DS_LOCALIDADE 			VARCHAR(150),
DS_UF 					VARCHAR(3), 
DS_NUM              	VARCHAR(100)
    
);

INSERT INTO `infoadb`.`TB_CATEGORIA_INGRESSO` (`NM_CATEGORIA_INGRESSO`) 
	   VALUES ('Festas e Shows');
INSERT INTO `infoadb`.`TB_CATEGORIA_INGRESSO` (`NM_CATEGORIA_INGRESSO`) 
	   VALUES ('Teatros e Espetáculos');
INSERT INTO `infoadb`.`TB_CATEGORIA_INGRESSO` (`NM_CATEGORIA_INGRESSO`) 
	   VALUES ('Festas Juninas');
INSERT INTO `infoadb`.`TB_CATEGORIA_INGRESSO` (`NM_CATEGORIA_INGRESSO`) 
       VALUES ('Palestras e Congressos');
INSERT INTO `infoadb`.`TB_CATEGORIA_INGRESSO` (`NM_CATEGORIA_INGRESSO`) 
       VALUES ('Infantil');

CREATE TABLE TB_INGRESSO (

ID_INGRESSO 					INT PRIMARY KEY AUTO_INCREMENT,
ID_CATEGORIA_INGRESSO			INT,
ID_EMPRESA						INT,
ID_LOCAL_EVENTO 				INT,
NM_EVENTO 						VARCHAR(300),
DS_EVENTO 						VARCHAR(2000),
IMAGEM_INGRESSO 				VARCHAR(1000),
DT_CADASTRO						DATETIME,
BT_DESTAQUE						BOOL,

FOREIGN KEY (ID_CATEGORIA_INGRESSO) REFERENCES TB_CATEGORIA_INGRESSO (ID_CATEGORIA_INGRESSO),
FOREIGN KEY (ID_EMPRESA) REFERENCES TB_CADASTRO_EMPRESA (ID_EMPRESA),
FOREIGN KEY (ID_LOCAL_EVENTO) REFERENCES TB_LOCAL_EVENTO (ID_LOCAL_EVENTO)
   
);


CREATE TABLE TB_DATAS_INGRESSO (

ID_DATA_INGRESSO 				INT PRIMARY KEY AUTO_INCREMENT,
ID_INGRESSO						INT,
DT_INGRESSO						DATE,

FOREIGN KEY (ID_INGRESSO) REFERENCES TB_INGRESSO (ID_INGRESSO)

);


CREATE TABLE TB_HORARIOS_DATAS_INGRESSO (

ID_HORARIO_INGRESSO 				INT PRIMARY KEY AUTO_INCREMENT,
ID_DATA_INGRESSO					INT,
DS_HORARIO							TIME,

FOREIGN KEY (ID_DATA_INGRESSO) REFERENCES TB_DATAS_INGRESSO (ID_DATA_INGRESSO)

);


CREATE TABLE TB_TIPOS_INGRESSO (

ID_TIPO_INGRESSO 				INT PRIMARY KEY AUTO_INCREMENT,
ID_INGRESSO						INT,
NM_TIPO_INGRESSO 				VARCHAR(200),
QTD_TIPO_INGRESSO 				INT,
VL_PRECO_TIPO 					DECIMAL(15,2),

FOREIGN KEY (ID_INGRESSO) REFERENCES TB_INGRESSO(ID_INGRESSO)
   
);


-- TABELAS PEDIDO ---------------------------------------------------------------------------------------------------------------------------------


CREATE TABLE TB_CARTAO (

ID_CARTAO 			INT PRIMARY KEY AUTO_INCREMENT,
NR_CARTAO 			VARCHAR(100),
DT_VALIDADE 		VARCHAR(100),
NR_CVV 				VARCHAR(100)
    
);


CREATE TABLE TB_FORMA_PAGAMENTO (

ID_FORMA_PAGAMENTO 		INT PRIMARY KEY AUTO_INCREMENT,	
ID_CARTAO 				INT,

FOREIGN KEY (ID_CARTAO) REFERENCES TB_CARTAO (ID_CARTAO)
    
);


CREATE TABLE TB_PEDIDO_INGRESSO (

ID_PEDIDO_INGRESSO 		INT PRIMARY KEY AUTO_INCREMENT,
ID_CLIENTE 				INT, 
ID_INGRESSO 			INT,
ID_TIPO_INGRESSO		INT,
QTD_ITENS				INT,
    
FOREIGN KEY (ID_CLIENTE) REFERENCES TB_CADASTRO_CLIENTE (ID_CLIENTE),
FOREIGN KEY (ID_INGRESSO) REFERENCES TB_INGRESSO (ID_INGRESSO),
FOREIGN KEY (ID_TIPO_INGRESSO) REFERENCES TB_TIPOS_INGRESSO (ID_TIPO_INGRESSO)
);


CREATE TABLE TB_PEDIDO (

ID_PEDIDO 				    INT PRIMARY KEY AUTO_INCREMENT,
ID_PEDIDO_INGRESSO 			INT,
ID_FORMA_PAGAMENTO 			INT,
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
transferencia ingresso: 

http://localhost:5000/transferencia?email=ETS@GMAIL.COM&pedidoIngresso=1

-- Cliente
{
  "Nome": "Eric",
  "Sobrenome": "Tasa",
  "CPF": "499.333.100-90",
  "DataNasc": "2023-11-12",
  "Telefone": "(11) 96777-9088",
  "NomeUsuario": "Tuu",
  "Email": "epp@gmail.com",
  "Senha": "K@1BHBHBH"
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
  "Local": 1,
  "NomeEvento": "Siu",
  "Descricao": "ssdsd",
  "Destaque": false
}

--Datas

{
  "Ingresso": 1,
  "Data": "2023-10-11"
}

--Horarios

{
  "Data": 1,
  "Horario": "10:00:00"
}

--Tipo

{
  "Ingresso": 1,
  "Tipo": "Vip",
  "Quantidade": 800,
  "Preco": 40
}

--Local Evento 

{
  "CEP": "04866-000",
  "Logradouro": "Av. Castro",
  "Bairro": "Jd. Das Rosas",
  "Localidade": "São Paulo" ,
  "UF": "SP",
  "Numero": "2390"
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


-- Pedido


{
  "PedidoIngresso": 1,
  "FormaPagamento": 1,
  "Situacao": false 
}

-- Pedido ingresso


{
  "Cliente":2,
  "Ingresso": 3, 
  "TipoIngresso": 2,
  "Itens": 10
}


-- Compra 


{
  "Numero": "11",
  "Validade": "11",
  "Cvv":"11"
}


{
  "FormaDePag" : "2"
}


{
  "Cliente" : "1",
  "Ingresso" : "1",
  "TipoIngresso" :"1" ,
  "Qtd" : "50"
}


{
  "PedidoIngresso": "2",
  "FormaPagamento": "1",
  "Situacao": false
}


{
  "Cliente": "2",
  "Ingresso": "2",
  "Tipo": "2",
  "Qtd": "100"
}


{
  "situacao": "1"
}


