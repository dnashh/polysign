import React from 'react'
import Link from 'next/link'
import { useWeb3 } from "@3rdweb/hooks" 
import styles from '../styles/Navbar.module.css'

export const Navbar = () => {

  const { connectWallet, address, error, disconnectWallet, balance } = useWeb3();

  // balance && console.log(balance)
  
  return (
    <nav className={styles.nav}>
        <div className={styles.menu}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
        </div>
        <Link href='/'><div className="link"><h1 className={styles.title}>✏️ Polysign</h1></div></Link>
        {
          address ? <span className={styles.span} onClick={disconnectWallet} >{address.slice(0,5) + "..." +  address.slice(-4)}</span> : (<span className={styles.span} onClick={() => connectWallet("injected")}>Connect Wallet</span>)
        }
    </nav>
  )
}
