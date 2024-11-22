CREATE DATABASE IF NOT EXISTS managemart DEFAULT CHARACTER SET UTF8MB4;
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

CREATE TABLE IF NOT EXISTS payment_methods (
  paymentMethodId INT NOT NULL AUTO_INCREMENT,
  paymentMethodName VARCHAR(100) NOT NULL,
  PRIMARY KEY (paymentMethodId),
  UNIQUE INDEX paymentMethodName_UNIQUE (paymentMethodName ASC) VISIBLE
);

INSERT INTO payment_methods (paymentMethodName) VALUES ('เงินสด'), ('คิวอาร์โค้ด'), ('บัตรสวัสดิการแห่งรัฐ');

CREATE TABLE IF NOT EXISTS sales_receipts (
  saleReceiptId INT NOT NULL AUTO_INCREMENT,
  saleReceiptDate DATE NOT NULL,
  saleReceiptTime TIME NOT NULL,
  saleReceiptTotalPrice DECIMAL(9,2) NOT NULL,
  saleReceiptDiscount DECIMAL(9,2) NOT NULL,
  saleReceiptNet DECIMAL(9,2) NOT NULL,
  saleReceiptCash DECIMAL(9,2) NULL,
  saleReceiptChange DECIMAL(9,2) NULL,
  saleReceiptStateWelfareCardCash DECIMAL(9,2) NULL,
  saleReceiptStateWelfareCardDifference DECIMAL(9,2) NULL,
  saleReceiptStateWelfareCardPayDifferenceMethod VARCHAR(100) NULL,
  paymentMethodId INT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (saleReceiptId),
  CONSTRAINT fk_sales_receipts_payment_methods1
    FOREIGN KEY (paymentMethodId)
    REFERENCES payment_methods (paymentMethodId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS sales_receipts_products (
  saleReceiptProductId INT NOT NULL AUTO_INCREMENT,
  saleReceiptId INT NOT NULL,
  productId INT NOT NULL,
  productQuantity INT NOT NULL,
  productPrice DECIMAL(9,2) NOT NULL,
  productTotalPrice DECIMAL(9,2) NOT NULL,
  productCost DECIMAL(9,2) NOT NULL,
  productTotalCost DECIMAL(9,2) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (saleReceiptProductId),
  INDEX fk_sales_receipts_products_sales_receipts1_idx (saleReceiptId ASC) VISIBLE,
  INDEX fk_sales_receipts_products_products1_idx (productId ASC) VISIBLE,
  CONSTRAINT fk_sales_receipts_products_sales_receipts1
    FOREIGN KEY (saleReceiptId)
    REFERENCES sales_receipts (saleReceiptId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_sales_receipts_products_products1
    FOREIGN KEY (productId)
    REFERENCES products (productId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

