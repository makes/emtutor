/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
const smoothie = require('smoothie');

const DOWNSAMPLE = 1; // 1 = no downsampling: output all data points.

const ecg = {
    data: [],
    graph: null, // smoothie.TimeSeries
    chart: null, // smoothie.SmoothieChart
    interval: null, // return value of setInterval()
    idx: Number,
    isRunning: true,
    loadTextEcg: (filename) => {
        ecg.data = [];
        ecg.idx = 0;
        $.get(filename, (data) => {
            const lines = data.split('\n');
            for (let i = 0, len = lines.length; i < len; i++) {
                if (lines[i] !== '') {
                    ecg.data.push(parseInt(lines[i].trim().split('   ')[1], 10));
                }
            }
        }, 'text');
    },
    loadMIT16ECG: (filename, signalCount, whichSignal) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', filename, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function onload() {
            // response is two's complement 16-bit integer
            const responseArray = new Int16Array(this.response);
            const signals = [];
            for (let i = 0; i < signalCount; i++) {
                signals[i] = [];
            }
            // separate signals
            for (let sample = 0; sample < responseArray.length / signalCount; sample++) {
                for (let signal = 0; signal < signalCount; signal++) {
                    signals[signal].push(responseArray[sample * signalCount + signal]);
                }
            }
            ecg.data = signals[whichSignal];
            ecg.idx = 0;
        };
        xhr.send();
    },
    /* Each sample is represented by a 12-bit two’s complement amplitude.
       The first sample is obtained from the 12 least significant bits of
       the first byte pair (stored least significant byte first). The second
       sample is formed from the 4 remaining bits of the first byte pair
       (which are the 4 high bits of the 12-bit sample) and the next byte
       (which contains the remaining 8 bits of the second sample). The
       process is repeated for each successive pair of samples. Most of the
       signal files in PhysioBank are written in format 212. */
    loadMIT212ECG: (filename, signalCount, whichSignal) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', filename, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function onload() {
            // response is two's complement 12-bit integer
            const responseArray = new Uint8Array(this.response);
            const datapoints = new Int16Array((responseArray.length / 3) * 2);
            let dpIndex = 0;
            for (let i = 0; i < responseArray.length; i += 3) {
                const lsb = responseArray[i];
                const msb = responseArray[i + 1];
                const lsb2 = responseArray[i + 2];
                // const test0 = ((msb & 0xF0) << 4) | lsb;
                // const test1 = ((msb & 0x0F) << 8) | lsb2;
                if (msb & 0x80) { // negative
                    datapoints[dpIndex++] = -((~(((msb & 0xF0) << 4) | lsb) + 1) & 0xfff);
                } else { // positive
                    datapoints[dpIndex++] = ((msb & 0xF0) << 4) | lsb;
                }
                if (msb & 0x08) { // negative
                    datapoints[dpIndex++] = -((~(((msb & 0x0F) << 8) | lsb2) + 1) & 0xfff);
                } else { // positive
                    datapoints[dpIndex++] = ((msb & 0x0F) << 8) | lsb2;
                }
            }
            const signals = [];
            for (let i = 0; i < signalCount; i++) {
                signals[i] = [];
            }
            // separate signals
            for (let sample = 0; sample < datapoints.length / signalCount; sample++) {
                for (let signal = 0; signal < signalCount; signal++) {
                    signals[signal].push(datapoints[sample * signalCount + signal]);
                }
            }
            ecg.data = signals[whichSignal];
            ecg.idx = 0;
        };
        xhr.send();
    },
    createTimeline: (canvas) => {
        ecg.chart = new smoothie.SmoothieChart({
            millisPerPixel: 10,
            /* scrollBackwards:true, */
            tooltip: false,
            grid: { sharpLines: true },
            labels: { disabled: true },
        });
        ecg.chart.addTimeSeries(ecg.graph, { strokeStyle: 'rgba(0, 255, 0, 1)', lineWidth: 1 });
        ecg.chart.streamTo(canvas, 4); // Second argument is delay.
    },


addDatapoint: () =>{
    ecg.graph.append(new Date().getTime(), ecg.data[ecg.idx]);
    // document.getElementById('idx').innerHTML = ecg.idx;
    ecg.idx += DOWNSAMPLE;
    if (ecg.idx >= ecg.data.length) {
        ecg.idx = 0;
    }
},


    drawECG: (canvas, filename) => {
        if (ecg.graph !== null) ecg.chart.removeTimeSeries(ecg.graph);
        ecg.graph = new smoothie.TimeSeries();

        ecg.loadMIT16ECG(filename, 2, 1);

         
        if (ecg.interval !== null) clearInterval(ecg.interval);
        ecg.interval = setInterval((ecg.addDatapoint) , 1); // Add a data point every 2ms
        ecg.createTimeline(canvas);
    },




 loadECG:()=>{
    ecg.graph.append(new Date().getTime(), ecg.data[ecg.idx]);
    // document.getElementById('idx').innerHTML = ecg.idx;
    ecg.idx += DOWNSAMPLE;
    if (ecg.idx >= ecg.data.length) {
        ecg.idx = 0;
    }
 },

pauseECG: () => {
    if (ecg.isRunning) ecg.stopECG()
    else ecg.startECG()
},

    stopECG: () => {
        clearInterval(ecg.interval);
        ecg.chart.stop();
        ecg.isRunning=false;
    },

    startECG: () => {
        ecg.interval = setInterval(ecg.addDatapoint, 1); // Add a data point every 2 ms

        ecg.chart.start();
        ecg.isRunning=true;
    },
};

module.exports = ecg;
