'use server';

import { formSchema, formSchemaType } from 'src/form/schema/form';
import prisma from 'src/lib/prisma';

export async function GetFormStats() {
  const stats = prisma.form.aggregate({
    _sum: {
      visits: true,
      submissions: true
    }
  });

  const visits = (await stats)._sum.visits || 0;
  const submissions = (await stats)._sum.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  let bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate
  };
}

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error('form not valid');
  }

  console.log('data', data);

  const { name, description } = data;

  const form = await prisma.form.create({
    data: {
      name,
      description
    }
  });

  if (!form) {
    throw new Error('form not created');
  }

  return form.id;
}

export async function GetForms() {
  return prisma.form.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function GetFormById(id: string) {
  return prisma.form.findUnique({
    where: {
      id
    }
  });
}
