module.exports = {
    
    database: {
       unique: (field, value) => `${value}` 
    },

    fields: {
        username: "Kullanıcı adı",
        email: "E-Posta",
        password: "Parola",
        fullName: "Tam Ad",
        isEducator: "Eğitmen mi",
        loginType: "Giriş tipi"
    },

    validation: {
        isIn: (field, args) =>  `${field} alanı ${args.join(',')} değerleri dışında değer alamaz. `,
        notEmpty: field => `${field} alanı boş bırakılamaz. `,
        isEmail: field => `${field} alanı geçerli bir e-posta değildir. `,
        len: (field, args) => `${field} alanının uzunluğu en az ${args[0]}, en çok ${args[1]} olabilir. `,
    }
}