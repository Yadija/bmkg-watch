import { Card, CardBody, Typography } from '@material-tailwind/react';

interface EarthquakeListSkeletonProps {
  title: string;
}

export default function EarthquakeListSkeleton({ title }: EarthquakeListSkeletonProps) {
  return (
    <section className='my-5 w-full animate-pulse'>
      <Typography variant='h1' className='mb-4 text-center text-2xl'>
        {title}
      </Typography>
      <section className='flex w-full flex-col gap-5'>
        {[...Array(15)].map((_, index) => (
          <Card key={index} className='flex w-full flex-col justify-evenly xl:flex-row'>
            <CardBody className='flex w-full flex-col justify-evenly'>
              <Typography
                as='div'
                variant='h2'
                className='mb-4 h-6 w-64 rounded-full bg-gray-300'
              >
                &nbsp;
              </Typography>

              {[...Array(7)].map((_, index) => (
                <Typography
                  key={index}
                  as='div'
                  variant='paragraph'
                  className='mb-4 h-3 w-56 rounded-full bg-gray-300'
                >
                  &nbsp;
                </Typography>
              ))}
            </CardBody>

            <section className='w-full xl:max-w-[350px]'>
              <section className='grid h-96 w-full place-items-center overflow-hidden bg-gray-300'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='size-12 text-gray-500'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                  />
                </svg>
              </section>
            </section>
          </Card>
        ))}
      </section>
    </section>
  );
}
