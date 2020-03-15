class BaseRepository{
    constructor(model){
        this.model = model;
    }

    // obtener documento de mongo mediante su id
    async get(id){
        return await this.model.findById(id);
    }

    // retornar todos los objetos dentro de una coleccion especifica
    async getAll(){
        return await this.model.find();
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
        return await this.model.findByIdAndDelete(id);
    }
};



module.exports = BaseRepository;