/**
 * Created by FixError on 19.12.2015.
 */
"use strict";
module.exports = function (sequelize, DataTypes) {
    var Books = sequelize.define('books', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nameBook: {type: DataTypes.STRING, unique: true,
        validate:{
            isLongEnough: function(valid){
                if(valid.length>250){
                    throw new Error("Please select at least long name book");
                }
            }
        }
        },
        author: {type: DataTypes.STRING,
            validate:{
                isLongEnough: function(valid){
                    if(valid.length>100){
                        throw new Error("Please select at least long name author");
                    }
                }
            }
        },
        data: {type: DataTypes.DATE}
    });

    return Books;
};