import { Card, CardBody, Typography } from '@material-tailwind/react';

export default function EarthquakeDetailSkeleton() {
  return (
    <Card className='rounded-lg border p-4 shadow-md'>
      <Typography variant='h1' className='mb-4 text-center text-2xl font-bold'>
        Info Gempa Terbaru
      </Typography>
      <CardBody className='flex flex-col lg:flex-row'>
        <section className='flex flex-[1] flex-col justify-evenly px-4 lg:px-10'>
          <Typography
            as='div'
            variant='h2'
            className='mb-4 h-6 w-96 rounded-full bg-gray-300'
          >
            &nbsp;
          </Typography>

          {[...Array(8)].map((_, index) => (
            <Typography
              key={index}
              as='div'
              variant='paragraph'
              className='mb-4 h-3 w-56 rounded-full bg-gray-300'
            >
              &nbsp;
            </Typography>
          ))}
        </section>
        <section className='m-auto w-full max-w-[450px]'>
          <section className='grid h-[535px] w-full place-items-center overflow-hidden bg-gray-300'>
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
      </CardBody>
    </Card>
  );
}
