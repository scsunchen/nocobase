import { Processor } from '@nocobase/plugin-workflow';
import ManualInstruction from '../ManualInstruction';

export default async function (this: ManualInstruction, instance, { collection }, processor: Processor) {
  const repo = this.plugin.db.getRepository(collection);
  if (!repo) {
    throw new Error(`collection ${collection} for create data on manual node not found`);
  }

  const { _, ...form } = instance.result;
  const [values] = Object.values(form);
  await repo.create({
    values: {
      ...((values as { [key: string]: any }) ?? {}),
      createdBy: instance.userId,
      updatedBy: instance.userId,
    },
    context: {
      executionId: processor.execution.id,
    },
    transaction: processor.transaction,
  });
}
