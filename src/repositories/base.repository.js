class BaseRepository{
    constructor(model){
        this.model = model;
    }

    // obtener documento de mongo mediante su id
    async get(id){
        return await this.model.findById(id);
    }

    // retornar todos los objetos dentro de una coleccion especifica
    async getAll(pageSize = 5, pageNum = 1){
        
        const skips = pageSize * (pageNum - 1);
        return await this.model.find().skip(skips).limit(pageSize);
    }

    //  crear un objeto
    async create(entity){
        return await this.model.create(entity);
    }

    // actualizar cualquier entidad
    async update(id, entity){
        return await this.model.findByIdAndUpdate(id, entity, {new:true});
    }

    // borrar
    async delete(id){
        await this.model.findByIdAndDelete(id);
        return true;
    }
};



module.exports = BaseRepository;