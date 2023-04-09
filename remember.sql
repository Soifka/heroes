CREATE TABLE customers(
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) 
);

CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10, 2)
);

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

DROP TABLE customers;
DROP TABLE products;
DROP TABLE orders;

INSERT INTO customers(name, email) VALUES
('John Doe', 'j.doe@mail.com'),
('Kate', 'kate@mail.com'),
('Mike', 'mike@mail.com'),
('He has ordered nothing', 'nothing@mail.com');

INSERT INTO products(name, price) VALUES
('Samsung', 1000),
('Huawei', 1500),
('This product wasn`t ordered', 777.77);

INSERT INTO orders(customer_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 2, 5),
(2, 2, 1),
(3, 1, 1);

SELECT * FROM orders
INNER JOIN customers ON orders.customer_id = customers.customer_id
INNER JOIN products ON orders.product_id = products.product_id;

SELECT * FROM customers
LEFT JOIN orders ON customers.customer_id = orders.customer_id
LEFT JOIN products ON orders.product_id = products.product_id;

SELECT * FROM orders
RIGHT JOIN customers ON orders.customer_id = customers.customer_id
RIGHT JOIN products ON orders.product_id = products.product_id;

SELECT * FROM customers
FULL OUTER JOIN orders ON customers.customer_id = orders.customer_id;


/* TASKS */

/*
1. Створити в цій базі даних таблицю з супергероями та супресилами.
Структуру таблицб оберіть самостійно.
У кожного супергероя може бути декілька суперсил, крім того, різні супергерої можуть мати однакові суперсили.
*/

CREATE TABLE heroes(
    hero_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    nickname VARCHAR(255)
);

CREATE TABLE powers(
    power_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE powers_to_heroes(
    hero_id INT,
    power_id INT,
    FOREIGN KEY (hero_id) REFERENCES heroes(hero_id),
    FOREIGN KEY (power_id) REFERENCES powers(power_id)
);

/*
2. Заповнити таблиці різними даними. Але зробити так, щоб було було не менше 3 супергероїв. 
Крім того, потрібно передбачити, щоб в таблиці суперсил були суперсили, які не належать жодному з супергероїв.
*/

INSERT INTO heroes(name, nickname) VALUES
('Tony Stark', 'Ironman'),
('Piter Parker', 'Spiderman'),
('Clark Kent', 'Superman');

INSERT INTO powers(description) VALUES
('superhuman strength'),
('flight'),
('superhuman speed'),
('x-ray vision'),
('superhuman hearing'),
('regeneration'),
('heightened senses'),
('genius intelligence'),
('superhuman durability'),
('healing factor'),
('superhuman reflexes'),
('wallcrawling');

INSERT INTO powers_to_heroes(hero_id, power_id) VALUES
(1, 6),
(1, 1),
(1, 2),
(1, 8),
(2, 1),
(2, 3),
(2, 12),
(2, 11),
(2, 10),
(2, 9),
(3, 1),
(3, 2),
(3, 3),
(3, 5),
(3, 7),
(3, 9),
(3, 10);

/*
3. Вивести всю інформацію з таблиці супергероїв.
*/

SELECT * FROM heroes;

/*
4. Вивести всю інформацію з таблиці суперсил.
*/

SELECT * FROM powers;

/*
5. Написати запит, щоб за ім'ям супергероя можна було отримати всю інформацію про супергероя та про його суперсили.
*/

SELECT pth.hero_id, h.nickname, pth.power_id, p.description 
FROM powers_to_heroes AS pth
JOIN heroes AS h 
ON pth.hero_id = h.hero_id
JOIN powers AS p 
ON pth.power_id = p.power_id
WHERE h.nickname = 'Ironman';

/*
6. Вивести всіх супергероїв, які мають суперсилу "здатність літати".
*/

SELECT pth.hero_id, h.nickname, pth.power_id, p.description 
FROM powers_to_heroes AS pth
JOIN heroes AS h 
ON pth.hero_id = h.hero_id
JOIN powers AS p 
ON pth.power_id = p.power_id
WHERE p.description = 'flight';

/*
7. Вивести супергероїв, у яких є співпадіння по суперсилам. Інформацію подати у вигляді:
інформація про супергероїв + інформація про суперсили, які повторюються
*/



/*
8. Знайти у таблиці суперсил топ-3 найбільш розповсюджені суперсили.

9. Знайти у таблиці суперсил такі сили, які не використовуються у жодного з супергероїв.

10. Видалити з таблиці супергероїв суперсили, які не використовуються.
Повернути назви видалених суперсил.

11. Підрахувати середню кількість суперсил, які використовуються у супергероїв.
Оновити ім'я для всіх супергероїв, які мають кількість суперсил >= наж середня:
на початок їх імені додати частку: "BOSS "...ім'я герою
(concat)

12. Додати до таблиці суперсил колонку "використовується", яка буде містити значення true, 
якщо суперсила використовується хоча б одним супергероєм, та false - якщо ні.

*/

DROP TABLE powers_to_heroes;
DROP TABLE powers;
DROP TABLE heroes;