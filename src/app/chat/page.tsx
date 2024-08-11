import styles from '@/app/ui/chat.module.css';
import Image from 'next/image';
import Link from 'next/link';
export default function  Chat(){
return (
<>
   <div className={styles.chatGrid}>
      <Link 
       href ="/"
       >
          <Image 
          src ="/vercel.svg"
          width ={1000}
          height={5000}
          alt= "profile picture"
          className={styles.chatPicture }
          />
       </Link>
       <Link 
        href = "/"
        >
           <div className={styles.chatMessage}>
           <span className={styles.userName}><strong>userName</strong></span> <br/>
               chatBody
           </div>
        </Link>
    </div>
</>
    )
}