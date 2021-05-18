import useStore from '@/helpers/store'
import Head from 'next/head'
import { useRef } from 'react'

const Header = () => {
  const title = useStore((s) => s.title)
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}
const Dom = ({ dom }) => {
  const ref = useRef(null)
  useStore.setState({ dom: ref })
  return (
    <div
      id='principalDiv'
      className='absolute z-10 top-0 left-0 w-screen h-screen overflow-hidden dom'
      ref={ref}
    >
      <Header />
      {dom}
    </div>
  )
}

export default Dom
