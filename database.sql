
-- 1 execute the below to create a database;
create database paw_test;
use paw_test;

-- 2 for roles table

CREATE TABLE Roles(roleid int NOT NULL PRIMARY KEY, role varchar(255) NOT NULL, role_desc VARCHAR(255) NOT NULL);
-- 3 execute below to create users table
 
 CREATE TABLE Users (username varchar(255) NOT NULL PRIMARY KEY, fname VARCHAR(255) NOT NULL, lname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, phno VARCHAR(255), password  VARCHAR(255) NOT NULL UNIQUE, role varchar(255) NOT NULL, roleid int NOT NULL,
  FOREIGN KEY (roleid) REFERENCES Roles(roleid));

-- 4 for security questions
CREATE TABLE Security(SQID int PRIMARY KEY NOT NULL AUTO_INCREMENT, username varchar(255) ,
 sq1 varchar(255)  default 'What would you name your pet?', sq2 VARCHAR(255) default 'What would you name your pets house?' , sq1_ans varchar(255) , sq2_ans varchar(255) ,
 FOREIGN KEY (username) REFERENCES users(username));
		     
-- 5 Booking table		

--  CREATE TABLE bookings(booking_id varchar(255) NOT NULL PRIMARY KEY, owner_name varchar(255) not null, renter_name varchar(255) not null, pet_id int not null, booking_duration int not null, rating int, rent_price int not null, booking_date datetime, FOREIGN KEY (renter_name) REFERENCES users(username));
 CREATE TABLE bookings(booking_id varchar(255) NOT NULL PRIMARY KEY,payment_amount int not null,booking_hours int not null,date datetime,owner varchar(255),renter varchar(255), status varchar(255), pet_id int);
-- 6 payments table

 create table payments(booking_id varchar(255) not null primary key,payment_amount varchar(255) not null,booking_hours int not null,date datetime not null,owner varchar(255) not null,status varchar(255) not null);

 
-- 7 approval table		     
		     
 CREATE TABLE  approval(booking_id varchar(255) not null, renter_name varchar(255) not null, owner_details varchar(255) not null,pet_id int, foreign key (booking_id) references bookings(booking_id));

-- 8 pets table		     
		     
		     
create table pets(id int PRIMARY KEY NOT NULL AUTO_INCREMENT, name varchar(255) not null, owner varchar(255), pet varchar(255) not null, age varchar(255) not null, breed varchar(255) not null, size varchar(255) not null, temp varchar(255) not null,
color varchar(255) not null, no_shedding boolean, no_biting boolean, non_allergic boolean, vaccinated boolean, image varchar(1000));
		     
-- ---OR alter the existing pets table:
		     
-- alter table pets add no_shedding boolean;
-- alter table pets add no_biting boolean;
-- alter table pets add non_allergic boolean;
-- alter table pets add vaccinated boolean;
-- alter table pets add image varchar(1000);

 --  9 Ratings table
 
 create table ratings(id int auto_increment primary key, booking_id varchar(255), rating int not null, username varchar(255), rating_given varchar(255),foreign key (booking_id) references bookings(booking_id));

---  10 Refunds table

create table refunds(refund_id int auto_increment primary key not null, booking_id varchar(255)  not null, refund_reason varchar(1000),  refund_requested varchar(255), refund_amount int, foreign key (booking_id) references bookings(booking_id));

-- aproval column in pets table 

alter table pets add column approval varchar(6);
update pets set approval='False' where approval is null;

alter table ratings add foreign key(username) references users(username);

ALTER TABLE pets
ADD amount int;
		     
-- DELETE FROM pets WHERE image IS NOT NULL;
-- alter table pets
-- modify image varchar(100);

-- address table
		     
CREATE TABLE address(AddressID int NOT NULL AUTO_INCREMENT  PRIMARY KEY, Address varchar(255) not null,
 City VARCHAR(100) NOT NULL, State varchar(50) not null, Country varchar(50) not null, Zipcode varchar(10) not null, 
 username varchar(50) not null, foreign key(username) references users(username));
		     
		     
