'use strict';

var smoothie = require("smoothie");

const DOWNSAMPLE = 1; // 1 = no downsampling: output all data points.

var ecg = {
    data: [],
    graph: smoothie.TimeSeries,
    idx: Number,
    loadTextEcg: function (filename) {
        ecg.data = [];
        ecg.idx = 0;
        $.get(filename, function (data) {
            var lines = data.split("\n");
            for (var i = 0, len = lines.length; i < len; i++) {
                if (lines[i] != "") {
                    ecg.data.push(parseInt(lines[i].trim().split('   ')[1]));
                }
            }
        }, 'text');
    },
    loadMIT16ECG: function (filename, num_signals, which_signal) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', filename, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function (e) {
            // response is two's complement 16-bit integer
            var responseArray = new Int16Array(this.response);
            var signals = [];
            for (var i = 0; i < num_signals; i++) {
                signals[i] = [];
            }
            // separate signals
            for (var sample = 0; sample < responseArray.length / num_signals; sample++) {
                for (var signal = 0; signal < num_signals; signal++) {
                    signals[signal].push(responseArray[sample * num_signals + signal]);
                }
            }
            ecg.data = signals[which_signal];
            ecg.idx = 0;
            return;
        }
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
    loadMIT212ECG: function (filename, num_signals, which_signal) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', filename, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function () {
            // response is two's complement 12-bit integer
            var responseArray = new Uint8Array(this.response);
            var datapoints = new Int16Array((responseArray.length / 3) * 2);
            var dp_idx = 0;
            for (var i = 0; i < responseArray.length; i = i + 3) {
                var lsb = responseArray[i];
                var msb = responseArray[i + 1];
                var lsb2 = responseArray[i + 2];
                var test0 = ((msb & 0xF0) << 4) | lsb;
                var test1 = ((msb & 0x0F) << 8) | lsb2;
                if (msb & 0x80) { // negative
                    datapoints[dp_idx++] = -((~(((msb & 0xF0) << 4) | lsb) + 1) & 0xfff);
                } else { // positive
                    datapoints[dp_idx++] = ((msb & 0xF0) << 4) | lsb;
                }
                if (msb & 0x08) { // negative
                    datapoints[dp_idx++] = -((~(((msb & 0x0F) << 8) | lsb2) + 1) & 0xfff);
                } else { // positive
                    datapoints[dp_idx++] = ((msb & 0x0F) << 8) | lsb2;
                }
            }
            var signals = [];
            for (var i = 0; i < num_signals; i++) {
                signals[i] = [];
            }
            // separate signals
            for (var sample = 0; sample < datapoints.length / num_signals; sample++) {
                for (var signal = 0; signal < num_signals; signal++) {
                    signals[signal].push(datapoints[sample * num_signals + signal]);
                }
            }
            ecg.data = signals[which_signal];
            ecg.idx = 0;
            return;
        };
        xhr.send();
    },
    createTimeline: function (canvas) {
        var chart = new smoothie.SmoothieChart({ millisPerPixel: 10, /*scrollBackwards:true,*/ grid: { sharpLines: true }, labels: { disabled: true } });
        chart.addTimeSeries(ecg.graph, { strokeStyle: 'rgba(0, 255, 0, 1)', lineWidth: 1 });
        chart.streamTo(canvas, 4); // Second argument is delay.
    },

    drawECG: function (canvas, filename) {
        ecg.graph = new smoothie.TimeSeries();

        ecg.loadMIT16ECG(filename, 2, 1);

        setInterval(function () {
            ecg.graph.append(new Date().getTime(), ecg.data[ecg.idx]);
            //document.getElementById('idx').innerHTML = ecg.idx;
            ecg.idx += DOWNSAMPLE;
            if (ecg.idx >= ecg.data.length) {
                ecg.idx = 0;
            }
        }, 1); // Add a data point every 2ms
        ecg.createTimeline(canvas)
    },
}

module.exports = ecg;
