import { useSelector } from "react-redux"

export const UserName = () => {
  const username = useSelector(state=>state.user.username)

  if (!username) return null;
  
  return (
    <div className="hidden text-sm md:block font-semibold">{username}</div>
  )
}