-- create images table
-- create table images(image int PRIMARY KEY NOT NULL AUTO_INCREMENT, username varchar(255) not null, img varchar(1000) 
-- 		    not null, FOREIGN KEY (username) REFERENCES users(username));
		    
		    
		    
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---- create table complaints 
 create table complaints(booking_id varchar(255) not null primary key, pet varchar(255) not null, owner_name varchar(255) not null, renter_name varchar(255) not null, issue varchar(1000) not null, complaints_given varchar(255));

		     
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Drop address column from users table.
		     
-- alter table users drop column address;
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


-- insert in to users example:

-- INSERT INTO users(fname, lname, email, phno, password, role, roleid) VALUES('slash', 'G', 'slash@iu.edu', 3245423235, 'fewrewr','user', 3);

-- insert in to roles

INSERT INTO Roles(roleid , role, role_desc) VALUES(3, 'Admin',  'Approves the item added for rent, accepts customer complaints and routes it to the appropriate renter, issues a refund to the renter'),
    (2, 'Owner',  'The renter should be able to post the item for rent. View the information of the customer who rented the items/services.'),
    (1, 'Renter',  'A customer can choose the item/place for rent make payments, cancel rental bookings, lodge complaints, apply for refund.');

-- insert in to security
-- INSERT INTO Security (username, sq1, sq2, sq1_ans, sq2_ans) VALUES('EmmaSmith1944','What would you name your pet?','What would you name your pet home?','Olie','home');

-- -insert into pets table.
-- INSERT INTO pets (name, owner, pet, sex, DOB, age, breed, size, temperment, color, vaccinated, allergies,other) VALUES
-- ('Snowflake', 'Emma', 'cat', 'f','2020-11-12', 2, 'persian cat', 'medium', 'calm', 'cream', 'yes', 'None', 'No shedding'),
-- ('Coonie', 'Ester', 'cat', 'm','2021-12-23', 1, 'Maine coon', 'large', 'friendly', 'blue', 'yes', 'None', 'No biting'),
-- ('Buttercup', 'Adam', 'cat', 'f','2018-3-01', 4, 'Ragdoll', 'small', 'sociable', 'lilac', 'yes', 'None', 'Non-allergic'),
-- ('Cooper', 'Max', 'dog', 'm','2020-3-2', 1, 'German Shephard', 'large', 'Courageous', 'Sable', 'yes', 'None', 'No biting');
		     
