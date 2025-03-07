import { GetForms, GetFormStats } from 'actions/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from 'components/ui/card';
import { Separator } from 'components/ui/separator';
import { Skeleton } from 'components/ui/skeleton';
import React, { Suspense } from 'react';
import CreateFormBtn from './_components/CreateFormBtn';
import { Form } from '@prisma/client';
import { Badge } from 'components/ui/badge';
import { formatDistance } from 'date-fns';
import { Edit, FileInput, MoveRight, View } from 'lucide-react';
import { Button } from 'components/ui/button';
import Link from 'next/link';

function Page() {
  return (
    <div className="w-full mx-auto container p-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-4" />
      <h2 className="text-2xl font-bold">Recent Forms</h2>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CreateFormBtn />
        <Suspense fallback={<FormCardSkeleton />}>
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();

  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardProps {
  loading: boolean;
  data?: Awaited<ReturnType<typeof GetFormStats>>;
}

function StatsCards({ loading, data }: StatsCardProps) {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Visits"
        icon={'👁️'}
        helperText="All time form visits"
        value={data?.visits.toLocaleString() || ''}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />

      <StatsCard
        title="Total submissions"
        icon={'✍️'}
        helperText="All time form submissions"
        value={data?.submissions.toLocaleString() || ''}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />

      <StatsCard
        title="Total submissions rate"
        icon={'📈'}
        helperText="All time form submissions rate"
        value={data?.submissionRate.toLocaleString() + '%' || ''}
        loading={loading}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="Total bounce rate"
        icon={'📉'}
        helperText="All time form bounce rate"
        value={data?.bounceRate.toLocaleString() + '%' || ''}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}

function StatsCard({
  title,
  value,
  loading,
  icon,
  helperText,
  className
}: {
  title: string;
  value: string;
  loading: boolean;
  icon: React.ReactNode;
  helperText?: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span>0</span>
            </Skeleton>
          )}
          {!loading && <span>{value}</span>}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary/20 h-[190px] w-full" />;
}

async function FormCards() {
  const forms = await GetForms();

  return (
    <>
      {forms.map(form => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant="destructive">Draft</Badge>}
        </CardTitle>
        <CardDescription>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true
          })}
          {form.published && (
            <span className="flex items-center">
              <View className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FileInput className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || 'No description'}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button
            variant="outline"
            className="w-full text-md gap-4 mt-2"
            asChild
          >
            <Link href={`/forms/${form.id}`}>
              View submissions <MoveRight />{' '}
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button
            variant="secondary"
            className="w-full text-md gap-4 mt-2"
            asChild
          >
            <Link href={`/builder/${form.id}`}>
              Preview form <Edit />{' '}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default Page;
