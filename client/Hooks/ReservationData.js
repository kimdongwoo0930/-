export const useReservationData = (data, currentYear, currentMonth) => {
    const reservationData = {
        101: [],
        102: [],
        103: [],
        105: [],
        106: [],
        107: [],
        201: [],
        202: [],
        203: [],
        204: [],
        205: [],
        206: [],
        A: [],
        B: [],
    };
    data?.map((item) => {
        if (item.status === '취소') return;
        const start_date = `${item.startyear}-${item.startmonth}-${item.startday}`;
        const end_date = `${item.endyear}-${item.endmonth}-${item.endday}`;
        const Data = {
            organization: item.organization,
            date: makeDataList(start_date, end_date, currentYear, currentMonth),
            color: item.color_code,
            reservationId: item.reservationId,
        };
        reservationData[item.classroom].push(Data);
    });
    return reservationData;
};

export const makeDataList = (startDate, endDate, currentYear, currentMonth) => {
    const start_month = parseInt(startDate.split('-')[1]);
    const end_month = parseInt(endDate.split('-')[1]);
    const DataList = [];
    // 두 월이 같은 경우부터하자
    if (start_month === end_month) {
        const start = parseInt(startDate.split('-')[2]);
        const end = parseInt(endDate.split('-')[2]);
        for (let i = parseInt(start); i <= parseInt(end); i++) {
            DataList.push(i);
        }
    }
    // 시작달이 같은 경우
    else if (start_month === currentMonth) {
        const start = parseInt(startDate.split('-')[2]);
        const end = new Date(currentYear, currentMonth, 0).getDate();
        for (let i = start; i <= end; i++) {
            DataList.push(i);
        }
    }
    // 끝달이 같은 경우
    else if (end_month === currentMonth) {
        const start = 1;
        const end = parseInt(endDate.split('-')[2]);
        for (let i = start; i <= end; i++) {
            DataList.push(i);
        }
    }
    return DataList;
};
