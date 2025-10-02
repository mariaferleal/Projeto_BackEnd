import Tag from '../models/Tag.js';

export async function getAllTags() {
  try {
    const tags = await Tag.find({});
    return tags;
  } catch (error) {
    throw new Error(`Erro ao buscar tags: ${error.message}`);
  }
}

export async function getTagById(id) {
  try {
    const tag = await Tag.findById(id);
    if (!tag) {
      throw new Error('Tag não encontrada');
    }
    return tag;
  } catch (error) {
    throw new Error(`Erro ao buscar tag: ${error.message}`);
  }
}

export async function createTag(data) {
  try {
    const newTag = await Tag.createTag(data);
    return newTag;
  } catch (error) {
    throw new Error(`Erro ao criar tag: ${error.message}`);
  }
}

export async function updateTag(id, data) {
  try {
    const updatedTag = await Tag.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedTag) {
      throw new Error('Tag não encontrada para atualização');
    }
    return updatedTag;
  } catch (error) {
    throw new Error(`Erro ao atualizar tag: ${error.message}`);
  }
}

export async function deleteTag(id) {
  try {
    const deletedTag = await Tag.findByIdAndDelete(id);
    if (!deletedTag) {
      throw new Error('Tag não encontrada para deletar');
    }
    return { message: 'Tag deletada com sucesso', tag: deletedTag };
  } catch (error) {
    throw new Error(`Erro ao deletar tag: ${error.message}`);
  }
}
