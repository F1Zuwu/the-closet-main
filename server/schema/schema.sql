CREATE TABLE clothes (
  item_id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
  name VARCHAR(150) NOT NULL,                                                      
  PRIMARY KEY (item_id)                                 
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
