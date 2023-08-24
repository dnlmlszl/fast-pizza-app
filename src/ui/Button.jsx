import { Link } from "react-router-dom"


export const Button = ({ children, disabled, to, type, onClick }) => {
  
  const base = 'bg-blue-500 text-sm uppercase font-semibold text-stone-700 inline-block tracking-wide rounded-full hover:bg-blue-400 transition-colors duration-300 focus:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-offset-2 active:bg-stone-400 disabled:cursor-not-allowed disabled:bg-blue-300'

  const styles = {
    small: base + ' py-2 px-4 md:px-5 md:py-2.5 text-xs',
    primary: base + ' py-3 px-4 md:px-6 md:py-4',
    secondary: 'border-2 text-sm border-stone-200 py-2.5 px-4 uppercase font-semibold text-stone-400 inline-block tracking-wide rounded-full hover:bg-stone-300 hover:text-stone-800 transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-300 focus:bg-stone-300 focus:text-stone-800  focus:ring-offset-2 active:bg-stone-400 disabled:cursor-not-allowed disabled:bg-blue-300 md:px-6 md:py-3.5',
    round: base + ' py-1 px-2.5 md:px-3.5 md:py-2 text-sm',
  }

  if (onClick) return (<button onClick={onClick} disabled={disabled} className={styles[type]}>{children}</button>)

  if (to) return <Link className={styles[type]} to={to}>{children}</Link>
  
  return (
    <button disabled={disabled} className={styles[type]}>{children}</button>
  )
}
