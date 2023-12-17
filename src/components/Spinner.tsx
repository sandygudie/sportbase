import CircularProgress from "@mui/material/CircularProgress";

interface Props{
  color?:string
}
export default function Spinner({ color }:Props) {
  return (
    <CircularProgress
      className={`${color ? color : "text-primary"}`}
      color="success"
    />
  );
}
