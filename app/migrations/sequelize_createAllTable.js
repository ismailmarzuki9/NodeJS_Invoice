// import UsersTable from "../app/migrations/createTabelUsers.js"; //cara penulisan import module ES
const UsersTable =require ("./createTabelUsers.js");

// await UsersTable.sync(); // akan membuat tabel ketika yabel belum ada mirip migration pada Laravel
    async function migrate() {
        await UsersTable.sync();
        console.log("Tabel berhasil dibuat");
    }
    migrate();