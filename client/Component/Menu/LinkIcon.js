import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPermission } from '@/Api/auth/GetApi';

const LinkIcon = ({ name, icon, link }) => {
    const router = useRouter();
    const currentPath = router.asPath;

    // 설정부분을 눌렀을때는 권한을 확인후 접속을 해야한다.

    return (
        <div>
            {link === currentPath ? (
                <div
                    style={{
                        width: 5,
                        height: 40,
                        background: '#ec008c',
                        position: 'absolute',
                        left: 0,
                        borderRadius: 30,
                    }}
                ></div>
            ) : (
                <></>
            )}
            <Link href={link}>{icon}</Link>
        </div>
    );
};

export default LinkIcon;
