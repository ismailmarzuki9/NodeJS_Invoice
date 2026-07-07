// import { Sequelize } from "sequelize"; //cara penulisan import module ES
// import db from "../../config/database.js"; // cara penulisan import module ES

const { Sequelize} = require('sequelize');
const db = require('../../config/database_con_Sequelize.js');

const { DataTypes } = Sequelize;

const users = db.define(
    "users",
    {
        userid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },

        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },

        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        role:{
            type: DataTypes.STRING(20),
            allowNull : false
        },

        refresh_token: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        email_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        failed_login_attempts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        locked_until: {
            type: DataTypes.DATE,
            allowNull: true
        },

        last_login_at: {
            type: DataTypes.DATE,
            allowNull: true
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },

        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

// export default usertTes cara penulisan expoert module ES
module.exports = users