module.exports = {
    server: {
        port: process.env.PORT || 8000,
    },
    db: {
        dbUrl: process.env.DB_URL || "mongodb+srv://adminKDU:kduems@cluster0.puomuhn.mongodb.net/KDUEmpDB?retryWrites=true&w=majority&appName=Cluster0"
    },
    auth:{
        jwtSecret: process.env.JWT_SECRET || 'KDUEmployeeManagementSystem2024'
    }
}