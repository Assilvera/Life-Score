export type ActionDifficulty = 'easy' | 'medium' | 'hard';

export class Action {
  constructor(
    public readonly id: string,
    public code: string,
    public title: string,
    public category: string,
    public basePoints: number,
    public difficulty: ActionDifficulty,
    public description: string,
    public coinsReward: number,
    public isActive: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(props: {
    code: string;
    title: string;
    category: string;
    basePoints: number;
    difficulty: ActionDifficulty;
    description: string;
    coinsReward?: number;
  }): Action {
    const now = new Date();
    return new Action(
      '', // será asignado por la DB
      props.code,
      props.title,
      props.category,
      props.basePoints,
      props.difficulty,
      props.description,
      props.coinsReward ?? 0,
      true,
      now,
      now,
    );
  }
}
