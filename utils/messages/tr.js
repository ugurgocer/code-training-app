module.exports = {
    database: {
       unique: (field, value) => `${value}` 
    },
    fields: {
        username: "Kullanıcı Adı",
        email: "E-Posta",
    }
}