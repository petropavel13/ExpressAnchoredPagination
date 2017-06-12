import Sequelize from 'Sequelize';

export function messageModel(sequelize) {
     return sequelize.define('message', {
         id: {
             type: Sequelize.STRING(36),
             primaryKey: true,
             allowNull: false,
             unique: true
         },
         createdAt: {
             type: Sequelize.DATE,
             allowNull: false,
             defaultValue: Sequelize.NOW
         },
         body: {
             type: Sequelize.STRING,
             allowNull: false
         }
     })
 }