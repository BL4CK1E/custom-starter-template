module.exports = (db, DataTypes) => {

    const User = db.define('User', {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 1 // 1 Active, 2 Inactive
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 3 // 1 Super Admin, 2 Admin, 3 User
        }
    });

    User.associate = (models) => {

        models.User.belongsToMany( models.Review, {
            through: 'review_authors'
        });

        models.User.belongsToMany( models.Rating, {
            through: 'user_rates'
        });


    }

  return User;

};