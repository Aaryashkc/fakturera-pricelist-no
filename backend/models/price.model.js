import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize.js";

const PriceList = sequelize.define(
  "PriceList",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    articleNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    productService: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    inPrice: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    inStock: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "price_list",
    freezeTableName: true,
    timestamps: true,
  }
);

export { PriceList };
