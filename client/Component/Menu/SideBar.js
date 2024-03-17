import styles from '@/styles/admin/Reservation/SideBar.module.css';
import { IoHome } from 'react-icons/io5';
import { AiOutlineSchedule } from 'react-icons/ai';
import LinkIcon from './LinkIcon';
import { IoMdSettings } from 'react-icons/io';
import { SlLogout } from 'react-icons/sl';
import { GrDocumentPdf } from 'react-icons/gr';
import { MdFoodBank } from 'react-icons/md';

const SideBar = () => {
    // 메뉴 오픈 여부

    const MenuItem = [
        { name: '홈', icon: <IoHome />, link: '/admin/home' },
        { name: '예약 관리', icon: <AiOutlineSchedule />, link: '/admin/scheduler' },
        // { name: '문서', icon: <GrDocumentPdf />, link: '/admin/document' },
        { name: '식수', icon: <MdFoodBank />, link: '/admin/reservation/restaurant' },
        { name: '설정', icon: <IoMdSettings />, link: '/admin/setting' },
    ];

    return (
        <aside className={styles.aside}>
            <div className={styles.LogoContainer}>
                <div>
                    <div className={styles.SmallRectangle}></div>
                    <div className={styles.SmallRectangle}></div>
                </div>
                <div>
                    <div className={styles.BigRectangle}></div>
                </div>
            </div>
            <div className={styles.NavContainer} style={{}}>
                {MenuItem.map((item, index) => (
                    <LinkIcon key={index} name={item.name} icon={item.icon} link={item.link} />
                ))}
                <div style={{ position: 'absolute', bottom: 5, color: 'white', left: 10 }}>
                    <LinkIcon name="로그아웃" icon={<SlLogout style={{ color: 'white' }} />} link="/admin/auth/login" />
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
