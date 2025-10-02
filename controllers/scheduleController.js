import Schedule from '../models/Schedule.js';

export async function getAllSchedules() {
  try {
    return await Schedule.find({});
  } catch (err) {
    throw new Error(`Erro ao buscar schedules: ${err.message}`);
  }
}

export async function getScheduleById(id) {
  try {
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      throw new Error('Schedule não encontrado');
    }
    return schedule;
  } catch (err) {
    throw new Error(`Erro ao buscar schedule: ${err.message}`);
  }
}

export async function createSchedule(data) {
  try {
    return await Schedule.createSchedule(data);
  } catch (err) {
    throw new Error(`Erro ao criar schedule: ${err.message}`);
  }
}

export async function updateSchedule(id, data) {
  try {
    const schedule = await Schedule.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!schedule) {
      throw new Error('Schedule não encontrado para atualização');
    }
    return schedule;
  } catch (err) {
    throw new Error(`Erro ao atualizar schedule: ${err.message}`);
  }
}

export async function deleteSchedule(id) {
  try {
    const schedule = await Schedule.findByIdAndDelete(id);
    if (!schedule) {
      throw new Error('Schedule não encontrado para deletar');
    }
    return { message: 'Schedule deletado com sucesso', schedule };
  } catch (err) {
    throw new Error(`Erro ao deletar schedule: ${err.message}`);
  }
}
