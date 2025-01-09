import styles from "./featured.module.css";
import Image from "next/image";

export default function Featured() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, Numises blog is here!</b> Discover our stories and creative
        ideas
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, quo.</h1>
          <p className={styles.postDesc}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam maxime dolores molestias excepturi labore quae dignissimos dolor omnis temporibus exercitationem?</p>
          <button className={styles.button}>Read More</button>
        </div>
       
      </div>
    </div>
  );
}
