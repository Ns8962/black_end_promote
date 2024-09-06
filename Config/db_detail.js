const mysql = require('mysql2/promise');
const connection = async () => {
    try {
        // สร้างการเชื่อมต่อและ return connection ออกมา
        return await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'promotes'
        });
    } catch (err) {
        console.log('Connection failed:', err);
        throw err; // ส่งข้อผิดพลาดออกไปเพื่อให้โค้ดที่เรียกใช้จัดการ
    }
};

module.exports = connection;