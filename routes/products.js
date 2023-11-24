const express = require("express");

let conn = require("../config/db");
const {
  authenticateToken,
  middlewarePermissionAdmin,
} = require("../middleware/middleware");

const router = express.Router();

router.get(
  "/products",
  [authenticateToken, middlewarePermissionAdmin],
  async (req, res) => {
    try {
      const q = await conn();
      let query = "SELECT * FROM products WHERE is_active = true";

      // Check if req.body has a product filter
      if (req.body) {
        if (req.body.product_name) {
          query += ` AND product_name LIKE '%${req.body.product_name}%'`;
        }
        if (req.body.product_code) {
          query += ` AND product_code LIKE '%${req.body.product_code}%'`;
        }
      }

      const [results] = await q.query(query);
      const products = results.map((row) => row);
      res.send(products);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    }
  }
);

router.get(
  "/products/:product_id",
  [authenticateToken, middlewarePermissionAdmin],
  async (req, res) => {
    try {
      console.log(req.params.product_id);
      const q = await conn();
      const [results] = await q.query(
        "SELECT * FROM products WHERE product_id = ? and is_active = true",
        [req.params.product_id]
      );

      const products = results.map((row) => row);
      res.send(products);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    }
  }
);

router.post(
  "/products/",
  [authenticateToken, middlewarePermissionAdmin],
  async (req, res) => {
    try {
      const q = await conn();
      const { product_code, product_name, product_price } = req.body;
      //validator
      if (!product_code || !product_name || !product_price) {
        // Handle the case where one or more required fields are missing
        return res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน !");
      }
      // find dupicate field
      const [rows] = await q.query(
        "SELECT * FROM products WHERE product_code = ? ",
        product_code
      );
      if (rows.length) {
        return res.status(400).send({ message: "มีสินค้านี้ในระบบแล้ว !" });
      }
      const data = { product_code, product_name, product_price };
      try {
        const result = await q.query("INSERT INTO products SET ?", data);
        // console.log(result[0].insertId);
        await res.status(201).json({
          message: "เพิ่มสินค้าสำเร็จ",
          product_id: result[0].insertId,
        });
      } catch (error) {
        console.error(error);
        res.status(400).json({
          message: "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง",
          error,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    }
  }
);

router.put(
  "/products/:product_id",
  [authenticateToken, middlewarePermissionAdmin],
  async (req, res) => {
    try {
      const q = await conn();
      const { product_code, product_name, product_price } = req.body;
      //validator
      if (!product_code || !product_name || !product_price) {
        // Handle the case where one or more required fields are missing
        return res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน !");
      }

      const data = { product_code, product_name, product_price };
      try {
        const [result] = await q.query(
          "UPDATE products SET ? WHERE product_id = ?",
          [data, req.params.product_id]
        );
        if (result.affectedRows === 0) {
          // If no rows were affected, it means the product with the given ID was not found
          return res
            .status(404)
            .json({ message: "ไม่พบสินค้าที่ต้องการแก้ไข" });
        }
        await res.status(201).json({
          message: "แก้ไขสินค้าสำเร็จ",
          product_id: req.params.product_id,
        });
      } catch (error) {
        console.error(error);
        res.status(400).json({
          message: "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง",
          error,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    }
  }
);

router.delete(
  "/products/:product_id",
  [authenticateToken, middlewarePermissionAdmin],
  async (req, res) => {
    try {
      console.log(req.params.product_id);
      const q = await conn();
      const [results] = await q.query(
        "UPDATE products SET is_active = 0 WHERE product_id = ?",
        [req.params.product_id]
      );

      res.status(400).json({
        message: "ลบสินเค้าสำเร็จ",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    }
  }
);

module.exports = router;
