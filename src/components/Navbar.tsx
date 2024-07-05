import {
  Collapse,
  IconButton,
  Navbar as NavbarMaterial,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:my-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography as='li' variant='small' color='blue-gray' className='p-1 font-normal'>
        <a href='/cuaca' className='flex items-center hover:underline'>
          Cuaca
        </a>
      </Typography>
      <Typography as='li' variant='small' color='blue-gray' className='p-1 font-normal'>
        <a href='/gempa' className='flex items-center hover:underline'>
          Gempa
        </a>
      </Typography>
    </ul>
  );

  return (
    <NavbarMaterial className='h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4'>
      <div className='flex items-center justify-between text-blue-gray-900'>
        <Typography as='a' href='/' className='mr-4 cursor-pointer py-1.5 font-bold'>
          BMKG Watch
        </Typography>
        <div className='flex items-center gap-4'>
          <div className='mr-4 hidden lg:block'>{navList}</div>
          <IconButton
            variant='text'
            className='ml-auto size-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                className='size-6'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='size-6'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>{navList}</Collapse>
    </NavbarMaterial>
  );
}
