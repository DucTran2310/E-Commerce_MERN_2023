import styles from './loading.module.css'

export default function Loading() {
    return (
        <div className={styles['loading_area']}>
            <div className={styles['loader']}>
                <div className={styles['bar1']}></div>
                <div className={styles['bar2']}></div>
                <div className={styles['bar3']}></div>
                <div className={styles['bar4']}></div>
                <div className={styles['bar5']}></div>
                <div className={styles['bar6']}></div>
            </div>
        </div>
    )
}
