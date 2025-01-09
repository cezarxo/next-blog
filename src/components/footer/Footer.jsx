import styles from './footer.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className={styles.container}>
        <div className={styles.info}>
        <div className={styles.logo}>
          <Image src='/logo.png' alt='logo' width={50} height={50} />
          <h1 className={styles.logoText}>Numises Blog</h1>
        </div>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus tempora porro debitis nemo nam libero labore quod vitae culpa. At?
        </p>
        <div className={styles.icons}>
        <Image src='/facebook.png' alt='' width={18} height={18} />
        <Image src='/tiktok.png' alt='' width={18} height={18} />
        <Image src='/instagram.png' alt='' width={18} height={18} />
        <Image src='/youtube.png' alt='' width={18} height={18} />
        </div>
        </div>
        <div className={styles.links}>
          <div className={styles.lists}>
            <span className={styles.listTitle}>Links</span>
            <Link href="/">Home</Link>
            <Link href="/">Blog</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
          <div className={styles.lists}>
            <span className={styles.listTitle}>Tags</span>
            <Link href="/">Style</Link>
            <Link href="/">Fashion</Link>
            <Link href="/">Coding</Link>
            <Link href="/">Travel</Link>
          </div>
          <div className={styles.lists}>
            <span className={styles.listTitle}>Social</span>
            <Link href="/">facebook</Link>
            <Link href="/">instagram</Link>
            <Link href="/">tiktok</Link>
            <Link href="/">youtube</Link>
          </div>
        </div>
    </div>
  )
}
