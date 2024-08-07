import React from "react"

interface ICardProps {
  children?: React.ReactNode
  className?: string
}
const Card: React.FC<ICardProps> = ({children, className}) => {
  return <div className={`${className} border rounded-md p-5`}>{children}</div>
}

export default Card;
