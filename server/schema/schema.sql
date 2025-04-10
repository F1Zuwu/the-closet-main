CREATE TABLE clothing (
  clothing_id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
  name VARCHAR(150) NOT NULL,
  image_url VARCHAR(300) NOT NULL,                                                      
  PRIMARY KEY (clothing_id)                                 
);

CREATE TABLE fits (
  fit_id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
  name VARCHAR(150) NOT NULL,                
  clothes_id INT UNSIGNED NOT NULL,                
  accessory_id INT UNSIGNED NULL,  
  image_url VARCHAR(300) NOT NULL,
  tag_id INT UNSIGNED NOT NULL,  
  PRIMARY KEY (fit_id),  
  CONSTRAINT fk_tag FOREIGN KEY (tag_id) REFERENCES tags(tag_id),
  CONSTRAINT fk_clothes FOREIGN KEY (clothes_id) REFERENCES clothes(item_id)
);

CREATE TABLE tags (
  tag_id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
  tag_name VARCHAR(150) NOT NULL, 
  PRIMARY KEY (tag_id)                
);

CREATE TABLE users (
  user_id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
  username VARCHAR(150) NOT NULL UNIQUE, 
  email VARCHAR(255) NOT NULL UNIQUE, 
  password VARCHAR(255) NOT NULL, 
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  PRIMARY KEY (user_id)
);


CREATE TABLE fits (
  fit_id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
  name VARCHAR(150) NOT NULL,                
  clothing_id INT UNSIGNED NOT NULL,                
  accessory_id INT UNSIGNED NULL,  
  image_url VARCHAR(300) NOT NULL,
  tag_id INT UNSIGNED NOT NULL,  
  user_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (fit_id),  
  CONSTRAINT fk_tag FOREIGN KEY (tag_id) REFERENCES tags(tag_id), 
  CONSTRAINT fk_clothing FOREIGN KEY (clothing_id) REFERENCES clothing(clothing_id),  
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)  
);




2. To view the clothing, tags, accessories per fit, you now query with JOINs:
Example: Get all clothing for a fit

SELECT f.fit_id, f.name, c.name AS clothing_name
FROM fits f
JOIN FitClothing fc ON f.fit_id = fc.fit_id
JOIN clothing c ON fc.clothing_id = c.clothing_id
WHERE f.fit_id = 1;

Example: Get all tags for a fit

SELECT f.fit_id, f.name, t.name AS tag_name
FROM fits f
JOIN FitTags ft ON f.fit_id = ft.fit_id
JOIN tags t ON ft.tag_id = t.tag_id
WHERE f.fit_id = 1;

Example: Get all accessories for a fit

SELECT f.fit_id, f.name, a.name AS accessory_name
FROM fits f
JOIN FitAccessories fa ON f.fit_id = fa.fit_id
JOIN accessories a ON fa.accessory_id = a.accessory_id
WHERE f.fit_id = 1;

