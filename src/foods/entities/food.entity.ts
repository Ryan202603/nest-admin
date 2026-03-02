import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('foods')
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500, nullable: true })
  cover: string;

  @Column({ length: 500, nullable: true })
  bgImage: string;

  @Column({ length: 500, nullable: true })
  desc: string;

  @Column({ length: 50, nullable: true })
  season: string;

  @Column({ length: 50, nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  nutrition: string;

  @Column({ type: 'text', nullable: true })
  tips: string;

  @Column({ type: 'text', nullable: true })
  pairings: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