-- insert into users
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('alse7656','ew','eqwe','alse@gmail.com','4233123490','passcode12','Renter',1);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Brown7612','Adam','Brown','Brown@gmail.com','3123245292','encrypt123','Owner',2);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('DanielR8186','Daniel','Ricardo','DanielR@gmail.com','3213023329','random323','Owner',2);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('EmmaSmith1944','Emma','Smith','EmmaSmith@gmail.com','8931334791','arbitrary123234','Owner',2);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('EsterJ3006','Ester','Jackson','EsterJ@gmail.com','3849324833','generated990@','Renter',1);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Grace8309','Alexa','Grace','Grace@gmail.com','3242348921','keycode9023','Renter',2);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Joy5658','Joy','Daniel','Joy@gmail.com','3424098723','code34325@123','Renter',1);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('lghanta355','Tejaswy','Ghanta','lghanta@iu.edu','23244113456','keyword','Owner',2);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Lizy4235','Lizy','McGuire','Lizy@gmail.com','4324123238','locked@79','Renter',1);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Maxmiller2857','Max','Miller','Maxmiller@gmail.com','4234891312','user8493','Owner',2);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Muser6601','Jerimiah','Muser','Muser@gmail.com','3425322490','hacked89','Owner',2);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('sainz8714','Carlos','Sainz','sainz,@iu.edu','1234459736','galsecode','Owner',2);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('svasire578','Sahithi','Vasireddy','svasire@iu.edu','8126064219','password','Owner',2);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('vlalwani467','Vanita','Lalwani','vlalwani@iu.edu','3214579313','passcode','Owner',2);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Williamson3626','Donald','Williamson','Williamson@iu.edu','4435234245','williamsom321','Owner',2);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('zorth768','Zachary','Orth','zorth@iu.edu','3244329471','code','Owner',2);
		     
		     
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		     
INSERT INTO `address` (`AddressID`,`Address`,`City`,`State`,`Country`,`Zipcode`,`username`) VALUES (1,'265 Ann Drive','Morganton','NE','USA','28655','EmmaSmith1944');
INSERT INTO `address` (`AddressID`,`Address`,`City`,`State`,`Country`,`Zipcode`,`username`) VALUES (2,'354 Poor House Drive','Lansdale','PA','USA','28655','Brown7612');
INSERT INTO `address` (`AddressID`,`Address`,`City`,`State`,`Country`,`Zipcode`,`username`) VALUES (3,'8991 Pine Ave','Marietta','GA','USA','28655','Maxmiller2857');
INSERT INTO `address` (`AddressID`,`Address`,`City`,`State`,`Country`,`Zipcode`,`username`) VALUES (4,'46 N. La Sierra Road','Owensboro','KY','USA','28655','Lizy4235');
INSERT INTO `address` (`AddressID`,`Address`,`City`,`State`,`Country`,`Zipcode`,`username`) VALUES (6,'3490 Ridgewood Dr Erlanger','NJ','KY','USA','32323','Grace8309');
INSERT INTO `address` (`AddressID`,`Address`,`City`,`State`,`Country`,`Zipcode`,`username`) VALUES (7,'301 E 18th St','Oakland','California','USA','94606','Muser6601');
INSERT INTO `address` (`AddressID`,`Address`,`City`,`State`,`Country`,`Zipcode`,`username`) VALUES (9,'3710 Rawlins St #1380','Dallas','Texas','USA','75219','DanielR8186');
INSERT INTO `address` (`AddressID`,`Address`,`City`,`State`,`Country`,`Zipcode`,`username`) VALUES (12,' 3128 Zimmerman Lane','er3','432','43','423','alse7656');
INSERT INTO `address` (`AddressID`,`Address`,`City`,`State`,`Country`,`Zipcode`,`username`) VALUES (14,'3er34','rew','wer','rwe','rew','werwe1002');
INSERT INTO `address` (`AddressID`,`Address`,`City`,`State`,`Country`,`Zipcode`,`username`) VALUES (15,' 3128 Zimmerman Lane','Los Angeles','California','USA','90071','Joy5658');
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`) VALUES (1,'Snowflake','Emma','Cat','Early age','Domestic Longhair','Medium','Active','White',NULL,NULL,NULL,NULL,NULL);
INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`) VALUES (2,'Coonie','Ester','Cat','Early age','Maine Coon','Large','Active','Brown',NULL,NULL,NULL,NULL,NULL);
INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`) VALUES (3,'Buttercup','Adam','Cat','Early age','Siamese','Small','Passive','Black',NULL,NULL,NULL,NULL,NULL);
INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`) VALUES (4,'Cooper','Max','Dog','Early age','German Shephard','Large','Active','White',NULL,NULL,NULL,NULL,NULL);
INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`) VALUES (5,'Blossom','Ellie','Cat','Middle Age','American Shorthair','Medium','Passive','White',NULL,NULL,NULL,NULL,NULL);
INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`) VALUES (6,'Snoie','George','Dog','Old Age','Golden Retriever','Small','Active','Brown',NULL,NULL,NULL,NULL,NULL);
INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`) VALUES (7,'Poodle','Alexa','Dog','Middle Age','French Bulldog','Medium','Active','Brown',NULL,NULL,NULL,NULL,NULL);
INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`) VALUES (8,'Daisy','Lizy','Cat','Old Age','Domestic Longhair','Large','Passive','White',NULL,NULL,NULL,NULL,NULL);

update pets a set owner=(select b.username from users b where a.owner=b.fname);
-- Role id changes:
-- ALTER TABLE users DROP FOREIGN KEY users_ibfk_1;
-- CREATE TABLE Roles(roleid int NOT NULL PRIMARY KEY, role varchar(255) NOT NULL, role_desc VARCHAR(255) NOT NULL);
-- INSERT INTO Roles(roleid , role, role_desc) VALUES(3, 'Admin',  'Approves the item added for rent, accepts customer complaints and routes it to the appropriate renter, issues a refund to the renter'),
--     (2, 'Owner',  'The renter should be able to post the item for rent. View the information of the customer who rented the items/services.'),
--     (1, 'Renter',  'A customer can choose the item/place for rent make payments, cancel rental bookings, lodge complaints, apply for refund.');
    
