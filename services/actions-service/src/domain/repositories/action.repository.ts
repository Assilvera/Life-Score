import { Action } from '../entities/action.entity';

export interface ActionRepository {
  create(action: Action): Promise<Action>;
  findAll(): Promise<Action[]>;
  findById(id: string): Promise<Action | null>;
  findByCode(code: string): Promise<Action | null>;
  update(action: Action): Promise<Action>;
  delete(id: string): Promise<void>;
}
