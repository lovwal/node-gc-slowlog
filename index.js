const perf = require('perf_hooks');

var threshold = 20;

const perfObserver = new perf.PerformanceObserver((l) => {
  l.getEntries().forEach((entry) => {
    if (entry.duration >= threshold) {
      let start = entry.startTime+perf.performance.timeOrigin
      let end = start+entry.duration

      console.log((new Date()).toISOString(), 
          'msg="slow GC detected" type='+getGCType(entry.kind),
          'duration='+entry.duration+'ms',
          'start='+(new Date(start).toISOString()),
          'end='+(new Date(end).toISOString()));
    }
  });
});

// setThreshold sets the minimum threshold for an event to be logged.
// The duration parameter should be a number and is interpreted as milliseconds.
function setThreshold(duration) {
    if (typeof duration !== 'number') {
        throw new TypeError('duration must be of type number')
    }
    threshold = duration
};

function getGCType(kind) {
    let gc = 'all'
    switch (kind) {
      case perf.constants.NODE_PERFORMANCE_GC_INCREMENTAL:
        gc = 'incremental'
        break;
      case perf.constants.NODE_PERFORMANCE_GC_MINOR:
        gc = 'minor'
        break;
      case perf.constants.NODE_PERFORMANCE_GC_MAJOR:
        gc = 'major'
        break;
      case perf.constants.NODE_PERFORMANCE_GC_WEAKCB:
        gc = 'weakcb'
        break;
    }
    return gc
};

perfObserver.observe({ entryTypes: ['gc']});

module.exports = {
    setThreshold: setThreshold
};