-- ALTER TABLE users
-- ADD FOREIGN KEY (roleid) REFERENCES roles(roleid);

-- Create:

------------------------------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO `payments` (`booking_id`,`payment_amount`,`booking_hours`,`date`,`owner`,`status`) VALUES ('4svasire578','10',1,'2022-11-25 00:00:00','svasire578','Approved');
INSERT INTO `payments` (`booking_id`,`payment_amount`,`booking_hours`,`date`,`owner`,`status`) VALUES ('8lghanta355','40',4,'2022-08-12 00:00:00','lghanta355','Approved');
INSERT INTO `payments` (`booking_id`,`payment_amount`,`booking_hours`,`date`,`owner`,`status`) VALUES ('Brown7612','30',3,'2022-09-09 00:00:00','Brown7612','Approved');
INSERT INTO `payments` (`booking_id`,`payment_amount`,`booking_hours`,`date`,`owner`,`status`) VALUES ('DanielR8186','10',1,'2022-11-19 00:00:00','DanielR8186','Approved');
INSERT INTO `payments` (`booking_id`,`payment_amount`,`booking_hours`,`date`,`owner`,`status`) VALUES ('Muser6601','40',4,'2022-03-22 00:00:00','Muser6601','Approved');


INSERT INTO `bookings` (`booking_id`,`payment_amount`,`booking_hours`,`date`,`owner`,`renter`,`status`,`pet_id`) VALUES ('4svasire578','10',1,'2022-11-25 00:00:00','svasire578','alse7656','Approved',12);
INSERT INTO `bookings` (`booking_id`,`payment_amount`,`booking_hours`,`date`,`owner`,`renter`,`status`,`pet_id`) VALUES ('8lghanta355','40',4,'2022-08-12 00:00:00','lghanta355','EsterJ3006','Approved',14);
INSERT INTO `bookings` (`booking_id`,`payment_amount`,`booking_hours`,`date`,`owner`,`renter`,`status`,`pet_id`) VALUES ('Brown7612','30',3,'2022-09-09 00:00:00','Brown7612','Grace8309','Approved',3);
INSERT INTO `bookings` (`booking_id`,`payment_amount`,`booking_hours`,`date`,`owner`,`renter`,`status`,`pet_id`) VALUES ('DanielR8186','10',1,'2022-11-19 00:00:00','DanielR8186','Joy5658','Approved',1);
INSERT INTO `bookings` (`booking_id`,`payment_amount`,`booking_hours`,`date`,`owner`,`renter`,`status`,`pet_id`) VALUES ('Muser6601','40',4,'2022-03-22 00:00:00','Muser6601','Lizy4235','Approved',4);


INSERT INTO `approval` (`booking_id`,`renter_name`,`owner_details`,`pet_id`) VALUES ('4svasire578','svasire578','svasire578',12);
INSERT INTO `approval` (`booking_id`,`renter_name`,`owner_details`,`pet_id`) VALUES ('8lghanta355','lghanta355','svasire578',14);
INSERT INTO `approval` (`booking_id`,`renter_name`,`owner_details`,`pet_id`) VALUES ('Brown7612','Brown7612','svasire578',3);
INSERT INTO `approval` (`booking_id`,`renter_name`,`owner_details`,`pet_id`) VALUES ('DanielR8186','DanielR8186','svasire578',1);
INSERT INTO `approval` (`booking_id`,`renter_name`,`owner_details`,`pet_id`) VALUES ('Muser6601','Muser6601','svasire578',4);

----------------------------------------------------------------------------------------------------------------------------

INSERT INTO `ratings` (`id`,`booking_id`,`rating`) VALUES (1, '4svasire578', 1);
INSERT INTO `ratings` (`id`,`booking_id`,`rating`) VALUES (2, '8lghanta355', 3);
INSERT INTO `ratings` (`id`,`booking_id`,`rating`) VALUES (3, 'Brown7612', 5);
INSERT INTO `ratings` (`id`,`booking_id`,`rating`) VALUES (4, 'DanielR8186', 4);

------------------------------------------------------------------------------------
 
