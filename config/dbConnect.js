import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        console.log('Conectando ao MongoDB Atlas...');
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('✅ Conectado ao MongoDB Atlas com sucesso!');
    } catch(err) {
        console.error('❌ Erro ao conectar com MongoDB Atlas:');
        console.error('Erro completo:', err.message);
        if (err.code === 'ENOTFOUND') {
            console.error('💡 Verifique:');
            console.error('   - Se a URL do MongoDB Atlas está correta');
            console.error('   - Se sua rede permite acesso ao MongoDB Atlas');
            console.error('   - Se as credenciais estão corretas');
        }
        process.exit(1);
    }
}

export default connectDB;