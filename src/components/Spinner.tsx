import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner() {
  return (
    <div className='flex flex-col h-[28em] items-center justify-center'>
      <CircularProgress className="text-primary" color="success" />
    </div>
  )
}
