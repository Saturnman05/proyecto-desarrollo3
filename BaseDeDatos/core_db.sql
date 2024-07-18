create database core_db;

use core_db;

create table roles (
	rol_id int auto_increment,
    rol_name varchar(20) not null unique,
    primary key (rol_id)
);

create table actions (
	action_id int auto_increment,
    action_name varchar(20) not null unique,
    primary key (action_id)
);

create table rol_actions (
	rol_id int,
    action_id int,
    primary key (rol_id, action_id),
    foreign key (rol_id) references roles(rol_id),
    foreign key (action_id) references actions(action_id)
);

create table usuarios (
	user_id int auto_increment,
    username varchar(50) not null unique,
    password varchar(50) not null,
    full_name varchar(140),
    email varchar(200) unique,
    rol_id int not null,
    date_created timestamp not null default (now()),
    last_login timestamp not null default (now()),
    primary key (user_id),
    foreign key (rol_id) references roles(rol_id)
);

create table auditoria (
	auditoria_id int auto_increment,
    usuario_id int not null,
    action_id int not null,
    date_created timestamp not null default (now()),
    primary key (auditoria_id),
    foreign key (usuario_id) references usuarios(user_id),
    foreign key (action_id) references actions(action_id)
);

create table productos (
	product_id int auto_increment,
    name varchar(100) not null unique,
    description varchar(500) not null unique,
    image_url varchar(200),
    unit_price decimal(18,2) not null default (0),
    stock int not null default (0),
    date_created timestamp not null default (now()),
    primary key (product_id)
);

create table facturas (
	factura_id int auto_increment,
    rnc varchar(11),
    emission_date timestamp not null default (0),
    total_price decimal(18,2) not null default (0),
    user_id int not null,
    primary key (factura_id),
    foreign key (user_id) references usuarios(user_id)
);

create table factura_producto (
	factura_id int,
    product_id int,
    product_amount int not null default (0),
    product_unit_price decimal(18,2) not null default (0),
    primary key (factura_id, product_id),
    foreign key (factura_id) references facturas(factura_id),
    foreign key (product_id) references productos(product_id)
);

create table carrito (
	carrito_id int,
    user_id int not null,
    primary key (carrito_id),
    foreign key (user_id) references usuarios(user_id)
);

create table carrito_producto (
	carrito_id int,
    product_id int,
    primary key (carrito_id, product_id),
    foreign key (carrito_id) references carrito(carrito_id),
    foreign key (product_id) references productos(product_id)
);