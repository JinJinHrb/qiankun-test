import { useEffect, useState } from 'react'
import { Button } from 'antd'

export default function Button1(props: any) {
  const [_, update]= useState({})

  useEffect(() => {
    console.log('button mount');
  }, [_])

  const onClick = () => {
    update({})
    props.onClick?.()
  }

  return <Button onClick={onClick}>app2</Button>
}