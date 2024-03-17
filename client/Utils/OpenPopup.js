export const openLoad = () => {
    // 새 창의 크기 및 위치를 설정합니다.
    const width = 600;
    const height = 800;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    // 새 창을 엽니다.
    const newWindow = window.open('', '', `resizable=no,width=${width},height=${height},left=${left},top=${top}`);

    // 새 창에 로드할 페이지의 URL을 지정합니다.
    newWindow.location.href = '/admin/load';
};
