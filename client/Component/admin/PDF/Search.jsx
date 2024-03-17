import React from 'react';
import styles from '@/styles/admin/Pdf/Search.module.css';

const Search = () => {
    return (
        <div className={styles.Main}>
            <div className={styles.Title}>
                <h2>견적서 및 확인서 검색</h2>
            </div>
            <div className={styles.searchTitle}>업체명으로 검색</div>
            <div className={styles.Search}>
                <input type="text" placeholder="검색어를 입력하세요" />
                <button>검색</button>
            </div>
        </div>
    );
};

export default Search;
