/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     16/01/2016 14:49:14                          */
/*==============================================================*/


drop table if exists DOCENTE;

drop table if exists EVALUACION;

drop table if exists HORARIO;

drop table if exists LIBRO;

drop table if exists LIBRO_METOD;

drop table if exists MATERIA;

drop table if exists METODOLOGIA;

drop table if exists PLAN_ESTUDIOS;

drop table if exists PLAN_GLOBAL;

drop table if exists PRE_REQUISITOS;

drop table if exists TIPO_EVALUACION;

drop table if exists UNIDAD_DIDACTICA;

/*==============================================================*/
/* Table: DOCENTE                                               */
/*==============================================================*/
create table DOCENTE
(
   COD_SIS_DOC          varchar(10) not null,
   NOMBRE_DOC           varchar(30),
   DIRECCION_DOC        varchar(30),
   TELEFONO_DOC         varchar(10),
   EMAIL_DOC            varchar(30),
   primary key (COD_SIS_DOC)
);

/*==============================================================*/
/* Table: EVALUACION                                            */
/*==============================================================*/
create table EVALUACION
(
   ID_EVALUACION        int not null auto_increment,
   ID_TIPO_EVA          int not null,
   COD_PG               int not null,
   DESCRIPCION_EVA      text,
   PUNTAJE1             int,
   PUNTAJE2             int,
   primary key (ID_EVALUACION)
);

/*==============================================================*/
/* Table: HORARIO                                               */
/*==============================================================*/
create table HORARIO
(
   COD_HORARIO          int not null auto_increment,
   COD_SIS_MAT          varchar(20),
   DIA                  varchar(10),
   HORA                 time,
   AULA                 varchar(10),
   primary key (COD_HORARIO)
);

/*==============================================================*/
/* Table: LIBRO                                                 */
/*==============================================================*/
create table LIBRO
(
   ID_LIBRO             varchar(10) not null,
   AUTOR                varchar(50),
   TITULO               varchar(100),
   EDITORIAL            varchar(50),
   ANIO_PUBLICACION     varchar(12),
   primary key (ID_LIBRO)
);

/*==============================================================*/
/* Table: LIBRO_METOD                                           */
/*==============================================================*/
create table LIBRO_METOD
(
   ID_MET               int not null,
   ID_LIBRO             varchar(10) not null,
   primary key (ID_MET, ID_LIBRO)
);

/*==============================================================*/
/* Table: MATERIA                                               */
/*==============================================================*/
create table MATERIA
(
   COD_SIS_MAT          varchar(20) not null,
   ID_CARRERA           varchar(30) not null,
   COD_SIS_DOC          varchar(10) not null,
   SIGLA_MATERIA        varchar(10),
   ASIGNATURA           varchar(30),
   NIVEL_MATERIA        varchar(50),
   AREA_COORD_VERT      text,
   AREA_COORD_HOR       text,
   GRUPO                varchar(10),
   primary key (COD_SIS_MAT)
);

/*==============================================================*/
/* Table: METODOLOGIA                                           */
/*==============================================================*/
create table METODOLOGIA
(
   ID_MET               int not null auto_increment,
   TECNICA_MET          text,
   EVALUACION_MET       text,
   primary key (ID_MET)
);

/*==============================================================*/
/* Table: PLAN_ESTUDIOS                                         */
/*==============================================================*/
create table PLAN_ESTUDIOS
(
   ID_CARRERA           varchar(30) not null,
   NOMBRE_CARRERA       varchar(30),
   DIRECTORA_CARRERA    varchar(30),
   LOGO                 longblob,
   LEMA                 varchar(200),
   CARACTERIZACION      varchar(30),
   primary key (ID_CARRERA)
);

/*==============================================================*/
/* Table: PLAN_GLOBAL                                           */
/*==============================================================*/
create table PLAN_GLOBAL
(
   COD_PG               int not null auto_increment,
   COD_SIS_MAT          varchar(20),
   JUSTIF_RAZON         text,
   JUSTIF_PORQUE        text,
   JUSTIF_ENQUE         text,
   PROPOSITO_GRAL       text,
   OBJETIVO_GRAL        text,
   CRONOGRAMA           longblob,
   primary key (COD_PG)
);

/*==============================================================*/
/* Table: PRE_REQUISITOS                                        */
/*==============================================================*/
create table PRE_REQUISITOS
(
   COD_SIS_MAT          varchar(20),
   MAT_COD_SIS_MAT      varchar(20) not null,
   COD_PREREQUISITO     varchar(10)
);

/*==============================================================*/
/* Table: TIPO_EVALUACION                                       */
/*==============================================================*/
create table TIPO_EVALUACION
(
   ID_TIPO_EVA          int not null auto_increment,
   NOMBRE_TIPO          varchar(20),
   primary key (ID_TIPO_EVA)
);

/*==============================================================*/
/* Table: UNIDAD_DIDACTICA                                      */
/*==============================================================*/
create table UNIDAD_DIDACTICA
(
   ID_UNI               int not null auto_increment,
   COD_PG               int not null,
   ID_MET               int,
   NOMBRE_UNI           varchar(50),
   DURACION_UNI         int,
   OBJETIVO_UNI         text,
   CONTENIDO_UNI        text,
   primary key (ID_UNI)
);

alter table EVALUACION add constraint FK_CONTIENE foreign key (ID_TIPO_EVA)
      references TIPO_EVALUACION (ID_TIPO_EVA) on delete restrict on update restrict;

alter table EVALUACION add constraint FK_POSEE foreign key (COD_PG)
      references PLAN_GLOBAL (COD_PG) on delete restrict on update restrict;

alter table HORARIO add constraint FK_TIENE_UN foreign key (COD_SIS_MAT)
      references MATERIA (COD_SIS_MAT) on delete restrict on update restrict;

alter table LIBRO_METOD add constraint FK_LIBRO_METOD foreign key (ID_MET)
      references METODOLOGIA (ID_MET) on delete restrict on update restrict;

alter table LIBRO_METOD add constraint FK_LIBRO_METOD2 foreign key (ID_LIBRO)
      references LIBRO (ID_LIBRO) on delete restrict on update restrict;

alter table MATERIA add constraint FK_DICTA_UNA foreign key (COD_SIS_DOC)
      references DOCENTE (COD_SIS_DOC) on delete restrict on update restrict;

alter table MATERIA add constraint FK_TIENE_VARIAS foreign key (ID_CARRERA)
      references PLAN_ESTUDIOS (ID_CARRERA) on delete restrict on update restrict;

alter table PLAN_GLOBAL add constraint FK_TIENE1 foreign key (COD_SIS_MAT)
      references MATERIA (COD_SIS_MAT) on delete restrict on update restrict;

alter table PRE_REQUISITOS add constraint FK_TIENE foreign key (MAT_COD_SIS_MAT)
      references MATERIA (COD_SIS_MAT) on delete restrict on update restrict;

alter table PRE_REQUISITOS add constraint FK_TIENE_VARIOS foreign key (COD_SIS_MAT)
      references MATERIA (COD_SIS_MAT) on delete restrict on update restrict;

alter table UNIDAD_DIDACTICA add constraint FK_SIGUE_UNA foreign key (ID_MET)
      references METODOLOGIA (ID_MET) on delete restrict on update restrict;

alter table UNIDAD_DIDACTICA add constraint FK_TIENE_UNA foreign key (COD_PG)
      references PLAN_GLOBAL (COD_PG) on delete restrict on update restrict;

