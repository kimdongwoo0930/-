import axios from 'axios';

const GetWeather = async () => {
    try {
        const apikey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        const lat = 37.25692236480251;
        const lon = 127.15171119733498;
        const lang = 'kr';
        const units = 'metric';
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&lang=${lang}&units=${units}`;
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export { GetWeather };
