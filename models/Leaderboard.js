const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Leaderboard = sequelize.define('Leaderboard', {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },

    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'events',
            key: 'id'
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },

    team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'teams',
            key: 'id'
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },

    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    last_submission_time: {
        type: DataTypes.DATE,
        allowNull: true
    },

    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['event_id', 'team_id']
        }
    ]
});

module.exports = Leaderboard;
