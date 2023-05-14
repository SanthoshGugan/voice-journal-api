import express, { Request, Response } from 'express';
import AbstractService from '../service/abstractService';
import { AbstractRepository } from '../repository/abstractRepository';


class AbstractController<S extends AbstractService<AbstractRepository<T, I>, T, I>, T, I> {

    private service: S;

    constructor(service: S) {
        this.service = service;
    }

    async getAll(req: Request, res: Response) {
        try {
            const entities = await this.service.getAll();
            res.status(200).json(entities);
        } catch (error) {
            console.log("error while fetching all" + error)
            res.status(500).json({ "message" : "Internal server error "});
        }

    };

    async getById(req: Request, res: Response) {
        const entityId: I = req.params.id as I;
        try {
            const entity: T | null = await this.service.getById(entityId);
            if (entity == null) {
                res.status(404).json({ "message": "Entity not found" })
            } else {
                res.status(200).json(entity);

            }
        } catch (error) {
            console.log("error while fetching all" + error)
            res.status(500).json({ "message" : "Internal server error "});
        }

    };

    async add(req: Request, res: Response) {
        const entity: T = req.body as T;
        try {
            const insertedEntity : T = await this.service.add(entity);
            res.status(201).json({ ...insertedEntity });
        } catch (error) {
            console.log("error while inserting" + error)
            res.status(500).json({ "message" : "Internal server error "});
        }

    };

};

export default AbstractController;
