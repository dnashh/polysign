import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '../components/Navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>✏️ Polysign - Sign Documents Digitally</title>
      </Head>
      <Navbar />
      <main className='container'>
        <section>
          <div className='landing-wrapper'>
            <div className="landing-image">
              <Image src='/assets/landing-background.avif' alt='Landing Page Background' width="100%" height="100%" layout='fill'></Image>
            </div>
            <h1 className='titletext'>Digitally Sign Documents on the <br /> Blockchain with ✏️ Polysign</h1>
            <div className='button-group'>
              <Link href='/start'><button className='btn-filled link'>Get Started</button></Link>
              <Link href='#know-more'><button className='btn-outline'>Know More</button></Link>
            </div>
          </div>
        </section>
        <section id='know-more'>
          <div className='know-more-wrapper'>
              <h1>How it Works?</h1>  
          </div>
        </section>
        <div className="sizedbox"></div>
      </main>
    </div>
  )
}
