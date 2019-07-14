## Install
```
$ npm install node-gc-slowlog
```

## Usage
To use the module, import it and optionally set the threshold. By default, all gc events taking longer than 20ms are logged.
```
const gcSlowLog = require('node-gc-slowlog')
// Set the minimum slowlog threshold to 50ms.
gcSlowLog.setThreshold(50)
```

## General
The module uses perf_hooks to attach to GC events. Each GC event is logged if it breaches the threshold (by default 20ms). The events are logged with a RFC3339 timestamp:
```
2019-07-14T18:45:04.405Z msg="slow GC detected" type=minor duration=10.439927ms
```

## License
MIT ©