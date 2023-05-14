import { AbstractRepository } from "../repository/abstractRepository";

class AbstractService<R extends AbstractRepository<T, I>, T, I> {
    private repo: R

    constructor(r: R) {
        this.repo = r;
    };

    public async getAll(): Promise<T[]> {
        return this.repo.getAll();
    };

    public async getById(id: I): Promise<T | null> {
        return this.repo.getById(id);
    };

    public async add(entity: T): Promise<T> {
        return this.repo.add(entity);
    };

    public async update(entity: T, id: I): Promise<T> {
        return this.repo.update(entity, id);
    };

    public async delete(id: I): Promise<void> {
        return this.repo.delete(id);
    }
};

export default AbstractService;