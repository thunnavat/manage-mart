CREATE DATABASE managemart DEFAULT CHARACTER SET UTF8MB4;
USE managemart;

CREATE TABLE IF NOT EXISTS productcategories (
  productCategoryId INT NOT NULL AUTO_INCREMENT,
  productCategoryName VARCHAR(100) NOT NULL,
  PRIMARY KEY (productCategoryId),
  UNIQUE INDEX productCategoryName_UNIQUE (productCategoryName ASC) VISIBLE
);

CREATE TABLE IF NOT EXISTS products (
  productId INT NOT NULL AUTO_INCREMENT,
  productBarcode VARCHAR(100) NOT NULL,
  productName VARCHAR(100) NOT NULL,
  productCost DECIMAL(9,2) NOT NULL,
  productPrice DECIMAL(9,2) NOT NULL,
  productQuantity INT NOT NULL,
  productExpirationDate DATE NULL,
  productImage VARCHAR(100) NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  productCategoryId INT NOT NULL,
  PRIMARY KEY (productId),
  UNIQUE INDEX productBarcode_UNIQUE (productBarcode ASC) VISIBLE,
  INDEX fk_products_productcategories_idx (productCategoryId ASC) VISIBLE,
  CONSTRAINT fk_products_productcategories
    FOREIGN KEY (productCategoryId)
    REFERENCES productcategories (productCategoryId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

INSERT INTO productcategories (productCategoryName) VALUES ('ของใช้ส่วนตัว'), ('ของใช้ภายในบ้าน'), ('เครื่องดื่ม'), ('ขนม'), ('เครื่องปรุง'), ('ข้าวสาร');

