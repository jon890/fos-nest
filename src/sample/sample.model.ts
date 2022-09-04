import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Sample extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