INSERT INTO `complaints` (`booking_id`, `pet`, `owner_name`, `renter_name`, `issue`) VALUES (1, 'clove',  'alse7656', 'Brown7612', 'too much hair shedding');
INSERT INTO `complaints` (`booking_id`, `pet`, `owner_name`, `renter_name`, `issue`) VALUES (2, 'suuny',  'DanielR8186', 'EsterJ3006','the dog bites');
INSERT INTO `complaints` (`booking_id`, `pet`, `owner_name`, `renter_name`, `issue`) VALUES (3, 'maxie',  'lghanta@iu.edu', 'Joy@gmail.com','too hyper');
INSERT INTO `complaints` (`booking_id`, `pet`, `owner_name`, `renter_name`, `issue`) VALUES (4, 'puddle',  'Muser@gmail.com', 'Lizy@gmail.com','the dog has alegeries which are not listed');

----------------------------------------------------------------------------------------
INSERT INTO `refunds` (`refund_id`, `booking_id`, `refund_reason`) VALUES (1, 1,'pet got allergy');
INSERT INTO `refunds` (`refund_id`, `booking_id`, `refund_reason`) VALUES (2, 2,'pet not same as description');
INSERT INTO `refunds` (`refund_id`, `booking_id`, `refund_reason`) VALUES (3, 3,'pet got ill');
INSERT INTO `refunds` (`refund_id`, `booking_id`, `refund_reason`) VALUES (4, 4,'pet sheds alot of hair and makes home dirty');

  
  
  update pets set approval='False' where id is not null;
   
  update pets set approval='True' where id in (select pet_id from approval);
  
  ---------------------------------------------------------------------
  
  
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Alison101','Alison','Grey','alison@gmail.com','3123986102','pass2343','Admin',3);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Henry324','Henry','Cavil','Cavil@gmail.com','4324353242','Henry101','Admin',3);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Mable323','Mable','Coleman','Coleman@gmail.com','4325429861','Cole4324','Admin',3);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('JudyS32','Judy','Smith','Jsmith@gmail.com','4355224521','Jsmith432','Admin',3);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('spencer782','Duke','Spencer','Dukespencer@gmail.com','4324789823','Dukes','Admin',3);

  
 
 
 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (1,'alse7656','What would you name your pet?','What would you name your pets house?','polly','home');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (2,'EsterJ3006','What would you name your pet?','What would you name your pets house?','snoopie','den');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (3,'Joy5658','What would you name your pet?','What would you name your pets house?','cooper','cave');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (4,'Lizy4235','What would you name your pet?','What would you name your pets house?','poodle','pud');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (5,'Brown7612','What would you name your pet?','What would you name your pets house?','Pepsi','cola');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (6,'DanielR8186','What would you name your pet?','What would you name your pets house?','oreo','cream');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (7,'EmmaSmith1944','What would you name your pet?','What would you name your pets house?','zeus','thunder');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (8,'Grace8309','What would you name your pet?','What would you name your pets house?','harley','ride');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (9,'lghanta355','What would you name your pet?','What would you name your pets house?','dexter','lab');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (10,'Maxmiller2857','What would you name your pet?','What would you name your pets house?','piper','pied');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (11,'Muser6601','What would you name your pet?','What would you name your pets house?','ginger','bread');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (12,'sainz8714','What would you name your pet?','What would you name your pets house?','hazel','nut');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (13,'svasire578','What would you name your pet?','What would you name your pets house?','teddy','den');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (14,'vlalwani467','What would you name your pet?','What would you name your pets house?','ollie','olie');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (15,'Williamson3626','What would you name your pet?','What would you name your pets house?','Blitz','butter');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (16,'zorth768','What would you name your pet?','What would you name your pets house?','harry','hen');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (17,'Alison101','What would you name your pet?','What would you name your pets house?','nami','wave');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (18,'Henry324','What would you name your pet?','What would you name your pets house?','yuzu','house');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (19,'JudyS32','What would you name your pet?','What would you name your pets house?','sushi','[ot');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (20,'Mable323','What would you name your pet?','What would you name your pets house?','beige','bun');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (21,'spencer782','What would you name your pet?','What would you name your pets house?','cookie','dough');
 

