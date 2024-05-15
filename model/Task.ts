import { Model } from '@nozbe/watermelondb';
import { date, field, text } from '@nozbe/watermelondb/decorators';

export default class Task extends Model {
  static table = 'tasks';

  @text('name') name: string;
  @text('status') status: 'PLANNED' | 'ONGOING' | 'FINISHED';
  @date('started_at') started_at;
  @date('finished_at') finished_at;
  @field('quantity') quantity: number;
  @text('unit') unit: 'NO_UNIT' | 'MINUTES';
  @text('unit_label') unit_label: string;
  @text('type') type: 'SHORT' | 'LONG';
  @text('annotations') annotations: string;

  @date('created_at') created_at;
  @date('updated_at') updated_at;
}
