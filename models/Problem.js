<<<<<<< HEAD
=======

>>>>>>> 6b046c1b60e6ffe97d067aa13e9f12918ac33acf


const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Problem = sequelize.define('Problem', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
     score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50
    },
     input_format: {
        type: DataTypes.TEXT,
        allowNull: true
    },
     output_format: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    constraints: {
        type: DataTypes.TEXT,
        allowNull: true
    },
     test_case_path: {
        type: DataTypes.STRING,
        allowNull: true
    },
      is_junior: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
        time_limit: {
        type: DataTypes.INTEGER,
        defaultValue: 2
    },
        memory_limit: {
        type: DataTypes.INTEGER,
        defaultValue: 256
    },
    // difficulty: { type: DataTypes.STRING, allowNull: false },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'events', // lowercase plural
            key: 'id'
        },
           onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
     created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

module.exports = Problem;
