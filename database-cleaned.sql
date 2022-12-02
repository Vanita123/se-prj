
-- 1 execute the below to create a database;
create database pawsome;
use pawsome;

-- 3 execute below to create users table
 
 CREATE TABLE Users (username varchar(255) NOT NULL PRIMARY KEY, fname VARCHAR(255) NOT NULL, lname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, phno VARCHAR(255), password  VARCHAR(255) NOT NULL UNIQUE, role varchar(255) NOT NULL, roleid int NOT NULL);

-- users data

INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('alse7656','ew','eqwe','alse@gmail.com','4233123490','passcode12','Renter',1);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('EsterJ3006','Ester','Jackson','EsterJ@gmail.com','3849324833','generated990@','Renter',1);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Brown7612','Adam','Brown','Brown@gmail.com','3123245292','encrypt123','Owner',2);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('DanielR8186','Daniel','Ricardo','DanielR@gmail.com','3213023329','random323','Owner',2);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Sahithi101','Sahithi','V','sahithi@gmail.com','3123986102','pass2343','Admin',3);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Vanita324','Vanita','L','vanitha@gmail.com','4324353242','vanitha101','Admin',3);
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Tejaswy324','Tejaswy','G','gltejaswi@gmail.com','4324353242','tejaswy101','Admin',3);

-- new data -- 
INSERT INTO `users` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Admin123','Pawsome','Admin','pawsome@gmail.com','123456789','admin','Admin',3);


-- 4 for security questions
CREATE TABLE Security(SQID int PRIMARY KEY NOT NULL AUTO_INCREMENT, username varchar(255) ,
 sq1 varchar(255)  default 'What would you name your pet?', sq2 VARCHAR(255) default 'What would you name your pets house?' , sq1_ans varchar(255) , sq2_ans varchar(255) ,
 FOREIGN KEY (username) REFERENCES users(username));

-- security data

INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (1,'alse7656','What would you name your pet?','What would you name your pets house?','polly','home');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (2,'EsterJ3006','What would you name your pet?','What would you name your pets house?','snoopie','den');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (5,'Brown7612','What would you name your pet?','What would you name your pets house?','Pepsi','cola');
INSERT INTO `security` (`SQID`,`username`,`sq1`,`sq2`,`sq1_ans`,`sq2_ans`) VALUES (6,'DanielR8186','What would you name your pet?','What would you name your pets house?','oreo','cream');
		     
-- 5 Booking table		

--  CREATE TABLE bookings(booking_id varchar(255) NOT NULL PRIMARY KEY, owner_name varchar(255) not null, renter_name varchar(255) not null, pet_id int not null, booking_duration int not null, rating int, rent_price int not null, booking_date datetime, FOREIGN KEY (renter_name) REFERENCES users(username));
 CREATE TABLE bookings(booking_id varchar(255) NOT NULL PRIMARY KEY,payment_amount int not null,booking_hours int not null,date datetime,owner varchar(255),renter varchar(255),status varchar(255), pet_id int,rating_given varchar(255) default 'false',refund_requested varchar(255) default 'false',raised_complaint varchar(255) default 'false', FOREIGN KEY (renter) REFERENCES users(username),FOREIGN KEY (owner) REFERENCES users(username) );

-- bookings data
INSERT INTO `bookings` (`booking_id`,`payment_amount`,`booking_hours`,`date`,`owner`,`renter`,`status`,`pet_id`,`rating_given`,`refund_requested`,`raised_complaint`) VALUES ('12Brown7612','10',1,'2022-11-25 00:00:00','Brown7612','alse7656','Approved',12,'true','true','true');
INSERT INTO `bookings` (`booking_id`,`payment_amount`,`booking_hours`,`date`,`owner`,`renter`,`status`,`pet_id`) VALUES ('14DanielR8186','40',4,'2022-08-12 00:00:00','DanielR8186','EsterJ3006','Approved',14);
INSERT INTO `bookings` (`booking_id`,`payment_amount`,`booking_hours`,`date`,`owner`,`renter`,`status`,`pet_id`,`rating_given`,`raised_complaint`) VALUES ('3Brown7612','30',3,'2022-09-09 00:00:00','Brown7612','EsterJ3006','Approved',3,'true','true');
INSERT INTO `bookings` (`booking_id`,`payment_amount`,`booking_hours`,`date`,`owner`,`renter`,`status`,`pet_id`,`refund_requested`) VALUES ('1DanielR8186','10',1,'2022-11-19 00:00:00','DanielR8186','alse7656','Approved',1,'true');


-- 8 pets table		     
		     
