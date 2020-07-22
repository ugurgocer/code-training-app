module.exports = {
    database: {
       unique: (field, value) => `${value}` 
    },

    fields: {
        username: "username",
        email: "email",
        password: "password",
        fullName: "name surname",
        isEducator: "Is educator",
        loginType: "login type"
    },

    validation: {
        isIn: (field, args) =>  `${field} field must be values of ${args.join(',')}. `,
        notEmpty: field => `${field} not be empty. `,
        isEmail: field => `${field} not a valid email. `,
        len: (field, args) => `${field} length can be minimum ${args[0]}, maximum ${args[1]}. `,
    }
}