import React from 'react';
import { PacmanLoader, ScaleLoader, PropagateLoader, RotateLoader } from 'react-spinners';

const RecordLoading = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ScaleLoader color="rgb(236, 0, 140)" width={50} height={50} />
        </div>
    );
};

const ScheduleLoading = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <PacmanLoader color="rgb(236, 0, 140)" width={50} height={50} />
        </div>
    );
};

const WeatherLoading = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <PropagateLoader color="rgb(236, 0, 140)" width={50} height={50} />
        </div>
    );
};

const VisitorLoading = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <PropagateLoader color="rgb(236, 0, 140)" width={50} height={50} />
        </div>
    );
};

const DetailLoading = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <RotateLoader color="rgb(236, 0, 140)" width={50} height={50} />
        </div>
    );
};

const FoodLoading = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <RotateLoader color="rgb(236, 0, 140)" width={50} height={50} />
        </div>
    );
};

export { RecordLoading, ScheduleLoading, WeatherLoading, VisitorLoading, DetailLoading, FoodLoading };
