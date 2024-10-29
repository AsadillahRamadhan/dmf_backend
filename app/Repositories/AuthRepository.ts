import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";

export default class AuthRepository {

    public async findByEmail(email: string){
        return User.findBy('email', email)
    }

    public async findByUsername(username: string){
        return User.findBy('username', username)
    }

    public async findByName(name: string){
        return User.findBy('name', name)
    }

    public async store(payload: any){
        payload.role = payload.role ? payload.role : 'user'
        return User.create(payload)
    }

    public async update(id: number, payload: any){
        return User.query().where('id', id).update(payload)
    }

    public async getAll(page: number, limit: number){
        return Database.from('users').select(['id', 'username', 'name', 'email', 'role']).paginate(page | 1, limit | 10)
    }

    public async getEach(id: number){
        return User.find(id)
    }

    public async deleteOne(id: number){
        const data = await User.query().where('id', id)
        if(data.length < 1){
            return false
        }
        return User.query().where('id', id).delete()
    }
}