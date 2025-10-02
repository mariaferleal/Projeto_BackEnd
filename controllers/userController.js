import User from '../models/User.js';

export async function getAllUsers() {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    throw new Error(`Erro ao buscar usuários: ${error.message}`);
  }
}

export async function getUserById(id) {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  } catch (error) {
    throw new Error(`Erro ao buscar usuário: ${error.message}`);
  }
}

export async function createUser({ name, email, passwordHash, role, preferences }) {
  const validRoles = ['user', 'admin'];
  if (!validRoles.includes(role)) {
    throw new Error('Role inválido.');
  }

  try {
    const newUser = new User({ name, email, passwordHash, role, preferences });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  }
}

export async function updateUser(id, updateData) {
  console.log('UpdateUser - id:', id);
  console.log('UpdateUser - updateData:', updateData);
  try {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true, // retorna o documento atualizado
      runValidators: true, // valida os dados de acordo com o schema
    });

    if (!user) {
      throw new Error('Usuário não encontrado para atualizar');
    }

    return user;
  } catch (error) {
    throw new Error(`Erro ao atualizar usuário: ${error.message}`);
  }
}


export async function deleteUser(id) {
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new Error('Usuário não encontrado para deletar');
    }

    return { message: 'Usuário deletado com sucesso', user: deletedUser };
  } catch (error) {
    throw new Error(`Erro ao deletar usuário: ${error.message}`);
  }
}
