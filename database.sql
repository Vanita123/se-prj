Create:


--1 execute the below to create a database;
create database paw;
use paw;
--2 execute below to create users table
 
 CREATE TABLE Users (username varchar(255) NOT NULL PRIMARY KEY, fname VARCHAR(255) NOT NULL, lname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, phno VARCHAR(255), password  VARCHAR(255) NOT NULL UNIQUE, address VARCHAR(255), role varchar(255) NOT NULL, roleid int NOT NULL,
  FOREIGN KEY (roleid) REFERENCES Roles(roleid);
 
--3 for roles table
CREATE TABLE Roles(roleid int NOT NULL PRIMARY KEY, role_name varchar(255) NOT NULL, role_desc VARCHAR(255) NOT NULL);
--4 for security questions
CREATE TABLE Security(SQID int PRIMARY KEY NOT NULL AUTO_INCREMENT, username varchar(255) NOT NULL, sq1 varchar(255) NOT NULL, sq2 VARCHAR(255) NOT NULL, sq1_ans varchar(255) not null, sq2_ans varchar(255) not null);

CREATE TABLE bookings(booking_id int auto_increment NOT NULL PRIMARY KEY, owner_name varchar(255) not null, renter_name varchar(255) not null, pet varchar(255) not null, booking_duration int not null, rating int, rent_price int not null, start_date datetime, end_date datetime,location varchar(255) not null, FOREIGN KEY (renter_name) REFERENCES users(username));

CREATE TABLE payments(payment_id int primary key auto_increment, booking_id int not null, amount int not null, invoice_id int, status varchar(255) not null, payment_date datetime, FOREIGN KEY (booking_id) REFERENCES bookings (booking_id));

CREATE TABLE  approval(booking_id int not null, renter_name varchar(255) not null, owner_details varchar(255) not null,pet varchar(255), foreign key (booking_id) references bookings(booking_id));

CREATE TABLE pets(id int primary key auto_increment, name varchar(255) not null, owner varchar(255) not null,
 pet varchar(255) not null, sex char(1) not null, DOB date not null, age int not null,  breed varchar(255) 
 not null, size varchar(10) not null, temperment varchar(50) not null, color varchar(10) not null, vaccinated 
 char(10) not null, allergies varchar(255) not null, other varchar(255));

		     
		     
CREATE TABLE address(AddressID int NOT NULL AUTO_INCREMENT  PRIMARY KEY, Address varchar(255) not null,
 City VARCHAR(100) NOT NULL, State varchar(50) not null, Country varchar(50) not null, Zipcode varchar(10) not null, 
 username varchar(50) not null, foreign key(username) references users(username));


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

INSERT

--insert in to users example:

INSERT INTO users(fname, lname, email, phno, password, address, role, roleid) VALUES('slash', 'G', 'slash@iu.edu', 3245423235, 'fewrewr','323 S','user', 3);

--insert in to roles

INSERT INTO Roles(roleid , role_name, role_desc) VALUES(1, 'Admin',  'Approves the item added for rent, accepts customer complaints and routes it to the appropriate renter, issues a refund to the renter'),
    (2, 'Owner',  'The renter should be able to post the item for rent. View the information of the customer who rented the items/services.'),
    (3, 'Renter',  'A customer can choose the item/place for rent make payments, cancel rental bookings, lodge complaints, apply for refund.');

--insert in to security

INSERT INTO Security(username, question, answer) VALUES('svasire',"What is your favourite animal?", "Dog");

---insert into pets table.
	INSERT INTO pets (name, owner, pet, sex, DOB, age, breed, size, temperment, color, vaccinated, allergies,other) VALUES
	('Snowflake', 'Emma', 'cat', 'f','2020-11-12', 2, 'persian cat', 'medium', 'calm', 'cream', 'yes', 'None', 'No shedding'),
	('Coonie', 'Ester', 'cat', 'm','2021-12-23', 1, 'Maine coon', 'large', 'friendly', 'blue', 'yes', 'None', 'No biting'),
	('Buttercup', 'Adam', 'cat', 'f','2018-3-01', 4, 'Ragdoll', 'small', 'sociable', 'lilac', 'yes', 'None', 'Non-allergic'),
    	('Cooper', 'Max', 'dog', 'm','2020-3-2', 1, 'German Shephard', 'large', 'Courageous', 'Sable', 'yes', 'None', 'No biting');
		     
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO `` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Brown7612','Adam','Brown','Brown@gmail.com','3123245292','$2b$10$ymu0odCJ8sh9ldeCZ.vYUu3ySPUgrF9sL8BX8Cb.ky.pYc8ABTdKO','2',1);
INSERT INTO `` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('EmmaSmith1944','Emma','Smith','EmmaSmith@gmail.com','8931334791','$2b$10$lZ/AK0wrPHUQvZALQHyRQOsXutYYgANj.5ws1WTyaMLs9w320wogG','2',1);
INSERT INTO `` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('EsterJ3006','Ester','Jackson','EsterJ@gmail.com','3849324833','$2b$10$rSIVl8MJSp8mFe9i82Mequdhyhv5HYBTtRPxKiJmA8nGvNIFPCUfm','2',1);
INSERT INTO `` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('lghanta355','Tejaswy','Ghanta','lghanta@iu.edu','23244113456','keyword','Owner',1);
INSERT INTO `` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Lizy4235','Lizy','McGuire','Lizy@gmail.com','4324123238','$2b$10$YI/nqqKWhFeHOiyqKWaiI.jDNt.m3BA0yR21/1XzrKoN8O76MAIDq','2',1);
INSERT INTO `` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('Maxmiller2857','Max','Miller','Maxmiller@gmail.com','4234891312','$2b$10$UQlv5kPqwMdmMj0x/MFmNuwByp7AnLQ9Oezy9CgWNDvvslwxNNzga','2',1);
INSERT INTO `` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('sainz8714','Carlos','Sainz','sainz,@iu.edu','1234459736','$2b$10$MkfTeEa9Qf4b.ol51Kqqt.kDI/hQZOLzXTMiukzlfvjgdCGjq3pBy','Owner',1);
INSERT INTO `` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('svasire578','Sahithi','Vasireddy','svasire@iu.edu','8126064219','password','Owner',1);
INSERT INTO `` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('vlalwani467','Vanita','Lalwani','vlalwani@iu.edu','3214579313','passcode','Owner',1);
INSERT INTO `` (`username`,`fname`,`lname`,`email`,`phno`,`password`,`role`,`roleid`) VALUES ('zorth768','Zachary','Orth','zorth@iu.edu','3244329471','code','Owner',1);
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		     
		     
----insert into address:
INSERT INTO `` (`AddressID`,`Address`,`City`,`State`,`Country`,`Zipcode`,`username`) VALUES (1,'265 Ann Drive, Omaha, NE 68107','Morganton','NE','USA','28655','EmmaSmith1944');
INSERT INTO `` (`AddressID`,`Address`,`City`,`State`,`Country`,`Zipcode`,`username`) VALUES (2,'354 Poor House Drive, Lansdale, PA 19446','Lansdale','PA','USA','28655','Brown7612');
INSERT INTO `` (`AddressID`,`Address`,`City`,`State`,`Country`,`Zipcode`,`username`) VALUES (3,'8991 Pine Ave, Marietta, GA 30008','Marietta','GA','USA','28655','Maxmiller2857');
INSERT INTO `` (`AddressID`,`Address`,`City`,`State`,`Country`,`Zipcode`,`username`) VALUES (4,'46 N. La Sierra Road, Owensboro, KY 42301','Owensboro','KY','USA','28655','Lizy4235');