create table pets(id int PRIMARY KEY NOT NULL AUTO_INCREMENT, name varchar(255) not null, owner varchar(255), pet varchar(255) not null, age varchar(255) not null, breed varchar(255) not null, size varchar(255) not null, temp varchar(255) not null,
color varchar(255) not null, no_shedding boolean, no_biting boolean, non_allergic boolean, vaccinated boolean, image varchar(1000),amount int,approved varchar(10) default 'false', FOREIGN KEY (owner) REFERENCES users(username));
		     
-- pets data
INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`,`amount`,`approved`) VALUES (1,'Snowflake','Brown7612','Cat','Early age','Domestic Longhair','Medium','Active','White',0,0,0,1,NULL,10,'true');
INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`,`amount`,`approved`) VALUES (2,'Coonie','Brown7612','Cat','Early age','Maine Coon','Large','Active','Brown',1,1,1,0,NULL,5,'true');
INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`,`amount`,`approved`) VALUES (3,'Buttercup','Brown7612','Cat','Early age','Siamese','Small','Passive','Black',1,0,0,1,NULL,15,'true');
INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`,`amount`) VALUES (4,'Cooper','Brown7612','Dog','Early age','German Shephard','Large','Active','White',1,0,0,0,NULL,10);
INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`,`amount`) VALUES (5,'Blossom','DanielR8186','Cat','Middle Age','American Shorthair','Medium','Passive','White',1,0,0,0,NULL,14);
INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`,`amount`) VALUES (6,'Snoie','DanielR8186','Dog','Old Age','Golden Retriever','Small','Active','Brown',1,0,0,1,NULL,12);
INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`,`amount`) VALUES (7,'Poodle','DanielR8186','Dog','Middle Age','French Bulldog','Medium','Active','Brown',1,1,1,0,NULL,5);
INSERT INTO `pets` (`id`,`name`,`owner`,`pet`,`age`,`breed`,`size`,`temp`,`color`,`no_shedding`,`no_biting`,`non_allergic`,`vaccinated`,`image`,`amount`) VALUES (8,'Daisy','DanielR8186','Cat','Old Age','Domestic Longhair','Large','Passive','White',0,0,0,1,NULL,6);

 --  9 Ratings table
 
 create table ratings(id int auto_increment primary key, booking_id varchar(255) not null, rating int not null,foreign key (booking_id) references bookings(booking_id));

-- ratings data

INSERT INTO `ratings` (`id`,`booking_id`,`rating`) VALUES (1, '12Brown7612', 5);
INSERT INTO `ratings` (`id`,`booking_id`,`rating`) VALUES (2, '1DanielR8186', 7);

---  10 Refunds table

create table refunds(id int auto_increment primary key, booking_id varchar(255) not null, refund_reason varchar(1000), foreign key (booking_id) references bookings(booking_id));

-- refunds data
INSERT INTO `refunds` (`id`, `booking_id`, `refund_reason`) VALUES (1, '12Brown7612','pet got ill');
INSERT INTO `refunds` (`id`, `booking_id`, `refund_reason`) VALUES (2, '1DanielR8186','pet sheds alot of hair and makes home dirty');

---- create table complaints 
 create table complaints(id int auto_increment primary key,booking_id varchar(255) not null, issue varchar(1000) not null,foreign key (booking_id) references bookings(booking_id));

-- complaints data

INSERT INTO `complaints` (`id`, `booking_id`, `issue`) VALUES (1,  '12Brown7612', 'too much hair shedding');
INSERT INTO `complaints` (`id`, `booking_id`, `issue`) VALUES (2,  '3Brown7612','the dog bites');

-- address table
		     
CREATE TABLE address(AddressID int NOT NULL AUTO_INCREMENT  PRIMARY KEY, address varchar(255) not null,
 city VARCHAR(100) NOT NULL, state varchar(50) not null, country varchar(50) not null, zipcode varchar(10) not null, 
 username varchar(50) not null, foreign key(username) references users(username));

-- address data

INSERT INTO `address` (`AddressID`,`address`,`city`,`state`,`country`,`zipcode`,`username`) VALUES (2,'354 Poor House Drive','Lansdale','PA','USA','28655','Brown7612');
INSERT INTO `address` (`AddressID`,`address`,`city`,`state`,`country`,`zipcode`,`username`) VALUES (9,'3710 Rawlins St #1380','Dallas','Texas','USA','75219','DanielR8186');
INSERT INTO `address` (`AddressID`,`address`,`city`,`state`,`country`,`zipcode`,`username`) VALUES (12,' 3128 Zimmerman Lane','er3','432','43','423','alse7656');
INSERT INTO `address` (`AddressID`,`address`,`city`,`state`,`country`,`zipcode`,`username`) VALUES (7,'301 E 18th St','Oakland','California','USA','94606','EsterJ3006');


		     
